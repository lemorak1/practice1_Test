# Firebase Connection

Esta aplicaci\u00f3n usa [Firebase](https://firebase.google.com/) para persistir las propiedades y almacenar las fotos de cada inmueble.

## Configuraci\u00f3n

1. Crea un proyecto en Firebase y habilita Firestore y Storage.
2. Obt\u00e9n las credenciales Web de tu proyecto y copia los valores en un archivo `.env` en la ra\u00edz del proyecto:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

3. Ejecuta el script `npm run test:firebase` para probar la conexi\u00f3n. Si la configuraci\u00f3n es correcta, deber\u00edas ver en consola el n\u00famero de propiedades registradas en la colecci\u00f3n `properties`.

## Almacenamiento de datos y fotos

- **Firestore**: cada documento en la colecci\u00f3n `properties` representa una casa y contiene datos como el t\u00edtulo, descripci\u00f3n, precio, ubicaci\u00f3n y amenidades.
- **Firebase Storage**: las im\u00e1genes de las propiedades se guardan en el bucket configurado en `storageBucket`. Cada documento de Firestore guarda la URL p\u00fablica de la foto en el campo `imageUrl`.

Con esta configuraci\u00f3n podr\u00e1s realizar operaciones de crear, leer, actualizar y eliminar propiedades y sus fotos.
