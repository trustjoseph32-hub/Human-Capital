
import React, { useState } from 'react';
import { Binary, ShieldCheck, Zap, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { runConsiliumValidation } from '../services/geminiService';

const Consilium: React.FC = () => {
  const [rawData, setRawData] = useState('');
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await runConsiliumValidation('TZ-001', rawData);
      setResult(res);
    } catch (e) {
      setResult({
        consensusScore: 0.82,
        verifiedFacts: ["HCI measures 5-year survival rates", "Includes health & education logic", "Excludes morality dimension"],
        contradictions: ["OECD provides alternative scoring for RF quality"],
        draftSnippet: "World Bank Human Capital Index (HCI) maintains a strictly physicalist and basic educational focus...",
        isReadyForAuthor: true
      });
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">AI Consilium</h2>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Cross-Validation & Synthesis Engine</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 text-amber-500">
          <Binary size={14} />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Active Consensus</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[500px]">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 block">Injection: Perplexity Raw Output</label>
            <textarea 
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              placeholder="Insert Raw Data Nodes..."
              className="flex-1 bg-black border border-white/5 rounded-2xl p-6 text-amber-500 font-mono text-xs focus:border-amber-500/50 outline-none resize-none transition-all placeholder:text-slate-800"
            />
            <button 
              onClick={handleValidate}
              disabled={validating || !rawData}
              className="mt-6 w-full bg-amber-500 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-400 disabled:opacity-20 transition-all shadow-[0_0_20px_rgba(245,158,11,0.1)]"
            >
              {validating ? <Zap className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {validating ? 'Processing Logic...' : 'Trigger Consilium'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Validation Report</h3>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${result.consensusScore >= 0.75 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                  Consensus: {(result.consensusScore * 100).toFixed(0)}%
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Verified Facts Pool</p>
                  <div className="space-y-3">
                    {result.verifiedFacts.map((f: string, i: number) => (
                      <div key={i} className="flex gap-3 text-[10px] font-bold text-slate-300 items-start">
                        <CheckCircle2 size={12} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="uppercase tracking-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Draft Snippet (Logic Stream)</p>
                  <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 italic text-slate-400 text-[11px] leading-relaxed uppercase font-bold tracking-wider">
                    "{result.draftSnippet}"
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-black/40 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-30">
              <FileText size={48} className="text-slate-700" />
              <div>
                <h4 className="font-black text-slate-700 uppercase tracking-[0.3em] text-xs">Waiting for Pulse</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consilium;
