import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center space-x-4 mb-8">
            <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
              <img src={reactLogo} className="h-16 w-16 hover:opacity-80 transition-opacity animate-spin" alt="React logo" />
            </a>
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Menu Rápido
          </h1>
          
          <div className="text-center">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
            >
              Contador: {count}
            </button>
            
            <p className="mt-4 text-gray-600">
              Edita <code className="bg-gray-200 px-2 py-1 rounded text-sm">src/App.tsx</code> y guarda para probar HMR
            </p>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-6">
            Aplicación React + Electron con TypeScript y TailwindCSS
          </p>
        </div>
      </div>
    </div>
  )
}

export default App

