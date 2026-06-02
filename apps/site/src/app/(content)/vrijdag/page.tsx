import LineupBlock from '@/components/LineupBlock';
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
                  Iedereen die er de vorige edities bij was, weet het
                  ondertussen: Tobbedansen staat garant voor sfeer, muziek en
                  een plein dat tot in de late uurtjes blijft bewegen. Ook
                  vorig jaar was het weer prijs: veel ambiance, lachende
                  gezichten en een dansvloer die geen seconde leeg stond.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  En ook dit jaar staan we weer klaar met een line-up die er
                  mag zijn. We trappen af van <b>20u tot 21u30</b> met{' '}
                  <b>Pink Ties</b>, een bende jong geweld op het podium.
                  Verwacht frisse energie, bekende nummers en meteen de juiste
                  sfeer om de avond goed in gang te trekken. Daarna is het van{' '}
                  <b>22u15 tot 23u45</b> de beurt aan <b>Blue Dawn</b>, nog zo’n
                  straffe coverband die perfect weet hoe ze een plein moeten
                  laten meezingen en dansen.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Vanaf middernacht schakelen we een versnelling hoger met{' '}
                  <b>Dave &amp; Danny</b>, dé party-dj’s van het land. Verwacht
                  je aan een stevige mix van hardstyle, techno, schlager en
                  meezingers, stilstaan wordt moeilijk van <b>24u tot 1u</b>. En
                  wie dan nog energie over heeft, kan blijven hangen voor de
                  afsluiter van de avond. Van <b>1u tot 2u</b> neemt{' '}
                  <b>Medaase</b>, een DJ-duo met Ghanese roots, het over om
                  de nacht stijlvol af te ronden en het laatste beetje energie
                  uit het plein te persen.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Kort gezegd: alle ingrediënten zijn opnieuw aanwezig voor een
                  avond vol ambiance, muziek en goeie momenten.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  Net zoals vorig jaar zijn er zowel combi-tickets als aparte
                  tickets te koop. Voor een ticket voor zowel vrijdag als
                  zaterdag betaal je 10 euro, voor enkel vrijdag betaal je 6
                  euro. Tickets zijn online of aan de kassa verkrijgbaar.
                </p>
                <LineupBlock
                  items={[
                    {
                      label: 'Pink Ties',
                      time: '20u – 21u30',
                    },
                    {
                      label: 'Blue Dawn',
                      time: '22u15 – 23u45',
                    },
                    {
                      label: 'Dave & Danny',
                      time: '24u – 1u',
                    },
                    {
                      label: 'Medaase',
                      time: '1u – 2u',
                    },
                  ]}
                />
              </div>
            </div>
          </article>
        </div>
        <div className='o-row o-row-xl'></div>
      </section>
    </>
  );
};

export default Page;
