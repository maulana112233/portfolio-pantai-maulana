import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Send, Github, Linkedin, MessageSquare, Instagram, RefreshCw, Sparkles, CheckCircle2, ShieldAlert, Video } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/soundEffects';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', category: 'Kolaborasi Proyek', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    soundEngine.playPop();
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#0284C7', '#F59E0B', '#10B981', '#EC4899'],
      });
    } catch {
      // ignore
    }

    setIsSent(true);
  };

  const resetForm = () => {
    setFormData({ name: '', category: 'Kolaborasi Proyek', message: '' });
    setIsSent(false);
  };

  return (
    <section id="kontak" className="py-16 sm:py-20 border-t-4 border-black bg-[#FAF6EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-block px-3 py-1 bg-amber-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
                06 // DOCK KONTAK & DISKUSI
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Terhubung dengan <span className="bg-sky-300 px-2 border-2 border-black">{PERSONAL_INFO.name}</span>
              </h2>
            </div>
            <div className="p-2.5 bg-[#FFFDF7] border-2 border-black shadow-[3px_3px_0px_#000] max-w-md text-xs font-mono text-slate-700">
              <span className="font-bold text-amber-700">🔒 Privasi Terjaga:</span> Komunikasi profesional difasilitasi melalui form pesan langsung dan kanal media sosial terverifikasi.
            </div>
          </div>
        </ScrollReveal>

        {/* Bento Dock Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-right" delay={120} duration={750}>
              <div className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between pb-4 border-b-2 border-black/15 mb-6">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Kirim Pesan Langsung
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Tinggalkan pesan, saran, atau peluang kolaborasi seputar TKJ.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-200 border border-black text-xs font-mono font-bold">
                Online
              </span>
            </div>

            {isSent ? (
              <div className="bg-emerald-50 border-3 border-black p-8 text-center space-y-4 shadow-[4px_4px_0px_#000]">
                <div className="w-16 h-16 bg-emerald-300 border-2 border-black rounded-full flex items-center justify-center mx-auto text-2xl shadow-[2px_2px_0px_#000]">
                  🎉
                </div>
                <h4 className="text-xl font-black text-slate-950">
                  Pesan Berhasil Terkirim!
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 font-mono max-w-md mx-auto">
                  Terima kasih <strong className="text-black">{formData.name}</strong> telah menyapa {PERSONAL_INFO.name}. Pesan Anda telah dicatat ke dalam antrean komunikasi terminal.
                </p>
                <button
                  onClick={resetForm}
                  className="px-5 py-2.5 bg-slate-900 text-white font-mono font-bold text-xs border-2 border-black shadow-[3px_3px_0px_#000] hover:bg-slate-800 transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                    Nama Anda / Institusi
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Bpk. Kurniawan / Rekan Lab TKJ"
                    className="w-full px-4 py-2.5 bg-white border-2 border-black font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-amber-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                    Kategori Keperluan
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border-2 border-black font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="Kolaborasi Proyek">Kolaborasi Proyek Jaringan</option>
                    <option value="Diskusi Teknis">Diskusi Teknis Linux & Cisco</option>
                    <option value="Undangan Belajar">Sharing Session / Belajar Bareng</option>
                    <option value="Apresiasi Portofolio">Apresiasi & Saran Portofolio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1">
                    Isi Pesan
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tuliskan pesan Anda secara ringkas dan ramah..."
                    className="w-full px-4 py-2.5 bg-white border-2 border-black font-sans text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-amber-50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-300 hover:bg-amber-400 text-black font-mono font-black text-sm border-3 border-black shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke Terminal {PERSONAL_INFO.shortName}</span>
                </button>
              </form>
            )}
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3D Flip Card & Social Bento Dock */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-left" delay={180} duration={750}>
              <div className="space-y-6">
            {/* 3D Card Flip: Developer Note */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase">
                  Catatan Developer 3D (Klik Kartu Untuk Membalik)
                </span>
                <span className="text-[11px] font-mono text-sky-700 font-bold flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Flip
                </span>
              </div>

              <div
                className="perspective-1000 cursor-pointer h-64"
                onClick={() => {
                  soundEngine.playPop();
                  setIsFlipped(!isFlipped);
                }}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden bg-[#FFFDF7] border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
                        <span className="font-mono font-black text-xs text-amber-900">
                          NOTE-01 // DEPAN
                        </span>
                        <span className="text-lg">🏖️</span>
                      </div>
                      <h4 className="font-black text-lg text-slate-900 mb-2">
                        Semangat Pesisir & Logika Jaringan
                      </h4>
                      <p className="text-xs font-medium text-slate-700 leading-relaxed">
                        "Seperti ombak pantai yang tak pernah berhenti menyapa daratan, setiap paket data yang kita rutekan adalah dedikasi tanpa henti untuk menghubungkan manusia."
                      </p>
                    </div>
                    <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-mono text-slate-500 font-bold">
                      <span>{PERSONAL_INFO.name} • X TKJ 1</span>
                      <span className="text-sky-600 underline">Klik untuk balik ↻</span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 text-white border-4 border-black p-6 shadow-[8px_8px_0px_#000] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-2 mb-3">
                        <span className="font-mono font-black text-xs text-emerald-400">
                          DEV-MANIFESTO // BELAKANG
                        </span>
                        <span className="text-lg">⚙️</span>
                      </div>
                      <h4 className="font-black text-lg text-white mb-2">
                        Prinsip Teknis {PERSONAL_INFO.name}
                      </h4>
                      <ul className="text-xs font-mono space-y-1.5 text-slate-300">
                        <li>• Bersihkan kabel lab sebelum pulang.</li>
                        <li>• Simpan dokumentasi konfigurasi router.</li>
                        <li>• Always ping first before panic!</li>
                        <li>• Menjunjung tinggi nama SMK Telkom Malang.</li>
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>Moklet Excellence</span>
                      <span className="text-amber-400 underline">Klik balik ↻</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels Bento Grid */}
            <div className="bg-[#FFFDF7] border-4 border-black p-6 shadow-[8px_8px_0px_#000] space-y-3">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                Kanal Portofolio & Komunitas
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {PERSONAL_INFO.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-[#FAF5E6] hover:bg-sky-200 border-2 border-black flex items-center gap-2.5 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
                  >
                    <div className="p-1.5 bg-white border border-black">
                      {social.name === 'Instagram' && <Instagram className="w-4 h-4 text-rose-600" />}
                      {social.name === 'TikTok' && <Video className="w-4 h-4 text-black" />}
                      {social.name === 'GitHub' && <Github className="w-4 h-4 text-black" />}
                      {social.name === 'LinkedIn' && <Linkedin className="w-4 h-4 text-blue-700" />}
                      {social.name === 'Discord' && <MessageSquare className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-mono font-black text-xs text-slate-900 truncate">{social.name}</div>
                      <div className="text-[10px] font-mono text-slate-500 truncate">{social.handle}</div>
                    </div>
                  </a>
                ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};
