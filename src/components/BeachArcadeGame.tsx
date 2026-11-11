import React, { useRef, useEffect, useState } from 'react';
import { Gamepad2, Trophy, RotateCcw, Volume2, Sparkles, Heart, Zap } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface Collectible {
  x: number;
  y: number;
  type: 'ping' | 'wifi' | 'fiber';
  value: number;
  size: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'spike' | 'anchor';
}

export const BeachArcadeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('packet_surfer_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [powerupActive, setPowerupActive] = useState(false);

  // References for game state inside loop
  const gameRef = useRef({
    state: 'idle' as 'idle' | 'playing' | 'gameover',
    score: 0,
    lives: 3,
    combo: 1,
    duckY: 180,
    duckVy: 0,
    isGrounded: true,
    jumpCount: 0,
    collectibles: [] as Collectible[],
    obstacles: [] as Obstacle[],
    speed: 4,
    distance: 0,
    powerupTimer: 0,
    flicker: 0,
  });

  const jump = () => {
    const g = gameRef.current;
    if (g.state !== 'playing') {
      startGame();
      return;
    }

    if (g.jumpCount < 2) {
      g.duckVy = -11.5;
      g.jumpCount++;
      g.isGrounded = false;
      soundEngine.playJump();
    }
  };

  const startGame = () => {
    const g = gameRef.current;
    g.state = 'playing';
    g.score = 0;
    g.lives = 3;
    g.combo = 1;
    g.duckY = 180;
    g.duckVy = 0;
    g.isGrounded = true;
    g.jumpCount = 0;
    g.collectibles = [];
    g.obstacles = [];
    g.speed = 4;
    g.distance = 0;
    g.powerupTimer = 0;
    g.flicker = 0;

    setScore(0);
    setLives(3);
    setCombo(1);
    setPowerupActive(false);
    setGameState('playing');
    soundEngine.playPop();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Main Canvas Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;
    const groundY = 180;

    const loop = () => {
      tick++;
      const g = gameRef.current;
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Sky & Sun
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#E0F2FE');
      skyGrad.addColorStop(0.7, '#FEF3C7');
      skyGrad.addColorStop(1, '#FED7AA');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Sun
      ctx.beginPath();
      ctx.arc(width - 70, 50, 28, 0, Math.PI * 2);
      ctx.fillStyle = '#F59E0B';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Clouds
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.beginPath();
      ctx.arc(80 + (tick * 0.2) % (width + 100), 40, 16, 0, Math.PI * 2);
      ctx.arc(100 + (tick * 0.2) % (width + 100), 34, 20, 0, Math.PI * 2);
      ctx.arc(120 + (tick * 0.2) % (width + 100), 40, 16, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Ocean Water & Surf Base
      ctx.fillStyle = '#0284C7';
      ctx.fillRect(0, groundY + 22, width, height - (groundY + 22));

      // Animated Water waves
      ctx.beginPath();
      ctx.moveTo(0, groundY + 22);
      for (let x = 0; x <= width; x += 10) {
        const waveY = groundY + 22 + Math.sin(x * 0.03 + tick * 0.08) * 6;
        ctx.lineTo(x, waveY);
      }
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fillStyle = '#38BDF8';
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // Foam line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 8) {
        const y = groundY + 20 + Math.sin(x * 0.03 + tick * 0.08) * 6;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 4;
      ctx.stroke();

      // If Playing State
      if (g.state === 'playing') {
        g.distance += g.speed;
        if (g.speed < 8) g.speed += 0.001; // gradual speed up

        // Powerup countdown
        if (g.powerupTimer > 0) {
          g.powerupTimer--;
          if (g.powerupTimer === 0) setPowerupActive(false);
        }

        // Flicker recovery after hit
        if (g.flicker > 0) g.flicker--;

        // Duck physics
        g.duckVy += 0.55; // gravity
        g.duckY += g.duckVy;

        if (g.duckY >= groundY) {
          g.duckY = groundY;
          g.duckVy = 0;
          g.isGrounded = true;
          g.jumpCount = 0;
        }

        // Spawn Collectibles
        if (tick % 65 === 0) {
          const rand = Math.random();
          let type: 'ping' | 'wifi' | 'fiber' = 'ping';
          let val = 10;
          if (rand > 0.85) {
            type = 'fiber';
            val = 50;
          } else if (rand > 0.55) {
            type = 'wifi';
            val = 25;
          }

          g.collectibles.push({
            x: width + 20,
            y: groundY - 30 - Math.random() * 80,
            type,
            value: val,
            size: 14,
          });
        }

        // Spawn Obstacles
        if (tick % 110 === 0 && Math.random() > 0.25) {
          const type = Math.random() > 0.5 ? 'spike' : 'anchor';
          g.obstacles.push({
            x: width + 30,
            y: groundY - (type === 'anchor' ? 10 : 0),
            width: 24,
            height: 24,
            type,
          });
        }

        // Move & Collide Collectibles
        for (let i = g.collectibles.length - 1; i >= 0; i--) {
          const c = g.collectibles[i];
          c.x -= g.speed;

          // Check collision with Duck (Duck pos: x=80, y=g.duckY, radius=18)
          const dx = 80 - c.x;
          const dy = g.duckY - c.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 32) {
            g.score += c.value * g.combo;
            g.combo = Math.min(g.combo + 1, 5);
            setScore(g.score);
            setCombo(g.combo);

            if (c.type === 'fiber') {
              g.powerupTimer = 240; // ~4 sec invincibility
              setPowerupActive(true);
              soundEngine.playPowerup();
            } else {
              soundEngine.playCoin();
            }

            g.collectibles.splice(i, 1);
            continue;
          }

          if (c.x < -30) g.collectibles.splice(i, 1);
        }

        // Move & Collide Obstacles
        for (let i = g.obstacles.length - 1; i >= 0; i--) {
          const o = g.obstacles[i];
          o.x -= g.speed;

          // Collision check
          if (
            g.flicker === 0 &&
            g.powerupTimer === 0 &&
            o.x < 100 &&
            o.x + o.width > 65 &&
            g.duckY + 15 > o.y &&
            g.duckY - 15 < o.y + o.height
          ) {
            g.lives--;
            g.combo = 1;
            g.flicker = 60; // 1 sec invulnerable
            setLives(g.lives);
            setCombo(1);
            soundEngine.playHit();

            if (g.lives <= 0) {
              g.state = 'gameover';
              setGameState('gameover');
              if (g.score > highScore) {
                setHighScore(g.score);
                localStorage.setItem('packet_surfer_highscore', g.score.toString());
              }
            }
          }

          if (o.x < -40) g.obstacles.splice(i, 1);
        }
      }

      // 3. Draw Collectibles
      g.collectibles.forEach((c) => {
        ctx.save();
        ctx.translate(c.x, c.y);

        if (c.type === 'ping') {
          // Green Ping Packet
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.fillStyle = '#10B981';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000000';
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('PING', 0, 0);
        } else if (c.type === 'wifi') {
          // Yellow WiFi Badge
          ctx.beginPath();
          ctx.arc(0, 0, 14, 0, Math.PI * 2);
          ctx.fillStyle = '#F59E0B';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000000';
          ctx.stroke();

          ctx.fillStyle = '#000000';
          ctx.font = 'bold 9px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('WIFI', 0, 0);
        } else {
          // Fiber Optic Gem
          ctx.beginPath();
          ctx.moveTo(0, -14);
          ctx.lineTo(12, 0);
          ctx.lineTo(0, 14);
          ctx.lineTo(-12, 0);
          ctx.closePath();
          ctx.fillStyle = '#A855F7';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000000';
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('FO', 0, 0);
        }
        ctx.restore();
      });

      // 4. Draw Obstacles
      g.obstacles.forEach((o) => {
        ctx.save();
        ctx.translate(o.x, o.y);

        if (o.type === 'spike') {
          // Red Packet Loss Spikes
          ctx.beginPath();
          ctx.moveTo(0, 24);
          ctx.lineTo(12, 0);
          ctx.lineTo(24, 24);
          ctx.closePath();
          ctx.fillStyle = '#EF4444';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000000';
          ctx.stroke();

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 8px monospace';
          ctx.fillText('LOSS', 2, 18);
        } else {
          // Sea Anchor
          ctx.beginPath();
          ctx.arc(12, 6, 6, 0, Math.PI * 2);
          ctx.rect(9, 6, 6, 16);
          ctx.fillStyle = '#475569';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#000000';
          ctx.stroke();
        }
        ctx.restore();
      });

      // 5. Draw Duck Surfer (Player)
      const duckX = 80;
      const duckY = g.duckY;

      if (g.flicker === 0 || Math.floor(tick / 4) % 2 === 0) {
        ctx.save();
        ctx.translate(duckX, duckY);

        // Powerup Aura
        if (g.powerupTimer > 0) {
          ctx.beginPath();
          ctx.arc(0, 0, 30, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(168, 85, 247, 0.35)';
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#A855F7';
          ctx.stroke();
        }

        // Surfboard
        ctx.beginPath();
        ctx.ellipse(0, 16, 26, 6, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#F43F5E';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Duck Body
        ctx.beginPath();
        ctx.ellipse(-2, 4, 15, 11, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FACC15';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#000000';
        ctx.stroke();

        // Duck Head
        ctx.beginPath();
        ctx.arc(8, -8, 10, 0, Math.PI * 2);
        ctx.fillStyle = '#FACC15';
        ctx.fill();
        ctx.stroke();

        // Duck Beak
        ctx.beginPath();
        ctx.moveTo(14, -8);
        ctx.lineTo(22, -6);
        ctx.lineTo(14, -3);
        ctx.closePath();
        ctx.fillStyle = '#F97316';
        ctx.fill();
        ctx.stroke();

        // Eye
        ctx.beginPath();
        ctx.arc(10, -10, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [highScore]);

  return (
    <section id="game-pantai" className="py-14 border-t-4 border-black bg-[#FFFDF7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>MINI GAME PESISIR TKJ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Bebek Pesisir: <span className="bg-sky-300 px-2 border-2 border-black">Packet Surfer</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#FAF5E6] border-2 border-black px-3 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#000]">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Best: {highScore}</span>
            </div>
          </div>
        </div>

        {/* Arcade Cabinet Screen */}
        <div className="relative bg-slate-900 border-4 border-black p-3 sm:p-5 shadow-[10px_10px_0px_#000] rounded-xl select-none">
          {/* Top Status Bar in Arcade */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-slate-700 text-xs font-mono text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded border border-slate-600">
                <span className="text-amber-400 font-bold">SKOR:</span>
                <span className="text-white font-black text-sm">{score}</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded border border-slate-600">
                <span className="text-sky-400 font-bold">COMBO:</span>
                <span className="text-emerald-400 font-black">{combo}x</span>
              </div>
              {powerupActive && (
                <div className="flex items-center gap-1 bg-purple-600 px-2 py-1 rounded text-[10px] font-black animate-pulse">
                  <Zap className="w-3 h-3" /> FIBER SHIELD
                </div>
              )}
            </div>

            {/* Lives */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={`text-base transition-opacity ${
                    i < lives ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  ❤️
                </span>
              ))}
            </div>
          </div>

          {/* Canvas Screen */}
          <div className="relative w-full overflow-hidden rounded-lg border-2 border-black bg-sky-200">
            <canvas
              ref={canvasRef}
              width={760}
              height={260}
              className="w-full h-auto block cursor-pointer"
              onClick={jump}
              onTouchStart={(e) => {
                e.preventDefault();
                jump();
              }}
            />

            {/* Overlay if IDLE */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
                <div className="text-4xl mb-2 animate-bounce">🏄‍♂️🦆</div>
                <h3 className="text-xl sm:text-2xl font-black text-white font-mono mb-1">
                  BEBEK PACKET SURFER
                </h3>
                <p className="text-xs font-mono text-slate-200 max-w-sm mb-4">
                  Bantu bebek berselancar di ombak! Ambil paket ICMP 🟢, WiFi 🟡, & Fiber 🟣, hindari Packet Loss 🔴!
                </p>
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-black font-mono font-black text-sm border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all"
                >
                  MULAI MAIN SEKARANG 🎮
                </button>
                <div className="text-[11px] font-mono text-slate-300 mt-3">
                  Tekan <span className="bg-white/20 px-1 rounded">SPASI</span> / <span className="bg-white/20 px-1 rounded">KLIK LAYAR</span> untuk Melompat
                </div>
              </div>
            )}

            {/* Overlay if GAMEOVER */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center animate-in fade-in">
                <div className="text-3xl mb-1">💥</div>
                <h3 className="text-2xl font-black text-rose-500 font-mono mb-1">
                  PACKET CRASH!
                </h3>
                <p className="text-sm font-mono text-white mb-2">
                  Skor Anda: <strong className="text-amber-400 text-lg">{score}</strong>
                </p>
                <p className="text-xs font-mono text-slate-300 max-w-xs mb-4 italic">
                  "{score > 150 ? 'Luar biasa! Refleks jaringan Anda setara Router Core 10 Gbps!' : 'Koneksi terputus! Yuk coba selancar lagi!'}"
                </p>
                <button
                  onClick={startGame}
                  className="px-5 py-2.5 bg-sky-400 hover:bg-sky-500 text-black font-mono font-black text-sm border-3 border-black shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>MAIN LAGI</span>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Game Controls Bar */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="bg-slate-800 px-2 py-0.5 rounded text-amber-300 border border-slate-700">
                KONTROL: KLIK / SENTUH / SPASI
              </span>
              <span>Lompat 2x (Double Jump) Aktif</span>
            </div>
            <div className="text-emerald-400">
              Web Audio API SFX Enabled 🔊
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
