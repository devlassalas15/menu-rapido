# Menu Rápido

Una aplicación de escritorio construida con React, Electron, TypeScript y TailwindCSS.

## Características

- ⚡ Vite para desarrollo rápido
- ⚛️ React 19 con TypeScript
- 🎨 TailwindCSS para estilos
- 📦 Electron para aplicación de escritorio
- 🔧 Configuración completa de desarrollo

## Requisitos

- Node.js 18.18.0 o superior
- npm 9.8.1 o superior

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/devlassalas15/menu-rapido.git
cd menu-rapido
```

2. Instala las dependencias:
```bash
npm install
```

## Scripts Disponibles

### Desarrollo Web
```bash
npm run dev          # Inicia el servidor de desarrollo de Vite
npm run build        # Construye la aplicación web para producción
npm run preview      # Vista previa de la construcción de producción
```

### Desarrollo Electron
```bash
npm run electron-dev    # Inicia la aplicación Electron en modo desarrollo
npm run build-electron  # Compila los archivos TypeScript de Electron
npm run electron-pack   # Empaqueta la aplicación Electron para distribución
```

### Otros
```bash
npm run lint         # Ejecuta ESLint para verificar el código
```

## Estructura del Proyecto

```
menu-rapido/
├── electron/           # Archivos principales de Electron
│   ├── main.ts        # Proceso principal de Electron
│   ├── preload.ts     # Script de precarga
│   └── util.ts        # Utilidades
├── src/               # Código fuente de React
│   ├── components/    # Componentes de React
│   ├── App.tsx        # Componente principal
│   └── main.tsx       # Punto de entrada
├── dist/              # Construcción de la aplicación web
├── dist-electron/     # Construcción de Electron
└── package.json       # Configuración del proyecto
```

## Tecnologías Utilizadas

- **React 19**: Biblioteca de interfaz de usuario
- **TypeScript**: Superset tipado de JavaScript
- **Vite**: Herramienta de construcción y desarrollo
- **Electron**: Framework para aplicaciones de escritorio
- **TailwindCSS**: Framework de CSS utilitario
- **ESLint**: Linter para JavaScript/TypeScript

## Desarrollo

1. Para desarrollo web únicamente:
```bash
npm run dev
```

2. Para desarrollo de la aplicación Electron:
```bash
npm run electron-dev
```

Esto iniciará tanto el servidor de desarrollo de Vite como la aplicación Electron.

## Construcción y Distribución

Para crear una versión distribuible de la aplicación:

```bash
npm run electron-pack
```

Esto creará los archivos de instalación en la carpeta `dist-electron`.

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu característica (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## Autor

- [@devlassalas15](https://github.com/devlassalas15)

