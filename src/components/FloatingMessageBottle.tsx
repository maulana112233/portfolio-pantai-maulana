import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Send, Compass, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';

const SECRET_MESSAGES = [
  {
    title: 'Filosofi Jaringan & Ombak Laut 🌊',
    message: 'Jaringan komputer itu mirip seperti ombak pesisir: paket data mengalir tanpa henti melintasi samudra kabel, switch menjaga arah aliran, dan router adalah mercusuar yang memandu paket sampai ke pelabuhan tujuan dengan zero packet loss.',
    author: 'Catatan Lab Maulana',
    tag: '#TeknikKomputerJaringan',
  },
  {
    title: 'Tips Sakti Praktikum TKJ Moklet 🛠️',
    message: 'Kalau koneksi jaringanmu tiba-tiba putus, jangan panik! Selalu ingat urutan sakti: (1) Periksa lampu LED indikator kabel LAN, (2) Cek konfigurasi IP & Gateway, (3) Ping localhost & default route. Tetap tenang seperti karang di tepi pantai.',
    author: 'Tips Praktikum X TKJ 1',
    tag: '#CiscoPacketTracer',
  },
  {
    title: 'Semangat Khas Siswa Telkom 🚀',
    message: 'Sebagai siswa SMK Telkom Malang, kita diajarkan untuk selalu disiplin, rapi dalam merakit kabel lab, dan berani mencoba teknologi masa depan. Dari desa hingga NASA, tak ada batasan bagi mereka yang tekun belajar!',
    author: 'Visi Siswa SMK Telkom',
    tag: '#MokletPride',
  },
  {
    title: 'Keamanan Siber & Bug Bounty 🛡️',
    message: 'Keamanan informasi bukan hanya soal memasang firewall yang tebal, melainkan kesadaran untuk memetakan seluruh attack surface dan menutup celah sebelum ombak peretas datang. Stay curious, stay ethical!',
    author: 'Cybersecurity Enthusiast',
    tag: '#Linuxhackingid',
  },
  {
    title: 'Motto Pesisir Pelajar 🏖️',
    message: 'Ombak yang tenang tidak pernah menghasilkan pelaut yang tangguh. Setiap error konfigurasi OSPF atau VLAN adalah latihan ombak yang menempa kita menjadi network engineer yang hebat!',
    author: 'Motto Maulana Ichsan',
    tag: '#CoastalVibes',
  },
];

export const FloatingMessageBottle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasUnread, setHasUnread] = useState(true);

  const handleOpen = () => {
    soundEngine.playPop();
    setHasUnread(false);
    setIsOpen(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: 0.15, y: 0.8 },
        colors: ['#38BDF8', '#F59E0B', '#10B981', '#F43F5E'],
      });
    } catch {
      // ignore
    }
  };

  const handleNextMessage = () => {
    soundEngine.playWaterDrop();
    setCurrentIndex((prev) => (prev + 1) % SECRET_MESSAGES.length);
  };

  const currentMsg = SECRET_MESSAGES[currentIndex];

  return (
    <>
      {/* Floating Bobbing Bottle in Viewport */}
      <div className="fixed bottom-20 left-6 z-40 pointer-events-auto">
        <button
          onClick={handleOpen}
          className="group relative flex items-center gap-2 bg-[#FFFDF7] hover:bg-amber-100 border-3 border-black p-2.5 shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer animate-buoy"
          title="Klik untuk membuka Botol Pesan Pesisir Rahasia!"
        >
          {/* Notification Ping if unread */}
          {hasUnread && (
            <span className="absolute -top-2 -right-2 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 border border-black text-[9px] text-white font-black items-center justify-center">
                !
              </span>
            </span>
          )}

          <div className="w-9 h-9 rounded-full bg-amber-200 border-2 border-black flex items-center justify-center text-xl group-hover:scale-125 transition-transform">
            🍾
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-[10px] font-mono font-black text-amber-800 uppercase tracking-wider">
              PESAN BOTOL
            </span>
            <span className="text-xs font-mono font-bold text-slate-900 group-hover:text-sky-700">
              Buka Catatan 📜
            </span>
          </div>
        </button>
      </div>

      {/* Secret Message Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

          <div className="relative z-10 w-full max-w-lg bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_#000] space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b-3 border-black pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-amber-300 border-2 border-black flex items-center justify-center text-xl shadow-[2px_2px_0px_#000]">
                  🍾
                </div>
                <div>
                  <h3 className="font-mono font-black text-base text-slate-900">
                    Surat Pesisir Terbuka!
                  </h3>
                  <p className="font-mono text-xs text-slate-600">
                    Pesan rahasia dari Maulana Ichsan • Moklet X TKJ 1
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setIsOpen(false);
                }}
                className="w-8 h-8 bg-rose-400 hover:bg-rose-500 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
                title="Tutup (ESC)"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Vintage Parchment Content Box */}
            <div className="relative bg-[#FAF5E6] border-3 border-black p-5 shadow-[4px_4px_0px_#000] space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-black/15 pb-2">
                <span className="font-mono font-black text-xs text-sky-800">
                  {currentMsg.title}
                </span>
                <span className="bg-amber-200 border border-black text-[10px] font-mono px-2 py-0.5 font-bold">
                  {currentMsg.tag}
                </span>
              </div>

              <p className="text-slate-800 text-sm leading-relaxed font-medium italic">
                "{currentMsg.message}"
              </p>

              <div className="pt-2 text-right">
                <span className="font-mono text-xs text-slate-600 font-bold">
                  — {currentMsg.author}
                </span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={handleNextMessage}
                className="flex items-center gap-2 bg-sky-300 hover:bg-sky-400 text-black border-2 border-black px-4 py-2 text-xs font-mono font-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Pesan Lain ({currentIndex + 1}/{SECRET_MESSAGES.length}) 🌊</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  setIsOpen(false);
                }}
                className="bg-white hover:bg-slate-100 text-slate-800 border-2 border-black px-4 py-2 text-xs font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                Tutup Botol
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
