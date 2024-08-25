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
        where: {
          is_active: true,
        },
      },
    },
  });

  return Response.json(currentEvent);
}
