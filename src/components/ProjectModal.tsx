'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, TrendingUp, Zap, CheckCircle2, ChevronDown, ChevronUp, ZoomIn, Download, Code2, Quote } from 'lucide-react';
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

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

const isVideoSrc = (src: string) => /\.(mp4|webm|mov)(\?.*)?$/i.test(src);

// 라이브러리 없이 최소 문법 하이라이팅 (C# / TS / JS / CSS)
const CODE_KEYWORDS =
  'public|private|protected|internal|static|readonly|abstract|override|virtual|sealed|partial|' +
  'void|bool|int|float|double|string|object|var|new|return|if|else|for|foreach|while|do|switch|case|break|continue|' +
  'class|struct|enum|interface|namespace|using|const|let|function|import|from|export|default|extends|implements|' +
  'true|false|null|undefined|this|base|async|await|yield|in|is|as|typeof|out|ref|get|set|IEnumerator|useState|useEffect|useMemo|useRef';

const CODE_TOKEN_RE = new RegExp(
  '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' + // 1 comment
    "|(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)" + // 2 string
    '|(\\b\\d[\\d._]*f?\\b)' + // 3 number
    '|\\b(' + CODE_KEYWORDS + ')\\b' + // 4 keyword
    '|([A-Z][A-Za-z0-9_]*)', // 5 Type / Component
  'g'
);

