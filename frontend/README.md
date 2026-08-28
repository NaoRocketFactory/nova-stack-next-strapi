# 🚀 Nova Starter Kit

A modern, scalable, and clean frontend starter built with:

- **Next.js 16.3.3 (App Router)**
- **TypeScript 6.0.3**
- **Sass Modules (SCSS)**
- ⚙️ Ready to connect with **Strapi CMS**

> Ideal for SaaS applications, admin dashboards, or any frontend project that requires clean architecture and API integration.

---

## 🧱 Versions

| | |
| --- | --- |
| Next.js | 16.3.3 |
| TypeScript | 6.0.3 |
| Node.js | 22 |
| pnpm | 9+ |

---

## 🌟 Features

- ✅ Next.js 16.3.3 App Router (layouts, server components)
- ✅ Fully typed with TypeScript
- ✅ SCSS Modules for scoped, maintainable styling
- ✅ Scalable project structure
- ✅ Path aliases using `@/`
- ✅ Ready to consume APIs (Strapi or any REST backend)
- ✅ Preconfigured ESLint with Next.js best practices
- 🚀 Ultra-fast dev server with Turbopack

---

## 📁 Project Structure

```bash
frontend/
├── app/
│   ├── api/ai/route.ts        # AI API route (streaming, rate-limited)
│   ├── articles/
│   │   ├── [slug]/page.tsx    # Article detail (ISR)
│   │   └── page.tsx           # Articles list (ISR)
│   ├── about/page.tsx
│   ├── readme/page.tsx
│   ├── error.tsx              # Route-level error boundary
│   ├── global-error.tsx       # Root layout error boundary
│   ├── loading.tsx
│   ├── not-found.tsx
│   ├── sitemap.ts             # Dynamic sitemap.xml
│   ├── layout.tsx             # Root layout (fonts, theme, metadata)
│   └── page.tsx                # Homepage
│
├── components/
│   ├── blocks/BlockRenderer.tsx    # Strapi rich-text block renderer
│   ├── main/Main.tsx
│   ├── providers/ThemeProvider.tsx
│   └── theme-toggle/ThemeToggle.tsx
│
├── lib/
│   ├── ai/                     # Multi-provider AI layer — see lib/ai/README.md
│   ├── api.ts                  # Strapi fetch wrapper
│   └── env.ts                  # Runtime env validation (zod)
│
├── public/
│   ├── icons/                  # PWA icons (192×192, 512×512)
│   ├── pictures/                # Logo, favicon
│   └── manifest.json
│
├── styles/                     # Global SCSS
├── types/                      # Shared TS types (Strapi response shapes)
├── tests/                      # Testing setup notes (no tests included by default)
│
├── .env.example
├── next.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

1. Install dependencies

npm install

### 3. Scripts

| Script          | Description                                   |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the development server (with Turbopack) |
| `npm run build` | Build for production                          |
| `npm run start` | Start the production server                   |
| `npm run lint`  | Run ESLint                                    |


### Environment variables

Copy `.env.example` to `.env.local` and set:

```bash
NEXT_PUBLIC_API_URL=http://localhost:1338
STRAPI_API_TOKEN=your-token-here

# Optional — see lib/ai/README.md
AI_PROVIDER=anthropic
AI_API_KEY=your-key-here
```

`STRAPI_API_TOKEN`, `AI_PROVIDER` and `AI_API_KEY` are all optional — the app works against
Strapi's public API and without AI features if they're left unset. All four are validated at
startup by [`lib/env.ts`](./lib/env.ts), which fails fast with a clear message if one is set to an
invalid value (e.g. a malformed URL, or an `AI_PROVIDER` outside the supported list).


## 🎨 Styling

This project uses Sass Modules for easier custom styling and better separation of concerns.

You can customize colors, spacing, and variables by editing your SCSS files under:

/components/[name]/scss/[Component].module.scss

To define global variables, create a styles/_variables.scss file and use:

@use "@/styles/variables" as *;

### 🖼️ Favicon

A default favicon is already included in `/public/pictures/favicon.ico`.

You can replace it with your own brand icon by overwriting that file.

Recommended format: `.ico`  
You can generate it easily from your logo using [favicon.io](https://favicon.io/).

### 📱 Web App Manifest

A default `manifest.json` is included in `/public/`.

This file defines your app name, colors, and icons for browsers and PWA usage.

You can easily customize it with your own brand information:

- `name`: your app or company name  
- `theme_color`: your primary brand color  
- `icons`: path to your custom favicon or logo


## 📜 License

This project is distributed under a **commercial license** by **Nao Rocket Factory**.  
Redistribution, resale, or public sharing of the source code is strictly prohibited.

For licensing inquiries or enterprise usage, contact:  
📩 starterrocket.dev@gmail.com

 ## 👨‍💻 Author

Nao Rocket Factory

A tech-driven initiative focused on building high-quality starter kits for modern developers.

## 🤝 Support the Project

If you find this starter helpful:

- ⭐ Star the repo

- 🛠 Clone it and build your next idea

- 📣 Share it with other devs

- 🧑‍💼 Use it for your freelance or startup projects

