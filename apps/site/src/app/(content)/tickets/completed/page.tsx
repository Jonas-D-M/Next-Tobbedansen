import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Tickets`,
};

const Page = () => {
  return (
    <>
      <img className='o-banner__image' src='/img/contact.jpg' alt='' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout justify-center flex-col'>
              <h1 className='text-3xl font-bold mb-4 text-primary'>
                Bedankt voor je bestelling!
              </h1>
              <div>
                <p className='text-lg text-gray-700 '>
                  Je hebt succesvol tickets besteld voor Tobbedansen. Je
                  ontvangt binnenkort een e-mail met verdere informatie en je
                  tickets.
                </p>
                <p>
                  Nog vragen? Aarzel niet om ons te{' '}
                  <Link href='/contact'>contacteren</Link>.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
