import { RegistrationTemplate } from '@/components/email-templates/registration';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      subject: 'Hello world',
      react: RegistrationTemplate({ firstName: 'John' }),
      text: '',
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
