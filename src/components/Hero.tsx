'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { hero } = portfolioData;

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="section-container grid md:grid-cols-[1.4fr_1fr] gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
              Frontend Developer
            </span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-display font-bold text-primary leading-tight mb-8">
            {hero.headline.split(',').map((part, i) => (
              <span key={i} className="block">
                {part}{i === 0 ? ',' : ''}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl font-normal whitespace-pre-line mb-12">
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
              <Github size={18} />
              GitHub
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative group"
        >
          {/* Hero Image Container */}
          <div className="relative w-full aspect-[4/5] max-w-[340px] ml-auto">
            {/* Solid structure (Geometric backgrounds) */}
            <div className="absolute -inset-4 border-2 border-primary/10 rounded-2xl -z-10 transition-transform group-hover:scale-105 duration-700" />
            <div className="absolute inset-4 bg-accent/5 rounded-2xl -z-10 translate-x-4 translate-y-4" />

            {/* The Image (Flexible rendering) */}
            <div className="w-full h-full rounded-2xl overflow-hidden glass-card shadow-2xl relative">
              <img
                src="/profile.jpg"
                alt="Jin Jun-yeong"
                className="w-full h-full object-cover filter contrast-[1.02] transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay for glass look */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
