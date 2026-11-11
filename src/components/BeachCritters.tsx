import React, { useState } from 'react';
import { soundEngine } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

const CRAB_PUNS = [
  'Capitku tajam buat crimping kabel LAN UTP Cat6! 🦀',
  'Ombaknya sejuk, konfigurasi OSPF jadi lancar jaya! 🌊',
  'Awas terjepit VLAN 20 kalau tidak pakai trunking! ⚡',
  'Bebek pesisir lagi asyik surfing, aku yang jaga server! 🏄‍♂️',
  'Moklet X TKJ 1: Koneksi stabil, masa depan cerah! 🚀',
];

export const InteractiveCrab: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [punIdx, setPunIdx] = useState(0);
  const [isWiggling, setIsWiggling] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playDuckQuack();
    setIsWiggling(true);
    setShowBubble(true);
    setPunIdx((prev) => (prev + 1) % CRAB_PUNS.length);

    setTimeout(() => {
      setIsWiggling(false);
    }, 600);
  };

  return (
    <div className={`relative inline-block select-none ${className}`}>
      {/* Speech Bubble */}
      {showBubble && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#FFFDF7] border-2 border-black px-2.5 py-1 text-[11px] font-mono font-bold text-slate-900 shadow-[2px_2px_0px_#000] whitespace-nowrap z-20 animate-fade-in">
          {CRAB_PUNS[punIdx]}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#FFFDF7] border-r-2 border-b-2 border-black rotate-45"></div>
        </div>
      )}

      {/* Clickable Crab Button */}
      <button
        onClick={handleClick}
        className={`text-3xl p-1.5 bg-amber-200 hover:bg-amber-300 border-2 border-black rounded-lg shadow-[3px_3px_0px_#000] cursor-pointer active:scale-90 transition-transform ${
          isWiggling ? 'animate-bounce' : 'animate-bobbing'
        }`}
        title="Klik kepiting pantai untuk tips & sapaan!"
      >
        🦀
      </button>
    </div>
  );
};

export const InteractiveBeachBall: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [bounces, setBounces] = useState(0);

  const handleBounce = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playJump();
    setBounces((prev) => prev + 1);
    try {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#EF4444', '#3B82F6', '#FBBF24'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <button
        onClick={handleBounce}
        className="group relative text-3xl p-1 bg-white hover:bg-amber-100 border-2 border-black rounded-full shadow-[3px_3px_0px_#000] cursor-pointer active:-translate-y-6 transition-transform"
        title="Klik untuk memantulkan bola pantai!"
      >
        <span className="block group-hover:rotate-45 transition-transform duration-300">🏐</span>
        {bounces > 0 && (
          <span className="absolute -bottom-2 -right-1 bg-amber-400 text-black border border-black text-[9px] font-mono font-black px-1 rounded-full">
            {bounces}x
          </span>
        )}
      </button>
    </div>
  );
};

export const InteractiveStarfish: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playWaterDrop();
    setClicked(true);
    try {
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        colors: ['#F59E0B', '#F43F5E', '#38BDF8'],
      });
    } catch {
      // ignore
    }
    setTimeout(() => setClicked(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      className={`text-2xl p-1 bg-amber-100 hover:bg-amber-200 border-2 border-black rounded shadow-[2px_2px_0px_#000] cursor-pointer transition-transform ${
        clicked ? 'scale-125 rotate-180' : 'hover:scale-110'
      } ${className}`}
      title="Bintang laut pesisir! Klik untuk percikan kilau!"
    >
      ⭐
    </button>
  );
};
