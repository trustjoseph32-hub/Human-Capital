
import React, { useState } from 'react';
import { Fingerprint, Star, Moon, Sun, Layers, Share2 } from 'lucide-react';

const Metaphysics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="bg-[#0a0c10] p-8 rounded-[2rem] border border-white/5">
        <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Метафизический Профиль</h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Генные ключи + Дизайн Человека + Нумерология</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#0a0c10] p-8 rounded-[2rem] border border-white/5 shadow-xl">
          <h3 className="text-xs font-black mb-8 flex items-center gap-3 uppercase tracking-[0.2em] text-white">
            <Sun className="text-amber-500" size={18} /> Параметры воплощения
          </h3>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Дата рождения</label>
              <input type="date" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-amber-500 outline-none focus:border-amber-500 transition-all" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Точное время</label>
              <input type="time" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-amber-500 outline-none focus:border-amber-500 transition-all" />
            </div>
          </div>
          <div className="space-y-3 mb-10">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Место рождения</label>
            <input type="text" placeholder="Город..." className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-xs text-amber-500 outline-none focus:border-amber-500 transition-all placeholder:text-slate-800" />
          </div>
          <button className="w-full bg-amber-500 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)]">
            <Fingerprint size={20} />
            Сгенерировать карту
          </button>
        </div>

        <div className="bg-black/40 p-10 rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-6 opacity-30">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center text-slate-700">
            <Layers size={40} />
          </div>
          <div>
            <h4 className="font-black text-slate-700 uppercase tracking-[0.3em] text-xs">Профиль не построен</h4>
            <p className="text-[10px] text-slate-800 max-w-xs mt-3 font-black uppercase tracking-widest leading-relaxed">Введите данные, чтобы получить расчет архитектуры личности и фрактальных линий.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metaphysics;
