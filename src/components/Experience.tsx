'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { GraduationCap } from 'lucide-react';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            Experience & Education
          </h2>
          <p className="text-muted-foreground">
            끊임없이 배우고 성장하며 걸어온 길입니다.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-8">
          {experience.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-6 p-6 rounded-2xl bg-white shadow-sm border border-border group hover:border-accent/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors">
                 <GraduationCap size={24} />
              </div>
              <div>
                 <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                 <p className="text-muted-foreground leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
