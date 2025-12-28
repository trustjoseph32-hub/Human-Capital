
import React from 'react';
import { 
  ShieldAlert, 
  Database, 
  Binary, 
  BookOpenCheck, 
  ScrollText, 
  Settings,
  Terminal,
  Activity,
  Cpu,
  GlassWater
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Статус Проекта', icon: Activity },
    { id: 'tasks', label: 'Реестр ТЗ', icon: Database },
    { id: 'automation', label: 'Автозавод', icon: Cpu },
    { id: 'consilium', label: 'ИИ-Консилиум', icon: Binary },
    { id: 'review', label: 'Редактура', icon: GlassWater },
    { id: 'monograph', label: 'Текст Рукописи', icon: ScrollText },
    { id: 'terminal', label: 'Runtime Shell', icon: Terminal },
  ];

  return (
    <div className="w-72 bg-[#050608] text-slate-400 flex flex-col h-screen fixed left-0 top-0 border-r border-white/5 z-50">
      <div className="p-8 border-b border-white/5 bg-[#08090c]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2 rounded-lg shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <ShieldAlert className="text-black w-5 h-5" />
            </div>
            <h1 className="text-white font-black text-sm tracking-[0.15em] uppercase">Human Capital</h1>
          </div>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Scientific Monograph v1.0</p>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/5 text-amber-500 border border-white/10 shadow-inner' 
                  : 'hover:bg-white/[0.02] hover:text-slate-200'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-amber-500' : 'text-slate-500 group-hover:text-amber-500'} />
              <span className="font-bold text-[11px] uppercase tracking-wider">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,1)]" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5 bg-[#08090c]">
        <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase mb-4 tracking-tighter">
          <span>Author: A.V. Rutskoy</span>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition-colors group text-[10px] font-bold uppercase tracking-widest">
          <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
          <span>Система</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
