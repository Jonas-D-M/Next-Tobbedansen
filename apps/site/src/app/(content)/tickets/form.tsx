'use client';

import React, { useEffect, useState } from 'react';
import { useGetEventTickets, usePurchaseTickets } from '@/lib/api/tickets-swr';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

const ticketOrderSchema = z.object({
  name: z.string().min(1, 'Je naam is verplicht'),
  email: z.string().email('Vul een geldig e-mailadres in'),
  quantity: z.coerce
    .number({
      required_error: 'Aantal is verplicht',
      invalid_type_error: 'Aantal moet een geldig getal zijn',
    })
    .min(1, 'Je moet minstens 1 ticket kiezen')
    .max(10, 'Je kan maximaal 10 tickets bestellen'),
});

type TicketOrderFormValues = z.infer<typeof ticketOrderSchema>;

const TicketForm = ({ eventId }: { eventId: string }) => {
  const { data: tickets, error } = useGetEventTickets(eventId);
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<TicketOrderFormValues>({
    resolver: zodResolver(ticketOrderSchema),
    defaultValues: { name: '', email: '', quantity: 1 },
    mode: 'onChange',
  });

  const {
    trigger: purchase,
    isMutating,
    error: purchaseError,
  } = usePurchaseTickets(eventId);

  const selectedTicket =
    tickets?.find((t) => t.id === selectedTicketId) ?? null;

  function handleSelectTicket(ticketId: string) {
    setSelectedTicketId(ticketId);
    setStep('form');
  }

  function handleGoBack() {
    setSelectedTicketId(null);
    setStep('select');
  }

  async function handleSubmit(values: TicketOrderFormValues) {
    if (!selectedTicketId) return;

    try {
      const response = await purchase({
        ticketId: selectedTicketId,
        ...values,
      });

      if (response?.checkoutUrl) {
        router.push(response.checkoutUrl);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    if (step === 'form') {
      setTimeout(() => {
        document
          .getElementById('order-form')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [step]);

  if (error) {
    return <div>Fout bij het ophalen van tickets: {error.message}</div>;
  }

  if (!tickets) {
    return <div>Bezig met laden…</div>;
  }

  return (
    <div className='space-y-6 px-4 sm:px-0'>
      {/* Stap 1: ticket kiezen */}
      {step === 'select' && (
        <>
          <h2 className='text-lg font-semibold text-center'>
            Kies je tickettype
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => handleSelectTicket(ticket.id)}
                className='p-4 border rounded-lg text-left hover:bg-gray-50 transition-all'>
                <p className='font-medium text-base'>{ticket.name}</p>
                <p className='text-sm text-center text-gray-500 mt-1'>
                  €{ticket.price}
                </p>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Stap 2: formulier invullen */}
      {step === 'form' && selectedTicket && (
        <div id='order-form' className='scroll-mt-20'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='max-w-md mx-auto mt-6 space-y-4 bg-white border rounded-lg p-6 shadow'>
              <p className='text-lg font-semibold text-center'>
                Bestelling voor: {selectedTicket.name}
              </p>

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naam</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Jouw naam'
                        {...field}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mailadres</FormLabel>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='voorbeeld@domein.be'
                        {...field}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='quantity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aantal</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        inputMode='numeric'
                        {...field}
                        className='w-full'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='text-right text-sm text-gray-700 font-medium'>
                Totaal: €
                {(
                  Number(form.watch('quantity') || 0) * selectedTicket.price
                ).toFixed(2)}
              </div>

              {purchaseError && (
                <p className='text-sm text-red-500'>
                  {purchaseError.message ||
                    'Er ging iets mis bij het bestellen'}
                </p>
              )}

              <div className='flex justify-between gap-2'>
                <Button
                  type='button'
                  variant='secondary'
                  onClick={handleGoBack}
                  className='w-1/2'>
                  Terug
                </Button>
                <Button type='submit' disabled={isMutating} className='w-1/2'>
                  Bestel
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
