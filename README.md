# SafeCare Clinix Hospital

A multi-page marketing website for SafeCare Clinix Hospital: services, health education and contact.

## Pages

- **Home:** facility tour (reception, consultation room, operating theatre, laboratory, diagnostic imaging) with video.
- **Services:** critical care, general surgery, cardiothoracic surgery and more.
- **Education:** health articles (e.g. high blood pressure, adult vaccinations).
- **Contact:** a validated enquiry form and operating hours.

## Tech stack

Vite 5, React 18, TypeScript, Tailwind CSS 3, shadcn/ui, React Router, React Query, Framer Motion, react-hook-form with Zod. Tests use Vitest and Playwright.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run build      # production build into dist/
npm run preview    # serve the production build
npm test           # unit tests (Vitest)
```

## Project structure

```
src/
  pages/        Index, Services, Education, Contact, NotFound
  components/   Navbar, Footer, shared UI (shadcn/ui under components/ui)
  assets/       images
public/videos/  facility videos
```
