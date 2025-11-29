
import React from 'react';
import { UserRole } from '../types';
import { Icon } from './Icon';

// Top Role Switcher removed as per request for strict login flow.

export const BottomNavTherapist: React.FC<{ onViewChange: (v: string) => void, active: string }> = ({ onViewChange, active }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-surface-dark border-t border-border-dark pb-safe z-30">
    <div className="flex justify-around items-center h-16">
      <button onClick={() => onViewChange('dashboard')} className={`flex flex-col items-center gap-1 ${active === 'dashboard' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="dashboard" filled={active === 'dashboard'} />
        <span className="text-[10px] font-medium">Accueil</span>
      </button>
      <button onClick={() => onViewChange('patients')} className={`flex flex-col items-center gap-1 ${active === 'patients' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="groups" filled={active === 'patients'} />
        <span className="text-[10px] font-medium">Patients</span>
      </button>
      <div className="relative -top-5">
        <button onClick={() => onViewChange('new-patient')} className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Icon name="add" className="text-3xl" />
        </button>
      </div>
      <button onClick={() => onViewChange('library')} className={`flex flex-col items-center gap-1 ${active === 'library' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="library_books" filled={active === 'library'} />
        <span className="text-[10px] font-medium">Protocoles</span>
      </button>
      <button onClick={() => onViewChange('settings')} className={`flex flex-col items-center gap-1 ${active === 'settings' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="settings" filled={active === 'settings'} />
        <span className="text-[10px] font-medium">Réglages</span>
      </button>
    </div>
  </div>
);

export const BottomNavPatient: React.FC<{ onViewChange: (v: string) => void, active: string }> = ({ onViewChange, active }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-surface-dark border-t border-border-dark pb-safe z-30">
    <div className="flex justify-around items-center h-16">
      <button onClick={() => onViewChange('p-dashboard')} className={`flex flex-col items-center gap-1 ${active === 'p-dashboard' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="home" filled={active === 'p-dashboard'} />
        <span className="text-[10px] font-medium">Accueil</span>
      </button>
      <button onClick={() => onViewChange('p-exercises')} className={`flex flex-col items-center gap-1 ${active === 'p-exercises' ? 'text-primary' : 'text-text-secondary-dark'}`}>
        <Icon name="self_improvement" filled={active === 'p-exercises'} />
        <span className="text-[10px] font-medium">Exercices</span>
      </button>
      <button onClick={() => onViewChange('p-emergency')} className={`flex flex-col items-center gap-1 ${active === 'p-emergency' ? 'text-alert-critical' : 'text-alert-critical/70'}`}>
        <div className="bg-alert-critical/20 p-1.5 rounded-full animate-pulse">
            <Icon name="sos" className="text-xl" filled />
        </div>
        <span className="text-[10px] font-medium">Urgence</span>
      </button>
    </div>
  </div>
);

export const BottomNavEntourage: React.FC<{ onViewChange: (v: string) => void, active: string }> = ({ onViewChange, active }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-surface-dark border-t border-border-dark pb-safe z-30">
    <div className="flex justify-around items-center h-16">
      <button onClick={() => onViewChange('e-dashboard')} className={`flex flex-col items-center gap-1 ${active === 'e-dashboard' ? 'text-[#4DB6AC]' : 'text-text-secondary-dark'}`}>
        <Icon name="home" filled={active === 'e-dashboard'} />
        <span className="text-[10px] font-medium">Accueil</span>
      </button>
      <button onClick={() => onViewChange('e-tools')} className={`flex flex-col items-center gap-1 ${active === 'e-tools' ? 'text-[#4DB6AC]' : 'text-text-secondary-dark'}`}>
        <Icon name="handshake" filled={active === 'e-tools'} />
        <span className="text-[10px] font-medium">Outils</span>
      </button>
      <button onClick={() => onViewChange('settings')} className={`flex flex-col items-center gap-1 ${active === 'settings' ? 'text-[#4DB6AC]' : 'text-text-secondary-dark'}`}>
        <Icon name="settings" filled={active === 'settings'} />
        <span className="text-[10px] font-medium">Compte</span>
      </button>
    </div>
  </div>
);
