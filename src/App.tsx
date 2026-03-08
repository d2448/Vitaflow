import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PregnancyDiary } from './components/PregnancyDiary';
import { NutritionGuide } from './components/NutritionGuide';
import { FitnessPlanner } from './components/FitnessPlanner';
import { MonthlyPlan } from './components/MonthlyPlan';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'diary':
        return <PregnancyDiary />;
      case 'plan':
        return <MonthlyPlan />;
      case 'nutrition':
        return <NutritionGuide />;
      case 'fitness':
        return <FitnessPlanner />;
      case 'profile':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>
            <p className="text-gray-500">Configurações e preferências em breve.</p>
            <div className="mt-8 p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-emerald-800 text-sm">
              <p className="font-bold mb-2">Aviso de Configuração</p>
              <p>Para salvar seus dados na nuvem, aceite os termos do Firebase no painel lateral.</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col md:flex-row">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
