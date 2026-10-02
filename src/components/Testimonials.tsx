import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { QuoteIcon } from 'lucide-react';
import { StarDivider } from './StarDivider';
import { testimonials, testimonialsImage } from '../data/portfolio';

const AUTOPLAY_MS = 7000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, reduce, next]);

  const item = testimonials[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full bg-white py-12 md:py-20">

      <div className="mx-auto grid max-w-[1248px] grid-cols-1 px-6 md:grid-cols-2">

      <div className="relative h-[60vh] min-h-[320px] md:h-auto">
        <img
          src={testimonialsImage}
          alt="A large crowd of supporters gathered at a public event"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover" />

      </div>

      <div
        className="flex items-center justify-center bg-navy p-10 sm:p-16"
        aria-roledescription="carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}>

        <div className="flex max-w-md flex-col items-center gap-6 text-center">
          <p className="font-body text-sm italic text-white/85">Testimonials</p>
          <h2
            id="testimonials-heading"
            className="font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-[44px]">

            What People Say
            <br />
            About Us
          </h2>
          <StarDivider />

          <QuoteIcon className="h-8 w-8 fill-gold text-gold" aria-hidden="true" />

          <div className="flex min-h-[220px] items-start sm:min-h-[190px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>

                <blockquote className="font-serif text-lg italic leading-relaxed text-white">{item.quote}</blockquote>
                <figcaption className="mt-5">
                  <span className="block font-serif text-base text-gold">— {item.name}</span>
                  <span className="mt-1 block font-label text-[11px] uppercase tracking-[0.2em] text-white/60">
                    {item.role}
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2.5" role="tablist" aria-label="Choose testimonial">
            {testimonials.map((_, i) =>
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-2 transition-[width,background-color] duration-200 ease-out ${
              i === index ? 'w-8 bg-gold' : 'w-2 bg-white/40 hover:bg-white/70'}`
              } />

            )}
          </div>
        </div>
        </div>
      </div>
    </section>);

}
