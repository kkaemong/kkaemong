'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2 } from 'lucide-react';
import { portfolioData, type Project } from '@/data/portfolio';
import ProjectModal from './ProjectModal';
import { 
  SiUnity, SiCplusplus, SiC, SiSpringboot, SiPython, 
  SiReact, SiNextdotjs, SiGit, SiGithub, SiLinux,
  SiTypescript, SiDjango, SiPytorch
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';

const iconMap: Record<string, React.ReactNode> = {
  'csharp': <TbBrandCSharp />,
  'unity': <SiUnity />,
  'cplusplus': <SiCplusplus />,
  'c': <SiC />,
  'springboot': <SiSpringboot />,
  'django': <SiDjango />,
  'python': <SiPython />,
  'react': <SiReact />,
  'nextjs': <SiNextdotjs />,
  'typescript': <SiTypescript />,
  'git': <SiGit />,
  'github': <SiGithub />,
  'linux': <SiLinux />,
  'pytorch': <SiPytorch />,
};

export default function Projects() {
  const { projects, skills } = portfolioData;
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Track which project is currently being hovered
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Split skills for left and right columns
  const leftSkills = skills.main;
  const rightSkills = [...skills.sub, ...skills.exp];
  const allSkills = [...leftSkills, ...rightSkills];

  // Derive which tech stacks are currently relevant
  const activeTechs = React.useMemo(() => {
    if (!hoveredProjectId) return null; // If no project is hovered, highlight all
    const project = projects.find(p => p.id === hoveredProjectId);
    return project ? project.tech : null;
  }, [hoveredProjectId, projects]);

  const isSkillActive = (skillName: string) => {
    if (!activeTechs) return true;
    const normalizedSkill = skillName.toLowerCase();
    return activeTechs.some(tech => {
      const normalizedTech = tech.toLowerCase();
      // Basic fuzzy matching (e.g., 'unity' matches 'Unity WebGL', 'Git & GitHub' matches 'Git')
      return normalizedTech.includes(normalizedSkill) || normalizedSkill.includes(normalizedTech);
    });
  };

  return (
    <section id="projects" className="py-24 print:py-8 bg-slate-50 border-y border-slate-200/60 relative">
      <div className="section-container max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 print:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-accent/40" />
              <span className="text-accent text-sm font-display font-bold uppercase tracking-widest">
                Skills & Projects
              </span>
              <span className="w-12 h-[2px] bg-accent/40" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-black text-primary mb-4 tracking-tight">
              Projects & Tech Stack
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-3">
              문제 해결과 성능 최적화를 이끌어낸 핵심 프로젝트 경험을 소개합니다.
            </p>
            <p className="text-slate-400 text-sm font-medium">
              💡 프로젝트 카드에 마우스를 올리면 좌측 대시보드에서 해당 기술 스택을 확인할 수 있습니다.
            </p>
          </motion.div>
        </div>

        {/* Mobile Skills (Hidden on Desktop) */}
        <div className="flex lg:hidden flex-wrap justify-center gap-4 mb-12">
          {allSkills.map((skill) => {
            const isHoveringAny = hoveredProjectId !== null;
            const active = isSkillActive(skill.name);
            const stateClass = !isHoveringAny 
              ? 'opacity-100 scale-100' 
              : active 
                ? 'opacity-100 scale-110 shadow-md ring-2 ring-accent/50' 
                : 'opacity-20 scale-90 grayscale blur-[1px]';

            return (
              <div 
                key={skill.name} 
                className={`w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center text-xl relative group transition-all duration-300 ${stateClass}`}
              >
                <div className={active ? 'text-blue-500' : 'text-slate-500'}>
                  {iconMap[skill.icon] || <Code2 />}
                </div>
                <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-md whitespace-nowrap z-50">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 relative items-start justify-center w-full">
          
          {/* Left Column: Unified Skills Dashboard */}
          <div className="hidden lg:flex flex-col gap-10 sticky top-32 w-52 shrink-0">
            
            {/* Core Skills Section */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 opacity-80 border-b border-slate-200/60 pb-2">
                <span className="text-xs font-black text-blue-500 uppercase tracking-[0.2em]">Core</span>
                <span className="h-[2px] flex-1 bg-blue-500/20 rounded-full"></span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {leftSkills.map((skill, i) => {
                  const isHoveringAny = hoveredProjectId !== null;
                  const active = isSkillActive(skill.name);
                  
                  // Dynamic classes based on hover state
                  let iconClass = "border-slate-200/60 text-blue-500";
                  let wrapperClass = "opacity-100 scale-100";
                  
                  if (isHoveringAny) {
                    if (active) {
                      wrapperClass = "opacity-100 scale-110 z-30";
                      iconClass = "border-blue-400 ring-4 ring-blue-100 shadow-lg text-blue-600 bg-blue-50/50";
                    } else {
                      wrapperClass = "opacity-20 scale-90 grayscale blur-[1px]";
                      iconClass = "border-transparent text-slate-400";
                    }
                  }

                  return (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
                      className={`flex flex-col items-center gap-2 transition-all duration-500 ${wrapperClass}`}
                    >
                      <div className={`w-14 h-14 bg-white rounded-2xl shadow-sm border flex items-center justify-center text-3xl transition-all duration-500 ${iconClass}`}>
                        {iconMap[skill.icon] || <Code2 />}
                      </div>
                      <span className="text-[11px] font-extrabold text-slate-700 text-center leading-tight">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Sub & Tools Section */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 opacity-70 border-b border-slate-200/60 pb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Sub & Tools</span>
                <span className="h-[2px] flex-1 bg-slate-300 rounded-full"></span>
              </div>

              <div className="flex flex-col gap-2 w-full">
                {rightSkills.map((skill, i) => {
                  const isHoveringAny = hoveredProjectId !== null;
                  const active = isSkillActive(skill.name);
                  const isSub = skill.tag === '보조';
                  const baseColor = isSub ? 'emerald' : 'amber';
                  
                  // Dynamic classes based on hover state
                  let containerClass = `border-slate-200/60`;
                  let iconColor = `text-${baseColor}-500`;
                  let wrapperClass = "opacity-100 scale-100";
                  
                  if (isHoveringAny) {
                    if (active) {
                      wrapperClass = "opacity-100 scale-105 z-30 translate-x-2";
                      containerClass = `border-${baseColor}-300 ring-2 ring-${baseColor}-100 shadow-md bg-white`;
                      iconColor = `text-${baseColor}-600`;
                    } else {
                      wrapperClass = "opacity-20 scale-95 grayscale blur-[1px]";
                      containerClass = "border-transparent bg-slate-50/50";
                      iconColor = "text-slate-400";
                    }
                  }

                  return (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      className={`flex items-center gap-3 w-full p-2 bg-white rounded-xl shadow-sm border transition-all duration-500 ${containerClass} ${wrapperClass}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xl shrink-0 bg-slate-50 ${iconColor}`}>
                        {iconMap[skill.icon] || <Code2 />}
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className={`text-[9px] font-bold mb-0.5 ${isSub ? 'text-emerald-500/80' : 'text-amber-500/80'}`}>{skill.tag}</span>
                        <span className="text-[11px] font-black text-slate-700 truncate" title={skill.name}>
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Projects Grid */}
          <div className="flex-1 w-full max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  onClick={() => setSelectedProject(project as Project)}
                  className={`group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-sm transition-all duration-500 border relative h-full print:border-none print:shadow-none print:mb-8
                    ${hoveredProjectId === project.id ? 'shadow-2xl border-accent/40 -translate-y-2 ring-4 ring-accent/10' : 'border-slate-200/80 hover:shadow-lg'}`}
                >
                  {/* Project Image Header */}
                  <div className="h-48 relative overflow-hidden bg-slate-100 shrink-0">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className={`w-full h-full object-cover transition-transform duration-700 ${hoveredProjectId === project.id ? 'scale-110' : 'scale-100'}`} />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                        <span className="text-3xl font-black text-primary/10 tracking-tighter uppercase">{project.title}</span>
                      </div>
                    )}
                    
                    {/* Glassmorphism Hover Overlay */}
                    <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-all duration-500 flex items-center justify-center print:hidden ${hoveredProjectId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                      <span className={`bg-accent text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 transform transition-all duration-500 shadow-xl border border-white/20 text-sm ${hoveredProjectId === project.id ? 'translate-y-0' : 'translate-y-6'}`}>
                        자세히 보기 <ArrowUpRight size={18} className={hoveredProjectId === project.id ? 'translate-x-1 -translate-y-1 transition-transform' : ''} />
                      </span>
                    </div>
                    
                    {/* Floating Type Badge */}
                    <div className="absolute top-4 left-4 z-10 print:hidden">
                      <span className="bg-white/95 backdrop-blur-md text-primary px-3 py-1.5 rounded-lg text-[10px] font-black tracking-widest uppercase shadow-sm border border-white/40">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col relative z-20">
                    <h3 className={`text-2xl font-black mb-3 transition-colors tracking-tight line-clamp-1 ${hoveredProjectId === project.id ? 'text-accent' : 'text-primary'}`}>{project.title}</h3>
                    <p className="text-slate-600 font-medium mb-6 leading-relaxed text-sm md:text-base break-keep line-clamp-2 md:line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Bubbles */}
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map(t => (
                        <span key={t} className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold tracking-wider transition-colors uppercase border ${hoveredProjectId === project.id ? 'bg-accent/10 text-accent border-accent/20' : 'bg-slate-50 border-slate-200/60 text-slate-700'}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Project Modal with Slide Up Animation */}
      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
}
