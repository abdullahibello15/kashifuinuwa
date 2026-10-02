import React from 'react';
import { StarDivider } from './StarDivider';

type SectionHeadingProps = {
  label?: string;
  title: string;
  light?: boolean;
  id?: string;
};

export function SectionHeading({ label, title, light = false, id }: SectionHeadingProps) {
  return (
    <div className="text-center">
      {label &&
      <p className={`font-body text-sm italic ${light ? 'text-white/85' : 'text-muted'}`}>{label}</p>
      }
      <h2
        id={id}
        className={`mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-[44px] ${
        light ? 'text-white' : 'text-ink'}`
        }>
        
        {title}
      </h2>
      <StarDivider className="mt-5" />
    </div>);

}