function highlightCode(code: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  CODE_TOKEN_RE.lastIndex = 0;
  let k = 0;
  while ((m = CODE_TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1]
      ? 'text-slate-500 italic'
      : m[2]
        ? 'text-emerald-300'
        : m[3]
          ? 'text-orange-300'
          : m[4]
            ? 'text-violet-300'
            : 'text-sky-300';
    out.push(
      <span key={k++} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

// 게임 플레이 영상 — Web Audio GainNode로 원본보다 소리를 키워서 재생
function GameplayVideo({ src, gain = 3.0, className }: { src: string; gain?: number; className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const wiredRef = useRef(false);

  useEffect(() => {
    return () => {
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  const boost = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!wiredRef.current) {
      try {
        const Ctx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        const ctx = new Ctx();
        const gainNode = ctx.createGain();
        gainNode.gain.value = gain;
        ctx.createMediaElementSource(el).connect(gainNode).connect(ctx.destination);
        ctxRef.current = ctx;
        wiredRef.current = true;
      } catch {
        /* 실패 시 브라우저 기본 음량으로 재생 */
      }
    }
    ctxRef.current?.resume().catch(() => {});
  };

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      playsInline
      preload="metadata"
      onPlay={boost}
      className={className ?? 'w-full h-auto block'}
    />
  );
}

// 갤러리 미디어 — .mp4/.webm 이면 소리 키운 비디오 플레이어, 아니면 클릭 확대 이미지
function GalleryMedia({ src, alt, className, gain }: { src: string; alt: string; className?: string; gain?: number }) {
  if (isVideoSrc(src)) {
    return <GameplayVideo src={src} gain={gain} className={`${className ?? 'w-full h-auto block'} bg-black`} />;
  }
  return <ZoomableImage src={src} alt={alt} className={className} />;
}

// 썸네일을 클릭하면 전체 화면 라이트박스로 원본 크기를 볼 수 있는 이미지
function ZoomableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group/zoom relative block w-full cursor-zoom-in"
        aria-label={`${alt} 크게 보기`}
      >
        <img src={src} alt={alt} className={className} />
        <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-slate-900/70 px-2 py-1 text-[11px] font-bold text-white opacity-0 backdrop-blur-sm transition-opacity group-hover/zoom:opacity-100">
          <ZoomIn size={12} /> 확대
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/90 p-4 sm:p-10 cursor-zoom-out backdrop-blur-sm"
          >
            <img
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setOpen(false); }}
              className="absolute top-5 right-5 rounded-full bg-white/10 p-3 text-white backdrop-blur-xl transition-colors hover:bg-white/20"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function TroubleshootingCard({ study, idx }: { study: any; idx: number }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const galleryImages: { src: string; caption?: string; gain?: number }[] = study.images ?? [];
  const isBeforeAfter = Boolean(study.beforeImageUrl || study.afterImageUrl);
  const hasImages = Boolean(isBeforeAfter || galleryImages.length || study.imageUrl);

  return (
    <div className="border-t border-[#111]/10 py-6 md:py-7">
      <div 
        className="flex items-center justify-between gap-4 cursor-pointer group"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1">
          <span className="shrink-0 pt-2 text-xs font-medium tracking-[0.3em] text-[#8a8780]">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <h4 className={`text-lg md:text-xl font-normal text-[#111] tracking-wide leading-snug break-keep ${SERIF}`}>
            {study.title}
          </h4>
        </div>
        <button className="shrink-0 w-9 h-9 flex items-center justify-center text-[#8a8780] group-hover:text-[#111] transition-colors">
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
            {hasImages ? (
              /* 이미지 중심 레이아웃: 큰 사진들 먼저 → 상황·해결은 맨 밑에 */
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 px-1 md:px-3">
                  <Zap size={14} strokeWidth={1.5} className="text-[#8a8780]" />
                  <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                    {isBeforeAfter ? '변경 전/후 비교 (AS-IS vs TO-BE)' : '증명 자료 (Evidence)'}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs font-medium text-[#8a8780]">
                    <ZoomIn size={13} /> 클릭하면 확대
                  </span>
                </div>

                {study.beforeImageUrl && (
                  <figure className="space-y-2">
                    <figcaption className="text-xs font-medium tracking-[0.15em] text-[#8a8780]">
                      [변경 전] AS-IS
                    </figcaption>
                    <div className="overflow-hidden border border-[#111]/10 bg-[#f4f2ee]">
                      <ZoomableImage src={study.beforeImageUrl} alt="변경 전" className="w-full h-auto block" />
                    </div>
                  </figure>
                )}

                {study.afterImageUrl && (
                  <figure className="space-y-2">
                    <figcaption className="text-xs font-medium tracking-[0.15em] text-[#111]">
                      [변경 후] TO-BE
                    </figcaption>
                    <div className="overflow-hidden border border-[#111]/10 bg-[#f4f2ee]">
                      <ZoomableImage src={study.afterImageUrl} alt="변경 후" className="w-full h-auto block" />
                    </div>
                  </figure>
                )}

                {galleryImages.map((img, i) => (
                  <figure key={i} className="space-y-2">
                    {img.caption && (
                      <figcaption className="text-xs font-medium tracking-[0.15em] text-[#8a8780]">
                        {img.caption}
                      </figcaption>
                    )}
                    <div className="overflow-hidden border border-[#111]/10 bg-[#f4f2ee]">
                      <GalleryMedia src={img.src} alt={img.caption ?? `${study.title} ${i + 1}`} gain={img.gain} className="w-full h-auto block" />
                    </div>
                  </figure>
                ))}

                {study.imageUrl && !study.beforeImageUrl && !study.afterImageUrl && galleryImages.length === 0 && (
                  <div className="overflow-hidden border border-[#111]/10 bg-[#f4f2ee]">
                    <GalleryMedia src={study.imageUrl} alt={study.title} className="w-full h-auto block" />
                  </div>
                )}

                {/* 상황·원인 / 해결 — 사진 아래, 나눠서 표시 */}
                <div className="flex flex-col gap-3 pt-5 border-t border-[#111]/10">
                  <div className="border-l border-[#111]/20 pl-5 py-1">
                    <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                      상황·원인 (Problem)
                    </span>
                    <p className="mt-2 text-sm md:text-[15px] leading-loose text-[#3a3834] break-keep">
                      {study.problem}
                    </p>
                  </div>
                  <div className="border-l border-[#111]/50 pl-5 py-1">
                    <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                      해결 (Solution)
                    </span>
                    <p className="mt-2 text-sm md:text-[15px] leading-loose text-[#3a3834] break-keep">
                      {study.solution}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* 텍스트 전용 레이아웃: 상황·원인 / 해결 카드 */
              <div className="flex flex-col gap-3 pt-2">
                <div className="border-l border-[#111]/20 pl-5 py-1">
                  <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                    상황·원인 (Problem)
                  </span>
                  <p className="mt-2 text-sm md:text-[15px] leading-loose text-[#3a3834] break-keep">
                    {study.problem}
                  </p>
                </div>
                <div className="border-l border-[#111]/50 pl-5 py-1">
                  <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                    해결 (Solution)
                  </span>
                  <p className="mt-2 text-sm md:text-[15px] leading-loose text-[#3a3834] break-keep">
                    {study.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {study.codeSnippet && (
              <div className="pt-6 border-t border-[#111]/10 mt-2">
                <div className="flex items-center gap-2 px-1 mb-3">
                  <Code2 size={14} strokeWidth={1.5} className="text-[#8a8780]" />
                  <span className="text-xs font-medium tracking-[0.2em] text-[#8a8780]">
                    {study.codeSnippet.before ? '코드 — 수정 전 / 후' : '코드'}
                  </span>
                  <span className="ml-auto text-xs font-mono text-[#8a8780]">
                    {study.codeSnippet.filename}
                  </span>
                </div>

                {study.codeSnippet.before && (
                  <div className="rounded-sm overflow-hidden border border-rose-900/60 mb-3">
                    <div className="bg-rose-950/60 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-rose-300 border-b border-rose-900/50">
                      Before
                    </div>
                    <pre className="bg-slate-950 text-slate-300 text-[13px] sm:text-sm leading-[1.7] p-4 sm:p-5 overflow-x-auto opacity-90">
                      <code className="font-mono whitespace-pre">{highlightCode(study.codeSnippet.before)}</code>
                    </pre>
                  </div>
                )}

                <div className="rounded-sm overflow-hidden border border-emerald-900/60">
                  <div className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider border-b ${study.codeSnippet.before ? 'bg-emerald-950/60 text-emerald-300 border-emerald-900/50' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
                    {study.codeSnippet.before ? 'After' : study.codeSnippet.language}
                  </div>
                  <pre className="bg-slate-950 text-slate-300 text-[13px] sm:text-sm leading-[1.7] p-4 sm:p-5 overflow-x-auto">
                    <code className="font-mono whitespace-pre">{highlightCode(study.codeSnippet.code)}</code>
                  </pre>
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
                  className="inline-flex items-center gap-2 border-b border-[#111]/30 pb-0.5 text-xs font-medium tracking-[0.1em] text-[#111] transition-colors hover:border-[#111] group"
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

  const eyebrow = 'text-[11px] font-medium uppercase tracking-[0.35em] text-[#8a8780]';
  const actionClass = 'group inline-flex items-center gap-2 border border-[#111] px-8 py-3 text-sm font-medium tracking-[0.08em] transition-colors';

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
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex h-screen w-screen flex-col overflow-hidden bg-white"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="닫기"
              className="absolute right-5 top-5 z-50 flex h-10 w-10 items-center justify-center border border-[#111]/15 bg-white/90 text-[#111] transition-colors hover:border-[#111]"
            >
              <X size={18} strokeWidth={1.5} />
            </button>

            {/* Scrollable Content */}
            <div className="custom-scrollbar flex-1 overflow-y-auto bg-white pb-24">
              {/* Hero Image */}
              <div className="relative flex h-[34vh] w-full items-center justify-center overflow-hidden bg-[#f4f2ee] md:h-[50vh]">
                {project.image ? (
                  <motion.div initial={{ scale: 1.04 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} className="absolute inset-0">
                    <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 1024px, 100vw" quality={80} className="object-cover" />
                  </motion.div>
                ) : (
                  <h2 className={`text-3xl font-light uppercase tracking-[0.3em] text-[#111]/15 ${SERIF}`}>{project.title}</h2>
                )}
              </div>

              {/* Central Content Area */}
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-6xl px-6 pt-14 md:px-[6vw]">
                {/* Title & Metadata */}
                <motion.div variants={itemVariants} className="mb-16">
                  <p className={`mb-5 flex items-baseline gap-4 ${eyebrow}`}>
                    <span>{project.type}</span>
                    {project.wip && <span>개발중</span>}
                    {!project.wip && project.award && <span className="text-[#a8742a]">{project.award}</span>}
                  </p>
                  <h1 className={`mb-8 break-keep text-4xl font-light leading-[1.3] tracking-wide md:text-6xl ${SERIF}`}>{project.title}</h1>

                  {project.description && (
                    <p className="mb-10 max-w-2xl whitespace-pre-line break-keep text-base leading-loose text-[#3a3834] md:text-lg">{project.description}</p>
                  )}

                  {/* Specs */}
                  <div className="mb-8 flex flex-wrap gap-x-14 gap-y-6 border-t border-[#111]/10 pt-8">
                    {project.role && (
                      <div>
                        <p className={`mb-1 ${eyebrow}`}>Role</p>
                        <p className="text-sm font-medium">{project.role}</p>
                      </div>
                    )}
                    <div>
                      <p className={`mb-1 ${eyebrow}`}>Period</p>
                      <p className="text-sm font-medium">{project.period}</p>
                    </div>
                    {project.teamSize && (
                      <div>
                        <p className={`mb-1 ${eyebrow}`}>Team</p>
                        <p className="text-sm font-medium">{project.teamSize}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed tracking-wide text-[#8a8780]">{project.tech.join(' · ')}</p>
                </motion.div>

                {/* 프로젝트 상세 소개 */}
                {project.detailedDescription && (
                  <motion.div variants={itemVariants} className="mb-16 border-t border-[#111]/10 pt-10">
                    <p className={`mb-6 ${eyebrow}`}>Overview</p>
                    <ul className="space-y-3.5 break-keep text-[15px] leading-[1.9] text-[#3a3834]">
                      {project.detailedDescription.split('. ').map((sentence, idx, arr) => {
                        if (!sentence.trim()) return null;
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-[0.9rem] h-px w-3 shrink-0 bg-[#111]/40" />
                            <span>
                              {sentence}
                              {idx !== arr.length - 1 && !sentence.endsWith('.') ? '.' : ''}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}

                {/* Gameplay Video */}
                {project.video && (
                  <motion.div variants={itemVariants} className="mb-16 border-t border-[#111]/10 pt-10">
                    <p className={`mb-5 ${eyebrow}`}>Gameplay</p>
                    <div className="overflow-hidden border border-[#111]/10 bg-black">
                      <GameplayVideo src={project.video} />
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="w-full space-y-16">
                  {/* Problem → Solution → Result */}
                  {(project.challenge || project.solution || project.keyResult) && (
                    <div className="border-t border-[#111]/10 pt-10">
                      <p className={`mb-8 ${eyebrow}`}>Challenge &amp; Outcome</p>
                      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                        {project.challenge && (
                          <div>
                            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#8a8780]">Problem · 도전 과제</p>
                            <ul className="space-y-3">
                              {project.challenge.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 break-keep text-sm leading-loose text-[#3a3834]">
                                  <span className="mt-[0.85rem] h-px w-3 shrink-0 bg-[#111]/40" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {project.solution && (
                          <div>
                            <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#8a8780]">Solution · 해결 방안</p>
                            <ul className="space-y-3">
                              {project.solution.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 break-keep text-sm leading-loose text-[#3a3834]">
                                  <span className="mt-[0.85rem] h-px w-3 shrink-0 bg-[#111]/40" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {project.keyResult && project.keyResult.length > 0 && (
                        <div className="mt-10 border border-[#111]/15 p-7 md:p-8">
                          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#8a8780]">Key Outcome · 핵심 성과</p>
                          <ul className="space-y-2.5">
                            {project.keyResult.map((result: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={16} strokeWidth={1.5} className="mt-1 shrink-0 text-[#111]" />
                                <span className="break-keep text-[15px] leading-relaxed text-[#111]">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Real Deployment Feedback */}
                  {project.deploymentFeedback && project.deploymentFeedback.length > 0 && (
                    <div className="border-t border-[#111]/10 pt-10">
                      <p className={`mb-3 ${eyebrow}`}>Real User Feedback</p>
                      {project.deploymentContext && <p className="mb-8 break-keep text-sm leading-loose text-[#6b6862]">{project.deploymentContext}</p>}
                      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        {project.deploymentFeedback.map((fb, idx) => (
                          <div key={idx} className="border-l border-[#111]/20 pl-5">
                            <Quote size={14} strokeWidth={1.5} className="mb-2 text-[#8a8780]" />
                            <p className="break-keep text-sm leading-loose text-[#3a3834]">{fb.comment}</p>
                            <p className="mt-3 text-xs tracking-wide text-[#8a8780]">{fb.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Troubleshooting & Code */}
                  {project.troubleshooting && project.troubleshooting.length > 0 && (
                    <div className="border-t border-[#111]/10 pt-10">
                      <p className={`mb-4 ${eyebrow}`}>Troubleshooting &amp; Implementation</p>
                      <div>
                        {project.troubleshooting.map((study, idx) => (
                          <TroubleshootingCard key={idx} study={study} idx={idx} />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Action Buttons */}
                {(project.github || project.downloadUrl) && (
                  <motion.div variants={itemVariants} className="mt-16 flex flex-wrap gap-4">
                    {project.downloadUrl && (
                      <a href={project.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${actionClass} bg-[#111] text-white hover:bg-white hover:text-[#111]`}>
                        <Download size={16} strokeWidth={1.5} />
                        다운로드해서 게임 해보기
                        <ArrowUpRight size={15} className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${actionClass} ${project.downloadUrl ? 'bg-white text-[#111] hover:bg-[#111] hover:text-white' : 'bg-[#111] text-white hover:bg-white hover:text-[#111]'}`}
                      >
                        <Github size={16} />
                        GitHub Repository
                        <ArrowUpRight size={15} className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
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
