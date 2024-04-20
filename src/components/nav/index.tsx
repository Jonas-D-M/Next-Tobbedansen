import { pages } from '@/utils/constants';
import { NavItem } from '@/components/nav/nav-item';
import React, { useRef, useState } from 'react';

interface NavProps {
  onMenuBtnClick: () => void;
}

interface MobileNavProps extends NavProps {}

export const Nav = ({ onMenuBtnClick }: NavProps) => {
  return (
    <header className='u-max-width-none u-pt-clear'>
      <div className='o-container'>
        <div className='c-header'>
          <div className='c-header'>
            <div className='c-header__nav'>
              <nav className='c-nav'>
                <ul className='o-list c-nav__list'>
                  {pages.map(({ title, href }) => {
                    return (
                      <li key={`desktop-nav-${title}`} className='c-nav__item'>
                        <NavItem href={href}>{title}</NavItem>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div className='c-header__mobile-nav-trigger home'>
              <button
                onClick={onMenuBtnClick}
                className='o-button-reset c-nav-trigger js-toggle-nav'>
                <svg
                  className='c-nav-trigger__svg'
                  xmlns='http://www.w3.org/2000/svg'
                  width='18'
                  height='12'
                  viewBox='0 0 18 12'>
                  <path
                    d='M3,18H21V16H3Zm0-5H21V11H3ZM3,6V8H21V6Z'
                    transform='translate(-3 -6)'
                    fill='#fff'
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const MobileNav = ({ onMenuBtnClick }: MobileNavProps) => {
  return (
    <aside className='c-mobile-nav'>
      <div className='c-mobile-nav__bg'></div>
      <div className='c-mobile-nav__body'>
        <div className='c-mobile-nav__header'>
          <button
            onClick={onMenuBtnClick}
            className='o-button-reset c-nav-trigger'>
            <svg
              className='c-nav-trigger__svg'
              xmlns='http://www.w3.org/2000/svg'
              width='14'
              height='14'
              viewBox='0 0 14 14'>
              <path
                d='M19,6.41,17.59,5,12,10.59,6.41,5,5,6.41,10.59,12,5,17.59,6.41,19,12,13.41,17.59,19,19,17.59,13.41,12Z'
                transform='translate(-5 -5)'
                fill='#fff'
              />
            </svg>
          </button>
        </div>
        <div className='c-mobile-nav__nav c-mobile-nav__nav--main'>
          <nav className='c-nav'>
            <ul className='o-list c-nav__list'>
              {pages.map(({ href, title }) => {
                return (
                  <li key={`mobile-nav-${title}`} className='c-nav__item'>
                    <NavItem href={href}>{title}</NavItem>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
};
