'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export default function Footer() {
  const { contact } = portfolioData;
  const linkClass = 'inline-flex items-center gap-1 border-b border-[#111]/30 pb-0.5 text-sm font-medium tracking-wide text-[#111] transition-colors hover:border-[#111]';

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-[#111]/10 bg-white px-6 py-28 text-[#111] print:hidden sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-8% 0px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <p className="mb-8 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-[#8a8780]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#111]" />
          Available for Work
        </p>

        <h2 className={`mb-6 text-3xl font-light leading-[1.55] tracking-wide sm:text-5xl ${SERIF}`}>Contact</h2>
        <p className="mb-12 max-w-xl break-keep text-sm leading-loose text-[#6b6862] sm:text-base">{contact.message}</p>

        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-4">
          <a href={`mailto:${contact.email}`} className={linkClass}>
            {contact.email} <ArrowUpRight size={14} />
          </a>
          <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
            GitHub <ArrowUpRight size={14} />
          </a>
          <a href={contact.blog} target="_blank" rel="noopener noreferrer" className={linkClass}>
            Velog <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="mt-24 text-[11px] font-medium uppercase tracking-[0.4em] text-[#8a8780]">© 2026 Jiin June Young</p>
      </motion.div>
    </footer>
  );
}
