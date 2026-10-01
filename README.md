# Pharmacy Admin Dashboard

A responsive admin dashboard for managing pharmacy stock and orders, built with React, TypeScript and Firebase.

**Live demo:** https://admin-dashboard-ten-beta-34.vercel.app

**Demo login:**
- Email: demo@gmail.com
- Password: 123456

## Features
- Dashboard with stats, weekly sales chart and low stock alerts
- Products: search, category filter, add, edit and delete
- Orders: status tabs, colored status badges and status update
- Firebase authentication: login, register, forgot password and profile
- Type-safe forms with React Hook Form and Zod validation
- Protected routes and fully responsive layout

## Tech stack
React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, React Hook Form, Zod, Recharts, Firebase

## Project structure
Feature-based architecture. Each feature keeps its own components, hooks, store and types.

    src/
      app/         router and providers
      features/    auth, dashboard, products, orders
      shared/      reusable UI, hooks and utils

## Run locally

    git clone https://github.com/modhavishal/admin-dashboard.git
    cd admin-dashboard
    npm install
    cp .env.example .env.local
    npm run dev

## Firebase setup
1. Create a Firebase project, add a web app, and enable Email/Password under Authentication sign-in providers.
2. Fill in the Firebase web app values in `.env.local`. Vite loads them when the dev server starts.
3. Add your deployed site's domain to Firebase Authentication's authorized domains.
4. Optional: configure the password reset email template.

## Screenshots

<img width="1710" height="903" alt="image" src="https://github.com/user-attachments/assets/35a9bb06-6b9e-4394-b0ce-071289f520d9" />
<img width="1866" height="933" alt="image" src="https://github.com/user-attachments/assets/6c6a4518-71d8-4a8b-a8e1-1f98788b02bd" />
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/dc101b97-5160-4d66-a246-76cf5c659dd0" />
<img width="1917" height="908" alt="image" src="https://github.com/user-attachments/assets/bbdaf0ab-e726-4d6b-9c02-8a4dee1e14b2" />
