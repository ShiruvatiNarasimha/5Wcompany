# 5W Company — website

The landing page for 5W Company. Next.js 16 (App Router, static), React 19,
TypeScript and Tailwind CSS 4. No other runtime dependencies.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static production build
npm run lint
```

## Before launch: content to confirm

The current site (5wcompany.com) could not be reached while this redesign was
built, so **all copy is derived only from the company name** and the five
questions it stands for. It contains no customers, metrics, testimonials,
logos or claims that would need evidence.

Every word lives in [`src/content/site.ts`](src/content/site.ts). Check these
first:

| Item                  | Where                          | Notes                                                                    |
| --------------------- | ------------------------------ | ------------------------------------------------------------------------ |
| Contact email         | `site.email`                   | Placeholder `hello@5wcompany.com`. Used by the CTA, footer, copy button. |
| Positioning statement | `site.hero.lede`               | Replace with 5W's own description of what it does.                       |
| Method and principles | `questions`, `site.principles` | Written as a working method; adjust to how 5W actually works.            |
| Domain                | `site.url`                     | Used for canonical URL, sitemap, robots and share image.                 |

## The page

One argument, in order: **what 5W is → the problem → the method → the
principles → the artifact → the next step.**

| Section    | Component                           | Purpose                                                     |
| ---------- | ----------------------------------- | ----------------------------------------------------------- |
| Hero       | `hero.tsx`                          | Statement, positioning, CTA, index of the five questions.   |
| Approach   | `approach.tsx`                      | The problem: what goes wrong when each question is skipped. |
| Method     | `method.tsx`, `method-sequence.tsx` | The five questions; sticky index tracks the one in view.    |
| Principles | `principles.tsx`                    | Four working rules, as a ruled table.                       |
| The brief  | `brief.tsx`                         | The artifact the method produces, typeset as a document.    |
| Contact    | `contact.tsx`, `copy-email.tsx`     | Email CTA with copy-to-clipboard.                           |

Shared pieces live in `src/components/ui/` (button, section rule, logo,
icons). Only four components ship JavaScript: the navigation, the method
sequence, the copy button and a single page-wide reveal observer.

## Design system

Tokens are defined once in [`src/app/globals.css`](src/app/globals.css) and
exposed as Tailwind utilities. Tailwind's default palette is removed, so only
brand colors exist.

- **Type.** Newsreader (variable, optical size) for display, so headlines get
  the display cut automatically. Geist for text and UI. Geist Mono for running
  heads and indices. Fluid scale: `text-display`, `text-headline`,
  `text-title`, `text-heading`, `text-lede`, `text-body`, `text-meta`.
- **Color.** Warm paper, near-black ink, and a night palette for inverted
  sections. One accent, proofreader's vermilion (`accent`), reserved for marks,
  focus and state, never large fills. `accent-ink` is the AA-safe version for
  small text.
- **Structure.** Every section opens with a ruled running head
  (`SectionRule`). Hairlines, not cards, separate content. Radius is 4px for
  controls and 6px for the one document surface.
- **Logo.** The 5W monogram is the outline of Newsreader (opsz 72, wght 600),
  stored as a path in `ui/logo.tsx` and reused by the favicon, Apple icon and
  share image.

## Motion

Motion is limited to transform and opacity, and is purposeful:

- Hero words rise from masks on first paint (CSS only, no JavaScript).
- Content reveals once as it enters the viewport. A single
  `IntersectionObserver` sets `data-revealed`, and CSS does the rest.
- The method index crossfades as you read, and the navigation follows the
  section under it, including switching to the night palette over dark
  sections.

Nothing moves under `prefers-reduced-motion`, and nothing is hidden when
JavaScript is unavailable. Reveals are gated on `@media (scripting: enabled)`.

## Accessibility

Semantic landmarks and a single h1 with ordered headings. A skip link, visible
focus rings and in-page navigation with `aria-current`. The mobile menu is a
disclosure: the page behind is `inert`, the menu closes on Escape and focus
returns to the toggle. Text meets WCAG AA contrast. The exception is the
method steps that aren't in view on desktop, which are dimmed on purpose and
return to full contrast on hover, on focus, or when scrolled to.
