import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEffects';
import { RotateCcw, Shuffle, Sparkles, Move, Waves, Wind } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LetterItem {
  id: string;
  char: string;
  icon: string;
  word: 'first' | 'last';
  color: string;
  x: number;
  y: number;
  rot: number;
  isJumping: boolean;
  delayIndex: number;
}

const FIRST_NAME_DATA = [
  { char: 'M', icon: '🌊', color: 'bg-sky-400 text-black' },
  { char: 'A', icon: '🏄', color: 'bg-amber-300 text-black' },
  { char: 'U', icon: '🏖️', color: 'bg-emerald-300 text-black' },
  { char: 'L', icon: '🌴', color: 'bg-rose-400 text-black' },
  { char: 'A', icon: '☀️', color: 'bg-amber-400 text-black' },
  { char: 'N', icon: '🐬', color: 'bg-cyan-300 text-black' },
  { char: 'A', icon: '🐚', color: 'bg-purple-300 text-black' },
];

const LAST_NAME_DATA = [
  { char: 'I', icon: '⚓', color: 'bg-amber-300 text-black' },
  { char: 'C', icon: '🦀', color: 'bg-rose-400 text-black' },
  { char: 'H', icon: '🗼', color: 'bg-sky-400 text-black' },
  { char: 'S', icon: '⛵', color: 'bg-emerald-300 text-black' },
  { char: 'A', icon: '🤿', color: 'bg-amber-400 text-black' },
  { char: 'N', icon: '🦆', color: 'bg-yellow-300 text-black' },
];

interface SplashRing {
  id: number;
  x: number;
  y: number;
}

