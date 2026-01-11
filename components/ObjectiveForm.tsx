
import React, { useState } from 'react';
import { Objective } from '../types';

interface ObjectiveFormProps {
  onClose: () => void;
  onSubmit: (objective: Objective) => void;
}

const ObjectiveForm: React.FC<ObjectiveFormProps> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    initialAmount: '',
    targetAmount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const initial = parseFloat(formData.initialAmount) || 0;
    const target = parseFloat(formData.targetAmount);

    if (!formData.name || isNaN(target)) return;

    const newObjective: Objective = {
      id: crypto.randomUUID(),
      name: formData.name,
      initialAmount: initial,
      currentAmount: initial,
      targetAmount: target,
      createdAt: new Date().toISOString()
    };

    onSubmit(newObjective);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-indigo-600/10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
            <i className="fa-solid fa-bullseye"></i>
            Novo Objetivo
          </h2>
          <button onClick={onClose} className="text-slate-500 hover:text-white">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Nome do Objetivo</label>
            <input 
              required
              type="text" 
              placeholder="Ex: Alavancagem Copa do Mundo"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Banca Inicial (R$)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0,00"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.initialAmount}
                onChange={e => setFormData(prev => ({ ...prev, initialAmount: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Meta Final (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                placeholder="1000,00"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.targetAmount}
                onChange={e => setFormData(prev => ({ ...prev, targetAmount: e.target.value }))}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
          >
            Criar Objetivo
          </button>
        </form>
      </div>
    </div>
  );
};

export default ObjectiveForm;
