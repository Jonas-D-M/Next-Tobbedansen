'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Countdown as CD } from './countdown';
import '@/style/countDown.min.css';
import { getStartingDate } from '@/utils/helpers';

const createCountdownDate = (startingDate: Date) => {
  const dateObj = {
    day: startingDate.getDate(),
    month: startingDate.getMonth() + 1,
    year: startingDate.getFullYear(),
    hour: startingDate.getHours(),
    minute: 0,
    second: 0,
  };
  console.log(dateObj);
  return dateObj;
};

const shouldShowCountdown = (eventStartDate: Date, showFromMonth = 2) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();

  if (currentMonth >= showFromMonth || currentDate >= eventStartDate) {
    return true;
  }
  return false;
};

export const Countdown = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countDownRef = useRef<CD | null>(null);

  useEffect(() => {
    if (!containerRef.current || countDownRef.current) return;
    const eventStartingDate = getStartingDate();
    const cd = new CD({
      cont: containerRef.current,
      countdown: true,
      date: createCountdownDate(eventStartingDate),
      outputTranslation: {
        year: 'Years',
        week: 'Weken',
        day: 'Dagen',
        hour: 'Uren',
        minute: 'Minuten',
        second: 'Seconden',
      },
      endCallback: null,
      outputFormat: 'day|hour|minute|second',
    });
    countDownRef.current = cd;

    if (shouldShowCountdown(eventStartingDate)) {
      cd.start();
    }

    return () => {};
  }, [containerRef]);

  return (
    <>
      <div ref={containerRef} className='container'></div>
    </>
  );
};
