
import { GoogleGenAI } from "@google/genai";
import { Bet } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzePerformance = async (bets: Bet[]) => {
  if (bets.length === 0) return "Adicione algumas apostas para receber uma análise estratégica.";

  const betSummary = bets.map(b => 
    `Data: ${b.date}, Times: ${b.teams}, Stake: R$${b.stake}, Odd: ${b.odds}, Status: ${b.status}, Retorno: R$${b.resultAmount}`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise o seguinte histórico de apostas esportivas e forneça 3 dicas estratégicas curtas para melhorar os resultados. Foque em gestão de banca e padrões de vitórias/derrotas.
      
      Histórico:
      ${betSummary}
      
      Responda em Português do Brasil, de forma profissional e motivadora.`
    });

    return response.text || "Não foi possível gerar uma análise no momento.";
  } catch (error) {
    console.error("Error analyzing performance:", error);
    return "Erro ao conectar com o consultor de IA.";
  }
};
