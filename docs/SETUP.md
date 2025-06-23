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

Las fotos se almacenarán en Firebase Storage, por lo que necesitarás una cuenta
de servicio de Firebase y el nombre de un bucket.

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
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=""
FIREBASE_STORAGE_BUCKET=
```

Completa las variables de acuerdo al proveedor que elijas.

El valor de `FIREBASE_PRIVATE_KEY` debe ir entre comillas y con los saltos de
línea reemplazados por `\n`.

### Supabase

1. Crea un proyecto en [Supabase](https://supabase.com) y abre el apartado **SQL editor**.
2. Ejecuta el archivo [`docs/supabase_schema.sql`](supabase_schema.sql) para crear las tablas necesarias.
3. En **Project Settings → API** copia la **URL** y **anon key** y colócalas en `SUPABASE_URL` y `SUPABASE_ANON_KEY` respectivamente.
4. (Opcional) Si agregas la cadena de conexión de Postgres en `DATABASE_URL`, la
   aplicación intentará crear las tablas automáticamente al iniciarse. De lo
   contrario, ejecuta manualmente el script `supabase_schema.sql`.

### Firebase Data Connect

Si prefieres usar Firebase Data Connect (PostgreSQL), establece
`DB_PROVIDER=firebase` y coloca la cadena de conexión de tu instancia en
`DATABASE_URL`. Las variables de Supabase pueden quedar vacías. Además,
proporciona las credenciales del servicio de Firebase en `FIREBASE_PROJECT_ID`,
`FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` y define `FIREBASE_STORAGE_BUCKET`
para que las fotos se almacenen en Firebase Storage.


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
