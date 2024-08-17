import { User } from 'lucia';
import React from 'react';
import { NavItem } from './item';
import { User as UserIcon } from 'lucide-react';

interface NavProps {
  user: User;
}

export const Nav = ({ user }: NavProps) => {
  return (
    <>
      <nav className='flex mb-4'>
        <div className='flex-1 flex items-center'>
          <h1 className='text-2xl font-bold'>TOBBEDANSEN</h1>
          {/* <div className='flex gap-x-4 mx-4'>
            <NavItem href={'/'}>Evenementen</NavItem>
            <NavItem href={'/users'}>Gebruikers</NavItem>
          </div> */}
        </div>

        <div className='hidden sm:block'>
          <span className='inline-flex items-center gap-x-2'>
            <UserIcon />
            <p>{user.email}</p>
          </span>
        </div>
      </nav>
    </>
  );
};
