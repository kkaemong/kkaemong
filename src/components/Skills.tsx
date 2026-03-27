'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

export default function Skills() {
  const { skills } = portfolioData;

  const skillGroups = [
    { name: 'Core', items: skills.core, color: 'bg-accent' },
    { name: 'Extended', items: skills.others, color: 'bg-primary' },
    { name: 'Tools', items: skills.tools, color: 'bg-slate-500' },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Skills & Expertise
          </h2>
          <p className="text-muted-foreground">
            사용자 중심의 경험을 만들기 위한 저의 기술 스택입니다.
          </p>
        </motion.div>

        <div className="space-y-12 max-w-4xl mx-auto">
          {skillGroups.map((group, groupIdx) => (
            <div key={group.name} className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, i) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 100, 
                      delay: (groupIdx * 0.1) + (i * 0.05) 
                    }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    className={`px-4 py-2 rounded-lg ${group.color} text-white text-sm font-medium shadow-sm cursor-default`}
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
