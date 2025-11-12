# 🚀 Next.js + Strapi Starter Kit

A clean and minimal **Next.js + Strapi** starter kit designed to help you bootstrap a modern full-stack application quickly.  
This root README only covers the global setup.

“Start the full stack (frontend + backend) with a single command — no manual setup required.”

Detailed documentation is available inside each folder:

- `backend/README.md`
- `frontend/README.md`

> 📍 **This project is distributed under a commercial license.**  
Please refer to the `LICENSE` file for usage terms and restrictions.

---

## 📂 Project Structure

```bash
├── backend/ # Strapi (API & CMS)
├── frontend/ # Next.js (Frontend)
└── package.json # Root scripts
```


---

## ✅ Requirements

- Node.js 18+
- npm 9+

---

## 🧪 Install Dependencies

From the root folder:

```bash
npm install
```

This installs the tools required to run both apps together.
Backend & frontend dependencies will be installed automatically on first run.

## ▶️ Start Both Apps

Run this command at the root:

```bash
npm run dev
```

This will start:

Service	URL
Frontend (Next.js)	http://localhost:3000
Backend (Strapi Admin)
http://localhost:1337/admin

## 🔧 Environment Variables

You will find example environment files here:
```bash
backend/.env.example
frontend/.env.example
```

## 📄 License

This starter is provided under a commercial license.
Please review the LICENSE file before using, modifying, or distributing this project.