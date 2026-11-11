import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { MAULANA_PHOTO_BASE64 } from '../data/maulanaPhoto';
import { BookOpen, Award, Server, Wifi, Cpu, Layers, CheckCircle2, Sparkles, UserCheck, Maximize2, X } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { ScrollReveal } from './ScrollReveal';

export const ProfileSection: React.FC = () => {
  const [photoStyle, setPhotoStyle] = useState<'photo' | 'avatar'>('photo');
  const [isPhotoZoomed, setIsPhotoZoomed] = useState(false);

  return (
    <section id="profil" className="py-16 sm:py-20 border-t-4 border-black bg-[#FAF6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
                02 // PROFIL PENGEMBANG
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Tentang <span className="bg-sky-300 px-2 border-2 border-black">{PERSONAL_INFO.name}</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base font-mono font-semibold text-slate-700 max-w-md">
              Mengenal lebih dekat dedikasi, latar belakang pendidikan, dan fokus keahlian di bidang Teknik Komputer & Jaringan.
            </p>
          </div>
        </ScrollReveal>

        {/* Main Grid: Photo & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column: Photo & Identity Card */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-right" delay={120} duration={750}>
              <div className="space-y-4">
                <div className="bg-[#FFFDF7] border-4 border-black p-6 shadow-[8px_8px_0px_#000] relative">
                  {/* Badge top corner */}
                  <div className="absolute -top-4 -right-3 bg-rose-500 text-white border-2 border-black px-3 py-1 text-xs font-mono font-black shadow-[2px_2px_0px_#000] rotate-2">
                    SMK TELKOM MALANG
                  </div>

              {/* Photo Display Area */}
              <div className="relative aspect-[4/5] w-full bg-gradient-to-br from-amber-100 via-sky-100 to-cyan-200 border-3 border-black overflow-hidden flex flex-col items-center justify-center">
                {photoStyle === 'photo' ? (
                  /* Real Photo of Maulana in SMK Telkom Uniform */
                  <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPhotoZoomed(true)}>
                    <img
                      src={MAULANA_PHOTO_BASE64}
                      alt="Maulana Ichsan - SMK Telkom Malang"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Overlay Tag */}
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-sm p-2 text-white border-t-2 border-black flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-mono font-bold text-amber-300">
                          {PERSONAL_INFO.name}
                        </div>
                        <div className="text-[9px] font-mono text-slate-300">
                          Seragam Resmi Moklet • X TKJ 1
                        </div>
                      </div>
                      <span className="p-1 bg-white/20 hover:bg-white/40 rounded text-[10px] font-mono flex items-center gap-1">
                        <Maximize2 className="w-3 h-3" /> Perbesar
                      </span>
                    </div>
                  </div>
                ) : (
                  /* Illustrated Neo-Brutalist Avatar */
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                    <div className="absolute -top-4 -left-4 w-28 h-28 rounded-full bg-amber-300 border-2 border-black -z-0"></div>
                    <div className="absolute top-8 right-4 text-2xl select-none">🌴</div>
                    <div className="absolute bottom-6 left-6 text-xl select-none">🌊</div>

                    <svg className="w-48 h-48 z-10 drop-shadow-[4px_4px_0px_#000]" viewBox="0 0 160 160" fill="none">
                      <path d="M40 160C40 130 55 110 80 110C105 110 120 130 120 160" fill="#1E3A8A" stroke="#000" strokeWidth="4" />
                      <polygon points="80,122 66,110 94,110" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
                      <polygon points="80,128 72,110 88,110" fill="#DC2626" />
                      <rect x="70" y="94" width="20" height="20" fill="#FBBF24" stroke="#000" strokeWidth="3.5" />
                      <ellipse cx="80" cy="70" rx="34" ry="38" fill="#FDE68A" stroke="#000" strokeWidth="4" />
                      <path d="M44 68C44 40 60 28 80 28C100 28 116 40 116 68C116 54 104 38 80 38C56 38 44 54 44 68Z" fill="#1E293B" stroke="#000" strokeWidth="4" />
                      <circle cx="44" cy="74" r="8" fill="#FDE68A" stroke="#000" strokeWidth="3.5" />
                      <circle cx="116" cy="74" r="8" fill="#FDE68A" stroke="#000" strokeWidth="3.5" />
                      <rect x="54" y="60" width="20" height="16" rx="4" fill="#E0F2FE" stroke="#000" strokeWidth="3.5" />
                      <rect x="86" y="60" width="20" height="16" rx="4" fill="#E0F2FE" stroke="#000" strokeWidth="3.5" />
                      <line x1="74" y1="68" x2="86" y2="68" stroke="#000" strokeWidth="3.5" />
                      <circle cx="64" cy="68" r="3" fill="#000" />
                      <circle cx="96" cy="68" r="3" fill="#000" />
                      <path d="M68 86C74 94 86 94 92 86" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>

                    <div className="absolute bottom-2 bg-[#FFFDF7] border-2 border-black px-2.5 py-0.5 text-[10px] font-mono font-black shadow-[2px_2px_0px_#000]">
                      ILUSTRASI AVATAR RESMI
                    </div>
                  </div>
                )}
              </div>

              {/* Toggle Photo Mode */}
              <div className="mt-4 flex items-center justify-between gap-2 border-t-2 border-black pt-3">
                <span className="text-xs font-mono font-bold text-slate-700">Mode Foto:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setPhotoStyle('photo');
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold border-2 border-black transition-all ${
                      photoStyle === 'photo' ? 'bg-sky-400 text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-slate-700'
                    }`}
                  >
                    Foto Siswa Asli 📸
                  </button>
                  <button
                    onClick={() => {
                      soundEngine.playPop();
                      setPhotoStyle('avatar');
                    }}
                    className={`px-3 py-1 text-xs font-mono font-bold border-2 border-black transition-all ${
                      photoStyle === 'avatar' ? 'bg-amber-300 text-black shadow-[2px_2px_0px_#000]' : 'bg-white text-slate-700'
                    }`}
                  >
                    Ilustrasi Avatar
                  </button>
                </div>
              </div>

              {/* Student Identity Mini Card */}
              <div className="mt-4 bg-[#FAF5E6] border-2 border-black p-3.5 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between border-b border-black/10 pb-1">
                  <span className="text-slate-500">Nama Siswa:</span>
                  <span className="font-bold text-slate-900">{PERSONAL_INFO.name}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 py-1">
                  <span className="text-slate-500">Tingkat / Kelas:</span>
                  <span className="font-bold text-slate-900">{PERSONAL_INFO.grade}</span>
                </div>
                <div className="flex justify-between border-b border-black/10 py-1">
                  <span className="text-slate-500">Program Keahlian:</span>
                  <span className="font-bold text-slate-900">{PERSONAL_INFO.major}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Sekolah Asal:</span>
                  <span className="font-bold text-sky-800">{PERSONAL_INFO.school}</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
          </div>

          {/* Right Column: Bio Narrative & Strengths */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-left" delay={180} duration={750}>
              <div className="space-y-6">
            <div className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
              <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <span>Visi & Minat Kejuruan</span>
                <span className="text-amber-500">✨</span>
              </h3>
              <p className="text-slate-800 font-medium leading-relaxed mb-4 text-base">
                {PERSONAL_INFO.bio}
              </p>
              <p className="text-slate-700 leading-relaxed text-sm mb-6">
                Sebagai siswa SMK Telkom Malang, saya dilatih untuk memiliki kedisiplinan tinggi, pemikiran analitis sistematis, serta adaptabilitas cepat terhadap teknologi terkini. Pendekatan saya dalam memecahkan masalah jaringan selalu berorientasi pada kestabilan, efisiensi alokasi bandwidth, dan keamanan data.
              </p>

              {/* Motto Box */}
              <div className="bg-sky-100 border-2 border-black p-4 mb-6 relative">
                <div className="text-[11px] font-mono font-bold text-sky-900 uppercase mb-1">
                  Prinsip Belajar
                </div>
                <p className="text-slate-900 font-serif italic text-base">
                  "{PERSONAL_INFO.motto}"
                </p>
              </div>

              {/* 4 Pillars of Excellence */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3 bg-[#FAF5E6] border-2 border-black flex items-start gap-3 hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all">
                  <div className="p-2 bg-amber-300 border border-black shrink-0">
                    <Wifi className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-900">Arsitektur Jaringan</div>
                    <div className="text-[11px] text-slate-600">Perancangan VLAN, Subnetting VLSM, dan routing dinamis OSPF.</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5E6] border-2 border-black flex items-start gap-3 hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all">
                  <div className="p-2 bg-emerald-300 border border-black shrink-0">
                    <Server className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-900">Server & Virtualisasi</div>
                    <div className="text-[11px] text-slate-600">Sistem Linux Debian, Docker Compose, dan Nginx Reverse Proxy.</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5E6] border-2 border-black flex items-start gap-3 hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all">
                  <div className="p-2 bg-sky-300 border border-black shrink-0">
                    <Layers className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-900">Web Interface Modern</div>
                    <div className="text-[11px] text-slate-600">Pemanfaatan React, TypeScript, & Tailwind untuk monitoring visual.</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5E6] border-2 border-black flex items-start gap-3 hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all">
                  <div className="p-2 bg-rose-300 border border-black shrink-0">
                    <Award className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="font-mono font-bold text-xs text-slate-900">Etos Kerja Telkom</div>
                    <div className="text-[11px] text-slate-600">Integritas, kepedulian terhadap standar kerapian lab, & kerja tim.</div>
                  </div>
                </div>
              </div>

              {/* Animated Interactive Coastal Lighthouse Banner */}
              <div
                onClick={() => soundEngine.playPowerup()}
                className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 border-3 border-black p-4 text-white shadow-[4px_4px_0px_#000] cursor-pointer group"
              >
                {/* Rotating Lighthouse Light Beam */}
                <div className="absolute top-1/2 left-8 w-44 h-44 -translate-y-1/2 pointer-events-none opacity-40">
                  <div className="w-full h-full animate-beam bg-gradient-to-r from-amber-300/60 to-transparent clip-path-polygon"></div>
                </div>

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-400 text-black border-2 border-black rounded-lg flex items-center justify-center text-2xl shadow-[2px_2px_0px_#000] group-hover:scale-110 transition-transform">
                      🗼
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-xs text-amber-300">MERCUSUAR PANTAI MOKLET</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      </div>
                      <div className="text-xs text-slate-200 font-mono">
                        Memandu koneksi stabil SMK Telkom Malang dengan sinyal 1 Gbps & zero loss.
                      </div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block px-2.5 py-1 bg-amber-300 text-black font-mono font-black text-[10px] border border-black rounded shadow-[2px_2px_0px_#000]">
                    KLIK BEACON ✨
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  </div>

      {/* Photo Zoom Modal */}
      {isPhotoZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsPhotoZoomed(false)}
        >
          <div
            className="relative bg-white border-4 border-black p-2 max-w-md w-full shadow-[10px_10px_0px_#F59E0B]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsPhotoZoomed(false)}
              className="absolute -top-4 -right-4 p-2 bg-rose-500 text-white border-2 border-black shadow-[2px_2px_0px_#000] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={MAULANA_PHOTO_BASE64}
              alt="Maulana Ichsan"
              className="w-full h-auto rounded border border-black"
            />
            <div className="p-3 text-center font-mono">
              <div className="font-black text-slate-900 text-sm">
                {PERSONAL_INFO.name}
              </div>
              <div className="text-xs text-slate-600">
                Siswa Kelas X TKJ 1 • SMK Telkom Malang
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
