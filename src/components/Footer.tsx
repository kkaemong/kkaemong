'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, BookOpen } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  const { contact } = portfolioData;

  return (
    <footer id="contact" className="relative py-28 px-4 bg-[#FAF9F6] text-slate-900 overflow-hidden print:hidden border-t border-slate-200/60">
      
      {/* Background Graph Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-10"
        >
          {/* Available for work Status */}
          <div className="flex items-center gap-2.5 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 mb-[-1rem]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-bold text-blue-600 tracking-wider uppercase">Available for Work</span>
          </div>

          {/* Subtle closing message */}
          <div className="space-y-2.5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight relative inline-block">
              Contact
              <img src="/decorations/big_heart.png" alt="Big Heart" className="absolute -top-4 -right-8 w-8 h-auto pointer-events-none opacity-85" />
            </h2>
            <p className="text-slate-600 font-normal text-base sm:text-lg leading-relaxed break-keep max-w-xl mx-auto">
              {contact.message}
            </p>
          </div>

          {/* Elegant Pill Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <a 
              href={`mailto:${contact.email}`} 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
            >
              <Mail size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors tracking-wide">
                {contact.email}
              </span>
            </a>
            
            <a 
              href={`https://${contact.github}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
            >
              <Github size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors tracking-wide">
                GitHub
              </span>
            </a>
            
            <a 
              href={contact.blog} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5 shadow-xs"
            >
              <BookOpen size={18} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
              <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors tracking-wide">
                Velog 블로그
              </span>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="pt-10 w-full flex justify-center">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400">
              © 2026 Jiin June Young
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
