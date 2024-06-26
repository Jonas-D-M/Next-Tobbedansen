import { getEventWeekend } from '@/utils/helpers';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Vrijdag`,
};

const Page = () => {
  const { friday } = getEventWeekend();
  return (
    <>
      <img className='o-banner__image' src='/img/vrijdag.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <div className='o-layout__item u-1-of-2-bp3'>
                <h2 className='c-lead--head u-mb-clear'>Vrijdag</h2>
                <h2 className='c-lead--head6 u-pt-clear u-mb-xl'>
                  {friday.toLocaleDateString('nl-be', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </h2>
              </div>
              <div className='o-layout__item u-1-of-2-bp3'>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Iedereen die vorig jaar aanwezig was, kan getuigen.
                  Tobbedansen 2023 was een editie om nooit te vergeten. Zowel{' '}
                  <i>Opt gemakske</i> als <i>Go ninja GO</i> speelden de pannen
                  van het dak waarna de DJ’s <i>Nine 2 Five</i> en{' '}
                  <i>TWO FOR YOU</i> het feestje op een magistrale wijze
                  afwerkten. Kortom, het was een editie om in te kaderen.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Ook dit jaar mogen we natuurlijk niet onderdoen. We hebben
                  opnieuw enkele toppers op het affiche staan. Zo beginnen we om
                  20u met het opkomende talent <i>Pixiedust</i> waarna{' '}
                  <i>Still Crazy</i>, bekend van onder meer De Gentse Feesten,
                  het feestje compleet zal maken. Wanneer iedereen volledig is
                  opgewarmd zal <i>NotForRadio</i> met een gekke liveshow de
                  ambiance naar een hoogtepunt brengen. Tot slot zal ons lokaal
                  talent <i>Proudmich</i> driedubbele knopen in de veters van
                  ieders dansschoenen draaien tot het einde van de avond!
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Net zoals vorig jaar zijn er zowel combi-tickets als aparte
                  tickets te koop. Voor een ticket voor zowel vrijdag als
                  zaterdag betaal je 10 euro, voor enkel vrijdag betaal je 6
                  euro. Tickets zijn aan de kassa te verkrijgen.
                </p>
                <div className='c-lead c-lead--text u-mb-lg'>
                  {/* <video controls autoPlay muted className="videoInsert">
                  <source src="assets/video/aftermovie.mp4" type="video/mp4" />
                  Het is helaas niet mogelijk om onze aftermovie op deze browser
                  te tonen :(
                </video> */}
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
