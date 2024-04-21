import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='c-row__footer'>
      <Link
        href='https://www.facebook.com/Tobbedansen/?ref=br_rs'
        target='_blank'>
        <FontAwesomeIcon icon={faFacebookF} />
      </Link>
      <Link href='https://twitter.com/tobbedansen' target='_blank'>
        <i className='fab fa-twitter'></i>
        <FontAwesomeIcon icon={faXTwitter} />
      </Link>
      <Link href='https://www.instagram.com/tobbedansen/' target='_blank'>
        <i className='fab fa-instagram'></i>
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link
        href={'https://www.facebook.com/Tobbedansen/?ref=br_rs'}
        target='_blank'>
        <FontAwesomeIcon icon={faEnvelope} />
      </Link>
      <br />
      Tobbedansen vzw
    </footer>
  );
};

export default Footer;
