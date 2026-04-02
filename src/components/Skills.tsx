'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

// Custom Radial Progress Component for a more premium feel
const SkillBadge = ({ name, level, icon, index }: { name: string; level: number; icon: string; index: number }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        show: { opacity: 1, scale: 1 }
      }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative flex flex-col items-center p-4 print:p-2 rounded-3xl bg-slate-50/50 border border-slate-100/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group/badge cursor-default overflow-hidden"
    >
      {/* Percentage Glow Background */}
      <div className="absolute inset-0 bg-blue-500/0 group-hover/badge:bg-blue-500/[0.03] transition-colors" />

      {/* Icon with Floating Effect */}
      <div className="relative mb-3 print:mb-1 flex items-center justify-center">
        <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity print:hidden" />
        <div className="w-10 h-10 print:w-6 print:h-6 flex items-center justify-center bg-white rounded-2xl print:rounded-lg shadow-sm border border-slate-50 z-10 group-hover/badge:border-blue-200/50 transition-colors">
          <img
            src={`https://cdn.simpleicons.org/${icon}`}
            alt={name}
            className="w-6 h-6 print:w-4 print:h-4 object-contain filter grayscale group-hover/badge:grayscale-0 transition-all duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/codefactor';
            }}
          />
        </div>
      </div>

      <span className="text-sm print:text-[10px] font-display font-bold text-slate-700 mb-1 truncate max-w-full z-10">{name}</span>
      <span className="text-sm print:text-[10px] font-mono font-black text-blue-600 z-10">
        {level}%
      </span>

      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover/badge:opacity-100 -translate-y-2 translate-x-2 group-hover/badge:translate-y-0 group-hover/badge:translate-x-0 transition-all" />
    </motion.div>
  );
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-24 print:py-8 bg-slate-50/50 print:bg-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none print:hidden">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="section-container print:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 print:mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-display font-black text-blue-600 uppercase tracking-widest leading-none">
              Technical Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
            <span className="text-black">기술 영역</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-medium text-lg leading-relaxed">
            유연한 사고를 바탕으로 최적의 솔루션을 구현해냅니다.
          </p>
        </motion.div>

        {/* Categories Grid - Using Bento Style for the outer groups and badges inside */}
        <div className="grid lg:grid-cols-12 print:grid-cols-3 gap-8 print:gap-4 items-start max-w-7xl mx-auto">
          {/* Frontend Category - Priority 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 xl:col-span-7 print:col-span-1 print:col-span-full glass-card p-10 print:p-4 rounded-[3.5rem] print:rounded-xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 print:border-slate-300 shadow-2xl print:shadow-none relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-sky-400" />

            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <span className="font-display font-black text-xl">01</span>
                </div>
                <h3 className="text-3xl font-display font-black text-primary">Frontend</h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{skills.frontend.length} Core Skills</span>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                show: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {skills.frontend.map((skill, i) => (
                <SkillBadge key={skill.name} {...skill} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Backend & AI Category */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 xl:col-span-5 print:col-span-1 print:col-span-full glass-card p-10 print:p-4 rounded-[3.5rem] print:rounded-xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 print:border-slate-300 shadow-xl print:shadow-none relative group h-full"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-blue-400 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:rotate-12 transition-transform">
                <span className="font-display font-black text-xl">02</span>
              </div>
              <h3 className="text-2xl font-display font-black text-primary">Backend & AI</h3>
            </div>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                show: { transition: { staggerChildren: 0.1 } }
              }}
            >
              {skills.backendAI.map((skill, i) => (
                <SkillBadge key={skill.name} {...skill} index={i} />
              ))}
            </motion.div>
          </motion.div>

          {/* Tools Category */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 xl:col-span-12 print:col-span-1 print:col-span-full glass-card p-10 print:p-4 rounded-[3.5rem] print:rounded-xl bg-white/95 backdrop-blur-2xl border border-slate-200/60 print:border-slate-300 shadow-xl print:shadow-none relative group overflow-hidden"
          >
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 transition-all group-hover:bg-primary group-hover:text-white">
                  <span className="font-display font-black text-xl">03</span>
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-primary">Expert Tools</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mt-1">Workflow Optimization</p>
                </div>
              </div>

              <motion.div
                className="flex flex-wrap gap-4 md:basis-2/3"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  show: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {skills.tools.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      show: { opacity: 1, scale: 1 }
                    }}
                    whileHover={{ scale: 1.1, backgroundColor: '#f8fafc' }}
                    className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-default group/tool"
                  >
                    <img
                      src={`https://cdn.simpleicons.org/${skill.icon}`}
                      alt={skill.name}
                      className="w-5 h-5 filter grayscale group-hover/tool:grayscale-0 transition-all opacity-60 group-hover/tool:opacity-100"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/codefactor';
                      }}
                    />
                    <span className="font-display font-bold text-slate-600 group-hover/tool:text-primary transition-colors">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
