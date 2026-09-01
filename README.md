# Sunrise Public School — Next.js Website

Static HTML se convert kiya gaya Next.js 16 (App Router + TypeScript + Tailwind v4) project. UI redesign kiya gaya hai: Fraunces (headings) + Inter (body) typography, indigo/marigold/teal palette, hand-drawn marker underline, scroll-reveal animations, aur fully responsive mobile menu.

## Run locally

```bash
npm install
npm run dev
```
Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Structure

- `src/app/` — pages: home, about, academics, admissions, contact, gallery
- `src/components/` — Navbar, Footer, Reveal (scroll animation), forms, illustration
- `src/app/globals.css` — design tokens (colors, fonts) and small custom utilities

## Notes

- Gallery images are emoji placeholders — replace `.aspect-4/3` tiles with real `<Image>` components.
- Contact/Admissions forms are client-side demo only (no backend) — wire to an API route or email service to actually receive submissions.
