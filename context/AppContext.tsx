
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Patient, ProgramType, UserRole, JournalEntry, EmergencyPlanData } from '../types';

// Helper to generate mock history for charts
const generateMockHistory = (): JournalEntry[] => {
  const history: JournalEntry[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString();
    
    // Random Craving (declining trend)
    history.push({
      id: `c-${i}`,
      date: dateStr,
      type: 'CRAVING',
      intensity: Math.max(1, Math.floor(8 - (i * 0.1) + (Math.random() * 2 - 1))),
      note: 'Auto-generated'
    });

    // Random Motivation (increasing trend)
    history.push({
      id: `m-${i}`,
      date: dateStr,
      type: 'EMOTION', // Using emotion as proxy for motivation tracking in this mock
      intensity: Math.min(10, Math.floor(4 + (i * 0.15) + (Math.random() * 2 - 1))),
      note: 'Motivation check'
    });
  }
  return history;
};

// Initial Mock Data with a Martinique touch
const INITIAL_PATIENTS: Patient[] = [
  { 
    id: '1', 
    firstName: 'Jean', 
    lastName: 'Michel', 
    email: 'jean.m@example.mq',
    program: ProgramType.TABAC, 
    currentSession: 3, 
    abstinenceDays: 12, 
    startDate: '2023-10-15',
    lastCheckIn: '2023-10-27', 
    alerts: [{ id: 'a1', type: 'CRITICAL', title: 'Risque de rechute', description: 'Message urgent reçu', date: 'Auj.' }], 
    avatarUrl: '',
    history: generateMockHistory(),
    notes: [
        { sessionId: 1, date: '2023-10-15T10:00:00Z', content: 'Bonne alliance. Ambivalence forte mais motivé par la santé.' },
        { sessionId: 2, date: '2023-10-22T10:00:00Z', content: 'Balance décisionnelle faite. A choisi une date d\'arrêt pour la semaine prochaine.' }
    ],
    emergencyPlan: { contactName: 'Dr. Martin', contactNumber: '15', safePlace: 'Plage du Diamant', distraction: 'Respiration 5-5' },
    allowEntourage: true
  },
  { 
    id: '2', 
    firstName: 'Marie-Laure', 
    lastName: 'Césaire', 
    email: 'marie.cesaire@example.mq',
    program: ProgramType.ALCOOL, 
    currentSession: 8, 
    abstinenceDays: 45, 
    startDate: '2023-09-01',
    lastCheckIn: '2023-10-26', 
    alerts: [{ id: 'a2', type: 'WARNING', title: 'Demande RDV', description: 'Avancer séance', date: 'Hier' }], 
    avatarUrl: '',
    history: [],
    notes: [],
    emergencyPlan: { contactName: '', contactNumber: '', safePlace: '', distraction: '' },
    allowEntourage: false
  },
  { 
    id: '3', 
    firstName: 'Lucas', 
    lastName: 'Bernier', 
    program: ProgramType.CANNABIS, 
    currentSession: 1, 
    abstinenceDays: 2, 
    startDate: '2023-10-26',
    lastCheckIn: '2023-10-28', 
    alerts: [], 
    avatarUrl: '',
    history: [],
    notes: [],
    emergencyPlan: { contactName: '', contactNumber: '', safePlace: '', distraction: '' },
    allowEntourage: true
  },
];

