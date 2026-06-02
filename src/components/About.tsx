'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Zap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const icons = [Gamepad2, Cpu, Zap];

export default function About() {
  const { about, contact } = portfolioData;

  return (
    <section id="about" className="bg-slate-50 py-28 border-y border-slate-200/60 relative overflow-hidden print:py-8 print:bg-white print:border-none">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none print:hidden" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '48px 48px' }} />

      <div className="section-container relative z-10 print:py-0">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-center lg:items-start mb-8">
          {/* Left: About Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 lg:sticky lg:top-24"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-sm font-display font-bold uppercase tracking-wider">
                About Me
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl print:text-3xl font-display font-extrabold text-primary mb-6 print:mb-3 leading-tight whitespace-pre-line tracking-tight break-keep">
              {about.title}
            </h2>
            <p className="text-lg md:text-xl print:text-base text-slate-800 leading-relaxed font-semibold whitespace-pre-line break-keep">
              {about.description}
            </p>
          </motion.div>

          {/* Right: 3 Core Value Cards */}
          <div className="flex-1 flex flex-col gap-4 print:gap-3 w-full lg:-mr-8 lg:translate-x-4 pb-4">
            {about.points.map((point, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  className="py-6 px-6 print:p-4 rounded-[1.5rem] print:rounded-xl bg-white border border-slate-200/80 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1 hover:border-accent/40 transition-all duration-300 group flex flex-col md:flex-row items-start md:items-center text-left shadow-sm gap-5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/5 to-transparent rounded-bl-[60px] -z-10 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="w-14 h-14 shrink-0 print:w-8 print:h-8 rounded-2xl print:rounded-md bg-accent/5 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-inner">
                    <Icon className="w-7 h-7 print:w-4 print:h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl print:text-base font-extrabold text-slate-900 mb-1.5 print:mb-1 group-hover:text-accent transition-colors break-keep">
                      {point.title.replace('\n', ' ')}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-base print:text-xs font-medium break-keep">
                      {point.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
