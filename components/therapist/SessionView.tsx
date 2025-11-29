
import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';
import { useApp } from '../../context/AppContext';
import { PROTOCOL_DATA, SessionData, StepData } from '../../data/protocols';
import { ToolModal, ToolType } from './ToolModal';

export const SessionView: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { activePatient, completeSession } = useApp();
  const [currentSessionData, setCurrentSessionData] = useState<SessionData | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepTimer, setStepTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionNotes, setSessionNotes] = useState('');
  const [activeTool, setActiveTool] = useState<ToolType>('NONE');

  useEffect(() => {
    if (activePatient) {
      // Find the correct session from the protocol data
      const protocol = PROTOCOL_DATA[activePatient.program] || PROTOCOL_DATA['Tabac']; // Fallback
      // Session ID is 1-based, array is 0-based. Also handle if session > available data
      const sessionIndex = Math.min(activePatient.currentSession - 1, protocol.length - 1);
      const data = protocol[sessionIndex];
      setCurrentSessionData(data);
      if (data && data.steps.length > 0) {
        setStepTimer(data.steps[0].duration * 60);
      }
    }
  }, [activePatient]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning && stepTimer > 0) {
        interval = setInterval(() => setStepTimer(p => p - 1), 1000);
    } else if (stepTimer === 0) {
        setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, stepTimer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleNextStep = () => {
    if (!currentSessionData) return;
    if (currentStepIndex < currentSessionData.steps.length - 1) {
        const nextIndex = currentStepIndex + 1;
        setCurrentStepIndex(nextIndex);
        setStepTimer(currentSessionData.steps[nextIndex].duration * 60);
        setIsTimerRunning(false);
    }
  };

  const handlePrevStep = () => {
    if (!currentSessionData) return;
    if (currentStepIndex > 0) {
        const prevIndex = currentStepIndex - 1;
        setCurrentStepIndex(prevIndex);
        setStepTimer(currentSessionData.steps[prevIndex].duration * 60);
        setIsTimerRunning(false);
    }
  };

  const handleCompleteSession = () => {
    if (activePatient) {
        completeSession(activePatient.id, sessionNotes);
        alert(`Séance terminée ! Notes enregistrées.\nDevoirs attribués : ${currentSessionData?.homework}`);
        onBack();
    }
  };

  // Determine which tool to show based on title/content keywords
  const getToolForStep = (step: StepData): ToolType => {
    if (step.title.includes('Balance') || step.content.includes('Balance')) return 'BALANCE';
    if (step.title.includes('Analyse') || step.content.includes('Analyse')) return 'SECCA';
    if (step.title.includes('Urge') || step.content.includes('Urge')) return 'URGE';
    return 'NONE';
  };

  const handleOpenTool = () => {
    if (!currentSessionData) return;
    const tool = getToolForStep(currentSessionData.steps[currentStepIndex]);
    if (tool !== 'NONE') setActiveTool(tool);
  };

  if (!activePatient || !currentSessionData) return <div className="p-10 text-white">Chargement...</div>;

  const currentStep: StepData = currentSessionData.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / currentSessionData.steps.length) * 100;
  const availableTool = getToolForStep(currentStep);

  return (
    <div className="flex flex-col min-h-screen bg-background-dark pb-safe">
        {activeTool !== 'NONE' && <ToolModal type={activeTool} onClose={() => setActiveTool('NONE')} />}

        {/* Header */}
        <div className="sticky top-0 z-20 bg-background-dark/90 backdrop-blur-sm p-4 border-b border-border-dark flex items-center gap-4">
            <button onClick={onBack} className="text-white">
                <Icon name="arrow_back" />
            </button>
            <div className="flex-1 text-center">
                <h1 className="text-lg font-bold text-white">S{activePatient.currentSession} : {currentSessionData.title}</h1>
                <p className="text-xs text-text-secondary-dark">{activePatient.firstName} {activePatient.lastName} • {activePatient.program}</p>
            </div>
            <div className="w-6"></div>
        </div>

        <main className="flex-1 p-4 space-y-6">
            {/* Progress & Timer */}
            <div className="space-y-2">
                <div className="flex justify-between items-baseline text-white">
                    <span className="font-medium truncate max-w-[70%]">Étape {currentStepIndex + 1}/{currentSessionData.steps.length} : {currentStep.title}</span>
                    <span className={`text-lg font-mono font-bold ${stepTimer < 60 ? 'text-alert-critical' : 'text-primary'}`}>
                        {formatTime(stepTimer)}
                    </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-500 ease-out" 
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-4">
                <button 
                    onClick={handlePrevStep}
                    disabled={currentStepIndex === 0}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl bg-surface-dark border border-border-dark text-white transition ${currentStepIndex === 0 ? 'opacity-30' : 'hover:bg-white/5 active:scale-95'}`}
                >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1 text-primary">
                        <Icon name="fast_rewind" />
                    </div>
                    <span className="text-xs font-medium">Précédent</span>
                </button>

                <button 
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl transition active:scale-95 shadow-lg ${isTimerRunning ? 'bg-alert-warning text-black shadow-alert-warning/20' : 'bg-primary text-black shadow-primary/20'}`}
                >
                    <div className="w-10 h-10 flex items-center justify-center mb-1">
                        <Icon name={isTimerRunning ? "pause" : "play_arrow"} filled />
                    </div>
                    <span className="text-xs font-bold">{isTimerRunning ? 'Pause' : 'Démarrer'}</span>
                </button>

                <button 
                    onClick={handleNextStep}
                    disabled={currentStepIndex === currentSessionData.steps.length - 1}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl bg-surface-dark border border-border-dark text-white transition ${currentStepIndex === currentSessionData.steps.length - 1 ? 'opacity-30' : 'hover:bg-white/5 active:scale-95'}`}
                >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-1 text-primary">
                        <Icon name="fast_forward" />
                    </div>
                    <span className="text-xs font-medium">Suivant</span>
                </button>
            </div>

            {/* Active Content Card */}
            <div className="p-5 rounded-xl bg-surface-dark border border-border-dark shadow-md animate-fade-in">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider
                        ${currentStep.type === 'RITUAL' ? 'bg-purple-500/20 text-purple-400' :
                          currentStep.type === 'MI' ? 'bg-blue-500/20 text-blue-400' :
                          currentStep.type === 'TCC' ? 'bg-green-500/20 text-green-400' : 
                          'bg-gray-500/20 text-gray-400'}`}
                    >
                        {currentStep.type}
                    </div>
                    <h2 className="text-xl font-bold text-white leading-tight">{currentStep.title}</h2>
                </div>
                
                <div className="text-base text-white/90 leading-relaxed space-y-4">
                    <p>{currentStep.content}</p>
                    
                    {/* Contextual UI Elements based on Step Type */}
                    {currentStep.type === 'RITUAL' && currentStep.title.includes('Cohérence') && (
                        <div className="p-4 bg-black/20 rounded-lg flex items-center gap-4">
                            <Icon name="self_improvement" className="text-3xl text-primary" />
                            <p className="text-sm text-text-secondary-dark">Inviter le patient à s'installer confortablement. 5s inspire, 5s expire.</p>
                        </div>
                    )}

                    {currentStep.type === 'RITUAL' && currentStep.title.includes('Acupressure') && (
                        <div className="p-4 bg-black/20 rounded-lg border border-primary/20">
                            <div className="flex gap-2 mb-2">
                                {currentSessionData.acupressure.points.map(p => (
                                    <span key={p} className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded">{p}</span>
                                ))}
                            </div>
                            <p className="text-sm text-white font-medium italic">"{currentSessionData.acupressure.intention}"</p>
                            {currentSessionData.acupressure.warning && (
                                <p className="text-xs text-alert-warning mt-2 flex items-center gap-1">
                                    <Icon name="warning" className="text-sm" /> {currentSessionData.acupressure.warning}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Generic Tool Placeholder */}
                    {availableTool !== 'NONE' && (
                        <div className="mt-2">
                            <button 
                                onClick={handleOpenTool}
                                className="text-sm text-primary underline flex items-center gap-1 hover:text-white"
                            >
                                <Icon name="description" className="text-sm" /> Ouvrir la fiche : {availableTool === 'BALANCE' ? 'Balance' : availableTool === 'SECCA' ? 'Analyse SECCA' : 'Urge Surfing'}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-white">Notes de séance</label>
                <textarea 
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                    className="w-full h-32 bg-surface-dark border border-border-dark rounded-xl p-3 text-white placeholder:text-white/20 focus:ring-1 focus:ring-primary focus:border-primary outline-none resize-none"
                    placeholder="Observations, résistance, alliance..."
                ></textarea>
            </div>
            
            <div className="h-20"></div>
        </main>

        {/* Footer Action */}
        <div className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur border-t border-border-dark p-4">
            <button 
                className="w-full bg-primary hover:bg-primary-dark text-black font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/20"
                onClick={handleCompleteSession}
            >
                <Icon name="task_alt" />
                Terminer la séance & Devoirs
            </button>
        </div>
    </div>
  );
};
