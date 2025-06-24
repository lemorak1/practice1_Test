# Firebase Connection

Esta aplicación usa [Firebase](https://firebase.google.com/) para persistir las propiedades y almacenar las fotos de cada inmueble.

## Configuración

1. Crea un proyecto en Firebase y habilita Firestore y Storage.
2. Copia las credenciales Web en un archivo `.env` en la raíz del proyecto. Un ejemplo se incluye en `.env.example`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyC3UeUz0MJhfikykuyuk_PpxQMI"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="realstate-7444444.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="realstate-7444444"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="realstate-7444444.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="4906444178"
NEXT_PUBLIC_FIREBASE_APP_ID="1:49044447761948:web:a12344444459"
```

3. Ejecuta `npm run test:firebase` para probar la conexión. Si la configuración es correcta, verás en consola cuántas propiedades existen en la colección `properties`.

4. Asegúrate de agregar el dominio de Firebase Storage en `next.config.js` o `next.config.ts` para poder mostrar imágenes externas en los componentes de Next.js:

```js
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'firebasestorage.googleapis.com',
      pathname: '/**',
    },
  ],
}
```

## Almacenamiento de datos y fotos

- **Firestore**: cada documento en la colección `properties` representa una casa con sus datos principales.
- **Firebase Storage**: las imágenes de las propiedades se guardan en el bucket configurado y cada documento de Firestore almacena la URL pública de la foto en el campo `imageUrl`.
