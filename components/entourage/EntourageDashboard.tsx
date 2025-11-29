
import React from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

interface Props {
  onNavigate: (view: string) => void;
}

export const EntourageDashboard: React.FC<Props> = ({ onNavigate }) => {
  const { patients } = useApp();
  // Simulating linking to the first patient for this demo
  const patient = patients[0];
  const isAccessGranted = patient?.allowEntourage;

  if (!isAccessGranted) {
    return (
        <div className="flex flex-col min-h-screen bg-background-dark items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                <Icon name="lock" className="text-4xl text-text-secondary-dark" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Accès Restreint</h2>
            <p className="text-text-secondary-dark">
                Le patient n'a pas autorisé l'accès à l'espace proche pour le moment.
            </p>
            <p className="text-xs text-white/30 mt-8">Demandez au patient d'activer l'option dans ses paramètres.</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {/* Header */}
      <div className="flex items-center p-4 pb-2 bg-background-dark border-b border-border-dark">
        <div className="w-10 h-10 rounded-full bg-[#4DB6AC]/10 flex items-center justify-center text-[#4DB6AC]">
            <Icon name="diversity_3" />
        </div>
        <h1 className="flex-1 text-center text-lg font-bold text-white">Espace Proche</h1>
        <div className="w-10"></div>
      </div>

      <main className="flex-1 p-4 space-y-6">
        {/* Welcome */}
        <div className="py-2">
            <h2 className="text-2xl font-bold text-white">Bienvenue</h2>
            <p className="text-text-secondary-dark mt-1">
                Vous soutenez <span className="text-white font-bold">{patient.firstName}</span>. Cet espace est là pour vous accompagner.
            </p>
        </div>

        {/* Modules */}
        <div className="space-y-3">
            <div 
                onClick={() => onNavigate('e-tools')}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
            >
                <div className="w-12 h-12 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                    <Icon name="psychology" className="text-2xl" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white">Pratiquer le soutien</h3>
                    <p className="text-xs text-text-secondary-dark">Exercices pour communiquer et gérer le stress.</p>
                </div>
                <Icon name="chevron_right" className="text-text-secondary-dark" />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition">
                <div className="w-12 h-12 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                    <Icon name="lightbulb" className="text-2xl" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white">Mieux comprendre</h3>
                    <p className="text-xs text-text-secondary-dark">S'informer sur l'addiction et le rétablissement.</p>
                </div>
                <Icon name="chevron_right" className="text-text-secondary-dark" />
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition">
                <div className="w-12 h-12 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                    <Icon name="menu_book" className="text-2xl" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-white">Ressources utiles</h3>
                    <p className="text-xs text-text-secondary-dark">Liens vers des associations et groupes.</p>
                </div>
                <Icon name="chevron_right" className="text-text-secondary-dark" />
            </div>
        </div>

        {/* Safety */}
        <div className="p-4 bg-surface-dark border border-border-dark rounded-xl mt-4">
            <h3 className="text-white font-bold mb-2">Besoin d'aide maintenant ?</h3>
            <button className="w-full bg-[#4DB6AC] hover:bg-[#4DB6AC]/80 text-black font-bold h-12 rounded-xl flex items-center justify-center gap-2">
                <Icon name="support_agent" />
                Contacter une aide professionnelle
            </button>
        </div>
      </main>
    </div>
  );
};
