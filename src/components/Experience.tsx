'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Briefcase, Globe } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  const getIcon = (id: number) => {
    switch (id) {
      case 1: return <Briefcase size={22} />;
      case 4: return <Globe size={22} />;
      default: return <GraduationCap size={22} />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#FAF9F6] text-slate-900 relative overflow-hidden border-t border-slate-200/60">
      {/* Background Graph Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-40 pointer-events-none" />

      {/* Point Sketchbook Decorator */}
      <motion.img
        animate={{ y: [0, -6, 0], rotate: [-10, 0, -10] }}
        transition={{ duration: 4.2, repeat: Infinity }}
        src="/decorations/pencil_red.png"
        alt="Red Pencil"
        className="absolute top-16 left-12 w-16 h-auto z-10 hidden lg:block opacity-80 pointer-events-none"
      />

      <div className="section-container relative z-10">
        {/* Wrapped Notebook Sketchbook Card Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] md:rounded-[3.5rem] border-2 border-slate-200/90 shadow-xl p-8 sm:p-12 md:p-14 relative"
        >
          {/* Top Tape Accent Sticker */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e2e8f0] text-slate-700 text-sm font-bold px-9 py-1.5 rounded-sm rotate-[-1deg] shadow-xs uppercase tracking-widest border border-slate-300 z-20">
            Experience & Education Notes
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 print:mb-8"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
              <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                Timeline
              </span>
              <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 relative inline-block">
              경력 및 학력
              <img src="/decorations/star.png" alt="Star" className="absolute -top-3 -right-7 w-7 h-auto pointer-events-none" />
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-6 print:space-y-4">
            {experience.map((item, i) => {
              const isCurrent = item.period.includes('현재');
              
              return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group flex flex-col md:flex-row md:items-center gap-6 md:gap-8 print:gap-4 p-6 md:p-8 print:p-4 print:pb-6 rounded-[2rem] print:rounded-none transition-all duration-500
                  ${isCurrent 
                    ? 'bg-[#FAF9F6] border-2 border-blue-600 shadow-md ring-4 ring-blue-500/10' 
                    : 'bg-[#FAF9F6] border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-400/30'
                  } print:border-0 print:border-b print:shadow-none`}
              >
                {/* Left Column (Logo & Title) */}
                <div className="flex items-center gap-5 print:gap-4 md:w-[42%] print:w-[35%] shrink-0 relative">
                  
                  {/* Pulsing Dot for Current Status */}
                  {isCurrent && (
                    <div className="absolute -top-2 -left-2 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-6
                    ${isCurrent ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    {getIcon(item.id)}
                  </div>
                  <div className="flex flex-col items-start gap-1.5">
                    <span className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-md inline-flex items-center gap-1.5 leading-none
                      ${isCurrent ? 'bg-blue-600 text-white shadow-sm' : 'bg-blue-50 text-blue-700'}`}>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                      {item.period}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 transition-colors group-hover:text-blue-600 leading-snug break-keep">{item.title}</h3>
                  </div>
                </div>
   
                {/* Middle Vertical Divider Line */}
                <div className="hidden md:block w-[1.5px] h-10 bg-slate-200/80 self-center" />
   
                {/* Right Column */}
                <div className="flex-grow md:pl-6 print:pl-4 self-stretch flex items-center">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal whitespace-pre-line break-keep">
                    {item.content}
                  </p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
