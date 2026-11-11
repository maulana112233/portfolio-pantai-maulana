import React, { useState, useEffect } from 'react';
import { soundEngine } from '../utils/soundEffects';
import { ArrowUp, Award, Compass, Sparkles } from 'lucide-react';

interface ScrollWaveTrackerProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const ScrollWaveTracker: React.FC<ScrollWaveTrackerProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [showQuickPill, setShowQuickPill] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
        setIsScrolledPastHero(window.scrollY > 450);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionTitle = (id: string) => {
    switch (id) {
      case 'utama':
        return '🏖️ Pantai Utama';
      case 'profil':
        return '👤 Profil & Identitas';
      case 'game-pantai':
        return '🏄 Arcade Packet Surfer';
      case 'sertifikat':
        return '📜 4 Sertifikat Resmi';
      case 'proyek':
        return '💼 Proyek Flagship';
      case 'pipeline':
        return '⚡ Tech Stack Pipeline';
      case 'timeline':
        return '⏳ Milestone Rekam Jejak';
      case 'kontak':
        return '📬 Kontak Bento Dock';
      default:
        return '🌊 Eksplorasi Pesisir';
    }
  };

  return (
    <>
      {/* 1. Top Wave Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-2 bg-amber-100 z-50 border-b-2 border-black overflow-hidden pointer-events-none"
        title={`Progress Eksplorasi: ${Math.round(scrollProgress)}%`}
      >
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-amber-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* 2. Floating Coastal Surfer / Surfing Duck Mascot on Progress Bar */}
      <div
        className="fixed top-2 z-50 pointer-events-auto transition-all duration-150 -translate-x-1/2 hidden md:block"
        style={{ left: `${Math.min(96, Math.max(4, scrollProgress))}%` }}
      >
        <button
          onClick={() => {
            soundEngine.playQuack();
            setShowQuickPill(!showQuickPill);
          }}
          className="group relative flex items-center gap-1.5 bg-amber-300 hover:bg-amber-400 border-2 border-black px-2 py-0.5 text-[10px] font-mono font-black shadow-[2px_2px_0px_#000] cursor-pointer active:translate-y-0.5 transition-transform"
          title="Klik bebek pesisir untuk info navigasi!"
        >
          <span className="text-xs group-hover:scale-125 transition-transform">🏄‍♂️</span>
          <span className="text-black font-extrabold">{Math.round(scrollProgress)}%</span>
          <span className="text-[9px] text-slate-800 bg-white/70 px-1 border border-black rounded-sm hidden lg:inline">
            {activeSection.toUpperCase()}
          </span>
        </button>
      </div>

      {/* 3. Floating Coastal Companion Widget (Bottom Right Quick Navigation & Scroll to Top) */}
      <div
        className={`fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5 transition-all duration-300 ${
          isScrolledPastHero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        {/* Active Section Indicator Bubble */}
        <div className="bg-[#FFFDF7] border-3 border-black p-2.5 shadow-[4px_4px_0px_#000] max-w-xs font-mono text-xs flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-sky-300 border-2 border-black flex items-center justify-center text-xs animate-bounce">
            🌊
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              Zona Saat Ini
            </span>
            <span className="text-slate-900 font-black truncate">
              {getSectionTitle(activeSection)}
            </span>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2">
          {/* Quick jump to Certificates */}
          <button
            onClick={() => {
              soundEngine.playPowerup();
              onNavigate('sertifikat');
            }}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-black border-2 border-black px-3 py-2 text-xs font-mono font-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Loncat Cepat ke 4 Sertifikat Resmi"
          >
            <Award className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Sertifikat</span>
            <span className="bg-black text-amber-300 text-[10px] px-1 rounded font-bold">4</span>
          </button>

          {/* Scroll to Top Buoy Button */}
          <button
            onClick={() => {
              soundEngine.playSplash();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center justify-center w-10 h-10 bg-sky-400 hover:bg-sky-300 border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            title="Kembali ke Puncak Pantai (Top)"
          >
            <ArrowUp className="w-5 h-5 text-black group-hover:-translate-y-0.5 transition-transform font-black" />
          </button>
        </div>
      </div>
    </>
  );
};
