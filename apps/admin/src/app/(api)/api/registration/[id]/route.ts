import prisma from '@/app/(api)/db';
import { z } from 'zod';

type RouteParams = { params: { id: string } };

// export async function PATCH(req: Request, { params: { id } }: RouteParams) {
//   try {
//     const body = await req.json();

//     const RegistrationUpdateSchema = z.object({
//       has_payed: z.boolean(),
//     });

//     const { has_payed } = RegistrationUpdateSchema.parse(body);

//     await prisma.registration.update({
//       where: {
//         id,
//       },
//       data: {
//         has_payed,
//       },
//     });

//     return new Response('Registratie bijgewerkt', { status: 200 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return new Response(JSON.stringify(error.issues), { status: 400 });
//     }
//     console.log(error);
//     return new Response(
//       'Er ging iets mis, als dit blijft voorkomen stuur je ons best een berichtje.',
//       { status: 500 }
//     );
//   }
// }
