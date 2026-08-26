# 🚀 Nova Starter Kit – Backend (Strapi 5)

A modern, ready-to-use **Strapi 5 backend** built for seamless integration with the **Nova Starter Kit frontend** (Next.js + TypeScript + Sass).

This backend provides a **preconfigured API**, **auto-seeded demo content**, and a **clean, scalable architecture** — perfect for startups, agencies, and freelancers who want to save setup time.

---

## 🧱 Tech Stack

| Component | Description |
|------------|--------------|
| **Strapi 5** | Open-source headless CMS for structured content |
| **SQLite** | Lightweight database (ideal for demos & local dev) |
| **TypeScript** | Type safety and developer experience |
| **API Token Auth** | Ready-to-use token-based API security |
| **Seed System** | Automatically generates demo data at first launch |

---

## ⚙️ Project Structure

```bash

backend/
│
├── src/
│ ├── api/
│ │ ├── article/ # Collection Type (Article)
│ │ └── utils/seed.ts # Demo data seeding script
│ │
│ ├── admin/ # Strapi Admin configuration
│ ├── extensions/ # Plugin overrides (if needed)
│ └── index.ts # Entry point (bootstrap + register)
│
├── config/ # Database, middlewares, plugins
├── public/ # Uploads & static assets
├── .env.example # Example environment variables
├── package.json
└── README.md

```


---

## 🚀 Getting Started

### 1. **Install**

```bash
cd backend
npm install

```
---

### 2. **Configure environment variables**

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

### 3. **Run Developpement server**

```bash
npm run dev
```
Strapi will start on http://localhost:1338/admin

### **🔐 Accessing the Strapi Administration Panel**

On the first launch (npm run develop), Strapi will prompt you to create your first administrator account:

- Go to http://localhost:1338/admin

- Fill in the following fields:

- Username

- Email

- Password

- Click “Let's start”

➡️ You’ll be automatically logged in to the admin panel with the Super Admin role.

## **🌱 Demo Content**

This starter kit includes an automatic seed system that generates demo content on first launch:

| Collection | Example Entries                                              |
| ---------- | ------------------------------------------------------------ |
| Article    | “Welcome to Nova Starter Kit 🚀”, “Next.js + Strapi + Sass = ❤️” |
| Page       | “Home”, “About”                                              |

## **🔐 API Permissions (required)**

By default Strapi blocks all public API access. After creating your admin account:

1. Go to **Settings → Users & Permissions → Roles → Public**
2. Under **Article**, enable: `find`, `findOne`
3. Under **Page**, enable: `find`, `findOne`
4. Click **Save**

Without this step, the frontend will receive `403 Forbidden` errors.

## **📜 License**

Commercial License – Nova Starter Kit © 2025 Francois

This software is licensed for individual and commercial use under a single-developer license.

You are allowed to:

Use this starter kit in personal or commercial projects.

Modify the source code for your own products.

You are not allowed to:

Redistribute, resell, or share this code (in full or part).

Publish this code publicly (e.g., GitHub, GitLab, etc.).

For full license terms, see the LICENSE

### 👉 Next step: Go to the frontend README