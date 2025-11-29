
export enum UserRole {
  THERAPIST = 'THERAPIST',
  PATIENT = 'PATIENT',
  FAMILY = 'FAMILY'
}

export enum ProgramType {
  TABAC = 'Tabac',
  ALCOOL = 'Alcool',
  CANNABIS = 'Cannabis',
  CRACK = 'Crack',
  POLY = 'Polyconsommation'
}

export interface JournalEntry {
  id: string;
  date: string; // ISO String
  type: 'CONSUMPTION' | 'EMOTION' | 'CRAVING';
  intensity: number; // 0-10
  note?: string;
  context?: string;
}

export interface SessionNote {
  sessionId: number;
  date: string;
  content: string;
}

export interface EmergencyPlanData {
  contactName: string;
  contactNumber: string;
  safePlace: string;
  distraction: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  program: ProgramType;
  currentSession: number; // 1 to 12
  abstinenceDays: number;
  startDate: string;
  lastCheckIn: string;
  alerts: Alert[];
  avatarUrl?: string;
  history: JournalEntry[]; // For charts
  notes: SessionNote[]; // Clinical notes
  emergencyPlan: EmergencyPlanData; // Dynamic plan
  allowEntourage: boolean; // Privacy setting
}

export interface Alert {
  id: string;
  type: 'CRITICAL' | 'WARNING' | 'INFO';
  title: string;
  description: string;
  date: string;
}

export interface SessionStep {
  id: string;
  title: string;
  durationMinutes: number;
  type: 'MI' | 'TCC' | 'RELAX' | 'ADMIN';
  content: string;
}

export interface Session {
  id: number;
  title: string;
  week: number;
  steps: SessionStep[];
  completed: boolean;
}

export interface Protocol {
  type: ProgramType;
  title: string;
  description: string;
  weeks: {
    weekNumber: number;
    focus: string;
  }[];
}

export interface ChartDataPoint {
  day: string;
  value: number;
}
