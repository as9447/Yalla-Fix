import React from 'react';
import { Home, ClipboardList, Heart, User, Presentation } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  ordersBadge?: number;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  setActiveTab,
  ordersBadge,
}) => {
  const tabs = [
    { id: 'home', label: 'الرئيسية', icon: Home },
    { id: 'orders', label: 'طلباتي', icon: ClipboardList, badge: ordersBadge },
    {
      id: 'marketing-study',
      label: 'دراسة الجدوى',
      icon: Presentation,
      highlight: true,
    },
    { id: 'favorites', label: 'المفضلة', icon: Heart },
    { id: 'profile', label: 'حسابي', icon: User },
  ];

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-50 py-1.5 px-2 shadow-xl safe-area-bottom"
      dir="rtl"
      aria-label="التنقل السفلي"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative cursor-pointer min-w-[56px] ${
                isActive
                  ? tab.highlight
                    ? 'text-purple-600 font-extrabold scale-105'
                    : 'text-blue-600 font-extrabold scale-105'
                  : tab.highlight
                  ? 'text-purple-700 font-bold bg-purple-50/80 rounded-xl px-2.5 py-1'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'stroke-[2.5]'
                      : tab.highlight
                      ? 'stroke-[2.2] text-purple-600'
                      : 'stroke-2'
                  }`}
                />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span
                className={`text-[10px] mt-0.5 whitespace-nowrap leading-tight ${
                  isActive ? 'font-bold' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
