import React from 'react';
import { SponsorImage } from '@/components/sponsor-image';

const sponsors = [
  'img/sponsors/A5-batutrans-(1)_1.jpg',
  'img/sponsors/Afspanning.png',
  'img/sponsors/BIO-solutions.png',
  'img/sponsors/BNPparibasFortis_Deinze_1.jpg',
  'img/sponsors/BRUYNEEL_1.jpg',
  'img/sponsors/Benoit_logo_positief_CMYK_1.jpg',
  'img/sponsors/Creaplan_stands_interiors_displays_tr.png',
  'img/sponsors/DESMET-Logo_hoge-resolutie.jpg',
  'img/sponsors/Elle.png',
  'img/sponsors/Groep-de-Prins-def_1.jpg',
  'img/sponsors/GuntherVanHof.jpg',
  'img/sponsors/HEYERICK_1.jpg',
  'img/sponsors/IDZI.jpg',
  'img/sponsors/Inbetween-Mailtag.jpg',
  'img/sponsors/JulieBraemBV_drukwerk_1.jpg',
  'img/sponsors/Koornbloem.png',
  'img/sponsors/La-tourelle.png',
  "img/sponsors/Logo---O'5-Accountancy.PNG",
  'img/sponsors/Logo-DM-WOOD_1.jpg',
  'img/sponsors/Nationale-loterij.png',
  'img/sponsors/RVB.png',
  'img/sponsors/Reclame-KVK-2_1.jpg',
  'img/sponsors/Reclame-KVK-2_2.jpg',
  'img/sponsors/SDS.png',
  'img/sponsors/Tuinen-gevaert.png',
  'img/sponsors/VF-BIKES-banner-_1.jpg',
  'img/sponsors/Vernackt_1.jpg',
  'img/sponsors/Vitralux.png',
  'img/sponsors/advertentie_descamps4_1.jpg',
  'img/sponsors/alvino.png',
  'img/sponsors/bakkerijLarise_1.jpg',
  'img/sponsors/cola.png',
  'img/sponsors/de-ronne_1.jpg',
  'img/sponsors/delbaere-de-pau.png',
  'img/sponsors/foodbart@300x.png',
  'img/sponsors/happysnack_1.jpg',
  'img/sponsors/locatrans2.PNG',
  'img/sponsors/logo-voor-billit-DUBO.png',
  'img/sponsors/o-in-a-box.png',
  'img/sponsors/pbm.jpg',
  'img/sponsors/perfecta_1.jpg',
  'img/sponsors/ruyck-schilderwerken.PNG',
  'img/sponsors/samyrenting-(1)_1.jpg',
  'img/sponsors/take-the-shot.png',
  'img/sponsors/vanbrabandt-(1)_1.jpg',
  'img/sponsors/vantieghem-deruyck-a5-9-(1)_1.jpg',
  'img/sponsors/vastgoed-schepens-(de-ronne).png',
  'img/sponsors/zakenkantoor-feys---de-nys.jpg',
];

const Page = async () => {
  return (
    <>
      <img className='o-banner__image' src='/img/contact.jpg' />
      <section className='o-row o-row--xl'>
        <div
          style={{ minHeight: '100%' }}
          className='container flex-wrap flex gap-x-2 gap-y-2 items-center justify-center'>
          {sponsors.map((image) => (
            <div key={image}>
              <SponsorImage
                src={image}
                alt={image}
                width={0}
                height={0}
                className='w-full h-auto'
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Page;
