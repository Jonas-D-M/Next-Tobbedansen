'use server';

import prisma from '@/app/(api)/db';
import { RegistrationColumns } from '@/app/(site)/[eventId]/_registrations/columns';
import { revalidatePath } from 'next/cache';

export const deleteRegistrations = async (rows: RegistrationColumns[]) => {
  console.log('Deleting rows with ids:', rows);
  const rowsToDelete = rows.map(({ id }) => id);
  await prisma.registration.deleteMany({
    where: {
      id: {
        in: rowsToDelete,
      },
    },
  });
  revalidatePath('/(site)/[eventId]', 'layout');
};

export const updateRegistration = async (
  id: string,
  data: Partial<RegistrationColumns>
) => {
  console.log('Updating registration with id:', id);
  await prisma.registration.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath('/(site)/[eventId]', 'layout');
};
