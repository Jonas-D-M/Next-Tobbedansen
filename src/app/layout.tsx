import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/style/screen.css';
import { Body } from '@/components/layouts';
import Script from 'next/script';

const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()}`,
  description: `Tobbedansen ${new Date().getFullYear()}. Machelen, Zulte. Alle informatie kan je terugvinden op de site`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='nl'>
      <Body className={roboto.className}>{children}</Body>
    </html>
  );
}
