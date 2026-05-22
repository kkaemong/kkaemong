'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, User, Calendar, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { portfolioData } from '@/data/portfolio';

export default function Hero() {
  const { hero, about } = portfolioData;

  return (
    <section id="hero" className="relative min-h-screen print:min-h-0 md:h-auto flex items-center pt-28 pb-20 print:pt-4 print:pb-4 overflow-hidden bg-white">
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

      <div className="section-container flex flex-col items-center justify-center gap-12 lg:gap-16 w-full print:gap-2">
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
                  alt="Jin Jun-yeong"
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
            className="w-full max-w-[850px] bg-white rounded-[3rem] border border-slate-200/60 p-10 lg:p-12 print:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] flex flex-col justify-between z-10"
          >
            <div>
              <h3 className="text-2xl font-bold text-primary mb-8 print:mb-4 flex items-center gap-4">
                <span className="w-2 h-8 bg-accent rounded-full print:h-6" />
                Information
              </h3>
              
              {/* Staggered container for items */}
              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.4
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 print:gap-y-4"
              >
                {about.personalInfo?.map((info) => (
                  <motion.div 
                    key={info.label} 
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { type: "spring", stiffness: 100, damping: 15 }
                      }
                    }}
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="flex items-center gap-5 group"
                  >
                    {/* Icon Box with elastic rotation & bounce on hover */}
                    <motion.div 
                      whileHover={{ 
                        scale: 1.15,
                        rotate: [0, -12, 10, -5, 0],
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 300, damping: 12 },
                        rotate: { duration: 0.5, ease: "easeInOut" }
                      }}
                      className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-accent group-hover:bg-accent/5 group-hover:border-accent/30 transition-colors shadow-sm shrink-0"
                    >
                      {info.label === "이름" && <User size={22} />}
                      {info.label === "생년월일" && <Calendar size={22} />}
                      {info.label === "주소지" && <MapPin size={22} />}
                      {info.label === "연락처" && <Phone size={22} />}
                      {info.label === "이메일" && <Mail size={22} />}
                      {info.label === "학력" && <GraduationCap size={22} />}
                    </motion.div>
                    
                    <div className="min-w-0 print:w-full">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{info.label}</p>
                      <p className="text-primary font-bold text-lg lg:text-xl truncate print:whitespace-normal print:overflow-visible print:text-base">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
 
            {/* Magnetic-like GitHub Call to Action button */}
            <div className="mt-12 print:mt-6 pt-8 print:pt-4 border-t border-slate-100">
              <motion.a
                href={hero.cta.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial="rest"
                whileHover="hover"
                whileTap={{ scale: 0.995 }}
                variants={{
                  rest: { scale: 1, y: 0 },
                  hover: { 
                    scale: 1.005, 
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 20 }
                  }
                }}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-accent/5 hover:text-accent border border-transparent hover:border-accent/20 transition-all group"
              >
                <div className="flex items-center gap-4">
                  {/* GitHub Logo box */}
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-primary group-hover:text-accent transition-colors shadow-sm">
                    {/* Wiggles like a cute head tilt when button hovered */}
                    <motion.div
                      variants={{
                        rest: { rotate: 0, scale: 1 },
                        hover: { 
                          rotate: [0, -18, 15, -10, 5, 0],
                          scale: 1.1,
                          transition: { duration: 0.65, ease: "easeInOut" }
                        }
                      }}
                    >
                      <Github size={20} />
                    </motion.div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">GitHub Repository</p>
                    <p className="font-bold text-base">Visit My GitHub</p>
                  </div>
                </div>
                {/* Chevron arrow elastic spring bounce pointing to destination */}
                <motion.div
                  variants={{
                    rest: { x: 0 },
                    hover: { 
                      x: 6,
                      transition: { type: "spring", stiffness: 300, damping: 10 }
                    }
                  }}
                >
                  <ChevronRight size={20} className="text-slate-300 group-hover:text-accent transition-colors" />
                </motion.div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
