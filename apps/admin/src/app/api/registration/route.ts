import { RegistrationCreateInputSchema } from 'database/zod';
import prisma from '@/app/db';
import { z } from 'zod';
import { DateTime } from 'luxon';

async function isEventAcceptingRegistrations(
  eventId: string
): Promise<boolean> {
  // Find the event that is currently accepting reservations
  const activeEvent = await prisma.event.findFirst({
    where: {
      id: eventId,
      registration_start_date: {
        lte: new Date(), // Check if registration start date is less than or equal to current date
      },
    },
  });

  return !!activeEvent; // Return true if there's an active event, false otherwise
}

export async function POST(req: Request) {
  try {
    const body = RegistrationCreateInputSchema.parse(req.body);

    const allowRegistrations = await isEventAcceptingRegistrations(body.event);

    if (!allowRegistrations) return new Response();

    await prisma.registration.create({
      data: {
        ...body,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.issues.toString(), { status: 400 });
    }
    return new Response('Something went wrong on our side', { status: 500 });
  }
}

export async function GET(req: Request) {}
