
import React from 'react';
import { Icon } from '../Icon';
import { Patient, Alert } from '../../types';

interface Props {
  patients: Patient[];
  onNavigate: (view: string, data?: any) => void;
}

export const TherapistDashboard: React.FC<Props> = ({ patients, onNavigate }) => {
  
  // Aggregate alerts from all patients
  const allAlerts = patients.flatMap(p => 
    p.alerts.map(a => ({ ...a, patientName: `${p.firstName} ${p.lastName}`, patientId: p.id }))
  );

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-background-dark/80 backdrop-blur-md p-4 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cover bg-center border border-primary/30" style={{backgroundImage: 'url(https://i.pravatar.cc/150?u=dr_martin)'}}></div>
            <div>
              <h1 className="text-xl font-bold text-white leading-none">Bonjour Dr. Martin</h1>
              <p className="text-xs text-text-secondary-dark mt-1">Fort-de-France</p>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-white/10 transition">
            <Icon name="notifications" />
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 pt-6 space-y-8">
        {/* Alerts Section */}
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Alertes prioritaires</h2>
          {allAlerts.length === 0 ? (
             <div className="p-4 rounded-xl bg-surface-dark border border-border-dark text-text-secondary-dark text-sm text-center">
                Aucune alerte pour le moment.
             </div>
          ) : (
            <div className="space-y-3">
                {allAlerts.slice(0, 3).map((alert) => (
                    <div 
                        key={alert.id}
                        className={`flex items-start justify-between p-4 rounded-xl border ${alert.type === 'CRITICAL' ? 'bg-alert-critical/10 border-alert-critical/20' : 'bg-alert-warning/10 border-alert-warning/20'}`}
                    >
                        <div className="flex flex-col">
                            <span className={`text-xs font-bold uppercase tracking-wide mb-1 ${alert.type === 'CRITICAL' ? 'text-alert-critical' : 'text-alert-warning'}`}>
                                {alert.title}
                            </span>
                            <span className="text-base font-bold text-white">{alert.patientName}</span>
                            <span className="text-sm text-text-secondary-dark">{alert.description}</span>
                        </div>
                        <Icon name={alert.type === 'CRITICAL' ? 'warning' : 'info'} className={`text-3xl ${alert.type === 'CRITICAL' ? 'text-alert-critical' : 'text-alert-warning'}`} />
                    </div>
                ))}
            </div>
          )}
        </section>

        {/* Patients List */}
        <section>
            <div className="flex items-center justify-between mb-3 sticky top-[72px] bg-background-dark py-2 z-10">
                 <h2 className="text-lg font-bold text-white">Mes Patients</h2>
                 <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-dark text-primary">
                    <Icon name="filter_list" className="text-xl" />
                 </button>
            </div>
         
          <div className="space-y-3">
            {patients.map((p) => (
              <div 
                key={p.id} 
                onClick={() => onNavigate('patient-details', p)}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark hover:bg-surface-dark/80 transition cursor-pointer border border-border-dark"
              >
                {/* Progress Ring Simulation */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-white/10" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-primary" strokeDasharray={`${(p.currentSession / 12) * 100}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-white">{p.currentSession}/12</span>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-base font-bold text-white">{p.firstName} {p.lastName}</h3>
                  <p className="text-sm text-text-secondary-dark">Abstinence : {p.abstinenceDays} jours</p>
                </div>
                <Icon name="chevron_right" className="text-text-secondary-dark" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
