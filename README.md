# Daramola Femi — portfolio

A React and TypeScript portfolio with light and dark themes in warm paper, charcoal, and vermilion; self-hosted typography; responsive project filtering; and an accessible contact form.

## Local development

Node.js 22.12+ (or 24 LTS).

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run preview
npm test
```

Browser tests use installed Google Chrome and the production build with deployment headers. Run `npm run build` before `npm test`.

The root directory is the application. The unused nested Vite starter and obsolete HTML-era CSS/JavaScript have been removed. Original images remain in `Images`; only the résumé and selected project images are shipped in `public/Images`.

## Content

Edit projects in `src/data/projects.ts`. Harmattan uses the original desktop screenshot supplied in the project archive, without a colour filter. Browser chrome is hidden by the image container. Both résumé links serve the supplied two-page PDF from `public/Images/CV.pdf`. Generic testimonials, unverified numerical claims, and projects without live links have been removed from the public presentation.

Motion handles the hero entrance; CSS handles the orbital mark and hover details; Lenis adds desktop wheel smoothing. Reduced-motion preferences disable nonessential animation. Mobile keeps native scrolling. Additional animation engines would duplicate this functionality.

## Deployment

Vercel: use repository root, Vite, `npm run build`, and `dist`. `vercel.json` supplies security headers. Netlify/Cloudflare Pages can use the included `_headers`. Other hosts must configure equivalent HTTP headers. Do not deploy the repository directory as static content; deploy only `dist`.

The existing Formspree endpoint is retained. Validate its ownership, allowed origins, spam controls, and delivery in the Formspree dashboard before production. Local verification mocks submission so it does not send messages. No API keys or secrets belong in frontend code. Vite-prefixed environment values are public.

## Contributor attribution

Repository history is attributed to Daramola Femi using the existing GitHub identity `68006992+DaramolaFemi@users.noreply.github.com`. Historic Claude/Anthropic co-author trailers are removed as part of the requested attribution cleanup. This changes commit IDs but preserves committed file trees. A backup bundle is kept outside the repository before rewriting history.

`scripts/clean-contributor-history.sh` creates a separate review clone and removes Claude co-author trailers without pushing. Publishing rewritten history requires an explicit lease against the reviewed remote commit so concurrent changes cannot be overwritten. GitHub contributor summaries can take time to refresh.

## Identity and themes

The custom F mark and vector Femi lettering live in `src/components/Logo.tsx`; `public/favicon.svg` uses the same mark. The header switch follows the system theme on the first visit and stores an explicit choice locally. `public/theme.js` applies the preference before the first paint under the existing CSP. Storage restrictions do not prevent toggling.

Bouldwood is the lead project and links to its live HTTPS site. Cedius replaces LexDesigns, uses the supplied screenshot, and is labelled not yet hosted. Its walkthrough link leads to contact. Project filter counts are derived from the project data.

Desktop arrows are curved SVGs and are hidden on touch devices and screens narrower than 1024px. Each project has one circular link, with a text label on mobile. Main navigation and footer links do not use arrows. Form controls use 16px text to avoid iOS focus zoom; native browser zoom remains available. Dark mode uses plum, rose, and ivory, separate from Bouldwood’s green palette. Scroll reveals use Motion, while Lenis runs only on wide screens with a fine pointer and no reduced-motion preference. The contact form does not sit inside a transformed reveal container.
