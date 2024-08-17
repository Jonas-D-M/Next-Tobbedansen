'use client';
import React, { ComponentProps } from 'react';
import Image from 'next/image';

export const SponsorImage = ({
  loader,
  ...props
}: ComponentProps<typeof Image>) => {
  return <Image loader={({ src }) => src} {...props} />;
};
