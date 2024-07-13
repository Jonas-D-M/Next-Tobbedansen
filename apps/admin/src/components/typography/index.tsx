import { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface BaseTypographyProps extends PropsWithChildren {
  className?: string;
}

const H1 = ({ children, className }: BaseTypographyProps) => {
  return (
    <h1
      className={twMerge(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}>
      {children}
    </h1>
  );
};
const H2 = ({ children, className }: BaseTypographyProps) => {
  return (
    <h2
      className={twMerge(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className
      )}>
      {children}
    </h2>
  );
};
const H3 = ({ children, className }: BaseTypographyProps) => {
  return (
    <h3
      className={twMerge(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className
      )}>
      {children}
    </h3>
  );
};
const H4 = ({ children, className }: BaseTypographyProps) => {
  return (
    <h4
      className={twMerge(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className
      )}>
      {children}
    </h4>
  );
};
const P = ({ children, className }: BaseTypographyProps) => {
  return (
    <p className={twMerge('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
};
const Blockquote = ({ children, className }: BaseTypographyProps) => {
  return (
    <blockquote className={twMerge('mt-6 border-l-2 pl-6 italic', className)}>
      {children}
    </blockquote>
  );
};
const Ul = ({ children, className }: BaseTypographyProps) => {
  return (
    <ul className={twMerge('my-6 ml-6 list-disc [&>li]:mt-2', className)}>
      {children}
    </ul>
  );
};
const Code = ({ children, className }: BaseTypographyProps) => {
  return (
    <code
      className={twMerge(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className
      )}>
      {children}
    </code>
  );
};
const Lead = ({ children, className }: BaseTypographyProps) => {
  return (
    <p className={twMerge('text-xl text-muted-foreground', className)}>
      {children}
    </p>
  );
};
const Large = ({ children, className }: BaseTypographyProps) => {
  return (
    <div className={twMerge('text-lg font-semibold', className)}>
      {children}
    </div>
  );
};
const Small = ({ children, className }: BaseTypographyProps) => {
  return (
    <small className={twMerge('text-sm font-medium leading-none', className)}>
      {children}
    </small>
  );
};
const Muted = ({ children, className }: BaseTypographyProps) => {
  return (
    <p className={twMerge('text-sm text-muted-foreground', className)}>
      {children}
    </p>
  );
};

export { H1, H2, H3, H4, Blockquote, Code, Large, Lead, Muted, P, Small, Ul };
