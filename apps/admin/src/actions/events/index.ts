'use server';

import prisma from '@/app/(api)/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type CreateEventResult = { error: string } | undefined;
export type UpdateEventResult = { error: string } | undefined;

type ParsedVesselType = {
  eventVesselTypeId: string | null;
  type: string;
  max_registrants: number;
  max_participants: number | null;
};

const parseVesselTypeRows = (
  formData: FormData,
  withEvtId: boolean
): { rows: ParsedVesselType[]; error?: string } => {
  const evtIdRaw = formData.getAll('event_vessel_type_id');
  const typeNames = formData.getAll('vessel_type_name');
  const teamSizeValues = formData.getAll('vessel_type_max');
  const maxParticipantValues = formData.getAll('vessel_type_max_participants');

  if (typeNames.length === 0) {
    return { rows: [], error: 'Voeg minstens één tobbe-type toe.' };
  }
  if (
    typeNames.length !== teamSizeValues.length ||
    typeNames.length !== maxParticipantValues.length ||
    (withEvtId && typeNames.length !== evtIdRaw.length)
  ) {
    return { rows: [], error: 'Ongeldige tobbe-type gegevens.' };
  }

  const rows: ParsedVesselType[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < typeNames.length; i++) {
    const rawType = typeNames[i];
    const rawMax = teamSizeValues[i];
    const rawCap = maxParticipantValues[i];

    const type = typeof rawType === 'string' ? rawType.trim() : '';
    if (!type) {
      return { rows: [], error: `Tobbe-type #${i + 1}: naam is verplicht.` };
    }
    const key = type.toLowerCase();
    if (seen.has(key)) {
      return { rows: [], error: `Tobbe-type "${type}" is dubbel.` };
    }
    seen.add(key);

    const max_registrants = Number(rawMax);
    if (
      !Number.isInteger(max_registrants) ||
      max_registrants < 1 ||
      max_registrants > 20
    ) {
      return {
        rows: [],
        error: `Tobbe-type "${type}": max bemanning moet tussen 1 en 20 liggen.`,
      };
    }

    let max_participants: number | null = null;
    if (typeof rawCap === 'string' && rawCap.trim() !== '') {
      const parsed = Number(rawCap);
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 100000) {
        return {
          rows: [],
          error: `Tobbe-type "${type}": max. deelnemers moet een positief geheel getal zijn.`,
        };
      }
      max_participants = parsed;
    }

    let eventVesselTypeId: string | null = null;
    if (withEvtId) {
      const rawId = evtIdRaw[i];
      eventVesselTypeId =
        typeof rawId === 'string' && rawId.trim() !== '' ? rawId : null;
    }

    rows.push({ eventVesselTypeId, type, max_registrants, max_participants });
  }

  return { rows };
};

export const createEvent = async (
  _prevState: CreateEventResult,
  formData: FormData
): Promise<CreateEventResult> => {
  const yearRaw = formData.get('year');
  const startRaw = formData.get('registration_start_date');
  const endRaw = formData.get('registration_end_date');
  const noteRaw = formData.get('note');

  const year = Number(yearRaw);
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return { error: 'Geef een geldig jaartal in (2000 – 2100).' };
  }

  if (typeof startRaw !== 'string' || !startRaw) {
    return { error: 'Startdatum is verplicht.' };
  }
  if (typeof endRaw !== 'string' || !endRaw) {
    return { error: 'Einddatum is verplicht.' };
  }

  const start = new Date(startRaw);
  const end = new Date(endRaw);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { error: 'Ongeldige datum.' };
  }
  if (end < start) {
    return { error: 'Einddatum moet na de startdatum liggen.' };
  }

  const note =
    typeof noteRaw === 'string' && noteRaw.trim() !== '' ? noteRaw.trim() : null;

  const { rows: vesselTypes, error } = parseVesselTypeRows(formData, false);
  if (error) return { error };

  const existing = await prisma.event.findFirst({ where: { year } });
  if (existing) {
    return { error: `Er bestaat al een evenement voor ${year}.` };
  }

  await prisma.event.create({
    data: {
      year,
      registration_start_date: start,
      registration_end_date: end,
      note,
      vessel_types: {
        create: vesselTypes.map(
          ({ type, max_registrants, max_participants }) => ({
            max_participants,
            vessel_type: {
              create: { type, max_registrants },
            },
          })
        ),
      },
    },
  });

  revalidatePath('/');
  redirect('/');
};

