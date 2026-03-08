import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Calendar, Smile, Frown, Meh, MessageSquare, Image as ImageIcon, BookHeart, Scale } from 'lucide-react';
import { DiaryEntry } from '../types';

export const PregnancyDiary: React.FC = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState<Partial<DiaryEntry>>({
    mood: 'neutral',
    symptoms: [],
    notes: '',
    weight: undefined,
    date: new Date().toISOString().split('T')[0],
  });

  const moods = [
    { id: 'happy', icon: Smile, color: 'text-emerald-500' },
    { id: 'neutral', icon: Meh, color: 'text-amber-500' },
    { id: 'sad', icon: Frown, color: 'text-rose-500' },
  ];

  const handleAddEntry = () => {
    const entry: DiaryEntry = {
      id: Date.now().toString(),
      userId: 'current-user',
      date: newEntry.date || new Date().toISOString().split('T')[0],
      mood: newEntry.mood || 'neutral',
      symptoms: newEntry.symptoms || [],
      notes: newEntry.notes || '',
      ...newEntry,
    } as DiaryEntry;

    setEntries([entry, ...entries]);
    setIsAdding(false);
    setNewEntry({ mood: 'neutral', symptoms: [], notes: '', weight: undefined, date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto pb-24">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Diário de Gravidez</h2>
          <p className="text-gray-500 italic serif">Registre cada momento especial</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-emerald-600 text-white p-3 rounded-full shadow-lg hover:bg-emerald-700 transition-all"
        >
          <Plus size={24} />
        </button>
      </header>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 mb-8"
        >
          <h3 className="text-xl font-semibold mb-4">Nova Entrada</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Como você está se sentindo?</label>
              <div className="flex gap-4">
                {moods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setNewEntry({ ...newEntry, mood: m.id })}
                      className={`p-3 rounded-2xl border-2 transition-all ${
                        newEntry.mood === m.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100'
                      }`}
                    >
                      <Icon size={32} className={m.color} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newEntry.weight || ''}
                  onChange={(e) => setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) || undefined })}
                  placeholder="Ex: 65.5"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas e Sentimentos</label>
              <textarea
                value={newEntry.notes}
                onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                placeholder="Escreva sobre o seu dia..."
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none h-32"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddEntry}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-all"
              >
                Salvar
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {entries.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <BookHeart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhuma entrada ainda. Comece a escrever hoje!</p>
          </div>
        ) : (
          entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-xl">
                    <Calendar size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{new Date(entry.date).toLocaleDateString('pt-BR')}</p>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Semana {entry.weekOfPregnancy || '?'}</p>
                  </div>
                </div>
                <div className="p-2 bg-gray-50 rounded-full">
                  {entry.mood === 'happy' && <Smile className="text-emerald-500" />}
                  {entry.mood === 'neutral' && <Meh className="text-amber-500" />}
                  {entry.mood === 'sad' && <Frown className="text-rose-500" />}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{entry.notes}</p>
              
              <div className="flex flex-wrap gap-2 items-center">
                {entry.weight && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
                    <Scale size={12} />
                    {entry.weight} kg
                  </div>
                )}
                {entry.symptoms?.map((s) => (
                  <span key={s} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
