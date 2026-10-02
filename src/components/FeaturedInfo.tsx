import React from 'react';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { featuredItems } from '../data/portfolio';

export function FeaturedInfo() {
  return (
    <section id="featured" aria-labelledby="featured-heading" className="w-full bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading id="featured-heading" label="Explore Main Information" title="Featured Information" />
        </Reveal>
        <div className="mt-24 grid grid-cols-1 gap-x-8 gap-y-20 md:grid-cols-3">
          {featuredItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.05} className="h-full">
                <a
                  href={item.href}
                  className="group relative flex h-full flex-col items-center bg-white px-8 pb-10 pt-16 text-center transition-shadow duration-200 ease-out hover:shadow-[0_12px_32px_-12px_rgba(11,33,71,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">
                  
                  <span className="absolute -top-11 left-1/2 flex h-[88px] w-[88px] -translate-x-1/2 items-start justify-center rounded-full bg-white pt-5">
                    <Icon className="h-9 w-9 text-gold" strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-xl font-semibold leading-snug text-ink lg:text-[22px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-label text-[11px] font-medium uppercase tracking-[0.25em] text-gold">
                    {item.subtitle}
                  </p>
                  <p className="mt-5 font-body text-sm leading-7 text-muted">{item.description}</p>
                </a>
              </Reveal>);

          })}
        </div>
      </div>
    </section>);

}