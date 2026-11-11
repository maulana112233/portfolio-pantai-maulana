import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Volume2, VolumeX, ArrowRight, ShieldCheck, Waves, Key, Radio, Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

interface OpeningAnimationProps {
  onComplete: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({ onComplete }) => {
  const [bootStep, setBootStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Wave Radar Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw cyber ocean radar grid lines
      ctx.strokeStyle = 'rgba(2, 132, 199, 0.15)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw multi-layered animated sine sonar waves
      for (let layer = 0; layer < 4; layer++) {
        ctx.beginPath();
        ctx.strokeStyle = layer % 2 === 0 ? 'rgba(14, 165, 233, 0.4)' : 'rgba(245, 158, 11, 0.35)';
        ctx.lineWidth = 2.5;

        const baseY = canvas.height * (0.65 + layer * 0.08);
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = baseY + Math.sin(x * 0.012 + t * (1.2 + layer * 0.3)) * (18 + layer * 6);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Boot sequence steps
  const bootLogs = [
    "INIT: Menghubungkan ke Stasiun Pesisir SMK Telkom Malang...",
    "VLAN: Menyiapkan routing multi-lantai & Cisco OSPF backbone...",
    "INTERFACE: Memuat modul HTML5 Canvas 2D & interaktif huruf...",
    "SECURITY: Handshake protokol jaringan terverifikasi • 0% Packet Loss...",
    "READY: Stasiun Pesisir Maulana Ichsan siap digunakan!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setIsAuthenticated(true);
          return 100;
        }
        const next = p + 4;
        const currentStep = Math.min(Math.floor((next / 100) * bootLogs.length), bootLogs.length - 1);
        setBootStep(currentStep);
        return next;
      });
    }, 70);

    return () => clearInterval(timer);
  }, []);

  const handleLoginClick = () => {
    soundEngine.playPowerup();
    soundEngine.playWaterSplash();

    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#0284C7', '#F59E0B', '#10B981', '#38BDF8', '#FF6B6B'],
      });
    } catch {
      // ignore
    }

    setIsOpening(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  const toggleSound = () => {
    const playing = soundEngine.toggleBeachAmbient();
    setSoundActive(playing);
    soundEngine.playPop();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#FFFDF7] overflow-hidden transition-all duration-700 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Interactive Radar Canvas */}
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-50"
      />

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 bg-[#FAF5E6] border-2 border-black px-3 py-1 font-mono text-xs font-bold shadow-[3px_3px_0px_#000]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span>NODE: COASTAL-MOKLET-X-TKJ-1</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-100 border-2 border-black text-xs font-mono font-bold shadow-[2px_2px_0px_#000] transition-colors"
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-700" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundActive ? 'Suara Ombak ON' : 'Suara Ombak'}</span>
          </button>

          <button
            onClick={onComplete}
            className="px-3 py-1 bg-amber-300 hover:bg-amber-400 text-black border-2 border-black text-xs font-mono font-bold shadow-[2px_2px_0px_#000] transition-colors"
          >
            Lewati ⏩
          </button>
        </div>
      </div>

      {/* Main Terminal Login Cabinet */}
      <div className="relative max-w-xl w-full bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 shadow-[12px_12px_0px_#000] z-10 text-left">
        {/* Top Cabinet Header */}
        <div className="bg-slate-900 border-2 border-black px-4 py-2.5 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 mb-6 flex items-center justify-between text-white font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 border border-black inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-400 border border-black inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black inline-block"></span>
            <span className="ml-2 font-black tracking-wider text-amber-300">
              MOKLET COASTAL TERMINAL OS // v2.6
            </span>
          </div>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-sky-400 border border-slate-700">
            PORT 443 SECURE
          </span>
        </div>

        {/* Big Station Greeting */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-300 border border-black text-[11px] font-mono font-black shadow-[2px_2px_0px_#000]">
            <Radio className="w-3 h-3 text-black animate-pulse" />
            <span>PORTAL PORTOFOLIO PESISIR PANTAI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
            Maulana <span className="bg-sky-300 px-2 border-2 border-black">Ichsan</span>
          </h2>
          <p className="text-xs font-mono text-slate-600 font-bold">
            Siswa Kelas X TKJ 1 • SMK Telkom Malang
          </p>
        </div>

        {/* Live Terminal Diagnostic Box */}
        <div className="bg-slate-950 border-3 border-black p-4 rounded mb-6 font-mono text-xs text-slate-300 space-y-1.5 shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-1 mb-2">
            <span>DIAGNOSTIK KONEKSI</span>
            <span className="text-emerald-400 font-bold">PING 0.8ms</span>
          </div>
          {bootLogs.slice(0, bootStep + 1).map((log, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-emerald-400 font-bold shrink-0">➜</span>
              <span className={idx === bootStep ? 'text-amber-300 font-semibold' : 'text-slate-400'}>
                {log}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-700">
            <span>Status Inisialisasi Sistem</span>
            <span className="text-sky-700 font-black">{progress}%</span>
          </div>
          <div className="w-full h-4 bg-[#FAF5E6] border-2 border-black p-0.5 shadow-[2px_2px_0px_#000]">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400 transition-all duration-150 border-r border-black"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Interactive Login Action Button */}
        {isAuthenticated ? (
          <button
            onClick={handleLoginClick}
            className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-500 text-black font-mono font-black text-sm sm:text-base border-3 border-black shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-3 animate-bounce"
          >
            <Unlock className="w-5 h-5 text-black" />
            <span>LOGIN // MASUK KE WEBSITE PORTOFOLIO 🏖️🌊</span>
          </button>
        ) : (
          <div className="w-full py-3.5 px-4 bg-slate-100 border-2 border-black text-slate-500 font-mono font-bold text-xs flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-slate-400 animate-pulse" />
            <span>Menunggu otorisasi sinyal pesisir... ({progress}%)</span>
          </div>
        )}

        {/* Bottom Specs Note */}
        <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-slate-500 font-semibold">
          <span>Teknik Komputer & Jaringan</span>
          <span className="text-emerald-700 font-bold">✓ Arsitektur React 19</span>
        </div>
      </div>
    </div>
  );
};
