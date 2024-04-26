import React, { InputHTMLAttributes } from 'react';

interface TextinputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput = ({ className, ...props }: TextinputProps) => {
  return <input className='textbox-300' {...props} />;
};
