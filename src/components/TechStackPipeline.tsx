import React, { useState } from 'react';
import { TECH_PIPELINE } from '../data/portfolioData';
import { ChevronRight, Cable, Wrench, Zap, Server, Binary, Radio, Terminal, Share2, Cpu, Box, Globe, Code2, Layout, Palette, Layers, GitBranch, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { ScrollReveal } from './ScrollReveal';

export const TechStackPipeline: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<string>(TECH_PIPELINE[0].id);

  const activeStage = TECH_PIPELINE.find((s) => s.id === activeStageId) || TECH_PIPELINE[0];

  const getToolIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cable': return <Cable className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Binary': return <Binary className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Share2': return <Share2 className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Box': return <Box className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'Layout': return <Layout className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'GitBranch': return <GitBranch className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  return (
    <section id="pipeline" className="py-16 sm:py-20 border-t-4 border-black bg-[#FAF6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
                04 // PIPELINE TEKNOLOGI
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Alur Penguasaan <span className="bg-emerald-300 px-2 border-2 border-black">Tech Stack</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base font-mono font-semibold text-slate-700 max-w-md">
              Visualisasi alur teknologi dari layer fisik pengkabelan hingga perutean paket dan otomatisasi antarmuka modern.
            </p>
          </div>
        </ScrollReveal>

        {/* Pipeline Stepper Bar */}
        <ScrollReveal animation="fade-up" delay={120} duration={700}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {TECH_PIPELINE.map((stage, idx) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveStageId(stage.id);
                  }}
                  className={`p-4 border-3 border-black text-left transition-all relative ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-[6px_6px_0px_#0284C7] -translate-y-1'
                      : 'bg-[#FFFDF7] text-slate-800 hover:bg-amber-100 shadow-[3px_3px_0px_#000]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-mono font-black px-1.5 py-0.5 border ${
                      isSelected ? 'bg-amber-300 text-black border-black' : 'bg-slate-100 text-slate-700 border-black'
                    }`}>
                      STAGE {stage.stepNumber}
                    </span>
                    <span className="text-[10px] font-mono opacity-70">
                      {idx < 3 ? 'NEXT →' : 'TOP LAYER'}
                    </span>
                  </div>
                  <div className="font-mono font-black text-sm tracking-tight">
                    {stage.title}
                  </div>
                  <div className={`text-xs mt-1 font-sans ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {stage.categoryName}
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Active Stage Detailed Breakdown */}
        <ScrollReveal animation="zoom-in" delay={180} duration={750}>
          <div className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            {/* Stage Overview Banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-black/20 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 bg-sky-300 border border-black text-xs font-mono font-black">
                    STAGE {activeStage.stepNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                    {activeStage.categoryName}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  {activeStage.title}
                </h3>
                <p className="text-sm font-medium text-slate-700 mt-2 max-w-2xl">
                  {activeStage.description}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-[#FAF5E6] border-2 border-black p-3 shrink-0">
                <span className="text-2xl">🌊</span>
                <div className="text-xs font-mono font-bold text-slate-800">
                  <div>Fokus Kurikulum X TKJ 1</div>
                  <div className="text-emerald-700 font-semibold">SMK Telkom Malang</div>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeStage.items.map((tool, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF6EB] border-2 border-black p-4 shadow-[4px_4px_0px_#000] hover:bg-amber-100 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-amber-300 border border-black">
                          {getToolIcon(tool.icon)}
                        </div>
                        <span className="font-mono font-black text-base text-slate-900">
                          {tool.name}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-300 text-emerald-950 border border-black text-[11px] font-mono font-bold">
                        {tool.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-normal mt-2">
                      {tool.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>Kategori: {tool.badge}</span>
                    <span className="text-black font-bold">✓ Terverifikasi Lab</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
