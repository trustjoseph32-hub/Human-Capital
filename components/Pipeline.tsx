
import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  FileText, 
  Zap,
  Cpu,
  Server,
  DollarSign,
  Copy,
  Check,
  Terminal,
  Layers,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { Workflow, ProjectStatus } from '../types';

const Pipeline: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [tzCount, setTzCount] = useState(30);
  const [workflows] = useState<Workflow[]>([
    { 
      id: '1', 
      name: 'СБОРЩИК_ИССЛЕДОВАНИЙ', 
      description: 'Автоматический сбор данных через Perplexity Pro API.', 
      status: ProjectStatus.RUNNING, 
      lastRun: '5 мин назад', 
      progress: 40 
    },
    { 
      id: '2', 
      name: 'ВАЛИДАТОР_АРСЕН', 
      description: 'Кросс-проверка фактов и расчет консенсуса.', 
      status: ProjectStatus.IDLE, 
      lastRun: '10 мин назад', 
      progress: 0 
    },
    { 
      id: '3', 
      name: 'СИНТЕЗАТОР_ГЛАВ', 
      description: 'Сборка глав в стиле "Императивный Реализм".', 
      status: ProjectStatus.WAITING_APPROVAL, 
      lastRun: '1 день назад', 
      progress: 100 
    }
  ]);

  const masterTask = `ГЛАВНАЯ ЗАДАЧА: Сборка бэкенда для "Манифеста Человеческого Капитала"
Роль: Ведущий бэкенд-инженер. Стек: Python, FastAPI, Celery, Neo4j.
Цель: Создать автономный конвейер для 30 исследовательских задач.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(masterTask);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const calculateCost = () => {
    const perplexity = tzCount * 0.05;
    const gemini = tzCount * 0.02;
    const vps = 0.5; // Фиксированная дневная стоимость
    return (perplexity + gemini + vps).toFixed(2);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-20 max-w-6xl mx-auto">
      {/* Шапка управления */}
      <header className="flex justify-between items-center bg-[#0a0c10] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-3">
            <Activity className="text-amber-500 animate-pulse" size={24} />
            Оркестрация Автозавода
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Консоль управления / VPS: 185.22.14.102</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Система Активна</span>
          </div>
        </div>
      </header>

      {/* Основная сетка: Метрики и Контроль */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Метрики VPS */}
        <div className="bg-[#0a0c10] p-6 rounded-[2rem] border border-white/5 text-white flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
              <Cpu size={14} className="text-amber-500" /> Ресурсы VPS
            </h3>
          </div>
          <div className="space-y-5 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500 uppercase">Загрузка CPU</span>
                <span className="text-amber-500">24%</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-1000" style={{width: '24%'}} />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-mono">
                <span className="text-slate-500 uppercase">Память RAM</span>
                <span className="text-amber-500">2.1 / 8 ГБ</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500/60 transition-all duration-1000" style={{width: '35%'}} />
              </div>
            </div>
            <div className="pt-4 grid grid-cols-2 gap-2">
              <div className="bg-white/5 border border-white/5 p-2 rounded-lg text-center">
                <p className="text-[8px] text-slate-500 font-black uppercase">Uptime</p>
                <p className="text-[10px] font-mono text-white">124:14:02</p>
              </div>
              <div className="bg-white/5 border border-white/5 p-2 rounded-lg text-center">
                <p className="text-[8px] text-slate-500 font-black uppercase">Docker</p>
                <p className="text-[10px] font-mono text-emerald-400">АКТИВЕН</p>
              </div>
            </div>
          </div>
        </div>

        {/* Экономика API */}
        <div className="bg-[#0a0c10] p-6 rounded-[2rem] border border-white/5 text-white flex flex-col">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6 flex items-center gap-2">
            <DollarSign size={14} className="text-amber-500" /> Экономика API
          </h3>
          <div className="flex-1 space-y-4">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] font-black uppercase text-slate-400">Количество ТЗ:</span>
              <input 
                type="number" 
                value={tzCount} 
                onChange={(e) => setTzCount(Math.max(1, Number(e.target.value)))}
                className="w-16 bg-black border border-amber-500/30 rounded px-2 py-1 text-xs font-mono text-amber-500 text-center outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-2 px-1">
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-500">Perplexity (Sonar)</span>
                <span>${(tzCount * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-slate-500">Gemini 1.5 Pro</span>
                <span>${(tzCount * 0.02).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center">
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Цикл затрат:</span>
             <span className="text-2xl font-black text-amber-500 tracking-tighter font-mono">${calculateCost()}</span>
          </div>
        </div>

        {/* Мастер-Задача */}
        <div className="bg-amber-500 p-6 rounded-[2rem] text-black shadow-xl shadow-amber-500/10 flex flex-col group cursor-pointer hover:scale-[1.02] transition-all" onClick={copyToClipboard}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Генератор Мастер-ТЗ</h3>
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-mono leading-relaxed line-clamp-5 uppercase font-bold opacity-80">
              {masterTask}
            </p>
          </div>
          <div className="mt-6 bg-black text-amber-500 p-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] text-center border border-black/5">
            {copied ? 'Скопировано в буфер' : 'Копировать для ИИ-агента'}
          </div>
        </div>
      </div>

      {/* Реестр воркеров */}
      <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
          <Layers size={16} className="text-amber-500" /> Реестр активных воркеров
        </h3>
        <div className="space-y-3">
          {workflows.map((wf) => (
            <div key={wf.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/[0.04] transition-all group">
               <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${wf.status === ProjectStatus.RUNNING ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-white/5 text-slate-500'}`}>
                    {wf.name.includes('СБОРЩИК') ? <Search size={18} /> : wf.name.includes('ВАЛИДАТОР') ? <ShieldAlert size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{wf.name}</h4>
                    <p className="text-[9px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">{wf.description}</p>
                  </div>
               </div>

               <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-500 uppercase mb-1">Статус</p>
                    <p className={`text-[10px] font-mono font-bold ${wf.status === ProjectStatus.RUNNING ? 'text-amber-500 animate-pulse' : 'text-slate-400'}`}>
                      {wf.status === ProjectStatus.RUNNING ? 'ВЫПОЛНЕНИЕ' : wf.status === ProjectStatus.WAITING_APPROVAL ? 'ОЖИДАНИЕ' : 'ПРОСТОЙ'}
                    </p>
                  </div>
                  <div className="w-24">
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.3)] transition-all duration-1000" style={{width: `${wf.progress}%`}} />
                    </div>
                  </div>
                  <button className="p-2 text-slate-600 hover:text-amber-500 transition-colors">
                    <RotateCcw size={16} />
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Терминал логов */}
      <div className="bg-black rounded-[2rem] p-6 font-mono text-[10px] text-amber-500/60 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-2 text-slate-700 mb-4 border-b border-white/5 pb-3">
           <Terminal size={12} />
           <span className="uppercase tracking-[0.2em] font-black">Логи FastAPI / Celery</span>
        </div>
        <div className="space-y-1 h-32 overflow-hidden opacity-80">
          <p><span className="text-slate-700">[14:02:11]</span> <span className="text-amber-600">СИС:</span> Воркер FastAPI 127.0.0.1:8000 подключен.</p>
          <p><span className="text-slate-700">[14:02:15]</span> <span className="text-amber-500">ЗАДАЧА:</span> Сбор данных для ТЗ-001 (Индексы ЧК)...</p>
          <p><span className="text-slate-700">[14:02:22]</span> <span className="text-emerald-500/80">ОК:</span> Ответ Perplexity API получен (4.2k токенов).</p>
          <p><span className="text-slate-700">[14:02:25]</span> <span className="text-amber-600">СИС:</span> Запуск Валидатора Арсена для проверки фактов.</p>
          <p className="animate-pulse text-amber-500">_</p>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
