import React from 'react';
import { NavMenu } from './components/NavMenu';
import { Hero } from './components/Hero';
import { FeaturedInfo } from './components/FeaturedInfo';
import { Bio } from './components/Bio';
import { Awards } from './components/Awards';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Education } from './components/Education';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export function App() {
  return (
    <div className="w-full bg-paper font-body text-ink">
      <NavMenu />
      <main>
        <Hero />
        <FeaturedInfo />
        <Bio />
        <Awards />
        <Education />
        <Projects />
        <Testimonials />
        <Certificates />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>);

}