
import React, { useState } from 'react';
import { Bet, BetStatus, Objective } from '../types';

interface BetFormProps {
  onClose: () => void;
  onSubmit: (bet: Bet) => void;
  lastBetReturn?: number;
  objectives: Objective[];
}

const BetForm: React.FC<BetFormProps> = ({ onClose, onSubmit, lastBetReturn, objectives }) => {
  const [formData, setFormData] = useState({
    teams: '',
    stake: lastBetReturn ? lastBetReturn.toString() : '',
    odds: '',
    date: new Date().toISOString().split('T')[0],
    isCascade: !!lastBetReturn,
    objectiveId: objectives.length > 0 ? objectives[0].id : ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stake = parseFloat(formData.stake);
    const odds = parseFloat(formData.odds);
    
    if (isNaN(stake) || isNaN(odds)) return;

    const newBet: Bet = {
      id: crypto.randomUUID(),
      teams: formData.teams,
      stake,
      odds,
      date: formData.date,
      status: BetStatus.PENDING,
      resultAmount: 0,
      isCascade: formData.isCascade,
      objectiveId: formData.objectiveId || undefined
    };

    onSubmit(newBet);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-emerald-600/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fa-solid fa-plus-circle text-emerald-500"></i>
            Registrar Aposta
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Objetivo Vinculado</label>
            <select 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.objectiveId}
              onChange={e => setFormData(prev => ({ ...prev, objectiveId: e.target.value }))}
            >
              <option value="">Nenhum objetivo (Geral)</option>
              {objectives.map(obj => (
                <option key={obj.id} value={obj.id}>{obj.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Confronto / Jogo</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Flamengo x Palmeiras"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              value={formData.teams}
              onChange={e => setFormData(prev => ({ ...prev, teams: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Aposta (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                value={formData.stake}
                onChange={e => setFormData(prev => ({ ...prev, stake: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Odd</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white outline-none"
                value={formData.odds}
                onChange={e => setFormData(prev => ({ ...prev, odds: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Data</label>
              <input 
                type="date" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white [color-scheme:dark] outline-none"
                value={formData.date}
                onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>

          {lastBetReturn !== undefined && (
            <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <input 
                type="checkbox" 
                id="cascade"
                className="w-4 h-4 rounded text-emerald-600 bg-slate-800 border-slate-700"
                checked={formData.isCascade}
                onChange={e => setFormData(prev => ({ ...prev, isCascade: e.target.checked }))}
              />
              <label htmlFor="cascade" className="text-sm font-medium text-emerald-400 cursor-pointer">
                Cascata (R$ {lastBetReturn.toFixed(2)})
              </label>
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all">
              Salvar Aposta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BetForm;
