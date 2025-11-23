# DentaDo (Showcase Dental Clinic Site)

A modern, responsive, accessibility‑minded demo website for a fictional dental clinic. Built as a portfolio piece to demonstrate clean semantic HTML, structured CSS architecture, subtle motion, theme toggling, dynamic data loading, and form handling with progressive enhancement.

## Features
- Modern hero with gradient & stats counters (static values)
- Services, About, Team, Testimonials, Booking, Contact sections
- Responsive layout (CSS Grid & Flex) with mobile navigation drawer
- Dark / light theme toggle (persisted via localStorage)
- IntersectionObserver reveal animations for scroll‑based entrance
- Accessible semantic landmarks & ARIA attributes
- Dynamic testimonials loaded from JSON (`assets/data/testimonials.json`)
- Booking form with client-side validation and toast feedback
- Reusable UI tokens (CSS variables) & gradient brand accent
- Lightweight (no frameworks) and deployable as static assets

## Structure
```
DentaDo_2/
  index.html
  assets/
    css/style.css
    js/main.js
    data/testimonials.json
    img/logo.svg
```

## Getting Started
Simply open `index.html` in a browser.

### Optional Local Dev (Live Reload)
If you want live reload while editing, install a lightweight server (Node required):
```powershell
npm init -y
npm install --save-dev live-server
npx live-server .
```

## Customization Ideas
- Replace Unsplash image URLs with original images
- Add real service detail pages or modals
- Integrate a backend for appointment requests
- Animate stat counters from 0 → value with IntersectionObserver
- Add localization support (multi-language toggle)

## Accessibility Notes
- Landmarks: header, nav, main, sections with `aria-labelledby` referencing internal headings.
- Focus styles preserved with `:focus-visible`.
- Color contrast uses a near-neutral palette; gradients only for decorative text.
- ARIA live region for toast notifications.

## Performance Notes
- No blocking scripts; JS deferred.
- Fonts loaded from Google (could self-host for privacy/perf).
- Minimal DOM depth and single request for testimonials JSON.

## Deployment
Static hosting options (drag & drop):
- GitHub Pages
- Netlify / Vercel (no build step needed)
- Cloudflare Pages

## License
This is a demo/portfolio artifact. You may adapt freely for showcasing purposes.

---
Made with care to highlight frontend fundamentals and UX polish.
