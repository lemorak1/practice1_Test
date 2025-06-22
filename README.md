# Real Estate MVP Example

This repository contains two sample projects:

1. `realstate-mvp/` – a **Next.js** application demonstrating a simple real estate listing CRUD with PostgreSQL (via Prisma) and Firebase for image uploads. It includes a minimal language switcher (English/Spanish).
2. The root Vite project used previously for small Three.js demos.

See [docs/SETUP.md](docs/SETUP.md) for a step-by-step guide to run the Next.js example.

## Getting Started with the Next.js app

```bash
cd realstate-mvp
npm install
# copy environment variables template
cp .env.example .env.local
```

Edit `.env.local` with your PostgreSQL connection string and Firebase
credentials. Then run the initial database migration:

```bash
npx prisma migrate dev --name init
```

Finally start the development server:

```bash
npm run dev
```

The app exposes API routes under `/api/properties` and pages to list, create and edit properties.

## Root Vite project

The original Vite React sample remains in the repo. Run it with:

```bash
pnpm install
pnpm dev
