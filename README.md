# Real Estate MVP

Este repositorio contiene un ejemplo básico de aplicación para administrar listados de propiedades inmobiliarias. Incluye un pequeño front‑end React/Vite y una API desarrollada con Next.js y Prisma.

## Requisitos

- Node.js 18 o superior
- npm

## Pasos rápidos para iniciar

1. Ve a la carpeta `realstate-mvp`:
   ```bash
   cd realstate-mvp
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura el archivo `.env` tal como se describe en [docs/SETUP.md](docs/SETUP.md).
4. Ejecuta las migraciones de Prisma y genera el cliente:
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```
5. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

Para probar la interfaz creada con Vite puedes abrir `index.html` en un servidor estático o utilizar `npx vite` desde la raíz del proyecto.
