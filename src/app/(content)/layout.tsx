import { Body } from '@/components/layouts';
import React, { PropsWithChildren } from 'react';
import { montserrat, roboto } from '../fonts';
import Footer from '@/components/layouts/footer';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Body className={`${roboto.variable} ${montserrat.variable}`}>
        <div className='o-banner__image'></div>
        {children}
        <Footer />
      </Body>
    </>
  );
};

export default layout;
