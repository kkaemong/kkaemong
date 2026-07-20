'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import PrintLayout from "@/components/PrintLayout";
import LandingModeSelector from "@/components/LandingModeSelector";

type PortfolioMode = 'SELECT' | 'STANDARD';

export default function Home() {
  const [portfolioMode, setPortfolioMode] = useState<PortfolioMode>('SELECT');

  // Browser History & Chrome Back/Forward Button Navigation Sync
  useEffect(() => {
    const checkHashMode = () => {
      const hash = window.location.hash;
      if (hash === '#resume' || hash === '#standard') {
        setPortfolioMode('STANDARD');
      } else if (hash === '' || hash === '#') {
        setPortfolioMode('SELECT');
      }
      // Section anchors like #about, #projects, #experience → keep current mode
    };

    checkHashMode();

    const handlePopState = () => {
      checkHashMode();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const changeMode = (mode: PortfolioMode) => {
    setPortfolioMode(mode);
    if (mode === 'STANDARD') {
      window.history.pushState({ mode: 'STANDARD' }, '', '#resume');
    } else {
      window.history.pushState({ mode: 'SELECT' }, '', window.location.pathname);
    }
  };

  // Full Screen Entrance Landing Selector
  if (portfolioMode === 'SELECT') {
    return <LandingModeSelector onSelectMode={() => changeMode('STANDARD')} />;
  }

  // Full Screen Standard Portfolio Document Mode
  return (
    <>
      <main className="min-h-screen print:hidden">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Footer />
      </main>
      
      {/* Print Only Layout */}
      <PrintLayout />
    </>
  );
}
