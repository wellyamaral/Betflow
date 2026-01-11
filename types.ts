
export enum BetStatus {
  PENDING = 'PENDING',
  WON = 'WON',
  LOST = 'LOST'
}

export interface Objective {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  initialAmount: number;
  createdAt: string;
}

export interface Bet {
  id: string;
  date: string;
  teams: string;
  stake: number;
  odds: number;
  status: BetStatus;
  resultAmount: number;
  isCascade: boolean;
  objectiveId?: string; // Vínculo com objetivo
}

export interface DashboardStats {
  totalBankroll: number;
  totalProfit: number;
  winRate: number;
  totalBets: number;
}
