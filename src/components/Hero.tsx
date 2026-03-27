'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { hero } = portfolioData;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="section-container grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6"
          >
            Frontend Developer / Software Engineer
          </motion.span>
          
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary leading-tight mb-6">
            {hero.headline}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
            {hero.subTitle}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-primary group">
              {hero.cta.primary}
              <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href={hero.cta.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-outline flex items-center gap-2"
            >
              <Globe size={18} />
              {hero.cta.secondary}
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          {/* Hero Illustration Placeholder - Will look premium with glassmorphism */}
          <div className="w-full aspect-square relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent rounded-3xl opacity-10 blur-xl animate-pulse" />
            <div className="absolute inset-8 border border-white/20 rounded-2xl shadow-2xl glass-card flex items-center justify-center p-8">
               <div className="w-full h-full flex flex-col justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-slate-100 rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse delay-75" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded animate-pulse delay-150" />
                  </div>
                  <div className="text-4xl font-display font-bold text-primary/20 select-none">
                    &lt;Code /&gt;
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
