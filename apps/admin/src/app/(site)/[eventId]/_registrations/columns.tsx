'use client';
import { updateRegistration } from '@/actions/registrations';
import { Checkbox } from '@/components/ui/checkbox';
import { useToggle } from '@/hooks/use-toggle';
import { ColumnDef, Row } from '@tanstack/react-table';

export interface RegistrationColumns {
  id: string;
  vesselName: string;
  vesselType: string;
  registrantName: string;
  email: string;
  has_paid: boolean;
  sent_confirmation_email: boolean;
}

export const columns: ColumnDef<RegistrationColumns>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    enableHiding: true,
    id: 'id',
  },
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
        onCheckedChange={row.getToggleSelectedHandler()}
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
  {
    accessorKey: 'has_paid',
    header: 'Betaald',
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      const handleConfirmationSentChange = async (value: boolean) => {
        await updateRegistration(id, {
          has_paid: value,
        });
      };

      return (
        <CheckboxCell
          row={row}
          originalChecked={row.getValue('has_paid')}
          onChange={handleConfirmationSentChange}
        />
      );
    },
  },
  {
    accessorKey: 'sent_confirmation_email',
    header: 'Bevestiging verzonden',
    cell: ({ row }) => {
      const handleConfirmationSentChange = async (value: boolean) => {
        const id = row.getValue('id') as string;
        await updateRegistration(id, {
          sent_confirmation_email: value,
        });
      };

      return (
        <CheckboxCell
          row={row}
          originalChecked={row.getValue('sent_confirmation_email')}
          onChange={handleConfirmationSentChange}
        />
      );
    },
  },
];

interface CheckboxCellProps<TData> {
  row: Row<TData>;
  originalChecked: boolean;
  onChange: (value: boolean) => void;
}

const CheckboxCell = <TData,>({
  row,
  originalChecked,
  onChange,
}: CheckboxCellProps<TData>) => {
  const { value: isChecked, toggleValue: toggleIsChecked } =
    useToggle(originalChecked);
  const handleCheckedChange = (value: boolean) => {
    toggleIsChecked();
    onChange(value);
  };
  return (
    <div className='flex justify-items justify-center'>
      <Checkbox checked={isChecked} onCheckedChange={handleCheckedChange} />
    </div>
  );
};
