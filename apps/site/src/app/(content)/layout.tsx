import { Body } from '@/components/layouts';
import React, { PropsWithChildren } from 'react';
import { montserrat, roboto } from '../fonts';
import Footer from '@/components/layouts/footer';

const layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Body className={`${roboto.variable} ${montserrat.variable}`}>
        {children}
        <Footer />
      </Body>
    </>
  );
};

export default layout;
