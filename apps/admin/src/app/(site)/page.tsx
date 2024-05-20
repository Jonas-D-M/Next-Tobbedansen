import React from 'react';
import prisma from '../(api)/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DateTime } from 'luxon';
import { H1, H2, Small, Ul } from '@/components/typography';
import Link from 'next/link';

const getEvents = async () => {
  const events = await prisma.event.findMany({
    include: {
      vessel_types: true,
    },
    orderBy: {
      year: 'desc',
    },
  });
  return events;
};

const formatDate = (date: Date) => {
  return DateTime.fromJSDate(date).toFormat('dd-MM-yyyy HH:mm');
};

const Page = async () => {
  const events = await getEvents();
  const multipliedEvents = [
    ...events,
    ...events,
    ...events,
    ...events,
    ...events,
  ];
  return (
    <section className='container'>
      <H1>Evenementen</H1>
      <div className='flex flex-wrap gap-4 justify-center md:justify-between mt-2'>
        {multipliedEvents.map(
          ({ year, id, vessel_types, registration_start_date }) => {
            return (
              <Link key={id} href={`/${id}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>{year}</CardTitle>
                    <CardDescription>
                      {`${formatDate(registration_start_date)} - ${formatDate(registration_start_date)}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <H2>Vaartuigtypes</H2>
                    <Ul>
                      {vessel_types.map(({ type, id }) => (
                        <li key={id} className='capitalize'>
                          {type.toLowerCase()}
                        </li>
                      ))}
                    </Ul>
                  </CardContent>
                </Card>
              </Link>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Page;
