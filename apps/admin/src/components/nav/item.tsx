import Link from 'next/link';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const NavItem = ({
  className,
  children,
  ...props
}: PropsWithChildren<ComponentProps<typeof Link>>) => {
  return (
    <Link className={twMerge('', className)} {...props}>
      {children}
    </Link>
  );
};
