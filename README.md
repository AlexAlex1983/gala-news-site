# GALA Health — News & Publications Site

A small static site for News, Publications, and the live X feed — built to
complement galahealth.org (which stays on Tilda). No page builder, no
clicking through nested settings: content lives in two plain JSON files that
get edited directly.

## How content works

- **News** → edit `news.json`. Each entry: `title`, `date` (YYYY-MM-DD),
  `summary` (short teaser, shown on the card), `body` (full article —
  use `\n\n` between paragraphs). The most recent post automatically becomes
  the homepage headline.
- **Publications** → edit `publications.json`. Each entry: `title`, `type`
  (e.g. "Policy Brief", "Report"), `date`, `file` (path or URL to the PDF).
  Put actual PDF files in a `/publications/` folder in this repo and
  reference them like `"file": "publications/my-report.pdf"`.
- **X feed** → already embedded and live, no maintenance needed — it pulls
  directly from @GALA_Health.

No rebuild step, no template settings, no "Conflict (Not found)" — edit the
JSON, commit, done.

## Deploying (GitHub Pages)

1. Push this folder to a new GitHub repo (same account as the X agent).
2. Repo → Settings → Pages → under "Build and deployment", set Source to
   "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
3. Repo → Settings → Pages → under "Custom domain", enter
   `news.galahealth.org` and save (this reads the `CNAME` file already in
   this repo, but entering it here also lets GitHub provision HTTPS for it).
4. Add a DNS record wherever `galahealth.org` is registered:
   - Type: `CNAME`
   - Host: `news`
   - Value: `<your-github-username>.github.io`
5. Wait for DNS to propagate (can take a few minutes to a few hours), then
   visit `https://news.galahealth.org`.
6. In Tilda, add a navigation link (or just a link somewhere on the
   homepage) pointing to `https://news.galahealth.org`.

## Adding a new News post

Open `news.json`, add a new object to the array (comma-separated), keep the
same field names, commit. It appears on the site immediately — no build
step, no separate "page" to create.

## Adding a Publication

Add the PDF file to a `/publications/` folder in this repo, then add an
entry to `publications.json` pointing to it.
