'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, TrendingUp, Zap, CheckCircle2 } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { type Project } from '@/data/portfolio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function ProjectModal({ isOpen, onClose, project }: ModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100]"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:max-w-5xl h-[95vh] md:h-[90vh] bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Close Button (Floating) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-white/60 hover:bg-white/90 backdrop-blur-xl text-slate-800 rounded-full transition-all duration-300 shadow-sm"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-24">
              
              {/* Massive Hero Image */}
              <div className="relative w-full h-[30vh] md:h-[40vh] bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <h2 className="text-4xl font-display font-bold text-slate-300 uppercase tracking-widest">{project.title}</h2>
                  </div>
                )}
                {/* Subtle bottom fade to blend into white */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Central Content Area */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-8 md:px-16 pt-12"
              >
                {/* Title & Metadata (Centered) */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                  <span className="inline-block px-4 py-1.5 bg-[#f5f5f7] text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    {project.type}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
                    {project.title}
                  </h1>
                  
                  {/* Clean Horizontal Specs */}
                  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-slate-500 font-medium text-base mb-8">
                    {project.role && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Role</span>
                        <span className="text-slate-900 font-semibold">{project.role}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Period</span>
                      <span className="text-slate-900 font-semibold">{project.period}</span>
                    </div>
                    {project.teamSize && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Team</span>
                        <span className="text-slate-900 font-semibold">{project.teamSize}</span>
                      </div>
                    )}
                  </div>

                  {/* Elevating Tech Stack higher up under specifications */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto pt-6 border-t border-slate-100/80">
                    {project.tech.map((t: string) => (
                      <span key={t} className="px-4 py-2 bg-[#f5f5f7] rounded-full text-xs font-bold text-slate-700 tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Massive Description */}
                <motion.div variants={itemVariants} className="mb-20">
                  <p className="text-xl md:text-2xl text-slate-800 leading-[1.6] font-medium font-display tracking-tight text-center max-w-3xl mx-auto break-keep">
                    {project.description}
                  </p>
                </motion.div>

                {/* Tech & Highlights - Vertical Flow */}
                <motion.div variants={itemVariants} className="space-y-8 max-w-4xl mx-auto w-full">
                  
                  {/* PSR Section (Problem → Solution → Result) */}
                  {(project.challenge || project.solution || project.keyResult) && (
                    <div className="pb-8 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">
                        Challenge &amp; Outcome
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Problem Card */}
                          {project.challenge && (
                            <div className="bg-slate-50/80 hover:bg-slate-50 rounded-[1.5rem] p-6 border border-slate-100/80 transition-colors flex flex-col justify-between">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-6 bg-orange-400 rounded-full" />
                                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Problem (도전 과제)</span>
                                </div>
                                <ul className="space-y-2.5">
                                  {project.challenge.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-[14px] leading-relaxed font-medium break-keep">
                                      <span className="shrink-0 text-orange-400 mt-2 w-1.5 h-1.5 rounded-full bg-orange-400" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Solution Card */}
                          {project.solution && (
                            <div className="bg-slate-50/80 hover:bg-slate-50 rounded-[1.5rem] p-6 border border-slate-100/80 transition-colors flex flex-col justify-between">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
                                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Solution (해결 방안)</span>
                                </div>
                                <ul className="space-y-2.5">
                                  {project.solution.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-[14px] leading-relaxed font-medium break-keep">
                                      <span className="shrink-0 text-blue-400 mt-2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Result Spotlight Banner */}
                        {project.keyResult && project.keyResult.length > 0 && (
                          <div className="bg-gradient-to-r from-accent/[0.08] to-accent/[0.02] border border-accent/25 rounded-[1.5rem] p-7 md:p-8 flex flex-col md:flex-row md:items-start gap-5 shadow-[0_10px_30px_rgba(20,184,166,0.02)]">
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mt-1">
                              <CheckCircle2 size={24} className="text-accent" />
                            </div>
                            <div className="space-y-3 flex-1">
                              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Key Outcome (핵심 성과)</div>
                              <ul className="space-y-2">
                                {project.keyResult.map((result: string, idx: number) => (
                                  <li key={idx} className="flex gap-2.5 items-start">
                                    <span className="shrink-0 text-accent font-bold mt-0.5">✓</span>
                                    <span className="text-primary font-bold text-[15px] leading-relaxed break-keep">
                                      {result}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* GitHub Pill Button */}
                {project.github && (
                  <motion.div variants={itemVariants} className="mt-16 flex justify-center">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-black shadow-2xl shadow-slate-900/20"
                    >
                      <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-bold text-lg tracking-wide">GitHub Repository</span>
                      <ArrowUpRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </a>
                  </motion.div>
                )}

              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
