import ExportedImage from 'next-image-export-optimizer';

import { Countdown } from '@/components/countdown';

export default function Home() {
  return (
    <main style={{ height: '100%' }} className='u-bg-picture'>
      <section className='o-row'>
        <div className='o-container'>
          <div className='o-layout'>
            <div className='c-intro'>
              <div className='c-intro__logo'>
                <figure className='u-mb-xl'>
                  <picture>
                    <img
                      className='c-logo__main'
                      src={'img/Logo.png'}
                      alt='Logo'
                    />
                  </picture>
                </figure>
              </div>
              <Countdown />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
