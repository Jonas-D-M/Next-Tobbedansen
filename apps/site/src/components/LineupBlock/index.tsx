'use client';

import React from 'react';
import classNames from 'classnames';

type LineupItem = {
  label: string;
  time: string;
  image?: string;
};

interface LineupBlockProps {
  items: LineupItem[];
}

const LineupBlock = ({ items }: LineupBlockProps) => {
  return (
    <div className='lineup-wrapper o-layout'>
      <div className='o-layout__item '>
        {items.map((item, idx) => (
          <div
            key={idx}
            className={classNames('lineup-item', {
              'lineup-item--with-image': !!item.image,
            })}
            style={
              item.image
                ? {
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: '#111',
                    color: 'white',
                  }
                : undefined
            }>
            <div className='lineup-label'>{item.label}</div>
            <div className='lineup-time'>{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LineupBlock;
