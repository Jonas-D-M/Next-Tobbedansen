import React from 'react';
import Link from 'next/link';
import { CalendarDays, Users, Anchor, Pencil } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/helpers';
import { cn } from '@/lib/utils';

export interface VesselTypeStat {
  id: string;
  type: string;
  max_registrants: number;
  max_participants: number | null;
  participantCount: number;
}

export interface EventInfoPanelProps {
  eventId: string;
  registration_start_date: Date;
  registration_end_date: Date;
  participantCount: number;
  vessel_types: VesselTypeStat[];
  is_active: boolean;
}

const StatRow = ({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-1.5'>
    <div className='flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-slate-500'>
      {icon}
      {label}
    </div>
    <div className='text-sm text-slate-900'>{children}</div>
  </div>
);

const capacityClass = (count: number, max: number | null): string => {
  if (max === null) return 'bg-emerald-500';
  if (max <= 0) return 'bg-slate-300';
  const pct = (count / max) * 100;
  if (count >= max) return 'bg-red-500';
  if (pct >= 80) return 'bg-amber-500';
  return 'bg-emerald-500';
};

export const EventInfoPanel = ({
  eventId,
  registration_start_date,
  registration_end_date,
  participantCount,
  vessel_types,
  is_active,
}: EventInfoPanelProps) => {
  const allCapped = vessel_types.every((vt) => vt.max_participants !== null);
  const totalCap = allCapped
    ? vessel_types.reduce((sum, vt) => sum + (vt.max_participants ?? 0), 0)
    : null;
  const totalCapacityReached =
    totalCap !== null && participantCount >= totalCap;
  const totalCapPct =
    totalCap !== null && totalCap > 0
      ? Math.min(100, Math.round((participantCount / totalCap) * 100))
      : null;

  return (
    <Card className='mb-4'>
      <CardContent className='p-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 relative'>
        <Button
          asChild
          variant='ghost'
          size='sm'
          className='absolute right-3 top-3 h-8 gap-1.5 px-2 text-slate-500 hover:text-slate-900'>
          <Link href={`/${eventId}/edit`}>
            <Pencil size={14} />
            <span className='text-xs'>Bewerken</span>
          </Link>
        </Button>
        <StatRow
          icon={<CalendarDays size={14} />}
          label='Registratieperiode'>
          <div>
            {formatDate(registration_start_date)} –{' '}
            {formatDate(registration_end_date)}
          </div>
          <div className='mt-1'>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium',
                is_active
                  ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200'
                  : 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200'
              )}>
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  is_active ? 'bg-emerald-500' : 'bg-slate-400'
                )}
              />
              {is_active ? 'Actief' : 'Inactief'}
            </span>
          </div>
        </StatRow>

        <StatRow icon={<Users size={14} />} label='Deelnemers'>
          <div className='flex items-baseline gap-1'>
            <span className='text-2xl font-bold tracking-tight text-slate-900'>
              {participantCount}
            </span>
            <span className='text-slate-500'>
              {totalCap !== null ? `/ ${totalCap}` : '(geen limiet)'}
            </span>
          </div>
          {totalCapPct !== null ? (
            <div className='mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-100'>
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  totalCapacityReached
                    ? 'bg-red-500'
                    : totalCapPct >= 80
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                )}
                style={{ width: `${totalCapPct}%` }}
              />
            </div>
          ) : null}
        </StatRow>

        <StatRow
          icon={<Anchor size={14} />}
          label={`Tobbe-types (${vessel_types.length})`}>
          {vessel_types.length === 0 ? (
            <span className='text-slate-500'>Geen types ingesteld.</span>
          ) : (
            <ul className='flex flex-col gap-1.5'>
              {vessel_types.map((vt) => {
                const cap = vt.max_participants;
                const reached = cap !== null && vt.participantCount >= cap;
                return (
                  <li
                    key={vt.id}
                    className='flex items-center justify-between gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs'>
                    <span className='font-medium text-slate-800'>
                      {vt.type}
                    </span>
                    <span className='flex items-center gap-2 text-slate-600'>
                      <span className='text-slate-400'>
                        max {vt.max_registrants}/tobbe
                      </span>
                      <span
                        className={cn(
                          'inline-flex h-1.5 w-1.5 rounded-full',
                          capacityClass(vt.participantCount, cap)
                        )}
                        aria-hidden
                      />
                      <span
                        className={cn(
                          'tabular-nums font-medium',
                          reached ? 'text-red-600' : 'text-slate-800'
                        )}>
                        {vt.participantCount}
                        {cap !== null ? `/${cap}` : ''}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </StatRow>
      </CardContent>
    </Card>
  );
};
