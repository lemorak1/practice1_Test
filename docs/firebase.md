# Firebase Connection

Esta aplicación usa [Firebase](https://firebase.google.com/) para persistir las propiedades y almacenar las fotos de cada inmueble.

## Configuración

1. Crea un proyecto en Firebase y habilita Firestore y Storage.
2. Copia las credenciales Web en un archivo `.env` en la raíz del proyecto. Un ejemplo se incluye en `.env.example`:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyC3UeUz0MJB1uS-nPZaTV4qfkww_PpxQMI"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="realstate-7417f.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="realstate-7417f"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="realstate-7417f.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="490617761948"
NEXT_PUBLIC_FIREBASE_APP_ID="1:490617761948:web:a1235c3042d041f84a7d59"
```

Ten en cuenta que el valor de `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` debe ser el
**ID del bucket** (`realstate-7417f.appspot.com`). No uses la URL
`realstate-7417f.firebasestorage.app`, ya que eso es solo un dominio de acceso y
no funcionará en la configuración.

3. Ejecuta `npm run test:firebase` para probar la conexión. Si la configuración es correcta, verás en consola cuántas propiedades existen en la colección `properties`.

## Almacenamiento de datos y fotos

- **Firestore**: cada documento en la colección `properties` representa una casa con sus datos principales.
- **Firebase Storage**: las imágenes de las propiedades se guardan en el bucket configurado y cada documento de Firestore almacena la URL pública de la foto en el campo `imageUrl`.

## CORS para Firebase Storage

Si al subir una imagen ves un error de "CORS policy" en la consola del navegador, debes configurar las reglas CORS del bucket. Con `gcloud` o `gsutil` puedes aplicarlas usando el archivo `docs/storage-cors.json` incluido en este repositorio:

```bash
gsutil cors set docs/storage-cors.json gs://realstate-7417f.appspot.com
```

Actualiza la URL del bucket si tu proyecto usa otro nombre. Tras aplicar la política, las peticiones de la aplicación podrán subir archivos sin bloqueos de CORS.

Si continúas viendo "Upload failed" al intentar agregar una imagen, revisa que
el valor de `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` sea correcto y que la política
de CORS esté aplicada en tu bucket.

