# 🚀 Nova Starter Kit

A modern, scalable, and clean frontend starter built with:

- **Next.js 15 (App Router)**
- **TypeScript**
- **Sass Modules (SCSS)**
- ⚙️ Ready to connect with **Strapi CMS**

> Ideal for SaaS applications, admin dashboards, or any frontend project that requires clean architecture and API integration.

---

## 🌟 Features

- ✅ Next.js 15 App Router (layouts, server components)
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

nova-starter-kit/
│
├── app/                # App Router directory
│   ├──about      # About Page
│   ├──readme      # Readme Page
│   ├── layout.tsx       # Global layout
│   └── page.tsx         # Homepage
│
├── components/          # Reusable components
│   └── main/
│       ├── Main.tsx
│       └── scss/
│           └── Main.module.scss
│
├── lib/                 # Utility functions & API fetchers (optional)
├── public/              # Static assets (logo, favicons, etc.)
├── styles/              # Global SCSS variables (optional)
│
├── tsconfig.json       
├── next.config.js
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

Copy `.env.example` to `.env` and configure your Strapi API endpoint:


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

