
import React from 'react';
import { Objective, Bet, BetStatus } from '../types';

interface ObjectivesSectionProps {
  objectives: Objective[];
  bets: Bet[];
  onAddObjective: () => void;
  onDeleteObjective: (id: string) => void;
}

const ObjectivesSection: React.FC<ObjectivesSectionProps> = ({ objectives, bets, onAddObjective, onDeleteObjective }) => {
  
  // Calcular média de lucro por aposta ganha para as projeções
  const wonBets = bets.filter(b => b.status === BetStatus.WON);
  const avgProfit = wonBets.length > 0 
    ? wonBets.reduce((acc, b) => acc + (b.resultAmount - b.stake), 0) / wonBets.length 
    : 10; // Default fallback para cálculo inicial

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center px-1">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <i className="fa-solid fa-bullseye text-indigo-400"></i>
          Objetivos de Banca
        </h3>
        <button 
          onClick={onAddObjective}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20"
        >
          <i className="fa-solid fa-plus"></i>
          Criar Meta
        </button>
      </div>

      {objectives.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 border-dashed p-8 rounded-2xl text-center">
          <p className="text-slate-500 text-sm">Nenhum objetivo definido. Crie uma meta para ver sua evolução.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {objectives.map(obj => {
            const currentAmount = obj.initialAmount + bets
              .filter(b => b.objectiveId === obj.id)
              .reduce((acc, b) => {
                if (b.status === BetStatus.WON) return acc + (b.resultAmount - b.stake);
                if (b.status === BetStatus.LOST) return acc - b.stake;
                return acc;
              }, 0);

            const progress = Math.min(100, Math.max(0, ((currentAmount - obj.initialAmount) / (obj.targetAmount - obj.initialAmount)) * 100));
            const remaining = Math.max(0, obj.targetAmount - currentAmount);
            const estimatedBets = remaining > 0 ? Math.ceil(remaining / avgProfit) : 0;

            return (
              <div key={obj.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-white flex items-center gap-2">
                      {obj.name}
                      {progress >= 100 && <i className="fa-solid fa-circle-check text-emerald-500"></i>}
                    </h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Progresso da Meta</p>
                  </div>
                  <button 
                    onClick={() => onDeleteObjective(obj.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-rose-500 transition-all p-1"
                  >
                    <i className="fa-solid fa-trash-can text-sm"></i>
                  </button>
                </div>

                <div className="flex items-end justify-between mb-2">
                  <div className="text-2xl font-black text-indigo-400">
                    R$ {currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    <span className="text-xs text-slate-500 font-normal ml-2">de R$ {obj.targetAmount.toLocaleString('pt-BR')}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-bold uppercase">Esforço Estimado</div>
                    <div className="text-sm font-bold text-amber-400">~ {estimatedBets} apostas</div>
                  </div>
                </div>

                <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${progress >= 100 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-indigo-500'}`}
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                <div className="mt-2 flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                  <span>Início: R$ {obj.initialAmount.toFixed(0)}</span>
                  <span>{progress.toFixed(1)}% concluído</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ObjectivesSection;
