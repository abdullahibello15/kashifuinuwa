import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { GoldButton } from './GoldButton';
import { awards, images } from '../data/portfolio';

export function Awards() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + awards.length) % awards.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => go(1), 6000);
    return () => window.clearInterval(t);
  }, [paused, go]);

  const award = awards[index];

  return (
    <section
      id="awards"
      aria-labelledby="awards-heading"
      aria-roledescription="carousel"
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}>
      
      <img src={images.banner} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-ink/75" aria-hidden="true" />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-14 py-24 text-center sm:px-20 lg:py-32">
        <SectionHeading id="awards-heading" light label="Honors!" title="Awards & Certificates" />

        <div className="mt-10 flex min-h-[120px] items-center justify-center sm:min-h-[100px]" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
              
              <p className="font-serif text-2xl leading-snug text-white sm:text-3xl">{award.title}</p>
              <p className="mt-3 font-label text-xs uppercase tracking-[0.3em] text-gold">{award.year}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <GoldButton href="#projects" className="mt-8">
          Read More
        </GoldButton>

        <div className="mt-10 flex items-center gap-2.5" role="tablist" aria-label="Choose award">
          {awards.map((a, i) =>
          <button
            key={a.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Award ${i + 1}: ${a.title}`}
            onClick={() => setIndex(i)}
            className={`h-2 transition-[width,background-color] duration-200 ease-out ${
            i === index ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/70'}`
            } />

          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Previous award"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-gold/60 text-gold transition-colors duration-150 ease-out hover:bg-gold hover:text-white sm:left-8">
        
        <ChevronLeftIcon className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Next award"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-gold/60 text-gold transition-colors duration-150 ease-out hover:bg-gold hover:text-white sm:right-8">
        
        <ChevronRightIcon className="h-5 w-5" strokeWidth={1.5} />
      </button>
    </section>);

}