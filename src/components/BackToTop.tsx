import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUpIcon } from 'lucide-react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible &&
      <motion.a
        href="#home"
        aria-label="Back to top"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center bg-gold text-white transition-colors duration-150 ease-out hover:bg-[#c9a24f] focus:outline-none focus-visible:ring-2 focus-visible:ring-navy sm:bottom-6 sm:right-6"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}>
        
          <ChevronUpIcon className="h-5 w-5" strokeWidth={2} />
        </motion.a>
      }
    </AnimatePresence>);

}