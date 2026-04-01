'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Github, ExternalLink, Heart } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export default function Footer() {
  const { contact } = portfolioData;

  return (
    <footer id="contact" className="bg-primary text-white py-20 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-0" />
      
      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
             <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-accent" />
              <span className="text-accent text-sm font-display font-semibold uppercase tracking-wider">
                Contact
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
               함께 의미 있는 <br />
              <span className="text-accent underline decoration-white/20 underline-offset-8 italic">성장을 만들고 싶습니다.</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-8 max-w-md leading-relaxed">
              {contact.message}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${contact.email}`} className="btn-primary bg-white text-primary hover:bg-white/90">
                <Mail size={18} className="mr-2" />
                이메일 보내기
              </a>
              <a href="https://github.com/kkaemong" target="_blank" className="btn-outline border-white text-white hover:bg-white hover:text-primary transition-all duration-300">
                <Github size={18} className="mr-2" />
                GitHub 방문
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 glass-card border-white/10 rounded-3xl"
          >
             <h3 className="text-xl font-bold mb-8">연결 채널</h3>
             <div className="space-y-6">
                <a href={contact.blog} target="_blank" className="flex items-center gap-4 text-primary-foreground/80 hover:text-white transition-colors group">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors"><ExternalLink size={20} /></div>
                   <div>
                      <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Blog</div>
                      <div className="text-lg font-bold">Personal Velog</div>
                   </div>
                </a>
                <div className="flex items-center gap-4 text-primary-foreground/80 hover:text-white transition-colors group">
                   <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-accent transition-colors"><Mail size={20} /></div>
                   <div>
                      <div className="text-xs uppercase tracking-widest opacity-50 mb-1">Email</div>
                      <div className="text-lg font-bold">{contact.email}</div>
                   </div>
                </div>
             </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-primary-foreground/40 font-display">
           <p>© 2026 Jin Junyoung. All rights reserved.</p>
           <p className="flex items-center gap-2">
             사고는 <span className="text-white italic">유연하게</span>, 구조는 <span className="text-white italic">견고하게</span> <Heart size={14} className="text-accent animate-pulse" />
           </p>
        </div>
      </div>
    </footer>
  );
}
