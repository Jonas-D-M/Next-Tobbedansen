import { PrismaClient } from '../prisma/prisma-client';

export let Prisma = new PrismaClient({
  log: [{ emit: 'event', level: 'query' }],
});
