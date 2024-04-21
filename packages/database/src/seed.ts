import { DateTime } from 'luxon';

import { Prisma } from './client';

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
      },
    });

    const existingVesselTypes = (
      await Prisma.vesselType.findMany({
        where: {
          eventId: event.id,
        },
        select: {
          type: true,
        },
      })
    ).map(({ type }) => type);

    for (const vesselType of DEFAULT_VESSEL_TYPES) {
      if (existingVesselTypes.includes(vesselType.type)) continue;
      await Prisma.vesselType.create({
        data: vesselType,
      });
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await Prisma.$disconnect();
  }
})();
