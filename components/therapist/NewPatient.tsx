
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { ProgramType } from '../../types';
import { useApp } from '../../context/AppContext';

export const NewPatient: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addPatient } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [selectedProgram, setSelectedProgram] = useState<ProgramType | null>(null);

  const programs = [
    { type: ProgramType.TABAC, label: 'Tabac', desc: "Programme d'accompagnement pour l'arrêt du tabac.", icon: 'smoking_rooms' },
    { type: ProgramType.ALCOOL, label: 'Alcool', desc: "Gestion de l'alcool et retour à une vie équilibrée.", icon: 'liquor' },
    { type: ProgramType.CANNABIS, label: 'Cannabis', desc: "Aide à l'arrêt ou réduction du cannabis.", icon: 'grass' },
    { type: ProgramType.CRACK, label: 'Crack', desc: "Soutien spécifique pour sortir de la dépendance.", icon: 'pill' },
    { type: ProgramType.POLY, label: 'Polyconsommation', desc: "Prise en charge de plusieurs addictions.", icon: 'blender' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (selectedProgram && formData.firstName && formData.lastName) {
      addPatient({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        program: selectedProgram
      });
      onBack();
    }
  };

  const isFormValid = selectedProgram && formData.firstName.length > 0 && formData.lastName.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur p-4 border-b border-border-dark flex items-center justify-between">
        <button onClick={onBack} className="text-text-secondary-dark font-medium">Annuler</button>
        <h1 className="text-lg font-bold text-white">Nouveau Patient</h1>
        <button 
            onClick={handleSave} 
            disabled={!isFormValid}
            className={`text-primary font-bold ${!isFormValid ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}`}
        >
            Enregistrer
        </button>
      </header>

      <main className="p-4 space-y-8">
        {/* Personal Info */}
        <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Informations personnelles</h2>
            <div className="space-y-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary-dark">Prénom</label>
                    <input 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        type="text" 
                        className="w-full bg-surface-dark border border-border-dark rounded-xl h-12 px-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/20"
                        placeholder="Entrez le prénom"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary-dark">Nom</label>
                    <input 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        type="text" 
                        className="w-full bg-surface-dark border border-border-dark rounded-xl h-12 px-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/20"
                        placeholder="Entrez le nom de famille"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary-dark">Email</label>
                    <input 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email" 
                        className="w-full bg-surface-dark border border-border-dark rounded-xl h-12 px-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/20"
                        placeholder="exemple@mail.com"
                    />
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-text-secondary-dark">Téléphone</label>
                    <input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        type="tel" 
                        className="w-full bg-surface-dark border border-border-dark rounded-xl h-12 px-4 text-white focus:ring-1 focus:ring-primary focus:border-primary outline-none placeholder:text-white/20"
                        placeholder="06 96 00 00 00"
                    />
                </div>
            </div>
        </section>

        {/* Program Selection */}
        <section className="space-y-4">
             <h2 className="text-xl font-bold text-white">Sélection du programme</h2>
             <div className="space-y-3">
                {programs.map((p) => (
                    <label 
                        key={p.type}
                        className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${selectedProgram === p.type ? 'bg-primary/20 border-primary' : 'bg-surface-dark border-border-dark hover:border-white/30'}`}
                    >
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${selectedProgram === p.type ? 'bg-primary text-black' : 'bg-white/5 text-primary'}`}>
                            <Icon name={p.icon} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-base font-bold text-white">{p.label}</h3>
                            <p className="text-xs text-text-secondary-dark">{p.desc}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedProgram === p.type ? 'border-primary bg-primary' : 'border-text-secondary-dark'}`}>
                             {selectedProgram === p.type && <div className="w-2.5 h-2.5 bg-black rounded-full"></div>}
                        </div>
                        <input 
                            type="radio" 
                            name="program" 
                            className="hidden" 
                            checked={selectedProgram === p.type} 
                            onChange={() => setSelectedProgram(p.type)}
                        />
                    </label>
                ))}
             </div>
        </section>

        {/* Start Button */}
        <button 
            onClick={handleSave}
            disabled={!isFormValid}
            className={`w-full h-14 rounded-xl text-black text-lg font-bold shadow-lg shadow-primary/20 mt-4 transition-all ${isFormValid ? 'bg-primary hover:bg-primary-dark' : 'bg-gray-600 cursor-not-allowed text-gray-400 shadow-none'}`}
        >
            Créer le dossier patient
        </button>
      </main>
    </div>
  );
};
