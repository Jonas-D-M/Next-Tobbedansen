import prisma from '@/app/(api)/db';
import { H1 } from '@/components/typography';
import React from 'react';

interface PageProps {
  params: {
    eventId: string;
  };
}

const Page = async ({ params: { eventId } }: PageProps) => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    include: {
      registrations: {
        include: {
          registrant: true,
          participants: true,
        },
      },
    },
  });

  return (
    <div>
      <H1>Inschrijvingen </H1>
    </div>
  );
};

export default Page;
