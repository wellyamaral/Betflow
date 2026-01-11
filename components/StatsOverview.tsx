
import React from 'react';

interface StatsOverviewProps {
  stats: {
    totalBets: number;
    totalProfit: number;
    winRate: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-blue-500/10 p-2 rounded-lg text-blue-500">
            <i className="fa-solid fa-ticket"></i>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Histórico</span>
        </div>
        <p className="text-slate-400 text-sm mb-1">Total de Apostas</p>
        <p className="text-3xl font-bold text-white">{stats.totalBets}</p>
      </div>

      <div className={`bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02] ${stats.totalProfit >= 0 ? 'ring-1 ring-emerald-500/20' : 'ring-1 ring-rose-500/20'}`}>
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-lg ${stats.totalProfit >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
            <i className={`fa-solid ${stats.totalProfit >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Balanço</span>
        </div>
        <p className="text-slate-400 text-sm mb-1">Lucro/Prejuízo Total</p>
        <p className={`text-3xl font-bold ${stats.totalProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          R$ {stats.totalProfit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-amber-500/10 p-2 rounded-lg text-amber-500">
            <i className="fa-solid fa-percent"></i>
          </div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Performance</span>
        </div>
        <p className="text-slate-400 text-sm mb-1">Win Rate</p>
        <div className="flex items-end gap-2">
          <p className="text-3xl font-bold text-white">{stats.winRate.toFixed(1)}%</p>
          <div className="mb-1 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-1000" 
              style={{ width: `${stats.winRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
