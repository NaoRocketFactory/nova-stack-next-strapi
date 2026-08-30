export interface AboutKit {
  name: string;
  tech: string;
  description: string;
  price: string;
  href: string;
  available: boolean;
  featured?: boolean;
}

export interface AboutContent {
  meta: { title: string; description: string };
  hero: { title: string; subtitle: string };
  mission: { heading: string; body: string };
  targets: { heading: string; items: string[] };
  features: { heading: string; items: string[]; note: string };
  kits: { heading: string; items: AboutKit[] };
  terms: { heading: string; items: string[]; note: string };
  follow: { heading: string; website: string; github: string; email: string };
  tagline: string;
}

export const aboutContentEn: AboutContent = {
  meta: {
    title: "About — Nao Rocket Factory",
    description:
      "Nao Rocket Factory builds production-ready starter kits for developers who want to ship, not configure.",
  },
  hero: {
    title: "Stop wasting days on setup.",
    subtitle:
      "Every project starts the same way: configure the auth, set up the database, wire the CMS, add SEO, fix the CI/CD... before writing a single line of real code. We've done it for you.",
  },
  mission: {
    heading: "What is Nao Rocket Factory?",
    body: "Nao Rocket Factory builds production-ready starter kits for developers who want to ship — not configure. Each kit is a battle-tested foundation built from real projects, not tutorials. Clean architecture, modern stack, ready on day one.",
  },
  targets: {
    heading: "Built for",
    items: [
      "Freelancers delivering client projects faster",
      "Startups shipping their MVP without the boilerplate",
      "Dev teams who care about code quality from day one",
    ],
  },
  features: {
    heading: "What you get",
    items: [
      "Clean, scalable architecture",
      "Production-ready security config",
      "SEO optimized out of the box",
      "Dark mode included",
      "CI/CD GitHub Actions configured",
      "README setup in 5 minutes",
    ],
    note: "No hidden fees. No subscriptions. No lock-in.\nBuy once, own the code forever.",
  },
  kits: {
    heading: "Our kits",
    items: [
      {
        name: "Nova Stack",
        tech: "Next.js 16 + Strapi 5",
        description: "The go-to stack for modern content-driven websites.",
        price: "59€",
        href: "https://naorocketfactory.dev/kits/nova-stack",
        available: true,
        featured: true,
      },
      {
        name: "Pulsar Stack",
        tech: "Astro 7 + TypeScript",
        description:
          "Lightweight and blazing fast. Perfect for landing pages, blogs and marketing sites.",
        price: "19€",
        href: "https://naorocketfactory.dev/kits/pulsar-stack",
        available: true,
      },
      {
        name: "Atlas Stack",
        tech: "Java 21 + Spring Boot + React",
        description: "Enterprise-grade. For teams who build serious backends.",
        price: "Coming soon — 99€",
        href: "https://naorocketfactory.dev",
        available: false,
      },
    ],
  },
  terms: {
    heading: "Simple terms",
    items: [
      "Full source code is yours",
      "Use it in commercial projects",
      "Modify it however you want",
      "No support included — documentation is",
    ],
    note: "You maintain your own fork.\nWe maintain the kit.",
  },
  follow: {
    heading: "Follow us",
    website: "naorocketfactory.dev",
    github: "github.com/NaoRocketFactory",
    email: "starterrocket.dev@gmail.com",
  },
  tagline: "Nao Rocket Factory — Build fast. Ship faster.",
};

export const aboutContentFr: AboutContent = {
  meta: {
    title: "À propos — Nao Rocket Factory",
    description:
      "Nao Rocket Factory crée des starter kits production-ready pour les développeurs qui veulent livrer, pas configurer.",
  },
  hero: {
    title: "Stop à la configuration sans fin.",
    subtitle:
      "Chaque projet commence pareil : configurer l'auth, la base de données, le CMS, le SEO, la CI/CD... avant d'écrire la moindre ligne de vrai code. On l'a fait pour vous.",
  },
  mission: {
    heading: "C'est quoi Nao Rocket Factory ?",
    body: "Nao Rocket Factory crée des starter kits production-ready pour les développeurs qui veulent livrer — pas configurer. Chaque kit est une base éprouvée, construite à partir de vrais projets. Architecture propre, stack moderne, opérationnel dès le premier jour.",
  },
  targets: {
    heading: "Pensé pour",
    items: [
      "Les freelances qui livrent plus vite",
      "Les startups qui veulent shipper leur MVP",
      "Les équipes qui tiennent à la qualité du code",
    ],
  },
  features: {
    heading: "Ce que vous obtenez",
    items: [
      "Architecture propre et scalable",
      "Configuration sécurité production-ready",
      "SEO optimisé dès le départ",
      "Dark mode inclus",
      "CI/CD GitHub Actions configurée",
      "Setup en 5 minutes chrono",
    ],
    note: "Sans frais cachés. Sans abonnement. Sans lock-in.\nAchat unique, code à vie.",
  },
  kits: {
    heading: "Nos kits",
    items: [
      {
        name: "Nova Stack",
        tech: "Next.js 16 + Strapi 5",
        description: "La stack idéale pour les sites web modernes.",
        price: "59€",
        href: "https://naorocketfactory.dev/kits/nova-stack",
        available: true,
        featured: true,
      },
      {
        name: "Pulsar Stack",
        tech: "Astro 7 + TypeScript",
        description:
          "Ultra léger et rapide. Parfait pour les landing pages, blogs et sites marketing.",
        price: "19€",
        href: "https://naorocketfactory.dev/kits/pulsar-stack",
        available: true,
      },
      {
        name: "Atlas Stack",
        tech: "Java 21 + Spring Boot + React",
        description: "Enterprise-grade. Pour les équipes qui construisent des backends sérieux.",
        price: "Bientôt disponible — 99€",
        href: "https://naorocketfactory.dev",
        available: false,
      },
    ],
  },
  terms: {
    heading: "Des conditions simples",
    items: [
      "Le code source est à vous",
      "Utilisable en projets commerciaux",
      "Modifiable comme vous voulez",
      "Pas de support — la documentation est incluse",
    ],
    note: "Vous maintenez votre fork.\nOn maintient le kit.",
  },
  follow: {
    heading: "Nous suivre",
    website: "naorocketfactory.dev",
    github: "github.com/NaoRocketFactory",
    email: "starterrocket.dev@gmail.com",
  },
  tagline: "Nao Rocket Factory — Construisez vite. Livrez plus vite.",
};
