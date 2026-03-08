import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CalendarDays, CheckCircle2, Circle, ChevronRight, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const MonthlyPlan: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const currentMonth = "Março";
  const pregnancyWeek = 12;

  const fetchMonthlyPlan = async () => {
    setLoading(true);
    try {
      const prompt = `Como um consultor de bem-estar para gestantes e atletas, crie um plano mensal detalhado para o mês de ${currentMonth}.
      A usuária está na semana ${pregnancyWeek} da gravidez.
      
      Por favor, forneça:
      1. Foco principal do mês (Saúde e Desenvolvimento).
      2. Metas semanais de nutrição.
      3. Metas semanais de atividade física.
      4. Lembretes importantes de saúde.
      
      Responda em Português (Brasil) formatado em Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      setPlan(response.text);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyPlan();
  }, []);

  const tasks = [
    { id: 1, title: 'Ultrassom Morfológico', completed: false },
    { id: 2, title: 'Comprar vitaminas', completed: true },
    { id: 3, title: 'Caminhada 3x por semana', completed: false },
    { id: 4, title: 'Aumentar consumo de ferro', completed: true },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Plano Mensal</h2>
        <p className="text-gray-500 italic serif">Seu roteiro para um mês saudável em {currentMonth}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="text-amber-500" />
              Foco do Mês (IA)
            </h3>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <Loader2 className="animate-spin text-emerald-600" />
              </div>
            ) : (
              <div className="prose prose-emerald max-w-none text-sm">
                <ReactMarkdown>{plan || "Carregando seu plano personalizado..."}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CalendarDays className="text-emerald-600" />
              Checklist do Mês
            </h3>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 group cursor-pointer">
                  {task.completed ? (
                    <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                  ) : (
                    <Circle className="text-gray-300 group-hover:text-emerald-400 shrink-0" size={20} />
                  )}
                  <span className={`text-sm ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-medium hover:border-emerald-300 hover:text-emerald-500 transition-all">
              + Adicionar Meta
            </button>
          </div>

          <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-xl shadow-emerald-100">
            <h3 className="font-bold mb-2">Dica de Ouro</h3>
            <p className="text-emerald-50 text-sm leading-relaxed">
              "O segundo trimestre é muitas vezes chamado de 'lua de mel' da gravidez. Aproveite para se exercitar e preparar o ninho!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
