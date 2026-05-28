import React from 'react';
import { LayoutDashboard, UserCheck, GraduationCap, WalletCards, GraduationCap as LogoIcon } from 'lucide-react';
import { cn } from '../lib/utils';
import { TabType } from '../types';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'marks', label: 'Academic Marks', icon: GraduationCap },
    { id: 'fees', label: 'Fee Payments', icon: WalletCards },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <LogoIcon size={24} />
        </div>
        <h1 className="font-bold text-slate-800 text-lg leading-tight">College ERP</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as TabType)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-indigo-50 text-indigo-700 font-medium" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 italic text-xs text-slate-400 text-center">
        Deployed on Local Server
      </div>
    </aside>
  );
};
