'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Camera, Briefcase, Heart } from 'lucide-react';
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
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's build something <br />
              <span className="text-accent underline decoration-white/20 underline-offset-8 italic">together.</span>
            </h2>
            <p className="text-primary-foreground/60 text-lg mb-8 max-w-md">
              {contact.message}
            </p>
            
            <div className="flex gap-4">
              <a href={`mailto:${contact.email}`} className="btn-primary bg-white text-primary hover:bg-white/90">
                <Mail size={18} className="mr-2" />
                Email Me
              </a>
              <a href="https://github.com/kkaemong" target="_blank" className="btn-outline border-white text-white hover:bg-white hover:text-primary">
                <Globe size={18} className="mr-2" />
                GitHub
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 glass-card border-white/10 rounded-3xl"
          >
             <h3 className="text-xl font-bold mb-6">Connect with me</h3>
             <div className="space-y-4">
                <div className="flex items-center gap-4 text-primary-foreground/80 hover:text-white transition-colors cursor-pointer">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Camera size={18} /></div>
                   <span>kkaemong_dev</span>
                </div>
                <div className="flex items-center gap-4 text-primary-foreground/80 hover:text-white transition-colors cursor-pointer">
                   <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Briefcase size={18} /></div>
                   <span>jin-junyoung</span>
                </div>
             </div>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-primary-foreground/40">
           <p>© 2026 Jin Junyoung. All rights reserved.</p>
           <p className="flex items-center gap-2">
             Built with <Heart size={14} className="text-red-400" /> using Next.js & Tailwind
           </p>
        </div>
      </div>
    </footer>
  );
}
