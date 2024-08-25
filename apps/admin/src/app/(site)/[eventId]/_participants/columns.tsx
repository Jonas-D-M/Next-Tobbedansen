'use client';
import { ColumnDef } from '@tanstack/react-table';

export interface ParticipantColumnsType {
  id: string;
  name: string;
  dateOfBirth: string;
  address: string | null;
  email: string | null;
  placeOfBirth: string | null;
  vesselName: string;
  vesselType: string;
  music_request: string | null;
  assosciation: string | null;
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
    accessorKey: 'music_request'
    header: 'Opmerking'
  },
  {
    accessorKey: 'placeOfBirth',
    header: 'Geboorteplaats',
  },
];
