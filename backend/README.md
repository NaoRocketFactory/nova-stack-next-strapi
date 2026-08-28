# 🚀 Nova Starter Kit – Backend (Strapi 5.52.2)

A modern, ready-to-use **Strapi 5 backend** built for seamless integration with the **Nova Starter Kit frontend** (Next.js + TypeScript + Sass).

This backend provides a **preconfigured API**, **auto-seeded demo content**, and a **clean, scalable architecture** — perfect for startups, agencies, and freelancers who want to save setup time.

---

## 🧱 Tech Stack

| Component | Description |
|------------|--------------|
| **Strapi 5.52.2** | Open-source headless CMS for structured content |
| **SQLite** | Lightweight database (ideal for demos & local dev) |
| **TypeScript** | Type safety and developer experience |
| **API Token Auth** | Ready-to-use token-based API security |
| **Seed System** | Automatically generates demo data at first launch |

---

## ⚙️ Project Structure

```bash
backend/
├── src/
│   ├── api/
│   │   ├── article/           # Collection Type (Article)
│   │   ├── page/               # Collection Type (Page)
│   │   └── utils/seed.ts       # Demo data + public-permissions seeding
│   ├── admin/                  # Strapi Admin panel customization (opt-in)
│   ├── extensions/              # Plugin overrides (if needed)
│   └── index.ts                 # Entry point (register + bootstrap)
│
├── config/
│   ├── admin.ts
│   ├── api.ts
│   ├── database.ts
│   ├── middlewares.ts
│   ├── plugins.ts
│   └── server.ts
│
├── database/migrations/
├── public/                      # Uploads & static assets
├── types/generated/              # Auto-generated Strapi types
│
├── .env.example
├── package.json
└── README.md
```


---

## ✅ Requirements

- Node.js 22
- pnpm 9+ — install with `npm install -g pnpm`

---

## 🚀 Getting Started

### 1. **Install**

```bash
cd backend
pnpm install

```
---

### 2. **Configure environment variables**

Copy the example environment file and adjust as needed:

```bash
cp .env.example .env
```

### 3. **Run Developpement server**

```bash
pnpm dev
```
Strapi will start on http://localhost:1338/admin

### **🔐 Accessing the Strapi Administration Panel**

On the first launch (pnpm develop), Strapi will prompt you to create your first administrator account:

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

## **🔐 API Permissions**

By default Strapi blocks all public API access. On a fresh database, the seed script
(`src/api/utils/seed.ts` → `grantPublicPermissions`) grants `find`/`findOne` on **Article** and
**Page** to the Public role **automatically** the first time Strapi boots — no manual step needed
in the common case.

If you ever see `403 Forbidden` errors from the API (e.g. permissions were reset, or a database
was copied without re-running the seed), grant access manually as a fallback:

1. Go to **Settings → Users & Permissions → Roles → Public**
2. Under **Article**, enable: `find`, `findOne`
3. Under **Page**, enable: `find`, `findOne`
4. Click **Save**

## **🔧 Environment Variables**

All variables live in `.env` (copy from `.env.example`). None of them are optional in
production — Strapi will refuse to boot without the security keys.

| Variable | Purpose | Example |
| --- | --- | --- |
| `APP_KEYS` | Session/cookie signing, comma-separated | `key1,key2,key3,key4` |
| `API_TOKEN_SALT` | Salts generated API tokens | random string |
| `ADMIN_JWT_SECRET` | Signs admin panel JWTs | random string |
| `ADMIN_AUTH_SECRET` | Admin auth secret | random string |
| `TRANSFER_TOKEN_SALT` | Salts data-transfer tokens | random string |
| `JWT_SECRET` | Signs Users & Permissions JWTs | random string |
| `ENCRYPTION_KEY` | Encrypts sensitive config values | random string |
| `DATABASE_CLIENT` | `sqlite` locally, `postgres` in production | `postgres` |
| `DATABASE_URL` | Full Postgres connection string (alternative to the individual `DATABASE_*` vars below) | `postgresql://user:pass@host/db` |
| `DATABASE_HOST` / `_PORT` / `_NAME` / `_USERNAME` / `_PASSWORD` | Postgres connection (production only) | from your DB provider |
| `NODE_ENV` | `development` locally, `production` when deployed | `production` |
| `HOST` | Bind address | `0.0.0.0` |
| `PORT` | Listen port | `1338` |
| `FRONTEND_URL` | Allowed CORS origin(s), comma-separated | `https://your-frontend-domain.com` |

Generate real values for every secret above before deploying — never reuse the `dev...` placeholders
from `.env.example`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

In production, also set `DATABASE_CLIENT=postgres` plus the matching `DATABASE_HOST` /
`_PORT` / `_NAME` / `_USERNAME` / `_PASSWORD` — SQLite is meant for local development only.

## **📜 License**

Commercial License – Nova Starter Kit © 2026 Nao Rocket Factory

This software is licensed for individual and commercial use under a single-developer license.

You are allowed to:

Use this starter kit in personal or commercial projects.

Modify the source code for your own products.

You are not allowed to:

Redistribute, resell, or share this code (in full or part).

Publish this code publicly (e.g., GitHub, GitLab, etc.).

For full license terms, see the LICENSE

### 👉 Next step: [Go to the frontend README](../frontend/README.md)