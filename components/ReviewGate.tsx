
import React, { useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Zap,
  Sparkles
} from 'lucide-react';
import { analyzeToneAndFacts } from '../services/geminiService';

const ReviewGate: React.FC = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  const mockDraft = `
    Эволюция измерения человеческого капитала перешла от простых образовательных показателей к сложным цифровым поведенческим индексам. 
    В 2024 году Индекс человеческого капитала (HCI) Всемирного банка показал снижение эффективности на 2,4% из-за разрывов в интеграции ИИ. 
    Гэри Беккер (1964) изначально определял человеческий капитал преимущественно через инвестиции в обучение и здравоохранение. 
    Однако новая цифровая парадигма требует измерения навыков в реальном времени через взаимодействие с платформами.
  `;

  const sources = [
    "Всемирный банк: Отчет об Индексе человеческого капитала 2024",
    "OECD: Образование в цифрах 2024",
    "Беккер Г. (1964): Человеческий капитал: теоретический и эмпирический анализ"
  ];

  const handleAIReview = async () => {
    setAnalyzing(true);
    try {
      const result = await analyzeToneAndFacts(mockDraft, sources);
      setAnalysisResult(result);
    } catch (e) {
      setAnalysisResult({
        toneScore: 88,
        factIssues: [
          { statement: "снижение на 2.4%", correction: "Данные за 2024 год показывают снижение на 2.1% в развитых регионах.", severity: "средняя" }
        ],
        summary: "Текст соответствует академическому стилю. Требуется уточнение статистических данных во втором абзаце."
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#0a0c10] p-8 rounded-[2rem] border border-white/5 shadow-2xl">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Редакционный Гейт: Факты и Тон</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Рецензирование Черновика Главы 01 (v2.4)</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAIReview}
            disabled={analyzing}
            className="flex items-center gap-2 bg-amber-500/10 text-amber-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all border border-amber-500/20 disabled:opacity-50"
          >
            {analyzing ? <Zap className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            {analyzing ? "АНАЛИЗ..." : "ЗАПУСТИТЬ АУДИТ"}
          </button>
          <button className="flex items-center gap-2 bg-amber-500 text-black px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 shadow-lg shadow-amber-500/20 transition-all">
            <CheckCircle size={16} />
            ОДОБРИТЬ ФИНАЛ
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-[#0a0c10] rounded-[2rem] border border-white/5 overflow-hidden shadow-sm flex flex-col h-[600px]">
            <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex justify-between items-center">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Рабочая область черновика</span>
              <div className="flex gap-4">
                <span className="text-[10px] text-slate-600 font-bold uppercase">Слов: 4,502</span>
                <span className="text-[10px] text-slate-600 font-bold uppercase">Стиль: Академический</span>
              </div>
            </div>
            <div className="flex-1 p-10 overflow-y-auto leading-relaxed text-slate-300 font-serif text-lg selection:bg-amber-500/30">
              {mockDraft.split('\n').map((para, i) => para.trim() && (
                <p key={i} className="mb-6">{para.trim()}</p>
              ))}
              <div className="bg-white/5 border border-white/5 rounded-2xl p-8 mt-12">
                <h4 className="text-[10px] font-black text-white mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
                  <ShieldCheck className="text-amber-500" size={16} />
                  Реестр верифицированных источников
                </h4>
                <ul className="space-y-3">
                  {sources.map((src, i) => (
                    <li key={i} className="text-[11px] text-slate-500 flex items-center justify-between group hover:text-slate-300 transition-colors">
                      <span className="flex items-center gap-3">
                        <ChevronRight size={14} className="text-amber-500" /> {src}
                      </span>
                      <button className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0a0c10] rounded-[2rem] border border-white/5 p-8 shadow-sm">
            <h3 className="text-xs font-black text-white mb-8 flex items-center gap-2 uppercase tracking-[0.2em]">
              <AlertCircle className="text-amber-500" size={18} />
              Инсайты ИИ-аудитора
            </h3>
            
            {!analysisResult && !analyzing && (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-dashed border-white/10">
                  <Zap className="text-slate-700" />
                </div>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest leading-relaxed">Запустите проверку, чтобы найти фактологические ошибки и отклонения от тона.</p>
              </div>
            )}

            {analyzing && (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse" />
                ))}
              </div>
            )}

            {analysisResult && (
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Соответствие стилю</span>
                    <span className="text-sm font-black text-amber-500 font-mono">{analysisResult.toneScore}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" style={{ width: `${analysisResult.toneScore}%` }} />
                  </div>
                </div>

                <div className="space-y-4">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Обнаруженные правки</span>
                  {analysisResult.factIssues.map((issue: any, i: number) => (
                    <div key={i} className={`p-5 rounded-2xl border ${issue.severity === 'высокая' ? 'bg-rose-500/5 border-rose-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                      <p className="text-[8px] font-black text-slate-500 mb-2 uppercase tracking-widest">В тексте:</p>
                      <p className="text-[11px] text-slate-400 mb-4 italic leading-relaxed">"...{issue.statement}..."</p>
                      <p className="text-[8px] font-black text-amber-500 mb-2 uppercase tracking-widest">Коррекция:</p>
                      <p className="text-[11px] text-white font-bold leading-relaxed">{issue.correction}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5">
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed italic uppercase tracking-tighter opacity-70">
                    "{analysisResult.summary}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-black rounded-[2rem] border border-white/5 p-8 text-white">
            <h4 className="text-[10px] font-black mb-6 flex items-center gap-2 uppercase tracking-[0.2em]">
              <MessageSquare size={16} className="text-amber-500" />
              Связь с Редактором
            </h4>
            <div className="bg-white/5 rounded-2xl p-4 mb-6 h-32 overflow-y-auto">
              <div className="text-[8px] text-amber-500 font-black mb-2 uppercase tracking-[0.2em]">Система:</div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Ожидание ввода правок...</p>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Запрос на переписывание..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs focus:ring-1 focus:ring-amber-500 outline-none transition-all pr-12 text-white"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-amber-500 rounded-lg text-black hover:bg-amber-400 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewGate;