interface AppContextType {
  patients: Patient[];
  activePatient: Patient | null;
  userRole: UserRole | null;
  addPatient: (patientData: Partial<Patient>) => void;
  setActivePatient: (patient: Patient | null) => void;
  login: (role: UserRole) => void;
  logout: () => void;
  completeSession: (patientId: string, noteContent?: string) => void;
  addJournalEntry: (patientId: string, entry: Omit<JournalEntry, 'id' | 'date'>) => void;
  updateEmergencyPlan: (patientId: string, plan: EmergencyPlanData) => void;
  toggleEntourageAccess: (patientId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load from local storage or use initial
  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('ac_patients');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });

  const [activePatient, setActivePatient] = useState<Patient | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  // Persist patients on change
  useEffect(() => {
    localStorage.setItem('ac_patients', JSON.stringify(patients));
  }, [patients]);

  const addPatient = (patientData: Partial<Patient>) => {
    const newPatient: Patient = {
      id: Date.now().toString(),
      firstName: patientData.firstName || '',
      lastName: patientData.lastName || '',
      email: patientData.email || '',
      phone: patientData.phone || '',
      program: patientData.program || ProgramType.TABAC,
      currentSession: 1,
      abstinenceDays: 0,
      startDate: new Date().toISOString(),
      lastCheckIn: new Date().toISOString(),
      alerts: [],
      avatarUrl: '',
      history: [],
      notes: [],
      emergencyPlan: { contactName: '', contactNumber: '', safePlace: '', distraction: '' },
      allowEntourage: false
    };
    setPatients(prev => [newPatient, ...prev]);
  };

  const completeSession = (patientId: string, noteContent?: string) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const nextSession = Math.min(p.currentSession + 1, 12);
        
        const newNotes = noteContent ? [
            ...p.notes, 
            { sessionId: p.currentSession, date: new Date().toISOString(), content: noteContent }
        ] : p.notes;

        const updated = { 
            ...p, 
            currentSession: nextSession, 
            lastCheckIn: new Date().toISOString(),
            notes: newNotes
        };
        
        if (activePatient?.id === patientId) setActivePatient(updated);
        return updated;
      }
      return p;
    }));
  };

  const addJournalEntry = (patientId: string, entry: Omit<JournalEntry, 'id' | 'date'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        let updatedAbstinence = p.abstinenceDays;
        const newAlerts = [...p.alerts];

        // LOGIC 1: Consumption resets abstinence
        if (entry.type === 'CONSUMPTION') {
            updatedAbstinence = 0;
            // Generate Alert
            newAlerts.unshift({
                id: `alert-${Date.now()}`,
                type: 'CRITICAL',
                title: 'Consommation signalée',
                description: 'Le patient a déclaré une consommation.',
                date: 'À l\'instant'
            });
        } 
        
        // LOGIC 2: High Craving Warning
        if (entry.type === 'CRAVING' && entry.intensity >= 8) {
             newAlerts.unshift({
                id: `alert-${Date.now()}`,
                type: 'WARNING',
                title: 'Craving Intense',
                description: `Niveau ${entry.intensity}/10 signalé.`,
                date: 'À l\'instant'
            });
        }

        const updated = { 
            ...p, 
            history: [...p.history, newEntry],
            abstinenceDays: updatedAbstinence,
            alerts: newAlerts
        };
        
        // Determine if we need to update active patient
        if (activePatient?.id === patientId) setActivePatient(updated);
        return updated;
      }
      return p;
    }));
  };

  const updateEmergencyPlan = (patientId: string, plan: EmergencyPlanData) => {
    setPatients(prev => prev.map(p => {
        if (p.id === patientId) {
            const updated = { ...p, emergencyPlan: plan };
            if (activePatient?.id === patientId) setActivePatient(updated);
            return updated;
        }
        return p;
    }));
  };

  const toggleEntourageAccess = (patientId: string) => {
    setPatients(prev => prev.map(p => {
        if (p.id === patientId) {
            const updated = { ...p, allowEntourage: !p.allowEntourage };
            if (activePatient?.id === patientId) setActivePatient(updated);
            return updated;
        }
        return p;
    }));
  };

  const login = (role: UserRole) => setUserRole(role);
  const logout = () => {
    setUserRole(null);
    setActivePatient(null);
  };

  return (
    <AppContext.Provider value={{ 
      patients, 
      activePatient, 
      userRole, 
      addPatient, 
      setActivePatient, 
      login, 
      logout,
      completeSession,
      addJournalEntry,
      updateEmergencyPlan,
      toggleEntourageAccess
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
