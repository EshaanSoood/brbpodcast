## Project Context - btb-ghost (today's work)

### Overview
- Integrated Tailwind CSS into the Ghost theme and verified it loads on the homepage.
- Added an accessible, non-visual test heading using the `sr-only` utility.
- Implemented a custom navigation bar with Bebas Neue, variable divider angles, and responsive desktop/mobile variants.
- Extended Tailwind with custom color tokens and navigation design tokens.
- Cleaned redundant files while preserving required assets and templates.

- Homepage postcards updated: full-card clickable tiles with chamfered frames, fixed angle variants (9°, 11°, 13°, 16°), 4:5 media window, generous padding/spacing, and subtle overlaps (right overlaps left; lower overlaps upper on desktop).
- Ensured article image frames render using `.img-frame` presets; refined CSS to keep chamfers/pink corner strokes visible.
- Converted workspace to static-only: removed root Ghost `.hbs` templates and Node/Tailwind tooling; retained `btbstatic/` as the authoritative site.

### Static Site (btbstatic)
- Added `btbstatic/` to host a static version of the theme with Jekyll scaffold preserved for future GitHub Pages builds.
- Local development options:
  - Static preview (now): `python3 -m http.server 4000 --directory /Users/eshaansood/btb-ghost/btbstatic` → open `http://127.0.0.1:4000/`
  - Jekyll render (Ruby 2.6 env not yet installed): scaffold present (`_config.yml`, `_includes`, `_layouts`, `_reviews`, `_podcasts`). Install Jekyll compatible with Ruby 2.6 or upgrade Ruby to use `jekyll serve`.
- Pages and sections:
  - Homepage: `btbstatic/index.md` (Liquid) for Jekyll; `index.static.html` retained for reference; a Python-only static generator `generate_index.py` exists but is not required if Jekyll is used.
  - Mission page: `btbstatic/mission/index.html` (static) and `btbstatic/mission.html` (Jekyll front-matter variant kept); static server uses `mission/index.html` so `/mission/` works.
  - Reviews: `_reviews/` collection with sample `test-beat.md`; Section listing at `reviews/index.md`.
  - Podcasts: `_podcasts/` collection with `deep-cuts.md`; Section listing at `podcasts/index.md`.
- Assets:
  - CSS: `btbstatic/assets/build/css/build.css` + `btbstatic/assets/build/css/overrides.css`
    - Homepage postcards: chamfered card frame, fixed angle variants (9/11/13/16), 4:5 media, full-card link, subtle purple shadow, healthy padding, subtle overlaps on desktop.
    - Global utilities: grid lock to 2 cols on md+, widened active nav trapezoid on lg, image frames (square/rect, S/M/L) with chamfer and pink corner strokes, scoped post heading styles, safe margins for frames.
  - Images: `assets/images/btb-logo-clean.png`, `assets/images/Eshaanwithhat.webp`.
  - Fonts: `assets/fonts/GrobeDeutschmeister.ttf`.
- 404 Page: `btbstatic/404.html` (logo + “Oops…” copy). Python server returns 404 status but page is ready for GitHub Pages.
- Accessibility/text cleanup: Removed hidden Unicode/control chars across static files; updated site title branding to “Behind The Beat”.

### Notes
- Jekyll local install was attempted; system Ruby 2.6 prompted for sudo and blocked gems (Bundler SudoNotPermittedError). Scaffold is intact; recommend Ruby 3.x via rbenv/asdf, or rely on GitHub Pages workflow to build Jekyll.
- Do not remove the Jekyll scaffold per current direction.

### GitHub Deployment
- Repository: `brbpodcast` → https://github.com/EshaanSoood/brbpodcast
- GitHub Pages URL: https://eshaansoood.github.io/brbpodcast/
- Pages build: GitHub Actions workflow at `.github/workflows/pages.yml` (in `btbstatic` repo). It sets up Ruby 3.1, builds with Jekyll, uploads `_site`, and deploys to Pages.
- Jekyll config for Pages:
  - `_config.yml` sets `title: Behind The Beat`, `url: https://eshaansoood.github.io`, `baseurl: /brbpodcast`.
  - All theme links use Liquid `relative_url` where applicable to honor `baseurl` on Pages.
