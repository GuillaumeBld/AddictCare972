
import React, { useState, useRef } from 'react';
import { UserRole } from '../types';
import { Icon } from './Icon';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const ROLES = [
  { 
    role: UserRole.THERAPIST, 
    label: 'Thérapeute', 
    sub: 'Accès pro', 
    icon: 'stethoscope',
    colorClass: 'text-primary'
  },
  { 
    role: UserRole.PATIENT, 
    label: 'Espace Patient', 
    sub: 'Suivi personnel', 
    icon: 'person',
    colorClass: 'text-[#FFBE0B]'
  },
  { 
    role: UserRole.FAMILY, 
    label: 'Proche', 
    sub: 'Soutien', 
    icon: 'diversity_3',
    colorClass: 'text-[#4DB6AC]'
  },
];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Patient in center
  const touchStartY = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);

  const getIndex = (i: number) => {
    const len = ROLES.length;
    return ((i % len) + len) % len;
  };

  const handlePrev = () => setActiveIndex(prev => getIndex(prev - 1));
  const handleNext = () => setActiveIndex(prev => getIndex(prev + 1));
  
  const activeRole = ROLES[getIndex(activeIndex)];
  const prevRole = ROLES[getIndex(activeIndex - 1)];
  const nextRole = ROLES[getIndex(activeIndex + 1)];

  // Touch handlers for vertical swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    // Threshold for swipe (e.g., 50px)
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Up -> Next Item (scrolling down the list)
        handleNext();
      } else {
        // Swipe Down -> Previous Item (scrolling up the list)
        handlePrev();
      }
    }
    touchStartY.current = null;
  };

  // Mouse Wheel Handler
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    // Throttle scroll events to prevent rapid switching (600ms cooldown)
    if (now - lastScrollTime.current < 600) return; 

    // Add a threshold for sensitivity to ignore small inertia movements
    if (Math.abs(e.deltaY) < 20) return;

    if (e.deltaY > 0) {
        handleNext();
        lastScrollTime.current = now;
    } else {
        handlePrev();
        lastScrollTime.current = now;
    }
  };

  return (
    <div 
        className="flex flex-col h-screen justify-between p-6 bg-background-dark relative overflow-hidden font-sans touch-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
    >
       {/* Background Image with Overlay (Martinique Vibe) */}
       <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1596324635908-410764b85770?q=80&w=2574&auto=format&fit=crop")',
          filter: 'blur(8px)'
        }}
      ></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-background-dark/90 via-background-dark/95 to-background-dark"></div>

      {/* Header */}
      <header className="text-center pt-8 relative z-10 select-none">
        <div className="relative inline-block mb-6">
          <div className="absolute -inset-2.5 bg-primary/20 rounded-3xl blur-md"></div>
          <div className="relative w-24 h-24 bg-white/5 border border-primary/30 rounded-3xl flex items-center justify-center backdrop-blur-sm shadow-2xl">
            <Icon name="local_hospital" className="text-primary text-5xl" filled />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          AddictCare <span className="text-primary">972</span>
        </h1>
        <p className="text-text-secondary-dark mt-2 font-medium">
          Plateforme de thérapie structurée
        </p>
      </header>

      {/* Carousel Main */}
      <main className="flex-grow flex items-center justify-center -my-6 relative z-10 w-full max-w-lg mx-auto overflow-hidden h-[400px]">
        <div className="relative w-full h-full flex items-center justify-center perspective-[1000px]">
          
          {/* Previous Card (Top) */}
          <div 
            onClick={handlePrev}
            className="absolute w-3/4 cursor-pointer transition-all duration-500 ease-in-out select-none"
            style={{
                transform: 'translateY(-140px) scale(0.85)',
                opacity: 0.4,
                zIndex: 10
            }}
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center text-center shadow-lg backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                <Icon name={prevRole.icon} className={`text-xl ${prevRole.colorClass}`} />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-white">{prevRole.label}</h2>
                <p className="text-xs text-text-secondary-dark">{prevRole.sub}</p>
              </div>
            </div>
          </div>

          {/* Active Card (Center) */}
          <div 
            className="absolute w-full transition-all duration-500 ease-in-out z-20"
            style={{
                transform: 'translateY(0) scale(1)',
                opacity: 1
            }}
          >
            <button 
                onClick={() => onLogin(activeRole.role)}
                className="block w-full p-6 bg-surface-dark/80 backdrop-blur-md border border-primary/30 rounded-3xl shadow-[0_0_30px_rgba(34,211,238,0.15)] group hover:border-primary/60 transition-all text-left"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon name={activeRole.icon} className={`text-3xl ${activeRole.colorClass} group-hover:scale-110 transition-transform`} filled />
                </div>
                <div className="text-left flex-1">
                  <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{activeRole.label}</h2>
                  <p className="text-text-secondary-dark group-hover:text-white transition-colors">{activeRole.sub}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-black group-hover:border-primary transition-all">
                    <Icon name="arrow_forward" />
                </div>
              </div>
            </button>
          </div>

          {/* Next Card (Bottom) */}
          <div 
            onClick={handleNext}
            className="absolute w-3/4 cursor-pointer transition-all duration-500 ease-in-out select-none"
            style={{
                transform: 'translateY(140px) scale(0.85)',
                opacity: 0.4,
                zIndex: 10
            }}
          >
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center text-center shadow-lg backdrop-blur-sm">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-3 flex-shrink-0">
                <Icon name={nextRole.icon} className={`text-xl ${nextRole.colorClass}`} />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-white">{nextRole.label}</h2>
                <p className="text-xs text-text-secondary-dark">{nextRole.sub}</p>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center pb-4 relative z-10 select-none">
        <p className="text-xs text-text-secondary-dark/60">
          En cas d'urgence, contactez le 15
        </p>
        <p className="text-xs text-text-secondary-dark/60 mt-1 flex items-center justify-center gap-1">
          <Icon name="favorite" className="text-[10px]" filled /> Conçu pour la Martinique
        </p>
      </footer>
    </div>
  );
};
