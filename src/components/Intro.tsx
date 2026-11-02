'use client';

import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';

// 첫 화면 다음, 프로젝트 앞: 모토 한 줄과 주력 언어·도구 소개
const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export default function Intro() {
  const { skills } = portfolioData;

  return (
    <section id="intro" className="relative flex min-h-screen items-center border-t border-[#111]/15 py-28 text-[#111] sm:py-36">
      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-10 text-xs font-medium uppercase tracking-[0.45em] text-[#8a8780] sm:text-sm"
        >
          Motto · Skills
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 48, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <h2 className={`break-keep text-[clamp(2.4rem,min(6.4vw,12vh),8rem)] font-light leading-[1.2] tracking-tight ${SERIF}`}>증상이 아니라 원인을 찾습니다.</h2>
          <p className="mt-8 max-w-[60ch] break-keep text-[clamp(1.15rem,1.3vw,1.6rem)] leading-loose text-[#6b6862]">플레이어가 어색하다고 느끼는 순간 뒤에는 늘 이유가 있습니다.</p>
        </motion.div>

        {/* 주력 언어와 도구 */}
        <div className="mt-16 grid gap-12 border-t border-[#111]/15 pt-12 sm:mt-24 sm:grid-cols-2 sm:gap-20 sm:pt-16">
          {skills.main.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
            >
              <p className="mb-4 text-xs font-medium tracking-[0.3em] text-[#8a8780] sm:text-sm">주력</p>
              <p className={`mb-5 text-[clamp(2.6rem,6vw,7rem)] font-light leading-none tracking-tight ${SERIF}`}>{s.name}</p>
              <p className="break-keep text-[clamp(1.05rem,1.15vw,1.35rem)] leading-loose text-[#6b6862]">{s.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-8% 0px' }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-14 text-[clamp(1.05rem,1.2vw,1.4rem)] tracking-wide text-[#8a8780] sm:mt-20"
        >
          <span className="mr-4 text-xs font-medium tracking-[0.3em] sm:text-sm">보조</span>
          {skills.sub.map((s) => s.name).join(' · ')}
        </motion.p>
      </div>
    </section>
  );
}
