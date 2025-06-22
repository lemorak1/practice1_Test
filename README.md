# React Vite Template

This project is a minimal setup using [Vite](https://vitejs.dev/) with React and TypeScript.
It includes a small example component (`ModelDesigner`) that renders a rotating 3D box using
`@react-three/fiber` and `@react-three/drei`.

## Requirements

- Node.js 18 or later
- [pnpm](https://pnpm.io/) package manager

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

To create a production build:

```bash
pnpm build
```

Preview the build locally:

```bash
pnpm preview
```

The application entry point is `src/main.tsx`. React components live under `src/`. The
`ModelDesigner` component demonstrates basic usage of Three.js within React.

## Additional Notes

This repository previously contained a separate Create React App project in the
`practice1_test` folder. That directory has been removed to keep the codebase focused on
Vite. If you need a CRA example, check the commit history.

## License

This project is licensed under the [MIT License](./LICENSE).
