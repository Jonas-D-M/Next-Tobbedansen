import prisma from '@/app/(api)/db';
import { ParticipantColumns, columns } from './columns';
import { DataTable } from './data-table';
import { DateTime } from 'luxon';
import { formatDate } from '@/utils/helpers';

const getParticipants = async (
  eventId: string
): Promise<ParticipantColumns[]> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    select: {
      registrations: {
        select: {
          id: true,
          registrant: {
            select: {
              full_name: true,
              place_of_birth: true,
              date_of_birth: true,
              email: true,
              address: true,
            },
          },
          participants: {
            select: {
              full_name: true,
              date_of_birth: true,
            },
          },
        },
      },
    },
  });
  const participants = event.registrations
    .map((registration) => {
      const registrant = {
        id: registration.id,
        name: registration.registrant.full_name,
        dateOfBirth: formatDate(registration.registrant.date_of_birth),
        address: registration.registrant.address,
        email: registration.registrant.email,
        placeOfBirth: registration.registrant.place_of_birth,
      };

      const participants = registration.participants.map((participant) => ({
        id: registration.id,
        name: participant.full_name,
        dateOfBirth: formatDate(participant.date_of_birth),
        address: undefined,
        email: undefined,
        placeOfBirth: undefined,
      }));
      return [registrant, ...participants];
    })
    .flat();
  return participants;
};

interface ParticipantTableProps {
  eventId: string;
}

const ParticipantTable = async ({ eventId }: ParticipantTableProps) => {
  const participants = await getParticipants(eventId);
  return <DataTable columns={columns} data={participants} />;
};

export { ParticipantTable };
