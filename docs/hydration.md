# Errores de hidratación

Si al desplegar la aplicación ves el mensaje:

```
Hydration failed because the server rendered HTML didn't match the client
```

verifica lo siguiente:

- No uses `Date.now()`, `Math.random()` ni datos que cambien entre renders sin enviar también su valor desde el servidor.
- Accede a `window` o `localStorage` solo dentro de `useEffect` para evitar diferencias entre servidor y cliente.
- Mantén estáticos los enlaces a fuentes externas en el `<head>` del `RootLayout`.
- Para las fuentes de Google considera usar `next/font/google`; así evitas cargas externas y posibles diferencias entre server y client.
- Comprueba que una extensión del navegador no esté modificando el HTML antes de que cargue React.