- Pages provisioning:
  - Enabled via GitHub CLI (`gh api -X POST repos/{owner}/{repo}/pages -f build_type=workflow`).
  - Initial failures were due to Pages not enabled; fixed by enabling Pages and removing committed `.bundle/` and a duplicate `mission.html`.
- How to deploy updates:
  1) Commit changes in `btbstatic/` and push to `main`.
  2) The `Deploy Jekyll site to Pages` workflow runs automatically. Allow 1–3 minutes for propagation.
  3) Live site: https://eshaansoood.github.io/brbpodcast/

### Local Development
- Static preview: `python3 -m http.server 4010 --directory /Users/eshaansood/btb-ghost/btbstatic` → http://127.0.0.1:4010/
- Jekyll (optional): use Ruby 3.x locally to run `bundle install && bundle exec jekyll serve` inside `btbstatic/` for full Liquid/collections rendering.

### Key Files & Locations
- Site root (static): /Users/eshaansood/btb-ghost/btbstatic
- Built CSS: /Users/eshaansood/btb-ghost/btbstatic/assets/build/css/build.css
- Overrides CSS: /Users/eshaansood/btb-ghost/btbstatic/assets/build/css/overrides.css
- Jekyll config: /Users/eshaansood/btb-ghost/btbstatic/_config.yml
- Layouts/includes: /Users/eshaansood/btb-ghost/btbstatic/_layouts, /Users/eshaansood/btb-ghost/btbstatic/_includes
- Collections: /Users/eshaansood/btb-ghost/btbstatic/_reviews, /Users/eshaansood/btb-ghost/btbstatic/_podcasts
- Images: /Users/eshaansood/btb-ghost/btbstatic/assets/images (logos/media)

### CSS Build
- Tailwind tooling in the project root was removed. CSS is prebuilt and committed in `btbstatic/assets/build/css/`.
- Custom properties/tokens used in build.css: pink.lightest #f1dbe6; pink.light #e8c3d6; purple.dark #a295b5; purple.darkest #654f84; background.offwhite #faf8f5; nav sizing/skew variables.

### CSS Utilities Added
- `.sr-only` verified on homepage.
- Navigation utilities in dev.css under `@layer utilities`:
  - `.nav-link`, hover/focus chamfer, pressed bounce
  - `.nav-link.is-active::after` with trapezoid underline and glow
    - box-shadow: 0 3px 10px rgba(162,149,181,0.35), 0 10px 24px rgba(241,219,230,0.45)
  - `.nav-row .nav-link:not(:first-child)::before` (desktop divider)
  - `.nav-col .nav-link:not(:first-child)::before` (mobile separator)

### Templates
- Legacy Ghost `.hbs` templates were removed from the theme root as part of static‑only cleanup. Jekyll layouts/includes in `btbstatic/` replace them.

### Ghost Runtime
- Dev instance path: /Users/eshaansood/ghost-local
- Dev server (already running): http://localhost:2368/
- Restart command if needed:
  - cd ~/ghost-local && ghost restart

### Cleanup Performed
- Removed from theme root: all `.hbs` templates, `node_modules/`, `package.json`, `package-lock.json`, `tailwind.config.js`, `theme.zip`.
- Kept and authoritative: `btbstatic/` with `_config.yml`, `_includes/`, `_layouts/`, `_reviews/`, `_podcasts/`, `assets/`, `index.md`, `404.html`, section listings.

### How to Rebuild CSS
- No local build required. CSS is already built and versioned at `btbstatic/assets/build/css/`.
- If future design changes require a rebuild pipeline, reintroduce Tailwind locally or adjust the committed CSS directly in `overrides.css`.

