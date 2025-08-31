# Linked-Posts — Social Media Web App

A modern social media single-page application with full authentication & authorization, schema-based form validation, and end-to-end CRUD for posts and comments.

**Live Demo:** https://linked-posts-amber.vercel.app/  
**Repository:** https://github.com/MhammedOsama/Linked-Posts

---

## ✨ Features

- **Auth & Authorization**
  - Sign up / Sign in / Sign out
  - Protected routes + token persistence (localStorage)
  - Ownership checks for editing/deleting own content
- **Posts**
  - Create, read, update, delete posts
  - Responsive post cards, loading & error states
- **Comments**
  - Add, edit, and delete comments on posts
- **Profile**
  - Profile page with user information and a list of authored posts
- **DX & UI**
  - Clean API layer with Axios
  - Validation with **React Hook Form + Zod**
  - UI with **Tailwind CSS + HeroUI** and animations via **Framer Motion**
  - Deployed on **Vercel**
  - Linting with **ESLint**

---

## 🧰 Tech Stack

- **Frontend:** React 19, Vite 7, React Router 7
- **UI:** Tailwind CSS 4, HeroUI, Framer Motion
- **Forms & Validation:** React Hook Form, Zod
- **HTTP:** Axios
- **Tooling:** ESLint

> From `package.json`:
>
> `@heroui/react`, `@hookform/resolvers`, `@tailwindcss/vite`, `axios`, `framer-motion`,  
> `react`, `react-dom`, `react-hook-form`, `react-router-dom`, `tailwindcss`, `zod`

---

## 🚀 Getting Started

### Prerequisites
- **Node.js ≥ 18** (recommended)
- **npm** (comes with Node)

### 1) Clone
```bash
git clone https://github.com/MhammedOsama/Linked-Posts.git
cd Linked-Posts
