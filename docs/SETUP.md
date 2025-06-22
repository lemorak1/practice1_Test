# Configuración de la aplicación

Este proyecto incluye una API construida con Next.js ubicada en la carpeta `realstate-mvp`. Utiliza Prisma y SQLite por defecto.

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

Crea un archivo `.env` en `realstate-mvp` definiendo la conexión a la base de datos y las credenciales de acceso al panel de administración:

```bash
DATABASE_URL="file:./dev.db"
ADMIN_USER=admin
ADMIN_PASS=secret
```

Puedes modificar los valores según tus necesidades. Si usas otro motor de base de datos, ajusta `DATABASE_URL` en consecuencia.

## Inicializar Prisma

Ejecuta las migraciones y genera el cliente Prisma con los siguientes comandos:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

El primer comando aplica las migraciones creando la base de datos y el segundo genera el cliente en `node_modules`.

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