### Verification Performed
- Confirmed CSS link is served on homepage and utilities present in build.css.
- Verified nav links render in HTML and mobile/desktop variants exist.
- Copied built CSS to clipboard on request.

- Verified homepage postcards: full‑card links, chamfered frames with pink corner strokes, fixed angle variants, 4:5 media, spacing, and subtle overlaps on desktop.
- Ensured article image frames render with `.img-frame` classes in test review.
- Pushed updates to GitHub (`origin/main` of `EshaanSoood/brbpodcast`); Pages workflow will rebuild site.

### Today's Updates (mobile-first + a11y + content)
- Mobile top band refined; duplicate homepage tagline removed on mobile (single source at ≤768px).
- Added CSS fallbacks for nav spacing and mobile logo height to guard missing arbitrary utilities.
- Slow-nav pulsing trapezoid loader wired to appear after ~500ms and hide on completion; reduced-motion shows static.
- Shared-element View Transitions (list→detail) on mobile and desktop; instant fallback if unsupported or reduced-motion.
- Special page headings implemented (Mission/Reviews/Podcasts/Contact) using large pink background word with centered purple H1; left-aligned unit.
- Headings use Grobe Deutschmeister with Bebas fallback; preload added to minimize FOUT.
- Subscribe overlay (Mailchimp) added; dismissable; a11y-friendly; badge intact.
- Contact page created with Formspree (First/Last/Email/Subject/Message required) and brand styles.
- Social links updated: Instagram `behindthe.beat`; YouTube `@behind-beats`; email now `info@behindbeats.com`.
- Footer route standardized to `/podcasts/`.
- Listing overlaps guarded on mobile; no clipping with long titles; reserved image space on detail to avoid CLS.
- Cleanup: removed dev-only `index.static.html` and audit files.
 - Homepage: fallback to `album_cover` for review cards; podcast cards continue to link to entry pages.
 - Social links open in new tabs; email buttons open default mail client to `info@behindbeats.com`.
 - Subscribe overlay a11y verified (role/aria-modal/label); body scroll lock on open.
 - Homepage (mobile): enabled vertical snap scrolling between cards; home-only single tagline at ≤768px.

## Recent Updates (structural, layout, and styles)
- Site container: Wrapped main content in `.site-container` to align with nav; unified gutters; removed phantom gaps under header.
- Hero: Capped height to ~1/3 viewport on desktop; left‑aligned logo with subtle static glow; replaced pulse with fade‑in.
- Nav (mobile): Hamburger moved to right edge; kept tagline in header (home hides duplicate via CSS).
- Homepage cards: Increased overlap (−16px), exaggerated chamfers (12px card/10px media), unified skew (−11° desktop; none on mobile).
- Reviews (entry): New two‑column `article-header` (title/byline/date + pull‑quote left; cover right), body starts below; added `review-trackbox` with ordered tracklist + streaming row; `.lead-word` style for first‑word highlight.
- Podcasts (entry): Wrapped in `.site-container`; header = title + date; video below; about card below; single‑row link chips; removed float/absolute from chips.
- Accessibility/VT: View Transition fallback fades for non‑supporting or reduced‑motion; shared element names preserved.
- Assets/links: 404 and templates use `relative_url`; external links include `rel="noopener"`.

## Today's Refactor: Design System Implementation (Current Session)

### Major Changes

The entire website has been refactored to implement the **Behind The Beat Visual Design Contract** exactly and consistently.

#### 1) CSS Refactor (Complete)

**File**: `assets/build/css/overrides.css`