export const updateEvent = async (
  eventId: string,
  _prevState: UpdateEventResult,
  formData: FormData
): Promise<UpdateEventResult> => {
  const startRaw = formData.get('registration_start_date');
  const endRaw = formData.get('registration_end_date');
  const noteRaw = formData.get('note');

  if (typeof startRaw !== 'string' || !startRaw) {
    return { error: 'Startdatum is verplicht.' };
  }
  if (typeof endRaw !== 'string' || !endRaw) {
    return { error: 'Einddatum is verplicht.' };
  }

  const start = new Date(startRaw);
  const end = new Date(endRaw);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return { error: 'Ongeldige datum.' };
  }
  if (end < start) {
    return { error: 'Einddatum moet na de startdatum liggen.' };
  }

  const note =
    typeof noteRaw === 'string' && noteRaw.trim() !== '' ? noteRaw.trim() : null;

  const { rows: vesselTypes, error } = parseVesselTypeRows(formData, true);
  if (error) return { error };

  const existing = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      vessel_types: { select: { id: true, vessel_type_id: true } },
    },
  });
  if (!existing) {
    return { error: 'Evenement niet gevonden.' };
  }

  const existingEvtIds = new Set(existing.vessel_types.map((evt) => evt.id));
  const evtIdToVesselTypeId = new Map(
    existing.vessel_types.map((evt) => [evt.id, evt.vessel_type_id])
  );

  for (const row of vesselTypes) {
    if (
      row.eventVesselTypeId !== null &&
      !existingEvtIds.has(row.eventVesselTypeId)
    ) {
      return { error: 'Onbekend tobbe-type opgegeven.' };
    }
  }

  const keptEvtIds = new Set(
    vesselTypes
      .map((row) => row.eventVesselTypeId)
      .filter((id): id is string => id !== null)
  );

  const toDelete = Array.from(existingEvtIds).filter(
    (id) => !keptEvtIds.has(id)
  );
  const toUpdate = vesselTypes.filter(
    (row): row is ParsedVesselType & { eventVesselTypeId: string } =>
      row.eventVesselTypeId !== null
  );
  const toCreate = vesselTypes.filter((row) => row.eventVesselTypeId === null);

  await prisma.$transaction([
    ...(toDelete.length > 0
      ? [
          prisma.eventVesselType.deleteMany({
            where: { id: { in: toDelete } },
          }),
        ]
      : []),
    ...toUpdate.flatMap((row) => [
      prisma.vesselType.update({
        where: { id: evtIdToVesselTypeId.get(row.eventVesselTypeId)! },
        data: { type: row.type, max_registrants: row.max_registrants },
      }),
      prisma.eventVesselType.update({
        where: { id: row.eventVesselTypeId },
        data: { max_participants: row.max_participants },
      }),
    ]),
    prisma.event.update({
      where: { id: eventId },
      data: {
        registration_start_date: start,
        registration_end_date: end,
        note,
        ...(toCreate.length > 0
          ? {
              vessel_types: {
                create: toCreate.map(
                  ({ type, max_registrants, max_participants }) => ({
                    max_participants,
                    vessel_type: {
                      create: { type, max_registrants },
                    },
                  })
                ),
              },
            }
          : {}),
      },
    }),
  ]);

  revalidatePath('/');
  revalidatePath(`/${eventId}`);
  redirect(`/${eventId}`);
};
