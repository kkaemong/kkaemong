'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Award, ShieldCheck, Languages } from 'lucide-react';

export default function Certifications() {
  const { certifications } = portfolioData as any;
  const displayCerts = certifications || [];

  const getIcon = (id: number) => {
    switch (id) {
      case 1:
        return <Award className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />;
      case 2:
        return <Languages className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />;
      case 3:
        return <ShieldCheck className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />;
      default:
        return <Award className="w-8 h-8 text-accent group-hover:text-white transition-colors duration-500" />;
    }
  };

  return (
    <section id="certifications" className="py-24 bg-white print:py-8 border-t border-slate-100">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 print:mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-accent" />
            <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
              Credentials
            </span>
            <span className="w-8 h-[2px] bg-accent" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-4">
            자격증 및 어학
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            취득 자격증 및 어학 역량입니다.
          </p>
        </motion.div>

        {/* Render a beautiful placeholder if the list is empty, otherwise map over certifications */}
        {displayCerts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-10 px-6 rounded-3xl bg-slate-50 border border-slate-100 max-w-sm mx-auto"
          >
            <p className="text-slate-400 font-semibold text-base">
              아직 미취득
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto print:grid-cols-2 print:gap-4">
            {displayCerts.map((cert: any, i: number) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="p-8 print:p-4 rounded-[2.5rem] print:rounded-2xl bg-white border border-slate-100 print:border shadow-sm hover:shadow-xl hover:border-accent/20 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-16 h-16 print:w-10 print:h-10 rounded-2xl print:rounded-lg bg-accent/5 flex items-center justify-center mb-6 print:mb-3 group-hover:bg-accent group-hover:rotate-6 transition-all duration-500 shadow-inner">
                    {getIcon(cert.id)}
                  </div>
                  
                  <span className="text-accent text-[11px] font-bold font-display uppercase tracking-wider bg-accent/5 px-2.5 py-1 rounded-md mb-3 inline-block leading-none">
                    {cert.date}
                  </span>
                  
                  <h3 className="text-xl print:text-base font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
                    {cert.issuer}
                  </p>

                  {cert.description && (
                    <p className="text-slate-600 text-[14px] leading-relaxed font-semibold break-keep">
                      {cert.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
