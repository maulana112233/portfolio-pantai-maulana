import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OceanCanvas } from './components/OceanCanvas';
import { InteractiveBeach } from './components/InteractiveBeach';
import { ProfileSection } from './components/ProfileSection';
import { BeachArcadeGame } from './components/BeachArcadeGame';
import { CertificatesSection } from './components/CertificatesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TechStackPipeline } from './components/TechStackPipeline';
import { TimelineSection } from './components/TimelineSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { OpeningAnimation } from './components/OpeningAnimation';
import { BeachCursorTrail } from './components/BeachCursorTrail';
import { ScrollWaveTracker } from './components/ScrollWaveTracker';
import { ScrollOceanEffect } from './components/ScrollOceanEffect';
import { FloatingMessageBottle } from './components/FloatingMessageBottle';
import { WavySectionDivider } from './components/WavySectionDivider';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('utama');
  const [showOpening, setShowOpening] = useState(true);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['utama', 'profil', 'game-pantai', 'sertifikat', 'proyek', 'pipeline', 'timeline', 'kontak'];
      const scrollY = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-slate-900 flex flex-col font-sans selection:bg-amber-300 selection:text-black relative">
      {/* Interactive Beach Bubble & Foam Cursor Trail */}
      <BeachCursorTrail />

      {/* Dynamic Ocean Water Surge, Sea Foam & Swimming Marine Life on Scroll */}
      <ScrollOceanEffect />

      {/* Floating Mystery Message in a Bottle with Secret Notes */}
      <FloatingMessageBottle />

      {/* Interactive Coastal Wave Scroll Tracker & Floating Companion */}
      <ScrollWaveTracker
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 0. Cinematic Opening Animation */}
      {showOpening && (
        <OpeningAnimation onComplete={() => setShowOpening(false)} />
      )}

      {/* 1. Header Navigation */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayOpening={() => setShowOpening(true)}
      />

      {/* 2. Hero Section (Halaman Utama) */}
      <HeroSection onNavigate={handleNavigate} />

      {/* 3. Real-Time Canvas Ocean Waves & Coastal Physics Characters */}
      <div className="relative w-full border-t-4 border-b-4 border-black bg-gradient-to-b from-[#FFFDF7] via-sky-100 to-sky-300 overflow-hidden">
        {/* Floating Beach Characters on top of Ocean */}
        <InteractiveBeach />

        {/* 2D Canvas Wave Simulation */}
        <OceanCanvas height={280} interactive={true} />
      </div>

      {/* 4. Profile Section (Halaman Profil dengan Foto Asli Maulana) */}
      <ProfileSection />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="ocean-to-sand" />

      {/* 5. Interactive Beach Arcade Game (Packet Surfer) */}
      <BeachArcadeGame />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="sand-to-ocean" />

      {/* 6. Official Certificates & Credentials (4 Sertifikat Resmi Maulana) */}
      <CertificatesSection />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="ocean-deep" />

      {/* 7. Flagship Projects Showcase */}
      <ProjectsSection />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="sand-warm" />

      {/* 8. Tech Stack Pipeline */}
      <TechStackPipeline />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="ocean-to-sand" />

      {/* 9. Milestone Timeline */}
      <TimelineSection />

      {/* Organic Wavy Coastal Divider */}
      <WavySectionDivider variant="sand-to-ocean" />

      {/* 10. Contact Bento Dock (Halaman Kontak) */}
      <ContactSection />

      {/* 11. Footer */}
      <Footer onScrollToTop={handleScrollToTop} />
    </div>
  );
};

export default App;
