import React, { useRef, useEffect, useState } from 'react';
import { TIMELINE } from '../data/portfolioData';
import { GraduationCap, Calendar, MapPin, CheckCircle2, Flag, Compass } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of container has been scrolled through
      const totalDist = rect.height - windowHeight * 0.4;
      const currentDist = -rect.top + windowHeight * 0.3;
      const progress = Math.max(0, Math.min(1, currentDist / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="py-16 sm:py-20 border-t-4 border-black bg-[#FFFDF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
            <div>
              <div className="inline-block px-3 py-1 bg-sky-300 border-2 border-black text-xs font-mono font-black shadow-[3px_3px_0px_#000] mb-3">
                05 // MILESTONE PENDIDIKAN & REKAM JEJAK
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Linimasa <span className="bg-amber-300 px-2 border-2 border-black">Evolusi Siswa</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-[#FAF5E6] border-2 border-black px-4 py-2 font-mono text-xs font-bold shadow-[2px_2px_0px_#000]">
              <Compass className="w-4 h-4 text-sky-600 animate-spin" />
              <span>Scroll Depth: {Math.round(scrollProgress * 100)}%</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Timeline with Vertical Dynamic Progress Bar */}
        <div className="relative pl-6 sm:pl-10">
          {/* Background Track Line */}
          <div className="absolute left-2 sm:left-4 top-0 bottom-0 w-2.5 bg-[#FAF5E6] border-2 border-black rounded-full overflow-hidden">
            {/* Filled Water Level Line */}
            <div
              className="w-full bg-gradient-to-b from-sky-400 via-cyan-400 to-blue-600 transition-all duration-150"
              style={{ height: `${Math.max(10, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-12">
            {TIMELINE.map((item, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-right"
                delay={idx * 140}
                duration={750}
              >
                <div className="relative group">
                  {/* Node Marker Dot */}
                  <div
                    className={`absolute -left-[30px] sm:-left-[38px] top-4 w-7 h-7 border-3 border-black rounded-full flex items-center justify-center font-bold text-xs shadow-[2px_2px_0px_#000] z-10 transition-transform group-hover:scale-110 ${
                      item.isCurrent
                        ? 'bg-amber-300 text-black'
                        : 'bg-white text-slate-700'
                    }`}
                  >
                    {item.isCurrent ? '⚡' : idx + 1}
                  </div>

                  {/* Content Card */}
                  <div className="bg-[#FFFDF7] border-4 border-black p-6 sm:p-7 shadow-[8px_8px_0px_#000] hover:shadow-[12px_12px_0px_#000] transition-all">
                    {/* Card Header info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-amber-200 border-2 border-black text-xs font-mono font-black flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>
                        {item.isCurrent && (
                          <span className="px-2 py-0.5 bg-emerald-300 text-emerald-950 border border-black text-[11px] font-mono font-black animate-pulse">
                            AKTIF BERLANGSUNG
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <div className="text-sm font-mono font-bold text-sky-700 mb-4">
                      {item.institution} • <span className="text-slate-700 font-medium">{item.role}</span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed font-normal mb-4">
                      {item.description}
                    </p>

                    {/* Highlights Bullet List */}
                    <div className="bg-[#FAF5E6] border-2 border-black p-4 mb-4">
                      <div className="text-xs font-mono font-bold text-slate-500 uppercase mb-2">
                        Pencapaian & Fokus Utama
                      </div>
                      <ul className="space-y-1.5">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills Gained Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {item.skillsGained.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-0.5 bg-white border border-black text-xs font-mono font-bold text-slate-700"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
