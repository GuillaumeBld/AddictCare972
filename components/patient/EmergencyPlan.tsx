
import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

export const EmergencyPlan: React.FC = () => {
  const { patients, updateEmergencyPlan } = useApp();
  // Simulating logged-in patient (first one)
  const patient = patients[0];

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    contactName: '',
    contactNumber: '',
    safePlace: '',
    distraction: ''
  });

  useEffect(() => {
    if (patient) {
        setFormData(patient.emergencyPlan);
    }
  }, [patient]);

  const handleSave = () => {
    if (patient) {
        updateEmergencyPlan(patient.id, formData);
        setIsEditing(false);
    }
  };

  if (!patient) return <div>Chargement...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      <header className="sticky top-0 z-10 bg-alert-critical p-4 text-black flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
            <Icon name="warning" filled className="text-3xl" />
            <h1 className="text-lg font-bold">Mon Plan d'Urgence</h1>
        </div>
        <button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-black/20 p-2 rounded-lg text-sm font-bold hover:bg-black/30 transition"
        >
            {isEditing ? 'Sauver' : 'Modifier'}
        </button>
      </header>

      <main className="p-4 space-y-6">
        <div className="p-4 bg-alert-critical/10 border border-alert-critical rounded-xl">
             <p className="text-sm text-alert-critical font-bold text-center">
                Utilisez cette page si vous ressentez une envie incontrôlable ou si vous êtes en détresse.
             </p>
        </div>

        <section className="space-y-3">
             <h2 className="text-white font-bold">Contacts d'urgence</h2>
             
             {/* Main Emergency */}
             <a href="tel:15" className="w-full h-16 bg-alert-critical hover:bg-red-600 transition rounded-xl flex items-center justify-center gap-3 text-white font-bold text-lg shadow-lg">
                <Icon name="call" filled />
                Appeler le 15 (SAMU)
             </a>

             {/* Personal Contact */}
             <div className="w-full h-16 bg-surface-dark border border-border-dark rounded-xl flex items-center px-4 gap-3">
                <Icon name="diversity_3" className="text-white" />
                {isEditing ? (
                    <div className="flex-1 flex gap-2">
                        <input 
                            placeholder="Nom du proche" 
                            className="flex-1 bg-black/20 rounded p-2 text-white text-sm"
                            value={formData.contactName}
                            onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                        />
                        <input 
                            placeholder="Tél" 
                            className="w-24 bg-black/20 rounded p-2 text-white text-sm"
                            value={formData.contactNumber}
                            onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                        />
                    </div>
                ) : (
                    <a href={`tel:${formData.contactNumber}`} className="flex-1 text-white font-bold text-lg flex justify-between items-center">
                        {formData.contactName || "Définir un proche"}
                        <span className="text-sm font-normal opacity-70">{formData.contactNumber}</span>
                    </a>
                )}
             </div>
        </section>

        <section className="space-y-3">
            <h2 className="text-white font-bold">Que faire maintenant ?</h2>
            
            {/* Distraction */}
            <div className="bg-[#4DB6AC] rounded-xl p-4 shadow-md">
                <div className="flex items-start gap-3 mb-2">
                    <Icon name="celebration" className="text-white text-3xl" />
                    <span className="text-white font-bold text-lg">Distraction immédiate</span>
                </div>
                {isEditing ? (
                    <textarea 
                        className="w-full bg-black/10 rounded p-2 text-white placeholder:text-white/60 text-sm"
                        placeholder="Ex: Aller marcher, écouter ma playlist..."
                        value={formData.distraction}
                        onChange={(e) => setFormData({...formData, distraction: e.target.value})}
                    />
                ) : (
                    <p className="text-white font-medium">
                        {formData.distraction || "Ex: Faire un exercice de respiration, sortir marcher 5 min..."}
                    </p>
                )}
            </div>

            <div className="bg-[#4DB6AC] rounded-xl p-4 flex items-center justify-between shadow-md cursor-pointer hover:brightness-110 transition">
                <div className="flex items-center gap-3">
                    <Icon name="air" className="text-white text-3xl" />
                    <span className="text-white font-bold">Exercice de respiration</span>
                </div>
                <Icon name="chevron_right" className="text-white" />
            </div>
        </section>

        <section className="space-y-3">
             <h2 className="text-white font-bold">Lieu Sûr</h2>
             <div className="bg-surface-dark border border-border-dark rounded-xl p-4 flex items-center gap-3">
                <Icon name="home" className="text-[#4DB6AC] text-2xl" />
                {isEditing ? (
                    <input 
                        className="flex-1 bg-black/20 rounded p-2 text-white text-sm"
                        placeholder="Ex: Chez Sarah, Bibliothèque..."
                        value={formData.safePlace}
                        onChange={(e) => setFormData({...formData, safePlace: e.target.value})}
                    />
                ) : (
                    <span className="text-text-secondary-dark font-medium">{formData.safePlace || "Définir un lieu sûr"}</span>
                )}
             </div>
        </section>
      </main>
    </div>
  );
};