export const DraggableName: React.FC = () => {
  const getInitialLetters = (): LetterItem[] => {
    const list: LetterItem[] = [];
    FIRST_NAME_DATA.forEach((item, idx) => {
      list.push({
        id: `first-${idx}`,
        char: item.char,
        icon: item.icon,
        word: 'first',
        color: item.color,
        x: 0,
        y: 0,
        rot: 0,
        isJumping: false,
        delayIndex: idx,
      });
    });
    LAST_NAME_DATA.forEach((item, idx) => {
      list.push({
        id: `last-${idx}`,
        char: item.char,
        icon: item.icon,
        word: 'last',
        color: item.color,
        x: 0,
        y: 0,
        rot: 0,
        isJumping: false,
        delayIndex: idx + FIRST_NAME_DATA.length,
      });
    });
    return list;
  };

  const [letters, setLetters] = useState<LetterItem[]>(getInitialLetters);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [isMoved, setIsMoved] = useState(false);
  const [splashRings, setSplashRings] = useState<SplashRing[]>([]);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0, lastX: 0, lastY: 0 });

  const handlePointerDown = (id: string, clientX: number, clientY: number) => {
    setActiveDragId(id);
    setIsMoved(true);
    soundEngine.playPop();

    const target = letters.find((l) => l.id === id);
    if (!target) return;

    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startX: target.x,
      startY: target.y,
      lastX: clientX,
      lastY: clientY,
    };
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!activeDragId) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - dragStartRef.current.mouseX;
      const dy = clientY - dragStartRef.current.mouseY;
      const speedX = clientX - dragStartRef.current.lastX;
      dragStartRef.current.lastX = clientX;
      dragStartRef.current.lastY = clientY;

      // Dynamic tilt based on dragging momentum
      const dynamicRot = Math.max(-28, Math.min(28, speedX * 1.2));

      setLetters((prev) =>
        prev.map((item) => {
          if (item.id === activeDragId) {
            return {
              ...item,
              x: dragStartRef.current.startX + dx,
              y: dragStartRef.current.startY + dy,
              rot: dynamicRot,
            };
          }
          return item;
        })
      );
    };

    const handlePointerUp = (e: MouseEvent | TouchEvent) => {
      if (activeDragId) {
        soundEngine.playWaterSplash();

        // Spawn a visual water splash ring
        const clientX = 'changedTouches' in e && e.changedTouches[0] ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'changedTouches' in e && e.changedTouches[0] ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;
        const newSplash: SplashRing = {
          id: Date.now() + Math.random(),
          x: clientX || window.innerWidth / 2,
          y: clientY || 200,
        };

        setSplashRings((s) => [...s, newSplash]);
        setTimeout(() => {
          setSplashRings((s) => s.filter((item) => item.id !== newSplash.id));
        }, 600);

        // Stabilize rotation after release
        setLetters((prev) =>
          prev.map((item) => {
            if (item.id === activeDragId) {
              return {
                ...item,
                rot: (Math.random() - 0.5) * 8, // slight natural sea float tilt
              };
            }
            return item;
          })
        );

        setActiveDragId(null);
      }
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('touchmove', handlePointerMove, { passive: false });
    window.addEventListener('touchend', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [activeDragId]);

  // Wave Domino Jump Trigger
  const triggerWaveJump = () => {
    soundEngine.playWaterSplash();
    letters.forEach((letter, index) => {
      setTimeout(() => {
        soundEngine.playPop();
        setLetters((prev) =>
          prev.map((l) => (l.id === letter.id ? { ...l, isJumping: true } : l))
        );
        setTimeout(() => {
          setLetters((prev) =>
            prev.map((l) => (l.id === letter.id ? { ...l, isJumping: false } : l))
          );
        }, 850);
      }, index * 90);
    });
  };

  // Spin Tornado
  const triggerTornadoSpin = () => {
    soundEngine.playPowerup();
    setLetters((prev) =>
      prev.map((item) => ({
        ...item,
        rot: item.rot + 360,
      }))
    );
  };

  // Scatter across the shore
  const handleScatter = () => {
    soundEngine.playPop();
    setIsMoved(true);
    setLetters((prev) =>
      prev.map((item) => ({
        ...item,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 70,
        rot: (Math.random() - 0.5) * 40,
      }))
    );
  };

  // Reset to original orderly grid
  const handleReset = () => {
    soundEngine.playPop();
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.4 },
        colors: ['#0284C7', '#F59E0B', '#10B981'],
      });
    } catch {
      // ignore
    }
    setLetters(getInitialLetters());
    setIsMoved(false);
  };

  const firstLetters = letters.filter((l) => l.word === 'first');
  const lastLetters = letters.filter((l) => l.word === 'last');

  return (
    <div className="relative my-3 select-none">
      {/* Dynamic Water Splash Rings on Drop */}
      {splashRings.map((ring) => (
        <div
          key={ring.id}
          className="fixed pointer-events-none z-50 w-16 h-16 -ml-8 -mt-8 rounded-full border-4 border-sky-400 bg-sky-200/40 animate-splash"
          style={{ left: `${ring.x}px`, top: `${ring.y}px` }}
        />
      ))}

      {/* Interactive Controls Bar with Animations */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200 border-2 border-black text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] text-slate-900 rounded-sm">
          <Move className="w-3.5 h-3.5 text-sky-800 animate-pulse" />
          <span>Huruf Interaktif Berombak: Klik & geser huruf nama ke mana saja!</span>
        </div>

        {/* Wave Domino Button */}
        <button
          onClick={triggerWaveJump}
          className="flex items-center gap-1.5 px-3 py-1 bg-sky-300 hover:bg-sky-400 border-2 border-black text-[11px] font-mono font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-slate-900"
          title="Picukan gelombang ombak melompati setiap huruf!"
        >
          <Waves className="w-3.5 h-3.5 text-blue-900" />
          <span>Gelombang Ombak 🌊</span>
        </button>

        {/* Tornado Spin Button */}
        <button
          onClick={triggerTornadoSpin}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-300 hover:bg-amber-400 border-2 border-black text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-slate-900"
          title="Putar huruf 360 derajat"
        >
          <Wind className="w-3.5 h-3.5 text-amber-900" />
          <span>Angin Pantai 🌪️</span>
        </button>

        {/* Scatter */}
        <button
          onClick={handleScatter}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-amber-100 border-2 border-black text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-slate-700"
          title="Kocok huruf di ombak"
        >
          <Shuffle className="w-3 h-3" />
          <span>Acak Huruf</span>
        </button>

        {/* Reset button */}
        {isMoved && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-rose-100 border-2 border-black text-[11px] font-mono font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-rose-700"
            title="Rapikan kembali posisi huruf"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Susun Rapi ↺</span>
          </button>
        )}
      </div>

      {/* Two rows of Draggable Neo-Brutalist Letters with Wave Buoyancy */}
      <div className="flex flex-col gap-3 sm:gap-4 items-start pt-1">
        {/* Row 1: MAULANA */}
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          {firstLetters.map((letter) => {
            const isDragging = activeDragId === letter.id;
            return (
              <div
                key={letter.id}
                onMouseDown={(e) => handlePointerDown(letter.id, e.clientX, e.clientY)}
                onTouchStart={(e) => {
                  if (e.touches[0]) {
                    handlePointerDown(letter.id, e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                style={{
                  transform: `translate(${letter.x}px, ${letter.y}px) rotate(${letter.rot}deg)`,
                  zIndex: isDragging ? 50 : 10,
                  touchAction: 'none',
                  animationDelay: `${letter.delayIndex * 0.18}s`,
                }}
                className={`relative w-12 h-16 sm:w-16 sm:h-22 border-3 sm:border-4 border-black ${letter.color} font-black font-mono text-2xl sm:text-4xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-75 hover:scale-110 active:scale-115 rounded-md select-none group ${
                  isDragging
                    ? 'shadow-[10px_10px_0px_#000] -translate-y-2'
                    : 'shadow-[4px_4px_0px_#000]'
                } ${
                  letter.isJumping
                    ? 'animate-letter-jump'
                    : isMoved
                    ? ''
                    : 'animate-buoy'
                }`}
              >
                {/* Sea Foam Crest on Top of Letter */}
                <div className="absolute -top-1.5 inset-x-1 h-2 bg-white/80 rounded-full border border-black/30 pointer-events-none"></div>

                {/* Main Character */}
                <span className="relative z-10 transition-transform group-hover:scale-110">
                  {letter.char}
                </span>

                {/* Beach Icon Badge in corner */}
                <span className="absolute bottom-1 right-1 text-[10px] sm:text-xs select-none pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all">
                  {letter.icon}
                </span>
              </div>
            );
          })}
        </div>

        {/* Row 2: ICHSAN */}
        <div className="flex flex-wrap gap-2 sm:gap-3 items-center">
          {lastLetters.map((letter) => {
            const isDragging = activeDragId === letter.id;
            return (
              <div
                key={letter.id}
                onMouseDown={(e) => handlePointerDown(letter.id, e.clientX, e.clientY)}
                onTouchStart={(e) => {
                  if (e.touches[0]) {
                    handlePointerDown(letter.id, e.touches[0].clientX, e.touches[0].clientY);
                  }
                }}
                style={{
                  transform: `translate(${letter.x}px, ${letter.y}px) rotate(${letter.rot}deg)`,
                  zIndex: isDragging ? 50 : 10,
                  touchAction: 'none',
                  animationDelay: `${letter.delayIndex * 0.18}s`,
                }}
                className={`relative w-12 h-16 sm:w-16 sm:h-22 border-3 sm:border-4 border-black ${letter.color} font-black font-mono text-2xl sm:text-4xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing transition-transform duration-75 hover:scale-110 active:scale-115 rounded-md select-none group ${
                  isDragging
                    ? 'shadow-[10px_10px_0px_#000] -translate-y-2'
                    : 'shadow-[4px_4px_0px_#000]'
                } ${
                  letter.isJumping
                    ? 'animate-letter-jump'
                    : isMoved
                    ? ''
                    : 'animate-buoy'
                }`}
              >
                {/* Sea Foam Crest on Top of Letter */}
                <div className="absolute -top-1.5 inset-x-1 h-2 bg-white/80 rounded-full border border-black/30 pointer-events-none"></div>

                {/* Main Character */}
                <span className="relative z-10 transition-transform group-hover:scale-110">
                  {letter.char}
                </span>

                {/* Beach Icon Badge in corner */}
                <span className="absolute bottom-1 right-1 text-[10px] sm:text-xs select-none pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all">
                  {letter.icon}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
