import { PropsWithChildren } from 'react';

const H1 = ({ children }: PropsWithChildren) => {
  return (
    <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
      {children}
    </h1>
  );
};
const H2 = ({ children }: PropsWithChildren) => {
  return (
    <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
      {children}
    </h2>
  );
};
const H3 = ({ children }: PropsWithChildren) => {
  return (
    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
      {children}
    </h3>
  );
};
const H4 = ({ children }: PropsWithChildren) => {
  return (
    <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
      {children}
    </h4>
  );
};
const P = ({ children }: PropsWithChildren) => {
  return <p className='leading-7 [&:not(:first-child)]:mt-6'>{children}</p>;
};
const Blockquote = ({ children }: PropsWithChildren) => {
  return (
    <blockquote className='mt-6 border-l-2 pl-6 italic'>{children}</blockquote>
  );
};
const Ul = ({ children }: PropsWithChildren) => {
  return <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>{children}</ul>;
};
const Code = ({ children }: PropsWithChildren) => {
  return (
    <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
      {children}
    </code>
  );
};
const Lead = ({ children }: PropsWithChildren) => {
  return <p className='text-xl text-muted-foreground'>{children}</p>;
};
const Large = ({ children }: PropsWithChildren) => {
  return <div className='text-lg font-semibold'>{children}</div>;
};
const Small = ({ children }: PropsWithChildren) => {
  return <small className='text-sm font-medium leading-none'>{children}</small>;
};
const Muted = ({ children }: PropsWithChildren) => {
  return <p className='text-sm text-muted-foreground'>{children}</p>;
};

export { H1, H2, H3, H4, Blockquote, Code, Large, Lead, Muted, P, Small, Ul };
