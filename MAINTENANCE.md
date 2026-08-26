# 🛠️ Maintenance Guide

Practical checklist for keeping this starter kit healthy after you've built on top of it.
Run everything from the repo root unless a command specifies `frontend/` or `backend/`.

---

## Monthly

- [ ] **Security audit** — review and triage new High/Critical advisories.
  ```bash
  cd frontend && pnpm audit
  cd ../backend && pnpm audit
  ```
- [ ] **Patch-level updates** — safe to apply without review (same major/minor).
  ```bash
  pnpm update --recursive
  ```
- [ ] Skim [Next.js releases](https://github.com/vercel/next.js/releases) and
  [Strapi releases](https://github.com/strapi/strapi/releases) for security-relevant patches
  landed since last check.

---

## Quarterly

- [ ] **Full outdated report** — see what's behind, not just what `pnpm update` already caught.
  ```bash
  cd frontend && pnpm outdated
  cd ../backend && pnpm outdated
  ```
- [ ] **Re-run the full verification suite** after any bump:
  ```bash
  cd frontend
  pnpm install && pnpm run lint && pnpm run typecheck && pnpm run build

  cd ../backend
  pnpm install && pnpm run lint && pnpm run typecheck && pnpm dev   # confirm it boots on PORT 1338
  ```
- [ ] **Re-check the version blockers documented in the root README** (Tech stack & versions
  table) — `typescript-eslint` may have shipped TypeScript 7 support, or `eslint-plugin-react`
  may support ESLint 10 by now. If either landed, re-attempt the corresponding upgrade and
  re-run the full verification suite above before committing to it.
- [ ] Review and merge/close accumulated [Dependabot](./.github/dependabot.yml) PRs.

---

## Semi-annual

- [ ] **Major version review** — Next.js, Strapi, React, TypeScript. Read the migration guide
  before bumping a major:
  - Next.js: https://nextjs.org/docs/app/building-your-application/upgrading
  - Strapi: https://docs.strapi.io/dev-docs/migration
- [ ] **Re-attempt `better-sqlite3` latest** — it dropped prebuilt binaries as of v13 (requires a
  full Python/C++ toolchain to install). Check whether a newer release restored
  `prebuild-install` before bumping past the pinned `^12.x` line:
  ```bash
  npm view better-sqlite3 scripts.install
  ```
- [ ] **Rotate secrets** — `APP_KEYS`, `ADMIN_JWT_SECRET`, `API_TOKEN_SALT`, `JWT_SECRET`,
  `TRANSFER_TOKEN_SALT`, `ENCRYPTION_KEY` in `backend/.env`, and any `AI_API_KEY` /
  `STRAPI_API_TOKEN` in `frontend/.env.local`, for any environment handling real user data.
- [ ] Confirm `LICENSE.md` terms and pricing are still what you intend to sell under.
- [ ] Re-check `frontend/lib/ai/README.md`'s pricing table against each provider's current rates.

---

## Quick reference — verification commands

| Check | Command |
|---|---|
| Frontend lint | `cd frontend && pnpm run lint` |
| Frontend typecheck | `cd frontend && pnpm run typecheck` |
| Frontend build | `cd frontend && pnpm run build` |
| Backend lint | `cd backend && pnpm run lint` |
| Backend typecheck | `cd backend && pnpm run typecheck` |
| Backend boots on 1338 | `cd backend && pnpm dev` → check the printed admin URL |
| Frontend audit | `cd frontend && pnpm audit` |
| Backend audit | `cd backend && pnpm audit` |

## Changelogs

- Next.js: https://github.com/vercel/next.js/releases
- Strapi: https://github.com/strapi/strapi/releases
- Vercel AI SDK: https://github.com/vercel/ai/releases
