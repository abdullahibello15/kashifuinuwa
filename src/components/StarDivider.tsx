import React from 'react';
import { StarIcon } from 'lucide-react';

export function StarDivider({ className = '' }: {className?: string;}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gold sm:w-16" />
      <span className="flex items-center gap-1.5">
        <StarIcon className="h-2.5 w-2.5 fill-gold text-gold" />
        <StarIcon className="h-3.5 w-3.5 fill-gold text-gold" />
        <StarIcon className="h-2.5 w-2.5 fill-gold text-gold" />
      </span>
      <span className="h-px w-12 bg-gold sm:w-16" />
    </div>);

}