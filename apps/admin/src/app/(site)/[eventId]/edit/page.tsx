import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { DateTime } from 'luxon';
import { notFound } from 'next/navigation';

import { Card, CardContent } from '@/components/ui/card';
import prisma from '@/app/(api)/db';
import { EditEventForm } from './_components/edit-event-form';

interface PageProps {
  params: {
    eventId: string;
  };
}

const toInputDate = (date: Date): string =>
  DateTime.fromJSDate(date).toISODate() ?? '';

const Page = async ({ params: { eventId } }: PageProps) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      vessel_types: {
        include: {
          vessel_type: {
            select: { id: true, type: true, max_registrants: true },
          },
        },
        orderBy: { vessel_type: { type: 'asc' } },
      },
    },
  });

  if (!event) {
    return notFound();
  }

  const defaults = {
    start: toInputDate(event.registration_start_date),
    end: toInputDate(event.registration_end_date),
    note: event.note ?? '',
    vessel_types: event.vessel_types.map((evt) => ({
      event_vessel_type_id: evt.id,
      type: evt.vessel_type.type,
      max_registrants: evt.vessel_type.max_registrants,
      max_participants: evt.max_participants,
    })),
  };

  return (
    <section className='py-4 max-w-2xl'>
      <Link
        href={`/${eventId}`}
        className='inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors'>
        <ChevronLeft size={16} />
        Terug naar evenement
      </Link>

      <header className='mt-4 mb-8'>
        <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl'>
          Evenement bewerken
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          Pas de registratieperiode of de tobbe-types (incl. max. deelnemers
          per type) aan.
        </p>
      </header>

      <Card>
        <CardContent className='p-6'>
          <EditEventForm eventId={eventId} defaults={defaults} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Page;
