
import React, { useState } from 'react';
import { Database, Search, Filter, PlayCircle, CheckCircle2, Clock, ExternalLink, ScrollText } from 'lucide-react';
import { TaskStatus, MonographTask } from '../types';

const INITIAL_TASKS: MonographTask[] = [
  { id: 'TZ-001', title: 'HCI Methodology Audit', block: 'GLOBAL_INDICES', status: TaskStatus.COMPLETED, progress: 100, perplexityPrompt: 'Collect official documentation of the World Bank Human Capital Index...' },
  { id: 'TZ-002', title: 'HDI Components & Logic', block: 'GLOBAL_INDICES', status: TaskStatus.COLLECTING, progress: 45, perplexityPrompt: 'Collect UNDP documentation on Human Development Index...' },
  { id: 'TZ-003', title: 'Value of Statistical Life', block: 'GLOBAL_INDICES', status: TaskStatus.PENDING, progress: 0, perplexityPrompt: 'Collect data on Value of Statistical Life used in USA, EU, Russia...' },
  { id: 'TZ-007', title: 'Crime & Ethics Stats', block: 'MORALITY', status: TaskStatus.VALIDATING, progress: 85, perplexityPrompt: 'Collect international statistics on violent crime, corruption, trust...' },
];

const TaskRegistry: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Реестр задач (TZ 001-030)</h2>
          <p className="text-slate-500 font-medium mt-1">Очередь сбора данных через Perplexity AI</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Поиск по ТЗ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-4 focus:ring-amber-500/5 outline-none w-64"
            />
          </div>
          <button className="p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid gap-4">
        {INITIAL_TASKS.map((task) => (
          <div key={task.id} className="bg-white border border-slate-200 rounded-[1.5rem] p-5 shadow-sm hover:shadow-md transition-all group flex items-center justify-between">
            <div className="flex items-center gap-6 flex-1">
              <div className={`p-4 rounded-2xl ${
                task.status === TaskStatus.COMPLETED ? 'bg-emerald-50 text-emerald-600' :
                task.status === TaskStatus.COLLECTING ? 'bg-amber-50 text-amber-600' :
                'bg-slate-50 text-slate-400'
              }`}>
                <Database size={20} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-black text-slate-400 tracking-widest">{task.id}</span>
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-tight">{task.title}</h3>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border border-slate-100 ${
                    task.status === TaskStatus.COMPLETED ? 'text-emerald-600 bg-emerald-50' :
                    task.status === TaskStatus.VALIDATING ? 'text-indigo-600 bg-indigo-50' :
                    'text-slate-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 truncate max-w-md italic opacity-70">
                  {task.perplexityPrompt}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="w-32 hidden md:block">
                <div className="flex justify-between text-[10px] font-black text-slate-400 mb-1 uppercase tracking-tighter">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${
                      task.status === TaskStatus.COMPLETED ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} 
                    style={{ width: `${task.progress}%` }} 
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button title="Запустить сбор" className="p-2.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all">
                  <PlayCircle size={20} />
                </button>
                <button title="Копировать промпт" className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <ExternalLink size={20} />
                </button>
                {task.status === TaskStatus.COMPLETED && (
                  <div className="p-2.5 text-emerald-500">
                    <CheckCircle2 size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0a0c10] rounded-[2rem] p-10 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-black uppercase tracking-[0.2em] text-amber-500 mb-4">Памятка Автора</h3>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed font-medium">
            Глава I — это фундамент. Здесь we не спорим с Всемирным Банком или ООН. Мы просто фиксируем их методики «как есть». 
            Критика и альтернативная модель HCQI-7 начнется в Главе III.
          </p>
        </div>
        <div className="absolute right-[-5%] top-[-50%] opacity-10">
           <ScrollText size={300} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default TaskRegistry;
