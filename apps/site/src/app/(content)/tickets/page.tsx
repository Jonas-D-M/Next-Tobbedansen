import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import React, { useEffect } from 'react';
import TicketForm from './form';

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
  const eventId = 'tobbedansen-2025';

  return (
    <>
      <img className='o-banner__image' src='/img/contact.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <TicketForm eventId={eventId} />
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
