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

const generateMailTo = (
  email: string,
  vesselName: string,
  year: string,
  bankAccount: string
) => {
  return `mailto:${email}?subject=Inschrijving Tobbedansen ${year} - ${vesselName}&body=Bedankt%20voor%20uw%20inschrijving.%0D%0A%0D%0AHierbij%20de%20bevestiging%20dat%20u%20bent%20ingeschreven%20voor%20Tobbedansen%20${year}.%20In%20de%20bijlage%20kan%20u%20het%20regelement%20terugvinden%2C%20lees%20dit%20zeker%20goed%20door.%20%0D%0ADe%20inschrijvingskosten%20bedragen%20%E2%82%AC5%2Fvoertuig%20en%20%E2%82%AC7%2Fdeelnemer%20(verzekering).%20Dit%20bedrag%20dient%20overgeschreven%20te%20worden%20op%20volgend%20rekeningnummer%3A%0D%0A${bankAccount}.%20Met%20vermelding%20%E2%80%9CINSCHRIJVING%20%5Bnaamvoertuig%5D%20%2B%20reglement%20gelezen%20en%20goedgekeurd%E2%80%9D.%0D%0ADit%20ten%20laatste%20op%20dinsdag%2027%20augustus%202024%20of%20tot%20de%20inschrijvingen%20vol%20zitten.%20Later%20die%20week%20wordt%20een%20uur%20meegedeeld%20wanneer%20de%20deelnemers%20van%20de%20schans%20mogen%20gaan.%0D%0A%0D%0ATot%20dan!%0D%0AHet%20Tobbedansenteam.`;
};

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
    cell: ({ row }) => {
      return (
        <a
          href={generateMailTo(
            row.getValue('email'),
            row.getValue('vesselName'),
            '2024',
            'BE03 1430 9778 4084'
          )}>
          {row.getValue('email')}
        </a>
      );
    },
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
