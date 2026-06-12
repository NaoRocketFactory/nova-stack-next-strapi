# 🚀 Next.js + Strapi Starter Kit

A clean and minimal **Next.js + Strapi** starter kit designed to help you bootstrap a modern full-stack application quickly.  
This root README covers the global setup. Detailed documentation is in each sub-folder:

- [`backend/README.md`](./backend/README.md)
- [`frontend/README.md`](./frontend/README.md)

> 📍 **This project is distributed under a commercial license.**  
> Please refer to the `LICENSE` file for usage terms and restrictions.

---

## 📂 Project Structure

```bash
├── backend/      # Strapi 5 (Headless CMS & API)
├── frontend/     # Next.js 15 (Frontend)
└── package.json  # Root scripts (runs both apps in parallel)
```

---

## ✅ Requirements

- Node.js 22 (see `.nvmrc`)
- pnpm 9+ — install with `npm install -g pnpm`

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
| Backend (Strapi)    | http://localhost:1337/admin  |

---

## 🔐 Strapi API Permissions (required on first launch)

After creating your Strapi admin account, you must enable public access to the content API:

1. Go to **Settings → Users & Permissions → Roles → Public**
2. Under **Article**, enable: `find`, `findOne`
3. Under **Page**, enable: `find`, `findOne`
4. Click **Save**

Without this step, the frontend will receive `403 Forbidden` responses from the API.

---

## 🔧 Environment Variables

| File                     | Purpose                            |
| ------------------------ | ---------------------------------- |
| `backend/.env.example`   | Strapi keys, DB config, ports      |
| `frontend/.env.example`  | API URL, app URL, Strapi API token |

---

## 📄 License

This starter is provided under a commercial license.  
Please review the `LICENSE` file before using, modifying, or distributing this project.
