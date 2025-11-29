
import React, { useState } from 'react';
import { Icon } from '../Icon';

interface Props {
  onClose: () => void;
}

const POINTS = [
  {
    id: 'LI4',
    name: 'Hegu (LI4)',
    indication: 'Tension, Stress, Craving',
    location: 'Main',
    desc: 'Sur le dos de la main, entre le pouce et l\'index. Pressez fermement vers l\'os de l\'index.',
    warning: 'Éviter chez la femme enceinte.'
  },
  {
    id: 'P6',
    name: 'Neiguan (P6)',
    indication: 'Nausée, Anxiété, Oppression',
    location: 'Poignet',
    desc: 'Face interne du bras, 3 travers de doigts sous le pli du poignet, entre les deux tendons.',
    warning: ''
  },
  {
    id: 'Yintang',
    name: 'Yintang',
    indication: 'Calme mental, Insomnie',
    location: 'Visage',
    desc: 'Exactement entre les deux sourcils.',
    warning: ''
  },
  {
    id: 'H7',
    name: 'Shenmen (H7)',
    indication: 'Troubles émotionnels, Sommeil',
    location: 'Poignet',
    desc: 'Sur le pli du poignet, côté auriculaire (petit doigt), dans le creux sensible.',
    warning: ''
  }
];

export const AcupressureGuide: React.FC<Props> = ({ onClose }) => {
  const [activePoint, setActivePoint] = useState(POINTS[0]);

  return (
    <div className="fixed inset-0 z-50 bg-background-dark flex flex-col">
      <header className="p-4 flex items-center gap-4 bg-surface-dark border-b border-border-dark">
        <button onClick={onClose} className="text-white">
            <Icon name="arrow_back" />
        </button>
        <h1 className="text-lg font-bold text-white">Guide Acupressure</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Visualization Area */}
        <div className="bg-surface-dark border border-border-dark rounded-2xl p-8 flex items-center justify-center min-h-[300px] relative overflow-hidden">
            
            {/* Abstract Hand Representation for LI4 */}
            {activePoint.id === 'LI4' && (
                <div className="relative w-48 h-64 bg-white/5 rounded-3xl border-2 border-white/10 rotate-12">
                    {/* Thumb */}
                    <div className="absolute -left-8 top-32 w-16 h-24 bg-white/5 rounded-l-2xl border-2 border-white/10 -rotate-45"></div>
                    {/* Point Marker */}
                    <div className="absolute left-8 top-36 w-8 h-8 rounded-full bg-primary/30 border-2 border-primary animate-pulse flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30 uppercase font-bold">Main Droite (Dos)</span>
                </div>
            )}

            {/* Abstract Wrist Representation for P6/H7 */}
            {(activePoint.id === 'P6' || activePoint.id === 'H7') && (
                <div className="relative w-40 h-72 bg-white/5 rounded-full border-2 border-white/10">
                    {/* Wrist Crease */}
                    <div className="absolute top-16 left-0 right-0 h-px bg-white/20 border-t border-dashed border-white/30"></div>
                    
                    {activePoint.id === 'P6' && (
                        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/30 border-2 border-primary animate-pulse flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                    )}
                    {activePoint.id === 'H7' && (
                        <div className="absolute top-16 right-4 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/30 border-2 border-primary animate-pulse flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                    )}
                    <span className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30 uppercase font-bold">Face Interne Bras</span>
                </div>
            )}

            {/* Abstract Face for Yintang */}
            {activePoint.id === 'Yintang' && (
                <div className="relative w-48 h-64 bg-white/5 rounded-[3rem] border-2 border-white/10">
                    {/* Eyes */}
                    <div className="absolute top-24 left-8 w-10 h-4 border-t-2 border-white/30 rounded-t-full"></div>
                    <div className="absolute top-24 right-8 w-10 h-4 border-t-2 border-white/30 rounded-t-full"></div>
                    {/* Point */}
                    <div className="absolute top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary/30 border-2 border-primary animate-pulse flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                    </div>
                    <span className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/30 uppercase font-bold">Visage</span>
                </div>
            )}

        </div>

        {/* Info Card */}
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-white">{activePoint.name}</h2>
                <span className="text-xs font-bold bg-primary text-black px-2 py-1 rounded">{activePoint.location}</span>
            </div>
            <p className="text-primary font-medium mb-3">{activePoint.indication}</p>
            <p className="text-text-secondary-dark text-sm mb-3">{activePoint.desc}</p>
            {activePoint.warning && (
                <div className="flex items-center gap-2 text-alert-warning text-xs font-bold">
                    <Icon name="warning" className="text-base" />
                    {activePoint.warning}
                </div>
            )}
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-3">
            {POINTS.map(p => (
                <button 
                    key={p.id}
                    onClick={() => setActivePoint(p)}
                    className={`p-3 rounded-xl border text-left transition-all ${activePoint.id === p.id ? 'bg-surface-dark border-primary' : 'bg-surface-dark/50 border-border-dark hover:border-white/30'}`}
                >
                    <span className={`block font-bold ${activePoint.id === p.id ? 'text-primary' : 'text-white'}`}>{p.name}</span>
                    <span className="text-xs text-text-secondary-dark">{p.location}</span>
                </button>
            ))}
        </div>

      </main>
    </div>
  );
};
