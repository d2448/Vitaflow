import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Baby, Calendar, Heart, Activity, Bell, ChevronRight } from 'lucide-react';
import { getBabyDevelopmentInfo } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const Dashboard: React.FC = () => {
  const [babyInfo, setBabyInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const currentWeek = 12; // Mocked

  useEffect(() => {
    const fetchBabyInfo = async () => {
      setLoading(true);
      try {
        const info = await getBabyDevelopmentInfo(currentWeek);
        setBabyInfo(info);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBabyInfo();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto pb-24">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Olá, Delcia! 👋</h2>
          <p className="text-gray-500">Você está na {currentWeek}ª semana</p>
        </div>
        <button className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-all">
          <Bell size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          whileHover={{ y: -5 }}
          className="bg-emerald-600 p-6 rounded-[2rem] text-white shadow-xl shadow-emerald-100"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl">
              <Baby size={24} />
            </div>
            <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-full">HOJE</span>
          </div>
          <h3 className="text-lg font-bold mb-1">O Bebê</h3>
          <p className="text-emerald-100 text-sm">Tamanho de um limão</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-50 rounded-2xl">
              <Heart size={24} className="text-rose-500" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Saúde</h3>
          <p className="text-gray-500 text-sm">Humor: Radiante</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5 }}
          className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <Activity size={24} className="text-blue-500" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">Treino</h3>
          <p className="text-gray-500 text-sm">30 min concluídos</p>
        </motion.div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Alertas do Dia</h3>
          <div className="space-y-3">
            {[
              { id: 1, title: 'Hidratação', desc: 'Beba 500ml de água agora', time: '10:30', color: 'bg-blue-50 text-blue-600' },
              { id: 2, title: 'Vitaminas', desc: 'Tomar ácido fólico', time: '12:00', color: 'bg-emerald-50 text-emerald-600' },
              { id: 3, title: 'Treino', desc: 'Sessão de Yoga (15 min)', time: '17:00', color: 'bg-purple-50 text-purple-600' },
            ].map((alert) => (
              <div key={alert.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                <div className={`p-2 rounded-xl font-bold text-xs ${alert.color}`}>
                  {alert.time}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-sm">{alert.title}</h4>
                  <p className="text-xs text-gray-500">{alert.desc}</p>
                </div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Desenvolvimento Semanal</h3>
            <button className="text-emerald-600 text-sm font-bold flex items-center">
              Ver tudo <ChevronRight size={16} />
            </button>
          </div>
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm min-h-[200px]">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <div className="prose prose-emerald max-w-none text-sm">
                <ReactMarkdown>{babyInfo || "Carregando informações..."}</ReactMarkdown>
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4">Próximos Compromissos</h3>
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-50 p-3 rounded-2xl text-center min-w-[60px]">
              <p className="text-xs font-bold text-emerald-600 uppercase">Mar</p>
              <p className="text-xl font-black text-emerald-900">15</p>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">Ultrassom Morfológico</h4>
              <p className="text-sm text-gray-500">Clínica Santa Maria • 09:00</p>
            </div>
            <ChevronRight className="text-gray-300" />
          </div>
        </section>
      </div>
    </div>
  );
};
