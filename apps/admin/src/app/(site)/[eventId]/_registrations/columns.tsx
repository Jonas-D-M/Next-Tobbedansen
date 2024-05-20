'use client';
import { Checkbox } from '@/components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';

export interface RegistrationColumns {
  vesselName: string;
  vesselType: string;
  registrantName: string;
  email: string;
  id: string;
}

const setRegistrationPayed = async (id: string, hasPayed: boolean) => {
  await fetch(`/api/registrations/${id}/payed`, {
    method: 'PATCH',
    body: JSON.stringify({ has_payed: hasPayed }),
  });
};

export const columns: ColumnDef<RegistrationColumns>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        name='select-all'
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
        name='select-row'
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
    accessorKey: 'email',
    header: 'Email',
  },
];
