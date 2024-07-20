import React from 'react';
import { RegistrationTable } from './_registrations';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ParticipantTable } from './_participants';

interface PageProps {
  params: {
    eventId: string;
  };
}

const Page = async ({ params: { eventId } }: PageProps) => {
  return (
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
  );
};

export default Page;
