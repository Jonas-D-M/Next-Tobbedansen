'use client';
import { ColumnDef } from '@tanstack/react-table';

export interface ParticipantColumnsType {
  id: string;
  name: string;
  dateOfBirth: string;
  address?: string;
  email?: string;
  placeOfBirth?: string;
}

export const columns: ColumnDef<ParticipantColumnsType>[] = [
  {
    accessorKey: 'vesselName',
    header: 'Tobbe naam',
  },
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
