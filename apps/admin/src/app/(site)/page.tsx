import React from 'react';
import Link from 'next/link';
import { DateTime, Interval } from 'luxon';
import { Plus } from 'lucide-react';

import prisma from '../(api)/db';
import { Card, CreateEventCard } from '@/components/event';
import { Button } from '@/components/ui/button';

type EventRow = {
  year: number;
  id: string;
  registration_start_date: Date;
  registration_end_date: Date;
  max_participants: number | null;
  participantCount: number;
};

type GroupedEvents = Record<'current' | 'past', EventRow[]>;

const getEvents = async (): Promise<GroupedEvents> => {
  const events = await prisma.event.findMany({
    select: {
      year: true,
      id: true,
      registration_end_date: true,
      registration_start_date: true,
      vessel_types: { select: { max_participants: true } },
      _count: { select: { registrations: true } },
      registrations: {
        select: { _count: { select: { participants: true } } },
      },
    },
    orderBy: {
      year: 'desc',
    },
  });

  const now = DateTime.now();

  return events.reduce<GroupedEvents>(
    (groups, event) => {
      const participantCount =
        event._count.registrations +
        event.registrations.reduce((sum, r) => sum + r._count.participants, 0);

      const caps = event.vessel_types.map((vt) => vt.max_participants);
      const hasUncapped = caps.length === 0 || caps.some((c) => c === null);
      const max_participants = hasUncapped
        ? null
        : caps.reduce<number>((sum, c) => sum + (c ?? 0), 0);

      const row: EventRow = {
        id: event.id,
        year: event.year,
        registration_start_date: event.registration_start_date,
        registration_end_date: event.registration_end_date,
        max_participants,
        participantCount,
      };

      const interval = Interval.fromDateTimes(
        event.registration_start_date,
        event.registration_end_date
      );
      if (interval.isValid && interval.contains(now)) {
        groups.current.push(row);
      } else {
        groups.past.push(row);
      }
      return groups;
    },
    { current: [], past: [] }
  );
};

const SectionHeader = ({
  title,
  count,
}: {
  title: string;
  count: number;
}) => (
  <div className='flex items-baseline gap-2 mb-3'>
    <h2 className='text-sm font-semibold uppercase tracking-wider text-slate-500'>
      {title}
    </h2>
    <span className='text-xs text-slate-400'>{count}</span>
  </div>
);

const Page = async () => {
  const events = await getEvents();
  const hasCurrent = events.current.length > 0;

  return (
    <section className='container py-8'>
      <header className='flex items-end justify-between gap-4 mb-10 border-b border-slate-200 pb-6'>
        <div>
          <h1 className='text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl'>
            Evenementen
          </h1>
          <p className='mt-2 text-sm text-slate-500'>
            Beheer alle edities van Tobbedansen.
          </p>
        </div>
        <Button asChild>
          <Link href='/new'>
            <Plus size={16} className='mr-1.5' />
            Nieuw evenement
          </Link>
        </Button>
      </header>

      <div className='space-y-10'>
        <section>
          <SectionHeader title='Actief' count={events.current.length} />
          {hasCurrent ? (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {events.current.map((event) => (
                <Card
                  key={event.id}
                  id={event.id}
                  title={event.year.toString()}
                  start={event.registration_start_date}
                  end={event.registration_end_date}
                  participantCount={event.participantCount}
                  maxParticipants={event.max_participants}
                  active
                />
              ))}
            </div>
          ) : (
            <div className='rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center'>
              <p className='text-sm text-slate-500'>
                Er loopt momenteel geen registratie. Maak een nieuw evenement aan om te starten.
              </p>
              <Button asChild variant='outline' className='mt-4'>
                <Link href='/new'>
                  <Plus size={16} className='mr-1.5' />
                  Nieuw evenement
                </Link>
              </Button>
            </div>
          )}
        </section>

        <section>
          <SectionHeader title='Vorige edities' count={events.past.length} />
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {events.past.map((event) => (
              <Card
                key={event.id}
                id={event.id}
                title={event.year.toString()}
                start={event.registration_start_date}
                end={event.registration_end_date}
                participantCount={event.participantCount}
                maxParticipants={event.max_participants}
              />
            ))}
            <CreateEventCard />
          </div>
        </section>
      </div>
    </section>
  );
};

export default Page;
