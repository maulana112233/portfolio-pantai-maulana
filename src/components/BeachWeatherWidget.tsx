import React, { useState } from 'react';
import { Sun, Wind, Waves, Activity, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

const WEATHER_PRESETS = [
  { temp: '28°C', condition: 'Cerah Berawan Tropis', wind: '12 Knot Pesisir', waves: '1.2 m (Ideal Surfing)', ping: '0.8 ms', status: 'Kondisi Pesisir Sempurna 🏖️' },
  { temp: '29°C', condition: 'Matahari Terik Hangat', wind: '15 Knot Semilir Segar', waves: '1.5 m (Gelombang Cepat)', ping: '0.6 ms', status: 'Waktu Tepat Konfigurasi VLAN ⚡' },
  { temp: '27°C', condition: 'Angin Sejuk Pantai Malang', wind: '10 Knot Tenang', waves: '0.9 m (Ombak Ramah)', ping: '0.9 ms', status: 'Server Stabil & Zero Loss 🟢' },
  { temp: '28.5°C', condition: 'Cahaya Keemasan Sore', wind: '14 Knot Sejuk', waves: '1.3 m (Arus Prima)', ping: '0.7 ms', status: 'Sinyal 1 Gbps Siap Tempur 🚀' },
];

export const BeachWeatherWidget: React.FC = () => {
  const [presetIdx, setPresetIdx] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentWeather = WEATHER_PRESETS[presetIdx];

  const handleRefresh = () => {
    soundEngine.playWaterDrop();
    setIsRefreshing(true);
    setTimeout(() => {
      setPresetIdx((prev) => (prev + 1) % WEATHER_PRESETS.length);
      setIsRefreshing(false);
    }, 250);
  };

  return (
    <div className="bg-[#FAF5E6] border-3 border-black p-4 shadow-[5px_5px_0px_#000] relative overflow-hidden">
      {/* Decorative background palm & sun */}
      <div className="absolute -top-3 -right-2 text-3xl opacity-15 select-none pointer-events-none">
        🌴
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black/15 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-300 border-2 border-black flex items-center justify-center text-sm shadow-[1px_1px_0px_#000]">
            ☀️
          </div>
          <div>
            <div className="font-mono font-black text-xs text-slate-900 tracking-tight flex items-center gap-1.5">
              <span>PRAKIRAAN CUACA & OMBAK MOKLET</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <div className="text-[10px] font-mono text-slate-600">
              Pesisir Selatan Malang • Stasiun Cuaca Lab TKJ
            </div>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="self-start sm:self-auto flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-amber-200 border-2 border-black text-[11px] font-mono font-bold shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          title="Segarkan data ombak pesisir"
        >
          <RefreshCw className={`w-3 h-3 text-sky-700 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Update Cuaca</span>
        </button>
      </div>

      {/* Grid of Weather & Wave Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
        <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold mb-0.5">
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>SUHU</span>
          </div>
          <div className="text-sm font-black text-slate-900">{currentWeather.temp}</div>
          <div className="text-[9px] text-slate-600 truncate">{currentWeather.condition}</div>
        </div>

        <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold mb-0.5">
            <Waves className="w-3.5 h-3.5 text-sky-500" />
            <span>OMBAK</span>
          </div>
          <div className="text-sm font-black text-slate-900">{currentWeather.waves}</div>
          <div className="text-[9px] text-emerald-700 font-bold">Kondisi Surfing OK</div>
        </div>

        <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold mb-0.5">
            <Wind className="w-3.5 h-3.5 text-teal-600" />
            <span>ANGIN</span>
          </div>
          <div className="text-sm font-black text-slate-900">{currentWeather.wind}</div>
          <div className="text-[9px] text-slate-600">Semilir Tropis</div>
        </div>

        <div className="bg-white border-2 border-black p-2 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-center gap-1 text-[10px] text-slate-500 font-bold mb-0.5">
            <Activity className="w-3.5 h-3.5 text-rose-500" />
            <span>LATENSI LAB</span>
          </div>
          <div className="text-sm font-black text-emerald-700">{currentWeather.ping}</div>
          <div className="text-[9px] text-slate-600">Zero Loss Rate</div>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="mt-3 pt-2 border-t border-black/10 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-600">Status Pantai:</span>
        <span className="font-black text-black bg-amber-300 px-2 py-0.5 border border-black rounded-sm shadow-[1px_1px_0px_#000]">
          {currentWeather.status}
        </span>
      </div>
    </div>
  );
};
