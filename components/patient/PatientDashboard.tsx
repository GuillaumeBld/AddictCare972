
import React from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';
import { PROTOCOL_DATA } from '../../data/protocols';

export const PatientDashboard: React.FC = () => {
  // Use context to get patient data (simulating logged in patient via 'activePatient' or first patient)
  const { patients, toggleEntourageAccess } = useApp();
  // Simulating the "Logged In" patient as the first one for demo purposes
  const patient = patients[0]; 
  const protocol = PROTOCOL_DATA[patient?.program] || PROTOCOL_DATA['Tabac'];
  
  // Next session is currentSession
  const nextSessionIndex = Math.min(patient?.currentSession - 1 || 0, protocol.length - 1);
  const nextSession = protocol[nextSessionIndex];

  // Previous session (completed) to get homework assigned
  const prevSessionIndex = Math.max(0, patient?.currentSession - 2);
  const prevSession = patient?.currentSession > 1 ? protocol[prevSessionIndex] : null;

  // Calculate stats from history
  const history = patient?.history || [];
  const cravings = history.filter(h => h.type === 'CRAVING');
  const motivations = history.filter(h => h.type === 'EMOTION');
  
  const lastCraving = cravings.length > 0 ? cravings[cravings.length-1].intensity : 5;
  const lastMotiv = motivations.length > 0 ? motivations[motivations.length-1].intensity : 7;

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
       {/* Security Banner */}
       <div className="sticky top-0 z-20 bg-background-dark p-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-alert-critical animate-pulse">
                <Icon name="sos" filled />
                <span className="text-xs font-bold">Besoin d'aide ? Appelez le 15</span>
            </div>
            <div className="w-6"></div>
       </div>

       <main className="p-4 space-y-6">
            <h1 className="text-3xl font-bold text-white pt-2">Bonjour {patient ? patient.firstName : 'Patient'}</h1>

            {/* Current Program Card */}
            <div className="rounded-xl bg-surface-dark overflow-hidden border border-border-dark shadow-lg">
                <div className="h-32 bg-cover bg-center relative" style={{backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuALONByLSo5qBMiXjW4y5yZsN-x3cb9SN-BZN5efyySOhU1JXx4aIVfYiEn_34P2aFyyMnRS_YT8drYmEJlUv3zuYSvRCNmitJ7E2D4MkybdlLBofBgi_Ker7bmQrX3LjTyXVh0b_9vKIprsEy4L0lu-9rt-cT3EqLCCHWA-3gUmpKNlN6vO6h-1sCDTcF8Nyq8KQ2jNK8edZfVanvPU9f-cUGw6ILp2n4hhxEkxhw2etH0P7BNJ39bxPhYooujaPw98RiMjN6qeDc)'}}>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-4 left-4">
                        <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                            {patient ? patient.program : 'Programme'}
                        </span>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-xl font-bold text-white mt-1">
                        Semaine {Math.ceil((patient?.currentSession || 1) / 3)} sur 4
                    </h2>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-4">
                        <div 
                            className="bg-primary h-full rounded-full transition-all duration-1000" 
                            style={{width: `${((patient?.currentSession || 1) / 12) * 100}%`}}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Active Homework */}
            {prevSession && (
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                    <div className="flex items-center gap-2 mb-2 text-primary">
                        <Icon name="task" filled />
                        <h3 className="font-bold text-sm uppercase tracking-wide">Devoirs en cours</h3>
                    </div>
                    <p className="text-white text-sm font-medium leading-relaxed">
                        {prevSession.homework}
                    </p>
                </div>
            )}

            {/* Next Session */}
            <div className="rounded-xl bg-surface-dark p-5 border border-border-dark flex flex-col gap-3 shadow-md">
                <span className="text-xs text-text-secondary-dark uppercase tracking-wider font-bold">Prochaine séance</span>
                <h3 className="text-lg font-bold text-white leading-tight">
                    Séance {patient?.currentSession || 1} : {nextSession ? nextSession.title : 'Chargement...'}
                </h3>
                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-text-secondary-dark flex items-center gap-2">
                        <Icon name="event" className="text-base" /> Demain
                    </span>
                    <button className="bg-primary hover:bg-primary-dark transition text-black px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/10">
                        Préparer
                    </button>
                </div>
            </div>

            {/* Indicators */}
            <div className="space-y-3">
                <h2 className="text-lg font-bold text-white">Mes Indicateurs</h2>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                        <Icon name="calendar_today" className="text-primary text-3xl" />
                        <span className="text-2xl font-bold text-white">{patient?.abstinenceDays || 0}</span>
                        <span className="text-[10px] text-text-secondary-dark text-center leading-tight">Jours d'abstinence</span>
                    </div>
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                        <Icon name="star" className="text-[#FFBE0B] text-3xl" />
                        <span className="text-2xl font-bold text-white">{lastMotiv}/10</span>
                        <span className="text-[10px] text-text-secondary-dark text-center leading-tight">Motivation</span>
                    </div>
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                        <Icon name="waves" className="text-[#E57373] text-3xl" />
                        <span className="text-2xl font-bold text-white">{lastCraving}/10</span>
                        <span className="text-[10px] text-text-secondary-dark text-center leading-tight">Niveau de craving</span>
                    </div>
                </div>
            </div>

            {/* Settings / Privacy */}
            <div className="p-4 rounded-xl bg-surface-dark border border-border-dark">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-white">Accès Proche</h4>
                        <p className="text-xs text-text-secondary-dark">Autoriser la famille à voir le guide de soutien.</p>
                    </div>
                    <button 
                        onClick={() => patient && toggleEntourageAccess(patient.id)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${patient?.allowEntourage ? 'bg-primary' : 'bg-white/20'}`}
                    >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${patient?.allowEntourage ? 'left-7' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>

            {/* Notification */}
             <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-dark border border-border-dark">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon name="mail" filled />
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Nouveau message</h4>
                    <p className="text-xs text-text-secondary-dark">Dr. Martin vous a envoyé un message.</p>
                </div>
                <Icon name="chevron_right" className="text-text-secondary-dark" />
            </div>
       </main>
    </div>
  );
};
