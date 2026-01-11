
import React from 'react';
import { Bet, BetStatus } from '../types';

interface BetListProps {
  bets: Bet[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: BetStatus) => void;
}

const BetList: React.FC<BetListProps> = ({ bets, onDelete, onUpdateStatus }) => {
  if (bets.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 border-dashed rounded-2xl p-12 text-center">
        <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
          <i className="fa-solid fa-ghost text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-slate-300">Nenhuma aposta registrada</h3>
        <p className="text-slate-500 text-sm max-w-xs mx-auto mt-1">
          Clique no botão "Nova Aposta" para começar a gerir sua banca.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2 px-1">
        <i className="fa-solid fa-list-ul text-emerald-400"></i>
        Histórico Recente
      </h3>
      <div className="space-y-3">
        {bets.map((bet) => (
          <div 
            key={bet.id} 
            className="group bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-sm transition-all hover:border-slate-700 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${
                  bet.status === BetStatus.WON ? 'bg-emerald-500/10 text-emerald-500' :
                  bet.status === BetStatus.LOST ? 'bg-rose-500/10 text-rose-500' :
                  'bg-amber-500/10 text-amber-500'
                }`}>
                  <i className={`fa-solid ${
                    bet.status === BetStatus.WON ? 'fa-check' :
                    bet.status === BetStatus.LOST ? 'fa-xmark' :
                    'fa-clock'
                  }`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-white leading-tight">
                    {bet.teams}
                    {bet.isCascade && (
                      <span className="ml-2 text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">
                        Cascata
                      </span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(bet.date).toLocaleDateString('pt-BR')} • Stake: R${bet.stake.toFixed(2)} • Odd: {bet.odds}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Retorno Estimado</p>
                  <p className={`text-lg font-black ${
                    bet.status === BetStatus.WON ? 'text-emerald-400' : 
                    bet.status === BetStatus.LOST ? 'text-rose-400' : 'text-slate-300'
                  }`}>
                    R$ {(bet.status === BetStatus.WON ? bet.resultAmount : (bet.stake * bet.odds)).toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {bet.status === BetStatus.PENDING ? (
                    <>
                      <button 
                        onClick={() => onUpdateStatus(bet.id, BetStatus.WON)}
                        className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all shadow-sm"
                        title="Venceu"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(bet.id, BetStatus.LOST)}
                        className="p-2.5 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                        title="Perdeu"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => onUpdateStatus(bet.id, BetStatus.PENDING)}
                      className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-all shadow-sm"
                      title="Resetar para Pendente"
                    >
                      <i className="fa-solid fa-rotate-left"></i>
                    </button>
                  )}
                  <button 
                    onClick={() => onDelete(bet.id)}
                    className="p-2.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-rose-500/20 hover:text-rose-500 transition-all opacity-0 group-hover:opacity-100"
                    title="Excluir"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BetList;
