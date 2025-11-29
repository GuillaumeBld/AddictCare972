
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole, Patient } from './types';
import { BottomNavTherapist, BottomNavPatient, BottomNavEntourage } from './components/Navigation';
import { Login } from './components/Login';
import { TherapistDashboard } from './components/therapist/TherapistDashboard';
import { PatientDashboard } from './components/patient/PatientDashboard';
import { EntourageDashboard } from './components/entourage/EntourageDashboard';
import { SupportTools } from './components/entourage/SupportTools';
import { SessionView } from './components/therapist/SessionView';
import { NewPatient } from './components/therapist/NewPatient';
import { ProgressView } from './components/therapist/ProgressView';
import { ProtocolLibrary } from './components/therapist/ProtocolLibrary';
import { ExportView } from './components/therapist/ExportView';
import { EmergencyPlan } from './components/patient/EmergencyPlan';
import { Exercises } from './components/patient/Exercises';

const AppContent: React.FC = () => {
  const { userRole, login, logout, patients, setActivePatient, activePatient } = useApp();
  const [currentView, setCurrentView] = useState<string>('dashboard');

  const handleLogin = (role: UserRole) => {
    login(role);
    if (role === UserRole.THERAPIST) setCurrentView('dashboard');
    else if (role === UserRole.PATIENT) setCurrentView('p-dashboard');
    else if (role === UserRole.FAMILY) setCurrentView('e-dashboard');
  };

  const handleLogout = () => {
    logout();
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: string, data?: any) => {
    if (data) setActivePatient(data);
    setCurrentView(view);
  };

  if (!userRole) {
    return <Login onLogin={handleLogin} />;
  }

  const renderTherapistContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <TherapistDashboard patients={patients} onNavigate={handleNavigate} />;
      case 'new-patient':
        return <NewPatient onBack={() => setCurrentView('dashboard')} />;
      case 'patient-details':
        return <ProgressView onBack={() => setCurrentView('dashboard')} onNavigate={handleNavigate} />;
      case 'patient-export':
        return <ExportView onBack={() => setCurrentView('patient-details')} />;
      case 'session-live':
        return <SessionView onBack={() => setCurrentView('patient-details')} />;
      case 'library':
        return <ProtocolLibrary />;
      case 'patients':
        return <TherapistDashboard patients={patients} onNavigate={handleNavigate} />;
      case 'settings':
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Paramètres</h2>
                    <p className="text-text-secondary-dark mb-8">Version 1.0.0 (Martinique Edition)</p>
                    <button onClick={handleLogout} className="bg-alert-critical text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-alert-critical/20">Déconnexion</button>
                </div>
            </div>
        );
      default:
        return <TherapistDashboard patients={patients} onNavigate={handleNavigate} />;
    }
  };

  const renderPatientContent = () => {
    switch (currentView) {
      case 'p-dashboard':
        return <PatientDashboard />;
      case 'p-exercises':
        return <Exercises />;
      case 'p-emergency':
        return <EmergencyPlan />;
      default:
        return <PatientDashboard />;
    }
  };

  const renderEntourageContent = () => {
    switch (currentView) {
        case 'e-dashboard':
            return <EntourageDashboard onNavigate={setCurrentView} />;
        case 'e-tools':
            return <SupportTools />;
        case 'settings':
            return (
                <div className="flex flex-col items-center justify-center h-screen bg-background-dark">
                    <div className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-white mb-4">Compte Proche</h2>
                        <button onClick={handleLogout} className="bg-alert-critical text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-alert-critical/20">Déconnexion</button>
                    </div>
                </div>
            );
        default:
            return <EntourageDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-text-primary-dark font-sans selection:bg-primary selection:text-black">
      
      {userRole === UserRole.THERAPIST && renderTherapistContent()}
      {userRole === UserRole.PATIENT && renderPatientContent()}
      {userRole === UserRole.FAMILY && renderEntourageContent()}

      {/* Bottom Navigation */}
      {userRole === UserRole.THERAPIST && !['session-live', 'new-patient', 'patient-details', 'patient-export'].includes(currentView) && (
        <BottomNavTherapist onViewChange={setCurrentView} active={currentView} />
      )}
       {userRole === UserRole.PATIENT && !['p-emergency'].includes(currentView) && (
        <BottomNavPatient onViewChange={setCurrentView} active={currentView} />
      )}
      {userRole === UserRole.FAMILY && (
        <BottomNavEntourage onViewChange={setCurrentView} active={currentView} />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
