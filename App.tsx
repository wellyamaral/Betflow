
import React, { useState, useEffect, useMemo } from 'react';
import { Bet, BetStatus, Objective } from './types';
import Header from './components/Header';
import StatsOverview from './components/StatsOverview';
import BetForm from './components/BetForm';
import BetList from './components/BetList';
import ObjectivesSection from './components/ObjectivesSection';
import ObjectiveForm from './components/ObjectiveForm';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [bets, setBets] = useState<Bet[]>([]);
  const [objectives, setObjectives] = useState<Objective[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isObjFormOpen, setIsObjFormOpen] = useState(false);

  useEffect(() => {
    const savedBets = localStorage.getItem('betflow_bets');
    const savedObjs = localStorage.getItem('betflow_objectives');
    if (savedBets) setBets(JSON.parse(savedBets));
    if (savedObjs) setObjectives(JSON.parse(savedObjs));
  }, []);

  useEffect(() => {
    localStorage.setItem('betflow_bets', JSON.stringify(bets));
    localStorage.setItem('betflow_objectives', JSON.stringify(objectives));
  }, [bets, objectives]);

  const addBet = (newBet: Bet) => {
    setBets(prev => [newBet, ...prev]);
    setIsFormOpen(false);
  };

  const addObjective = (newObj: Objective) => {
    setObjectives(prev => [...prev, newObj]);
    setIsObjFormOpen(false);
  };

  const deleteObjective = (id: string) => {
    setObjectives(prev => prev.filter(o => o.id !== id));
  };

  const deleteBet = (id: string) => {
    setBets(prev => prev.filter(b => b.id !== id));
  };

  const updateBetStatus = (id: string, status: BetStatus) => {
    setBets(prev => prev.map(bet => {
      if (bet.id === id) {
        const resultAmount = status === BetStatus.WON ? bet.stake * bet.odds : 0;
        return { ...bet, status, resultAmount };
      }
      return bet;
    }));
  };

  const stats = useMemo(() => {
    const totalBets = bets.length;
    const wonBets = bets.filter(b => b.status === BetStatus.WON).length;
    const totalProfit = bets.reduce((acc, b) => {
      if (b.status === BetStatus.WON) return acc + (b.resultAmount - b.stake);
      if (b.status === BetStatus.LOST) return acc - b.stake;
      return acc;
    }, 0);
    const winRate = totalBets > 0 ? (wonBets / totalBets) * 100 : 0;

    return { totalBets, totalProfit, winRate };
  }, [bets]);

  const chartData = useMemo(() => {
    let runningProfit = 0;
    return [...bets].reverse().map((b, index) => {
      if (b.status === BetStatus.WON) runningProfit += (b.resultAmount - b.stake);
      else if (b.status === BetStatus.LOST) runningProfit -= b.stake;
      return {
        name: `Aposta ${index + 1}`,
        lucro: runningProfit
      };
    });
  }, [bets]);

  return (
    <div className="min-h-screen pb-12 bg-slate-950">
      <Header onAddClick={() => setIsFormOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        <StatsOverview stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <i className="fa-solid fa-chart-line text-emerald-400"></i>
                Evolução Patrimonial
              </h3>
              <div className="h-64 w-full">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} hide />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#10b981' }}
                      />
                      <Area type="monotone" dataKey="lucro" stroke="#10b981" fillOpacity={1} fill="url(#colorLucro)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-500 italic">
                    Dados insuficientes para gráfico.
                  </div>
                )}
              </div>
            </div>

            <BetList 
              bets={bets} 
              onDelete={deleteBet} 
              onUpdateStatus={updateBetStatus} 
            />
          </div>

          <div className="space-y-8">
            <ObjectivesSection 
              objectives={objectives} 
              bets={bets} 
              onAddObjective={() => setIsObjFormOpen(true)}
              onDeleteObjective={deleteObjective}
            />
          </div>
        </div>
      </main>

      {isFormOpen && (
        <BetForm 
          onClose={() => setIsFormOpen(false)} 
          onSubmit={addBet} 
          objectives={objectives}
          lastBetReturn={bets.length > 0 && bets[0].status === BetStatus.WON ? bets[0].resultAmount : undefined}
        />
      )}

      {isObjFormOpen && (
        <ObjectiveForm 
          onClose={() => setIsObjFormOpen(false)} 
          onSubmit={addObjective} 
        />
      )}
    </div>
  );
};

export default App;
