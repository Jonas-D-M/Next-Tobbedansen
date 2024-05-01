import { Metadata } from 'next';
import React from 'react';
import { RegistrationForm } from './form';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Inschrijvingen`,
};

const Page = () => {
  return (
    <>
      <img className='o-banner__image' src='/img/jump.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <RegistrationForm />
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
