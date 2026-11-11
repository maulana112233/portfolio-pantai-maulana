import React, { useState, useRef, useEffect } from 'react';
import { soundEngine } from '../utils/soundEffects';
import { BEACH_QUOTES } from '../data/portfolioData';

export const InteractiveBeach: React.FC = () => {
  // --- Duck Physics & Drag State ---
  const [duckPos, setDuckPos] = useState({ x: 120, y: 40 });
  const [duckVel, setDuckVel] = useState({ vx: 0, vy: 0 });
  const [isDraggingDuck, setIsDraggingDuck] = useState(false);
  const [duckSpeech, setDuckSpeech] = useState<string | null>("Tarik & lempar aku ke ombak!");
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, duckX: 0, duckY: 0, lastX: 0, lastY: 0, lastTime: 0 });
  const requestRef = useRef<number | null>(null);

  // --- Crab State ---
  const [crabSpeech, setCrabSpeech] = useState<string>("Klik aku untuk tips jaringan & ombak!");
  const [crabClickCount, setCrabClickCount] = useState(0);
  const [crabWiggle, setCrabWiggle] = useState(false);

  // --- Seagull State ---
  const [seagullSpeech, setSeagullSpeech] = useState<string>("Pantauan udara: Jaringan SMK Telkom Malang 100% prima!");

  // Duck physics loop when not dragged
  useEffect(() => {
    let lastTime = performance.now();

    const updatePhysics = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      if (!isDraggingDuck) {
        setDuckPos((pos) => {
          setDuckVel((vel) => {
            const gravity = 480; // gravity pull downwards
            const waterLevel = 130; // base float line
            let newVy = vel.vy + gravity * dt;
            let newVx = vel.vx * 0.96; // air drag
            let newY = pos.y + newVy * dt;
            let newX = pos.x + newVx * dt;

            // Water surface buoyancy
            if (newY >= waterLevel) {
              const buoyancy = (newY - waterLevel) * 750;
              newVy -= buoyancy * dt;
              newVy *= 0.88; // water damping
              newVx *= 0.92;
            }

            // Floor boundary
            if (newY > waterLevel + 40) {
              newY = waterLevel + 40;
              newVy = -newVy * 0.5;
            }

            // Screen boundaries
            const minX = 20;
            const maxX = Math.max(window.innerWidth - 120, 300);
            if (newX < minX) {
              newX = minX;
              newVx = -newVx * 0.6;
            } else if (newX > maxX) {
              newX = maxX;
              newVx = -newVx * 0.6;
            }

            return { vx: newVx, vy: newVy };
          });

          return {
            x: Math.max(10, Math.min(pos.x + duckVel.vx * dt, window.innerWidth - 100)),
            y: Math.max(10, Math.min(pos.y + duckVel.vy * dt, 240)),
          };
        });
      }

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isDraggingDuck, duckVel.vx, duckVel.vy]);

  // Handle Duck Drag Start
  const handleDuckDown = (clientX: number, clientY: number) => {
    setIsDraggingDuck(true);
    soundEngine.playDuckQuack();
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      duckX: duckPos.x,
      duckY: duckPos.y,
      lastX: clientX,
      lastY: clientY,
      lastTime: performance.now(),
    };
    setDuckSpeech("Waaah, aku meluncur!");
  };

  // Global mouse move & up listeners
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDraggingDuck) return;
      const dx = e.clientX - dragStartRef.current.mouseX;
      const dy = e.clientY - dragStartRef.current.mouseY;

      const now = performance.now();
      const dt = (now - dragStartRef.current.lastTime) / 1000;
      if (dt > 0.01) {
        const instantVx = (e.clientX - dragStartRef.current.lastX) / dt;
        const instantVy = (e.clientY - dragStartRef.current.lastY) / dt;
        setDuckVel({ vx: instantVx * 0.6, vy: instantVy * 0.6 });
        dragStartRef.current.lastX = e.clientX;
        dragStartRef.current.lastY = e.clientY;
        dragStartRef.current.lastTime = now;
      }

      setDuckPos({
        x: Math.max(20, Math.min(dragStartRef.current.duckX + dx, window.innerWidth - 120)),
        y: Math.max(0, Math.min(dragStartRef.current.duckY + dy, 240)),
      });
    };

    const handleUp = () => {
      if (isDraggingDuck) {
        setIsDraggingDuck(false);
        soundEngine.playWaterSplash();
        setDuckSpeech("Byurr! Ombak pantai ini segar sekali!");
        setTimeout(() => {
          setDuckSpeech(null);
        }, 4000);
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleUp);
    };
  }, [isDraggingDuck]);

  // Click Crab
  const handleCrabClick = () => {
    soundEngine.playPop();
    setCrabWiggle(true);
    setTimeout(() => setCrabWiggle(false), 600);

    const crabQuotes = BEACH_QUOTES.filter((q) => q.speaker === 'crab');
    const nextIndex = (crabClickCount + 1) % crabQuotes.length;
    setCrabClickCount(nextIndex);
    setCrabSpeech(crabQuotes[nextIndex].quote);
  };

  return (
    <div className="relative w-full pointer-events-none select-none z-20 overflow-hidden py-4">
      {/* 1. Flying Seagull with Speech Bubble */}
      <div className="absolute top-2 left-0 w-full overflow-hidden pointer-events-none">
        <div className="animate-fly inline-flex items-center gap-3">
          <div className="relative">
            {/* Seagull SVG */}
            <svg
              className="w-14 h-14 drop-shadow-[2px_2px_0px_#000]"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wings */}
              <path
                d="M10 24C22 14 30 18 32 30C34 18 42 14 54 24C44 26 36 34 32 44C28 34 20 26 10 24Z"
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* Body */}
              <ellipse cx="32" cy="32" rx="7" ry="12" fill="#F8FAFC" stroke="#000" strokeWidth="2.5" />
              {/* Beak */}
              <polygon points="32,44 36,49 28,49" fill="#F59E0B" stroke="#000" strokeWidth="2" />
              {/* Eyes */}
              <circle cx="30" cy="30" r="1.5" fill="#000" />
              <circle cx="34" cy="30" r="1.5" fill="#000" />
            </svg>
          </div>
          <div className="bg-[#FFFDF7] border-2 border-black px-3 py-1.5 shadow-[3px_3px_0px_#000] rounded-sm max-w-xs text-xs font-mono font-semibold text-slate-800">
            🕊️ {seagullSpeech}
          </div>
        </div>
      </div>

      {/* 2. Interactive Draggable Rubber Duck */}
      <div
        className="absolute pointer-events-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
        style={{
          transform: `translate(${duckPos.x}px, ${duckPos.y}px)`,
          touchAction: 'none',
        }}
        onMouseDown={(e) => handleDuckDown(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            handleDuckDown(e.touches[0].clientX, e.touches[0].clientY);
          }
        }}
      >
        {/* Speech Bubble */}
        {duckSpeech && (
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-200 border-2 border-black px-2.5 py-1 text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] rounded-md animate-bounce">
            🦆 {duckSpeech}
          </div>
        )}

        {/* Duck SVG Neo-Brutalist */}
        <div className="relative w-16 h-16 transform hover:scale-110 transition-transform">
          <svg viewBox="0 0 80 80" className="w-full h-full drop-shadow-[4px_4px_0px_#000]">
            {/* Duck Body */}
            <path
              d="M18 42C18 32 26 24 38 24C44 24 50 26 54 30C58 34 60 40 60 48C60 56 50 64 36 64C22 64 18 54 18 42Z"
              fill="#FACC15"
              stroke="#000"
              strokeWidth="3.5"
            />
            {/* Duck Head */}
            <circle cx="48" cy="24" r="16" fill="#FACC15" stroke="#000" strokeWidth="3.5" />
            {/* Beak */}
            <path
              d="M58 22C64 22 72 26 72 28C72 30 64 34 58 34Z"
              fill="#F97316"
              stroke="#000"
              strokeWidth="3"
            />
            {/* Eye */}
            <circle cx="50" cy="20" r="3" fill="#000" />
            <circle cx="51" cy="19" r="1" fill="#FFF" />
            {/* Wing Detail */}
            <path
              d="M26 42C30 38 40 38 44 44C40 48 30 50 26 42Z"
              fill="#EAB308"
              stroke="#000"
              strokeWidth="2.5"
            />
          </svg>
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-amber-300 text-[9px] font-mono font-black px-1.5 py-0.2 rounded border border-white">
            DRAG ME
          </span>
        </div>
      </div>

      {/* 3. Interactive Beach Crab (Right Bottom Corner) */}
      <div className="absolute right-6 top-8 pointer-events-auto flex flex-col items-end">
        {/* Crab Speech */}
        <div
          onClick={handleCrabClick}
          className="mb-2 max-w-[240px] bg-[#FFF9E6] border-2 border-black p-2.5 text-xs font-mono font-semibold shadow-[3px_3px_0px_#000] cursor-pointer hover:bg-amber-100 transition-colors rounded-sm"
        >
          <div className="flex items-center justify-between text-[10px] text-amber-800 font-bold mb-1 border-b border-black/20 pb-0.5">
            <span>🦀 KEPITING TKJ</span>
            <span className="bg-amber-400 text-black px-1 rounded text-[9px]">Klik capit</span>
          </div>
          <p className="text-slate-800 leading-snug">"{crabSpeech}"</p>
        </div>

        {/* Crab Avatar */}
        <button
          onClick={handleCrabClick}
          className={`relative p-2 bg-rose-400 hover:bg-rose-500 border-2 border-black rounded-lg shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all ${
            crabWiggle ? 'animate-bounce' : 'animate-bobbing'
          }`}
          title="Klik kepiting untuk kutipan baru!"
        >
          <svg className="w-12 h-10" viewBox="0 0 64 48" fill="none">
            {/* Claws */}
            <path d="M12 14C8 10 4 14 6 22C10 20 14 18 12 14Z" fill="#DC2626" stroke="#000" strokeWidth="2.5" />
            <path d="M52 14C56 10 60 14 58 22C54 20 50 18 52 14Z" fill="#DC2626" stroke="#000" strokeWidth="2.5" />
            {/* Legs */}
            <path d="M16 34L8 42M20 38L14 46M48 34L56 42M44 38L50 46" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            {/* Body */}
            <ellipse cx="32" cy="28" rx="18" ry="12" fill="#EF4444" stroke="#000" strokeWidth="3" />
            {/* Eyes */}
            <circle cx="26" cy="16" r="3.5" fill="#FFF" stroke="#000" strokeWidth="2" />
            <circle cx="26" cy="16" r="1.5" fill="#000" />
            <circle cx="38" cy="16" r="3.5" fill="#FFF" stroke="#000" strokeWidth="2" />
            <circle cx="38" cy="16" r="1.5" fill="#000" />
            {/* Smile */}
            <path d="M26 30C28 34 36 34 38 30" stroke="#000" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};
