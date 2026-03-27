'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '@/data/portfolio';
import { Lightbulb, TrendingUp, Zap } from 'lucide-react';

const icons = [Lightbulb, TrendingUp, Zap];

export default function About() {
  const { about } = portfolioData;

  return (
    <section id="about" className="bg-muted/50 py-24">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
            {about.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {about.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {about.points.map((point, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="p-8 rounded-2xl bg-white shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{point.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {point.content}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
