import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: `Tobbedansen ${new Date().getFullYear()} - Reglement`,
};

const Page = () => {
  return (
    <section className='o-row o-row--xl'>
      <div className='u-max-width-xl'>
        <article className='o-section o-section--xl'>
          <div className='o-layout'>
            <div className='o-layout__item'>
              <div className='c-text'>
                <h2 className='c-lead--head u-mb-clear'>Reglement</h2>
                <h2 className='c-lead--head6 u-pt-clear u-mb-xl'></h2>
                <object
                  data='/assets/Reglement.pdf'
                  style={{ height: '100vh', width: '100%' }}
                  type='application/pdf'
                  height='100vh'
                  width='100%'>
                  <p style={{ marginBottom: '15rem' }}>
                    Kan PDF niet weergeven <br />
                    <a href='/assets/Reglement.pdf'>
                      Klik hier om het reglement te downloaden
                    </a>
                  </p>
                </object>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Page;
