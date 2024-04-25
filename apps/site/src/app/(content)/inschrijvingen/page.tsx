import TextInput from '@/components/inputs';
import { Metadata } from 'next';
import React from 'react';
import { RegistrationForm } from './form';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Inschrijvingen`,
};

const formItems = [
  {
    type: 'text',
    name: 'entry.1590447953',
    placeholder: 'Voornaam',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.609469685',
    placeholder: 'Naam',
    required: true,
  },
  {
    type: 'email',
    name: 'entry.1256978498',
    placeholder: 'E-mail',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.1052038244',
    placeholder: 'Gemeente',
    required: true,
  },
  {
    type: 'number',
    name: 'entry.1647528450',
    placeholder: 'Postcode',
    required: true,
  },
  {
    type: 'text',
    name: 'entry.1364363486',
    placeholder: 'Straat & nr',
    required: true,
  },
  {
    type: 'number',
    name: 'entry.1319474406',
    placeholder: 'Telefoonnummer',
    maxLength: 10,
    required: true,
  },
  {
    type: 'date',
    name: 'entry.438875400',
    placeholder: 'Geboortedatum',
    required: true,
    readOnly: true,
  },
  {
    type: 'text',
    name: 'entry.1621228601',
    placeholder: 'Geboorteplaats',
    required: true,
  },
];

const Page = () => {
  return (
    <>
      <img className='o-banner__image' src='/img/jump.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <div className='o-layout__item u-1-of-2-bp3'>
                <h2 className='c-lead c-lead--head'>Inschrijvingen</h2>
              </div>
              <div className='o-layout__item u-1-of-2-bp3'>
                <RegistrationForm />
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
