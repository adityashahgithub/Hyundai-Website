# Hyundai Website

Responsive, static Hyundai showcase built with HTML, CSS, and vanilla JS. Includes model listings, EV highlights, service and dealer info, offers, testimonials, and test-drive/contact forms.

## Quick Start
1) Clone and open the folder in VS Code (or any editor).
2) Recommended: use a local web server so relative assets load correctly:
	- VS Code extension: “Live Server” → right-click `index.html` → “Open with Live Server”, or
	- Python: `python3 -m http.server 5500` then open `http://localhost:5500/`
3) Browse pages starting at `index.html`.

## Project Structure
- `index.html` home; other pages: `models.html`, `ev.html`, `services.html`, `offers.html`, `dealers.html`, `test-drive.html`, `testimonials.html`, `about.html`, `contact.html`, `404.html`
- `css/` page-specific styles plus shared `base.css`
- `js/` page scripts (nav, sliders, forms, data loading, validation)
- `data/cars.json` model data feeding model/EV/test-drive flows
- `images/` hero, model, and illustration assets (AVIF preferred)

## Environment & Tools
- No build step; pure static assets
- Optional: Live Server (VS Code) or any static file server
- Node/Python/Ruby/etc. not required unless you prefer their simple servers

## Forms & Validation
- Contact form: front-end validation for name/email/phone/message; shows inline errors and success toast.
- Test drive: multi-step form with summary and confirmation modal; validates phones (10-15 digits, optional country code).
- Model detail modal form: simple client-side submit + reset.
- All forms are front-end only; wire to your backend/API as needed.

## Data & Assets
- Models sourced from `data/cars.json`; update IDs, names, specs, and images there.
- Images use `.avif`; provide fallbacks if you need broader browser support.

## Customization Tips
- Colors/typography: `css/base.css` (CSS variables).
- Navigation: header in each page; shared behavior in `js/common.js`.
- Car data: edit `data/cars.json`; ensure matching images exist in `images/`.

## Deployment
- Host on any static host (GitHub Pages, Netlify, Vercel, S3/CloudFront, Azure Static Web Apps).
- Ensure correct base path; adjust asset URLs if deploying to a subpath.

## Known Gaps / Next Steps
- Add backend endpoints for form submissions (contact, test-drive, modal).
- Add favicon, robots.txt, sitemap.xml, and structured data (Schema.org) for SEO.
- Consider WebP fallbacks for images and lazy loading for non-critical media.

## License
Academic project; no explicit license provided. Add one if you plan to distribute.
