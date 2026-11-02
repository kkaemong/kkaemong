'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { onIntent, warmProject } from '@/lib/foresight';
import { motion } from 'framer-motion';
import { portfolioData, Project } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';

// 상세 모달은 무겁기 때문에 처음에는 불러오지 않는다.
// ForesightJS가 "곧 이 줄을 누르겠구나"를 마우스 궤적으로 예측하면, 클릭 전에 모달 코드와 안의 이미지·영상을 전부 받아 둔다.
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false });

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

export default function Projects() {
  const { projects } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // 프로젝트마다 예측 등록 (마우스가 다가오는 중에 미리 준비)
    const offs = (projects as Project[]).map((project) => {
      const el = document.querySelector<HTMLElement>(`[data-project-id="${project.id}"]`);
      return el ? onIntent(el, `project:${project.title}`, () => warmProject(project), 60) : () => {};
    });
    return () => offs.forEach((off) => off());
  }, [projects]);

  return (
    <section id="projects" className="relative border-t border-[#111]/15 pt-28 text-[#111] sm:pt-40">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-12">
        {/* 머리말 */}
        <div className="mb-16 print:hidden sm:mb-24">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-12 text-xs font-medium uppercase tracking-[0.45em] text-[#8a8780] sm:text-sm"
          >
            Selected Works
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-8% 0px' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h2 className={`mb-8 text-[clamp(3rem,8vw,8.5rem)] font-light leading-[1.2] tracking-tight ${SERIF}`}>Projects</h2>
            <p className="max-w-[60ch] break-keep text-[clamp(1.15rem,1.3vw,1.6rem)] leading-loose text-[#6b6862]">
              플레이어에게 보이는 인게임 로직·애니메이션·연출을 직접 구현한 게임 프로젝트입니다. 줄에 마우스를 올리면 제가 한 일이 보이고, 누르면 자세한 내용이 열립니다.
            </p>
          </motion.div>
        </div>

        {/* 프로젝트 목록: 한 줄씩 */}
        <div className="border-b border-[#111]/15 pb-4">
          {(projects as Project[]).map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-6% 0px' }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${project.title} 자세히 보기`}
              data-project-id={project.id}
              className="group cursor-pointer border-t border-[#111]/15 py-9 outline-none sm:py-12"
            >
              <div className="flex items-center justify-between gap-6">
                <div className="flex min-w-0 items-center gap-5 sm:gap-10">
                  <span className="shrink-0 text-xs font-medium tracking-[0.3em] text-[#8a8780] sm:text-sm">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={`min-w-0 break-keep text-[clamp(1.7rem,3.6vw,5rem)] font-light leading-[1.2] tracking-tight transition-transform duration-500 md:whitespace-nowrap group-hover:translate-x-3 group-focus-visible:translate-x-3 ${SERIF}`}>
                    {project.title}
                  </h3>
                </div>
                <div className="hidden shrink-0 items-center gap-6 text-sm tracking-[0.1em] text-[#8a8780] md:flex">
                  <span>{project.type}</span>
                  {project.wip ? <span>개발중</span> : project.award && <span className="text-[#a8742a]">{project.award}</span>}
                  <ArrowUpRight size={26} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
              </div>

              {/* 마우스를 올리면 아래로 살짝 펼쳐지는 "내가 한 일" (터치 화면에서는 항상 보임) */}
              <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-visible:grid-rows-[1fr]">
                <div className="overflow-hidden">
                  <div className="grid items-start gap-8 pt-7 opacity-100 transition-opacity duration-500 md:grid-cols-[1.3fr_1fr] md:pl-[4.5rem] md:opacity-0 md:delay-100 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 lg:pl-[6.5rem]">
                    <div>
                      <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#8a8780] sm:text-sm">내가 한 일</p>
                      {project.role && <p className={`mb-4 break-keep text-[clamp(1.2rem,1.7vw,2.1rem)] font-light leading-snug ${SERIF}`}>{project.role}</p>}
                      <p className="break-keep text-[clamp(1.05rem,1.15vw,1.4rem)] leading-loose text-[#6b6862]">{project.impactLine ?? project.description}</p>
                      <p className="mt-5 text-sm tracking-wide text-[#8a8780]">{project.tech.join(' · ')}</p>
                    </div>
                    {project.image && (
                      <div className="relative aspect-[16/10] w-full max-w-xl justify-self-end overflow-hidden bg-[#f4f2ee]">
                        <Image src={project.image} alt={project.title} fill sizes="(min-width: 768px) 32vw, 90vw" quality={78} className="object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="h-28 sm:h-40" />

      {/* Project Detail Modal */}
      <ProjectModal isOpen={!!selectedProject} project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
