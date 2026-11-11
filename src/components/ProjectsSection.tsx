import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types';
import { CaseStudyModal } from './CaseStudyModal';
import { Network, Wifi, Server, Activity, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { ScrollReveal } from './ScrollReveal';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'network':
        return <Wifi className="w-4 h-4" />;
      case 'server':
        return <Server className="w-4 h-4" />;
      case 'web':
        return <Activity className="w-4 h-4" />;
      default:
        return <Network className="w-4 h-4" />;
    }
  };

  return (
    <section id="proyek" className="py-16 sm:py-20 border-t-4 border-black bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-block px-3 py-1 bg-sky-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
                03 // SHOWCASE PROYEK FLAGSHIP
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Koleksi Proyek <span className="bg-amber-300 px-2 border-2 border-black">Lab & Jaringan</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base font-mono font-semibold text-slate-700 max-w-md">
              Dokumentasi konfigurasi sistem, simulasi arsitektur jaringan, serta dashboard monitoring berbasis kebutuhan nyata.
            </p>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap items-center gap-2.5 mb-10">
            <button
              onClick={() => {
                soundEngine.playPop();
                setSelectedCategory('all');
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border-2 border-black transition-all ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-[4px_4px_0px_#0284C7] -translate-y-0.5'
                  : 'bg-[#FAF5E6] text-slate-800 hover:bg-amber-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              Semua Proyek ({PROJECTS.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setSelectedCategory('network');
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border-2 border-black flex items-center gap-1.5 transition-all ${
                selectedCategory === 'network'
                  ? 'bg-sky-400 text-black shadow-[4px_4px_0px_#000] -translate-y-0.5'
                  : 'bg-[#FAF5E6] text-slate-800 hover:bg-amber-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Wifi className="w-3.5 h-3.5" />
              <span>Jaringan & Routing</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setSelectedCategory('server');
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border-2 border-black flex items-center gap-1.5 transition-all ${
                selectedCategory === 'server'
                  ? 'bg-emerald-400 text-black shadow-[4px_4px_0px_#000] -translate-y-0.5'
                  : 'bg-[#FAF5E6] text-slate-800 hover:bg-amber-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Server & Docker</span>
            </button>
            <button
              onClick={() => {
                soundEngine.playPop();
                setSelectedCategory('web');
              }}
              className={`px-4 py-2 text-xs font-mono font-bold border-2 border-black flex items-center gap-1.5 transition-all ${
                selectedCategory === 'web'
                  ? 'bg-rose-400 text-black shadow-[4px_4px_0px_#000] -translate-y-0.5'
                  : 'bg-[#FAF5E6] text-slate-800 hover:bg-amber-100 shadow-[2px_2px_0px_#000]'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Web Monitoring</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              delay={index * 130}
              duration={750}
            >
              <div
                className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-7 shadow-[8px_8px_0px_#000] flex flex-col justify-between hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000] transition-all group h-full"
              >
                <div>
                  {/* Card Top Pill & Category */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-200 border-2 border-black text-xs font-mono font-black">
                      {getCategoryIcon(project.category)}
                      <span>{project.category.toUpperCase()}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-2 py-0.5 border border-black">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-3 group-hover:text-sky-700 transition-colors">
                    {project.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                    {project.summary}
                  </p>

                  {/* Key Metrics Quick View */}
                  <div className="grid grid-cols-3 gap-2 bg-[#FAF5E6] border-2 border-black p-3 mb-6">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-black text-slate-900">{metric.value}</div>
                        <div className="text-[10px] font-mono text-slate-500 font-semibold">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-white border border-black text-[11px] font-mono font-bold text-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveModalProject(project);
                  }}
                  className="w-full py-3 px-4 bg-sky-300 hover:bg-sky-400 text-black font-mono font-black text-xs border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Buka Studi Kasus & Topologi</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
