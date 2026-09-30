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

## Screenshots
(Add 2-3 screenshots here)