'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

// Compact SkillBadge Component for Horizontal Layout
const SkillBadge = ({ name, level, icon, description, index }: { name: string; level: number; icon: string; description?: string; index: number }) => {
  const blocks = 5;
  const activeBlocks = Math.round(level / 20);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.98 },
        show: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="relative flex items-start gap-4 p-5 print:p-3 rounded-2xl bg-white/70 border border-slate-200/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group/badge overflow-hidden"
    >
      <div className="absolute inset-0 bg-blue-500/0 group-hover/badge:bg-blue-500/[0.02] transition-colors" />

      {/* Icon with robust multi-tiered fallback */}
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 z-10 group-hover/badge:border-blue-200/50 transition-colors">
        <img
          src={
            icon === 'csharp'
              ? 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg'
              : icon === 'unity'
              ? 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg'
              : `https://cdn.simpleicons.org/${icon}`
          }
          alt={name}
          className="w-6 h-6 object-contain filter grayscale group-hover/badge:grayscale-0 transition-all duration-500"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src.includes('cdn.simpleicons.org')) {
              target.src = `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${icon}.svg`;
            } else if (target.src.includes('simple-icons@latest') && !target.src.includes('codefactor')) {
              const deviconSlug = icon === 'csharp' ? 'csharp' : icon === 'unity' ? 'unity' : icon;
              target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${deviconSlug}/${deviconSlug}-original.svg`;
            } else {
              target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/codefactor.svg';
            }
          }}
        />
      </div>

      <div className="flex flex-col flex-1 w-full z-10 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[1.05rem] font-bold text-slate-800 truncate pr-2">{name}</span>
          
          {/* 5 Level Blocks */}
          <div className="flex gap-1 flex-shrink-0">
            {[...Array(blocks)].map((_, i) => (
              <div 
                key={i} 
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded-[4px] transition-colors duration-500 ${
                  i < activeBlocks 
                    ? 'bg-blue-400 group-hover/badge:bg-blue-500 shadow-sm' 
                    : 'bg-slate-200 group-hover/badge:bg-slate-300/50'
                }`} 
              />
            ))}
          </div>
        </div>
        
        {description && (
          <p className="text-sm text-slate-800 leading-relaxed font-semibold break-keep mt-1">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default function Skills() {
  const { skills } = portfolioData;
  const s = skills as any; // Type override since we changed the data structure

  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none print:hidden">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="section-container max-w-7xl mx-auto print:max-w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 print:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-display font-black text-blue-600 uppercase tracking-widest leading-none">
              Technical Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-primary mb-4 tracking-tight">
            <span className="text-black">Best Skills</span>
          </h2>
          <p className="text-muted-foreground font-medium text-lg">
            실제 프로젝트에 투입되어 활용해 본 기술들입니다.
          </p>
        </motion.div>

        {/* 4-Column Category Layout for Sleek Game Developer Branding */}
        <div className="flex flex-col gap-10 print:gap-6">
          
          {/* 1. Core Engine & Language */}
          {s.core && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg relative print:shadow-none print:border-slate-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                  <span className="font-display font-black text-lg">01</span>
                </div>
                <h3 className="text-2xl font-display font-black text-primary">Core Engine & Language</h3>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {s.core.map((skill: any, i: number) => (
                  <SkillBadge key={skill.name} {...skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* 2. WebGL & Real-time Client */}
          {s.webgl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg relative print:shadow-none print:border-slate-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <span className="font-display font-black text-lg">02</span>
                </div>
                <h3 className="text-2xl font-display font-black text-primary">WebGL & Real-time Client</h3>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {s.webgl.map((skill: any, i: number) => (
                  <SkillBadge key={skill.name} {...skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* 3. AI & Deep Learning */}
          {s.ai && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg relative print:shadow-none print:border-slate-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                  <span className="font-display font-black text-lg">03</span>
                </div>
                <h3 className="text-2xl font-display font-black text-primary">AI & Deep Learning</h3>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {s.ai.map((skill: any, i: number) => (
                  <SkillBadge key={skill.name} {...skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* 4. Support & Collaboration */}
          {s.support && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg relative print:shadow-none print:border-slate-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <span className="font-display font-black text-lg">04</span>
                </div>
                <h3 className="text-2xl font-display font-black text-primary">Support & Collaboration</h3>
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
              >
                {s.support.map((skill: any, i: number) => (
                  <SkillBadge key={skill.name} {...skill} index={i} />
                ))}
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
