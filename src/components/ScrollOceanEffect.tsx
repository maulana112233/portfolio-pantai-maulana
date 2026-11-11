import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/soundEffects';

interface FoamParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  color: string;
}

interface MarineCreature {
  type: 'turtle' | 'dolphin' | 'fish' | 'jellyfish';
  x: number;
  y: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  direction: 1 | -1;
  emoji: string;
  wobbleSpeed: number;
  wobbleAmp: number;
  opacity: number;
}

export const ScrollOceanEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scrollSpeedName, setScrollSpeedName] = useState<'Tenang 🌊' | 'Arus Sedang 🏄' | 'Ombak Cepat ⚡'>('Tenang 🌊');
  const [isScrollingFast, setIsScrollingFast] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Scroll tracking
    let lastScrollY = window.scrollY;
    let lastScrollTime = performance.now();
    let scrollVelocity = 0; // px / ms
    let smoothedVelocity = 0;
    let waveSwell = 0; // extra wave height from scroll
    let wavePhase = 0;
    let lastWhooshTime = 0;

    const particles: FoamParticle[] = [];
    const colors = ['rgba(255, 255, 255, 0.85)', 'rgba(186, 230, 253, 0.8)', 'rgba(56, 189, 248, 0.7)', 'rgba(254, 240, 138, 0.6)'];

    // Marine life in background
    const creatures: MarineCreature[] = [
      {
        type: 'turtle',
        x: width * 0.15,
        y: height * 0.45,
        baseY: height * 0.45,
        vx: 0.6,
        vy: 0,
        size: 32,
        direction: 1,
        emoji: '🐢',
        wobbleSpeed: 0.002,
        wobbleAmp: 15,
        opacity: 0.85,
      },
      {
        type: 'dolphin',
        x: width * 0.85,
        y: height * 0.65,
        baseY: height * 0.65,
        vx: -1.2,
        vy: 0,
        size: 36,
        direction: -1,
        emoji: '🐬',
        wobbleSpeed: 0.003,
        wobbleAmp: 25,
        opacity: 0.85,
      },
      {
        type: 'fish',
        x: width * 0.5,
        y: height * 0.25,
        baseY: height * 0.25,
        vx: 1.5,
        vy: 0,
        size: 26,
        direction: 1,
        emoji: '🐠',
        wobbleSpeed: 0.004,
        wobbleAmp: 10,
        opacity: 0.9,
      },
      {
        type: 'jellyfish',
        x: width * 0.08,
        y: height * 0.75,
        baseY: height * 0.75,
        vx: 0.3,
        vy: -0.4,
        size: 28,
        direction: 1,
        emoji: '🪼',
        wobbleSpeed: 0.0025,
        wobbleAmp: 20,
        opacity: 0.75,
      },
      {
        type: 'fish',
        x: width * 0.7,
        y: height * 0.85,
        baseY: height * 0.85,
        vx: -1.0,
        vy: 0,
        size: 24,
        direction: -1,
        emoji: '🐟',
        wobbleSpeed: 0.0035,
        wobbleAmp: 12,
        opacity: 0.85,
      },
    ];

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastScrollTime, 16);
      const currentScrollY = window.scrollY;
      const rawVelocity = Math.abs(currentScrollY - lastScrollY) / dt;

      scrollVelocity = Math.min(rawVelocity * 10, 8); // normalized clamp
      lastScrollY = currentScrollY;
      lastScrollTime = now;

      // Trigger wave swell
      waveSwell = Math.min(waveSwell + scrollVelocity * 4.5, 65);

      // Play subtle wave whoosh if scrolling very fast
      if (scrollVelocity > 4.5 && now - lastWhooshTime > 1800) {
        lastWhooshTime = now;
        soundEngine.playWaveWhoosh();
      }

      // Spawn surge foam particles along bottom & sides
      const spawnCount = Math.floor(scrollVelocity * 2.5);
      for (let i = 0; i < spawnCount; i++) {
        // Bottom wave foam
        particles.push({
          x: Math.random() * width,
          y: height - Math.random() * (waveSwell + 15),
          vx: (Math.random() - 0.5) * 3,
          vy: -(Math.random() * (scrollVelocity * 1.5 + 1.5) + 1),
          radius: Math.random() * 4 + 2,
          alpha: 0.85,
          decay: Math.random() * 0.02 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
        });

        // Left/right edge splash bubbles
        if (Math.random() < 0.4) {
          const isLeft = Math.random() < 0.5;
          particles.push({
            x: isLeft ? Math.random() * 35 : width - Math.random() * 35,
            y: Math.random() * height,
            vx: isLeft ? Math.random() * 2 : -Math.random() * 2,
            vy: -(Math.random() * 3 + 1),
            radius: Math.random() * 3.5 + 2,
            alpha: 0.75,
            decay: Math.random() * 0.018 + 0.015,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      // Cap max particles
      if (particles.length > 150) {
        particles.splice(0, particles.length - 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Water ripple on click
    const handleClick = (e: MouseEvent) => {
      // Don't trigger if clicking interactive elements
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, select')) return;

      soundEngine.playWaterDrop();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const spd = Math.random() * 3 + 1.5;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          radius: Math.random() * 4 + 2.5,
          alpha: 0.9,
          decay: 0.025,
          color: '#38BDF8',
        });
      }
    };
    window.addEventListener('click', handleClick);

    // Animation Render Loop
    let lastFrame = performance.now();
    const render = (now: number) => {
      const dt = (now - lastFrame) / 1000;
      lastFrame = now;

      // Decay scroll velocity smoothly
      smoothedVelocity += (scrollVelocity - smoothedVelocity) * 0.12;
      scrollVelocity *= 0.88;
      waveSwell *= 0.94;
      wavePhase += 0.04 + smoothedVelocity * 0.05;

      // Update state for UI badge
      if (smoothedVelocity > 3.0) {
        setScrollSpeedName('Ombak Cepat ⚡');
        setIsScrollingFast(true);
      } else if (smoothedVelocity > 0.8) {
        setScrollSpeedName('Arus Sedang 🏄');
        setIsScrollingFast(true);
      } else {
        setScrollSpeedName('Tenang 🌊');
        setIsScrollingFast(false);
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw swimming marine creatures in background with gentle oscillation
      creatures.forEach((c) => {
        // Accelerate when scrolling
        const currentSpeed = c.vx * (1 + smoothedVelocity * 0.8);
        c.x += currentSpeed;
        c.y = c.baseY + Math.sin(now * c.wobbleSpeed) * c.wobbleAmp;

        // Wrap around screen
        if (c.direction === 1 && c.x > width + 60) {
          c.x = -60;
          c.baseY = Math.random() * (height * 0.7) + height * 0.15;
        } else if (c.direction === -1 && c.x < -60) {
          c.x = width + 60;
          c.baseY = Math.random() * (height * 0.7) + height * 0.15;
        }

        // Draw creature
        ctx.save();
        ctx.globalAlpha = c.opacity * (0.6 + Math.min(smoothedVelocity * 0.15, 0.4));
        ctx.font = `${c.size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Flip emoji horizontally if direction is left
        if (c.direction === -1) {
          ctx.translate(c.x, c.y);
          ctx.scale(-1, 1);
          ctx.fillText(c.emoji, 0, 0);
        } else {
          ctx.fillText(c.emoji, c.x, c.y);
        }
        ctx.restore();
      });

      // 2. Draw Bottom Coastal Water Surge (Waves that swell on scroll)
      const baseWaveH = 14 + waveSwell;
      if (baseWaveH > 2) {
        // First Layer: Deep Turquoise Ocean
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, height - baseWaveH);

        for (let x = 0; x <= width; x += 25) {
          const y =
            height -
            baseWaveH +
            Math.sin(x * 0.012 + wavePhase) * 6 +
            Math.cos(x * 0.02 - wavePhase * 0.7) * 4;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad1 = ctx.createLinearGradient(0, height - baseWaveH - 10, 0, height);
        grad1.addColorStop(0, 'rgba(56, 189, 248, 0.45)');
        grad1.addColorStop(1, 'rgba(2, 132, 199, 0.75)');
        ctx.fillStyle = grad1;
        ctx.fill();

        // Top Foam Border on wave
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
        ctx.restore();

        // Second Layer: Lighter Seafoam Ripple
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(0, height - baseWaveH * 0.75);

        for (let x = 0; x <= width; x += 20) {
          const y =
            height -
            baseWaveH * 0.75 +
            Math.cos(x * 0.018 - wavePhase * 1.2) * 5 +
            Math.sin(x * 0.03 + wavePhase) * 3;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.closePath();

        const grad2 = ctx.createLinearGradient(0, height - baseWaveH * 0.75, 0, height);
        grad2.addColorStop(0, 'rgba(254, 240, 138, 0.5)');
        grad2.addColorStop(1, 'rgba(186, 230, 253, 0.65)');
        ctx.fillStyle = grad2;
        ctx.fill();
        ctx.restore();
      }

      // 3. Draw & Update Foam / Bubble Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y < -20 || p.x < -20 || p.x > width + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Neo-brutalist dark outline on larger bubbles
        if (p.radius > 3) {
          ctx.lineWidth = 1;
          ctx.strokeStyle = `rgba(0, 0, 0, ${p.alpha * 0.6})`;
          ctx.stroke();
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      {/* 1. Fullscreen Coastal Ocean Canvas Overlay (Non-blocking) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-30"
        style={{ mixBlendMode: 'normal' }}
      />

      {/* 2. Floating Coastal Wave Speedometer (Bottom-Left Pill) */}
      <div
        className={`fixed bottom-6 left-6 z-40 pointer-events-auto transition-all duration-300 ${
          isScrollingFast ? 'scale-105 opacity-100' : 'opacity-85 hover:opacity-100'
        }`}
      >
        <div className="bg-[#FFFDF7] border-3 border-black px-3 py-1.5 shadow-[4px_4px_0px_#000] flex items-center gap-2 font-mono text-xs">
          <span className="text-base animate-pulse">🌊</span>
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
              Arus Ombak Scroll
            </span>
            <span className="text-slate-900 font-black flex items-center gap-1">
              <span>{scrollSpeedName}</span>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
