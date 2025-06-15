import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - FAQ`,
};

const Page = () => {
  return (
    <>
      <img className='o-banner__image' src='/img/faq.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <div className='o-layout__item u-1-of-2-bp3'>
                <div className='c-text'>
                  <h2 className='c-lead--head u-mb-clear'>FAQ</h2>
                  <h2 className='c-lead--head6 u-pt-clear u-mb-xl'></h2>
                </div>
              </div>
              <div className='o-layout__item u-1-of-2-bp3'>
                <h2>Waar gaat Tobbedansen door?</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <div style={{ width: '100%' }}>
                    <iframe
                      title='Karperstraat, 9870 Zulte'
                      width='100%'
                      height='300'
                      style={{ border: 0 }}
                      src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Karperstraat%209870%20Zulte+(Tobbedansen%202023)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>
                  </div>
                </div>
                <h2>Waar kan ik tickets kopen?</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <p>
                    Tickets zijn uitsluitend te kopen aan de kassa. Een ticket
                    voor vrijdag kost 6 euro, zaterdag 5 euro en een combiticket
                    10 euro
                  </p>
                </div>
                <h2>Met de fiets?</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <p>
                    Denk jij ook aan het milieu? Ben je sportief? Neem dan je
                    stalen ros en parkeer je fiets aan de aanliggende wegen of
                    in het dorpscentrum.
                  </p>
                </div>
                <h2>Met de wagen?</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <p>
                    Kom je (al dan niet carpoolend) met de wagen? Hou dan
                    rekening dat er geen parking voorzien is. Parkeren kan op
                    “parking leihoekstraat” of in de kloosterstraat. Indien je
                    bent genoodzaakt om te parkeren langs straat, hou dan zeker
                    rekening met het verkeersreglement en de buurtbewoners.
                  </p>
                </div>
                <h2>Openingsuren</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <ul>
                    <li>
                      <p>
                        Op vrijdag 30 augustus openen de deuren om 19u en
                        sluiten we de eerste avond af om 2u.
                      </p>
                    </li>
                    <li>
                      <p>
                        Op zaterdag 31 augustus gaan de deuren open om 14u, de
                        eerste tobbe duikt van de schans af om 14u30. Om 4u gaan
                        de deuren dicht en keert de rust terug op het Roger
                        Raveelplein.
                      </p>
                    </li>
                  </ul>
                </div>
                <h2>Toch nog een vraag?</h2>
                <div className='c-lead c-lead--text u-mb-lg'>
                  <p>
                    Heb je na het lezen van alle info toch nog een vraag? Het
                    lijkt onmogelijk maar het kan. Neem dan contact op met ons
                    en we proberen jouw vraag zo snel mogelijk te beantwoorden.
                    Je bereikt ons via het contactformulier.
                  </p>
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
