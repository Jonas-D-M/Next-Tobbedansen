import React from 'react';
import prisma from '../(api)/db';

import { DateTime, Interval } from 'luxon';
import { H1, H2, Small, Ul } from '@/components/typography';
import { Card } from '@/components/event';
import { Car } from 'lucide-react';

type GroupedEvents = Record<
  'current' | 'past',
  {
    year: number;
    id: string;
    registration_start_date: Date;
    registration_end_date: Date;
  }[]
>;

const getEvents = async () => {
  const events = await prisma.event.findMany({
    select: {
      year: true,
      id: true,
      registration_end_date: true,
      registration_start_date: true,
    },
    orderBy: {
      year: 'desc',
    },
  });

  const currentDate = DateTime.now();

  const groupedEvents = events.reduce<GroupedEvents>(
    (groups, event) => {
      const { registration_start_date, registration_end_date } = event;
      const interval = Interval.fromDateTimes(
        registration_start_date,
        registration_end_date
      );

      if (interval.contains(currentDate)) {
        groups.current.push(event);
      } else {
        groups.past.push(event);
      }

      return groups;
    },
    { current: [], past: [] }
  );

  return groupedEvents;
};

const Page = async () => {
  const events = await getEvents();

  return (
    <section className='container'>
      <H1>Evenementen</H1>
      <div className='flex flex-wrap gap-4 justify-center mt-2'>
        {events.current.map(
          ({ year, id, registration_start_date, registration_end_date }) => {
            return (
              <Card
                key={id}
                title={year.toString()}
                start={registration_start_date}
                end={registration_end_date}
                id={id}
              />
            );
          }
        )}
      </div>
      <div className='flex flex-wrap gap-4 justify-center md:justify-between mt-2'>
        {events.past.map(
          ({ year, id, registration_start_date, registration_end_date }) => {
            return (
              <Card
                key={id}
                title={year.toString()}
                start={registration_start_date}
                end={registration_end_date}
                id={id}
              />
            );
          }
        )}
      </div>
    </section>
  );
};

export default Page;
