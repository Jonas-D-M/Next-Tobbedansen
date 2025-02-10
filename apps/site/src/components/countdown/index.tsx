'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Countdown as CD } from './countdown';
import '@/style/countDown.min.css';
import { getEventWeekend, isDuringEvent } from '@/utils/helpers';

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

export const Countdown = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const countDownRef = useRef<CD | null>(null);

  useEffect(() => {
    if (!containerRef.current || countDownRef.current) return;
    const { friday } = getEventWeekend();
    const cd = new CD({
      cont: containerRef.current,
      countdown: true,
      date: createCountdownDate(friday),
      outputTranslation: {
        year: 'Jaar',
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
    console.log(friday);
    if (!isDuringEvent()) {
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
