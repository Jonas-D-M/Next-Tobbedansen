# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

pnpm + Turborepo monorepo. Three workspaces:

- `apps/site` — public-facing Next.js site for the Tobbedansen event (registrations, FAQ, sponsors, etc.). Statically exported (`output: 'export'`), runs on port 3000, deployed via FTP by `.github/workflows/main.yml` on push to `master`/`main`/`dev`.
- `apps/admin` — Next.js admin dashboard (port 3001). Server-rendered, has API route handlers under `src/app/(api)/api/**`, Lucia-based auth in `(auth)/`, and event/registration UI under `(site)/[eventId]/`.
- `packages/database` (`@tobbedansen/db`) — Prisma schema + generated client + Zod schemas. MariaDB 10.3 via `docker-compose.yml`. Exports the Prisma client from `./src/index.ts` and Zod types from `./zod`.

Both apps import from `@tobbedansen/db` (workspace dep). Only `admin` writes to the DB; `site` talks to `admin` through `NEXT_PUBLIC_BACKEND_URL`.

## First-time setup

```bash
pnpm install
pnpm --filter @tobbedansen/db compose:up   # start MariaDB in docker
pnpm prisma:migrate-deploy                  # apply migrations
pnpm dev                                    # boot site (3000) + admin (3001)
```

Dev defaults live in `apps/admin/.env.development` and `apps/site/.env.development` (committed; Next.js auto-loads these in `next dev`). `packages/database/.env` is the Prisma CLI + docker-compose env file and is gitignored (per `packages/database/.gitignore`). Per-developer overrides go in `.env*.local` (also gitignored). Site → admin → DB; the site app needs the admin app running for API responses, and admin needs the MariaDB container.

## Common commands

Always run from the repo root unless noted. Use pnpm — `packageManager` is pinned and Node `>=20` (see `.nvmrc`: v20.11.1).

```bash
pnpm install                      # install deps (postinstall runs manypkg fix)
pnpm dev                          # turbo runs dev for all apps in parallel
pnpm build                        # turbo build (depends on ^db:generate)
pnpm lint                         # next lint across apps (depends on ^type-check)
pnpm type-check                   # tsc --noEmit per app
pnpm format / pnpm format:check   # prettier across workspaces
```

Database (all proxied through Turbo, so `^db:generate` runs before any `dev`/`build`):

```bash
pnpm --filter @tobbedansen/db compose:up   # start MariaDB in docker
pnpm db:generate                            # prisma generate (custom output: prisma/prisma-client)
pnpm db:push                                # prisma db push (skip generate)
pnpm db:seed                                # ts-node src/seed.ts
pnpm prisma:studio                          # open Prisma Studio
pnpm prisma:migrate-dev                     # create+apply migration (dev)
pnpm prisma:migrate-deploy                  # apply pending migrations (prod/CI)
```

Single-app dev (skip the rest of the graph):

```bash
pnpm --filter site dev
pnpm --filter admin dev
pnpm --filter site build           # produces apps/site/out/ for the FTP deploy
```

Releases: `pnpm changeset`, `pnpm changeset:version`, `pnpm changeset:publish` (Changesets is wired up but packages are all `private`).

## Architecture notes

**Prisma client is custom-output.** `packages/database/prisma/schema.prisma` generates the client to `./prisma-client` (not `node_modules/@prisma/client`), and `packages/database/src/index.ts` re-exports from there. Both `db:generate` and `prisma generate` MUST run before TypeScript will compile (Turbo's `build` already declares this; if you see missing types from `@tobbedansen/db`, run `pnpm db:generate`). `.npmrc` hoists `*prisma*` so the engine binary resolves.

**Zod schemas are generated.** `zod-prisma-types` produces `packages/database/prisma/generated/zod/` and is exposed as the `@tobbedansen/db/zod` subpath export. Don't hand-write Zod schemas for DB models — extend the generated ones.

**Admin Prisma client extension.** `apps/admin/src/app/(api)/db.ts` wraps `PrismaClient` with `$extends` to add computed fields (`Participant.full_name`, `Registrant.full_name`, `Registrant.address`). Always import the admin Prisma client from `@/app/(api)/db`, not directly from `@tobbedansen/db`, when you need those computed fields. The singleton pattern (`globalThis.prismaGlobal`) is there to survive Next.js dev hot-reloads.

**Auth (admin only).** Lucia v3 with `@lucia-auth/adapter-prisma`, sessions in the `Session` table, users in `User`. `apps/admin/src/lib/auth.ts` exports `lucia` and a React-cached `getUser()` that also rotates the session cookie when fresh. `@node-rs/argon2` is in `serverComponentsExternalPackages` — keep it out of client bundles.

**Env validation.** Both apps use `@t3-oss/env-nextjs` (`src/env.ts`), loaded by `next.config.mjs` via `jiti` at build time so missing vars fail fast. Add new env vars in `env.ts`, not by reaching into `process.env`. Required vars: `packages/database/.env` (gitignored) holds DB + compose creds for Prisma CLI and docker-compose (`MYSQL_*`, `DATABASE_URL`); `apps/admin/.env.development` holds the same DB vars for the admin Next.js process; `apps/site/.env.development` holds `NEXT_PUBLIC_BACKEND_URL` (→ admin app) and `NEXT_PUBLIC_TICKETS_URL` (→ external ticketing service used by `(content)/inschrijvingen/`). Per-developer overrides go in `.env*.local` (gitignored).

**Prisma + Next.js monorepo workaround.** `apps/admin/next.config.mjs` wires `@prisma/nextjs-monorepo-workaround-plugin` into the server webpack config to copy Prisma engine binaries into the Next build output (needed because the generated client lives in `packages/database/prisma/prisma-client`, not `node_modules`). If you ever see `Error: Cannot find module '.prisma/client/...'` at runtime, this plugin is the fix.

**Route groups.** `apps/admin/src/app/` uses Next 14 App Router groups: `(api)` for route handlers + Prisma client, `(auth)` for login, `(site)` for the dashboard UI. `apps/site/src/app/(content)/` holds all public pages.

**Static export caveats (site).** `next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `skipTrailingSlashRedirect: true`, and a custom image loader (`next-image-export-optimizer`). No server features (route handlers, server actions, dynamic params without `generateStaticParams`) work in `apps/site` — all dynamic data goes through `NEXT_PUBLIC_BACKEND_URL` to the admin app.

**UI stack.** shadcn/ui (see `components.json` in each app), Tailwind, Radix primitives, `class-variance-authority`, `tailwind-merge`. `cn()` helper lives in each app's `src/lib/utils.ts`.

**Path alias.** Both apps use `@/* → ./src/*`.

## Conventions

- Prettier (`.prettierrc`): single quotes, semicolons, 80 cols, 2-space indent, `trailingComma: es5`, JSX single-quote.
- TypeScript `strict: true` everywhere. App tsconfigs are isolated; there is no shared base config.
- `@manypkg/cli` enforces workspace consistency — `pnpm install` runs `manypkg fix` automatically.
