import { getEventWeekend } from '@/utils/helpers';
import React from 'react';

const Page = () => {
  const { saturday } = getEventWeekend();
  return (
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
                Zaterdag gaan we door met het originele idee, gebaseerd op het
                bekende TROS-programma “TER LAND, TER ZEE EN IN DE LUCHT”,
                waarbij de deelnemers met een zelf in elkaar geknutselde tobbe
                van een schans naar beneden rijden en zo snel mogelijk de bel
                proberen te bereiken.
              </p>

              <p className='c-lead c-lead--text u-mb-lg'>
                Vele jaren werden de deelnemers nog gescheiden van de bel door
                een obstakel, maar dit jaar grijpen we een laatste keer terug
                naar het concept van vorig jaar. Aan de start worden de
                deelnemers naar beneden geduwd om met een degelijke snelheid van
                de schans (met een helling van ± 20°) te razen. Die schans
                versmalt op het einde van 2.5m naar 1.5m. Vanaf deze schans komt
                de tobbe niet meteen op het water (zie onderstaande foto) maar
                op een ponton. Eenmaal op het ponton is het de bedoeling om op
                het einde binnen de aangeduide zone te remmen zodat de tobbe in
                de zone staat. Eenmaal de tobbe binnen de zone staat springen de
                deelnemers zo snel mogelijk naar de bel (2 meter) om prachtige
                prijzen binnen te halen. Vergeet zeker niet om het reglement er
                eens op na te lezen, hierin is duidelijk uitgelegd wat wel en
                niet mag.
              </p>
              <img className='u-mb-lg' src='img/parcour.png' alt='parcour' />
              <p className='c-lead c-lead--text'>
                Inspiratie nodig? Kijk hier hoe het moet:
              </p>
              <div className='iframeWrapper u-mb-lg'>
                <iframe
                  width='560'
                  height='349'
                  src='https://www.youtube-nocookie.com/embed/w46RTqZscoM'
                  title='YouTube video player'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>

              <p className='c-lead c-lead--text u-mb-lg'>
                Zaterdag na de prijsuitreiking gaan we door met een tweede
                spetterend feestje. Dit wordt op gang getrokken door Cover-line,
                waarna THE JULIETS (gekend van de Vlinvestifal,
                Septemberfeesten, Stressfactor…) het feest compleet zullen maken
                na het vuurwerk.
              </p>
              <p className='c-lead c-lead--text u-mb-lg'>
                Hierna zetten we het feest verder met MNM Start To DJ winnaar
                TOLAG OG en Sven Van Alboom (gekend van Tomorrowland ,Sunrise
                Festival, Ostend Beach,…). Vervolgens zal het vertrouwde duo
                Sïmplex overnemen waarna Employerz Tobbedansen 2023 tot een mooi
                einde zal brengen.
              </p>
              <p className='c-lead c-lead--text u-mb-lg'>
                Schrijf 2 september 2023 dus in jullie agenda, wij kijken alvast
                uit naar jullie originele constructies en het feestje achteraf,
                jullie hopelijk ook.
              </p>
              <p className='c-lead c-lead--text'>Tot dan!</p>
              {/* <div className="c-lead c-lead--text u-mb-lg">
                <video controls autoPlay muted className="videoInsert">
                  <source src="assets/video/aftermovie.mp4" type="video/mp4" />
                  Het is helaas niet mogelijk om onze aftermovie op deze browser
                  te tonen :(
                </video>
              </div> */}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Page;
