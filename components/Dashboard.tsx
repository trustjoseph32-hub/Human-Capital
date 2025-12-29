
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { 
  Database, 
  BrainCircuit, 
  CheckCircle2, 
  History,
  AlertTriangle,
  ShieldAlert,
  ChevronRight,
  Activity
} from 'lucide-react';

const chapterProgress = [
  { name: 'Глава I', progress: 35, color: '#f59e0b' },
  { name: 'Глава II', progress: 5, color: '#4f46e5' },
  { name: 'Глава III', progress: 0, color: '#1e293b' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 select-none">
      <header className="flex justify-between items-end bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 flex items-center gap-3">
            <Activity className="text-amber-500" size={32} />
            Обзор Манифеста
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-[0.2em]">
              Эпоха данных: 1925–2025
            </span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Режим: Императивный Реализм
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Системный релиз</p>
          <p className="text-xl font-black text-white leading-none tracking-tighter font-mono">15 ФЕВ 2026</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Сбор данных', val: '12/30', sub: 'Задач завершено', icon: Database, color: 'text-amber-500' },
          { label: 'ИИ-Валидация', val: '75%', sub: 'Порог консенсуса', icon: BrainCircuit, color: 'text-indigo-500' },
          { label: 'Узлы истины', val: '412', sub: 'Фактов Главы I', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Ретроспектива', val: '100 ЛЕТ', sub: 'Глубина аудита', icon: History, color: 'text-slate-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0c10] p-6 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all group shadow-lg">
            <div className="mb-4">
              <stat.icon className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} size={20} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter font-mono">{stat.val}</h3>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
            <p className="text-[10px] text-slate-500 mt-3 font-bold uppercase tracking-tighter">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
            <ChevronRight className="text-amber-500" size={14} /> Архитектурный прогресс книги
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chapterProgress} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontWeight: 'bold', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.02)'}}
                  contentStyle={{backgroundColor: '#050608', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '10px'}}
                />
                <Bar dataKey="progress" radius={[0, 4, 4, 0]} barSize={20}>
                  {chapterProgress.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden shadow-xl">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={16} /> Узлы конфликтов
          </h3>
          <div className="space-y-4 relative z-10">
            {[
              { t: 'Консенсус VSL', s: 'Разрыв OECD vs World Bank' },
              { t: 'Логика ТЗ-007', s: 'Дефицит данных 1925-1940' },
              { t: 'Корреляция ВВП', s: 'Нужна синхронизация 10 стран' }
            ].map((alert, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-[8px] font-black text-amber-500 uppercase mb-1">{alert.t}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{alert.s}</p>
              </div>
            ))}
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-[0.02] pointer-events-none">
             <ShieldAlert size={240} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
