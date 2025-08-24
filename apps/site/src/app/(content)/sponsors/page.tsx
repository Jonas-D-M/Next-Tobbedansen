import React from 'react';
import path from 'node:path';
import fs from 'node:fs';
import { SponsorImage } from '@/components/sponsor-image';

export const dynamic = 'force-static';
export const runtime = 'nodejs';

function getSponsorImages(): string[] {
  const dir = path.join(process.cwd(), 'public', 'img', 'sponsors');
  const allowed = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg']);

  const files = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((name) => allowed.has(path.extname(name).toLowerCase()))
    // Optional: stable, human-ish sort
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
    );

  return files.map((name) => `/img/sponsors/${name}`);
}

const Page = async () => {
  const sponsors = getSponsorImages();

  return (
    <>
      <img className='o-banner__image' src='/img/sponsors.jpg' />
      <section className='o-row o-row--xl'>
        <div
          style={{ minHeight: '100%' }}
          className='container flex-wrap flex gap-x-2 gap-y-2 items-center justify-center'>
          {sponsors.map((image) => (
            <div key={image}>
              <SponsorImage
                src={image}
                alt={image}
                width={0}
                height={0}
                className='w-full h-auto'
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
