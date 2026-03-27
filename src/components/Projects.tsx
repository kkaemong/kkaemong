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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground max-w-xl">
              단순한 코딩을 넘어 사용자와 제작자 모두가 즐거운 경험을 할 수 있도록 만든 저의 결과물들입니다.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-accent font-medium"
          >
            View all on GitHub <ArrowUpRight size={20} />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
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
              <div className="relative overflow-hidden rounded-3xl bg-slate-100 aspect-[16/10] mb-6">
                 {/* Decorative Background for Card */}
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                 
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-8 text-center transition-transform group-hover:scale-110 duration-500">
                        <h4 className="text-2xl font-display font-bold text-primary mb-2">{project.title}</h4>
                        <div className="flex flex-wrap justify-center gap-2">
                             {project.tech.slice(0, 3).map((t: string) => (
                               <span key={t} className="text-xs font-semibold text-accent/80 uppercase tracking-widest">{t}</span>
                             ))}
                        </div>
                    </div>
                 </div>

                 <div className="absolute bottom-4 right-4 translate-y-12 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white p-3 rounded-full shadow-lg text-accent">
                         <ArrowUpRight size={24} />
                    </div>
                 </div>
              </div>

              <div>
                 <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">{project.type}</span>
                 <h3 className="text-2xl font-bold text-primary mb-3">{project.title}</h3>
                 <p className="text-muted-foreground line-clamp-2">{project.description}</p>
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
