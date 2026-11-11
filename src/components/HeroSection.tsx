import React, { useState } from 'react';
import { ArrowDown, Terminal, ShieldCheck, Sparkles, ExternalLink, ChevronRight, Gamepad2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundEngine } from '../utils/soundEffects';
import { DraggableName } from './DraggableName';
import { BeachWeatherWidget } from './BeachWeatherWidget';
import { InteractiveCrab, InteractiveBeachBall, InteractiveStarfish } from './BeachCritters';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [terminalTab, setTerminalTab] = useState<'ping' | 'route' | 'status'>('ping');

  return (
    <section id="utama" className="relative pt-6 sm:pt-10 pb-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-5 bg-amber-100 border-2 border-black shadow-[3px_3px_0px_#000] text-xs font-mono font-bold text-slate-900 rounded-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span>🏖️ Portofolio Neo-Brutalism Pantai • {PERSONAL_INFO.school}</span>
          <span className="hidden md:inline bg-sky-200 text-sky-900 text-[10px] px-1.5 py-0.5 border border-black rounded font-black">
            EDISI INTERAKTIF
          </span>
        </div>

        {/* Hero Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          {/* Left Column: Big Headline & Bio Intro */}
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1">
              <div className="text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-600 uppercase flex items-center gap-2">
                <span>Teknik Komputer & Jaringan</span>
                <span className="text-slate-400">/</span>
                <span className="bg-amber-300 text-black px-2 py-0.5 border border-black text-xs font-black">
                  KELAS X TKJ 1
                </span>
              </div>
              
              <div className="text-xl sm:text-2xl font-black text-slate-700 font-mono pt-1">
                Halo, Selamat Datang! Saya
              </div>

              {/* Interactive Draggable Name Component */}
              <DraggableName />
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed max-w-2xl bg-[#FFF9E6] p-4 border-2 border-black shadow-[4px_4px_0px_#000]">
              Siswa aktif <strong className="text-black font-bold">SMK Telkom Malang</strong> dengan ketertarikan mendalam pada infrastruktur jaringan komputer, routing protokol, server Linux mandiri, dan eksplorasi web modern.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('game-pantai');
                }}
                className="px-5 py-3 bg-amber-400 hover:bg-amber-500 text-black font-mono font-black text-sm border-3 border-black shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2 animate-pulse"
              >
                <Gamepad2 className="w-5 h-5" />
                <span>Mainkan Game Pantai 🎮</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('sertifikat');
                }}
                className="px-5 py-3 bg-emerald-400 hover:bg-emerald-500 text-black font-mono font-black text-sm border-3 border-black shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2"
              >
                <span>4 Sertifikat Resmi 📜</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('proyek');
                }}
                className="px-5 py-3 bg-sky-400 hover:bg-sky-500 text-black font-mono font-black text-sm border-3 border-black shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-[1px_1px_0px_#000] transition-all flex items-center gap-2"
              >
                <span>Lihat Proyek Flagship</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundEngine.playPop();
                  onNavigate('profil');
                }}
                className="px-5 py-3 bg-[#FAF5E6] hover:bg-slate-100 text-slate-900 font-mono font-bold text-sm border-2 border-black shadow-[4px_4px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#000] transition-all"
              >
                Profil Siswa 📸
              </button>
            </div>

            {/* Key Metric Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div className="bg-[#FFFFFF] border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono text-slate-500 font-bold uppercase">Status Kelas</div>
                <div className="text-lg font-black text-sky-700">X TKJ 1</div>
                <div className="text-[10px] font-mono text-slate-600">SMK Telkom Malang</div>
              </div>
              <div className="bg-[#FFFFFF] border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono text-slate-500 font-bold uppercase">Packet Loss</div>
                <div className="text-lg font-black text-emerald-600">0.00%</div>
                <div className="text-[10px] font-mono text-slate-600">Simulasi Jaringan</div>
              </div>
              <div className="bg-[#FFFFFF] border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono text-slate-500 font-bold uppercase">Spesialisasi</div>
                <div className="text-lg font-black text-amber-600">Network & OS</div>
                <div className="text-[10px] font-mono text-slate-600">Cisco & MikroTik</div>
              </div>
              <div className="bg-[#FFFFFF] border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
                <div className="text-[11px] font-mono text-slate-500 font-bold uppercase">Interactive</div>
                <div className="text-lg font-black text-purple-600">Draggable</div>
                <div className="text-[10px] font-mono text-slate-600">Huruf Interaktif</div>
              </div>
            </div>
          </div>

          {/* Right Column: Mini Interactive Coastal Network Terminal */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 border-4 border-black shadow-[8px_8px_0px_#000] rounded-sm overflow-hidden text-slate-100 font-mono text-xs">
              <div className="bg-slate-800 border-b-2 border-black px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 border border-black inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 border border-black inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 border border-black inline-block"></span>
                  <span className="text-slate-300 font-bold text-[11px] ml-2">coastal-router@moklet:~#</span>
                </div>
                <div className="text-[10px] bg-slate-950 px-2 py-0.5 text-amber-400 border border-slate-700">
                  LIVE CONSOLE
                </div>
              </div>

              {/* Terminal Tabs */}
              <div className="flex bg-slate-950 border-b border-slate-800">
                <button
                  onClick={() => setTerminalTab('ping')}
                  className={`px-3 py-1.5 text-[11px] font-bold border-r border-slate-800 transition-colors ${
                    terminalTab === 'ping' ? 'bg-sky-500/20 text-sky-400 border-b-2 border-b-sky-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ ping -c 3
                </button>
                <button
                  onClick={() => setTerminalTab('route')}
                  className={`px-3 py-1.5 text-[11px] font-bold border-r border-slate-800 transition-colors ${
                    terminalTab === 'route' ? 'bg-sky-500/20 text-sky-400 border-b-2 border-b-sky-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ show ip route
                </button>
                <button
                  onClick={() => setTerminalTab('status')}
                  className={`px-3 py-1.5 text-[11px] font-bold transition-colors ${
                    terminalTab === 'status' ? 'bg-sky-500/20 text-sky-400 border-b-2 border-b-sky-400' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  $ whoami.sh
                </button>
              </div>

              {/* Terminal Output */}
              <div className="p-4 space-y-2.5 h-64 overflow-y-auto leading-relaxed">
                {terminalTab === 'ping' && (
                  <div>
                    <div className="text-emerald-400 font-bold">$ ping -c 3 gateway.telkom-malang.sch.id</div>
                    <div className="text-slate-400 text-[11px]">PING 10.10.1.1 (10.10.1.1) 56(84) bytes of data.</div>
                    <div className="text-slate-300">64 bytes from 10.10.1.1: icmp_seq=1 ttl=64 time=0.84 ms</div>
                    <div className="text-slate-300">64 bytes from 10.10.1.1: icmp_seq=2 ttl=64 time=0.91 ms</div>
                    <div className="text-slate-300">64 bytes from 10.10.1.1: icmp_seq=3 ttl=64 time=0.76 ms</div>
                    <div className="mt-2 pt-2 border-t border-slate-800 text-amber-300">
                      --- 10.10.1.1 ping statistics ---<br />
                      3 packets transmitted, 3 received, <span className="text-emerald-400 font-bold">0% packet loss</span>, time 2003ms<br />
                      rtt min/avg/max = 0.76/0.83/0.91 ms (Coastal Fast Path)
                    </div>
                  </div>
                )}

                {terminalTab === 'route' && (
                  <div>
                    <div className="text-emerald-400 font-bold">$ ip route show</div>
                    <div className="text-slate-300">
                      default via 192.168.10.1 dev eth0 proto dhcp metric 100<br />
                      10.10.10.0/24 dev vlan10 proto kernel scope link src 10.10.10.254 (ADMIN)<br />
                      10.10.20.0/24 dev vlan20 proto kernel scope link src 10.10.20.254 (LAB-TKJ)<br />
                      10.10.30.0/24 dev vlan30 proto kernel scope link src 10.10.30.254 (SERVER-FARM)<br />
                      172.16.0.0/16 via 10.10.1.254 dev ospf-area0 metric 20
                    </div>
                    <div className="mt-2 text-sky-400 text-[11px]">
                      [INFO] OSPF Adjacency: State FULL / DR (Telkom-Malang-Backbone)
                    </div>
                  </div>
                )}

                {terminalTab === 'status' && (
                  <div>
                    <div className="text-emerald-400 font-bold">$ ./whoami.sh</div>
                    <div className="text-slate-300 space-y-1">
                      <div><span className="text-amber-400">NAMA:</span> Maulana Ichsan</div>
                      <div><span className="text-amber-400">KELAS:</span> X TKJ 1 (Teknik Komputer & Jaringan)</div>
                      <div><span className="text-amber-400">SEKOLAH:</span> SMK Telkom Malang</div>
                      <div><span className="text-amber-400">INSTAGRAM:</span> @maulana.icsn</div>
                      <div><span className="text-amber-400">TIKTOK:</span> @maulanaichsansyah</div>
                      <div><span className="text-amber-400">FITUR NAMA:</span> Huruf Dapat Digeser Bebas</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Terminal Footer */}
              <div className="bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500">
                <span>PORT 443 / TCP</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  CONNECTED
                </span>
              </div>
            </div>

            {/* Interactive Beach Weather & Surf Report Widget */}
            <div className="pt-2">
              <BeachWeatherWidget />
            </div>

            {/* Interactive Coastal Critters Row */}
            <div className="flex items-center justify-between bg-white border-2 border-black p-3 shadow-[3px_3px_0px_#000]">
              <div className="flex items-center gap-2">
                <InteractiveCrab />
                <div className="text-[11px] font-mono">
                  <span className="font-bold text-black block">Kepiting Lab TKJ</span>
                  <span className="text-slate-500 text-[10px]">Klik untuk tips & suara!</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <InteractiveBeachBall />
                <InteractiveStarfish />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
