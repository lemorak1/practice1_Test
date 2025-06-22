# Configuración de Prisma

1. Instala las dependencias en la carpeta `realstate-mvp`:

```bash
npm install
```

2. Crea el archivo `.env` dentro de `realstate-mvp` con la variable `DATABASE_URL` apuntando a tu base de datos. Por ejemplo para SQLite:

```
DATABASE_URL="file:./dev.db"
```

3. Ejecuta las migraciones y genera el cliente Prisma:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

El primer comando aplica las migraciones y crea la base de datos. El segundo genera el cliente de Prisma en `node_modules`. Luego podrás usarlo en la aplicación.

## Variables de entorno para autenticación

Para acceder al panel de administración necesitas definir un usuario y contraseña. Agrega en el archivo `.env` las siguientes variables:

```
ADMIN_USER=admin
ADMIN_PASS=secret
```

Puedes cambiar los valores según prefieras.
