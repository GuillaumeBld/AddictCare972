
import React from 'react';
import { Icon } from '../Icon';

export const SupportTools: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      <header className="p-4 flex items-center gap-4 bg-surface-dark border-b border-border-dark sticky top-0 z-10">
        <h1 className="text-lg font-bold text-white">Scripts de Communication</h1>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <p className="text-sm text-text-secondary-dark">
            Ces guides sont conçus pour vous aider à communiquer efficacement et avec bienveillance, sans jugement.
        </p>

        {/* Script Accordions */}
        <details className="group bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                        <Icon name="chat_bubble" />
                    </div>
                    <span className="font-bold text-white">Exprimer un besoin</span>
                </div>
                <Icon name="expand_more" className="text-text-secondary-dark group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 pt-0 text-sm text-text-secondary-dark leading-relaxed border-t border-white/5 mt-2">
                <p className="mt-2 font-medium text-white">Structure "Je" :</p>
                <ul className="list-disc pl-5 mt-1 space-y-2">
                    <li>"Quand tu [situation observable]..."</li>
                    <li>"Je me sens [émotion]..."</li>
                    <li>"Parce que j'ai besoin de [besoin]..."</li>
                    <li>"Est-ce que tu serais d'accord pour [demande concrète] ?"</li>
                </ul>
            </div>
        </details>

        <details className="group bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                        <Icon name="front_hand" />
                    </div>
                    <span className="font-bold text-white">Poser une limite</span>
                </div>
                <Icon name="expand_more" className="text-text-secondary-dark group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 pt-0 text-sm text-text-secondary-dark leading-relaxed border-t border-white/5 mt-2">
                <p className="mt-2 font-medium text-white">Exemple :</p>
                <div className="bg-black/20 p-3 rounded-lg mt-2 italic text-white/80">
                    "Je comprends que tu aies envie de sortir ce soir. Cependant, je ne suis pas à l'aise avec la consommation d'alcool à la maison. Si tu décides de boire, je préfère que tu le fasses ailleurs pour me préserver."
                </div>
            </div>
        </details>

        <details className="group bg-surface-dark border border-border-dark rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#4DB6AC]/20 flex items-center justify-center text-[#4DB6AC]">
                        <Icon name="sentiment_dissatisfied" />
                    </div>
                    <span className="font-bold text-white">Parler d'une journée difficile</span>
                </div>
                <Icon name="expand_more" className="text-text-secondary-dark group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 pt-0 text-sm text-text-secondary-dark leading-relaxed border-t border-white/5 mt-2">
                <p className="mt-2">L'objectif est d'écouter sans chercher à résoudre le problème immédiatement.</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Utilisez l'écoute active (reformulation).</li>
                    <li>Validez les émotions : "C'est normal d'être frustré."</li>
                    <li>Demandez : "Comment puis-je t'aider maintenant ?"</li>
                </ul>
            </div>
        </details>

      </main>
    </div>
  );
};
