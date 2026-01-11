
import React from 'react';

interface HeaderProps {
  onAddClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddClick }) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-futbol text-white text-xl"></i>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">BetFlow</h1>
            <p className="text-[10px] text-emerald-400 font-medium uppercase tracking-widest">Cascade Engine</p>
          </div>
        </div>
        
        <button 
          onClick={onAddClick}
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 active:scale-95"
        >
          <i className="fa-solid fa-plus"></i>
          Nova Aposta
        </button>
      </div>
    </header>
  );
};

export default Header;
