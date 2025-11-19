## Purpose
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
