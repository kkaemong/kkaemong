'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Certifications() {
  const { certifications } = portfolioData;

  if (!certifications || certifications.length === 0) return null;

  return (
    <section id="certifications" className="py-24 bg-white relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
             <span className="w-8 h-[2px] bg-slate-200" />
             <span className="text-slate-400 text-sm font-display font-semibold uppercase tracking-wider">
               Certifications
             </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            보유 자격 사항
          </h2>
          <p className="text-slate-600 text-lg font-medium">
            기술적 전문성과 성실함을 증명하는 기록들입니다.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                 <div className="p-3 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                    <Award size={24} />
                 </div>
                 <div className="flex items-center gap-1.5 text-slate-400 text-sm font-medium">
                    <Calendar size={14} />
                    {cert.date}
                 </div>
              </div>
              
              <h3 className="text-lg font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                {cert.title}
              </h3>
              
              <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                <CheckCircle2 size={14} className="text-slate-300" />
                {cert.issuer}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
