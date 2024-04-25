'use client';
import React from 'react';
import useSWR from 'swr';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export const RegistrationForm = () => {
  const { data } = useSWR('http://localhost:3001/api/event/current', (arg) =>
    fetch(arg).then((res) => res.json())
  );

  const formSchema = z.object({
    music_request: z.string().optional().nullable(),
    assosciation: z.string().optional().nullable(),
    registrant: z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string(),
      date_of_birth: z.coerce.date(),
      place_of_birth: z.string(),
    }),
    participants: z.array(
      z.object({
        first_name: z.string(),
        last_name: z.string(),
        date_of_birth: z.coerce.date(),
      })
    ),
    vessel: z.object({
      name: z.string(),
      type: z.string(),
      vessel_type_id: z.string(),
    }),
    event: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    // <form
    //   action='https://docs.google.com/forms/d/e/1FAIpQLSfTsfhlNtihs1ksb4VaKDfJrW3sC6coOjpmbv6nJb6dnIKXmA/formResponse'
    //   method='POST'>
    //   <p>{JSON.stringify(data)}</p>
    // </form>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='vessel.vessel_type_id'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder='shadcn' {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};
