import React, { useState } from 'react';
import { Award, ShieldCheck, ExternalLink, Eye, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { CERTIFICATES_DATA, CertificateItem } from '../data/certificateData';
import { CertificateModal } from './CertificateModal';
import { ScrollReveal } from './ScrollReveal';
import { soundEngine } from '../utils/soundEffects';
import { InteractiveCrab, InteractiveStarfish } from './BeachCritters';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Sertifikat (4)' },
    { id: 'cyber', label: 'Keamanan Siber (2)' },
    { id: 'data', label: 'Data Analytics (1)' },
    { id: 'telkom', label: 'Inovasi Digital (1)' },
  ];

  const filteredCertificates = CERTIFICATES_DATA.filter((cert) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'cyber') return cert.category.toLowerCase().includes('cybersecurity') || cert.category.toLowerCase().includes('bug bounty');
    if (activeCategory === 'data') return cert.category.toLowerCase().includes('data analytics');
    if (activeCategory === 'telkom') return cert.category.toLowerCase().includes('innovation') || cert.organizer.toLowerCase().includes('telkom');
    return true;
  });

  const handleOpenModal = (cert: CertificateItem) => {
    soundEngine.playCoin();
    setSelectedCert(cert);
  };

  return (
    <section id="sertifikat" className="py-20 px-4 sm:px-8 bg-[#FFFDF7] relative overflow-hidden border-b-4 border-black">
      {/* Background Decorative Beach Shells & Float Elements */}
      <div className="absolute top-8 left-10 text-4xl opacity-15 pointer-events-none select-none animate-bobbing">
        📜
      </div>
      <div className="absolute bottom-12 right-12 text-5xl opacity-15 pointer-events-none select-none animate-buoy">
        🏅
      </div>
      <div className="absolute top-1/2 right-4 text-3xl opacity-10 pointer-events-none select-none">
        🐚
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-300 border-2 border-black px-3.5 py-1 text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
              <Award className="w-4 h-4 text-black" />
              <span>DOKUMEN PRESTASI & LISENSI RESMI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-mono tracking-tight text-slate-900 mb-4">
              Sertifikasi & Kredensial
            </h2>
            <p className="font-sans text-sm sm:text-base text-slate-700 leading-relaxed">
              Bukti validasi dedikasi kompetensi teknologi di bidang{' '}
              <strong className="text-black bg-sky-200 px-1 border border-black">Keamanan Siber</strong>,{' '}
              <strong className="text-black bg-emerald-200 px-1 border border-black">Data Analytics</strong>, dan{' '}
              <strong className="text-black bg-amber-200 px-1 border border-black">Inovasi Digital</strong>{' '}
              yang diselenggarakan oleh institusi terkemuka nasional.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    soundEngine.playPop();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 font-mono text-xs font-bold border-2 border-black transition-all ${
                    activeCategory === cat.id
                      ? 'bg-sky-400 text-black shadow-[3px_3px_0px_#000] -translate-y-0.5'
                      : 'bg-white text-slate-700 hover:bg-amber-100 shadow-[1px_1px_0px_#000]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 4 Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredCertificates.map((cert, index) => (
            <ScrollReveal
              key={cert.id}
              animation={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              delay={index * 120}
              duration={750}
            >
              <div
                className="group bg-[#FAF5E6] border-4 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000] hover:shadow-[10px_10px_0px_#000] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
              >
                {/* Top Badge & Date */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="bg-amber-300 text-black px-2.5 py-1 border-2 border-black font-mono font-black text-xs shadow-[2px_2px_0px_#000]">
                      {cert.badge}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-600 bg-white px-2 py-0.5 border border-black">
                      📅 {cert.date}
                    </span>
                  </div>

                  {/* Thumbnail Preview with Click-to-Zoom Overlay */}
                  <div
                    onClick={() => handleOpenModal(cert)}
                    className="relative w-full aspect-[4/3] bg-slate-900 border-3 border-black overflow-hidden mb-5 cursor-pointer group/img"
                  >
                    <img
                      src={cert.imageSrc}
                      alt={cert.title}
                      className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <div className="bg-amber-300 text-black px-3.5 py-2 border-2 border-black font-mono font-black text-xs shadow-[3px_3px_0px_#000] flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>Klik untuk Perbesar Kredensial</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Organizer */}
                  <h3 className="font-mono font-black text-lg sm:text-xl text-slate-900 leading-snug mb-2 group-hover:text-sky-700 transition-colors">
                    {cert.title}
                  </h3>
                  <div className="font-mono text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Penyelenggara: {cert.organizer}</span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Key Skills Acquired */}
                  <div className="mb-5">
                    <span className="font-mono text-[11px] font-black text-black block mb-2">
                      FOKUS KOMPETENSI:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="bg-white text-slate-900 px-2 py-0.5 border border-black font-mono font-bold text-[10px] shadow-[1px_1px_0px_#000]"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Actions */}
                <div className="pt-4 border-t-2 border-black/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-800 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Tervalidasi Resmi</span>
                  </div>

                  <button
                    onClick={() => handleOpenModal(cert)}
                    className="flex items-center gap-1.5 bg-sky-300 hover:bg-sky-400 text-black border-2 border-black px-3 py-1.5 font-mono font-black text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Lihat Sertifikat</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Coastal Note */}
        <ScrollReveal animation="fade-up" delay={200}>
          <div className="mt-12 bg-amber-100 border-3 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🛡️</span>
              <div>
                <h4 className="font-mono font-black text-sm text-slate-900">
                  Transparansi & Bukti Keaslian Kredensial
                </h4>
                <p className="font-sans text-xs text-slate-700">
                  Seluruh sertifikat diterbitkan atas nama <strong>Maulana Ichsan Syahputra</strong> dan dapat dikonfirmasi langsung ke institusi penerbit.
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <span className="bg-white border-2 border-black px-3 py-1 font-mono font-bold text-xs text-slate-800 shadow-[2px_2px_0px_#000]">
                Status: 4/4 Terverifikasi
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Modal Zoom Preview */}
      <CertificateModal
        certificate={selectedCert}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
};
