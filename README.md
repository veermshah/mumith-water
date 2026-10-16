# Mumith Water — pre-launch landing page

Landing page for **Mumith Water**, an early-stage idea for water bottles made from plant-based materials designed to break down, funded by sponsors whose branding goes on the label. The company has not launched and has no suppliers, partners or customers — the site says so.

All factual claims on the site come from [`RESEARCH.md`](./RESEARCH.md) and are cited inline, linking to the numbered **Sources** list in the footer.

## Stack

- Next.js 16 (App Router, Cache Components) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- Framer Motion (scroll reveals, count-ups)
- React Three Fiber + drei (procedural 3D bottle)
- Supabase (form submissions) via Next.js Server Actions

## Getting started

Requires Node.js 20.9+ (tested with Node 22).

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase values
npm run dev                  # http://localhost:3000
```

The site runs without Supabase configured — forms will show a friendly "not set up yet" error instead of saving.

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com/dashboard) (the free tier is enough).
2. Open **SQL Editor**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and run it. This creates:
   - `waitlist` — `name`, `email` (unique), `use_case` (`campus` | `gym` | `events` | `other`, optional)
   - `sponsor_leads` — `name`, `company`, `email`, `company_size`, `bottle_quantity`, `message`

   Row Level Security is enabled with **insert-only** policies for the `anon` role, so the public key can add rows but never read them. View submissions in the Supabase **Table Editor**.
3. In **Project Settings → API**, copy the project URL and the `anon` / publishable key into `.env.local`:

   ```env
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```

   These are only read on the server (Server Actions), so they are not prefixed with `NEXT_PUBLIC_`.

## Scripts

```bash
npm run dev     # dev server
npm run lint    # ESLint
npx tsc --noEmit
npm run build   # production build
npm start       # serve the production build
```

## Deploying to Vercel

1. Push this repo to GitHub and import it at [vercel.com/new](https://vercel.com/new) — the Next.js preset needs no changes.
2. Add `SUPABASE_URL` and `SUPABASE_ANON_KEY` under **Settings → Environment Variables** (Production and Preview).
3. Deploy. The page is statically prerendered; form submissions run as Server Actions.

## Project structure

```
src/
  app/
    page.tsx              # composes the sections
    actions.ts            # joinWaitlist / registerSponsor server actions
  components/
    bottle/               # 3D bottle: lathe profile, label CanvasTexture, particles, SVG fallback
    sections/             # hero, problem, how-it-works, sponsors, materials, water, faq, footer
    forms/                # waitlist + sponsor forms (validation, honeypot, status)
  lib/
    content.ts            # all copy-level facts + their source ids
    label-designs.ts      # generic sponsor label designs drawn to canvas
    schemas.ts            # zod schemas shared by the forms
supabase/schema.sql       # tables + RLS policies
RESEARCH.md               # research notes, sources, open questions
```

### Notes on the 3D bottle

- `ProceduralBottle` builds the body and cap from `LatheGeometry` profiles in `components/bottle/profile.ts`. To swap in a `.glb`, replace that component — the views, label driver and scroll breakdown only depend on its `progress` prop.
- One shared `<Canvas>` renders every bottle view through drei `<View>`, so there is a single WebGL context. It's loaded lazily after first paint, with DPR capped at 2.
- Low-power devices (Save-Data, ≤2 GB memory, ≤2 cores), no WebGL, or a render error fall back to a static SVG bottle. `prefers-reduced-motion` disables auto-rotate and the particle breakdown.

### Spam protection

Both forms include a hidden `website` honeypot field. Submissions that fill it get a normal-looking success response but are not saved.