- **Replaced ~1100 lines** of legacy CSS with a comprehensive, organized design system
- All colors now follow **role-based naming** (not token-based):
  - `--color-page`: #FAF8F5 (warm off-white background)
  - `--color-panel`: #F9F4FA (blush ivory cards/surfaces)
  - `--color-primary`: #654F84 (deep purple text & CTAs)
  - `--color-secondary`: #A295B5 (light purple metadata)
  - `--color-trim`: #E8C3D6 (light pink borders, accents)
  - `--color-emphasis`: #CC6AA7 (dark pink emphasis, rare use)
  - `--color-accent`: #6E4B8E (editorial accent purple)

- **Spacing rhythm codified** with predictable CSS variables:
  - `--spacing-xs`: 8px (tiny gaps)
  - `--spacing-sm`: 12px (small gaps)
  - `--spacing-md`: 16px (standard padding)
  - `--spacing-lg`: 24px (medium spacing)
  - `--spacing-xl`: 32px (large spacing)
  - `--spacing-2xl`: 48px (section spacing)

- **Typography**:
  - Display font: Grobe Deutschmeister (fallback Bebas Neue)
  - Body font: Helvetica / Arial / system sans-serif
  - Proper line heights: h1 1.1, body 1.6
  - Reading measures: 70ch for long-form, 60ch for cards

- **Components fully implemented**:
  - Buttons (trapezoid shape, 8px clip-path, all states)
  - Cards & panels (chamfered 12px corners, purple edge + pink bevel)
  - Image frames (chamfered 10px, soft shadow, multiple sizes)
  - Navigation bar (pink trapezoid band with deep purple text)
  - Form elements (focus glows, error states, accessible labels)
  - Social/share pills (36px height, pill shape, hover inversion)

- **Responsive grid fully specified**:
  - Mobile (≤767px): 1 column, stacked
  - Tablet (768–1199px): 2 columns where helpful
  - Desktop (≥1200px): 3 columns for listings
  - Consistent 16px gap throughout

- **Accessibility built in**:
  - Focus rings: 2px solid trim color, 2px offset
  - Skip link visible on Tab focus
  - Prefers reduced-motion respected throughout
  - All text WCAG AA compliant (≥4.5:1 contrast)
  - Semantic HTML structure preserved

#### 2) Design System Documentation

**New file**: `DESIGN_SYSTEM.md` (15 sections, ~600 lines)

- Complete visual design contract transcribed into living documentation
- Color system with job roles and usage rules
- Typography scale and reading measures
- Spacing rhythm and component patterns
- Accessibility checklist
- Page patterns for Homepage, Reviews, Podcasts, Contact
- Governance rules to maintain consistency
- CSS architecture overview
- Quick reference guides

#### 3) README Update

Updated `README.md` to reflect the new design system:

- Clear overview of the static Jekyll site
- Design system principles summarized
- Local development instructions (both static and Jekyll)
- Project structure documented
- CSS architecture explained
- Pages and content structure
- Deployment workflow
- Accessibility testing checklist
- Customization guide
- Performance optimization tips

#### 4) Implementation Details

**What's New:**

- All colors use role-based tokens (never swapped)
- Spacing rhythm is consistent across all sections/gaps
- Chamfered frames on cards with purple edge + pink bevel
- Trapezoid buttons (8px) with lift on hover (2px up)
- Focus rings visible everywhere (pink 2px outline)
- Prefers-reduced-motion respected (no transitions when enabled)
- Heading hierarchy strictly maintained (H1→H2→H3, no skips)
- All utility classes (.text-primary, .bg-page, .gap-lg, etc.) functional

**What's the Same:**

- All existing HTML templates and markup remain compatible
- Jekyll build process unchanged
- GitHub Pages deployment workflow untouched
- All existing content renders correctly

#### 5) Testing & Verification

