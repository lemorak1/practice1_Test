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
# Escoge el proveedor de base de datos ("supabase" o "firebase")
DB_PROVIDER=supabase
SUPABASE_URL=
SUPABASE_ANON_KEY=
DATABASE_URL=
ADMIN_USER=admin
ADMIN_PASS=secret
```

Completa las variables de acuerdo al proveedor que elijas.

### Supabase

1. Crea un proyecto en [Supabase](https://supabase.com) y abre el apartado **SQL editor**.
2. Ejecuta el archivo [`docs/supabase_schema.sql`](supabase_schema.sql) para crear las tablas necesarias.
3. En **Project Settings → API** copia la **URL** y **anon key** y colócalas en `SUPABASE_URL` y `SUPABASE_ANON_KEY` respectivamente.
4. Asegúrate de mantener vacía la variable `DATABASE_URL`.

### Firebase Data Connect

Si prefieres usar Firebase Data Connect (PostgreSQL), establece `DB_PROVIDER=firebase` y coloca la cadena de conexión de tu instancia en `DATABASE_URL`. Las otras variables de Supabase pueden quedar vacías.

## Comandos útiles

- Iniciar el entorno de desarrollo:

```bash
npm run dev
```

Para un recarga más rápida puedes usar el servidor experimental basado en Turbopack:
```bash
npm run dev:turbo
```

- Crear una versión optimizada para producción:

```bash
npm run build
npm run start
```

Esto compilará la aplicación y la iniciará en modo producción.
