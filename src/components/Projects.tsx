'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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
            className="flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors group px-4 py-2 rounded-full border border-slate-100 hover:border-accent/30"
          >
            GitHub에서 모두 보기 <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 aspect-[16/10] mb-8 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-accent/5">
                {/* Project Image */}
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-accent/10 group-hover:to-primary/10 transition-colors duration-500" />
                )}

                {/* Overlay for better text/tag visibility */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />

                {/* Center Content / Mockup Space (Optional if image exists) */}
                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <div className="text-center p-6 bg-white/30 backdrop-blur-sm rounded-xl border border-primary/5">
                      <h4 className="text-2xl md:text-3xl font-display font-bold text-primary mb-3">
                        {project.title}
                      </h4>
                    </div>
                  </div>
                )}

                {/* Top Right Tag */}
                <div className="absolute top-6 right-6">
                  <div className="bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold text-primary border border-white/20 shadow-sm uppercase tracking-wider">
                    {project.type}
                  </div>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="bg-primary text-white p-4 rounded-full shadow-xl">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              <div className="px-2">
                <div className="flex items-center gap-4 mb-3">
                  <h3 className="text-2xl font-display font-bold text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                  <span className="text-slate-500 text-sm font-semibold">{project.period}</span>
                </div>
                <p className="text-slate-700 text-lg line-clamp-2 leading-relaxed font-medium whitespace-pre-line">{project.description}</p>
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
