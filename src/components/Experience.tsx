'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative overflow-hidden border-t border-[#111]/15 py-28 text-[#111] sm:py-40">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 text-xs font-medium uppercase tracking-[0.45em] text-[#8a8780] sm:text-sm"
        >
          Timeline
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className={`mb-20 text-[clamp(3rem,8vw,8.5rem)] font-light leading-[1.2] tracking-tight ${SERIF}`}
        >
          경력 및 학력
        </motion.h2>

        {/* 세 칸(기간·제목·내용)을 모든 줄이 함께 쓰는 격자: 줄마다 내용 시작 위치가 같게 정렬된다 */}
        <div className="md:grid md:grid-cols-[17rem_auto_1fr] md:gap-x-10 lg:gap-x-14">
          {experience.map((item, i) => {
            const isCurrent = item.period.includes('현재');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8% 0px' }}
                transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease: 'easeOut' }}
                className="flex flex-col gap-2 border-t border-[#111]/15 py-7 md:col-span-3 md:grid md:grid-cols-subgrid md:items-center lg:py-9"
              >
                {/* 한 줄: 기간 · 제목 · 내용. 넓은 화면에서는 어느 칸도 두 줄로 나누지 않는다 */}
                <div className="flex items-center gap-2.5 text-sm font-medium tracking-[0.2em] text-[#8a8780]">
                  {isCurrent && <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#111]" />}
                  <span className="whitespace-nowrap">{item.period}</span>
                </div>
                <h3 className={`text-[clamp(1.3rem,1.9vw,2.6rem)] font-light leading-snug tracking-wide md:whitespace-nowrap ${SERIF}`}>{item.title}</h3>
                <p className="break-keep text-[clamp(0.95rem,1.05vw,1.35rem)] leading-relaxed text-[#6b6862] md:whitespace-nowrap">{item.content.replace(/\n+/g, ' ')}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
