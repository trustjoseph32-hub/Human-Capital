
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TaskRegistry from './components/TaskRegistry';
import Consilium from './components/Consilium';
import { 
  Bell, 
  Search, 
  User, 
  Terminal,
  ShieldCheck
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'tasks': return <TaskRegistry />;
      case 'consilium': return <Consilium />;
      case 'monograph': 
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-slate-400 space-y-4 animate-in fade-in">
            <ShieldCheck size={64} className="opacity-10" />
            <h3 className="text-xl font-black uppercase tracking-widest text-slate-300">Рукопись в сборке</h3>
            <p className="text-sm text-center max-w-xs opacity-60 font-medium">Текст формируется на основе верифицированных данных Главы I.</p>
          </div>
        );
      case 'sources':
        return (
          <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm h-[70vh] overflow-y-auto">
             <h2 className="text-2xl font-black uppercase tracking-tighter mb-8">Разрешенные источники (Verified)</h2>
             <ul className="space-y-4">
               {['World Bank (HCI)', 'UNDP (HDI)', 'WHO', 'OECD', 'ILO', 'UNESCO', 'UNODC', 'Transparency International'].map(s => (
                 <li key={s} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
                   <span className="font-bold text-slate-700">{s}</span>
                   <span className="ml-auto text-[10px] font-black text-slate-400 uppercase tracking-widest">SLA: 100% Reliability</span>
                 </li>
               ))}
             </ul>
          </div>
        );
      case 'terminal': 
        return (
          <div className="bg-black rounded-[2.5rem] p-10 font-mono text-[10px] text-emerald-500 overflow-hidden h-[75vh] shadow-2xl border border-white/10 relative">
            <div className="flex items-center gap-2 text-slate-600 mb-8 border-b border-white/5 pb-4 uppercase font-black tracking-widest">
              <Terminal size={14} />
              <span>Arsenal.AI Framework Shell</span>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[55vh] scrollbar-hide">
              <p><span className="text-slate-600">[SYSTEM]</span> Initializing ARSENAL.AI methodology engine...</p>
              <p><span className="text-slate-600">[CONSILIUM]</span> Waiting for Perplexity JSON data packets...</p>
              <p><span className="text-amber-500">[TZ-001]</span> World Bank HCI documentation loaded successfully.</p>
              <p><span className="text-indigo-500">[LOGIC]</span> Chapter I verification rules: DESCRIPTIVE=TRUE | OPINION=FALSE</p>
              <p><span className="text-emerald-500">[SECURITY]</span> Hallucination protection level: MAXIMAL</p>
              <p className="animate-pulse">_</p>
            </div>
            <div className="absolute bottom-10 left-10 right-10 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center px-6">
              <span className="text-amber-500 mr-3 font-black">{'>'}</span>
              <input type="text" className="bg-transparent border-none outline-none text-emerald-400 w-full placeholder:text-white/5" placeholder="Введите команду операционного ядра..." />
            </div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfd] text-slate-900 selection:bg-amber-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-10 lg:p-14">
        <header className="flex justify-between items-center mb-14 sticky top-0 bg-[#fcfcfd]/80 backdrop-blur-md z-30 py-4 -mt-4 border-b border-slate-200/50 px-4 -mx-4">
          <div className="relative w-96 group">
            <Search className="absolute left-4 top-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Поиск по ТЗ, фактам или источникам..." 
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold uppercase tracking-widest focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/30 outline-none transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 rounded-2xl border border-white/5 shadow-xl">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,1)]" />
              <span className="text-[10px] font-black text-white uppercase tracking-[0.1em]">Engine: Online</span>
            </div>
            <button className="p-3.5 text-slate-500 hover:bg-white hover:shadow-sm rounded-2xl transition-all relative border border-transparent hover:border-slate-200">
              <Bell size={20} />
              <div className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-amber-500 rounded-full border-2 border-[#fcfcfd]" />
            </button>
            <div className="h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-4 bg-white p-1 pr-5 border border-slate-200 rounded-2xl shadow-sm hover:border-amber-300 transition-all cursor-pointer group">
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black group-hover:bg-amber-500 group-hover:text-black transition-colors">
                AV
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-black text-slate-900 leading-none uppercase tracking-tighter">A.V. RUTSKOY</p>
                <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-widest font-black">Lead Author</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
