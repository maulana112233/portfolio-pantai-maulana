import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X, Play, Gamepad2, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { BeachSoundboard } from './BeachSoundboard';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onReplayOpening: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, onReplayOpening }) => {
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const isPlaying = soundEngine.toggleBeachAmbient();
    setIsAudioOn(isPlaying);
    soundEngine.playPop();
  };

  const navItems = [
    { id: 'utama', label: '1. Utama' },
    { id: 'profil', label: '2. Profil' },
    { id: 'game-pantai', label: '🎮 Game' },
    { id: 'sertifikat', label: '📜 Sertifikat' },
    { id: 'proyek', label: '3. Proyek' },
    { id: 'pipeline', label: '4. Pipeline' },
    { id: 'timeline', label: '5. Milestone' },
    { id: 'kontak', label: '6. Kontak' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b-4 border-black px-4 sm:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={() => onNavigate('utama')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-10 h-10 bg-amber-300 border-2 border-black flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_#000] group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:shadow-[1px_1px_0px_#000] transition-all">
            🏖️
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-mono font-black text-sm tracking-tight text-slate-900">
              <span>MAULANA ICHSAN</span>
              <span className="bg-sky-400 text-black px-1.5 py-0.2 border border-black text-[10px] rounded-sm font-bold">
                X TKJ 1
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              SMK Telkom Malang
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#FAF5E6] border-2 border-black p-1 shadow-[3px_3px_0px_#000]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                  isActive
                    ? 'bg-sky-400 text-black border-2 border-black shadow-[2px_2px_0px_#000] -translate-y-0.5'
                    : 'text-slate-700 hover:bg-amber-200 border-2 border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Beach SFX Soundboard */}
          <BeachSoundboard />

          {/* Replay Opening Button */}
          <button
            onClick={() => {
              soundEngine.playPop();
              onReplayOpening();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-200 hover:bg-amber-300 border-2 border-black text-xs font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
            title="Tonton Ulang Animasi Opening Login"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span className="hidden sm:inline">Opening</span>
          </button>

          {/* Sound Wave Synth Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
              isAudioOn ? 'bg-emerald-300 text-black animate-pulse' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title="Dengarkan deburan ombak pesisir (Web Audio API sintetis)"
          >
            {isAudioOn ? <Volume2 className="w-4 h-4 text-emerald-900" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden md:inline">
              {isAudioOn ? 'Ombak 🌊' : 'Hening'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 bg-[#FAF5E6] border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t-2 border-black flex flex-col gap-2 bg-[#FFFDF7] p-3 border-2 border-black shadow-[4px_4px_0px_#000]">
          <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Navigasi Portofolio</span>
            <button
              onClick={() => {
                onReplayOpening();
                setMobileMenuOpen(false);
              }}
              className="text-amber-700 underline text-xs"
            >
              Putar Opening 🎬
            </button>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs font-mono font-bold border-2 border-black transition-all ${
                activeSection === item.id
                  ? 'bg-sky-300 shadow-[2px_2px_0px_#000]'
                  : 'bg-[#FAF5E6] hover:bg-amber-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
