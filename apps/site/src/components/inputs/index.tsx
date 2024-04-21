import React, { InputHTMLAttributes } from 'react';

interface TextinputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput = ({ className, ...props }: TextinputProps) => {
  return <input className='textbox-300' {...props} />;
};

export default TextInput;
