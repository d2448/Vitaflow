import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Dumbbell, Play, AlertTriangle, CheckCircle, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getWorkoutAdvice } from '../services/geminiService';

export const FitnessPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    setLoading(true);
    try {
      const result = await getWorkoutAdvice(
        "2º Trimestre",
        "Intermediário",
        "Manter flexibilidade e força muscular"
      );
      setAdvice(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Plano de Treino</h2>
        <p className="text-gray-500 italic serif">Mantenha-se ativa com segurança</p>
      </header>

      <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="text-amber-600" />
          <h3 className="font-bold text-amber-900">Segurança em Primeiro Lugar</h3>
        </div>
        <p className="text-amber-800 text-sm leading-relaxed">
          Sempre consulte seu médico antes de iniciar qualquer rotina de exercícios. 
          Pare imediatamente se sentir tontura, dor ou falta de ar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl">
            <Dumbbell className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Nível Atual</p>
            <p className="font-bold text-gray-900">Intermediário</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-2xl">
            <Play className="text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Próxima Sessão</p>
            <p className="font-bold text-gray-900">Yoga Pré-natal</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-amber-500" />
          Consultoria de Treino IA
        </h3>
        <p className="text-gray-600 text-sm mb-6">
          Nossa IA analisa seu estágio de gravidez e nível de fitness para sugerir os melhores exercícios.
        </p>
        <button
          onClick={handleGetAdvice}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Dumbbell size={20} />}
          Gerar Guia de Treino
        </button>
      </div>

      {advice && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 prose prose-emerald max-w-none"
        >
          <ReactMarkdown>{advice}</ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
};
