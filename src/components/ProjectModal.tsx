'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, TrendingUp, Zap, CheckCircle2, ChevronDown, ChevronUp, ZoomIn, Download, Code2 } from 'lucide-react';
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
              className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
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
            {hasImages ? (
              /* 이미지 중심 레이아웃: 큰 사진들 먼저 → 상황·해결은 맨 밑에 */
              <div className="space-y-6 pt-2">
                <div className="flex items-center gap-2 px-1 md:px-3">
                  <Zap size={15} className="text-indigo-500 fill-indigo-500" />
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    {isBeforeAfter ? '변경 전/후 비교 (AS-IS vs TO-BE)' : '증명 자료 (Evidence)'}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-slate-400">
                    <ZoomIn size={13} /> 클릭하면 확대
                  </span>
                </div>

                {study.beforeImageUrl && (
                  <figure className="space-y-2">
                    <figcaption className="inline-block text-sm font-bold text-rose-500 bg-rose-50 py-1.5 px-4 rounded-lg border border-rose-100">
                      [변경 전] AS-IS
                    </figcaption>
                    <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50">
                      <ZoomableImage src={study.beforeImageUrl} alt="변경 전" className="w-full h-auto block" />
                    </div>
                  </figure>
                )}

                {study.afterImageUrl && (
                  <figure className="space-y-2">
                    <figcaption className="inline-block text-sm font-bold text-emerald-500 bg-emerald-50 py-1.5 px-4 rounded-lg border border-emerald-100">
                      [변경 후] TO-BE
                    </figcaption>
                    <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50">
                      <ZoomableImage src={study.afterImageUrl} alt="변경 후" className="w-full h-auto block" />
                    </div>
                  </figure>
                )}

                {galleryImages.map((img, i) => (
                  <figure key={i} className="space-y-2">
                    {img.caption && (
                      <figcaption className="inline-block text-sm font-bold text-slate-700 bg-slate-100 py-1.5 px-4 rounded-lg border border-slate-200">
                        {img.caption}
                      </figcaption>
                    )}
                    <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50">
                      <GalleryMedia src={img.src} alt={img.caption ?? `${study.title} ${i + 1}`} gain={img.gain} className="w-full h-auto block" />
                    </div>
                  </figure>
                ))}

                {study.imageUrl && !study.beforeImageUrl && !study.afterImageUrl && galleryImages.length === 0 && (
                  <div className="rounded-2xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-50">
                    <GalleryMedia src={study.imageUrl} alt={study.title} className="w-full h-auto block" />
                  </div>
                )}

                {/* 상황·원인 / 해결 — 사진 아래, 나눠서 표시 */}
                <div className="flex flex-col gap-3 pt-5 border-t border-slate-100">
                  <div className="rounded-xl bg-rose-50/40 border border-rose-100/50 px-5 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                      상황·원인 (Problem)
                    </span>
                    <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 break-keep">
                      {study.problem}
                    </p>
                  </div>
                  <div className="rounded-xl bg-blue-50/40 border border-blue-100/50 px-5 py-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                      해결 (Solution)
                    </span>
                    <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 break-keep">
                      {study.solution}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* 텍스트 전용 레이아웃: 상황·원인 / 해결 카드 */
              <div className="flex flex-col gap-3 pt-2">
                <div className="rounded-xl bg-rose-50/40 border border-rose-100/50 px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
                    상황·원인 (Problem)
                  </span>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 break-keep">
                    {study.problem}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50/40 border border-blue-100/50 px-5 py-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
                    해결 (Solution)
                  </span>
                  <p className="mt-2 text-sm md:text-[15px] leading-relaxed text-slate-600 break-keep">
                    {study.solution}
                  </p>
                </div>
              </div>
            )}

            {/* Code Snippet */}
            {study.codeSnippet && (
              <div className="pt-6 border-t border-slate-100 mt-2">
                <div className="flex items-center gap-2 px-1 mb-3">
                  <Code2 size={14} className="text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {study.codeSnippet.before ? '코드 — 수정 전 / 후' : '코드'}
                  </span>
                  <span className="ml-auto text-xs font-mono font-semibold text-slate-500">
                    {study.codeSnippet.filename}
                  </span>
                </div>

                {study.codeSnippet.before && (
                  <div className="rounded-2xl overflow-hidden border border-rose-900/60 shadow-lg mb-3">
                    <div className="bg-rose-950/60 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-rose-300 border-b border-rose-900/50">
                      Before
                    </div>
                    <pre className="bg-slate-950 text-slate-300 text-[13px] sm:text-sm leading-[1.7] p-4 sm:p-5 overflow-x-auto opacity-90">
                      <code className="font-mono whitespace-pre">{highlightCode(study.codeSnippet.before)}</code>
                    </pre>
                  </div>
                )}

                <div className="rounded-2xl overflow-hidden border border-emerald-900/60 shadow-lg">
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
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[90vw] md:max-w-5xl h-[95vh] md:h-[90vh] bg-[#FAF9F6] rounded-t-[2.5rem] md:rounded-[3rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
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
                  {project.wip && (
                    <span className="inline-block ml-2 px-4 py-1.5 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                      🚧 개발중
                    </span>
                  )}
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

                {/* Gameplay Video */}
                {project.video && (
                  <motion.div variants={itemVariants} className="mb-16 max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1.5 h-4 bg-slate-900 rounded-full" />
                      <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">게임 플레이 영상</h4>
                    </div>
                    <div className="rounded-[1.5rem] overflow-hidden border border-slate-200/80 shadow-lg bg-black">
                      <GameplayVideo src={project.video} />
                    </div>
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
                    <div className="pt-8 space-y-8 md:-mx-10 lg:-mx-14">
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

                </motion.div>

                {/* Action Buttons — GitHub / 다운로드 플레이 */}
                {(project.github || project.downloadUrl) && (
                  <motion.div variants={itemVariants} className="mt-16 flex flex-wrap justify-center gap-4">
                    {project.downloadUrl && (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-black shadow-2xl shadow-slate-900/20 cursor-pointer"
                      >
                        <Download size={24} className="group-hover:translate-y-0.5 transition-transform duration-300" />
                        <span className="font-bold text-lg tracking-wide">다운로드해서 게임 해보기</span>
                        <ArrowUpRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center gap-3 px-10 py-5 rounded-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                          project.downloadUrl
                            ? 'bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-50'
                            : 'bg-slate-900 text-white hover:bg-black shadow-2xl shadow-slate-900/20'
                        }`}
                      >
                        <Github size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-bold text-lg tracking-wide">GitHub Repository</span>
                        <ArrowUpRight size={20} className="opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
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
