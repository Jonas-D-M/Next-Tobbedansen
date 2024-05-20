import { H1, P } from '@/components/typography';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <H1>Niets gevonden hier</H1>
      <Link href='/'>
        <P>Ga terug</P>
      </Link>
    </div>
  );
}
