'use client';

import React from 'react';
import useSWR from 'swr';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { DateTime } from 'luxon';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { endpoints } from '@/utils/constants';

interface VesselTypes {
  id: string;
  max_registrants: number;
  type: string;
}
interface CurrentEvent {
  id: string;
  year: number;
  registration_start_date: string;
  vessel_types: VesselTypes[];
}

interface FormWrapperProps {
  currentEvent: CurrentEvent;
}

export const FormWrapper = ({ currentEvent }: FormWrapperProps) => {
  const formSchema = z.object({
    read_the_rules: z.boolean(),
    music_request: z.string().optional(),
    assosciation: z.string().optional(),
    registrant: z.object({
      first_name: z.string({ message: 'Dit veld moet ingevuld worden' }),
      last_name: z.string({ message: 'Dit veld moet ingevuld worden' }),
      email: z
        .string()
        .min(1, { message: 'Dit veld moet ingevuld worden' })
        .email('Dit is geen geldig mailadres'),
      date_of_birth: z.string({ message: 'Dit veld moet ingevuld worden' }),
      place_of_birth: z.string({ message: 'Dit veld moet ingevuld worden' }),
      postal_code: z.string({ message: 'Dit veld moet ingevuld worden' }),
      street_name: z.string({ message: 'Dit veld moet ingevuld worden' }),
      street_number: z.string({ message: 'Dit veld moet ingevuld worden' }),
      city: z.string({ message: 'Dit veld moet ingevuld worden' }),
    }),
    participants: z.array(
      z.object({
        first_name: z.string({ message: 'Dit veld moet ingevuld worden' }),
        last_name: z.string({ message: 'Dit veld moet ingevuld worden' }),
        date_of_birth: z.string({ message: 'Dit veld moet ingevuld worden' }),
      })
    ),
    vessel: z.object({
      name: z.string({ message: 'Dit veld moet ingevuld worden' }),
      vessel_type_id: z.string(),
    }),
    event: z.string(),
  });

  const { control, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vessel: {
        name: '',
        vessel_type_id: currentEvent.vessel_types[0].id,
      },
      registrant: {
        date_of_birth: DateTime.now().toFormat('yyyy-MM-dd'),
        first_name: '',
        last_name: '',
        email: '',
        place_of_birth: '',
        city: '',
        postal_code: '',
        street_name: '',
        street_number: '',
      },
      event: currentEvent.id,
      assosciation: '',
      music_request: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'participants',
  });

  const vesselTypeId = useWatch({
    control,
    name: 'vessel.vessel_type_id',
    exact: true,
  });

  // cant be bothered...
  function removeEmptyFields(data: any) {
    Object.keys(data).forEach((key) => {
      if (data[key] === '' || data[key] == null) {
        delete data[key];
      }
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    const { read_the_rules, ...data } = values;
    await fetch(endpoints.registration.post, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  function addParticipant() {
    const vesselTypeId = form.getValues('vessel.vessel_type_id');
    const vesselType = currentEvent.vessel_types.find(
      ({ id }) => vesselTypeId === id
    );
    if (!vesselType) {
      console.error('No vessel types were loaded in');
      return;
    }
    const { max_registrants } = vesselType;

    if (fields.length + 1 >= max_registrants) {
      console.info('Max registrants reached');
      return;
    }

    append({
      first_name: '',
      last_name: '',
      date_of_birth: DateTime.now().toFormat('yyyy-MM-dd'),
    });
  }

  const maxRegistrants = currentEvent.vessel_types.find(
    ({ id }) => vesselTypeId === id
  )?.max_registrants;

  function removeParticipant(
    event: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    const index = Number(
      event.currentTarget.getAttribute('data-participant-index')
    );
    remove(index);
  }

  console.log(form);

  return (
    <Form control={control} {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md'>
        <div className='flex flex-wrap -mx-3'>
          <p className='px-3 font-medium leading-none text-black mb-2'>
            {`Tobbedansen ${currentEvent.year}`}
          </p>
          <p className='px-3 font-normal text-xs leading-none text-black mb-2'>
            {`* Verplicht veld`}
          </p>
          <FormField
            control={control}
            name='vessel.vessel_type_id'
            render={({ field }) => (
              <FormItem className='w-full px-3 mb-3'>
                <FormLabel>Hoe zal je van de schans gaan? *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex flex-col space-y-1'>
                    {currentEvent?.vessel_types.map(
                      ({ id, type, max_registrants }) => (
                        <FormItem
                          key={`vessel-type-radio-${id}`}
                          className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={id} />
                          </FormControl>
                          <FormLabel className='font-normal'>{`${type}`}</FormLabel>
                          <FormLabel className='font-normal text-xs'>{`(max. ${max_registrants} deelnemers)`}</FormLabel>
                        </FormItem>
                      )
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='vessel.name'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                <FormLabel>Tobbe naam *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='assosciation'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                <FormLabel>Vereniging</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='music_request'
            render={({ field }) => (
              <FormItem className='w-full  px-3 mb-3'>
                <FormLabel>Muziek verzoek</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className='px-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'>
            Deelnemer 1
          </p>
          <FormField
            control={control}
            name='registrant.first_name'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                <FormLabel>Voornaam *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.last_name'
            render={({ field }) => (
              <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                <FormLabel>Achternaam *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='registrant.email'
            render={({ field }) => (
              <FormItem className='w-full px-3 mb-3'>
                <FormLabel>E-mail *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.date_of_birth'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-full md:w-1/2 px-3'>
                <FormLabel>Geboortedatum *</FormLabel>
                <FormControl>
                  <Input
                    autoComplete='bday-day'
                    value={value}
                    type='date'
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.place_of_birth'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-full md:w-1/2 px-3'>
                <FormLabel>Geboorte plaats *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.city'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-1/2  px-3'>
                <FormLabel>Gemeente *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.postal_code'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-1/2  px-3'>
                <FormLabel>Postcode *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.street_name'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-full md:w-1/2 px-3'>
                <FormLabel>Straat *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='registrant.street_number'
            render={({ field: { value, ...field } }) => (
              <FormItem className='w-full md:w-1/2 px-3'>
                <FormLabel>Huisnummer *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {fields.map((field, index) => (
          <>
            <Separator className='my-4' />
            <div key={field.id} className='flex flex-wrap -mx-3 mb-3'>
              <div className='px-3 flex justify-between items-center w-full'>
                <p className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black'>
                  Deelnemer {index + 2}
                </p>
                <button
                  data-participant-index={index}
                  onClick={removeParticipant}>
                  <X className='ml-auto h-4 w-4' />
                </button>
              </div>
              <FormField
                control={control}
                name={`participants.${index}.first_name`}
                render={({ field }) => (
                  <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                    <FormLabel>Voornaam</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participants.${index}.last_name`}
                render={({ field }) => (
                  <FormItem className='w-full md:w-1/2 px-3 mb-3'>
                    <FormLabel>Achternaam</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`participants.${index}.date_of_birth`}
                render={({ field: { value, ...field } }) => (
                  <FormItem className='w-full md:w-1/2 px-3'>
                    <FormLabel>Geboortedatum</FormLabel>
                    <FormControl>
                      <Input value={value} type='date' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        ))}

        <FormField
          control={control}
          name='read_the_rules'
          render={({ field }) => (
            <FormItem className='w-full py-4'>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              <FormLabel className='ml-2'>
                Ik heb{' '}
                <Link target='_blank' href={'/assets/Reglement.pdf'}>
                  het regelement
                </Link>{' '}
                gelezen en ga hier mee akkoord.
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full justify-between items-center py-8'>
          {vesselTypeId && fields.length < (maxRegistrants ?? 1) - 1 ? (
            <Button
              variant={'secondary'}
              onClick={addParticipant}
              type='button'
              className=''>
              Deelnemer toevoegen
            </Button>
          ) : null}

          <Button className='' type='submit'>
            Inschrijven
          </Button>
        </div>
      </form>
    </Form>
  );
};

export const RegistrationForm = () => {
  const { data, isLoading } = useSWR<CurrentEvent>(
    endpoints.event.get.current,
    (arg: string) => fetch(arg).then((res) => res.json())
  );
  const today = DateTime.now();
  if (data) {
    console.log({
      regDate: DateTime.fromISO(data.registration_start_date).valueOf(),
      today: today.valueOf(),
    });
  }

  if (
    !isLoading &&
    data &&
    DateTime.fromISO(data.registration_start_date).valueOf() < today.valueOf()
  ) {
    return <FormWrapper currentEvent={data} />;
  } else {
    // return <p>Inschrijvingen zijn momenteel nog niet begonnen</p>;
    return null;
  }
};
