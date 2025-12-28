
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
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

const chapterProgress = [
  { name: 'Глава I', progress: 35, color: '#f59e0b' },
  { name: 'Глава II', progress: 5, color: '#4f46e5' },
  { name: 'Глава III', progress: 0, color: '#1e293b' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 select-none">
      <header className="flex justify-between items-end bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5">
        <div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">Обзор Манифеста</h2>
          <div className="flex items-center gap-4">
            <span className="text-[9px] font-black text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-[0.2em]">
              Data Epoch: 1925–2025
            </span>
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Mode: Imperative Realism
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">System Release</p>
          <p className="text-xl font-black text-white leading-none tracking-tighter">15 FEB 2026</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Data Harvest', val: '12/30', sub: 'Tasks Completed', icon: Database, color: 'text-amber-500' },
          { label: 'AI Validation', val: '75%', sub: 'Consensus Threshold', icon: BrainCircuit, color: 'text-indigo-500' },
          { label: 'Verified Nodes', val: '412', sub: 'Chapter I Facts', icon: CheckCircle2, color: 'text-emerald-500' },
          { label: 'Audit Span', val: '100 YRS', sub: 'Historical Depth', icon: History, color: 'text-slate-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-[#0a0c10] p-6 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all group">
            <div className="mb-4">
              <stat.icon className={`${stat.color} opacity-60 group-hover:opacity-100 transition-opacity`} size={20} />
            </div>
            <h3 className="text-2xl font-black text-white tracking-tighter">{stat.val}</h3>
            <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
            <p className="text-[10px] text-slate-500 mt-3 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
            <ChevronRight className="text-amber-500" size={14} /> Book Architecture Progress
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

        <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={16} /> Conflict Nodes
          </h3>
          <div className="space-y-4 relative z-10">
            {[
              { t: 'Consensus VSL', s: 'OECD vs World Bank gap' },
              { t: 'TZ-007 Logic', s: 'Sparse data 1925-1940' },
              { t: 'GDP Correlation', s: '10-country sync needed' }
            ].map((alert, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <p className="text-[8px] font-black text-amber-500 uppercase mb-1">{alert.t}</p>
                <p className="text-[10px] font-bold text-slate-400">{alert.s}</p>
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
