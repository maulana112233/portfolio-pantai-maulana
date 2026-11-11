import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

export const BeachSoundboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAmbientOn, setIsAmbientOn] = useState(false);

  const handleToggleAmbient = () => {
    const isPlaying = soundEngine.toggleBeachAmbient();
    setIsAmbientOn(isPlaying);
    soundEngine.playPop();
  };

  const sounds = [
    { label: 'Deburan Ombak 🌊', icon: '🌊', action: handleToggleAmbient, active: isAmbientOn },
    { label: 'Burung Camar 🐦', icon: '🐦', action: () => soundEngine.playSeagull() },
    { label: 'Tetesan Air 💧', icon: '💧', action: () => soundEngine.playWaterDrop() },
    { label: 'Lonceng Pantai 🔔', icon: '🔔', action: () => soundEngine.playBell() },
    { label: 'Bebek Karet 🦆', icon: '🦆', action: () => soundEngine.playDuckQuack() },
    { label: 'Desir Gelombang 💨', icon: '💨', action: () => soundEngine.playWaveWhoosh() },
  ];

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => {
          soundEngine.playPop();
          setIsOpen(!isOpen);
        }}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all ${
          isOpen || isAmbientOn
            ? 'bg-amber-300 text-black'
            : 'bg-[#FAF5E6] text-slate-800 hover:bg-amber-100'
        }`}
        title="Buka Papan Suara Suasana Pesisir Pantai (Web Audio API)"
      >
        <Music className="w-3.5 h-3.5 text-black" />
        <span className="hidden sm:inline">Efek Suara Pantai</span>
        <span className="text-[10px] bg-black text-amber-300 px-1 py-0.2 rounded font-mono">
          SFX 🎵
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-56 bg-[#FFFDF7] border-3 border-black p-2.5 shadow-[5px_5px_0px_#000] z-50 font-mono text-xs animate-fade-in space-y-1.5">
            <div className="flex items-center justify-between pb-1.5 border-b border-black/20 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <span>Papan Suara Pesisir</span>
              <span className="text-emerald-700">Web Audio API</span>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {sounds.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    s.action();
                  }}
                  className={`flex items-center justify-between w-full px-2.5 py-1.5 border-2 border-black text-left font-bold transition-all ${
                    s.active
                      ? 'bg-emerald-300 text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-[#FAF5E6] hover:bg-sky-200 text-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{s.icon}</span>
                    <span>{s.label}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">▶</span>
                </button>
              ))}
            </div>

            <div className="pt-1.5 border-t border-black/10 text-[9px] text-slate-500 text-center">
              100% audio sintetis murni di browser
            </div>
          </div>
        </>
      )}
    </div>
  );
};
