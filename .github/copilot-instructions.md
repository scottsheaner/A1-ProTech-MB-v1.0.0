```md
## Purpose
Concise, actionable guidance for AI coding agents working in this repo. This file documents the two main code surfaces (static Mercedes-Benz content at repo root and an Expo/React Native app under `A1-ProTech/`), project conventions, and quick commands to preview and validate changes.

## High-level architecture
- Static content: top-level directories (e.g. `Lighting%20and%20Horns/`, `Windows%20and%20Glass/`, `Wiper%20and%20Washer%20Systems/`) are plain HTML pages intended to be served as a static site. They share global assets referenced with relative paths (e.g. `../../../style.css`). Example page: `Lighting%20and%20Horns/Headlamp%20Switch/index.html`.
- App workspace: `A1-ProTech/` is an Expo (React Native / Expo Router) project with TypeScript and React components (`A1-ProTech/app/*.tsx`, `A1-ProTech/components/`). It is a separate developer surface (run with `expo start`) and uses its own package.json and node_modules.

## Developer workflows (concrete commands)
- Preview the static site quickly (macOS / zsh):
```bash
cd /Users/scott/Documents/A1-ProTech-MB-v1.0.0
python3 -m http.server 8000
# open http://localhost:8000/
```
- Work with the Expo app (A1-ProTech):
```bash
cd A1-ProTech
npm install        # install deps (or yarn)
npm run start      # runs `expo start` (see package.json)
npm run android|ios|web
npm run lint       # runs `expo lint`
```
- Type-checking: run `npx tsc --noEmit` inside `A1-ProTech/` to validate TypeScript files.
- Repo-level quick checks: use `grep -R` for patterns (examples below).

## Project-specific conventions and patterns
- Percent-encoded paths: directory names include URL-encoding for spaces (e.g. `Lighting%20and%20Horns/`). Always preserve percent-encoding in new/renamed folders to avoid breaking links.
- Relative asset references: many pages expect `style.css` and `script.js` at the repo root (referenced via relative paths such as `../../../style.css`). If these are missing, add them to the repo root rather than changing every page.
- Header/footer and breadcrumbs: pages repeat header/footer HTML and use relative breadcrumb links. Copy an existing `index.html` when creating new pages and update only the title, breadcrumb parts and content rows.
- Table and JS hooks: labor/parts tables use `class="labor-times-table"`. Client JS expects `id="expand-all"` and `id="collapse-all"`. Preserve these hooks when changing markup.

## Integration points & external assets
- Large binary assets (PDFs) are present in the repo — do not modify them in-place.
- `script.js` (client-side) is responsible for expand/collapse and breadcrumb UX. If you must create it, implement minimal behavior that targets `.labor-times-table`, `#expand-all`, `#collapse-all`, and `.breadcrumbs`.
- The Expo app depends on Expo/React Native packages; install and run inside `A1-ProTech/`. Do not attempt to run `expo` at the repo root.

## Engineering contract (when editing pages)
- Inputs: an existing HTML page used as a template or a new content file.
- Outputs: a new/updated `index.html` using the repo's header/footer, breadcrumb structure, and correct relative paths.
- Success criteria: renders locally using `python3 -m http.server`, asset references (CSS/JS) resolve without 404s, and labor/parts tables retain required class/id hooks.

## Useful examples & grep patterns
- Find labor pages: grep -R "labor-times-table" .
- Find pages referencing the global stylesheet: grep -R "href=\"../../../style.css\"" .
- Template to copy: `Lighting%20and%20Horns/Headlamp%20Switch/index.html` — preserves breadcrumb and path conventions.

## PR guidance for AI agents
- Keep PRs small and focused (one topic or one global asset per PR).
- Make minimal diffs. Prefer copying a sibling `index.html` and changing only the title, breadcrumbs and table rows.
- If adding `style.css` or `script.js`, put them at repo root so existing relative references work.

## When to ask the maintainer
- Ask if you need the original theme assets (`style.css` / `script.js`) or a top-level `index.html` to match a canonical theme.

If you want, I can also create a minimal `script.js` and `style.css` that implement the site's expand/collapse and a basic layout — tell me which behavior to prioritize.
```## Purpose
Short guidance for AI coding agents working on the A1-ProTech-MB-v1.0.0 repo. Focus on the site's static HTML structure, conventions, and quick local preview/editing tips.

## Big picture
- This repository is a static documentation/site collection for Mercedes-Benz service content (many nested HTML pages under topical directories such as `Lighting and Horns/`, `Windows and Glass/`, and `Wiper and Washer Systems/`).
- Pages are plain HTML using shared root assets (expected `style.css` and `script.js`) and relative linking. Example page: `Lighting and Horns/Headlamp Switch/index.html`.

## Key directories & files
- `Lighting and Horns/`, `Windows and Glass/`, `Wiper and Washer Systems/` — main content groups. Each topic directory usually contains `index.html` and subfolders `Labor Times/` and `Parts Information/`.
- Root-level: `README.md` and a PDF `Wiring diagram for ME-SFI...pdf` (external reference). Note: `style.css` and `script.js` are referenced by pages but not present in the repo root — treat them as required global assets.

## Project-specific conventions to follow
- File and folder names include URL/percent-encoding (spaces are `%20` in paths/links). When editing, maintain the existing percent-encoded names to preserve link correctness.
- Pages use relative paths for assets and breadcrumbs (e.g. `<link rel='stylesheet' href="../../../style.css">`). When moving or adding files, update relative paths and breadcrumb links accordingly.
- Labor-times pages use a table with class `labor-times-table`. Parts pages follow a similar pattern. Header/footer are repeated in each file; pages include buttons with ids `expand-all` and `collapse-all` and reference `script.js`.

## Local preview & quick checks
- To preview the site locally, serve the repo root as a static HTTP directory. From the repo root run (macOS / zsh):

```
cd /Users/scott/Documents/A1-ProTech-MB-v1.0.0
python3 -m http.server 8000
# then open http://localhost:8000/ in a browser
```

- Quick content search examples:
  - Find pages referencing `labor-times-table` to locate labor pages.
  - Grep for `href="../../../style.css"` to find pages depending on global assets.

## Editing guidance for agents
- Preserve the existing header/footer markup and breadcrumb format. Use existing files as templates when adding new topic pages (copy a sibling `index.html` and update titles, breadcrumb links, and relative asset paths).
- When adding or renaming folders, update any links that use `../../../` style relative paths. Prefer minimal diffs: change only the HTML you must, keep indentation and style consistent.
- If you add or restore global assets (`style.css`, `script.js`), place them at the repo root so existing relative paths work.

## Integration points & caveats
- The repo includes at least one large PDF (`Wiring diagram for ME-SFI [ME]...pdf`) — treat binary files as large assets. Avoid editing them directly.
- Many pages expect client-side behavior from `script.js` (expand/collapse, breadcrumbs behavior). If missing, implement minimal JS that preserves ids/classes used (`expand-all`, `collapse-all`, `.data-table`, `.breadcrumbs`).

## When to ask the maintainer
- If you need the original theme assets or the root `index.html` (they are referenced but not present), ask whether those should be restored or reimplemented.

## Quick checklist for PRs from an AI agent
- Keep changes small and focused (one topic or one global asset per PR).
- Update only the HTML and assets necessary; preserve existing relative paths.
- Include a brief PR description mentioning which directories/pages were touched and why.

If anything here is unclear or you want more examples (breadcrumb edits, asset restoration, or a sample `script.js`), tell me which area to expand.
