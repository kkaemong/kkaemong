'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, BookOpen } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  const { contact } = portfolioData;

  return (
    <footer id="contact" className="relative py-32 px-4 bg-white overflow-hidden print:hidden border-t border-slate-50">
      
      {/* Subtle Glowing Background Orb (은은하게 시선을 끄는 백그라운드 오로라) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-accent/10 blur-[100px] rounded-[100%] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-10"
        >
          {/* Available for work Status (작지만 확실히 시선을 끄는 상태창) */}
          <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 mb-[-1rem]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">Available for Work</span>
          </div>

          {/* Subtle closing message */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-display font-black text-primary tracking-tight">
              Let's Build Something Great.
            </h2>
            <p className="text-slate-500 font-medium text-[15px] leading-relaxed break-keep max-w-lg mx-auto">
              {contact.message}
            </p>
          </div>

          {/* Elegant Pill Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a 
              href={`mailto:${contact.email}`} 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(20,184,166,0.1)]"
            >
              <Mail size={15} className="text-slate-400 group-hover:text-accent transition-colors" />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-accent transition-colors tracking-wide">
                {contact.email}
              </span>
            </a>
            
            <a 
              href={`https://${contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(20,184,166,0.1)]"
            >
              <Github size={15} className="text-slate-400 group-hover:text-accent transition-colors" />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-accent transition-colors tracking-wide">
                GitHub
              </span>
            </a>
            
            <a 
              href={contact.blog} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-accent/5 hover:border-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(20,184,166,0.1)]"
            >
              <BookOpen size={15} className="text-slate-400 group-hover:text-accent transition-colors" />
              <span className="text-sm font-semibold text-slate-600 group-hover:text-accent transition-colors tracking-wide">
                Velog
              </span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-10 w-full flex justify-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
              © 2026 Jin Junyoung. All rights reserved.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
