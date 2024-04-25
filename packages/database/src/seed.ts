import { DateTime } from 'luxon';

import { PrismaClient } from '../prisma/prisma-client';

const Prisma = new PrismaClient();

const today = DateTime.now();

const DEFAULT_VESSEL_TYPES = [
  {
    type: 'TOBBE',
    max_registrants: 4,
  },
  {
    type: 'TOBTOBBE',
    max_registrants: 2,
  },
];

(async () => {
  try {
    const event = await Prisma.event.create({
      data: {
        registration_start_date: today.set({ month: 5 }).toJSDate(),
        year: today.year,
        vessel_types: {
          create: DEFAULT_VESSEL_TYPES,
        },
      },
    });

    console.info(`Vesseltypes generated for ${event.year}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await Prisma.$disconnect();
  }
})();
