# LLM Prompts Used

**LLM:** Claude (Anthropic), Claude Opus 5.5, via the Claude app
**Date:** October 22, 2026

## Prompt 1 — Build the project

> Software configuration management is often associated with version control, CI/CD, and DevOps. Using your preferred LLM to assist you, create a static site (HTML/CSS/JS) hosted on GitHub Pages with a GitHub Actions workflow that automatically packages and publishes the site whenever you push to your GitHub repository (10 pts). Include an automated quality check by adding a JS linter step that runs before deployment and test it by breaking a JS rule such as omitting a required semicolon (10 pts). Submit the link to your GitHub repository (make sure it is set to public) and share all of your LLM prompts here (5 pts).

**What the LLM produced:**
- `public/index.html`, `public/style.css`, `public/script.js` — the static site
- `eslint.config.js` — ESLint flat config with `"semi": ["error", "always"]`
- `package.json` / `package-lock.json` — ESLint as a dev dependency, `npm run lint` script
- `.github/workflows/deploy.yml` — three jobs: `lint` → `build` (package) → `deploy`
- `README.md` — setup steps and the semicolon test procedure

It also verified the linter locally: a clean run exits 0, and removing the semicolon after `let clicks = 0` produces `3:15 error Missing semicolon semi` with exit code 1.

<!-- Add any follow-up prompts you send below, e.g. questions about errors you hit while pushing. -->
