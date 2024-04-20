'use client';
import Link from 'next/link';
import Script from 'next/script';
import React, { useEffect } from 'react';

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

const Page = () => {
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }

    return () => {};
  }, []);

  return (
    <>
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <div className='o-layout__item u-1-of-2-bp3'>
                <h2 className='c-lead--head'>Contact</h2>
              </div>
              <div className='o-layout__item u-1-of-2-bp3'>
                <p className='c-lead c-lead--text u-mb-lg'>
                  U kan ons bereiken via info@tobbedansen.be ofwel via onze{' '}
                  <Link href={'https://www.facebook.com/Tobbedansen'}>
                    facebook pagina
                  </Link>
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
