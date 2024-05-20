import type { Metadata } from 'next';

import '@/style/globals.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='nl'>
      <body className='p-4'>{children}</body>
    </html>
  );
}
