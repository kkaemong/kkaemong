'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Cpu, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const icons = [Target, Cpu, Globe];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="bg-slate-50 py-28 border-y border-slate-200/60 relative overflow-hidden print:py-8 print:bg-white print:border-none">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none print:hidden" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />

      <div className="section-container relative z-10 print:py-0">
        <div className="mb-20 print:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-sm font-display font-bold uppercase tracking-wider">
                About Me
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl print:text-3xl font-display font-extrabold text-primary mb-8 print:mb-4 leading-tight whitespace-pre-line tracking-tight">
              {about.title}
            </h2>
            <p className="text-lg md:text-xl print:text-base text-slate-800 leading-relaxed font-semibold whitespace-pre-line max-w-4xl break-keep">
              {about.description}
            </p>
          </motion.div>
        </div>
 
        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 print:grid-cols-3 gap-8 print:gap-4">
          {about.points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-10 print:p-6 rounded-[2.5rem] print:rounded-2xl bg-white border border-slate-200/80 hover:shadow-2xl hover:shadow-accent/5 hover:border-accent/40 transition-all duration-500 group flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-16 h-16 print:w-10 print:h-10 rounded-2xl print:rounded-lg bg-accent/5 text-accent flex items-center justify-center mb-8 print:mb-4 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                  <Icon className="w-8 h-8 print:w-5 print:h-5" />
                </div>
                <h3 className="text-2xl print:text-lg font-bold text-primary mb-4 print:mb-2 group-hover:text-accent transition-colors">{point.title}</h3>
                <p className="text-slate-800 leading-relaxed text-lg print:text-sm font-semibold whitespace-pre-line break-keep">
                  {point.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
