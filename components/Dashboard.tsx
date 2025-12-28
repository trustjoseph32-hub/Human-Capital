
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Database, 
  BrainCircuit, 
  CheckCircle2, 
  History,
  AlertTriangle,
  ShieldAlert
} from 'lucide-react';

const chapterProgress = [
  { name: 'Глава I', progress: 35, color: '#f59e0b' },
  { name: 'Глава II', progress: 5, color: '#6366f1' },
  { name: 'Глава III', progress: 0, color: '#94a3b8' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 select-none">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-2">Обзор Манифеста</h2>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-xs font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 uppercase tracking-tighter">
              Период: 1925–2025
            </span>
            <span className="flex items-center gap-2 text-xs font-black text-slate-500 uppercase tracking-tighter">
              Стиль: Императивный реализм
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Релиз проекта</p>
            <p className="text-xl font-black text-slate-900 leading-none">15 ФЕВ 2026</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Данные (Perplexity)', val: '12/30', sub: 'Задачи выполнены', icon: Database, color: 'text-amber-500' },
          { label: 'AI Валидация', val: '75%', sub: 'Порог консенсуса', icon: BrainCircuit, color: 'text-indigo-500' },
          { label: 'Верифицировано', val: '412', sub: 'Фактов Главы I', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Срок аудита', val: '100 лет', sub: 'Глубина поиска', icon: History, color: 'text-slate-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-amber-200 transition-all cursor-default group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform`}>
                <stat.icon className={stat.color} size={20} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{stat.label}</p>
            <p className="text-xs text-slate-500 mt-3">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
            Прогресс по Архитектуре Книги
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterProgress} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 'bold', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{backgroundColor: '#0f1116', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px'}}
                />
                <Bar dataKey="progress" radius={[0, 10, 10, 0]} barSize={30}>
                  {chapterProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
            <span>Методология: Глава I (Факты) -> Глава II (Диагноз) -> Глава III (Решения)</span>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden relative">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-6 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={20} /> Критические точки
          </h3>
          <div className="space-y-4">
            {[
              { t: 'Консенсус по VSL', s: 'Противоречие в методиках OECD/ВБ', c: 'border-rose-100 bg-rose-50/30' },
              { t: 'TZ-007 (Нравственность)', s: 'Мало данных за 1925-1950', c: 'border-amber-100 bg-amber-50/30' },
              { t: 'Динамика ВВП vs ЧК', s: 'Требуется корреляция по 10 странам', c: 'border-indigo-100 bg-indigo-50/30' }
            ].map((alert, i) => (
              <div key={i} className={`p-4 rounded-2xl border ${alert.c}`}>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">{alert.t}</p>
                <p className="text-xs font-bold text-slate-800">{alert.s}</p>
              </div>
            ))}
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-[0.03]">
             <ShieldAlert size={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
