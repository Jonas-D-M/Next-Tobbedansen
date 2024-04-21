import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactNode } from 'react';

interface NavItemProps extends LinkProps {
  children: ReactNode;
}

export const NavItem = ({ children, ...props }: NavItemProps) => {
  return (
    <Link {...props} className='c-nav__link'>
      {children}
    </Link>
  );
};
