interface PageType {
  title: string;
  href: string;
}
import { env } from '@/env';
const baseUrl = `${env.NEXT_PUBLIC_BACKEND_URL}/api`;

export const endpoints = {
  event: {
    get: {
      current: `${baseUrl}/event/current`,
    },
  },
  registration: {
    post: `${baseUrl}/registration`,
  },
} as const;

export const pages: PageType[] = [
  { title: 'Home', href: '/' },
  { title: 'Vrijdag', href: '/vrijdag' },
  { title: 'Zaterdag', href: '/zaterdag' },
  { title: 'FAQ', href: '/faq' },
  { title: 'Reglement', href: '/reglement' },
  { title: 'Sponsors', href: '/sponsors' },
  { title: 'Inschrijvingen', href: '/inschrijvingen' },
  { title: 'Contact', href: '/contact' },
];
