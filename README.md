# Realstate MVP

This Next.js application provides a minimal real estate listing platform. Listings can be stored in either Supabase or Firebase Data Connect (PostgreSQL) depending on the `DB_PROVIDER` environment variable. The frontend lets users filter properties by location, price and bedrooms/bathrooms. Authenticated administrators can create, edit and delete listings and upload images through a simple dashboard. NextAuth handles sign‑in using credentials from environment variables, while next‑i18next enables localization support.

## Quick start

```bash
# clone the repository
 git clone <repo-url> && cd realstate-mvp

# install dependencies
 npm install

# copy environment variables template
 cp .env.example .env
# edit .env and set `DB_PROVIDER` and connection details

# start the development server
 npm run dev
```

For complete setup instructions and environment variable details see [docs/SETUP.md](docs/SETUP.md).
