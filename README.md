# Pharmacy Admin Dashboard

A responsive admin dashboard for managing pharmacy stock and orders, built with React and TypeScript.

**Live demo:** https://YOUR-VERCEL-LINK.vercel.app
**Demo login:** any email and a password with 6+ characters.

## Features
- Dashboard with stats, weekly sales chart and low stock alerts
- Products: search, category filter, add, edit and delete
- Orders: status tabs, colored status badges and status update
- Type-safe forms with React Hook Form and Zod validation
- Login with protected routes
- Fully responsive layout

## Tech stack
React, TypeScript, Vite, Tailwind CSS, Zustand, React Router, React Hook Form, Zod, Recharts

## Project structure
Feature-based architecture. Each feature keeps its own components, hooks, store and types.

    src/
      app/         router and providers
      features/    auth, dashboard, products, orders
      shared/      reusable UI, hooks and utils

## Run locally
    npm install
    npm run dev

## Password reset setup
1. Create a Firebase project, add a web app, and enable Email/Password under Authentication sign-in providers.
2. Copy `.env.example` to `.env.local` and fill in the Firebase web app values. Vite loads these variables when the dev server starts.
3. Make sure the accounts that need reset links exist in this Firebase project's Authentication users. This demo's login flow is still local-only.
4. Add your deployed site's domain to Firebase Authentication's authorized domains and configure the password reset email template.

## Screenshots
(Add 2-3 screenshots here)