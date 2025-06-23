# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

For detalles sobre conectar la aplicación a Firebase y cómo almacenar las fotos de las propiedades, consulta [docs/firebase.md](docs/firebase.md).

Este proyecto incluye traducciones con `next-i18next`. Consulta el archivo
`next-i18next.config.js` y las carpetas `public/locales` para modificar los
textos en inglés y español.


## Development

This project requires **Node.js 20**. Using other versions may cause `turbopack` to fail with errors like `turbo.createProject is not supported by the wasm bindings`.

Use [nvm](https://github.com/nvm-sh/nvm) to ensure the correct version is active:

```bash
nvm install
nvm use
```

Then run:
1. Copy `.env.example` to `.env` and fill in your Firebase credentials.
2. Install dependencies with `npm install`.
3. Start the development server with `npm run dev`.

