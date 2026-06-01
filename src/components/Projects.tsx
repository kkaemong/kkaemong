'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData, type Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 print:py-8 bg-slate-50 border-y border-slate-200/60 relative overflow-hidden">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 print:mb-8 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
                Portfolio
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
              프로젝트
            </h2>
            <p className="text-slate-700 text-lg md:text-xl max-w-3xl font-semibold leading-relaxed">
              유연한 사고로 문제를 정의하고, 견고한 구조로 해결책을 구현한 프로젝트들입니다.
            </p>
          </motion.div>

          <motion.a
            href="https://github.com/kkaemong"
            target="_blank"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group px-4 py-2 rounded-full border border-slate-100 hover:border-accent/30 print:hidden"
          >
            GitHub에서 모두 보기 <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="space-y-32 md:space-y-48 print:space-y-8">
          {(projects as Project[]).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 print:flex-col print:items-start print:gap-4 print:pb-8 print:border-b print:border-slate-200 print:break-inside-avoid`}
            >
              {/* Project Image Container */}
              <div 
                className="group w-full md:w-3/5 hover:z-10 cursor-pointer print:hidden"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-100 aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_rgba(20,184,166,0.15)] group-hover:scale-[1.03]">
                  {project.image ? (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-12 group-hover:from-accent/10 group-hover:to-primary/10 transition-colors duration-700">
                      <h4 className="text-3xl md:text-4xl font-display font-bold text-primary/20 text-center uppercase tracking-tighter group-hover:text-accent/30 transition-colors duration-700">
                        {project.title}
                      </h4>
                    </div>
                  )}
                  
                  {/* Subtle Interactive Overlay & Blue Tint */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/[0.03] transition-colors duration-700" />
                  
                  {/* Floating Tag */}
                  <div className="absolute top-8 left-8">
                    <span className="bg-white/80 backdrop-blur-lg px-6 py-2 rounded-full text-[12px] font-bold text-primary shadow-xl border border-white/40 uppercase tracking-widest">
                      {project.type}
                    </span>
                  </div>

                </div>
              </div>

              {/* Project Info Container */}
              <div className="w-full md:w-2/5 print:w-full space-y-6 print:space-y-2">
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="flex items-center gap-4 mb-4 print:mb-2">
                    <span className="text-accent font-display font-black text-sm uppercase tracking-[0.2em]">{String(i + 1).padStart(2, '0')}</span>
                    <div className="h-[1px] flex-1 bg-slate-100" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl print:text-2xl font-display font-bold text-primary mb-4 print:mb-2 transition-colors duration-300 leading-tight">
                    {project.title}
                  </h3>
                  
                  <div className="flex flex-col gap-2 mb-6 print:mb-2 print:flex-row print:items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 font-semibold text-sm">{project.period}</span>
                    </div>
                    {project.role && (
                      <div className="text-accent/80 font-bold text-base">
                        {project.role}
                      </div>
                    )}
                  </div>

                  <p className="text-slate-800 text-lg print:text-sm leading-relaxed font-semibold mb-4 print:mb-2">
                    {project.description}
                  </p>


                  <div className="flex flex-wrap gap-3">
                    {project.tech.map(t => (
                      <span key={t} className="text-[11px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100/70 border border-slate-200/60 px-3 py-1.5 rounded-xl transition-colors">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Desktop Only "View Case Study" Link */}
                  <div className="pt-8 md:pt-12 print:hidden">
                    <span 
                      className="group inline-flex items-center gap-2 text-primary font-bold border-b-2 border-primary/10 hover:border-accent pb-1 transition-all cursor-pointer hover:text-accent"
                      onClick={() => setSelectedProject(project)}
                    >
                      프로젝트 상세보기
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}
