'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, User, Calendar, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { hero, about } = portfolioData;

  return (
    <section id="hero" className="relative min-h-screen print:min-h-0 md:h-auto flex items-center pt-28 pb-20 print:pt-4 print:pb-4 overflow-hidden bg-[#FAF9F6] text-slate-900">
      {/* Background Notebook Graph Grid Line Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:2.2rem_2.2rem] opacity-50 pointer-events-none" />

      {/* Point Sketchbook Decorations (Subtle & Non-distracting) */}
      <motion.img
        animate={{ y: [0, -6, 0], rotate: [-15, -8, -15] }}
        transition={{ duration: 4, repeat: Infinity }}
        src="/decorations/pencil_blue.png"
        alt="Blue Pencil"
        className="absolute top-28 right-12 w-16 h-auto z-10 hidden lg:block opacity-80 pointer-events-none"
      />
      <motion.img
        animate={{ y: [0, 6, 0], rotate: [15, 25, 15] }}
        transition={{ duration: 4.5, repeat: Infinity }}
        src="/decorations/pencil_red.png"
        alt="Red Pencil"
        className="absolute bottom-28 left-10 w-16 h-auto z-10 hidden lg:block opacity-80 pointer-events-none"
      />
      <motion.img
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        src="/decorations/star.png"
        alt="Star"
        className="absolute top-24 left-16 w-7 h-auto z-10 hidden lg:block opacity-75 pointer-events-none"
      />
      <motion.img
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        src="/decorations/star.png"
        alt="Star"
        className="absolute bottom-20 right-16 w-8 h-auto z-10 hidden lg:block opacity-75 pointer-events-none"
      />
      <motion.img
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        src="/decorations/big_heart.png"
        alt="Heart"
        className="absolute bottom-16 right-36 w-8 h-auto z-10 hidden lg:block opacity-75 pointer-events-none"
      />

      {/* Background Decorative Blur Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 print:hidden"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 print:hidden"
      />

      <div className="section-container flex flex-col items-center justify-center gap-12 lg:gap-16 w-full print:gap-2 relative z-10">
        {/* Main Focus: Profile Photo & Information Card (Wider/Shorter) */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-16 w-full print:flex-col print:gap-4 print:items-start">
          {/* Profile Photo with Boutique 3D Parallax & Floating Loop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 15,
              delay: 0.2
            }}
            className="relative group w-full max-w-[320px] shrink-0 print:max-w-xs print:mx-auto print:mb-4"
          >
            {/* Subtle Floating Motion container */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full aspect-[4/5]"
            >
              {/* Point Tape Sticker on Photo Corner */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/80 rounded-xs border border-amber-300/60 shadow-xs z-20 rotate-[-2deg] pointer-events-none flex items-center justify-center">
                <span className="text-[10px] font-bold text-amber-800 tracking-wider">SKETCHBOOK</span>
              </div>

              {/* Outer decorative line (Rotates slightly opposite on hover) */}
              <motion.div 
                whileHover={{ scale: 1.06, rotate: -2 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="absolute -inset-4 border-2 border-primary/5 rounded-[2.5rem] -z-10 transition-transform duration-700" 
              />
              
              {/* Parallax background block (Shifts down/right while photo shifts up/left) */}
              <motion.div 
                whileHover={{ x: 12, y: 12, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 150, damping: 18 }}
                className="absolute inset-4 bg-accent/5 rounded-[2.5rem] -z-10 translate-x-4 translate-y-4" 
              />
 
              {/* Main photo container (Shifts slightly up/left on hover) */}
              <motion.div 
                whileHover={{ y: -8, x: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="w-full h-full rounded-[2.5rem] overflow-hidden glass-card shadow-2xl relative"
              >
                <img
                  src="/profile.jpg"
                  alt="Jiin June Young"
                  className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          </motion.div>
 
          {/* Personal Information Card with Staggered Entrance & Hover Interactivity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 15,
              delay: 0.3
            }}
            className="w-full max-w-[850px] bg-white rounded-[3rem] border border-slate-200/80 p-10 lg:p-12 print:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-between z-10 relative"
          >
            {/* Point Heart Decorator on Top Right */}
            <img src="/decorations/heart.png" alt="Heart" className="absolute -top-3 -right-2 w-7 h-auto z-20 pointer-events-none" />

            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-sm font-bold tracking-wide mb-4 font-sans"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                🎮 Game Client Developer
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mb-5 leading-snug whitespace-pre-line tracking-tight break-keep font-sans"
              >
                {hero.headline}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-normal whitespace-pre-line break-keep font-sans"
              >
                {hero.subTitle}
              </motion.p>
            </div>
 
            {/* Call to Action Buttons (GitHub & Velog) */}
            <div className="mt-8 print:mt-6 pt-5 print:pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-4 font-sans">
              {/* GitHub Button */}
              <motion.a
                href={hero.cta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-between p-4 rounded-2xl bg-slate-900 text-white hover:bg-black transition-all group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Code & Repos</p>
                    <p className="font-bold text-base">GitHub 바로가기</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              {/* Velog Button */}
              <motion.a
                href={hero.cta.velogUrl || "https://velog.io/@junemay31/posts"}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-between p-4 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all group shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white font-bold text-lg font-serif">
                    v
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-200 uppercase tracking-widest leading-none mb-1">Tech Blog</p>
                    <p className="font-bold text-base">Velog 기술 블로그</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-emerald-200 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
