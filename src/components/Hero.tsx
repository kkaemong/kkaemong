'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Github, User, Calendar, MapPin, Phone, Mail, GraduationCap, Target, Cpu, Globe } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { hero } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="relative min-h-screen print:min-h-0 md:h-auto flex items-center pt-20 print:pt-4 print:pb-4 overflow-hidden">
      {/* Background Decorative Elements */}
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
        className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10 print:hidden"
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

      <div className="section-container flex flex-col items-center justify-center gap-12 lg:gap-16 print:gap-2">
        {/* Main Focus: Profile Photo & Information Card (Wider/Shorter) */}
        <div className="flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-16 w-full print:flex-col print:gap-4 print:items-start">
          {/* Profile Photo - Back to Original Portrait Style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 15,
              delay: 0.3
            }}
            className="relative group w-full max-w-[320px] shrink-0 print:max-w-xs print:mx-auto print:mb-4"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="relative w-full aspect-[4/5]"
            >
              <div className="absolute -inset-4 border-2 border-primary/5 rounded-[2rem] -z-10 transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-4 bg-accent/5 rounded-[2rem] -z-10 translate-x-4 translate-y-4" />

              <div className="w-full h-full rounded-[2rem] overflow-hidden glass-card shadow-2xl relative">
                <img
                  src="/profile.jpg"
                  alt="Jin Jun-yeong"
                  className="w-full h-full object-cover filter contrast-[1.05] transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </motion.div>

          {/* Personal Information Card - Wider & Shorter (Grid Layout) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: 'spring',
              stiffness: 50,
              damping: 15,
              delay: 0.4
            }}
            className="w-full max-w-[850px] bg-white/80 backdrop-blur-xl rounded-[3rem] print:rounded-2xl p-10 lg:p-12 print:p-6 border border-white/50 print:border-none shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] print:shadow-none z-10"
          >
            <h3 className="text-2xl font-bold text-primary mb-8 print:mb-4 flex items-center gap-4">
              <span className="w-2 h-8 bg-accent rounded-full print:h-6" />
              Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 print:gap-y-4">
              {portfolioData.about.personalInfo?.map((info: { label: string; value: string }, index: number) => (
                <div key={info.label} className="flex items-center gap-5 group">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:border-accent/30 group-hover:scale-110 transition-all shadow-sm shrink-0"
                  >
                    {info.label === "이름" && <User size={24} />}
                    {info.label === "생년월일" && <Calendar size={24} />}
                    {info.label === "주소지" && <MapPin size={24} />}
                    {info.label === "연락처" && <Phone size={24} />}
                    {info.label === "이메일" && <Mail size={24} />}
                    {info.label === "학력" && <GraduationCap size={24} />}
                  </motion.div>
                  <div className="min-w-0 print:w-full">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{info.label}</p>
                    <p className="text-primary font-bold text-lg lg:text-xl truncate print:whitespace-normal print:overflow-visible print:text-base">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* GitHub Link Addition */}
            <div className="mt-12 print:mt-6 pt-8 print:pt-4 border-t border-slate-100">
              <a
                href={hero.cta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-accent/5 hover:text-accent border border-transparent hover:border-accent/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:text-accent transition-colors shadow-sm">
                    <Github size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">GitHub Repository</p>
                    <p className="font-bold text-base">Visit My GitHub</p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
