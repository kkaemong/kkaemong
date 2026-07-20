'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData, Project } from '@/data/portfolio';
import { ArrowUpRight, Sparkles, Filter } from 'lucide-react';
import ProjectModal from './ProjectModal';

const CATEGORIES = [
  { id: 'ALL', label: '전체 보기', icon: <Filter size={15} /> },
  { id: 'CSHARP', label: 'C#', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" alt="C#" className="w-4 h-4" /> },
  { id: 'TYPESCRIPT', label: 'TypeScript', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TS" className="w-4 h-4" /> },
  { id: 'PYTHON', label: 'Python', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="w-4 h-4" /> },
] as const;

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const handleTabClick = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const isHighlighted = (project: Project) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'CSHARP') return project.tech.some(t => t.toLowerCase().includes('c#') || t.toLowerCase().includes('unity'));
    if (activeCategory === 'TYPESCRIPT') return project.tech.some(t => t.toLowerCase().includes('typescript') || t.toLowerCase().includes('react'));
    if (activeCategory === 'PYTHON') return project.tech.some(t => t.toLowerCase().includes('python') || t.toLowerCase().includes('django'));
    return true;
  };

  return (
    <section id="projects" className="py-24 bg-[#FAF9F6] text-slate-900 relative border-t border-slate-200/60 overflow-hidden font-sans">
      {/* Background Graph Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-40 pointer-events-none" />

      {/* Sketchbook Point Decorators */}
      <motion.img
        animate={{ rotate: [0, 10, 0], y: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        src="/decorations/pencil_green.png"
        alt="Green Pencil"
        className="absolute top-16 right-10 w-16 h-auto z-10 hidden lg:block opacity-75 pointer-events-none"
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
            Projects Notes
          </div>

          {/* Header */}
          <div className="text-center mb-12 print:hidden relative">
            <div>
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className="w-8 h-[3px] bg-blue-500/40 rounded-full" />
                <span className="text-blue-600 text-sm font-bold uppercase tracking-widest">
                  Featured Works
                </span>
                <span className="w-8 h-[3px] bg-blue-500/40 rounded-full" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight relative inline-block">
                Projects
                <img src="/decorations/heart.png" alt="Heart" className="absolute -top-3 -right-7 w-7 h-auto pointer-events-none" />
              </h2>
              <p className="text-slate-600 text-base sm:text-lg font-normal max-w-2xl mx-auto leading-relaxed">
                문제 정의부터 기술적 해결, 프레임/메모리 최적화까지 직접 수행한 핵심 프로젝트입니다.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
              {CATEGORIES.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 shadow-xs cursor-pointer border ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                        : 'bg-[#FAF9F6] text-slate-700 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, i) => {
              const highlighted = isHighlighted(project as Project);
              const isFiltering = activeCategory !== 'ALL';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onClick={() => setSelectedProject(project as Project)}
                  className={`group cursor-pointer bg-[#FAF9F6] rounded-[2rem] overflow-hidden transition-all duration-500 border flex flex-col relative h-full ${
                    isFiltering
                      ? highlighted
                        ? 'opacity-100 border-2 border-blue-600 ring-8 ring-blue-500/20 shadow-2xl -translate-y-2.5 scale-[1.02] z-10'
                        : 'opacity-25 grayscale-[70%] border-slate-200/30 hover:opacity-60 scale-[0.96]'
                      : 'opacity-100 shadow-sm hover:shadow-xl border-slate-200/90 hover:border-blue-400/50 hover:-translate-y-1.5'
                  }`}
                >
                  {/* Top Highlight Accent Bar */}
                  {isFiltering && highlighted && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 z-20" />
                  )}

                  {/* Project Image Header */}
                  <div className="h-56 relative overflow-hidden bg-slate-100 shrink-0">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <span className="text-3xl font-black text-primary/10 tracking-tighter uppercase">{project.title}</span>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 z-10 print:hidden">
                      <span className={`backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase shadow-sm ${
                        highlighted ? 'bg-slate-900/90 text-white' : 'bg-slate-600/70 text-slate-200'
                      }`}>
                        {project.type}
                      </span>
                    </div>

                    {/* Hover Overlay Button */}
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-blue-600 text-white font-bold px-6 py-2.5 rounded-full flex items-center gap-2 text-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        상세 정보 보기 <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>

                  {/* Project Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2.5 gap-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight line-clamp-1 leading-snug">
                          {project.title}
                        </h3>
                        {project.award && (
                          <span className="shrink-0 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                            🏆 {project.award}
                          </span>
                        )}
                      </div>

                      <p className="text-slate-600 text-sm sm:text-base font-normal mb-5 leading-relaxed break-keep line-clamp-2">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-slate-200/60 mt-auto">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className={`px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium tracking-wide uppercase ${
                            highlighted ? 'bg-white text-slate-700 border border-slate-200/80 shadow-2xs' : 'bg-slate-100/60 text-slate-500'
                          }`}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
