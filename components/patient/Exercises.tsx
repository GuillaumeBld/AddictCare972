
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { CoherenceCardiac } from './CoherenceCardiac';
import { JournalModal, JournalType } from './JournalModal';
import { AcupressureGuide } from './AcupressureGuide';

export const Exercises: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'NONE' | 'BREATHING' | 'ACUPRESSURE' | JournalType>('NONE');

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {activeTool === 'BREATHING' && <CoherenceCardiac onClose={() => setActiveTool('NONE')} />}
      {activeTool === 'ACUPRESSURE' && <AcupressureGuide onClose={() => setActiveTool('NONE')} />}
      {(activeTool === 'CONSUMPTION' || activeTool === 'EMOTION' || activeTool === 'CRAVING') && (
        <JournalModal type={activeTool} onClose={() => setActiveTool('NONE')} />
      )}

      <header className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur p-4 border-b border-border-dark flex items-center gap-4">
        <button className="text-white">
            <Icon name="arrow_back_ios_new" className="text-lg" />
        </button>
        <h1 className="text-lg font-bold text-white">Exercices & Journaux</h1>
      </header>

      <main className="p-4 space-y-8">
        
        {/* Relaxation Section */}
        <section>
            <h2 className="text-xl font-bold text-white mb-4">Exercices de Relaxation</h2>
            <div className="space-y-3">
                <div 
                    onClick={() => setActiveTool('BREATHING')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
                >
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                        <Icon name="favorite" filled />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Cohérence Cardiaque</h3>
                        <p className="text-xs text-text-secondary-dark">Exercice de respiration guidée - 5 min</p>
                    </div>
                    <Icon name="chevron_right" className="text-text-secondary-dark" />
                </div>

                <div 
                    onClick={() => setActiveTool('ACUPRESSURE')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
                >
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                        <Icon name="back_hand" filled />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Points d'Acupressure</h3>
                        <p className="text-xs text-text-secondary-dark">Techniques pour soulager le stress</p>
                    </div>
                    <Icon name="chevron_right" className="text-text-secondary-dark" />
                </div>
            </div>
        </section>

        {/* Journals Section */}
        <section>
            <h2 className="text-xl font-bold text-white mb-4">Mes Journaux</h2>
            <div className="space-y-3">
                <div 
                    onClick={() => setActiveTool('CONSUMPTION')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
                >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Icon name="calendar_month" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Journal de Consommation</h3>
                        <p className="text-xs text-text-secondary-dark">Suivre et comprendre vos habitudes</p>
                    </div>
                    <Icon name="chevron_right" className="text-text-secondary-dark" />
                </div>

                <div 
                    onClick={() => setActiveTool('EMOTION')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
                >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Icon name="sentiment_satisfied" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Journal des Émotions</h3>
                        <p className="text-xs text-text-secondary-dark">Noter votre humeur et vos ressentis</p>
                    </div>
                    <Icon name="chevron_right" className="text-text-secondary-dark" />
                </div>

                <div 
                    onClick={() => setActiveTool('CRAVING')}
                    className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark cursor-pointer hover:bg-white/5 transition"
                >
                    <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                        <Icon name="water" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Journal du Craving</h3>
                        <p className="text-xs text-text-secondary-dark">Identifier l'intensité des envies</p>
                    </div>
                    <Icon name="chevron_right" className="text-text-secondary-dark" />
                </div>
            </div>
        </section>

      </main>
    </div>
  );
};
