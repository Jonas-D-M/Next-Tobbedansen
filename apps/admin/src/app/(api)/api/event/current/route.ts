import { DateTime } from 'luxon';
import prisma from '@/app/(api)/db';

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET() {
  const currentEvent = await prisma.event.findFirst({
    where: {
      year: DateTime.now().year,
      AND: [
        {
          registration_end_date: {
            gte: DateTime.now().toJSDate(),
          },
        },
        { is_active: true },
      ],
    },
    include: {
      vessel_types: {
        where: { vessel_type: { is_active: true } },
        include: { vessel_type: true },
      },
    },
  });

  if (!currentEvent) {
    return Response.json(null);
  }

  const { vessel_types, ...rest } = currentEvent;
  return Response.json({
    ...rest,
    vessel_types: vessel_types.map((evt) => ({
      id: evt.vessel_type.id,
      type: evt.vessel_type.type,
      max_registrants: evt.vessel_type.max_registrants,
      max_participants: evt.max_participants,
    })),
  });
}
