## Live Demo
https://admin-dashboard-ruddy-one-35.vercel.app/
ADMIN CREDENTIALS:
mail- kattamurikushal@gmail.com
password- Kushal@118
🚀 Server-Rendered E-commerce Product Management Dashboard

An admin-only, server-side rendered (SSR) e-commerce dashboard built with Next.js App Router and Supabase, designed for managing products, inventory, and analytics securely and efficiently.

📌 Project Overview

This project is a real-world administrative dashboard for an e-commerce system.
It allows authorized admins only to manage products, track inventory, and visualize data using interactive charts.

The application uses Server-Side Rendering (SSR) for fast load times, improved SEO, and secure data access, while client components handle interactivity such as CRUD operations and analytics.

✨ Key Features

🔐 Admin Authentication & Authorization

Supabase authentication

Role-based access control (admin only)

Protected routes using Auth Guard

📦 Product Management (CRUD)

Create, Read, Update, Delete products

Image upload support

Input validation using Zod

📊 Analytics Dashboard

Total products count

Total stock calculation

Inventory value computation

Low-stock alerts

Interactive charts using Recharts

⚡ Server-Side Rendering (SSR)

Initial product and analytics data fetched on the server

Faster page loads and better performance

🎨 Modern UI

Tailwind CSS

Responsive admin layout

Dark-themed dashboard

🛠️ Tech Stack
Frontend

Next.js 16 (App Router)

React

Tailwind CSS

Recharts

Backend & Database

Supabase (PostgreSQL)

Supabase Auth

Supabase Row Level Security (RLS)

Validation & State

Zod (Form validation)

React Hooks

Deployment

Vercel

🧱 Project Architecture
src/
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── products/
│   ├── analytics/
│   └── layout.js
├── components/
│   ├── AuthGuard.js
│   ├── LogoutButton.js
│   └── Sidebar.js
├── lib/
│   └── supabase.js

🔐 Authentication Flow

Admin logs in via Supabase Auth

Session is validated

User role is fetched from profiles table

Only users with role = 'admin' can access dashboard pages

Unauthorized users are redirected to login

🗃️ Database Schema (Supabase)
products
Column	Type
id	uuid
name	text
price	integer
stock	integer
image_url	text
created_at	timestamp
profiles
Column	Type
id	uuid (auth.users)
role	text (admin / user)
