import prisma from '@/app/(api)/db';
import { H1 } from '@/components/typography';
import React from 'react';
import { RegistrationTable } from './_registrations';
import { RegistrationColumns, columns } from './_registrations/columns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticipantTable } from './_participants';

interface PageProps {
  params: {
    eventId: string;
  };
}

const Page = async ({ params: { eventId } }: PageProps) => {
  return (
    <div>
      <H1 className='mb-2'>Inschrijvingen</H1>
      <Tabs defaultValue='registrations'>
        <TabsList>
          <TabsTrigger value='registrations'>Registraties</TabsTrigger>
          <TabsTrigger value='participants'>Deelnemers</TabsTrigger>
        </TabsList>
        <TabsContent value='registrations'>
          <RegistrationTable eventId={eventId} />
        </TabsContent>
        <TabsContent value='participants'>
          <ParticipantTable eventId={eventId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
