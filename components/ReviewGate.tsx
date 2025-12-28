
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Редакторский Гейт №1: Факты и Тон</h2>
          <p className="text-slate-500">Рецензирование Черновика Главы 01 (v2.4)</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleAIReview}
            disabled={analyzing}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-all border border-indigo-200 disabled:opacity-50"
          >
            {analyzing ? <Zap className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            {analyzing ? "ИИ анализирует..." : "Запустить ИИ-аудитора"}
          </button>
          <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 transition-all">
            <CheckCircle size={18} />
            Одобрить финал
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[600px]">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Рабочая область черновика</span>
              <div className="flex gap-4">
                <span className="text-xs text-slate-400">Слов: 4,502</span>
                <span className="text-xs text-slate-400">Стиль: Академический</span>
              </div>
            </div>
            <div className="flex-1 p-8 overflow-y-auto leading-relaxed text-slate-700 font-serif text-lg selection:bg-indigo-100">
              {mockDraft.split('\n').map((para, i) => para.trim() && (
                <p key={i} className="mb-6">{para.trim()}</p>
              ))}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" size={18} />
                  Реестр источников (Verified)
                </h4>
                <ul className="space-y-2">
                  {sources.map((src, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-center justify-between group">
                      <span className="flex items-center gap-2">
                        <ChevronRight size={12} /> {src}
                      </span>
                      <button className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink size={12} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <AlertCircle className="text-amber-500" size={20} />
              Инсайты аудитора
            </h3>
            
            {!analysisResult && !analyzing && (
              <div className="text-center py-12 px-6">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                  <Zap className="text-slate-300" />
                </div>
                <p className="text-sm text-slate-500">Запустите проверку, чтобы найти фактологические ошибки и отклонения от тона.</p>
              </div>
            )}

            {analyzing && (
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-16 bg-slate-50 rounded-xl animate-pulse" />
                ))}
              </div>
            )}

            {analysisResult && (
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-semibold text-slate-600">Соответствие стилю</span>
                    <span className="text-sm font-bold text-indigo-600">{analysisResult.toneScore}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${analysisResult.toneScore}%` }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase">Обнаруженные правки</span>
                  {analysisResult.factIssues.map((issue: any, i: number) => (
                    <div key={i} className={`p-4 rounded-xl border ${issue.severity === 'высокая' ? 'bg-rose-50 border-rose-100' : 'bg-amber-50 border-amber-100'}`}>
                      <p className="text-xs font-bold text-slate-500 mb-1 text-[10px] uppercase">В тексте:</p>
                      <p className="text-sm text-slate-700 mb-3 italic">"...{issue.statement}..."</p>
                      <p className="text-xs font-bold text-emerald-600 mb-1 text-[10px] uppercase">Коррекция:</p>
                      <p className="text-sm text-slate-900 font-medium">{issue.correction}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                    "{analysisResult.summary}"
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 text-white">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <MessageSquare size={18} className="text-indigo-400" />
              Чат с редактором
            </h4>
            <div className="bg-slate-800 rounded-xl p-3 mb-4 h-32 overflow-y-auto">
              <div className="text-[10px] text-indigo-300 font-bold mb-1 uppercase tracking-widest">Система:</div>
              <p className="text-xs text-slate-400">Ожидание ввода правок...</p>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Попросить ИИ переписать или уточнить..." 
                className="w-full bg-slate-800 border-none rounded-xl py-2 px-4 text-sm focus:ring-2 focus:ring-indigo-500 transition-all pr-12"
              />
              <button className="absolute right-2 top-1.5 p-1 bg-indigo-600 rounded-lg">
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
