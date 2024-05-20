'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export interface RegistrationColumns {
  hasPayed: boolean;
  vesselName: string;
  vesselType: string;
  registrantName: string;
  email: string;
  id: string;
}

export const columns: ColumnDef<RegistrationColumns>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: 'vesselName',
    header: 'Tobbe naam',
  },
  {
    accessorKey: 'vesselType',
    header: 'Tobbe type',
  },
  {
    accessorKey: 'registrantName',
    header: 'Naam',
  },
  {
    accessorKey: 'hasPayed',
    header: 'Betaald',
    cell: ({ row }) => (
      <Checkbox checked={row.getValue('hasPayed')} aria-label='Betaald' />
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
];
