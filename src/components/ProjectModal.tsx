'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, TrendingUp, Zap, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { type Project } from '@/data/portfolio';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

function CodeBlock({ code, filename, language }: { code: string; filename: string; language: string }) {
  const highlightCode = (code: string) => {
    if (!code) return '';
    const lines = code.split('\n');
    return lines.map(line => {
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      
      // 만약 줄이 주석으로 시작하면 다른 하이라이팅 무시하고 전체를 초록색으로 처리
      if (escaped.trim().startsWith('//') || escaped.trim().startsWith('#')) {
        return `<span class="text-emerald-500 font-normal">${escaped}</span>`;
      }

      // 키워드 하이라이팅 (HTML 태그와의 충돌을 막기 위해 임시 마커 사용)
      const keywords = [
        'public', 'private', 'protected', 'class', 'interface', 'struct', 'void', 'using', 'namespace',
        'const', 'let', 'var', 'function', 'return', 'import', 'from', 'export', 'default', 'async', 'await',
        'if', 'else', 'for', 'while', 'new', 'static', 'get', 'set', 'require', 'module', 'exports', 'def', 'as'
      ];
      
      keywords.forEach(kw => {
        const reg = new RegExp(`\\b(${kw})\\b`, 'g');
        escaped = escaped.replace(reg, `__KW_${kw}__`);
      });

      // 마커를 실제 HTML span 태그로 일괄 치환
      escaped = escaped.replace(/__KW_([a-zA-Z0-9_]+)__/g, '<span class="text-rose-400 font-semibold">$1</span>');

      return escaped;
    }).join('\n');
  };

  return (
    <div className="w-full bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl font-mono my-4 text-left">
      {/* Tab Header Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-slate-900/60 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-semibold text-slate-400 tracking-wide">{filename}</span>
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          {language}
        </span>
      </div>

      {/* Code Editor Body */}
      <pre className="p-5 overflow-x-auto text-[13px] leading-relaxed text-slate-300 custom-scrollbar select-text max-h-[450px]">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
    </div>
  );
}

