# 🚀 Next.js + Strapi Starter Kit

A clean and minimal **Next.js + Strapi** starter kit designed to help you bootstrap a modern full-stack application quickly.  
This root README covers the global setup. Detailed documentation is in each sub-folder:

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)

> 📍 **This project is distributed under a commercial license.**  
> Please refer to [`LICENSE.md`](./LICENSE.md) for usage terms and restrictions.

---

## 📂 Project Structure

```bash
├── backend/      # Strapi 5.52.2 (Headless CMS & API)
├── frontend/     # Next.js 16.3.3 (Frontend)
└── package.json  # Root scripts (runs both apps in parallel)
```

---

## ✅ Requirements

- Node.js 22 (see `.nvmrc`)
- pnpm 9+ — install with `npm install -g pnpm`

---

## 🧱 Tech stack & versions

| Package      | frontend/ | backend/ |
| ------------ | --------- | -------- |
| Next.js      | 16.3.3    | —        |
| React        | 19.2.x    | 18.x (admin panel only) |
| Strapi       | —         | 5.52.2   |
| TypeScript   | 6.0.3     | 6.0.3    |
| ESLint       | 9.x       | 10.9.1   |
| Node.js      | 22        | 22       |
| pnpm         | 9+        | 9+       |

TypeScript stays on 6.0.3 on both sides (not 7.x) and the frontend stays on ESLint 9 (not 10):
`typescript-eslint` does not support TypeScript 7 yet, and `eslint-plugin-react` (pulled in by
`eslint-config-next`) does not support ESLint 10 yet. The backend has no React-lint dependency, so
it isn't affected by the second constraint and already runs ESLint 10. Re-check both once those
packages catch up — see [`MAINTENANCE.md`](./MAINTENANCE.md).

---

## 🧪 Install & Run

### 1. Install root dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Edit each `.env` file with your own values (API keys, database credentials, etc.).

### 3. Start both apps in parallel

```bash
pnpm dev
```

| Service             | URL                          |
| ------------------- | ---------------------------- |
| Frontend (Next.js)  | http://localhost:3000        |
| Backend (Strapi)    | http://localhost:1338/admin  |

---

## ⚠️ Required step after installation

The frontend reads articles and pages through Strapi's **public** REST API. On a fresh install
this access is granted **automatically** the first time Strapi boots (see
`backend/src/api/utils/seed.ts` → `grantPublicPermissions`) — as long as `pnpm dev` (or
`pnpm dev:backend`) has run at least once, `/articles` should work out of the box.

If you ever see `403 Forbidden` responses from the API (e.g. permissions were reset, or a
database was copied without re-running the seed), grant access manually:

1. Log into the Strapi admin panel → **Settings**
2. **Users & Permissions Plugin → Roles → Public**
3. Under **Article**, tick `find` and `findOne`
4. Under **Page**, tick `find` and `findOne`
5. Click **Save**

Without this, the frontend will receive `403 Forbidden` responses from the API.

---

## 🔧 Environment Variables

| File                     | Purpose                            |
| ------------------------ | ---------------------------------- |
| `backend/.env.example`   | Strapi keys, DB config, ports      |
| `frontend/.env.example`  | API URL, app URL, Strapi API token |

Key variables in `frontend/.env.local` (see [`frontend/lib/env.ts`](./frontend/lib/env.ts) for the
full validated schema):

```bash
NEXT_PUBLIC_API_URL=http://localhost:1338
STRAPI_API_TOKEN=your-token-here

# Optional — see the AI-Ready section below
AI_PROVIDER=anthropic
AI_API_KEY=your-key-here
```

---

## 🤖 AI-Ready

The frontend ships with a thin, **multi-provider AI layer** built on the
[Vercel AI SDK](https://sdk.vercel.dev/): swap between OpenAI, Anthropic, Google Gemini, and
Mistral with a single environment variable (`AI_PROVIDER`) — application code never imports a
provider SDK directly, it always goes through `getModel()`. Ready-made helpers cover common
CMS-adjacent tasks (SEO title/description generation, summarization, translation, slug
generation), exposed both as plain functions and through a rate-limited `/api/ai` route.

It's entirely optional — leave `AI_API_KEY` unset and the rest of the starter kit works exactly
as before.

See [`frontend/lib/ai/README.md`](./frontend/lib/ai/README.md) for setup per provider, usage
examples, and how to add a new provider.

---

## 📄 License

This starter is provided under a commercial license.  
Please review [`LICENSE.md`](./LICENSE.md) before using, modifying, or distributing this project.
