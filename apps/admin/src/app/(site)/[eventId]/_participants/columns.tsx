'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { DateTime } from 'luxon';

export interface ParticipantColumns {
  id: string;
  name: string;
  dateOfBirth: string;
  address?: string;
  email?: string;
  placeOfBirth?: string;
}

export const columns: ColumnDef<ParticipantColumns>[] = [
  {
    accessorKey: 'name',
    header: 'Naam',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Geboortedatum',
  },
  {
    accessorKey: 'address',
    header: 'Adres',
  },
  {
    accessorKey: 'email',
    header: 'E-mail',
  },

  {
    accessorKey: 'placeOfBirth',
    header: 'Geboorteplaats',
  },
];
