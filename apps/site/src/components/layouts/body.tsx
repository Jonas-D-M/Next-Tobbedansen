'use client';
import React, { PropsWithChildren, useRef } from 'react';
import { MobileNav, Nav } from '@/components/nav';

interface BodyProps extends PropsWithChildren {
  className: string;
}

export const Body = ({ children, className }: BodyProps) => {
  const bodyRef = useRef<HTMLBodyElement>(null);

  const handleOnMobileMenuClick = () => {
    console.log('click');

    bodyRef.current?.classList.toggle('has-mobile-nav');
  };

  return (
    <body ref={bodyRef} className={`${className}`}>
      <Nav onMenuBtnClick={handleOnMobileMenuClick} />
      {children}
      <MobileNav onMenuBtnClick={handleOnMobileMenuClick} />
    </body>
  );
};
