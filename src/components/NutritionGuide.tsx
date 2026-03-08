import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, AlertCircle, CheckCircle2, XCircle, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getNutritionRecommendation } from '../services/geminiService';

export const NutritionGuide: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<string[]>([]);
  const [newPref, setNewPref] = useState('');

  const handleGetRecommendation = async () => {
    setLoading(true);
    try {
      const result = await getNutritionRecommendation(
        "2º Trimestre", // Mocked for now
        "Treino leve/Yoga", // Mocked for now
        preferences
      );
      setRecommendation(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addPreference = () => {
    if (newPref && !preferences.includes(newPref)) {
      setPreferences([...preferences, newPref]);
      setNewPref('');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto pb-24">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Guia de Nutrição</h2>
        <p className="text-gray-500 italic serif">Alimentação inteligente para você e seu bebê</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="text-emerald-600" />
            <h3 className="font-bold text-emerald-900">Alimentos Recomendados</h3>
          </div>
          <ul className="space-y-2 text-emerald-800 text-sm">
            <li>• Folhas verdes escuras (Ácido Fólico)</li>
            <li>• Ovos e Carnes magras (Proteína/Ferro)</li>
            <li>• Iogurte natural (Cálcio/Probióticos)</li>
            <li>• Frutas cítricas (Vitamina C)</li>
          </ul>
        </div>

        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="text-rose-600" />
            <h3 className="font-bold text-rose-900">Alimentos a Evitar</h3>
          </div>
          <ul className="space-y-2 text-rose-800 text-sm">
            <li>• Carnes e peixes crus</li>
            <li>• Queijos não pasteurizados</li>
            <li>• Excesso de cafeína</li>
            <li>• Álcool (Risco zero)</li>
          </ul>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="text-amber-500" />
          Recomendações Personalizadas IA
        </h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Suas Preferências ou Restrições</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newPref}
              onChange={(e) => setNewPref(e.target.value)}
              placeholder="Ex: Vegetariana, Sem glúten..."
              className="flex-1 p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
            />
            <button
              onClick={addPreference}
              className="bg-emerald-600 text-white px-4 rounded-xl hover:bg-emerald-700"
            >
              Adicionar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {preferences.map((p) => (
              <span key={p} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                {p}
                <button onClick={() => setPreferences(preferences.filter(item => item !== p))}>×</button>
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={handleGetRecommendation}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Utensils size={20} />}
          Gerar Plano Nutricional
        </button>
      </div>

      {recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 prose prose-emerald max-w-none"
        >
          <ReactMarkdown>{recommendation}</ReactMarkdown>
        </motion.div>
      )}
    </div>
  );
};
