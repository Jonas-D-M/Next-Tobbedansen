import Link from 'next/link';
import React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/helpers';
import { ArrowUpRight, CalendarDays, Plus, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EventCardProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  participantCount: number;
  maxParticipants: number | null;
  active?: boolean;
}

const EventCard = ({
  id,
  title,
  start,
  end,
  participantCount,
  maxParticipants,
  active = false,
}: EventCardProps) => {
  const capacityPct =
    maxParticipants && maxParticipants > 0
      ? Math.min(100, Math.round((participantCount / maxParticipants) * 100))
      : null;
  const capacityReached =
    maxParticipants !== null && participantCount >= maxParticipants;

  return (
    <Link
      href={`/${id}`}
      className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 rounded-lg'>
      <Card className='relative h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-slate-300'>
        <CardContent className='p-5 flex flex-col gap-3'>
          <div className='flex items-start justify-between gap-2'>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
                active
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
                  : 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200'
              )}>
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  active ? 'bg-emerald-500' : 'bg-slate-400'
                )}
              />
              {active ? 'Actief' : 'Afgelopen'}
            </span>
            <ArrowUpRight
              size={16}
              className='text-slate-400 transition-colors group-hover:text-slate-900'
            />
          </div>

          <div className='flex items-end justify-between gap-3'>
            <div className='min-w-0'>
              <div className='text-3xl font-bold tracking-tight text-slate-900'>
                {title}
              </div>
              <div className='mt-1.5 flex items-center gap-1.5 text-sm text-slate-500'>
                <CalendarDays size={14} />
                <span className='truncate'>
                  {formatDate(start)} – {formatDate(end)}
                </span>
              </div>
            </div>

            <div className='flex flex-col items-end shrink-0'>
              <div className='inline-flex items-center gap-1 text-slate-500'>
                <Users size={14} />
                <span className='text-xs uppercase tracking-wider font-medium'>
                  Deelnemers
                </span>
              </div>
              <div className='mt-0.5 text-right text-2xl font-bold tracking-tight text-slate-900 leading-none'>
                {participantCount}
                {maxParticipants !== null ? (
                  <span className='text-sm font-medium text-slate-400'>
                    {' '}
                    / {maxParticipants}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {capacityPct !== null ? (
            <div
              className='h-1 w-full overflow-hidden rounded-full bg-slate-100'
              aria-hidden>
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  capacityReached
                    ? 'bg-red-500'
                    : capacityPct >= 80
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                )}
                style={{ width: `${capacityPct}%` }}
              />
            </div>
          ) : null}
        </CardContent>
      </Card>
    </Link>
  );
};

const CreateEventCard = () => {
  return (
    <Link
      href='/new'
      className='group block focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 rounded-lg'>
      <Card className='h-full border-dashed border-slate-300 bg-slate-50/50 transition-colors group-hover:border-slate-400 group-hover:bg-slate-50'>
        <CardContent className='flex flex-col items-center justify-center gap-2 p-5 min-h-[136px] text-slate-500 group-hover:text-slate-700'>
          <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-slate-200 group-hover:ring-slate-300'>
            <Plus size={18} />
          </div>
          <span className='text-sm font-medium'>Nieuw evenement</span>
        </CardContent>
      </Card>
    </Link>
  );
};

export { EventCard as Card, CreateEventCard };
