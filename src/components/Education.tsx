import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { Reveal } from './Reveal';
import { education } from '../data/portfolio';

export function Education() {
  const [activeId, setActiveId] = useState(education[0].id);
  const active = education.find((e) => e.id === activeId) ?? education[0];

  return (
    <section id="education" aria-labelledby="education-heading" className="w-full bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading id="education-heading" label="Academic Background" title="Education" />
        </Reveal>

        <Reveal className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <div role="tablist" aria-label="Institutions" aria-orientation="vertical" className="flex flex-col gap-2">
            {education.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`flex items-center gap-4 px-6 py-5 text-left transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  isActive ? 'bg-royal text-white' : 'bg-white text-muted hover:text-ink'}`
                  }>
                  
                  <Icon
                    className={`h-6 w-6 shrink-0 ${isActive ? 'text-white' : 'text-gold'}`}
                    strokeWidth={1.25}
                    aria-hidden="true" />
                  
                  <span className="font-label text-xs font-medium uppercase tracking-[0.18em]">{item.tab}</span>
                </button>);

            })}
          </div>

          <div className="bg-white">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`panel-${active.id}`}
                aria-labelledby={`tab-${active.id}`}
                className="grid h-full grid-cols-1 md:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}>
                
                <div className="relative min-h-[260px] md:min-h-[380px]">
                  <img
                    src={active.image}
                    alt={`${active.institution} campus`}
                    className="absolute inset-0 h-full w-full object-cover" />
                  
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <p className="font-label text-xs font-medium uppercase tracking-[0.3em] text-gold">Education</p>
                  <h3 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink lg:text-4xl">
                    {active.institution}
                  </h3>
                  <p className="mt-5 font-body text-base text-ink">{active.degree}</p>
                  <p className="mt-1 font-label text-xs uppercase tracking-[0.2em] text-muted">{active.years}</p>
                  <p className="mt-5 font-body text-sm leading-7 text-muted">{active.summary}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>);

}