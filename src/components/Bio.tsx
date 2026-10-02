import React from 'react';
import { QuoteIcon } from 'lucide-react';
import { GoldButton } from './GoldButton';
import { Reveal } from './Reveal';
import { bio, images, person } from '../data/portfolio';

export function Bio() {
  return (
    <section id="bio" aria-labelledby="bio-heading" className="w-full bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <div className="relative pb-28 pl-6 sm:pb-20 sm:pl-14">
            <img
              src={images.bio}
              alt={`Portrait of ${person.name}`}
              className="aspect-[4/5] w-full object-cover" />
            
            <figure className="absolute bottom-0 left-0 max-w-[340px] bg-navy p-7 sm:p-8">
              <QuoteIcon className="h-8 w-8 fill-gold text-gold" aria-hidden="true" />
              <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-white">
                {bio.quote}
              </blockquote>
              <figcaption className="mt-4 font-serif text-base text-gold">— {person.name}</figcaption>
            </figure>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="font-body text-sm italic text-muted">A Brief Introduction</p>
          <h2 id="bio-heading" className="mt-2 font-serif text-4xl font-semibold text-ink lg:text-5xl">
            Bio!
          </h2>
          <span className="mt-6 block h-0.5 w-16 bg-[#C9C9C2]" aria-hidden="true" />
          <p className="mt-8 font-body text-[15px] leading-8 text-muted">{bio.paragraph}</p>
          <GoldButton href="#projects" className="mt-10">
            Learn More
          </GoldButton>
        </Reveal>
      </div>
    </section>);

}