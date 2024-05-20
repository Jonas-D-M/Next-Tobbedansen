import prisma from '@/app/(api)/db';
import { RegistrationColumns, columns } from './columns';
import { DataTable } from './data-table';

const getRegistrations = async (
  eventId: string
): Promise<RegistrationColumns[]> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    select: {
      registrations: {
        include: {
          registrant: true,
          vessel: {
            select: {
              name: true,
              type: {
                select: {
                  type: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return event.registrations.map((registration) => ({
    id: registration.id,
    hasPayed: registration.has_payed,
    vesselName: registration.vessel.name,
    vesselType: registration.vessel.type.type,
    registrantName: registration.registrant.full_name,
    email: registration.registrant.email,
  }));
};

interface RegistrationTableProps {
  eventId: string;
}

const RegistrationTable = async ({ eventId }: RegistrationTableProps) => {
  const registrations = await getRegistrations(eventId);
  return <DataTable columns={columns} data={registrations} />;
};

export { RegistrationTable };
