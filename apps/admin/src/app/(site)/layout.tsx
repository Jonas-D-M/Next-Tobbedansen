import { getUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const Layout = async ({ children }: PropsWithChildren) => {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return <>{children}</>;
};

export default Layout;
