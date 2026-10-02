import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon, MenuIcon, XIcon } from 'lucide-react';
import { headerNav, person } from '../data/portfolio';
import type { NavItem, NavLink } from '../data/portfolio';

const HEADER_HEIGHT = 80;

const linkText = 'font-label font-medium uppercase transition-colors duration-150 ease-out hover:text-gold';
const linkColor = (isActive: boolean) => isActive ? 'text-gold' : 'text-[#C8D3E6]';
const underline = (isActive: boolean) =>
`after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-opacity after:duration-150 ${
isActive ? 'after:opacity-100' : 'after:opacity-0'}`;

const hasChildren = (item: NavItem): item is {label: string;children: NavLink[];} =>
'children' in item;

const isItemActive = (item: NavItem, active: string) =>
hasChildren(item) ? item.children.some((c) => c.href === active) : item.href === active;

// Tracks every page section, read from the DOM so it follows the page order wherever
// sections are placed. Sections with no header link (e.g. #certificates) highlight nothing.
function useActiveSection() {
  const [active, setActive] = useState('#home');

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id], footer[id]'));
      if (!sections.length) return;
      const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(`#${sections[sections.length - 1].id}`);
        return;
      }
      let current = sections[0].id;
      for (const el of sections) {
        if (el.getBoundingClientRect().top <= HEADER_HEIGHT + 1) current = el.id;
      }
      setActive(`#${current}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

function Logo({ onClick }: {onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;}) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${person.name} — back to top`}
      className="flex h-10 w-10 items-center justify-center bg-gold font-serif text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white">

      {person.initials}
    </a>);

}

function Dropdown({
  label,
  items,
  active



}: {label: string;items: NavLink[];active: string;}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isActive = items.some((c) => c.href === active);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <li
      ref={ref}
      className="relative flex h-full items-center"
      // Hover only for real mouse pointers, so a tap on a touch screen isn't open-then-toggle-closed.
      onPointerEnter={(e) => e.pointerType === 'mouse' && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === 'mouse' && setOpen(false)}>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="about-menu"
        className={`relative flex items-center gap-1.5 py-2 text-xs tracking-[0.18em] focus:outline-none focus-visible:text-gold lg:tracking-[0.22em] ${linkText} ${linkColor(isActive)} ${underline(isActive)}`}>

        {label}
        <ChevronDownIcon
          aria-hidden="true"
          className={`h-3.5 w-3.5 text-gold transition-transform duration-150 ease-out ${open ? 'rotate-180' : ''}`}
          strokeWidth={2} />

      </button>

      {open &&
      <ul
        id="about-menu"
        className="absolute left-1/2 top-full min-w-[200px] -translate-x-1/2 border-t border-gold bg-navy shadow-[0_12px_32px_rgba(11,33,71,0.35)]">

          {items.map((item) =>
        <li key={item.href} className="border-b border-[#24385F] last:border-b-0">
              <a
            href={item.href}
            onClick={() => setOpen(false)}
            aria-current={item.href === active ? 'true' : undefined}
            className={`block px-6 py-3.5 text-xs tracking-[0.2em] focus:outline-none focus-visible:text-gold ${linkText} ${linkColor(item.href === active)}`}>

                {item.label}
              </a>
            </li>
        )}
        </ul>
      }
    </li>);

}

export function NavMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const active = useActiveSection();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) {
      setExpanded(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close the panel first so the body scroll lock is released before scrolling.
  const navigateFromPanel = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      history.replaceState(null, '', href);
    });
  };

  const mobileLink = (link: NavLink, extra = '') =>
  <a
    href={link.href}
    onClick={navigateFromPanel}
    aria-current={active === link.href ? 'true' : undefined}
    className={`block py-5 text-sm tracking-[0.22em] ${linkText} ${linkColor(active === link.href)} ${extra}`}>

      {link.label}
    </a>;


  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b border-gold bg-navy">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden h-full md:block">
          <ul className="flex h-full items-center gap-5 lg:gap-9">
            {headerNav.map((item) => {
              if (hasChildren(item)) {
                return <Dropdown key={item.label} label={item.label} items={item.children} active={active} />;
              }
              const isActive = item.href === active;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-2 text-xs tracking-[0.18em] focus:outline-none focus-visible:text-gold lg:tracking-[0.22em] ${linkText} ${linkColor(isActive)} ${underline(isActive)}`}>

                    {item.label}
                  </a>
                </li>);

            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center text-gold transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold md:hidden">

          <MenuIcon className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {open &&
        <motion.nav
          id="mobile-nav"
          aria-label="Mobile"
          className="fixed inset-0 z-50 flex flex-col bg-navy md:hidden"
          initial={reduce ? { opacity: 0 } : { x: '100%' }}
          animate={reduce ? { opacity: 1 } : { x: 0 }}
          exit={reduce ? { opacity: 0 } : { x: '100%' }}
          transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>

            <div className="flex h-20 shrink-0 items-center justify-between px-4 sm:px-6">
              <Logo onClick={navigateFromPanel} />
              <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close navigation menu"
              className="flex h-11 w-11 items-center justify-center text-gold transition-colors duration-150 ease-out hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold">

                <XIcon className="h-7 w-7" strokeWidth={1.5} />
              </button>
            </div>
            <ul className="mt-4 flex flex-col overflow-y-auto px-4 sm:px-6">
              {headerNav.map((item) => {
              if (!hasChildren(item)) {
                return (
                  <li key={item.href} className="border-b border-[#24385F]">
                      {mobileLink(item)}
                    </li>);

              }
              const isExpanded = expanded === item.label;
              const submenuId = `mobile-${item.label.toLowerCase()}-menu`;
              return (
                <li key={item.label} className="border-b border-[#24385F]">
                    <button
                    type="button"
                    onClick={() => setExpanded(isExpanded ? null : item.label)}
                    aria-expanded={isExpanded}
                    aria-controls={submenuId}
                    className={`flex w-full items-center justify-between py-5 text-left text-sm tracking-[0.22em] ${linkText} ${linkColor(isItemActive(item, active))}`}>

                      {item.label}
                      <ChevronDownIcon
                      aria-hidden="true"
                      className={`h-4 w-4 text-gold transition-transform duration-150 ease-out ${isExpanded ? 'rotate-180' : ''}`}
                      strokeWidth={2} />

                    </button>
                    {isExpanded &&
                  <ul id={submenuId} className="pb-2">
                        {item.children.map((child) =>
                    <li key={child.href} className="border-t border-[#24385F]">
                            {mobileLink(child, 'pl-6')}
                          </li>
                    )}
                      </ul>
                  }
                  </li>);

            })}
            </ul>
          </motion.nav>
        }
      </AnimatePresence>
    </header>);

}
