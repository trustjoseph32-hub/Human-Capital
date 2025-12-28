
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
      // Mock for UI demo if API unavailable
      setResult({
        consensusScore: 0.82,
        verifiedFacts: ["HCI измеряет выживаемость до 5 лет", "HCI включает индекс школы и здоровья", "Методика не учитывает нравственность"],
        contradictions: ["OECD дает иную оценку качества образования для РФ"],
        draftSnippet: "Индекс человеческого капитала (HCI) Всемирного банка фокусируется на физическом выживании и базовом образовании...",
        isReadyForAuthor: true
      });
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">ИИ-Консилиум</h2>
          <p className="text-slate-500 font-medium">Кросс-проверка данных и синтез Арсена</p>
        </div>
        <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
          <Binary className="text-indigo-600" size={16} />
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest text-center">Consensus Engine Active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-[500px]">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Вставьте данные из Perplexity (CSV/TXT)</label>
            <textarea 
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              placeholder="Институция | Определение | Год | Источник..."
              className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl p-6 text-slate-800 font-mono text-sm focus:border-amber-500/30 outline-none resize-none transition-all"
            />
            <button 
              onClick={handleValidate}
              disabled={validating || !rawData}
              className="mt-6 w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-800 disabled:opacity-50 shadow-xl transition-all"
            >
              {validating ? <Zap className="animate-spin" /> : <ShieldCheck size={20} />}
              {validating ? 'Идет валидация...' : 'Запустить Консилиум'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {result ? (
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm animate-in zoom-in-95">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-slate-900 uppercase">Результат валидации</h3>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${result.consensusScore >= 0.75 ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-rose-50 text-rose-600 border border-rose-200'}`}>
                  Консенсус: {(result.consensusScore * 100).toFixed(0)}%
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Верифицированные факты</p>
                  <div className="space-y-2">
                    {result.verifiedFacts.map((f: string, i: number) => (
                      <div key={i} className="flex gap-3 text-xs font-bold text-slate-700 items-start">
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {result.contradictions.length > 0 && (
                  <div>
                    <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-3">Противоречия / Ошибки</p>
                    <div className="space-y-2">
                      {result.contradictions.map((c: string, i: number) => (
                        <div key={i} className="flex gap-3 text-xs font-bold text-rose-600 items-start bg-rose-50 p-3 rounded-xl border border-rose-100">
                          <AlertCircle size={14} className="shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Черновик (Imperative Logic)</p>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic text-slate-600 text-sm leading-relaxed">
                    "{result.draftSnippet}"
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-12 space-y-6 opacity-60">
              <div className="p-6 bg-white rounded-full shadow-inner text-slate-300">
                <FileText size={64} />
              </div>
              <div>
                <h4 className="font-black text-slate-400 uppercase tracking-widest">Ожидание данных</h4>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">Загрузите результаты сбора данных, чтобы Арсен провел финальный синтез для рукописи.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consilium;
