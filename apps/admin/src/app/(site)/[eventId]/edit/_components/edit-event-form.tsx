'use client';

import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateEvent, UpdateEventResult } from '@/actions/events';

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
      {pending ? 'Opslaan…' : 'Wijzigingen opslaan'}
    </Button>
  );
};

type VesselTypeRow = {
  key: number;
  event_vessel_type_id: string | null;
  type: string;
  max_registrants: number;
  max_participants: string;
};

interface EditEventFormProps {
  eventId: string;
  defaults: {
    start: string;
    end: string;
    note: string;
    vessel_types: {
      event_vessel_type_id: string;
      type: string;
      max_registrants: number;
      max_participants: number | null;
    }[];
  };
}

const initialState: UpdateEventResult = undefined;

export const EditEventForm = ({ eventId, defaults }: EditEventFormProps) => {
  const action = React.useMemo(
    () => updateEvent.bind(null, eventId),
    [eventId]
  );
  const [state, formAction] = useFormState(action, initialState);

  const nextKey = React.useRef(0);
  const makeRow = React.useCallback(
    (row: Omit<VesselTypeRow, 'key'>): VesselTypeRow => ({
      ...row,
      key: nextKey.current++,
    }),
    []
  );

  const [vesselTypes, setVesselTypes] = React.useState<VesselTypeRow[]>(() =>
    defaults.vessel_types.map((vt) => ({
      key: nextKey.current++,
      event_vessel_type_id: vt.event_vessel_type_id,
      type: vt.type,
      max_registrants: vt.max_registrants,
      max_participants:
        vt.max_participants === null ? '' : String(vt.max_participants),
    }))
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
      makeRow({
        event_vessel_type_id: null,
        type: '',
        max_registrants: 2,
        max_participants: '',
      }),
    ]);
  };

  return (
    <form action={formAction} className='flex flex-col gap-6'>
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
          defaultValue={defaults.note}
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
              <input
                type='hidden'
                name='event_vessel_type_id'
                value={row.event_vessel_type_id ?? ''}
              />
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
          <Button type='button' variant='outline' size='sm' onClick={addRow}>
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
          <Link href={`/${eventId}`}>Annuleren</Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
};
