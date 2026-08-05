# Prince Wedding — Jacob & Angelie

A small Next.js site for Jacob & Angelie's wedding (Oct 30, 2026, Cebu City), built to match
the same stack and deploy pattern as `prince-foods-b2c` / `prince-foods-b2b`: Next.js 15,
React 19, TypeScript, Tailwind v4, Docker standalone build, deployed to Hetzner through the
shared `multi-site-hetz-cicd` pipeline.

No database — RSVPs are emailed via Resend instead of stored in Postgres, since this is a
one-off site rather than an ongoing product.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in real values
npm run dev
```

Visit `http://localhost:3000`. You'll be asked for the passcode (`SITE_PASSCODE`, see `.env.local`)
before you can see any page — this mirrors the b2b trade-account gate but with a shared passcode
instead of individual logins, via `middleware.ts` + `/login` + `/api/unlock`.

## Editing content

Everything specific to the couple/venue lives in one file: `src/lib/wedding.ts`. Photos go in
`/public/gallery` (swap into `src/app/gallery/page.tsx`). Wedding party names go in
`src/app/wedding-party/page.tsx`. Our Story timeline is in `src/app/our-story/page.tsx`.

## RSVP emails

`POST /api/rsvp` sends an email via Resend to `RSVP_NOTIFY_TO` whenever someone submits the form.
Requires `RESEND_API_KEY`, `EMAIL_FROM`, and `RSVP_NOTIFY_TO` to be set — until they are, RSVPs
still show a "thank you" confirmation to the guest, but nothing gets emailed (this is logged as a
warning server-side, so it's easy to notice before launch).

## Deploying to Hetzner (same pattern as prince-foods-b2c)

This repo is wired for the same repository-dispatch flow the other Prince Foods sites use:

1. **Create the GitHub repo** — `awc-create/prince-wedding` (or whatever name you'd prefer),
   empty, no README/license (this project already has one).
2. **Push this project:**
   ```bash
   cd prince-wedding
   git init
   git add .
   git commit -m "Initial commit — prince-wedding site"
   git branch -M main-hetz
   git remote add origin https://github.com/awc-create/prince-wedding.git
   git push -u origin main-hetz
   ```
   Pushing to `main-hetz` is what triggers `.github/workflows/trigger-deploy.yml`, same as b2c.
3. **Set repo secrets/variables** (Settings → Secrets and variables → Actions), matching what
   the other Prince Foods repos already have configured:
   - `PERSONAL_ACCESS_TOKEN` — token with access to dispatch events to `multi-site-hetz-cicd`
   - `DISPATCH_SHARED_KEY` — shared deploy key the CICD repo expects
   - (optional) `CICD_REPO` variable if it's not `awc-create/multi-site-hetz-cicd`
4. **Register the site in `multi-site-hetz-cicd`** the same way `prince-foods-b2c` is registered
   there, using this repo's `.cicd-config.yml`:
   ```yaml
   project_type: node
   slug: wedding
   port: 3000
   domains:
     prod: wedding.prince-v.com
   deploy_targets:
     main-hetz: hetzner
   ```
5. **DNS** — add a `wedding` subdomain record for `prince-v.com` pointing at the same Hetzner
   host/reverse proxy the other sites use (Cloudflare, based on `CLOUDFLARE_DNS_API_TOKEN` in the
   b2c env — the CICD pipeline may already automate this once the slug/domain above are picked up).
6. **Environment variables on the server** — set the values from `.env.example` (with real
   `RESEND_API_KEY`, `SITE_PASSCODE`, etc.) wherever the CICD pipeline injects env vars for
   Hetzner deploys (same place b2c's are set).

I don't have push access to your GitHub org or your Hetzner/CICD systems, so steps 1, 3, 4, 5 and
6 need you (or whoever manages `multi-site-hetz-cicd`) to actually do them — everything in this
repo is ready to go the moment it's pushed.
