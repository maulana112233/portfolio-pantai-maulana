import React, { useState, useEffect } from 'react';
import { X, ZoomIn, ZoomOut, RotateCw, ExternalLink, Award, CheckCircle2, ShieldCheck, Calendar, UserCheck } from 'lucide-react';
import { CertificateItem } from '../data/certificateData';
import { soundEngine } from '../utils/soundEffects';

interface CertificateModalProps {
  certificate: CertificateItem | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Reset zoom when certificate changes
    setZoomLevel(1);
    setRotation(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playPop();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [certificate, onClose]);

  if (!certificate) return null;

  const handleZoomIn = () => {
    soundEngine.playPop();
    setZoomLevel((prev) => Math.min(prev + 0.3, 2.5));
  };

  const handleZoomOut = () => {
    soundEngine.playPop();
    setZoomLevel((prev) => Math.max(prev - 0.3, 0.7));
  };

  const handleReset = () => {
    soundEngine.playPop();
    setZoomLevel(1);
    setRotation(0);
  };

  const handleRotate = () => {
    soundEngine.playPop();
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-5xl max-h-[92vh] bg-[#FFFDF7] border-4 border-black shadow-[8px_8px_0px_#000] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-amber-300 border-b-4 border-black">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="text-xl">🏆</span>
            <div className="truncate">
              <h3 className="font-mono font-black text-sm sm:text-base text-slate-900 truncate">
                {certificate.title}
              </h3>
              <p className="font-mono text-xs text-slate-700 truncate">
                {certificate.organizer} • {certificate.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playPop();
                onClose();
              }}
              className="w-9 h-9 bg-rose-400 hover:bg-rose-500 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-colors"
              title="Tutup (ESC)"
            >
              <X className="w-5 h-5 text-black font-black" />
            </button>
          </div>
        </div>

        {/* Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-100 border-b-2 border-black font-mono text-xs">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleZoomIn}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border-2 border-black shadow-[1px_1px_0px_#000]"
              title="Perbesar Tampilan"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Zoom In</span>
            </button>
            <button
              onClick={handleZoomOut}
              className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-slate-50 border-2 border-black shadow-[1px_1px_0px_#000]"
              title="Perkecil Tampilan"
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Zoom Out</span>
            </button>
            <button
              onClick={handleReset}
              className="px-2 py-1 bg-white hover:bg-slate-50 border-2 border-black shadow-[1px_1px_0px_#000]"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleRotate}
              className="p-1.5 bg-white hover:bg-slate-50 border-2 border-black shadow-[1px_1px_0px_#000]"
              title="Putar 90 Derajat"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline bg-sky-200 text-sky-900 px-2 py-0.5 border border-black font-bold text-[11px]">
              {certificate.category}
            </span>
            {certificate.credentialId && (
              <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 border border-black font-bold text-[11px] truncate max-w-xs">
                ID: {certificate.credentialId}
              </span>
            )}
          </div>
        </div>

        {/* Main Body (Certificate Preview + Sidebar Details) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Certificate Image Canvas Area */}
          <div className="lg:col-span-8 bg-slate-900/90 flex items-center justify-center p-4 min-h-[320px] sm:min-h-[460px] overflow-auto">
            <div
              className="transition-transform duration-200 ease-out origin-center"
              style={{
                transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              }}
            >
              <img
                src={certificate.imageSrc}
                alt={certificate.title}
                className="max-w-full max-h-[70vh] object-contain border-2 border-white shadow-2xl rounded-sm select-none"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-4 p-5 sm:p-6 bg-[#FFFDF7] border-t-4 lg:border-t-0 lg:border-l-4 border-black flex flex-col justify-between font-mono text-xs">
            <div className="space-y-4">
              {/* Category & Badge */}
              <div className="flex items-center gap-2">
                <span className="bg-amber-300 text-black px-2.5 py-1 border-2 border-black font-black text-xs shadow-[2px_2px_0px_#000]">
                  {certificate.badge}
                </span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Terverifikasi
                </span>
              </div>

              {/* Title & Event */}
              <div>
                <h4 className="font-mono font-black text-base text-slate-900 leading-snug">
                  {certificate.title}
                </h4>
                <p className="text-slate-600 font-semibold mt-1">
                  Kegiatan: {certificate.event}
                </p>
              </div>

              {/* Description */}
              <div className="bg-[#FAF5E6] border-2 border-black p-3 text-slate-800 leading-relaxed font-sans text-xs">
                {certificate.description}
              </div>

              {/* Signee & Issuer */}
              <div className="space-y-2 border-t-2 border-slate-300 pt-3">
                <div className="flex items-start gap-2 text-slate-700">
                  <UserCheck className="w-4 h-4 text-sky-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-black block">Penandatangan Resmi:</span>
                    <span className="text-[11px] text-slate-600">{certificate.signee}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <span className="font-bold text-black">Tanggal Terbit: </span>
                    <span>{certificate.date}</span>
                  </div>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="border-t-2 border-slate-300 pt-3">
                <span className="font-bold text-black block mb-2">Kompetensi yang Divalidasi:</span>
                <div className="flex flex-wrap gap-1.5">
                  {certificate.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-sky-100 hover:bg-sky-200 text-slate-900 px-2 py-0.5 border border-black font-mono font-bold text-[10px]"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 pt-4 border-t-2 border-black flex flex-col gap-2">
              {certificate.verifyUrl && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-black border-2 border-black py-2 px-3 font-mono font-black text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Verifikasi ID di Portal Penyelenggara</span>
                </a>
              )}

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onClose();
                }}
                className="w-full bg-slate-200 hover:bg-slate-300 border-2 border-black py-2 px-3 font-mono font-black text-xs shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
              >
                Kembali ke Portofolio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
