'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { goSection } from '@/lib/section';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { onIntent, warmAllProjects } from '@/lib/foresight';

const navItems = [
  { name: '소개', href: '#intro' },
  { name: '프로젝트', href: '#projects' },
  { name: '경력 및 학력', href: '#experience' },
];

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

const goTo = goSection;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 메뉴로 마우스가 다가오면, 이동할 섹션에서 곧 필요한 것을 미리 받아 둔다
    const offs = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-target]')).map((el) =>
      onIntent(el, `nav:${el.dataset.navTarget}`, () => {
        if (el.dataset.navTarget === '#projects') warmAllProjects();
      }, 30)
    );
    return () => offs.forEach((off) => off());
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 transition-all duration-500 print:hidden',
        isScrolled ? 'bg-white/85 py-4 backdrop-blur-md border-b border-[#111]/10' : 'bg-transparent py-7 border-b border-transparent'
      )}
    >
      <div className="flex w-full items-center justify-between">
        {/* 로고: 강아지 + kkaemong */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="맨 위로"
          className="group flex items-center gap-3 text-[#111]"
        >
          <svg viewBox="0 0 48 48" className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6 sm:h-10 sm:w-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            {/* 길게 늘어진 귀털 */}
            <path d="M12 20 C5 24 5 38 9 44 L12 40 L15 45 L18 38 C20 32 19 26 17 21 Z" fill="#fff" />
            <path d="M36 20 C43 24 43 38 39 44 L36 40 L33 45 L30 38 C28 32 29 26 31 21 Z" fill="#fff" />
            {/* 얼굴 */}
            <circle cx="24" cy="24" r="12.5" fill="#fff" />
            {/* 윗머리 묶음과 리본 */}
            <path d="M22 12 C21 6 27 6 26 12" />
            <path d="M24 8 L19 5 L20 10 Z M24 8 L29 5 L28 10 Z" fill="currentColor" />
            {/* 눈, 코, 입 */}
            <circle cx="19" cy="22" r="1.7" fill="currentColor" stroke="none" />
            <circle cx="29" cy="22" r="1.7" fill="currentColor" stroke="none" />
            <ellipse cx="24" cy="28" rx="4.6" ry="3.4" fill="#fff" />
            <circle cx="24" cy="26.8" r="1.7" fill="currentColor" stroke="none" />
            <path d="M22 30 Q24 32 26 30" />
          </svg>
          <span className="text-lg font-medium tracking-[0.12em] sm:text-xl">kkaemong</span>
        </button>

        {/* 데스크톱 메뉴 */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.name}
              type="button"
              data-nav-target={item.href}
              onClick={() => goTo(item.href)}
              className="group relative text-[13px] font-medium tracking-[0.12em] text-[#6b6862] transition-colors hover:text-[#111]"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#111] transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
          <Link href="/simple" className="border-b border-[#111]/30 pb-0.5 text-[13px] font-medium tracking-[0.12em] text-[#111] transition-colors hover:border-[#111]">
            일반 버전 ↗
          </Link>
          <ThemeToggle />
        </div>

        {/* 모바일: 나이트 모드 + 메뉴 버튼 */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-[#111]" aria-label="메뉴">
            {mobileMenuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-full overflow-hidden border-b border-[#111]/10 bg-white md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    goTo(item.href);
                  }}
                  className={`text-left text-2xl font-light tracking-wide text-[#111] ${SERIF}`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
