import React from 'react';
import { Project } from '../types';
import { X, CheckCircle, ExternalLink, Github, Layers, ShieldCheck, Activity } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFDF7] border-4 border-black shadow-[12px_12px_0px_#000] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 bg-amber-300 border-b-4 border-black px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📁</span>
            <div>
              <span className="text-xs font-mono font-black uppercase text-amber-950">
                Studi Kasus Teknis // {project.category.toUpperCase()}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-950 leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playPop();
              onClose();
            }}
            className="p-1.5 bg-white hover:bg-rose-400 border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 text-black font-black transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Badge & Summary */}
          <div className="bg-[#FAF5E6] border-2 border-black p-4">
            <span className="inline-block px-2.5 py-0.5 bg-sky-300 border border-black text-xs font-mono font-bold mb-2">
              {project.badge}
            </span>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Problem */}
            <div className="bg-rose-50 border-2 border-black p-4">
              <div className="flex items-center gap-2 text-rose-800 font-mono font-bold text-xs uppercase mb-2">
                <span>⚠️ Latar Belakang Masalah</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="bg-emerald-50 border-2 border-black p-4">
              <div className="flex items-center gap-2 text-emerald-800 font-mono font-bold text-xs uppercase mb-2">
                <span>✅ Solusi Teknis Diterapkan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Architecture Checklist */}
          <div className="bg-white border-2 border-black p-4">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Detail Konfigurasi & Topologi</span>
            </div>
            <ul className="space-y-2">
              {project.architectureDetails.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Metrics */}
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-3">
              Metrik Kinerja & Hasil Uji
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="bg-amber-100 border-2 border-black p-3 text-center shadow-[3px_3px_0px_#000]">
                  <div className="text-xl font-black text-slate-900">{metric.value}</div>
                  <div className="text-[11px] font-mono font-bold text-slate-700 mt-0.5">{metric.label}</div>
                  {metric.detail && (
                    <div className="text-[10px] text-slate-600 mt-1">{metric.detail}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
              Teknologi Yang Digunakan
            </div>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-white border-2 border-black text-xs font-mono font-bold shadow-[2px_2px_0px_#000]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FAF5E6] border-t-4 border-black px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-600 font-semibold">
            Status: Telah diuji di lingkungan Lab Jaringan
          </div>
          <button
            onClick={() => {
              soundEngine.playPop();
              onClose();
            }}
            className="px-5 py-2 bg-slate-900 text-white font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-slate-800 transition-colors"
          >
            Tutup Studi Kasus
          </button>
        </div>
      </div>
    </div>
  );
};
