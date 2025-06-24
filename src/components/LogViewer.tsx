import React, { useState, useEffect, useRef } from 'react';
import { FileText, Database, AlertTriangle, Play, Square, Trash2, Download } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  source: string;
  message: string;
}

interface LogViewerProps {
  onExecuteScript: (scriptType: string) => void;
}

const LogViewer: React.FC<LogViewerProps> = ({ onExecuteScript: _ }) => {
  const [activeLogType, setActiveLogType] = useState<'services' | 'database' | 'errors'>('services');
  const [isStreaming, setIsStreaming] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simulación de logs en tiempo real
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isStreaming) {
      interval = setInterval(() => {
        const newLog: LogEntry = {
          id: Date.now().toString(),
          timestamp: new Date().toLocaleTimeString(),
          level: ['info', 'warn', 'error', 'debug'][Math.floor(Math.random() * 4)] as any,
          source: activeLogType === 'services' ? 'api-gateway' : activeLogType === 'database' ? 'postgres' : 'system',
          message: generateRandomLogMessage(activeLogType)
        };
        
        setLogs(prev => [...prev.slice(-99), newLog]); // Mantener solo los últimos 100 logs
      }, 1000 + Math.random() * 2000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStreaming, activeLogType]);

  // Auto-scroll al final cuando llegan nuevos logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const generateRandomLogMessage = (type: string): string => {
    const messages = {
      services: [
        'Request processed successfully',
        'User authentication completed',
        'Database connection established',
        'Cache updated',
        'API endpoint called: /api/users',
        'Service health check passed',
        'Memory usage: 45.2MB'
      ],
      database: [
        'Query executed in 23ms',
        'Connection pool size: 10/20',
        'Backup completed successfully',
        'Index rebuild started',
        'Transaction committed',
        'Deadlock detected and resolved',
        'Table maintenance completed'
      ],
      errors: [
        'Connection timeout to external service',
        'Invalid request format received',
        'Authentication failed for user',
        'Database constraint violation',
        'Memory limit exceeded',
        'File not found: config.json',
        'Network error: Connection refused'
      ]
    };
    
    const typeMessages = messages[type as keyof typeof messages] || messages.services;
    return typeMessages[Math.floor(Math.random() * typeMessages.length)];
  };

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === '' || 
      log.message.toLowerCase().includes(filter.toLowerCase()) ||
      log.source.toLowerCase().includes(filter.toLowerCase());
    
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    
    return matchesFilter && matchesLevel;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error':
        return 'text-red-600 bg-red-50';
      case 'warn':
        return 'text-yellow-600 bg-yellow-50';
      case 'info':
        return 'text-blue-600 bg-blue-50';
      case 'debug':
        return 'text-gray-600 bg-gray-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  const handleExportLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] [${log.level.toUpperCase()}] [${log.source}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${activeLogType}-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Logs en Tiempo Real</h2>
      
      {/* Selector de tipo de logs */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={() => setActiveLogType('services')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeLogType === 'services'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <FileText className="mr-2" size={16} />
            Logs de Servicios
          </button>
          
          <button
            onClick={() => setActiveLogType('database')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeLogType === 'database'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Database className="mr-2" size={16} />
            Logs de Base de Datos
          </button>
          
          <button
            onClick={() => setActiveLogType('errors')}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              activeLogType === 'errors'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <AlertTriangle className="mr-2" size={16} />
            Logs de Errores
          </button>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
              isStreaming
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isStreaming ? (
              <>
                <Square className="mr-2" size={16} />
                Detener Stream
              </>
            ) : (
              <>
                <Play className="mr-2" size={16} />
                Iniciar Stream
              </>
            )}
          </button>
          
          <button
            onClick={handleClearLogs}
            className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <Trash2 className="mr-2" size={16} />
            Limpiar
          </button>
          
          <button
            onClick={handleExportLogs}
            className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            <Download className="mr-2" size={16} />
            Exportar
          </button>
        </div>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Filtrar logs..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los niveles</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
          
          <div className="text-sm text-gray-600">
            {filteredLogs.length} de {logs.length} logs
          </div>
        </div>
      </div>

      {/* Visor de logs */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold">
            Logs de {activeLogType === 'services' ? 'Servicios' : activeLogType === 'database' ? 'Base de Datos' : 'Errores'}
            {isStreaming && (
              <span className="ml-2 inline-flex items-center">
                <span className="animate-pulse w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-sm text-red-600">En vivo</span>
              </span>
            )}
          </h3>
        </div>
        
        <div
          ref={logContainerRef}
          className="h-96 overflow-y-auto p-4 bg-gray-900 text-green-400 font-mono text-sm"
        >
          {filteredLogs.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No hay logs para mostrar
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="mb-1 hover:bg-gray-800 px-2 py-1 rounded">
                <span className="text-gray-400">[{log.timestamp}]</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${getLevelColor(log.level)}`}>
                  {log.level.toUpperCase()}
                </span>
                <span className="text-blue-400 ml-2">[{log.source}]</span>
                <span className="ml-2">{log.message}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Estadísticas */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {logs.filter(l => l.level === 'error').length}
          </div>
          <div className="text-sm text-gray-600">Errores</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {logs.filter(l => l.level === 'warn').length}
          </div>
          <div className="text-sm text-gray-600">Warnings</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {logs.filter(l => l.level === 'info').length}
          </div>
          <div className="text-sm text-gray-600">Info</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {logs.filter(l => l.level === 'debug').length}
          </div>
          <div className="text-sm text-gray-600">Debug</div>
        </div>
      </div>
    </div>
  );
};

export default LogViewer;

