import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  columns as participantColumns,
  ParticipantColumnsType,
} from './_participants/columns';
import prisma from '@/app/(api)/db';
import { formatDate } from '@/utils/helpers';
import {
  columns as registrationColumns,
  RegistrationColumns,
} from './_registrations/columns';
import { DataTable as ParticipantTable } from './_participants/data-table';
import { DataTable as RegistrationTable } from './_registrations/data-table';
import { deleteRegistrations } from '@/actions/registrations';
import { ExportButton } from '@/components/export-button';
import { EventInfoPanel, VesselTypeStat } from '@/components/event';

interface PageProps {
  params: {
    eventId: string;
  };
}

const getParticipants = async (
  eventId: string
): Promise<ParticipantColumnsType[]> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    include: {
      registrations: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
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
        vesselName: registration.vessel.name,
        name: registration.registrant.full_name,
        dateOfBirth: formatDate(registration.registrant.date_of_birth),
        address: registration.registrant.address,
        email: registration.registrant.email,
        placeOfBirth: registration.registrant.place_of_birth,
        musicRequest: registration.music_request ?? '',
        vesselType: registration.vessel.type.type,
        assosciation: registration.assosciation,
        music_request: registration.music_request || '',
      };

      const participants = registration.participants.map((participant) => ({
        id: registration.id,
        name: participant.full_name,
        vesselName: registration.vessel.name,
        dateOfBirth: formatDate(participant.date_of_birth),
        address: '',
        email: '',
        placeOfBirth: '',
        musicRequest: '',
        vesselType: '',
        assosciation: registration.assosciation || '',
        music_request: '',
      }));
      return [registrant, ...participants];
    })
    .flat();
  return participants;
};

type EventMeta = {
  year: number;
  registration_start_date: Date;
  registration_end_date: Date;
  is_active: boolean;
  vessel_types: VesselTypeStat[];
};

const getRegistrations = async (
  eventId: string
): Promise<{
  registrations: RegistrationColumns[];
  event: EventMeta;
}> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: {
      id: eventId,
    },
    include: {
      vessel_types: {
        include: {
          vessel_type: {
            select: { id: true, type: true, max_registrants: true },
          },
        },
        orderBy: { vessel_type: { type: 'asc' } },
      },
      registrations: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          registrant: true,
          vessel: {
            select: {
              name: true,
              vessel_type_id: true,
              type: {
                select: {
                  type: true,
                },
              },
            },
          },
          _count: { select: { participants: true } },
        },
      },
    },
  });

  const countsByVesselTypeId = new Map<string, number>();
  for (const registration of event.registrations) {
    const vesselTypeId = registration.vessel.vessel_type_id;
    const slotCount = 1 + registration._count.participants;
    countsByVesselTypeId.set(
      vesselTypeId,
      (countsByVesselTypeId.get(vesselTypeId) ?? 0) + slotCount
    );
  }

  const registrations = event.registrations.map((registration) => ({
    id: registration.id,
    vesselName: registration.vessel.name,
    assosciation: registration.assosciation,
    vesselType: registration.vessel.type.type,
    registrantName: registration.registrant.full_name,
    email: registration.registrant.email,
    has_paid: registration.has_paid,
    sent_confirmation_email: registration.sent_confirmation_email,
  }));

  const vessel_types: VesselTypeStat[] = event.vessel_types.map((evt) => ({
    id: evt.vessel_type.id,
    type: evt.vessel_type.type,
    max_registrants: evt.vessel_type.max_registrants,
    max_participants: evt.max_participants,
    participantCount: countsByVesselTypeId.get(evt.vessel_type.id) ?? 0,
  }));

  return {
    registrations,
    event: {
      year: event.year,
      registration_start_date: event.registration_start_date,
      registration_end_date: event.registration_end_date,
      is_active: event.is_active,
      vessel_types,
    },
  };
};

const Page = async ({ params: { eventId } }: PageProps) => {
  const participants = await getParticipants(eventId);
  const { registrations, event } = await getRegistrations(eventId);

  return (
    <>
      <EventInfoPanel
        eventId={eventId}
        registration_start_date={event.registration_start_date}
        registration_end_date={event.registration_end_date}
        participantCount={participants.length}
        vessel_types={event.vessel_types}
        is_active={event.is_active}
      />
      <Tabs defaultValue='registrations'>
        <div className='flex justify-between'>
          <TabsList>
          <TabsTrigger value='registrations'>
            Registraties ({registrations.length})
          </TabsTrigger>
          <TabsTrigger value='participants'>
            Deelnemers ({participants.length})
          </TabsTrigger>
        </TabsList>
        <ExportButton eventId={eventId} />
      </div>
      <TabsContent value='registrations'>
        <RegistrationTable
          onDelete={deleteRegistrations}
          columns={registrationColumns}
          data={registrations}
        />
      </TabsContent>
        <TabsContent value='participants'>
          <ParticipantTable columns={participantColumns} data={participants} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Page;
