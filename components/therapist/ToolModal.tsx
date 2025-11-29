
import React from 'react';
import { Icon } from '../Icon';

export type ToolType = 'BALANCE' | 'SECCA' | 'URGE' | 'NONE';

interface Props {
  type: ToolType;
  onClose: () => void;
}

export const ToolModal: React.FC<Props> = ({ type, onClose }) => {
  
  const renderContent = () => {
    switch (type) {
        case 'BALANCE':
            return (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                            <h4 className="font-bold text-primary mb-2 text-sm text-center">Avantages Statu Quo</h4>
                            <ul className="list-disc pl-4 text-xs text-text-secondary-dark space-y-1">
                                <li>Ce que j'aime dans le produit</li>
                                <li>Ce qu'il m'apporte (soulagement, plaisir)</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                            <h4 className="font-bold text-alert-warning mb-2 text-sm text-center">Inconvénients Statu Quo</h4>
                            <ul className="list-disc pl-4 text-xs text-text-secondary-dark space-y-1">
                                <li>Les coûts (santé, argent)</li>
                                <li>Les soucis relationnels</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                            <h4 className="font-bold text-alert-critical mb-2 text-sm text-center">Inconvénients Changement</h4>
                            <ul className="list-disc pl-4 text-xs text-text-secondary-dark space-y-1">
                                <li>La peur du manque</li>
                                <li>Perdre un "ami"</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                            <h4 className="font-bold text-green-400 mb-2 text-sm text-center">Avantages Changement</h4>
                            <ul className="list-disc pl-4 text-xs text-text-secondary-dark space-y-1">
                                <li>Santé, Liberté</li>
                                <li>Fierté, Projets</li>
                            </ul>
                        </div>
                    </div>
                    <p className="text-xs text-center italic text-white/50">"Qu'est-ce qui pèse le plus lourd aujourd'hui ?"</p>
                </div>
            );
        case 'SECCA':
            return (
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">S</span>
                        <div><p className="text-white font-bold text-sm">Situation</p><p className="text-xs text-text-secondary-dark">Où ? Quand ? Avec qui ?</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">E</span>
                        <div><p className="text-white font-bold text-sm">Émotion</p><p className="text-xs text-text-secondary-dark">Ce que je ressens (Tristesse, Colère...)</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">C</span>
                        <div><p className="text-white font-bold text-sm">Cognition (Pensée)</p><p className="text-xs text-text-secondary-dark">"J'en ai besoin", "Juste un"</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">C</span>
                        <div><p className="text-white font-bold text-sm">Comportement</p><p className="text-xs text-text-secondary-dark">Je consomme</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-primary">A</span>
                        <div><p className="text-white font-bold text-sm">Anticipation/Csq</p><p className="text-xs text-text-secondary-dark">Soulagement immédiat, Culpabilité ensuite</p></div>
                    </div>
                </div>
            );
        case 'URGE':
            return (
                <div className="space-y-4 text-center">
                    <div className="relative h-32 w-full bg-gradient-to-t from-primary/20 to-transparent rounded-xl flex items-end justify-center pb-2">
                        <Icon name="tsunami" className="text-6xl text-primary opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-white font-bold text-xl drop-shadow-md">SURFER SUR LA VAGUE</p>
                        </div>
                    </div>
                    <ol className="text-left text-sm text-text-secondary-dark space-y-2 list-decimal pl-5">
                        <li><strong className="text-white">Observer :</strong> Remarquer l'envie sans juger. Où est-elle dans le corps ?</li>
                        <li><strong className="text-white">Accepter :</strong> Ne pas lutter. Se dire "C'est une vague, elle va passer".</li>
                        <li><strong className="text-white">Respirer :</strong> Utiliser la respiration pour s'ancrer pendant le pic.</li>
                        <li><strong className="text-white">Attendre :</strong> Le pic dure rarement plus de 10-15 minutes.</li>
                    </ol>
                </div>
            );
        default:
            return null;
    }
  };

  const getTitle = () => {
    switch(type) {
        case 'BALANCE': return 'Balance Décisionnelle';
        case 'SECCA': return 'Grille SECCA (Analyse)';
        case 'URGE': return 'Urge Surfing';
        default: return 'Outil Clinique';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-surface-dark border border-border-dark rounded-2xl p-6 space-y-4 animate-scale-up">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <h3 className="text-xl font-bold text-white">{getTitle()}</h3>
            <button onClick={onClose} className="text-text-secondary-dark hover:text-white">
                <Icon name="close" />
            </button>
        </div>
        
        <div className="py-2">
            {renderContent()}
        </div>

        <button 
            onClick={onClose}
            className="w-full h-12 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors"
        >
            Fermer
        </button>
      </div>
    </div>
  );
};
