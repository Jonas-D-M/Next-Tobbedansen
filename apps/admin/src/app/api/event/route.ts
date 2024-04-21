import prisma from '@/app/db';

export async function GET(request: Request) {
  const currentEvent = await prisma.event.findFirst({});

  return Response.json(currentEvent);
}
