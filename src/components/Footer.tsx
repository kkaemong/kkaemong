'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink, Heart } from 'lucide-react';
import { GithubIcon as Github } from './GithubIcon';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  const { contact } = portfolioData;

  return (
    <footer id="contact" className="py-16 px-4 bg-transparent print:hidden">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            저와 함께 작업하고 싶거나, 더 많은 정보를 원하신다면 언제든지 연락주세요. <br className="hidden md:block" />
            새로운 기회를 기다리고 있습니다!
          </p>

          <div className="flex justify-center">
            <a
              href={`mailto:${contact.email}`}
              className="group flex items-center gap-3 px-8 py-3 rounded-2xl border border-white/5 bg-white/5 text-accent font-medium transition-all duration-500 hover:bg-accent hover:border-accent/30 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:-translate-y-1 active:scale-95"
            >
              <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                <Mail size={16} />
              </div>
              <span className="text-lg group-hover:text-primary font-bold transition-colors duration-500">이메일 보내기</span>
            </a>
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-widest text-slate-600 font-display">
          <p>© 2026 Jin Junyoung. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
