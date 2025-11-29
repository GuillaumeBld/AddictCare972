
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

export type JournalType = 'CONSUMPTION' | 'EMOTION' | 'CRAVING';

interface Props {
  type: JournalType;
  onClose: () => void;
}

export const JournalModal: React.FC<Props> = ({ type, onClose }) => {
  const { patients, addJournalEntry } = useApp();
  // Simulating logged-in patient
  const patientId = patients[0].id;

  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');

  const getTitle = () => {
    switch(type) {
      case 'CONSUMPTION': return 'Nouvelle Consommation';
      case 'EMOTION': return 'Journal des Émotions';
      case 'CRAVING': return 'Note de Craving';
    }
  };

  const handleSave = () => {
    addJournalEntry(patientId, {
        type,
        intensity,
        note,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-surface-dark border border-border-dark rounded-2xl p-6 space-y-6 animate-slide-up">
        
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{getTitle()}</h2>
          <button onClick={onClose} className="text-text-secondary-dark hover:text-white">
            <Icon name="close" />
          </button>
        </div>

        {/* Dynamic Fields */}
        {type === 'CRAVING' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-text-secondary-dark">
              Intensité de l'envie (0-10)
            </label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" 
                max="10" 
                value={intensity} 
                onChange={(e) => setIntensity(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <span className="text-2xl font-bold text-primary w-8 text-center">{intensity}</span>
            </div>
            <div className="flex justify-between text-xs text-text-secondary-dark">
                <span>Faible</span>
                <span>Irrésistible</span>
            </div>
          </div>
        )}

        {type === 'EMOTION' && (
          <div className="grid grid-cols-5 gap-2">
            {['😭', '😟', '😐', '🙂', '😁'].map((emoji, idx) => (
                <button 
                    key={idx}
                    onClick={() => setIntensity(idx * 2.5)}
                    className={`h-12 rounded-xl text-2xl flex items-center justify-center transition-colors ${intensity === idx * 2.5 ? 'bg-primary/20 border border-primary' : 'bg-white/5 border border-transparent'}`}
                >
                    {emoji}
                </button>
            ))}
          </div>
        )}

        <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary-dark">
                {type === 'CONSUMPTION' ? 'Quoi, Combien, Contexte ?' : 'Notes / Contexte'}
            </label>
            <textarea 
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full h-32 bg-background-dark border border-border-dark rounded-xl p-3 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                placeholder="Écrivez ici..."
            ></textarea>
        </div>

        <button 
            onClick={handleSave}
            className="w-full h-12 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl transition-colors"
        >
            Enregistrer
        </button>

      </div>
    </div>
  );
};
