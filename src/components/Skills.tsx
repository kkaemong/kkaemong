'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

type SkillTag = '주력' | '보조' | '경험';

const tagConfig: Record<SkillTag, { className: string; dot: string; border: string }> = {
  '주력': {
    className: 'bg-blue-50 text-blue-700',
    dot: 'bg-blue-500',
    border: 'border-blue-200',
  },
  '보조': {
    className: 'bg-emerald-50 text-emerald-700',
    dot: 'bg-emerald-500',
    border: 'border-emerald-200',
  },
  '경험': {
    className: 'bg-amber-50 text-amber-700',
    dot: 'bg-amber-400',
    border: 'border-amber-200',
  },
};

const SkillBadge = ({
  name,
  tag,
  icon,
  description,
  index,
}: {
  name: string;
  tag: SkillTag;
  icon: string;
  description?: string;
  index: number;
}) => {
  const config = tagConfig[tag] ?? tagConfig['경험'];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="relative flex items-start gap-4 p-5 rounded-2xl bg-white/70 border border-slate-200/50 hover:bg-white hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group/badge"
    >
      {/* Icon */}
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 group-hover/badge:border-blue-200/50 transition-colors">
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
              target.src = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`;
            } else {
              target.src = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/codefactor.svg';
            }
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <span className="text-[1.05rem] font-bold text-slate-800">{name}</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold border ${config.className} ${config.border}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {tag}
          </span>
        </div>
        {description && (
          <p className="text-sm text-slate-600 leading-relaxed break-keep">{description}</p>
        )}
      </div>
    </motion.div>
  );
};

const SECTIONS = [
  {
    num: '01',
    key: 'main',
    title: 'Game Client',
    subtitle: '핵심 주력 — C# · Unity',
    accentClass: 'bg-blue-50 text-blue-600',
  },
  {
    num: '02',
    key: 'sub',
    title: 'Fullstack Integration',
    subtitle: '서버·웹 연동 보조 스택',
    accentClass: 'bg-emerald-50 text-emerald-600',
  },
  {
    num: '03',
    key: 'exp',
    title: 'Deep Dive Experience',
    subtitle: 'AI · 보안 심화 경험',
    accentClass: 'bg-amber-50 text-amber-600',
  },
];

export default function Skills() {
  const s = portfolioData.skills as any;

  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none print:hidden">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-sky-100/30 rounded-full blur-[120px]" />
      </div>

      <div className="section-container max-w-7xl mx-auto print:max-w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14 print:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-display font-black text-blue-600 uppercase tracking-widest">
              Technical Stack
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-display font-bold text-black mb-4 tracking-tight">
            Tech Skills
          </h2>
          <p className="text-slate-500 font-medium text-lg mb-8">
            실제 프로젝트에 투입해 문제를 해결한 기술들입니다.
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {(Object.entries(tagConfig) as [SkillTag, typeof tagConfig[SkillTag]][]).map(
              ([tag, cfg]) => (
                <span
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.className} ${cfg.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  {tag}
                </span>
              )
            )}
          </div>
        </motion.div>

        {/* Sections */}
        <div className="flex flex-col gap-10 print:gap-6">
          {SECTIONS.map((section) => {
            const data: any[] = s[section.key];
            if (!data?.length) return null;

            return (
              <motion.div
                key={section.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 md:p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg print:shadow-none print:border-slate-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-lg ${section.accentClass}`}
                  >
                    {section.num}
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-black text-slate-900 leading-none">
                      {section.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-0.5">{section.subtitle}</p>
                  </div>
                </div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{ show: { transition: { staggerChildren: 0.06 } } }}
                >
                  {data.map((skill: any, i: number) => (
                    <SkillBadge key={skill.name} {...skill} index={i} />
                  ))}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
