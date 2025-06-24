import React, { useState } from 'react';
import { Play, Square, RotateCcw, Activity, CheckCircle, XCircle, Clock } from 'lucide-react';

interface PM2ServicesProps {
  onExecuteScript: (scriptType: string) => void;
}

interface Service {
  id: string;
  name: string;
  status: 'online' | 'stopped' | 'error';
  cpu: string;
  memory: string;
  uptime: string;
  restarts: number;
}

const PM2Services: React.FC<PM2ServicesProps> = ({ onExecuteScript }) => {
  const [services, setServices] = useState<Service[]>([
    {
      id: '1',
      name: 'api-gateway',
      status: 'online',
      cpu: '2.1%',
      memory: '45.2MB',
      uptime: '2h 15m',
      restarts: 0
    },
    {
      id: '2',
      name: 'auth-service',
      status: 'online',
      cpu: '1.8%',
      memory: '32.1MB',
      uptime: '2h 15m',
      restarts: 1
    },
    {
      id: '3',
      name: 'notification-service',
      status: 'stopped',
      cpu: '0%',
      memory: '0MB',
      uptime: '0m',
      restarts: 3
    },
    {
      id: '4',
      name: 'file-processor',
      status: 'error',
      cpu: '0%',
      memory: '0MB',
      uptime: '0m',
      restarts: 5
    }
  ]);

  const handleInstallServices = () => {
    onExecuteScript('pm2-install');
  };

  const handleServiceAction = (serviceId: string, action: 'start' | 'stop' | 'restart') => {
    setServices(prev => prev.map(service => {
      if (service.id === serviceId) {
        switch (action) {
          case 'start':
            return { ...service, status: 'online' as const };
          case 'stop':
            return { ...service, status: 'stopped' as const };
          case 'restart':
            return { ...service, restarts: service.restarts + 1, status: 'online' as const };
          default:
            return service;
        }
      }
      return service;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'stopped':
        return <Square className="text-gray-600" size={20} />;
      case 'error':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-yellow-600" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return 'text-green-600 bg-green-100';
      case 'stopped':
        return 'text-gray-600 bg-gray-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Servicios PM2</h2>
      
      {/* Acciones principales */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Acciones de Servicios</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleInstallServices}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center"
          >
            <Play className="mr-2" size={16} />
            Instalar Servicios
          </button>
          
          <button
            onClick={() => onExecuteScript('pm2-reload')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center"
          >
            <RotateCcw className="mr-2" size={16} />
            Recargar Configuración
          </button>
          
          <button
            onClick={() => onExecuteScript('pm2-stop-all')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors flex items-center"
          >
            <Square className="mr-2" size={16} />
            Detener Todos
          </button>
        </div>
      </div>

      {/* Lista de servicios */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <Activity className="mr-2" size={20} />
            Estado de Servicios
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Servicio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CPU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memoria
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uptime
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reinicios
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(service.status)}
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {service.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.cpu}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.memory}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.uptime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {service.restarts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {service.status !== 'online' && (
                        <button
                          onClick={() => handleServiceAction(service.id, 'start')}
                          className="text-green-600 hover:text-green-900"
                          title="Iniciar"
                        >
                          <Play size={16} />
                        </button>
                      )}
                      {service.status === 'online' && (
                        <button
                          onClick={() => handleServiceAction(service.id, 'stop')}
                          className="text-red-600 hover:text-red-900"
                          title="Detener"
                        >
                          <Square size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => handleServiceAction(service.id, 'restart')}
                        className="text-blue-600 hover:text-blue-900"
                        title="Reiniciar"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Resumen de servicios */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {services.filter(s => s.status === 'online').length}
          </div>
          <div className="text-sm text-gray-600">En línea</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {services.filter(s => s.status === 'stopped').length}
          </div>
          <div className="text-sm text-gray-600">Detenidos</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {services.filter(s => s.status === 'error').length}
          </div>
          <div className="text-sm text-gray-600">Con errores</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {services.reduce((acc, s) => acc + s.restarts, 0)}
          </div>
          <div className="text-sm text-gray-600">Total reinicios</div>
        </div>
      </div>
    </div>
  );
};

export default PM2Services;

