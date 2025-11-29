
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';

interface Props {
    onBack: () => void;
    onNavigate: (view: string) => void;
}

export const ProgressView: React.FC<Props> = ({ onBack, onNavigate }) => {
  const { activePatient } = useApp();
  const [activeTab, setActiveTab] = useState<'DASHBOARD' | 'JOURNAL' | 'NOTES' | 'PLAN'>('DASHBOARD');

  if (!activePatient) return null;

  // Prepare data from history
  const sortedHistory = [...activePatient.history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const chartData = sortedHistory.map(entry => {
    const date = new Date(entry.date);
    return {
        name: `${date.getDate()}/${date.getMonth()+1}`,
        value: entry.intensity,
        type: entry.type
    };
  });

  const cravingData = chartData.filter(d => d.type === 'CRAVING');
  const motivationData = chartData.filter(d => d.type === 'EMOTION');

  const latestCraving = cravingData.length > 0 ? cravingData[cravingData.length - 1].value : '-';
  const latestMotiv = motivationData.length > 0 ? motivationData[motivationData.length - 1].value : '-';

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-24">
        <header className="sticky top-0 z-10 bg-background-dark/90 backdrop-blur p-4 border-b border-border-dark flex items-center gap-4">
            <button onClick={onBack} className="text-white">
                <Icon name="arrow_back" />
            </button>
            <h1 className="text-lg font-bold text-white flex-1 text-center truncate">{activePatient.firstName} {activePatient.lastName}</h1>
            <button onClick={() => onNavigate('patient-export')} className="text-primary" title="Exporter">
                <Icon name="ios_share" />
            </button>
        </header>

        {/* Tabs */}
        <div className="px-2 py-2 bg-background-dark border-b border-white/5 flex overflow-x-auto no-scrollbar">
            <button 
                onClick={() => setActiveTab('DASHBOARD')}
                className={`flex-1 min-w-[80px] pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'DASHBOARD' ? 'text-primary border-primary' : 'text-text-secondary-dark border-transparent'}`}
            >
                Indicateurs
            </button>
            <button 
                onClick={() => setActiveTab('JOURNAL')}
                className={`flex-1 min-w-[80px] pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'JOURNAL' ? 'text-primary border-primary' : 'text-text-secondary-dark border-transparent'}`}
            >
                Journal
            </button>
            <button 
                onClick={() => setActiveTab('PLAN')}
                className={`flex-1 min-w-[80px] pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'PLAN' ? 'text-primary border-primary' : 'text-text-secondary-dark border-transparent'}`}
            >
                Urgence
            </button>
            <button 
                onClick={() => setActiveTab('NOTES')}
                className={`flex-1 min-w-[80px] pb-2 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeTab === 'NOTES' ? 'text-primary border-primary' : 'text-text-secondary-dark border-transparent'}`}
            >
                Notes Pro
            </button>
        </div>

        <main className="p-4 space-y-6">
            
            {activeTab === 'DASHBOARD' && (
                <>
                    {/* Quick Actions */}
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onNavigate('session-live')}
                            className="flex-1 h-12 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-primary/10"
                        >
                            <Icon name="play_arrow" filled />
                            Démarrer S{activePatient.currentSession}
                        </button>
                    </div>

                    {/* Craving Chart */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold">Craving</h3>
                            <span className="text-2xl font-bold text-primary">{latestCraving}/10</span>
                        </div>
                        <div className="h-48 w-full">
                            {cravingData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={cravingData}>
                                    <defs>
                                        <linearGradient id="colorCraving" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#E57373" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#E57373" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#666" fontSize={10} minTickGap={30} />
                                    <YAxis stroke="#666" fontSize={10} domain={[0, 10]} />
                                    <Tooltip contentStyle={{backgroundColor: '#1A3222', borderColor: '#346544', color: '#fff'}} />
                                    <Area type="monotone" dataKey="value" stroke="#E57373" fillOpacity={1} fill="url(#colorCraving)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-text-secondary-dark text-xs">Pas encore de données</div>
                            )}
                        </div>
                    </div>

                    {/* Motivation Chart */}
                    <div className="bg-surface-dark border border-border-dark rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-bold">Motivation</h3>
                            <span className="text-2xl font-bold text-primary">{latestMotiv}/10</span>
                        </div>
                        <div className="h-48 w-full">
                            {motivationData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={motivationData}>
                                    <defs>
                                        <linearGradient id="colorMotiv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#19e65e" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#19e65e" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis dataKey="name" stroke="#666" fontSize={10} minTickGap={30} />
                                    <YAxis stroke="#666" fontSize={10} domain={[0, 10]} />
                                    <Tooltip contentStyle={{backgroundColor: '#1A3222', borderColor: '#346544', color: '#fff'}} />
                                    <Area type="monotone" dataKey="value" stroke="#19e65e" fillOpacity={1} fill="url(#colorMotiv)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-text-secondary-dark text-xs">Pas encore de données</div>
                            )}
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'JOURNAL' && (
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white mb-2">Entrées du patient</h3>
                    {[...sortedHistory].reverse().map((entry) => (
                        <div key={entry.id} className="bg-surface-dark border border-border-dark rounded-xl p-4 flex gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 
                                ${entry.type === 'CRAVING' ? 'bg-alert-critical/20 text-alert-critical' : 
                                  entry.type === 'EMOTION' ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white'}`}>
                                <Icon 
                                    name={entry.type === 'CRAVING' ? 'waves' : entry.type === 'EMOTION' ? 'sentiment_satisfied' : 'calendar_month'} 
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <span className="font-bold text-white text-sm capitalize">{entry.type.toLowerCase()}</span>
                                    <span className="text-[10px] text-text-secondary-dark">{new Date(entry.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-xs text-primary font-bold mt-1">Intensité : {entry.intensity}/10</p>
                                {entry.note && (
                                    <p className="text-sm text-text-secondary-dark mt-2 bg-black/20 p-2 rounded italic">"{entry.note}"</p>
                                )}
                            </div>
                        </div>
                    ))}
                    {sortedHistory.length === 0 && <p className="text-center text-text-secondary-dark text-sm">Aucune entrée journal.</p>}
                </div>
            )}

            {activeTab === 'PLAN' && (
                <div className="bg-surface-dark border border-border-dark rounded-xl p-6 space-y-6">
                    <div className="flex items-center gap-3 text-alert-critical border-b border-white/5 pb-4">
                        <Icon name="warning" filled className="text-2xl" />
                        <h2 className="text-lg font-bold">Plan d'Urgence du Patient</h2>
                    </div>
                    
                    <div>
                        <label className="text-xs text-text-secondary-dark uppercase font-bold">Contact d'urgence</label>
                        <p className="text-white text-lg font-bold">{activePatient.emergencyPlan.contactName || "Non défini"}</p>
                        <p className="text-primary">{activePatient.emergencyPlan.contactNumber}</p>
                    </div>

                    <div>
                        <label className="text-xs text-text-secondary-dark uppercase font-bold">Lieu Sûr</label>
                        <p className="text-white">{activePatient.emergencyPlan.safePlace || "Non défini"}</p>
                    </div>

                    <div>
                        <label className="text-xs text-text-secondary-dark uppercase font-bold">Distraction</label>
                        <div className="bg-[#4DB6AC]/20 text-[#4DB6AC] p-3 rounded-lg mt-1 border border-[#4DB6AC]/30">
                            {activePatient.emergencyPlan.distraction || "Non défini"}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'NOTES' && (
                <div className="space-y-4">
                    {activePatient.notes.length === 0 ? (
                        <div className="text-center text-text-secondary-dark py-10">Aucune note enregistrée.</div>
                    ) : (
                        [...activePatient.notes].reverse().map((note, idx) => (
                            <div key={idx} className="bg-surface-dark border border-border-dark rounded-xl p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-primary">Séance {note.sessionId}</h3>
                                    <span className="text-xs text-text-secondary-dark">{new Date(note.date).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-white/90 whitespace-pre-wrap">{note.content}</p>
                            </div>
                        ))
                    )}
                </div>
            )}

        </main>
    </div>
  );
};
