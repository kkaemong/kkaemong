'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Target, Cpu, Globe } from 'lucide-react';

const icons = [Target, Cpu, Globe];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="bg-white py-24 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="section-container relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-4xl mb-20"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
              About Me
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-8 leading-tight">
             {about.title}
          </h2>
          <p className="text-xl text-slate-800 leading-relaxed font-semibold max-w-3xl whitespace-pre-line">
             {about.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {about.points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white border border-slate-200 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent/40 transition-all duration-500 group flex flex-col items-center text-center shadow-sm"
              >
                <div className="w-16 h-16 rounded-2xl bg-accent/5 text-accent flex items-center justify-center mb-8 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner">
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{point.title}</h3>
                <p className="text-slate-700 leading-relaxed text-lg font-medium whitespace-pre-line">
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
