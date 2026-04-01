'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap, Briefcase, Globe } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  const getIcon = (id: number) => {
    switch(id) {
      case 1: return <Briefcase size={24} />;
      case 4: return <Globe size={24} />;
      default: return <GraduationCap size={24} />;
    }
  };

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
              Timeline
            </span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
             경력 및 학력
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
             다양한 환경에서의 경험을 통해 유연한 사고와 견고한 역량을 쌓아왔습니다.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-10">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center gap-12 p-12 rounded-[2rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-500"
            >
              <div className="flex items-center gap-8 md:w-[35%]">
                 <div className="w-14 h-14 rounded-2xl bg-accent/5 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                    {getIcon(item.id)}
                 </div>
                 <div>
                    <span className="text-accent text-xs font-bold font-display uppercase tracking-wider bg-accent/5 px-2 py-1 rounded mb-2 inline-block">
                       {item.period}
                    </span>
                    <h3 className="text-base font-bold text-primary transition-colors group-hover:text-accent">{item.title}</h3>
                 </div>
              </div>
              
              <div className="md:flex-1 md:border-l-[1.5px] md:pl-12 border-slate-100">
                 <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                    {item.content}
                 </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
