import React from 'react';
import { portfolioData, Project } from '@/data/portfolio';

export default function PrintLayout() {
  const { about, projects, experience } = portfolioData;
  const certifications = (portfolioData as any).certifications || [];

  return (
    <div className="hidden print:block max-w-4xl mx-auto bg-white text-slate-900 font-sans p-8 space-y-12">
      {/* Header / Info */}
      <div className="border-b-2 border-slate-900 pb-6">
        <h1 className="text-4xl font-black tracking-tight mb-2">진준영</h1>
        <h2 className="text-xl font-bold text-slate-600 mb-6">Game Client Developer</h2>
        
        <div className="grid grid-cols-2 gap-y-2 text-sm text-slate-700">
          {about.personalInfo?.map((info) => (
            <div key={info.label} className="flex">
              <span className="font-bold w-20 shrink-0">{info.label}</span>
              <span>{info.value}</span>
            </div>
          ))}
          <div className="flex">
            <span className="font-bold w-20 shrink-0">GitHub</span>
            <span>github.com/kkaemong</span>
          </div>
        </div>
      </div>

      {/* About Summary */}
      <section>
        <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-4 pb-1 border-b border-slate-200">
          Profile
        </h3>
        <p className="text-sm leading-relaxed font-medium">
          {about.description}
        </p>
      </section>

      {/* Core Game Client Stack */}
      <section>
        <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-4 pb-1 border-b border-slate-200">
          Core Tech Stack
        </h3>
        <div className="space-y-2 text-sm text-slate-800 font-medium">
          <div><span className="font-bold text-slate-900">Game Client & Engine:</span> Unity, C#, FSM (Finite State Machine), Object Pooling, WebGL</div>
          <div><span className="font-bold text-slate-900">Web & Fullstack:</span> React, TypeScript, Vue.js, Python, Django, REST API</div>
          <div><span className="font-bold text-slate-900">Tools & Environment:</span> Git, GitHub, Rider, Visual Studio, Figma</div>
        </div>
      </section>

      {/* Projects */}
      <section>
        <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-6 pb-1 border-b border-slate-200">
          Projects
        </h3>
        <div className="space-y-8">
          {(projects as Project[]).map((project) => (
            <div key={project.id} className="break-inside-avoid shadow-none border-none p-0">
              <div className="flex justify-between items-baseline mb-2">
                <h4 className="text-xl font-bold">{project.title}</h4>
                <span className="text-sm font-bold text-slate-500">{project.period}</span>
              </div>
              <div className="text-sm font-bold text-blue-600 mb-2">
                {project.type} {project.role && ` | ${project.role}`}
              </div>
              <p className="text-sm font-medium mb-3">
                {project.description}
              </p>
              
              <div className="mb-3">
                <span className="text-xs font-bold text-slate-500">Tech: </span>
                <span className="text-xs text-slate-700">{project.tech.join(', ')}</span>
              </div>
              
              {project.keyResult && project.keyResult.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-slate-800">
                  {project.keyResult.map((result, i) => (
                    <li key={i} className="leading-snug">{result}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Experience & Education */}
      <section>
        <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-6 pb-1 border-b border-slate-200">
          Experience & Education
        </h3>
        <div className="space-y-4">
          {experience.map((exp) => (
            <div key={exp.id} className="break-inside-avoid">
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="text-base font-bold">{exp.title}</h4>
                <span className="text-sm text-slate-500 font-medium">{exp.period}</span>
              </div>
              <p className="text-sm text-slate-700">{exp.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications & Languages */}
      {certifications && certifications.length > 0 && (
        <section>
          <h3 className="text-lg font-black uppercase tracking-widest text-slate-400 mb-6 pb-1 border-b border-slate-200">
            Certifications & Languages
          </h3>
          <div className="space-y-4">
            {certifications.map((cert: any) => (
              <div key={cert.id} className="break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="text-base font-bold">{cert.title}</h4>
                  <span className="text-sm text-slate-500 font-medium">{cert.date}</span>
                </div>
                <p className="text-sm text-slate-700 font-bold mb-1">{cert.issuer}</p>
                {cert.description && <p className="text-xs text-slate-500">{cert.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
