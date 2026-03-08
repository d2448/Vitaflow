import React from 'react';
import { Home, BookHeart, Utensils, Dumbbell, User, CalendarDays } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Início', icon: Home },
    { id: 'diary', label: 'Diário', icon: BookHeart },
    { id: 'plan', label: 'Plano', icon: CalendarDays },
    { id: 'nutrition', label: 'Nutrição', icon: Utensils },
    { id: 'fitness', label: 'Treino', icon: Dumbbell },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-around items-center z-50 md:relative md:flex-col md:h-screen md:w-64 md:border-r md:border-t-0 md:justify-start md:py-8 md:gap-4">
      <div className="hidden md:block mb-8 px-4">
        <h1 className="text-2xl font-bold text-emerald-600">VitaFlow</h1>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all w-full md:flex-row md:px-4 md:py-3 ${
              isActive
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon size={24} />
            <span className="text-[10px] font-medium md:text-sm">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
