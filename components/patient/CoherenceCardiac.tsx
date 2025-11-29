
import React, { useState, useEffect } from 'react';
import { Icon } from '../Icon';

interface Props {
  onClose: () => void;
}

export const CoherenceCardiac: React.FC<Props> = ({ onClose }) => {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [phase, setPhase] = useState<'INHALE' | 'EXHALE'>('INHALE');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    let phaseInterval: ReturnType<typeof setInterval>;
    if (isActive) {
      phaseInterval = setInterval(() => {
        setPhase((prev) => (prev === 'INHALE' ? 'EXHALE' : 'INHALE'));
      }, 5000); // 5 seconds switch
    }
    return () => clearInterval(phaseInterval);
  }, [isActive]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-background-dark flex flex-col items-center justify-center p-6">
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 text-white/50 hover:text-white"
      >
        <Icon name="close" className="text-3xl" />
      </button>

      <h2 className="text-2xl font-bold text-white mb-8">Cohérence Cardiaque</h2>

      {/* Visualizer */}
      <div className="relative w-64 h-64 flex items-center justify-center mb-12">
        {/* Background rings */}
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        <div className="absolute inset-4 rounded-full border-4 border-white/5"></div>
        
        {/* Animated Circle */}
        <div 
          className={`w-32 h-32 rounded-full bg-gradient-to-tr from-primary to-primary-dark shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all duration-[5000ms] ease-in-out ${isActive && phase === 'INHALE' ? 'scale-[2.0]' : 'scale-100'}`}
        ></div>

        {/* Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-xl font-bold text-white uppercase tracking-widest transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            {phase === 'INHALE' ? 'Inspirez' : 'Expirez'}
          </span>
        </div>
      </div>

      {/* Timer */}
      <div className="text-4xl font-mono text-white mb-12 font-bold">
        {formatTime(timeLeft)}
      </div>

      {/* Controls */}
      {!isActive ? (
        <button 
          onClick={() => setIsActive(true)}
          className="w-full max-w-xs bg-primary text-black font-bold h-14 rounded-xl text-lg shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
        >
          {timeLeft === 300 ? 'Commencer' : 'Reprendre'}
        </button>
      ) : (
        <button 
          onClick={() => setIsActive(false)}
          className="w-full max-w-xs bg-surface-dark border border-white/10 text-white font-bold h-14 rounded-xl text-lg"
        >
          Pause
        </button>
      )}

      <p className="mt-8 text-sm text-text-secondary-dark text-center max-w-xs">
        Inspirez profondément par le nez pendant 5 secondes, puis expirez doucement par la bouche pendant 5 secondes.
      </p>
    </div>
  );
};
