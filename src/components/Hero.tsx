import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { GoldButton } from './GoldButton';
import { images, person } from '../data/portfolio';

export function Hero() {
  const reduce = useReducedMotion();
  return (
    <section id="home" className="grid min-h-[calc(100vh-5rem)] w-full grid-cols-1 md:grid-cols-2">
      <div className="flex items-center justify-center bg-navy px-6 py-16 sm:px-12 md:py-20">
        <motion.div
          className="flex max-w-md flex-col items-center text-center"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          
          <span className="flex h-16 w-16 items-center justify-center bg-gold font-serif text-2xl font-semibold text-white">
            {person.initials}
          </span>
          <p className="mt-4 font-serif text-xl text-gold">{person.name}</p>
          <h1 className="mt-12 font-serif text-4xl font-medium leading-[1.15] text-white sm:text-5xl lg:text-[58px]">
            {person.headline}
          </h1>
          <p className="mt-6 font-label text-xs font-medium uppercase tracking-[0.3em] text-gold">
            {person.title}
          </p>
          <GoldButton href="#featured" className="mt-10">
            Learn More
          </GoldButton>
        </motion.div>
      </div>
      <div className="relative h-[300px] md:h-auto">
        <img
          src={images.hero}
          alt="Modern open-plan office with desks and monitors, overlooking a harbour bridge"
          className="absolute inset-0 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
      </div>
    </section>);

}