'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createEvent, CreateEventResult } from '@/actions/events';

const Field = ({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className='flex flex-col gap-1.5'>
    <label htmlFor={htmlFor} className='text-sm font-medium text-slate-800'>
      {label}
    </label>
    {children}
    {hint ? <p className='text-xs text-slate-500'>{hint}</p> : null}
  </div>
);

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type='submit' disabled={pending}>
      {pending ? 'Aanmaken…' : 'Evenement aanmaken'}
    </Button>
  );
};

type VesselTypeRow = {
  key: number;
  type: string;
  max_registrants: number;
  max_participants: string;
};

const DEFAULT_VESSEL_TYPES: Omit<VesselTypeRow, 'key'>[] = [
  { type: 'TOBBE', max_registrants: 4, max_participants: '' },
  { type: 'TOBTOBBE', max_registrants: 2, max_participants: '' },
];

interface NewEventFormProps {
  defaults: {
    year: number;
    start: string;
    end: string;
  };
}

const initialState: CreateEventResult = undefined;

export const NewEventForm = ({ defaults }: NewEventFormProps) => {
  const [state, formAction] = useFormState(createEvent, initialState);

  const nextKey = React.useRef(0);
  const makeRow = React.useCallback(
    (row: Omit<VesselTypeRow, 'key'>): VesselTypeRow => ({
      ...row,
      key: nextKey.current++,
    }),
    []
  );

  const [vesselTypes, setVesselTypes] = React.useState<VesselTypeRow[]>(() =>
    DEFAULT_VESSEL_TYPES.map((row) => ({ ...row, key: nextKey.current++ }))
  );

  const updateRow = (key: number, patch: Partial<VesselTypeRow>) => {
    setVesselTypes((rows) =>
      rows.map((row) => (row.key === key ? { ...row, ...patch } : row))
    );
  };

  const removeRow = (key: number) => {
    setVesselTypes((rows) => rows.filter((row) => row.key !== key));
  };

  const addRow = () => {
    setVesselTypes((rows) => [
      ...rows,
      makeRow({ type: '', max_registrants: 2, max_participants: '' }),
    ]);
  };

  return (
    <form action={formAction} className='flex flex-col gap-6'>
      <Field
        label='Jaartal'
        htmlFor='year'
        hint='Het kalenderjaar waarin het evenement plaatsvindt.'>
        <Input
          id='year'
          name='year'
          type='number'
          min={2000}
          max={2100}
          defaultValue={defaults.year}
          required
        />
      </Field>

      <div className='grid gap-5 sm:grid-cols-2'>
        <Field label='Registratie start' htmlFor='registration_start_date'>
          <Input
            id='registration_start_date'
            name='registration_start_date'
            type='date'
            defaultValue={defaults.start}
            required
          />
        </Field>
        <Field label='Registratie einde' htmlFor='registration_end_date'>
          <Input
            id='registration_end_date'
            name='registration_end_date'
            type='date'
            defaultValue={defaults.end}
            required
          />
        </Field>
      </div>

      <Field
        label='Mededeling'
        htmlFor='note'
        hint='Optioneel. Wordt bovenaan het inschrijvingsformulier op de site getoond.'>
        <Textarea
          id='note'
          name='note'
          rows={3}
          placeholder='Bv. extra info of een belangrijke mededeling voor de deelnemers…'
        />
      </Field>

      <div className='flex flex-col gap-3'>
        <div className='flex items-baseline justify-between'>
          <label className='text-sm font-medium text-slate-800'>
            Tobbe-types
          </label>
          <span className='text-xs text-slate-500'>
            Naam · max. bemanning per tobbe · max. deelnemers (totaal)
          </span>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-[1fr_7rem_8rem_auto] items-center gap-2 px-1 text-[11px] uppercase tracking-wider text-slate-500'>
            <span>Naam</span>
            <span>Max. bemanning</span>
            <span>Max. deelnemers</span>
            <span className='sr-only'>Verwijder</span>
          </div>
          {vesselTypes.map((row, index) => (
            <div
              key={row.key}
              className='grid grid-cols-[1fr_7rem_8rem_auto] items-center gap-2'>
              <Input
                name='vessel_type_name'
                value={row.type}
                placeholder={`Type ${index + 1}`}
                onChange={(e) => updateRow(row.key, { type: e.target.value })}
                required
              />
              <Input
                name='vessel_type_max'
                type='number'
                min={1}
                max={20}
                value={row.max_registrants}
                onChange={(e) =>
                  updateRow(row.key, {
                    max_registrants: Number(e.target.value),
                  })
                }
                required
              />
              <Input
                name='vessel_type_max_participants'
                type='number'
                min={1}
                placeholder='Onbeperkt'
                value={row.max_participants}
                onChange={(e) =>
                  updateRow(row.key, { max_participants: e.target.value })
                }
              />
              <Button
                type='button'
                variant='ghost'
                size='icon'
                onClick={() => removeRow(row.key)}
                disabled={vesselTypes.length <= 1}
                aria-label={`Verwijder ${row.type || `type ${index + 1}`}`}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>

        <div>
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={addRow}>
            <Plus size={14} className='mr-1.5' />
            Tobbe-type toevoegen
          </Button>
        </div>
      </div>

      {state?.error ? (
        <div className='rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700'>
          {state.error}
        </div>
      ) : null}

      <div className='flex items-center justify-end gap-2 pt-2'>
        <Button asChild variant='ghost'>
          <Link href='/'>Annuleren</Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
};
