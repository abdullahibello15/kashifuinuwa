import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRightIcon,
  GraduationCapIcon,
  MonitorSmartphoneIcon,
  ScaleIcon,
  ServerIcon } from
'lucide-react';
import { SectionHeading } from './SectionHeading';
import { GoldButton } from './GoldButton';
import { Reveal } from './Reveal';
import { projectCategories, projects } from '../data/portfolio';
import type { Project, ProjectCategory } from '../data/portfolio';

type Filter = 'All' | ProjectCategory;

const filters: Filter[] = ['All', ...projectCategories];

const categoryIcons: Record<ProjectCategory, typeof ServerIcon> = {
  'Digital Services': MonitorSmartphoneIcon,
  Infrastructure: ServerIcon,
  'Policy & Regulation': ScaleIcon,
  'Capacity Building': GraduationCapIcon
};

function ProjectCard({ project }: {project: Project;}) {
  const Icon = categoryIcons[project.category];
  return (
    <article className="flex h-full flex-col border-t-2 border-transparent bg-white shadow-[0_8px_28px_rgba(18,23,43,0.08)] transition-[border-color,box-shadow] duration-200 ease-out hover:border-gold hover:shadow-[0_12px_36px_rgba(18,23,43,0.12)]">
      <div className="aspect-[16/10] overflow-hidden bg-paper">
        {project.image ?
        <img src={project.image} alt={`${project.title} — ${project.client}`} loading="lazy" className="h-full w-full object-cover" /> :

        <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
            <span className="flex h-16 w-16 items-center justify-center bg-navy">
              <Icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
            </span>
          </div>
        }
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-label text-[11px] font-medium uppercase tracking-[0.2em] text-gold">{project.category}</p>
        <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-ink">{project.title}</h3>
        <p className="mt-3 line-clamp-2 font-body text-sm leading-7 text-muted">{project.description}</p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between gap-4 border-t border-ink/10 pt-4">
            <p className="font-label text-[11px] uppercase tracking-[0.15em] text-muted">{project.client}</p>
            <p className="shrink-0 font-label text-xs font-medium text-ink">{project.year}</p>
          </div>
          <a
            href={project.href ?? '#projects'}
            className="group mt-5 inline-flex items-center gap-2 font-label text-xs font-medium uppercase tracking-[0.2em] text-gold transition-colors duration-150 ease-out hover:text-[#c9a24f] focus:outline-none focus-visible:underline">

            View Project
            <span className="sr-only">: {project.title}</span>
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
              strokeWidth={1.75}
              aria-hidden="true" />

          </a>
        </div>
      </div>
    </article>);

}

export function Projects() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<Filter>('All');
  const visible = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading id="projects-heading" label="Our Track Record" title="Landmark Projects" />
          <p className="mx-auto mt-6 max-w-xl text-center font-body text-sm leading-7 text-muted sm:text-base">
            A selection of the major projects we have delivered with government agencies and institutions.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter projects by category">
          {filters.map((f) =>
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-4 py-2.5 font-label text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-150 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
            filter === f ? 'bg-gold text-white' : 'text-muted hover:text-ink'}`
            }>

              {f}
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={filter}
            className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            aria-live="polite">

            {visible.map((project) =>
            <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            )}
          </motion.ul>
        </AnimatePresence>

        <div className="mt-14 flex justify-center">
          <GoldButton href="#projects">View All Projects</GoldButton>
        </div>
      </div>
    </section>);

}
