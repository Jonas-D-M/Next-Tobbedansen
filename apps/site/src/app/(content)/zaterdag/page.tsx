import LineupBlock from '@/components/LineupBlock';
import { getEventWeekend } from '@/utils/helpers';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Zaterdag`,
};

const Page = () => {
  const { saturday } = getEventWeekend();
  return (
    <>
      <img className='o-banner__image' src='/img/zaterdag.jpg' />
      <section className='o-row o-row--xl'>
        <div className='o-container u-max-width-xl'>
          <article className='o-section o-section--xl'>
            <div className='o-layout'>
              <div className='o-layout__item u-1-of-2-bp3'>
                <h2 className='c-lead--head u-mb-clear'>Zaterdag</h2>
                <h2 className='c-lead--head6 u-pt-clear u-mb-xl'>
                  {saturday.toLocaleDateString('nl-be', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </h2>
              </div>
              <div className='o-layout__item u-1-of-2-bp3'>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Zaterdag gaan we opnieuw voor het originele concept,
                  geïnspireerd op het legendarische TROS-programma “Ter Land,
                  Ter Zee en in de Lucht”. Het idee blijft simpel en plezant:
                  deelnemers razen met een zelfgebouwde tobbe van een schans
                  naar beneden en proberen zo snel mogelijk de bel te bereiken.
                </p>

                <p className='c-lead c-lead--text u-mb-lg'>
                  Dit jaar werken we voor de laatste keer verder met het
                  parcours van vorig jaar. Aan de start krijgen de deelnemers
                  een stevige duw, zodat ze met voldoende snelheid van de
                  schans (met een helling van ongeveer 20°) naar beneden
                  knallen. Onderaan belandt de tobbe rechtstreeks in het water,
                  waarna het aan de deelnemers is om zo snel mogelijk verder te
                  varen, peddelen of ploeteren richting het obstakel. Daar stopt
                  het nog niet: eens aangekomen aan het obstakel moet je eerst
                  omhoog klauteren en daarna een hangbrug trotseren voor je
                  uiteindelijk de bel kan luiden. En wie de bel weet te halen?
                  Die maakt uiteraard kans op prachtige prijzen.
                </p>

                <p className='c-lead c-lead--text'>
                  Vergeet zeker niet om het reglement eens goed door te nemen.
                  Daarin staat duidelijk uitgelegd wat wel en niet mag, zodat
                  iedereen veilig én eerlijk kan deelnemen.
                </p>
                <br />
                <p className='c-lead c-lead--text'>Bovenaanzicht:</p>
                <img
                  className='u-mb-lg'
                  src='/img/parcour-1.jpg'
                  alt='parcour'
                />
                <br />
                <p className='c-lead c-lead--text'>Zijaanzicht:</p>
                <img
                  className='u-mb-lg'
                  src='/img/parcour-2.jpg'
                  alt='parcour'
                />

                <p className='c-lead c-lead--text u-mb-lg'>
                  <b>Zaterdag 5 september 2026</b> wordt opnieuw een dag om
                  niet snel te vergeten! Na de prijsuitreiking schakelen we
                  meteen over naar een tweede spetterend feestje, en dat doen
                  we zoals altijd in stijl. <b>The Bumbelbeez</b> bijten de
                  spits af van <b>20u tot 21u15</b> met hun energieke live
                  coverband die elk evenement moeiteloos omtovert tot een
                  onvergetelijk feest. Daarna is het van <b>22u15 tot 23u45</b>{' '}
                  de beurt aan <b>Coockies and Cream</b>, een absolute must-have
                  coverband die niet alleen muzikaal sterk uitpakt, maar ook
                  zorgt voor een flamboyant spektakel op het podium. Verwacht
                  ambiance, show en een plein dat volledig losgaat.
                  <br />
                  <br />
                  Maar daar stopt het natuurlijk niet!
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Vanaf middernacht neemt onze vaste waarde en resident DJ van
                  Tobbedansen, <b>DJ Miles</b>, het over van <b>24u tot 1u</b>{' '}
                  om de sfeer stevig vast te houden en iedereen op de
                  dansvloer te houden. Vervolgens is het de beurt aan{' '}
                  <b>Mr. Noisy</b> van <b>1u tot 2u30</b>, onze eigen
                  Machelenaar die je misschien kent van Studio Brussel, waar
                  hij in 2024 en 2025 wekelijks de ‘minifuif voor maxipret’
                  verzorgde. Met zijn vlotte mix van de beste tracks uit de
                  jaren nul weet hij als geen ander hoe hij het publiek moet
                  laten meezingen en dansen. Als kers op de taart sluiten we af
                  met <b>C-Track</b>, die van <b>2u30 tot 4u</b> zorgt voor een
                  stevige finale en Tobbedansen 2026 tot in de vroege uurtjes
                  laat nazinderen.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Schrijf zaterdag 5 september 2026 dus met stip in jullie
                  agenda. Wij kijken alvast uit naar jullie originele
                  constructies én het feestje achteraf… jullie hopelijk ook!
                </p>
                <p className='c-lead c-lead--text'>Tot dan!</p>
                <LineupBlock
                  items={[
                    {
                      label: 'The Bumbelbeez',
                      time: '20u – 21u15',
                    },
                    {
                      label: 'Coockies and Cream',
                      time: '22u15 – 23u45',
                    },
                    {
                      label: 'DJ Miles',
                      time: '24u – 1u',
                    },
                    {
                      label: 'Mr. Noisy',
                      time: '1u – 2u30',
                    },
                    {
                      label: 'C-Track',
                      time: '2u30 – 4u',
                    },
                  ]}
                />
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default Page;
