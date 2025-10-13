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

