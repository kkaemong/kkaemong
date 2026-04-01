'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export default function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    { name: 'Frontend', items: skills.frontend },
    { name: 'Backend & AI (Experience)', items: skills.backendAI },
    { name: 'Tools', items: skills.tools },
  ];

  return (
    <section id="skills" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Technical Stack
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            사용자 경험을 최우선으로 생각하며, 유연한 사고로 최적의 기술 솔루션을 선택합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
              className="glass-card p-8 rounded-[2.5rem] bg-white/70 backdrop-blur-md flex flex-col h-full border border-slate-200 shadow-sm hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 cursor-default group"
            >
              <h3 className="text-lg font-display font-bold text-primary mb-8 flex items-center gap-3 transition-colors group-hover:text-accent">
                <span className="w-1.5 h-6 rounded-full bg-primary/20 group-hover:bg-accent/40 transition-colors" />
                {group.name}
              </h3>

              <div className="flex flex-wrap gap-2.5 mt-auto">
                {group.items.map((skill) => (
                  <div
                    key={skill}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white/50 text-slate-700 text-sm font-semibold transition-all duration-300"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}