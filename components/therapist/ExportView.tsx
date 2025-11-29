
import React, { useState } from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

export const ExportView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { activePatient } = useApp();
  const [docType, setDocType] = useState('RESUME');

  if (!activePatient) return null;

  const handleExport = () => {
    if (!activePatient) return;

    let content = "";
    const dateStr = new Date().toLocaleDateString('fr-FR');
    const filename = `${activePatient.lastName}_${activePatient.firstName}_${docType}_${Date.now()}.txt`;

    if (docType === 'RESUME') {
        content = `RÉSUMÉ PATIENT - ADDICTCARE 972\n--------------------------------\n` +
                  `Patient : ${activePatient.firstName} ${activePatient.lastName}\n` +
                  `Date : ${dateStr}\n` +
                  `Programme : ${activePatient.program}\n\n` +
                  `PROGRESSION\n` +
                  `Séance actuelle : ${activePatient.currentSession} / 12\n` +
                  `Jours d'abstinence : ${activePatient.abstinenceDays}\n` +
                  `Date de début : ${new Date(activePatient.startDate).toLocaleDateString()}\n\n` +
                  `DERNIÈRES ALERTES\n` +
                  activePatient.alerts.slice(0, 5).map(a => `- [${a.date}] ${a.title}: ${a.description}`).join('\n') +
                  `\n\n--------------------------------\nDocument généré par AddictCare`;
    } else if (docType === 'CLINIQUE') {
        content = `DOSSIER CLINIQUE CONFIDENTIEL\n-----------------------------\n` +
                  `Patient : ${activePatient.firstName} ${activePatient.lastName} (ID: ${activePatient.id})\n` +
                  `Programme : ${activePatient.program}\n\n` +
                  `HISTORIQUE DES NOTES DE SÉANCE\n\n` +
                  activePatient.notes.map(n => 
                    `[Séance ${n.sessionId} - ${new Date(n.date).toLocaleDateString()}]\n${n.content}\n`
                  ).join('\n-----------------------------\n') +
                  `\n\nFin du dossier.`;
    } else if (docType === 'URGENCE') {
        content = `PLAN D'URGENCE\n----------------\n` +
                  `Patient : ${activePatient.firstName} ${activePatient.lastName}\n\n` +
                  `1. CONTACTS D'URGENCE\n` +
                  `   - Médical : 15 (SAMU)\n` +
                  `   - Personne Ressource : ${activePatient.emergencyPlan.contactName || 'Non défini'} (${activePatient.emergencyPlan.contactNumber || 'N/A'})\n\n` +
                  `2. LIEU SÛR\n` +
                  `   - ${activePatient.emergencyPlan.safePlace || 'Non défini'}\n\n` +
                  `3. STRATÉGIE DE DISTRACTION\n` +
                  `   - ${activePatient.emergencyPlan.distraction || 'Non défini'}\n\n` +
                  `----------------\nEn cas de danger immédiat, appelez le 15.`;
    }

    // Generate Blob and Trigger Download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur p-4 border-b border-border-dark flex items-center gap-4">
        <button onClick={onBack} className="text-white">
            <Icon name="arrow_back" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1 text-center">Exporter les données</h1>
        <div className="w-6"></div>
      </header>

      <main className="p-4 space-y-8">
        
        {/* Patient Selector */}
        <div>
            <h2 className="text-lg font-bold text-white mb-2">Patient sélectionné</h2>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-surface-dark border border-border-dark">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {activePatient.firstName[0]}{activePatient.lastName[0]}
                </div>
                <span className="font-bold text-white flex-1">{activePatient.firstName} {activePatient.lastName}</span>
                <Icon name="lock" className="text-text-secondary-dark text-sm" />
            </div>
        </div>

        {/* Document Type */}
        <section>
            <h2 className="text-lg font-bold text-white mb-3">Choisir le type de document</h2>
            <div className="space-y-3">
                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${docType === 'RESUME' ? 'bg-primary/20 border-primary' : 'bg-surface-dark border-border-dark'}`}>
                    <input type="radio" name="doctype" className="hidden" checked={docType === 'RESUME'} onChange={() => setDocType('RESUME')} />
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Résumé pour le patient</h3>
                        <p className="text-xs text-text-secondary-dark">Un document simple et clair avec les progrès.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${docType === 'RESUME' ? 'border-primary' : 'border-text-secondary-dark'}`}>
                        {docType === 'RESUME' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${docType === 'CLINIQUE' ? 'bg-primary/20 border-primary' : 'bg-surface-dark border-border-dark'}`}>
                    <input type="radio" name="doctype" className="hidden" checked={docType === 'CLINIQUE'} onChange={() => setDocType('CLINIQUE')} />
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Note clinique (dossier)</h3>
                        <p className="text-xs text-text-secondary-dark">Note détaillée pour les dossiers médicaux.</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${docType === 'CLINIQUE' ? 'border-primary' : 'border-text-secondary-dark'}`}>
                        {docType === 'CLINIQUE' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                </label>

                <label className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${docType === 'URGENCE' ? 'bg-primary/20 border-primary' : 'bg-surface-dark border-border-dark'}`}>
                    <input type="radio" name="doctype" className="hidden" checked={docType === 'URGENCE'} onChange={() => setDocType('URGENCE')} />
                    <div className="flex-1">
                        <h3 className="font-bold text-white">Plan d'urgence</h3>
                        <p className="text-xs text-text-secondary-dark">Document imprimable (format carte).</p>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${docType === 'URGENCE' ? 'border-primary' : 'border-text-secondary-dark'}`}>
                        {docType === 'URGENCE' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                </label>
            </div>
        </section>

      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-background-dark/95 backdrop-blur border-t border-border-dark">
        <button 
            onClick={handleExport}
            className="w-full h-14 bg-primary hover:bg-primary-dark text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20"
        >
            <Icon name="ios_share" />
            Exporter le document
        </button>
        <p className="text-[10px] text-center text-text-secondary-dark mt-2">Données chiffrées et sécurisées.</p>
      </footer>
    </div>
  );
};
