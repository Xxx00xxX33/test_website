# StarVoyage Travel | 星途旅行

A trilingual (Simplified Chinese, Traditional Chinese, English) showcase website for a family-run travel agency specializing in custom tours for Singaporean Chinese families, with a focus on senior travelers.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 |
| Backend/CMS | Strapi 5 (TypeScript) |
| Data Flow | Frontend fetches from Strapi Content API |
| Styling | Tailwind CSS with custom warm/primary color theme |

## Project Structure

```
test_website/
├── frontend/          # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/         # Locale-based routing
│   │   │   │   ├── page.tsx      # Home page
│   │   │   │   ├── about/       # About page
│   │   │   │   ├── services/    # Services page
│   │   │   │   ├── destinations/ # Destinations list + detail
│   │   │   │   ├── faq/         # FAQ page
│   │   │   │   ├── contact/     # Contact page
│   │   │   │   └── legal/[slug]/ # Legal pages
│   │   │   ├── layout.tsx       # Root layout
│   │   │   └── globals.css      # Global styles + Tailwind
│   │   ├── components/
│   │   │   ├── blocks/          # Dynamic Zone block components (12 types)
│   │   │   ├── layout/          # Header, Footer, LanguageSwitcher
│   │   │   └── ui/              # Reusable UI components
│   │   └── lib/
│   │       ├── i18n.ts          # i18n configuration & locale detection
│   │       ├── strapi.ts        # Strapi API client & types
│   │       └── fallback-data.ts # Fallback data when Strapi is offline
│   └── ...
├── backend/           # Strapi CMS application
│   ├── src/
│   │   ├── api/               # Content type definitions
│   │   │   ├── site-setting/  # Site-wide settings (single type)
│   │   │   ├── navigation/    # Navigation menus (single type)
│   │   │   ├── home-page/     # Home page (single type)
│   │   │   ├── about-page/    # About page (single type)
│   │   │   ├── services-page/ # Services page (single type)
│   │   │   ├── destination/   # Destinations (collection type)
│   │   │   ├── faq/           # FAQs (collection type)
│   │   │   ├── testimonial/   # Testimonials (collection type)
│   │   │   ├── contact-page/  # Contact page (single type)
│   │   │   └── legal-page/    # Legal pages (collection type)
│   │   └── components/
│   │       ├── blocks/        # Dynamic Zone components (12 types)
│   │       └── shared/        # Shared components (SEO, nav items, etc.)
│   └── ...
└── README.md
```

## Features

### Multilingual Support (3 Locales)
- **zh-hans** — Simplified Chinese (default/source language)
- **zh-hant** — Traditional Chinese
- **en** — English

### Routing
- Independent URL paths: `/zh-hans`, `/zh-hant`, `/en`
- Language switcher maintains current page context
- Cookie-based language preference memory
- Auto-detection from `Accept-Language` header on first visit to `/`
- SEO `x-default` hreflang on root path

### CMS-Driven Content
- All page content is managed through Strapi CMS
- **Dynamic Zones** enable drag-and-drop module reordering
- 12 block types for flexible page composition:
  1. Hero Banner
  2. Brand Introduction
  3. Service Highlights
  4. Process Steps
  5. Featured Destinations
  6. Image + Text
  7. Testimonials Section
  8. FAQ Section
  9. Contact CTA
  10. Gallery / Video
  11. Multi-Column Layout
  12. Rich Text

### Content Model Design
- Shared fields (images, videos, sort order) maintained once across locales
- Text content maintained per locale
- Simplified Chinese as the source language

### Pages
1. **Home** — Modular landing page with hero, features, destinations, testimonials, FAQ, CTA
2. **About Us** — Company story, values, team
3. **Services** — Service features, process, scope
4. **Destinations** — List view + detail pages with sidebar
5. **FAQ** — Accordion-style Q&A
6. **Contact** — Inquiry form + contact info sidebar
7. **Legal** — Privacy policy, terms, disclaimer

### Fallback Data
- Built-in fallback content ensures the frontend renders properly even when Strapi is not running
- All three languages have complete fallback data

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Backend (Strapi)

```bash
cd backend
npm install
npm run develop
```

Strapi will start at `http://localhost:1337`. On first run:
1. Create an admin account
2. Go to Settings → Internationalization → Add `zh-Hans` and `zh-Hant` locales
3. Go to Settings → API Tokens → Create a token (optional, for authenticated access)
4. Go to Settings → Users & Permissions → Public role → Enable `find` and `findOne` for all content types

### Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
# Edit .env.local with your Strapi URL and token
pnpm install
pnpm dev
```

Frontend will start at `http://localhost:3000`.

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_STRAPI_URL` | Strapi backend URL | `http://localhost:1337` |
| `STRAPI_API_TOKEN` | Strapi API token (optional) | — |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for SEO | `http://localhost:3000` |

## Content Management Workflow

### For Non-Technical Users

1. **Login** to Strapi admin panel at `http://localhost:1337/admin`
2. **Edit content** in the Content Manager
3. **Switch locale** using the locale dropdown in the editor
4. **Reorder modules** by dragging Dynamic Zone blocks
5. **Preview** changes before publishing
6. **Publish** when ready

### Multilingual Content Tips
- Start with Simplified Chinese (source language)
- Use "Fill in from another locale" to copy content as a starting point
- Images, videos, and module order are shared — only update text per locale
- Save as draft to preview before publishing

## Design Philosophy

- **Warm & Trustworthy** — Earthy orange/amber primary colors, soft backgrounds
- **Senior-Friendly** — Large text, clear contrast, simple navigation
- **Mobile-First** — Responsive design with mobile hamburger menu
- **WhatsApp Integration** — Prominent WhatsApp buttons throughout
- **Professional** — Clean layout, consistent spacing, quality typography

## License

Private — All rights reserved.
