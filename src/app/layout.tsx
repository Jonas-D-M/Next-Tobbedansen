import type { Metadata } from 'next';

import '@/style/screen.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()}`,
  description: `Tobbedansen ${new Date().getFullYear()}. Machelen, Zulte. Alle informatie kan je terugvinden op de site`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang='nl'>{children}</html>;
}
