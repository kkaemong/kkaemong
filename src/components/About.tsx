'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="relative overflow-hidden border-t border-[#111]/15 bg-white py-28 text-[#111] print:border-none print:bg-white print:py-8 sm:py-40">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-xs font-medium uppercase tracking-[0.45em] text-[#8a8780] sm:text-sm"
        >
          About
        </motion.p>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-24">
          {/* 왼쪽: 제목과 소개 */}
          <motion.div
            initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h2 className={`mb-12 whitespace-pre-line break-keep text-4xl font-light leading-[1.35] tracking-tight sm:text-6xl lg:text-7xl ${SERIF}`}>{about.title}</h2>
            <p className="whitespace-pre-line break-keep text-lg leading-loose text-[#6b6862] sm:text-xl">{about.description}</p>
          </motion.div>

          {/* 오른쪽: 핵심 가치 */}
          <div>
            {about.points.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: 'easeOut' }}
                className="grid grid-cols-[3rem_1fr] gap-5 border-t border-[#111]/15 py-9 first:border-t-0 first:pt-0 sm:py-11"
              >
                <span className="pt-2 text-sm font-medium tracking-[0.3em] text-[#8a8780]">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={`mb-3 break-keep text-2xl font-normal leading-snug tracking-wide sm:text-3xl ${SERIF}`}>{point.title.replace('\n', ' ')}</h3>
                  <p className="break-keep text-base leading-loose text-[#6b6862] sm:text-lg">{point.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
