import prisma from '@/app/(api)/db';
import { RegistrationColumns, columns } from './columns';
import { DataTable } from './data-table';
import { Button } from '@/components/ui/button';
import { deleteRegistrations } from '@/actions/registrations';

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
    vesselName: registration.vessel.name,
    vesselType: registration.vessel.type.type,
    registrantName: registration.registrant.full_name,
    email: registration.registrant.email,
    has_paid: registration.has_paid,
    sent_confirmation_email: registration.sent_confirmation_email,
  }));
};

interface RegistrationTableProps {
  eventId: string;
}

const RegistrationTable = async ({ eventId }: RegistrationTableProps) => {
  const registrations = await getRegistrations(eventId);

  return (
    <>
      <DataTable
        onDelete={deleteRegistrations}
        columns={columns}
        data={registrations}
      />
    </>
  );
};

export { RegistrationTable };
