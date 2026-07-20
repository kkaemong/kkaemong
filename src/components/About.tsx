'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Zap } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

const icons = [Gamepad2, Cpu, Zap];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="bg-[#FAF9F6] py-24 border-y border-slate-200/60 relative overflow-hidden print:py-8 print:bg-white print:border-none text-slate-900 font-sans">
      {/* Background Graph Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-40 pointer-events-none" />

      {/* Point Blue Pencil on Left Margin */}
      <motion.img
        animate={{ y: [0, 6, 0], rotate: [-25, -15, -25] }}
        transition={{ duration: 4.8, repeat: Infinity }}
        src="/decorations/pencil_blue.png"
        alt="Blue Pencil"
        className="absolute top-12 left-8 w-16 h-auto z-20 hidden lg:block opacity-85 pointer-events-none"
      />

      <div className="section-container relative z-10 print:py-0">
        {/* Wrapped Notebook Sketchbook Card Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-[3rem] md:rounded-[3.5rem] border-2 border-slate-200/90 shadow-xl p-8 sm:p-12 md:p-14 relative"
        >
          {/* Top Tape Accent Sticker */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e2e8f0] text-slate-700 text-sm font-bold px-9 py-1.5 rounded-sm rotate-[-1deg] shadow-xs uppercase tracking-widest border border-slate-300 z-20">
            About Me Notes
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center lg:items-start">
            {/* Left: About Header & Description */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-[3px] bg-blue-600 rounded-full" />
                <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">
                  About Me
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-snug whitespace-pre-line tracking-tight break-keep relative inline-block">
                {about.title}
                <img src="/decorations/big_heart.png" alt="Big Heart" className="absolute -top-4 -right-8 w-8 h-auto pointer-events-none" />
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal whitespace-pre-line break-keep">
                {about.description}
              </p>
            </div>

            {/* Right: 3 Core Value Cards */}
            <div className="flex-1 flex flex-col gap-4 w-full">
              {about.points.map((point, i) => {
                const Icon = icons[i % icons.length];
                return (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-5 md:p-6 rounded-[2rem] bg-[#FAF9F6] border border-slate-200/90 hover:shadow-md hover:border-blue-400/50 transition-all duration-300 group flex items-start text-left shadow-xs gap-4 relative"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-300 shadow-xs mt-0.5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors break-keep leading-snug">
                        {point.title.replace('\n', ' ')}
                      </h3>
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal break-keep">
                        {point.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
