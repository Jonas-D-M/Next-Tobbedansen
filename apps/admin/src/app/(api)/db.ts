import { PrismaClient } from '@tobbedansen/db';

const prismaClientSingleton = () => {
  return new PrismaClient().$extends({
    result: {
      participant: {
        full_name: {
          needs: { first_name: true, last_name: true },
          compute(participant) {
            return `${participant.first_name} ${participant.last_name}`;
          },
        },
      },
      registrant: {
        full_name: {
          needs: { first_name: true, last_name: true },
          compute(user) {
            return `${user.first_name} ${user.last_name}`;
          },
        },
        address: {
          needs: {
            street_name: true,
            street_number: true,
            postal_code: true,
            city: true,
          },
          compute(registrant) {
            return `${registrant.street_name} ${registrant.street_number}, ${registrant.postal_code} ${registrant.city}`;
          },
        },
      },
    },
  });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
