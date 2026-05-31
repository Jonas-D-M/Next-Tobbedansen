'use server';

import ExcelJS from 'exceljs';
import prisma from '@/app/(api)/db';
import { formatDate } from '@/utils/helpers';

export const exportEventToExcel = async (
  eventId: string
): Promise<{ filename: string; base64: string }> => {
  const event = await prisma.event.findUniqueOrThrow({
    where: { id: eventId },
    include: {
      registrations: {
        orderBy: { createdAt: 'desc' },
        include: {
          vessel: {
            select: { name: true, type: { select: { type: true } } },
          },
          registrant: {
            select: {
              full_name: true,
              place_of_birth: true,
              date_of_birth: true,
              email: true,
              address: true,
            },
          },
          participants: {
            select: { full_name: true, date_of_birth: true },
          },
        },
      },
    },
  });

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Tobbedansen admin';
  workbook.created = new Date();

  const registrationsSheet = workbook.addWorksheet('Registraties');
  registrationsSheet.columns = [
    { header: 'Tobbe naam', key: 'vesselName', width: 28 },
    { header: 'Tobbe type', key: 'vesselType', width: 16 },
    { header: 'Vereniging', key: 'assosciation', width: 24 },
    { header: 'Naam', key: 'registrantName', width: 28 },
    { header: 'Geboorteplaats', key: 'placeOfBirth', width: 20 },
    { header: 'Geboortedatum', key: 'dateOfBirth', width: 16 },
    { header: 'Adres', key: 'address', width: 40 },
    { header: 'E-mail', key: 'email', width: 32 },
    { header: 'Opmerking', key: 'musicRequest', width: 40 },
    { header: 'Betaald', key: 'hasPaid', width: 10 },
    { header: 'Bevestiging verzonden', key: 'sentConfirmationEmail', width: 22 },
  ];

  for (const registration of event.registrations) {
    registrationsSheet.addRow({
      vesselName: registration.vessel.name,
      vesselType: registration.vessel.type.type,
      assosciation: registration.assosciation ?? '',
      registrantName: registration.registrant.full_name,
      placeOfBirth: registration.registrant.place_of_birth ?? '',
      dateOfBirth: formatDate(registration.registrant.date_of_birth),
      address: registration.registrant.address ?? '',
      email: registration.registrant.email,
      musicRequest: registration.music_request ?? '',
      hasPaid: registration.has_paid ? 'Ja' : 'Nee',
      sentConfirmationEmail: registration.sent_confirmation_email
        ? 'Ja'
        : 'Nee',
    });
  }

  registrationsSheet.getRow(1).font = { bold: true };

  const participantsSheet = workbook.addWorksheet('Deelnemers');
  participantsSheet.columns = [
    { header: 'Tobbe naam', key: 'vesselName', width: 28 },
    { header: 'Tobbe type', key: 'vesselType', width: 16 },
    { header: 'Vereniging', key: 'assosciation', width: 24 },
    { header: 'Naam', key: 'name', width: 28 },
    { header: 'Geboorteplaats', key: 'placeOfBirth', width: 20 },
    { header: 'Geboortedatum', key: 'dateOfBirth', width: 16 },
    { header: 'Adres', key: 'address', width: 40 },
    { header: 'E-mail', key: 'email', width: 32 },
    { header: 'Rol', key: 'role', width: 16 },
    { header: 'Opmerking', key: 'musicRequest', width: 40 },
  ];

  for (const registration of event.registrations) {
    participantsSheet.addRow({
      vesselName: registration.vessel.name,
      vesselType: registration.vessel.type.type,
      assosciation: registration.assosciation ?? '',
      name: registration.registrant.full_name,
      placeOfBirth: registration.registrant.place_of_birth ?? '',
      dateOfBirth: formatDate(registration.registrant.date_of_birth),
      address: registration.registrant.address ?? '',
      email: registration.registrant.email,
      role: 'Inschrijver',
      musicRequest: registration.music_request ?? '',
    });

    for (const participant of registration.participants) {
      participantsSheet.addRow({
        vesselName: registration.vessel.name,
        vesselType: registration.vessel.type.type,
        assosciation: registration.assosciation ?? '',
        name: participant.full_name,
        placeOfBirth: '',
        dateOfBirth: formatDate(participant.date_of_birth),
        address: '',
        email: '',
        role: 'Deelnemer',
        musicRequest: '',
      });
    }
  }

  participantsSheet.getRow(1).font = { bold: true };

  const buffer = await workbook.xlsx.writeBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const filename = `tobbedansen-${event.year}.xlsx`;

  return { filename, base64 };
};
