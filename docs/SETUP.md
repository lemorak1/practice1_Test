# Real Estate MVP Setup Guide

This document walks through the initial steps to run the Next.js real estate example in this repository.

1. **Install dependencies**
   ```bash
   cd realstate-mvp
   npm install
   ```

2. **Copy the environment template**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your PostgreSQL credentials and Firebase keys
   ```

3. **Run the Prisma migration**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application should be available at `http://localhost:3000`.

