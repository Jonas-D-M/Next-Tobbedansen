import React from 'react';
import { Cog, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Event } from '@tobbedansen/db';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormField, FormItem } from '@/components/ui/form';

interface EventSettingsProps {
  event: Event;
}

const formSchema = z.object({
  registration_start_date: z.date(),
  registration_end_date: z.date(),
});

export const EventSettings = ({ event }: EventSettingsProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      registration_start_date: event.registration_start_date,
      registration_end_date: event.registration_end_date,
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Cog className='cursor-pointer opacity-40' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`Tobbedansen ${event.year} aanpassen`}</DialogTitle>
          <DialogDescription>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
                <FormField
                  control={form.control}
                  name='registration_start_date'
                  render={({field})=>(
                    <FormItem>
                      <
                    </FormItem>
                  )}
                />
              </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
