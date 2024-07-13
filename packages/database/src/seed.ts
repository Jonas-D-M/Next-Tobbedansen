import { DateTime } from 'luxon';
import { fakerNL_BE as faker } from '@faker-js/faker';
import { Prisma as PrismaLib, PrismaClient } from '../prisma/prisma-client';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';

const Prisma = new PrismaClient();

const today = DateTime.now();

const DEFAULT_VESSEL_TYPES = [
  {
    type: 'TOBBE',
    max_registrants: 4,
  },
  {
    type: 'TOBTOBBE',
    max_registrants: 2,
  },
];

type RegistrantCreateBody = PrismaLib.Args<
  typeof Prisma.registrant,
  'create'
>['data'];

const chooseRegistrationVesselType = (eventIds: string[], amount: number) => {
  const result = [];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * eventIds.length); // Randomly select between 0 and 1
    result.push(eventIds[randomIndex]);
  }
  return result;
};

const generateParticipants = (amount: number) => {
  const users: {
    first_name: string;
    last_name: string;
    date_of_birth: Date;
  }[] = [];
  for (let i = 0; i < amount; i++) {
    const user = {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      date_of_birth: faker.date.birthdate(),
    } as const;
    users.push(user);
  }
  return users;
};

const generateRegistrants = (): RegistrantCreateBody => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    city: faker.location.city(),
    place_of_birth: faker.location.city(),
    date_of_birth: faker.date.birthdate(),
    email: faker.internet.email(),
    postal_code: faker.location.zipCode(),
    street_name: faker.location.street(),
    street_number: faker.location.buildingNumber(),
  };
};

export const createAdminUser = async (email: string, password: string) => {};

(async () => {
  try {
    console.log('--------- SEEDING ---------');
    console.log(`Seeding event...`);
    const event = await Prisma.event.create({
      data: {
        registration_start_date: today.set({ month: 5 }).toJSDate(),
        year: today.year + 1,
        vessel_types: {
          create: DEFAULT_VESSEL_TYPES,
        },
      },
      include: {
        vessel_types: true,
      },
    });
    console.log('Event created');

    const numberOfRegistrations = 50;

    const registrationsTypes = chooseRegistrationVesselType(
      event.vessel_types.map(({ id }) => id),
      numberOfRegistrations
    );

    for (const registrationType of registrationsTypes) {
      const maxRegistrants =
        event.vessel_types.find(({ id }) => id === registrationType)
          ?.max_registrants ?? 2;

      const registrant = generateRegistrants();

      await Prisma.registration.create({
        data: {
          assosciation: faker.company.name(),
          event: {
            connect: {
              id: event.id,
            },
          },
          vessel: {
            create: {
              name: faker.lorem.word(),
              type: {
                connect: {
                  id: registrationType,
                },
              },
            },
          },
          registrant: {
            create: registrant,
          },
          participants: {
            createMany: {
              data: generateParticipants(maxRegistrants),
            },
          },
        },
      });
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await Prisma.$disconnect();
    console.log('--------- END SEEDING ---------');
  }
})();
