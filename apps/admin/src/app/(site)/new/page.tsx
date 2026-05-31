import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { DateTime } from 'luxon';

import { Card, CardContent } from '@/components/ui/card';
import { NewEventForm } from './_components/new-event-form';

const Page = () => {
  const nextYear = DateTime.now().year + 1;
  const defaults = {
    year: nextYear,
    start: DateTime.fromObject({ year: nextYear, month: 6, day: 1 }).toISODate() ?? '',
    end: DateTime.fromObject({ year: nextYear, month: 9, day: 1 }).toISODate() ?? '',
  };

  return (
    <section className='container py-8 max-w-2xl'>
      <Link
        href='/'
        className='inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900 transition-colors'>
        <ChevronLeft size={16} />
        Terug naar evenementen
      </Link>

      <header className='mt-4 mb-8'>
        <h1 className='text-3xl font-extrabold tracking-tight text-slate-900 lg:text-4xl'>
          Nieuw evenement
        </h1>
        <p className='mt-2 text-sm text-slate-500'>
          Maak een nieuwe editie aan. Inschrijvingen kunnen pas binnenkomen
          tussen de start- en einddatum.
        </p>
      </header>

      <Card>
        <CardContent className='p-6'>
          <NewEventForm defaults={defaults} />
        </CardContent>
      </Card>
    </section>
  );
};

export default Page;