function TroubleshootingCard({ study, idx }: { study: any; idx: number }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-[0_15px_40px_rgba(15,23,42,0.02)] p-6 md:p-8 hover:shadow-[0_20px_50px_rgba(15,23,42,0.04)] transition-all duration-300">
      <div 
        className="flex items-center justify-between gap-4 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1">
          <span className="shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center font-display shadow-sm mt-0.5">
            {idx + 1}
          </span>
          <h4 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors pt-1">
            {study.title}
          </h4>
        </div>
        <button className="shrink-0 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden space-y-6"
          >
            {/* Problem vs Solution Split Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-rose-50/20 border border-rose-100/40 rounded-[1.5rem] p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-rose-400 rounded-full" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500">
                    상황 및 원인 (Problem)
                  </span>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-700 font-semibold break-keep">
                  {study.problem}
                </p>
              </div>

              <div className="bg-blue-50/20 border border-blue-100/40 rounded-[1.5rem] p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-4 bg-blue-400 rounded-full" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-500">
                    해결 과정 (Solution)
                  </span>
                </div>
                <p className="text-[13.5px] leading-relaxed text-slate-700 font-semibold break-keep">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Code Snippet Box */}
            {study.codeSnippet && (
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 px-1">
                  <Zap size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    핵심 구현 코드 (Core Implementation)
                  </span>
                </div>
                <CodeBlock
                  code={study.codeSnippet.code}
                  filename={study.codeSnippet.filename}
                  language={study.codeSnippet.language}
                />
              </div>
            )}

            {/* Before/After Image Set */}
            {(study.beforeImageUrl || study.afterImageUrl) && (
              <div className="space-y-3 pt-6 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-2 px-1">
                  <Zap size={14} className="text-indigo-500 fill-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    코드 최적화 전/후 비교 (AS-IS vs TO-BE)
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {study.beforeImageUrl && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-rose-500 text-center bg-rose-50 py-1.5 rounded-lg border border-rose-100">
                        [변경 전] AS-IS
                      </div>
                      <div className="rounded-[1.25rem] overflow-hidden border border-slate-200/80 shadow-sm bg-slate-50 w-full flex items-center justify-center p-2">
                        <img src={study.beforeImageUrl} alt="Before" className="w-full h-auto block rounded-xl" />
                      </div>
                    </div>
                  )}
                  {study.afterImageUrl && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-emerald-500 text-center bg-emerald-50 py-1.5 rounded-lg border border-emerald-100">
                        [변경 후] TO-BE
                      </div>
                      <div className="rounded-[1.25rem] overflow-hidden border border-slate-200/80 shadow-sm bg-slate-50 w-full flex items-center justify-center p-2">
                        <img src={study.afterImageUrl} alt="After" className="w-full h-auto block rounded-xl" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Image Proof Box */}
            {study.imageUrl && (
              <div className="space-y-3 pt-6 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-2 px-1">
                  <Zap size={14} className="text-indigo-500 fill-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    증명 자료 및 시연 결과 (Evidence)
                  </span>
                </div>
                <div className="rounded-[1.25rem] overflow-hidden border border-slate-200/80 shadow-sm bg-slate-50 w-full">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            )}

            {/* Blog/PR Link Button */}
            {study.articleUrl && (
              <div className="flex justify-end pt-2">
                <a
                  href={study.articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300 rounded-xl text-xs font-bold transition-all duration-300 shadow-sm cursor-pointer group"
                >
                  <span>상세 분석 글 보기</span>
                  <ArrowUpRight size={14} className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectModal({ isOpen, onClose, project }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] cursor-default"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:max-w-5xl h-[95vh] md:h-[90vh] bg-white rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Close Button (Floating) */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-white/60 hover:bg-white/90 backdrop-blur-xl text-slate-800 rounded-full transition-all duration-300 shadow-sm cursor-pointer"
            >
              <X size={24} strokeWidth={2.5} />
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar pb-24">

              {/* Massive Hero Image */}
              <div className="relative w-full h-[30vh] md:h-[40vh] bg-[#f5f5f7] flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <motion.img
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                    <h2 className="text-4xl font-display font-bold text-slate-300 uppercase tracking-widest">{project.title}</h2>
                  </div>
                )}
                {/* Subtle bottom fade to blend into white */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Central Content Area */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-8 md:px-16 pt-12"
              >
                {/* Title & Metadata (Centered) */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                  <span className="inline-block px-4 py-1.5 bg-[#f5f5f7] text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    {project.type}
                  </span>
                  <h1 className="text-4xl md:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                    {project.title}
                  </h1>

                  {/* One-Liner Description */}
                  {project.description && (
                    <p className="text-xl md:text-2xl font-bold text-slate-800 break-keep whitespace-pre-line px-4 mb-10 leading-snug">
                      {project.description}
                    </p>
                  )}

                  {/* Clean Horizontal Specs */}
                  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-slate-500 font-medium text-base mb-8">
                    {project.role && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Role</span>
                        <span className="text-slate-900 font-semibold">{project.role}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Period</span>
                      <span className="text-slate-900 font-semibold">{project.period}</span>
                    </div>
                    {project.teamSize && (
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Team</span>
                        <span className="text-slate-900 font-semibold">{project.teamSize}</span>
                      </div>
                    )}
                  </div>

                  {/* Elevating Tech Stack higher up under specifications */}
                  <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto pt-8 border-t border-slate-100/80">
                    {project.tech.map((t: string) => (
                      <span key={t} className="px-4 py-2 bg-[#f5f5f7] rounded-full text-xs font-bold text-slate-700 tracking-wide">
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>



                {/* Service Detail Introduction (비즈니스/서비스 가치) */}
                {project.detailedDescription && (
                  <motion.div
                    variants={itemVariants}
                    className="mb-16 bg-slate-50/60 border border-slate-100 rounded-[2rem] p-8 max-w-4xl mx-auto"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-1.5 h-4 bg-slate-900 rounded-full" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">프로젝트 상세 소개</h4>
                    </div>
                    <ul className="text-slate-700 text-[15px] leading-[1.8] font-medium break-keep space-y-3.5 pl-1">
                      {project.detailedDescription.split('. ').map((sentence, idx, arr) => {
                        if (!sentence.trim()) return null;
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-slate-400 mt-2.5" />
                            <span>
                              {sentence}{idx !== arr.length - 1 && !sentence.endsWith('.') ? '.' : ''}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}

                {/* Tech & Highlights - Vertical Flow */}
                <motion.div variants={itemVariants} className="space-y-12 max-w-4xl mx-auto w-full">

                  {/* PSR Section (Problem → Solution → Result) */}
                  {(project.challenge || project.solution || project.keyResult) && (
                    <div className="pb-8 border-b border-slate-100">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">
                        Challenge &amp; Outcome
                      </h3>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Problem Card */}
                          {project.challenge && (
                            <div className="bg-slate-50/80 hover:bg-slate-50 rounded-[1.5rem] p-6 border border-slate-100/80 transition-colors flex flex-col justify-between">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-6 bg-orange-400 rounded-full" />
                                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Problem (도전 과제)</span>
                                </div>
                                <ul className="space-y-2.5">
                                  {project.challenge.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-[14px] leading-relaxed font-medium break-keep">
                                      <span className="shrink-0 text-orange-400 mt-2 w-1.5 h-1.5 rounded-full bg-orange-400" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Solution Card */}
                          {project.solution && (
                            <div className="bg-slate-50/80 hover:bg-slate-50 rounded-[1.5rem] p-6 border border-slate-100/80 transition-colors flex flex-col justify-between">
                              <div className="space-y-4">
                                <div className="flex items-center gap-2.5">
                                  <span className="w-1.5 h-6 bg-blue-400 rounded-full" />
                                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Solution (해결 방안)</span>
                                </div>
                                <ul className="space-y-2.5">
                                  {project.solution.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-slate-700 text-[14px] leading-relaxed font-medium break-keep">
                                      <span className="shrink-0 text-blue-400 mt-2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Result Spotlight Banner */}
                        {project.keyResult && project.keyResult.length > 0 && (
                          <div className="bg-gradient-to-r from-accent/[0.08] to-accent/[0.02] border border-accent/25 rounded-[1.5rem] p-7 md:p-8 flex flex-col md:flex-row md:items-start gap-5 shadow-[0_10px_30px_rgba(20,184,166,0.02)]">
                            <div className="shrink-0 w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center mt-1">
                              <CheckCircle2 size={24} className="text-accent" />
                            </div>
                            <div className="space-y-3 flex-1">
                              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Key Outcome (핵심 성과)</div>
                              <ul className="space-y-2">
                                {project.keyResult.map((result: string, idx: number) => (
                                  <li key={idx} className="flex gap-2.5 items-start">
                                    <span className="shrink-0 text-accent font-bold mt-0.5">✓</span>
                                    <span className="text-primary font-bold text-[15px] leading-relaxed break-keep">
                                      {result}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Deep-Dive Troubleshooting & Code Section */}
                  {project.troubleshooting && project.troubleshooting.length > 0 && (
                    <div className="pt-8 space-y-8">
                      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                        Technical Troubleshooting &amp; Implementation
                      </h3>

                      <div className="space-y-6">
                        {project.troubleshooting.map((study, idx) => (
                          <TroubleshootingCard key={idx} study={study} idx={idx} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What I Learned */}
                  {(project as any).learned && (project as any).learned.length > 0 && (
                    <div className="pt-8 border-t border-slate-100">
                      <div className="flex items-center gap-2 mb-6">
                        <span className="w-1.5 h-4 bg-accent rounded-full" />
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                          이 프로젝트에서 배운 것 (What I Learned)
                        </h3>
                      </div>
                      <ul className="space-y-4">
                        {(project as any).learned.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 text-slate-700 text-[15px] leading-relaxed font-medium break-keep">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-accent/10 text-accent font-bold text-xs flex items-center justify-center mt-0.5">
                              {idx + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </motion.div>

                {/* GitHub Pill Button */}
                {project.github && (
                  <motion.div variants={itemVariants} className="mt-16 flex justify-center">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-black shadow-2xl shadow-slate-900/20 cursor-pointer"
                    >
                      <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span className="font-bold text-lg tracking-wide">GitHub Repository</span>
                      <ArrowUpRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </a>
                  </motion.div>
                )}

              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
