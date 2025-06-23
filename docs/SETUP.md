# Configuración de la aplicación

Este proyecto incluye una API construida con Next.js ubicada en la carpeta `realstate-mvp`. Puedes usar Supabase o Firebase Data Connect (PostgreSQL) definiendo la variable `DB_PROVIDER`.

## Requisitos previos

- Node.js 18 o superior
- npm

## Instalación de dependencias

1. Abre una terminal dentro de `realstate-mvp` y ejecuta:

```bash
npm install
```

Esto descargará todas las dependencias necesarias para la API.

## Variables de entorno

Crea un archivo `.env` en `realstate-mvp` con la siguiente estructura:

```bash
DB_PROVIDER=supabase   # o "firebase"
SUPABASE_URL=
SUPABASE_ANON_KEY=
DATABASE_URL=
ADMIN_USER=admin
ADMIN_PASS=secret
```

Completa las variables de acuerdo al proveedor que elijas.

## Comandos útiles

- Iniciar el entorno de desarrollo:

```bash
npm run dev
```

- Crear una versión optimizada para producción:

```bash
npm run build
npm run start
```

Esto compilará la aplicación y la iniciará en modo producción.
