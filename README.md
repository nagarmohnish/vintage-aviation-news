# Vintage Aviation News

A replica of the Vintage Aviation News website — preserving aviation heritage through digital media.

**Live:** https://nagarmohnish.github.io/vintage-aviation-news/

## Project Structure

```
/                          # GitHub Pages root (static site)
  index.html               # Homepage
  pages/                   # Sub-pages (restorations, warbirds, etc.)
  assets/                  # CSS, JS, images for the static site
  support/                 # Built React support page (committed)
  src/                     # React source for the support page
  support.html             # Vite dev entry point
```

The root serves a **static HTML site** via GitHub Pages.
The `support/` directory contains a **built React app** (source in `src/`).

## Development

```bash
npm install
npm run dev          # Vite dev server for support page
npm run build        # Build support page to support/
```

After building, rename `support/support.html` to `support/index.html` and copy as `support/404.html` for SPA routing.

## Deployment

Push to `master`. GitHub Pages serves from the repository root.
