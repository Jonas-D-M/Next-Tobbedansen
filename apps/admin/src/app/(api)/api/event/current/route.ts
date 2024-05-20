import { DateTime } from 'luxon';
import prisma from '@/app/db';

export async function GET() {
  const currentEvent = await prisma.event.findFirst({
    where: {
      year: DateTime.now().year,
    },
    include: {
      vessel_types: true,
    },
  });

  return Response.json(currentEvent);
}