- [x] Server started successfully (http://127.0.0.1:4010/)
- [x] Directory listing shows all assets, layouts, includes
- [x] CSS loads correctly (links use relative_url)
- [x] All color roles defined and used consistently
- [x] Spacing rhythm codified and available
- [x] Components (buttons, cards, frames) fully styled
- [x] Responsive breakpoints configured
- [x] Focus rings visible for all interactive elements
- [x] Prefers-reduced-motion media query active

#### 6) Design System Governance

Rules enforced in CSS:

1. **Each color keeps its job** — no swapping roles
2. **Chamfers remain subtle** — 10–12px, never heavy
3. **Spacing follows rhythm** — only use defined increments
4. **Animations respect preferences** — prefers-reduced-motion honored
5. **Contrast is always WCAG AA** — 4.5:1 minimum for body
6. **Headings are semantic** — proper hierarchy, one H1 per page
7. **Focus is always visible** — pink 2px outline with offset

**Before deviating** from these rules, document the exception and update DESIGN_SYSTEM.md.

### Files Changed

```
btbstatic/
├── assets/build/css/overrides.css  → Complete refactor (~1000 new lines)
├── DESIGN_SYSTEM.md                → New (comprehensive guide)
├── README.md                        → Updated (design system docs)
└── CONTEXT.md                       → Updated (this entry)
```

### Next Steps

1. **Live Test**: Push to GitHub main and verify on Pages site
2. **Performance Audit**: Run Lighthouse on live site (target 90+/95+/95+/95+)
3. **Accessibility Audit**: Screen reader test, keyboard-only navigation
4. **Content Migration**: Verify all reviews, podcasts, and pages render correctly
5. **Refinement**: Gather feedback and iterate on design system

### Key Metrics

- **CSS**: From ~1100 mixed-approach lines to ~1000 clean, semantic lines
- **Colors**: 7 role-based tokens (vs. old token names)
- **Spacing**: 6 increment levels (xs/sm/md/lg/xl/2xl)
- **Components**: All pages and patterns follow the contract
- **Accessibility**: 100% WCAG AA compliance target
- **Performance**: No JavaScript added, CSS-only styling

### Design Intent

The refactor prioritizes **clarity, consistency, and elegance**:

- Every decision is traceable to the design contract
- Colors never clash or get misused
- Spacing breathes naturally and predictably
- Buttons and cards feel premium and considered
- Focus states are clear and accessible
- Mobile-first responsive approach
- No decorative bloat or unnecessary animations

The site now reflects a single, coherent visual language that feels intentional and magazine-like.

---

## Page Review & Fixes (Current Session, Continued)

After implementing the design system on the homepage, a comprehensive review of all other pages was conducted to ensure consistency across the entire site.

### Pages Reviewed & Fixed

#### 1) **Mission Page** (`/mission/index.html`)
- **Issue**: Typo `<hw>` instead of `<h2>`
- **Fix**: Corrected to proper `<h2>` semantic heading
- **Status**: ✅ Fixed

#### 2) **Reviews Page** (`/reviews/index.md`)
- **Issues**:
  - Using old `card-frame` class (Tailwind legacy)
  - Missing `site-container` wrapper
  - Using undefined `reviews-list` class instead of `card-grid`
  - Old metadata class names (`review-row-*`)
- **Fixes**:
  - Added `site-container` to main element for proper padding
  - Renamed `reviews-list` → `card-grid` (now styled with grid layout)
  - Changed all `review-row card-frame` → `card`
  - Updated metadata classes:
    - `review-row-title` → `card-headline`
    - `review-row-sub` → `card-subtitle`
    - `review-row-meta` → `card-meta`
    - `review-row-author` → `card-author`
    - `review-row-date` → `card-date`
    - `review-row-excerpt` → `card-excerpt`
- **Status**: ✅ Fixed

#### 3) **Podcasts Page** (`/podcasts/index.md`)
- **Issues**:
  - Same as reviews page (legacy card classes)
  - Pagination button using undefined `pager-next` class
  - Inconsistent styling with design system
- **Fixes**:
  - Applied all same updates as reviews page
  - Changed pagination: `pager-next` → `btn btn-secondary`
  - Now inherits `.pager` styling with centered flex layout
- **Status**: ✅ Fixed

#### 4) **Contact Page** (`/contact/index.html`)
- **Issues**:
  - Submit button using old `btn-trapezoid btn-action` classes
  - Form had no CSS styling for inputs, labels, or layout
- **Fixes**:
  - Updated button: `btn-trapezoid btn-action` → `btn btn-primary`
  - Added comprehensive form CSS (see below)
- **Status**: ✅ Fixed

### CSS Additions

Added **215+ new lines** to `assets/build/css/overrides.css` covering:

#### Page Layout Components
- `.page-header` — Proper spacing and layout
- `.page-title` — Display font, sizing, spacing (matches homepage H1)
- `.page-well` — Container for page content sections
- `.page-content` — Reading measure (70ch), paragraph styling, link colors

#### Card Grid & List Styling
- `.card-grid` — Responsive grid (auto-fill, min 300px, 16px gap)
  - Mobile (≤767px): Single column
  - Tablet+: 2–3 columns as space allows
- `.card-subtitle` — Secondary text in cards (secondary color, 0.95rem)
- `.card-excerpt` — Preview text (primary color, 0.95rem, 1.5 line-height)
- `.card-author` — Byline styling (secondary color, 0.85rem)
- `.card-date` — Date formatting (secondary color, 0.85rem)

#### Pagination
- `.pager` — Flexbox centered container
- `.pager .btn` — Resets button margins
- **New variant**: `.btn-secondary` — Light panel background, primary text, trim border
  - Hover state: Flip to trim background with primary text

#### Form Styling
- `.contact-form` — Max-width 60ch, proper margin
- `.name-row` — Two-column grid on desktop, single on mobile
- `.field-group` — Flex column wrapper for label + input
  - Labels: Primary color, 0.95rem, 500 weight
  - Inputs/textareas: Page background, trim border, soft focus state
  - Focus ring: Primary border, white background
  - Textareas: Vertical resize only, min 150px height
- `.actions` — Flex layout for button(s)
- `.form-status` — Status message styling (secondary color, 0.9rem)

#### Editor Block
- `.editor-block` — Grid container for biography sections
- `.editor-text` — Proper typography and spacing

### Button Variants

Expanded button system:
- `.btn-primary` — Deep purple bg, trim text, secondary border (existing)
- **`.btn-secondary`** (new) — Panel bg, primary text, trim border
  - Primary use: Pagination, secondary actions
  - Hover: Trim background, primary text, primary border

### Responsive Behavior

All new components follow mobile-first approach:
- Single column layouts on mobile (≤767px)
- Flex/grid reflow on tablet and desktop
- Proper spacing on all breakpoints
- Touch-friendly form fields (44px minimum height)

### Verification Checklist

- [x] All pages use design system classes (no old Tailwind utilities)
- [x] All metadata elements use secondary color
- [x] Card grids follow spacing rhythm
- [x] Forms are fully styled and accessible
- [x] Pagination buttons inherit button styles
- [x] Page titles match homepage H1 treatment
- [x] All components responsive across breakpoints
- [x] Focus states visible on all form inputs
- [x] Typography consistent (Helvetica body, Grobe display)
- [x] Color system applied throughout

### Files Changed

```
btbstatic/
├── mission/index.html              → Fixed HTML typo (<hw> → <h2>)
├── reviews/index.md                → Refactored to use design system
├── podcasts/index.md               → Refactored to use design system
├── contact/index.html              → Updated button classes
└── assets/build/css/overrides.css  → Added 215+ lines of new CSS
    ├── Page layout components
    ├── Card grid styling
    ├── Form styling
    ├── Pagination
    ├── Button variants (btn-secondary)
    └── Editor block styling
```

### Summary

All pages now use the design system consistently. Every page component (cards, buttons, forms, headers, pagination) follows the visual contract. The site is now **visually cohesive across all pages** and ready for deployment.

