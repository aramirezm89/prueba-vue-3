# Dashboard Financiero (Vue 3 + Quasar)

Dashboard financiero desarrollado con Vue 3, Quasar Framework y Pinia para el manejo de estado. Muestra información en tiempo real del IPSA y otros índices financieros, con gráficos interactivos y datos detallados de instrumentos.

## Requisitos Previos

- Node.js (v16 o superior)
- Yarn o npm
- Quasar CLI (`yarn global add @quasar/cli` o `npm install -g @quasar/cli`)

## Instalación
```bash
yarn
# or
npm install
```

## Desarrollo

### Iniciar la aplicación en modo desarrollo
```bash
quasar dev
```


### Ejecutar los tests
```bash
# Ejecutar tests una vez
yarn test
# o
npm run test

# Ejecutar tests en modo watch
yarn test:watch
# o
npm run test:watch

# Ver cobertura de tests
yarn test:coverage
# o
npm run test:coverage
```

### Ejecutar el linter
```bash
yarn lint
# or
npm run lint
```


### Format the files
```bash
yarn format
# or
npm run format
```


## Producción

### Construir la aplicación para producción
```bash
quasar build
```

## Estructura del Proyecto

```
├── public/          # Archivos estáticos
├── src/
│   ├── assets/      # Recursos (imágenes, etc)
│   ├── components/  # Componentes Vue
│   ├── layouts/     # Layouts de la aplicación
│   ├── pages/       # Páginas
│   ├── stores/      # Stores Pinia
│   └── boot/        # Archivos de inicialización
├── test/           # Tests unitarios
└── dist/           # Build de producción
```

## Tecnologías Principales

- Vue 3 (Composition API)
- Quasar Framework v2
- Pinia para manejo de estado
- Vitest + Vue Test Utils para testing
- ApexCharts para gráficos

## Configuración

- Ver [Configuración de quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js)
- Ver [Configuración de Vite](https://vitejs.dev/config/)

## Scripts Disponibles

- `yarn dev` / `npm run dev`: Inicia el servidor de desarrollo
- `yarn build` / `npm run build`: Construye la aplicación para producción
- `yarn test` / `npm run test`: Ejecuta los tests unitarios
- `yarn lint` / `npm run lint`: Ejecuta el linter
- `yarn format` / `npm run format`: Formatea el código

## Despliegue

Para servir la aplicación en producción:

```bash
# Instalar serve globalmente
yarn global add serve
# o
npm install -g serve

# Servir la aplicación
serve dist/spa
```

## Licencia

MIT
