'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: '소개', href: '#about' },
  { name: '프로젝트', href: '#projects' },
  { name: '경력 및 학력', href: '#experience' },
];

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

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-8 py-3.5 print:hidden',
        isScrolled ? 'bg-[#FAF9F6]/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5' : 'bg-[#FAF9F6]/60 backdrop-blur-xs'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer flex items-center gap-2"
        >
          <img src="/decorations/star.png" alt="Star" className="w-5 h-auto opacity-80" />
          <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-wide">
            진준영 <span className="text-blue-600 font-extrabold">PORTFOLIO</span>
          </span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-3 text-sm">
          {navItems.map((item, i) => (
            <motion.button
              key={item.name}
              onClick={() => {
                const el = document.querySelector(item.href);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors px-2 py-1 cursor-pointer"
            >
              {item.name}
            </motion.button>
          ))}

          <motion.button
            onClick={() => window.print()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white hover:bg-slate-900 text-sm font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileDown size={15} />
            <span>CV Download</span>
          </motion.button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF9F6] border-b border-slate-200 absolute top-full left-0 right-0 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTimeout(() => window.print(), 300);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <FileDown size={18} />
                <span>CV Download</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
