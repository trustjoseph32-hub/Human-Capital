
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskRegistry from './components/TaskRegistry';
import Consilium from './components/Consilium';
import Pipeline from './components/Pipeline';
import ReviewGate from './components/ReviewGate';
import Metaphysics from './components/Metaphysics';
import { 
  Bell, 
  Search, 
  Terminal,
  ShieldCheck,
  Cpu
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('automation');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TaskRegistry />;
      case 'automation': return <Pipeline />;
      case 'consilium': return <Consilium />;
      case 'review': return <ReviewGate />;
      case 'monograph': 
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-700 space-y-4 animate-in fade-in">
            <ShieldCheck size={64} className="opacity-10" />
            <h3 className="text-xl font-black uppercase tracking-[0.3em] text-slate-800 text-center">Синтез Рукописи</h3>
            <p className="text-[10px] text-center max-w-xs opacity-60 font-black uppercase tracking-widest leading-relaxed">Генерация черновика в реальном времени на основе верифицированных данных...</p>
          </div>
        );
      case 'metaphysics': return <Metaphysics />;
      case 'terminal': 
        return (
          <div className="bg-[#0a0c10] rounded-[2.5rem] p-10 font-mono text-[10px] text-amber-500 overflow-hidden h-[75vh] shadow-2xl border border-white/5 relative">
            <div className="flex items-center gap-2 text-slate-700 mb-8 border-b border-white/5 pb-4 uppercase font-black tracking-[0.2em]">
              <Terminal size={14} />
              <span>Оболочка Arsenal.AI [Версия 1.0.4]</span>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[55vh] scrollbar-hide">
              <p><span className="text-slate-700">[СИСТЕМА]</span> Инициализация ядра...</p>
              <p><span className="text-amber-600">[ВОРКЕР]</span> Конвейер "СБОРЩИК_ДАННЫХ" готов.</p>
              <p><span className="text-indigo-600">[БД]</span> Подключение к Neo4j установлено.</p>
              <p><span className="text-slate-700">[СИСТЕМА]</span> Ожидание команд оператора...</p>
              <p className="animate-pulse text-amber-500">_</p>
            </div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050608] text-slate-400 selection:bg-amber-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10 lg:p-14">
        <header className="flex justify-between items-center mb-12 sticky top-0 bg-[#050608]/90 backdrop-blur-xl z-30 py-4 -mt-4 border-b border-white/5 px-4 -mx-4">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-3.5 text-slate-600 group-hover:text-amber-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Системный поиск..." 
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-amber-500/50 outline-none transition-all text-white"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-[#0a0c10] rounded-2xl border border-white/10 shadow-2xl">
              <Cpu size={14} className="text-amber-500 animate-pulse" />
              <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Узел: 185.22.XX.XX</span>
            </div>
            <button className="p-3 text-slate-600 hover:text-white transition-all">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 bg-white/5 p-1 pr-4 border border-white/10 rounded-xl hover:border-amber-500 transition-all cursor-pointer group">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-black font-black text-xs">
                АР
              </div>
              <p className="text-[10px] font-black text-white leading-none uppercase tracking-tighter">А.В. РУЦКОЙ</p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto pb-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
