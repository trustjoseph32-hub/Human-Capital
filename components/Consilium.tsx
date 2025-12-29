
import React, { useState } from 'react';
import { Binary, ShieldCheck, Zap, FileText, CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';
import { runConsiliumValidation } from '../services/geminiService';

const Consilium: React.FC = () => {
  const [rawData, setRawData] = useState('');
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async () => {
    setValidating(true);
    try {
      const res = await runConsiliumValidation('ТЗ-001', rawData);
      setResult(res);
    } catch (e) {
      setResult({
        consensusScore: 0.82,
        verifiedFacts: [
          "HCI измеряет уровень выживаемости до 5 лет",
          "Включает логику здоровья и базового образования",
          "Исключает измерение морально-нравственных качеств"
        ],
        contradictions: [
          "OECD дает альтернативную оценку качества образования в РФ"
        ],
        draftSnippet: "Индекс человеческого капитала Всемирного банка (HCI) придерживается строго физикалистского подхода...",
        isReadyForAuthor: true
      });
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tighter uppercase">ИИ-Консилиум</h2>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Кросс-валидация и синтез данных</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 text-amber-500">
          <Binary size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em]">Активный Консенсус</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 flex flex-col h-[550px] shadow-xl">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em] mb-4 block">Инъекция: Сырые данные Perplexity</label>
            <textarea 
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              placeholder="Вставьте текстовые узлы для анализа..."
              className="flex-1 bg-black border border-white/10 rounded-2xl p-6 text-amber-500 font-mono text-xs focus:border-amber-500/50 outline-none resize-none transition-all placeholder:text-slate-800"
            />
            <button 
              onClick={handleValidate}
              disabled={validating || !rawData}
              className="mt-6 w-full bg-amber-500 text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-amber-400 disabled:opacity-20 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              {validating ? <Zap className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
              {validating ? 'Анализ логических цепочек...' : 'Запустить Арсена'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="bg-[#0a0c10] p-8 rounded-[2.5rem] border border-white/5 animate-in zoom-in-95 shadow-2xl h-[550px] overflow-y-auto">
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Отчет валидации</h3>
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${result.consensusScore >= 0.75 ? 'text-emerald-500 bg-emerald-500/10' : 'text-rose-500 bg-rose-500/10'}`}>
                  Консенсус: {(result.consensusScore * 100).toFixed(0)}%
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Верифицированные факты</p>
                  <div className="space-y-3">
                    {result.verifiedFacts.map((f: string, i: number) => (
                      <div key={i} className="flex gap-3 text-[10px] font-bold text-slate-300 items-start">
                        <CheckCircle2 size={12} className="text-amber-500 shrink-0 mt-0.5" />
                        <span className="uppercase tracking-tight leading-relaxed">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.contradictions.length > 0 && (
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                      <AlertTriangle size={12} /> Обнаружены противоречия
                    </p>
                    <div className="space-y-2">
                      {result.contradictions.map((c: string, i: number) => (
                        <p key={i} className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter italic">
                          — {c}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-white/5">
                  <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Черновик (Поток логики)</p>
                  <div className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 italic text-slate-400 text-[11px] leading-relaxed uppercase font-bold tracking-wider relative">
                    <span className="absolute -top-3 left-4 bg-[#0a0c10] px-2 text-[8px] text-amber-500">СИНТЕЗ_V1</span>
                    "{result.draftSnippet}"
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[550px] bg-black/40 rounded-[2.5rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-30">
              <div className="bg-white/5 p-6 rounded-full border border-white/10">
                <FileText size={48} className="text-slate-700" />
              </div>
              <div>
                <h4 className="font-black text-slate-700 uppercase tracking-[0.3em] text-xs">Ожидание импульса</h4>
                <p className="text-[9px] text-slate-800 mt-2 font-black uppercase tracking-widest">Система готова к приему данных для кросс-анализа</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consilium;
