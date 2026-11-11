import React, { useEffect, useRef, useState } from 'react';

interface Fish {
  x: number;
  y: number;
  speed: number;
  size: number;
  color: string;
  depth: number;
  direction: 1 | -1;
  wiggleOffset: number;
}

interface Bubble {
  x: number;
  y: number;
  radius: number;
  speed: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  opacity: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
}

interface OceanCanvasProps {
  height?: number;
  interactive?: boolean;
}

export const OceanCanvas: React.FC<OceanCanvasProps> = ({
  height = 360,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    // Responsive sizing with pixel ratio
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial fish school
    const fishColors = ['#F59E0B', '#EF4444', '#10B981', '#38BDF8', '#EC4899'];
    const fishes: Fish[] = Array.from({ length: 9 }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * window.innerWidth,
        y: height * 0.45 + Math.random() * (height * 0.45),
        speed: (0.7 + Math.random() * 1.3) * dir,
        size: 14 + Math.random() * 14,
        color: fishColors[Math.floor(Math.random() * fishColors.length)],
        depth: Math.random(),
        direction: dir,
        wiggleOffset: Math.random() * Math.PI * 2,
      };
    });

    // Bubbles
    const bubbles: Bubble[] = Array.from({ length: 22 }, () => ({
      x: Math.random() * window.innerWidth,
      y: height * 0.4 + Math.random() * height * 0.6,
      radius: 2 + Math.random() * 5,
      speed: 0.6 + Math.random() * 1.2,
      wobbleSpeed: 0.02 + Math.random() * 0.04,
      wobbleAmp: 10 + Math.random() * 18,
      opacity: 0.3 + Math.random() * 0.5,
    }));

    // Interactive ripples
    const ripples: Ripple[] = [];

    const handleCanvasClick = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickY > height * 0.25) {
        ripples.push({
          x: clickX,
          y: clickY,
          radius: 5,
          maxRadius: 65 + Math.random() * 35,
          opacity: 0.85,
        });
        setClickCount((c) => c + 1);
      }
    };

    canvas.addEventListener('click', handleCanvasClick);

    // Draw single wave line
    const drawWave = (
      layerColor: string,
      amplitude: number,
      wavelength: number,
      speed: number,
      baseY: number,
      strokeColor?: string
    ) => {
      const w = canvas.getBoundingClientRect().width;
      ctx.beginPath();
      ctx.moveTo(0, baseY);

      for (let x = 0; x <= w; x += 4) {
        // Multi-frequency wave calculation
        const y =
          baseY +
          Math.sin(x * wavelength + step * speed) * amplitude +
          Math.cos(x * (wavelength * 0.45) - step * (speed * 0.6)) * (amplitude * 0.35);
        ctx.lineTo(x, y);
      }

      ctx.lineTo(w, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = layerColor;
      ctx.fill();

      if (strokeColor) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
      }
    };

    // Render loop
    const render = () => {
      step += 0.025;
      const width = canvas.getBoundingClientRect().width;

      ctx.clearRect(0, 0, width, height);

      // 1. Far Deep Ocean Layer
      drawWave('#0284C7', 16, 0.007, 0.9, height * 0.38);

      // 2. Mid Ocean Layer (Tropical Cyan / Azure)
      drawWave('#0EA5E9', 22, 0.009, -1.1, height * 0.46);

      // 3. Near Ocean Layer with White Sea Foam
      drawWave('#38BDF8', 26, 0.012, 1.4, height * 0.54, '#000000');

      // 4. Foam highlights along wave peaks
      ctx.beginPath();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      for (let x = 0; x <= width; x += 6) {
        const y =
          height * 0.54 +
          Math.sin(x * 0.012 + step * 1.4) * 26 +
          Math.cos(x * (0.012 * 0.45) - step * (1.4 * 0.6)) * (26 * 0.35);
        if (x === 0) ctx.moveTo(x, y - 2);
        else ctx.lineTo(x, y - 2);
      }
      ctx.stroke();

      // 5. Draw Bubbles
      bubbles.forEach((b) => {
        b.y -= b.speed;
        const currentX = b.x + Math.sin(step * 2 + b.x) * (b.wobbleAmp * 0.1);

        if (b.y < height * 0.45) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(currentX, b.y, b.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = '#0284C7';
        ctx.stroke();

        // Bubble highlight reflection
        ctx.beginPath();
        ctx.arc(currentX - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();
      });

      // 6. Draw Swimming Fish
      fishes.forEach((fish) => {
        fish.x += fish.speed;
        if (fish.direction === 1 && fish.x > width + 50) {
          fish.x = -50;
          fish.y = height * 0.5 + Math.random() * (height * 0.4);
        } else if (fish.direction === -1 && fish.x < -50) {
          fish.x = width + 50;
          fish.y = height * 0.5 + Math.random() * (height * 0.4);
        }

        const wiggle = Math.sin(step * 8 + fish.wiggleOffset) * 4;

        ctx.save();
        ctx.translate(fish.x, fish.y);
        if (fish.direction === -1) {
          ctx.scale(-1, 1);
        }

        // Fish Body
        ctx.beginPath();
        ctx.ellipse(0, 0, fish.size, fish.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fillStyle = fish.color;
        ctx.fill();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Fish Tail with dynamic wiggle
        ctx.beginPath();
        ctx.moveTo(-fish.size * 0.8, 0);
        ctx.lineTo(-fish.size * 1.5, -fish.size * 0.55 + wiggle);
        ctx.lineTo(-fish.size * 1.3, 0);
        ctx.lineTo(-fish.size * 1.5, fish.size * 0.55 + wiggle);
        ctx.closePath();
        ctx.fillStyle = fish.color;
        ctx.fill();
        ctx.stroke();

        // Fish Eye
        ctx.beginPath();
        ctx.arc(fish.size * 0.45, -fish.size * 0.15, fish.size * 0.16, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(fish.size * 0.48, -fish.size * 0.15, fish.size * 0.08, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        ctx.restore();
      });

      // 7. Interactive ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 1.8;
        rip.opacity -= 0.022;

        if (rip.opacity <= 0 || rip.radius >= rip.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = `rgba(255, 255, 255, ${rip.opacity})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius * 0.6, 0, Math.PI * 2);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(254, 240, 138, ${rip.opacity * 0.8})`;
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [height, interactive]);

  return (
    <div className="relative w-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full block cursor-pointer transition-all active:cursor-grabbing"
        style={{ height: `${height}px` }}
      />
      {/* Canvas Interaction Guide Pill */}
      <div className="absolute bottom-3 right-4 z-10 flex items-center gap-2 bg-[#FFFDF7] border-2 border-black px-3 py-1 text-xs font-mono font-bold shadow-[2px_2px_0px_#000]">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
        <span>Simulasi Ombak Real-Time • Klik air untuk membuat riak</span>
        {clickCount > 0 && (
          <span className="bg-amber-300 text-black px-1.5 py-0.5 rounded border border-black text-[10px]">
            {clickCount} Riak
          </span>
        )}
      </div>
    </div>
  );
};
