import React from 'react';
import { 
  Database, 
  Settings, 
  FileText, 
  Trash2, 
  Play, 
  Square,
  Activity
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    {
      id: 'database',
      label: 'Base de Datos',
      icon: Database,
      submenu: [
        { id: 'db-install', label: 'Instalar BD', icon: Play },
        { id: 'db-uninstall', label: 'Desinstalar BD', icon: Trash2 },
        { id: 'db-clean', label: 'Limpiar BD', icon: Square }
      ]
    },
    {
      id: 'services',
      label: 'Servicios PM2',
      icon: Settings,
      submenu: [
        { id: 'pm2-install', label: 'Instalar Servicios', icon: Play },
        { id: 'pm2-status', label: 'Estado Servicios', icon: Activity }
      ]
    },
    {
      id: 'logs',
      label: 'Logs en Tiempo Real',
      icon: FileText,
      submenu: [
        { id: 'logs-services', label: 'Logs de Servicios', icon: FileText },
        { id: 'logs-database', label: 'Logs de BD', icon: Database },
        { id: 'logs-errors', label: 'Logs de Errores', icon: Trash2 }
      ]
    }
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-bold text-center mb-8">Menu Rápido</h1>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 cursor-pointer">
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </div>
              
              {item.submenu && (
                <div className="ml-6 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onSectionChange(subItem.id)}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg text-sm transition-colors ${
                        activeSection === subItem.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      <subItem.icon size={16} />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

