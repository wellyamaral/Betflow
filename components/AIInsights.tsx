
import React, { useState, useEffect } from 'react';
import { Bet } from '../types';
import { analyzePerformance } from '../services/geminiService';

interface AIInsightsProps {
  bets: Bet[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ bets }) => {
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    const result = await analyzePerformance(bets);
    setAnalysis(result);
    setLoading(false);
  };

  return (
    <div className="bg-indigo-900/30 border border-indigo-500/20 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-indigo-500/10 flex items-center justify-between">
        <h3 className="font-bold flex items-center gap-2 text-indigo-300">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          Consultor BetFlow (IA)
        </h3>
        {bets.length > 0 && (
          <button 
            onClick={handleAnalyze}
            disabled={loading}
            className="text-[10px] uppercase font-black bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 rounded-full transition-all disabled:opacity-50"
          >
            {loading ? 'Analisando...' : 'Atualizar'}
          </button>
        )}
      </div>
      
      <div className="p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 text-indigo-400/50">
            <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-xs italic">Processando padrões estratégicos...</p>
          </div>
        ) : analysis ? (
          <div className="prose prose-invert prose-sm max-w-none">
            <div className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">
              {analysis}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-slate-400 text-sm mb-4 italic">
              "A inteligência artificial pode ajudar a identificar falhas na sua gestão de banca."
            </p>
            <button 
              onClick={handleAnalyze}
              className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-bold rounded-xl transition-all"
            >
              Gerar Análise agora
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
