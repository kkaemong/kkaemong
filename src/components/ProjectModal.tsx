'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Globe, Github, ChevronRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
}

export default function ProjectModal({ isOpen, onClose, project }: ModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-4xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Header Section */}
            <div className="relative h-48 md:h-72 bg-slate-900 overflow-hidden flex items-end p-8 md:p-12 group/modal">
               {/* Project Image as Background */}
               {project.image ? (
                 <>
                   <img 
                     src={project.image} 
                     alt={project.title} 
                     className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover/modal:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                 </>
               ) : (
                 <>
                   <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90" />
                   {/* Pattern Background */}
                   <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                 </>
               )}
               
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
               
               <button
                 onClick={onClose}
                 className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-20"
               >
                 <X size={24} />
               </button>

               <div className="relative z-10 w-full">
                 <div className="flex flex-wrap items-center gap-3 mb-3">
                   <span className="bg-accent/20 backdrop-blur-md px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest border border-white/10">
                     {project.type}
                   </span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2 leading-tight drop-shadow-lg">{project.title}</h2>
                 <p className="text-white/70 text-sm font-medium">{project.period}</p>
               </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12">
               <div className="grid md:grid-cols-3 gap-12">
                 {/* Left Column (Main Info) */}
                 <div className="md:col-span-2 space-y-10">
                   <div>
                     <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-accent" />
                        프로젝트 개요 (Description)
                     </h3>
                     <p className="text-xl text-primary leading-relaxed font-display">
                        {project.description}
                     </p>
                   </div>

                   <div>
                     <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-4 flex items-center gap-2">
                        <span className="w-4 h-[1px] bg-accent" />
                        주요 활동 및 성과 (Highlights)
                     </h3>
                     <ul className="space-y-6">
                       {project.highlights.map((highlight: string, i: number) => (
                         <li key={i} className="flex gap-4 group">
                           <div className="mt-1.5 w-2 h-2 rounded-full bg-accent/20 group-hover:bg-accent shrink-0 transition-colors" />
                           <span className="text-muted-foreground text-lg leading-relaxed group-hover:text-primary transition-colors">
                              {highlight}
                           </span>
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>

                 {/* Right Column (Sidebar) */}
                 <div className="space-y-8">
                   <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">역할 (Role)</h3>
                      <p className="text-primary font-bold text-lg">{project.role}</p>
                   </div>

                   <div className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">기술 스택 (Tech)</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t: string) => (
                          <span key={t} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-600 uppercase">
                            {t}
                          </span>
                        ))}
                      </div>
                   </div>

                   <div className="pt-4 flex flex-col gap-3">
                     {project.github && (
                       <a href={project.github} target="_blank" className="btn-primary py-3 text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-accent/20">
                         <Github size={18} />
                         GitHub 레포지토리
                       </a>
                     )}
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
