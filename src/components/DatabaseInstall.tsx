import React, { useState } from 'react';
import { Play, Square, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface DatabaseInstallProps {
  onExecuteScript: (scriptType: string) => void;
}

const DatabaseInstall: React.FC<DatabaseInstallProps> = ({ onExecuteScript }) => {
  const [isInstalling, setIsInstalling] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInstall = () => {
    setIsInstalling(true);
    setInstallStatus('idle');
    onExecuteScript('db-install');
    
    // Simulación de instalación
    setTimeout(() => {
      setIsInstalling(false);
      setInstallStatus('success');
    }, 3000);
  };

  const handleUninstall = () => {
    onExecuteScript('db-uninstall');
  };

  const handleClean = () => {
    onExecuteScript('db-clean');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Base de Datos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Instalar BD */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Play className="text-green-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Instalar Base de Datos</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Ejecuta los scripts de instalación de la base de datos (.bat)
          </p>
          
          <button
            onClick={handleInstall}
            disabled={isInstalling}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            {isInstalling ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Instalando...
              </>
            ) : (
              <>
                <Play className="mr-2" size={16} />
                Instalar BD
              </>
            )}
          </button>
          
          {installStatus === 'success' && (
            <div className="mt-3 flex items-center text-green-600">
              <CheckCircle size={16} className="mr-2" />
              <span className="text-sm">Instalación completada</span>
            </div>
          )}
          
          {installStatus === 'error' && (
            <div className="mt-3 flex items-center text-red-600">
              <AlertCircle size={16} className="mr-2" />
              <span className="text-sm">Error en la instalación</span>
            </div>
          )}
        </div>

        {/* Desinstalar BD */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Square className="text-red-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Desinstalar BD</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Desinstala completamente la base de datos del sistema
          </p>
          
          <button
            onClick={handleUninstall}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            <Square className="mr-2" size={16} />
            Desinstalar BD
          </button>
        </div>

        {/* Limpiar BD */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="text-yellow-600 mr-3" size={24} />
            <h3 className="text-lg font-semibold">Limpiar BD</h3>
          </div>
          
          <p className="text-gray-600 mb-4">
            Limpia los datos de la base de datos manteniendo la estructura
          </p>
          
          <button
            onClick={handleClean}
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center"
          >
            <AlertCircle className="mr-2" size={16} />
            Limpiar BD
          </button>
        </div>
      </div>

      {/* Estado de la BD */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Estado de la Base de Datos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Activa</div>
            <div className="text-sm text-gray-600">Estado</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">v2.1.5</div>
            <div className="text-sm text-gray-600">Versión</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">1.2GB</div>
            <div className="text-sm text-gray-600">Tamaño</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">15 min</div>
            <div className="text-sm text-gray-600">Último backup</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseInstall;

