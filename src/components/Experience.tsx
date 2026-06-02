'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Briefcase, Globe } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Briefcase size={24} />;
      case 4: return <Globe size={24} />;
      default: return <GraduationCap size={24} />;
    }
  };

  return (
    <section id="experience" className="py-24 print:py-8 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 print:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
              Timeline
            </span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
            경력 및 학력
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-8 print:space-y-4">
          {experience.map((item, i) => {
            const isCurrent = item.period.includes('현재');
            
            return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-8 print:gap-4 p-8 md:p-10 print:p-4 print:pb-6 rounded-[2.5rem] print:rounded-none transition-all duration-500
                ${isCurrent 
                  ? 'bg-white border-2 border-accent shadow-lg ring-4 ring-accent/10' 
                  : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-accent/20'
                } print:border-0 print:border-b print:shadow-none`}
            >
              {/* Left Column (Logo & Title) */}
              <div className="flex items-center gap-6 print:gap-4 md:w-[38%] print:w-[30%] shrink-0 relative">
                
                {/* Pulsing Dot for Current Status */}
                {isCurrent && (
                  <div className="absolute -top-2 -left-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-accent border-2 border-white"></span>
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6
                  ${isCurrent ? 'bg-accent text-white shadow-md' : 'bg-accent/5 text-accent group-hover:bg-accent group-hover:text-white'}`}>
                  {getIcon(item.id)}
                </div>
                <div>
                  <span className={`text-[11px] font-bold font-display uppercase tracking-wider px-2.5 py-1 rounded-md mb-2 inline-flex items-center gap-1.5 leading-none
                    ${isCurrent ? 'bg-accent text-white shadow-sm' : 'bg-accent/5 text-accent'}`}>
                    {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                    {item.period}
                  </span>
                  <h3 className="text-lg font-bold text-primary transition-colors group-hover:text-accent leading-snug break-keep md:whitespace-nowrap">{item.title}</h3>
                </div>
              </div>
 
              {/* Middle Vertical Divider Line (Elegant & Perfectly Centered) */}
              <div className="hidden md:block w-[1.5px] h-10 bg-slate-200/80 self-center" />
 
              {/* Right Column (Content - Vertically Centered with Left Column) */}
              <div className="flex-grow md:pl-6 print:pl-4 self-stretch flex items-center">
                <p className="text-slate-800 leading-relaxed font-semibold whitespace-pre-line text-[15px] sm:text-base">
                  {item.content}
                </p>
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
