'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Globe, ChevronRight } from 'lucide-react';

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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl md:max-h-[90vh] bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-primary to-accent p-8 flex items-end">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors"
              >
                <X size={20} />
              </button>
              <div>
                <span className="text-white/80 text-sm font-medium mb-2 block">{project.type}</span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{project.title}</h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Description</h3>
                    <p className="text-lg text-primary leading-relaxed">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">What I Did & Learned</h3>
                    <ul className="space-y-4">
                      {project.highlights.map((highlight: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-3">Role</h3>
                    <p className="text-primary font-medium">{project.role}</p>
                    <p className="text-sm text-muted-foreground">{project.period}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-3">Tech Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t: string) => (
                        <span key={t} className="px-2 py-1 bg-muted rounded text-xs font-medium text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t flex flex-col gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" className="btn-outline py-2 text-sm flex items-center justify-center gap-2">
                        <Globe size={16} />
                        GitHub
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
