
import React, { useState } from 'react';
import { Fingerprint, Star, Moon, Sun, Layers, Share2 } from 'lucide-react';

const Metaphysics: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Метафизический Профиль</h2>
        <p className="text-slate-500">Генные ключи + Дизайн Человека + Нумерология</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Sun className="text-amber-500" size={20} /> Ввод данных рождения
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Дата рождения</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase">Время (точное)</label>
              <input type="time" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3" />
            </div>
          </div>
          <div className="space-y-2 mb-8">
            <label className="text-[10px] font-bold text-slate-400 uppercase">Место рождения</label>
            <input type="text" placeholder="Город..." className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3" />
          </div>
          <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
            <Fingerprint size={20} />
            Сгенерировать профиль
          </button>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-200 border-dashed flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
            <Layers size={32} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900">Профиль не построен</h4>
            <p className="text-sm text-slate-500 max-w-xs">Введите данные, чтобы получить расчет Генных Ключей и архитектуру типа личности.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metaphysics;
