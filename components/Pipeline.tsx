
import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  ExternalLink, 
  Search, 
  FileText, 
  BookOpen, 
  Zap,
  Activity,
  MoreVertical
} from 'lucide-react';
import { Workflow, ProjectStatus } from '../types';

const Pipeline: React.FC = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    { 
      id: '1', 
      name: 'SOURCE_HARVESTER', 
      description: 'Сбор данных через RSS, HTTP Request и реестр источников (ООН, ВБ, OECD).', 
      status: ProjectStatus.IDLE, 
      lastRun: '2 часа назад', 
      progress: 0 
    },
    { 
      id: '2', 
      name: 'BRIEF_AND_FACTS', 
      description: 'Резюмирование, выделение тезисов и создание карточек фактов.', 
      status: ProjectStatus.RUNNING, 
      lastRun: 'Только что', 
      progress: 65 
    },
    { 
      id: '3', 
      name: 'CHAPTER_BUILDER', 
      description: 'Сборка черновой редакции по шаблонам docx и структуре ТЗ.', 
      status: ProjectStatus.WAITING_APPROVAL, 
      lastRun: '1 день назад', 
      progress: 100 
    },
    { 
      id: '4', 
      name: 'ASSET_GENERATOR', 
      description: 'Генерация схем (OpenAI) и художественных обложек (Midjourney).', 
      status: ProjectStatus.IDLE, 
      lastRun: '4 часа назад', 
      progress: 0 
    },
    { 
      id: '5', 
      name: 'PUBLISHER (Scribus)', 
      description: 'Финальная верстка в SLA, экспорт PDF/EPUB и архивация проекта.', 
      status: ProjectStatus.COMPLETED, 
      lastRun: '3 дня назад', 
      progress: 100 
    },
  ]);

  const toggleStatus = (id: string) => {
    setWorkflows(prev => prev.map(w => {
      if (w.id === id) {
        const isRunning = w.status === ProjectStatus.RUNNING;
        return {
          ...w,
          status: isRunning ? ProjectStatus.IDLE : ProjectStatus.RUNNING,
          progress: isRunning ? 0 : 5
        };
      }
      return w;
    }));
  };

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.RUNNING: return 'text-blue-600 bg-blue-50 border-blue-200';
      case ProjectStatus.WAITING_APPROVAL: return 'text-amber-600 bg-amber-50 border-amber-200';
      case ProjectStatus.COMPLETED: return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case ProjectStatus.ERROR: return 'text-rose-600 bg-rose-50 border-rose-200';
      default: return 'text-slate-500 bg-slate-50 border-slate-200';
    }
  };

  const translateStatus = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.RUNNING: return 'В РАБОТЕ';
      case ProjectStatus.WAITING_APPROVAL: return 'ЖДЕТ ОДОБРЕНИЯ';
      case ProjectStatus.COMPLETED: return 'ЗАВЕРШЕНО';
      case ProjectStatus.ERROR: return 'ОШИБКА';
      default: return 'ПРОСТОЙ';
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Конвейеры автоматизации</h2>
          <p className="text-slate-500">Оркестрация сценариев n8n и Make.com</p>
        </div>
        <div className="flex gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-500"/> 3 Онлайн</div>
          <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"/> 1 Гейт</div>
        </div>
      </div>

      <div className="grid gap-4">
        {workflows.map((wf) => (
          <div key={wf.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:border-indigo-100 transition-all group">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className={`p-4 rounded-xl ${wf.status === ProjectStatus.RUNNING ? 'bg-indigo-600 text-white animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                  {wf.id === '1' ? <Search size={20}/> : wf.id === '2' ? <Activity size={20}/> : wf.id === '3' ? <FileText size={20}/> : <Zap size={20}/>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-bold text-slate-900 truncate uppercase tracking-tighter">{wf.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold ${getStatusStyle(wf.status)}`}>
                      {translateStatus(wf.status)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 truncate">{wf.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <div className="hidden md:block text-right">
                  <p className="text-xs text-slate-400 font-medium">Последний запуск</p>
                  <p className="text-sm text-slate-700 font-bold">{wf.lastRun}</p>
                </div>
                
                <div className="w-32 hidden lg:block">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
                    <span>ПРОГРЕСС</span>
                    <span>{wf.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${wf.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleStatus(wf.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      wf.status === ProjectStatus.RUNNING 
                        ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                  >
                    {wf.status === ProjectStatus.RUNNING ? <RotateCcw size={20} /> : <Play size={20} />}
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                    <ExternalLink size={20} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-3 rounded-full border border-slate-700">
              <Zap className="text-amber-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Статус серверов: Оптимально</h4>
              <p className="text-slate-400 text-sm">Задержка: 45мс | Память: 2.4ГБ / 8ГБ</p>
            </div>
          </div>
          <button className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-2 rounded-xl text-sm font-bold transition-all backdrop-blur-sm">
            Открыть панель n8n
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pipeline;
