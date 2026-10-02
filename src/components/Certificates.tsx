import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { StarDivider } from './StarDivider';
import { certificates } from '../data/portfolio';

const GAP = 15;
const AUTOPLAY_MS = 4000;
const SWIPE_THRESHOLD = 40;

const visibleFor = (width: number) => width >= 1024 ? 3 : width >= 640 ? 2 : 1;

export function Certificates() {
  const reduce = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(3);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStart = useRef<number | null>(null);

  const maxIndex = Math.max(0, certificates.length - visible);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth);
      setVisible(visibleFor(window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Keep the index valid when the number of visible slides changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (dir: number) => setIndex((i) => {
      const next = i + dir;
      if (next > maxIndex) return 0;
      if (next < 0) return maxIndex;
      return next;
    }),
    [maxIndex]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const t = window.setInterval(() => go(1), AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, reduce, go]);

  const slideWidth = width ? (width - GAP * (visible - 1)) / visible : 0;
  const atEnd = index === maxIndex;

  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="w-full bg-white py-20">

      <div className="mx-auto max-w-[1230px] px-4 sm:px-6">
        <div className="text-center">
          <p className="font-label text-sm font-semibold text-[#8A8A8A]">Certificates</p>
          <h2
            id="certificates-heading"
            className="mt-2 font-serif text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-[44px]">

            Professional Certificates
          </h2>
          <StarDivider className="mt-5" />
        </div>

        <div
          className="relative mx-auto mt-12 max-w-[1200px]"
          aria-roledescription="carousel"
          aria-label="Professional certificates"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}>

          <div
            ref={viewportRef}
            className="touch-pan-y overflow-hidden"
            onPointerDown={(e) => {
              swipeStart.current = e.clientX;
            }}
            onPointerUp={(e) => {
              if (swipeStart.current === null) return;
              const dx = e.clientX - swipeStart.current;
              swipeStart.current = null;
              if (Math.abs(dx) > SWIPE_THRESHOLD) go(dx < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              swipeStart.current = null;
            }}>

            <motion.ul
              className="flex"
              style={{ gap: GAP }}
              animate={{ x: -index * (slideWidth + GAP) }}
              transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.23, 1, 0.32, 1] }}>

              {certificates.map((cert, i) =>
              <li
                key={i}
                className="aspect-[390/235] shrink-0"
                style={{ width: slideWidth || `calc((100% - ${GAP * (visible - 1)}px) / ${visible})` }}
                aria-hidden={i < index || i >= index + visible}>

                  <img
                  src={cert.src}
                  alt={cert.alt}
                  draggable={false}
                  loading="lazy"
                  className="h-full w-full select-none object-cover" />

                </li>
              )}
            </motion.ul>
          </div>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous certificate"
            className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#6B6F7B]/60 text-white transition-colors duration-150 ease-out hover:bg-[#6B6F7B]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">

            <ChevronLeftIcon className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next certificate"
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#6B6F7B]/60 text-white transition-colors duration-150 ease-out hover:bg-[#6B6F7B]/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">

            <ChevronRightIcon className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        {/* Always rendered so the section height doesn't jump when the label appears. */}
        <p
          className={`mt-6 text-center font-body text-[11px] uppercase tracking-[0.2em] text-[#B5B5B5] transition-opacity duration-200 ${
          atEnd ? 'opacity-100' : 'opacity-0'}`
          }
          aria-live="polite">

          {atEnd ? "You've reached the end of the list" : ' '}
        </p>
      </div>
    </section>);

}
