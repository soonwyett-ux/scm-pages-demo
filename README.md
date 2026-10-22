# SCM Pages Demo

A static site (HTML/CSS/JS) that is automatically **linted, packaged and published to GitHub Pages** by a GitHub Actions workflow on every push to `main`.

Live site: `https://<your-username>.github.io/scm-pages-demo/`

## Project layout

```
.
├── .github/workflows/deploy.yml   # CI/CD pipeline: lint → package → deploy
├── public/                        # the site that gets published
│   ├── index.html
│   ├── style.css
│   └── script.js
├── eslint.config.js               # lint rules (semicolons required)
├── package.json / package-lock.json
└── PROMPTS.md                     # LLM prompts used to build this
```

## Pipeline

| Job | What it does | Runs when |
|-----|--------------|-----------|
| `lint` | `npm ci` then `npm run lint` (ESLint over `public/`) | every push to `main` |
| `build` | Uploads `public/` as a Pages artifact | only if `lint` passes |
| `deploy` | Publishes the artifact to GitHub Pages | only if `build` passes |

Because `build` declares `needs: lint`, **a lint error stops the pipeline and nothing is deployed.**

## Setup (one time)

1. Create a **public** repository on GitHub named `scm-pages-demo`.
2. Push this project:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: static site + Pages workflow"
   git branch -M main
   git remote add origin https://github.com/<your-username>/scm-pages-demo.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Open the **Actions** tab. If the first run failed because Pages wasn't enabled yet, click **Re-run all jobs**.
5. When the run turns green, the site URL appears on the `deploy` job.

## Run the linter locally

```bash
npm install
npm run lint
```

## Testing the quality gate (breaking a JS rule)

1. In `public/script.js` remove the semicolon from line 3:
   ```js
   let clicks = 0     // was: let clicks = 0;
   ```
2. Commit and push:
   ```bash
   git commit -am "Test: remove required semicolon"
   git push
   ```
3. In **Actions**, the `lint` job fails with:
   ```
   public/script.js
     3:15  error  Missing semicolon  semi
   ✖ 1 problem (1 error, 0 warnings)
   ```
   `build` and `deploy` are **skipped**, so the live site is unchanged.
4. Restore the semicolon, commit and push again (`git commit -am "Fix: restore semicolon"`). All three jobs go green and the site redeploys.

Screenshots of the failed and fixed runs are a good addition to the submission.
