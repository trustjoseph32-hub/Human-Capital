
import React, { useState } from 'react';
import { Database, Search, PlayCircle, ExternalLink, ScrollText, CheckCircle2, AlertCircle } from 'lucide-react';
import { TaskStatus, MonographTask } from '../types';

const INITIAL_TASKS: MonographTask[] = [
  { id: 'ТЗ-001', title: 'Аудит методологии HCI', block: 'GLOBAL_INDICES', status: TaskStatus.COMPLETED, progress: 100, perplexityPrompt: 'Собрать официальную документацию индекса человеческого капитала Всемирного банка за 2024 год...' },
  { id: 'ТЗ-002', title: 'Компоненты и логика ИЧР', block: 'GLOBAL_INDICES', status: TaskStatus.COLLECTING, progress: 45, perplexityPrompt: 'Собрать документацию ПРООН по индексу человеческого развития...' },
  { id: 'ТЗ-003', title: 'Стоимость статистической жизни', block: 'GLOBAL_INDICES', status: TaskStatus.PENDING, progress: 0, perplexityPrompt: 'Собрать данные по VSL (Value of Statistical Life) в США, ЕС и РФ...' },
  { id: 'ТЗ-007', title: 'Статистика преступности и этики', block: 'MORALITY', status: TaskStatus.VALIDATING, progress: 85, perplexityPrompt: 'Собрать международную статистику по тяжким преступлениям и уровню доверия...' },
];

const TaskRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Реестр ТЗ [001-030]</h2>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Очередь сбора данных / Perplexity Pro</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Фильтр задач..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest focus:border-amber-500/50 outline-none w-64 text-white"
            />
          </div>
        </div>
      </header>

      <div className="grid gap-4">
        {INITIAL_TASKS.map((task) => (
          <div key={task.id} className="bg-[#0a0c10] border border-white/5 rounded-[1.5rem] p-5 hover:bg-white/[0.03] transition-all group flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className={`p-4 rounded-xl ${
                task.status === TaskStatus.COMPLETED ? 'bg-emerald-500/10 text-emerald-500' :
                task.status === TaskStatus.COLLECTING ? 'bg-amber-500/10 text-amber-500' :
                'bg-white/5 text-slate-600'
              }`}>
                <Database size={18} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[9px] font-black text-slate-600 tracking-widest">{task.id}</span>
                  <h3 className="text-[11px] font-black text-white uppercase tracking-wider">{task.title}</h3>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${
                    task.status === TaskStatus.COMPLETED ? 'text-emerald-500 border-emerald-500/20' :
                    task.status === TaskStatus.VALIDATING ? 'text-indigo-500 border-indigo-500/20' :
                    'text-slate-600 border-white/5'
                  } uppercase`}>
                    {task.status === TaskStatus.COMPLETED ? 'ГОТОВО' : 
                     task.status === TaskStatus.COLLECTING ? 'СБОР' :
                     task.status === TaskStatus.VALIDATING ? 'ВАЛИДАЦИЯ' : 'В ОЧЕРЕДИ'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 truncate max-w-md font-mono opacity-50 uppercase tracking-tight">
                  {task.perplexityPrompt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="w-32 hidden md:block">
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      task.status === TaskStatus.COMPLETED ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    }`} 
                    style={{ width: `${task.progress}%` }} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-amber-500 transition-colors">
                  <PlayCircle size={20} />
                </button>
                <button className="p-2 text-slate-600 hover:text-white transition-colors">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0c10] rounded-[2.5rem] p-10 border border-white/5 relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-amber-500 mb-4 flex items-center gap-2">
            <AlertCircle size={14} /> Меморандум Автора
          </h3>
          <p className="text-[11px] text-slate-400 max-w-2xl leading-relaxed font-bold uppercase tracking-wider opacity-70">
            Глава I носит чисто описательный характер. Мы не спорим с институтами. Мы фиксируем их методологии «как есть». 
            Критический анализ и инъекция HCQI-7 начинается с Главы III.
          </p>
        </div>
        <div className="absolute right-0 top-0 opacity-[0.02] pointer-events-none translate-x-1/4 -translate-y-1/4">
           <ScrollText size={300} />
        </div>
      </div>
    </div>
  );
};

export default TaskRegistry;
