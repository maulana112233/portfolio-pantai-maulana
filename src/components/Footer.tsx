import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Heart, Terminal, Compass, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="border-t-4 border-black bg-[#FFFDF7] pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Footer Banner */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b-2 border-black/20">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏖️</span>
              <span className="font-mono font-black text-lg text-slate-950">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-700 max-w-md leading-relaxed">
              Website portofolio interaktif siswa kejuruan Teknik Komputer & Jaringan SMK Telkom Malang. Didesain dengan filosofi neo-brutalisme pesisir pantai modern.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2 py-0.5 bg-amber-200 border border-black text-[11px] font-mono font-bold">
                Kelas: {PERSONAL_INFO.grade}
              </span>
              <span className="px-2 py-0.5 bg-sky-200 border border-black text-[11px] font-mono font-bold">
                {PERSONAL_INFO.school}
              </span>
              <span className="px-2 py-0.5 bg-emerald-200 border border-black text-[11px] font-mono font-bold">
                Lisensi MIT (Open Source)
              </span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-mono font-bold text-slate-500 uppercase">
              Sosial Media
            </div>
            <ul className="text-xs font-mono space-y-1.5 text-slate-700">
              <li>• Instagram: <a href="https://instagram.com/maulana.icsn" target="_blank" rel="noreferrer" className="text-sky-700 underline font-bold">@maulana.icsn</a></li>
              <li>• TikTok: <a href="https://tiktok.com/@maulanaichsansyah" target="_blank" rel="noreferrer" className="text-sky-700 underline font-bold">@maulanaichsansyah</a></li>
              <li>• GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" className="text-slate-900 underline font-bold">@maulana-ichsan</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div className="text-left md:text-right">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                Status Mercusuar Pantai
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="font-mono font-bold text-xs text-slate-900">
                  Ombak Tenang • Jaringan 100%
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playPop();
                onScrollToTop();
              }}
              className="mt-6 md:mt-0 px-4 py-2.5 bg-amber-300 hover:bg-amber-400 text-black font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Kembali Ke Atas</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Siswa SMK Telkom Malang.
          </div>
          <div className="flex items-center gap-2">
            <span>Dibuat dengan semangat pantai</span>
            <span>🌊</span>
            <span>& dedikasi jaringan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
