import prisma from '@/app/(api)/db';
import { H1 } from '@/components/typography';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { PropsWithChildren } from 'react';
import { EventSettings } from './_settings';

interface LayoutProps extends PropsWithChildren {
  params: {
    eventId: string;
  };
}

const Layout = async ({ params: { eventId }, children }: LayoutProps) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    return notFound();
  }

  return (
    <div className='flex flex-col grow'>
      <section className='flex flex-col grow'>
        <span className='inline-flex items-baseline gap-x-4 mb-2'>
          <H1>Inschrijvingen {event.year}</H1>
          <EventSettings event={event} />
        </span>
        <Breadcrumb className='mb-2'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href='/'>Evenementen</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{event.year}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {children}
      </section>
    </div>
  );
};

export default Layout;
