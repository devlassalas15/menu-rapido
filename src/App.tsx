import { useState } from 'react';
import Sidebar from './components/Sidebar';
import DatabaseInstall from './components/DatabaseInstall';
import PM2Services from './components/PM2Services';
import LogViewer from './components/LogViewer';

function App() {
  const [activeSection, setActiveSection] = useState('db-install');

  const handleExecuteScript = (scriptType: string) => {
    console.log(`Ejecutando script: ${scriptType}`);
    // Aquí se implementará la lógica de Electron para ejecutar scripts
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'db-install':
      case 'db-uninstall':
      case 'db-clean':
        return <DatabaseInstall onExecuteScript={handleExecuteScript} />;
      
      case 'pm2-install':
      case 'pm2-status':
        return <PM2Services onExecuteScript={handleExecuteScript} />;
      
      case 'logs-services':
      case 'logs-database':
      case 'logs-errors':
        return <LogViewer onExecuteScript={handleExecuteScript} />;
      
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenido a Menu Rápido</h2>
            <p className="text-gray-600">
              Selecciona una opción del menú lateral para comenzar a gestionar tu aplicación.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

