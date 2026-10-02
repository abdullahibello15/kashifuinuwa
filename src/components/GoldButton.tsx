import React from 'react';

type GoldButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function GoldButton({ href, children, className = '' }: GoldButtonProps) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center whitespace-nowrap bg-gold px-8 py-3.5 font-label text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-150 ease-out hover:bg-[#c9a24f] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${className}`}>
      
      {children}
    </a>);

}