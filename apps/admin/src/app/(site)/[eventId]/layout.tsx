import prisma from '@/app/(api)/db';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { notFound } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

interface LayoutProps extends PropsWithChildren {
  params: {
    eventId: string;
  };
}

const Layout = async ({ params: { eventId }, children }: LayoutProps) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    select: { year: true },
  });

  if (!event) {
    return notFound();
  }

  return (
    <div className='container'>
      <Breadcrumb className='mb-2'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{event.year}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
