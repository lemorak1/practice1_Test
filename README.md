# Realstate MVP

<<<<<<< HEAD
<<<<<<< HEAD
This Next.js application provides a minimal real estate listing platform. Listings can be stored in either Supabase or Firebase Data Connect (PostgreSQL) depending on the `DB_PROVIDER` environment variable. Uploaded photos are stored in **Firebase Storage**. The frontend lets users filter properties by location, price and bedrooms/bathrooms. Authenticated administrators can create, edit and delete listings through a simple dashboard. NextAuth handles sign‑in using credentials from environment variables, while next‑i18next enables localization support.
=======
This Next.js application provides a minimal real estate listing platform. Listings can be stored in either Supabase or Firebase Data Connect (PostgreSQL) depending on the `DB_PROVIDER` environment variable. The frontend lets users filter properties by location, price and bedrooms/bathrooms. Authenticated administrators can create, edit and delete listings and upload images through a simple dashboard. NextAuth handles sign‑in using credentials from environment variables, while next‑i18next enables localization support.
>>>>>>> LM_TEST_JC
=======
This Next.js application provides a minimal real estate listing platform. Listings can be stored in either Supabase or Firebase Data Connect (PostgreSQL) depending on the `DB_PROVIDER` environment variable. Uploaded photos are stored in **Firebase Storage**. The frontend lets users filter properties by location, price and bedrooms/bathrooms. Authenticated administrators can create, edit and delete listings through a simple dashboard. NextAuth handles sign‑in using credentials from environment variables, while next‑i18next enables localization support.
A simple navigation bar links to the Home and Admin sections and lets users switch language or sign in and out.
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria

## Quick start

```bash
# clone the repository
 git clone <repo-url> && cd realstate-mvp

# install dependencies
 npm install

# copy environment variables template
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria
cp .env.example .env
# edit `.env` and set `DB_PROVIDER` to either `supabase` or `firebase`
# then fill in the remaining connection details, including the
# Firebase service account data used for photo uploads
<<<<<<< HEAD
=======
 cp .env.example .env
# edit .env and set `DB_PROVIDER` and connection details
>>>>>>> LM_TEST_JC
=======
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria

# start the development server
 npm run dev

# for faster hot reload, you can try the experimental turbopack-based server
 npm run dev:turbo
```

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria
For complete setup instructions and environment variable details see
[docs/SETUP.md](docs/SETUP.md). If you provide a PostgreSQL connection string in
`DATABASE_URL`, the app will attempt to create the required tables on first run;
otherwise run the SQL in
[docs/supabase_schema.sql](docs/supabase_schema.sql) manually.

When setting `FIREBASE_PRIVATE_KEY`, wrap the value in quotes and replace
newlines with `\n` so it loads correctly.
<<<<<<< HEAD
=======
For complete setup instructions and environment variable details see [docs/SETUP.md](docs/SETUP.md).
>>>>>>> LM_TEST_JC
=======
>>>>>>> origin/wcthwq-codex/revisar-y-desarrollar-webapp-inmobiliaria
