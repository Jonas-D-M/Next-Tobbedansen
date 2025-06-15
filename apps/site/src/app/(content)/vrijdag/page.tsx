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
                  Iedereen die er vorig jaar bij was, weet het: Tobbedansen 2024
                  was er boenk op. Van Wulder (die last minute inviel voor
                  Pixiedust) tot Still Crazy, en van NotForRadio tot Proudmich,
                  elke act deed de oude Leie golven creëren. Het werd een avond
                  om in te kaderen.
                </p>
                <p className='c-lead c-lead--text u-mb-lg'>
                  En ook dit jaar doen we er niet voor onder. We hebben opnieuw
                  een knaller van een line-up voor jullie klaarstaan. We trappen
                  af om <b>19u45</b> met <b>Pixiedust</b>, die er vorig jaar
                  helaas niet bij kon zijn, maar nu wél de dansvloer in vuur en
                  vlam komt zetten. Vervolgens is het aan{' '}
                  <b>June for President</b>, deze zomer ook te zien op de Gentse
                  Feesten, om de sfeer verder op te drijven. Als iedereen goed
                  opgewarmd is, stuwt <b>MC Captain Soundsystem</b> met zijn
                  zwoele beats de sfeer richting hoogtepunt. En dan… het moment
                  suprême: <b>FLO WINDEY ft. SKYVE</b> sluiten de avond én hun
                  zomer af met hun allerlaatste DJ-set OOIT. Ze hebben plechtig
                  beloofd om het plein te doen daveren en jullie zwetend en vol
                  adrenaline uit te zwaaien. Verwacht een explosieve mix van
                  pompende beats, energieke mash-ups en een sfeer om nooit te
                  vergeten. Mis deze unieke kans niet om het duo nog één keer
                  live mee te maken.
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
                <LineupBlock
                  items={[
                    {
                      label: 'Pixiedust',
                      time: '19u45 – 21u15',
                      image: '/img/artists/friday/1.webp',
                    },
                    {
                      label: 'June for President',
                      time: '22u – 23u45',
                      image: '/img/artists/friday/2.jpg',
                    },
                    {
                      label: 'MC Captain Soundsystem',
                      time: '00u – 01u',
                      image: '/img/artists/friday/3.png',
                    },
                    {
                      label: 'FLO WINDY ft. SKYVE',
                      time: '01u – 02u',
                      image: '/img/artists/friday/4.jpg',
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
