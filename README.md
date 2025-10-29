# Behind The Beat — Static Site

A clean, accessible, magazine-style website for Behind The Beat podcast & music reviews.

## Overview

This is a **static Jekyll site** hosted on GitHub Pages. The design follows a comprehensive visual design contract emphasizing clarity, accessibility, and elegant simplicity.

- **Live Site**: https://eshaansoood.github.io/brbpodcast/
- **Repository**: https://github.com/EshaanSoood/brbpodcast

---

## Design System

The site implements a rigorous **visual design contract** (see `DESIGN_SYSTEM.md` for full details).

### Core Principles

1. **Color System (By Job, Not Token)**
   - Page Paper: `#FAF8F5` (warm off-white)
   - Panels & Cards: `#F9F4FA` (blush ivory)
   - Primary Text: `#654F84` (deep purple)
   - Secondary Text: `#A295B5` (light purple)
   - Trim & Accents: `#E8C3D6` (light pink)
   - Emphasis: `#CC6AA7` (dark pink)

2. **Typography**
   - Display font: Grobe Deutschmeister (with Bebas Neue fallback)
   - Body font: Helvetica / Arial / system sans-serif
   - Reading measure: 60–70 characters for long-form, 45–60 for cards

3. **Spacing Rhythm**
   - xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px, 2xl: 48px
   - Predictable, breathing layouts with consistent increments

4. **Components**
   - **Buttons**: Trapezoid shape (8px clip), deep purple + trim colors
   - **Cards**: Chamfered frames (12px) with purple edge + pink bevel
   - **Image Frames**: Chamfered (10px) with soft purple shadow
   - **Navigation**: Pink trapezoid band with deep purple text

5. **Accessibility**
   - All text WCAG AA compliant (≥ 4.5:1 contrast)
   - Focus rings visible everywhere (2px solid pink)
   - Respects `prefers-reduced-motion`
   - Semantic HTML, proper heading hierarchy, skip link

---

## Local Development

### Quick Start

```bash
# Serve static files (for quick preview)
cd /Users/eshaansood/btb-ghost/btbstatic
python3 -m http.server 4010

# Visit http://127.0.0.1:4010/
```

### Full Jekyll Build (Optional)

If you want to render Liquid templates and collections locally:

```bash
# Install Ruby 3.x (recommended via rbenv or asdf)
ruby --version  # Should be 3.x

# Install dependencies
bundle install

# Serve with Jekyll
bundle exec jekyll serve

# Visit http://127.0.0.1:4000/
```

**Note**: Ruby 2.6 (system default on macOS) may have issues with bundler. Upgrade to Ruby 3.x for best results.

---

## Project Structure

```
btbstatic/
├── index.md              # Homepage (Liquid template)
├── _config.yml           # Jekyll configuration
├── _includes/            # Reusable template partials
│   ├── nav.html
│   ├── footer.html
│   └── subscribe.html
├── _layouts/             # Page templates
│   ├── default.html
│   └── entry.html
├── _reviews/             # Review collection
│   └── *.md
├── _podcasts/            # Podcast collection
│   └── *.md
├── assets/
│   ├── build/css/        # Compiled CSS
│   │   ├── build.css     # Tailwind base
│   │   └── overrides.css # Brand design system
│   ├── fonts/            # Custom fonts
│   └── images/           # Logo, etc.
├── contact/              # Contact form page
├── mission/              # Mission statement page
├── reviews/              # Reviews listing page
├── podcasts/             # Podcasts listing page
├── DESIGN_SYSTEM.md      # Design guidelines
├── CONTEXT.md            # Project context & history
└── README.md             # This file
```

---

## CSS Architecture

### Files

- **`assets/build/css/build.css`**  
  Base Tailwind CSS output (unchanged, kept for compatibility)

- **`assets/build/css/overrides.css`**  
  Complete brand design system: color tokens, components, utilities, responsive rules

### CSS Variables

All design tokens are defined as CSS custom properties:

```css
:root {
  --color-page: #FAF8F5;
  --color-panel: #F9F4FA;
  --color-primary: #654F84;
  --color-secondary: #A295B5;
  --color-trim: #E8C3D6;
  --color-emphasis: #CC6AA7;
  --color-accent: #6E4B8E;
  
  --spacing-xs: 8px;
  --spacing-sm: 12px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  
  --font-display: 'Grobe Deutschmeister', 'Bebas Neue', ui-sans-serif, system-ui, sans-serif;
  --font-body: Helvetica, Arial, ui-sans-serif, system-ui, sans-serif;
}
```

---

## Pages

### Homepage (`index.md`)

- Hero section with logo + welcome headline
- Intro paragraph (60 characters max)
- Grid of review & podcast cards (1 col mobile, 2 tablet, 3 desktop)
- Responsive card heights (full viewport minus header on mobile)

### Reviews (`reviews/`)

- Listing page: All reviews in a grid
- Entry page: Two-column layout (text left, cover right) with tracklist & streaming buttons

### Podcasts (`podcasts/`)

- Listing page: All podcasts with video thumbnails
- Entry page: 16:9 video player, about card, social/website links

### Other Pages

- **Mission** (`mission/`): Brand mission statement
- **Contact** (`contact/`): Formspree contact form
- **404** (`404.html`): Error page with logo & copy

---

## Adding Content

### New Review

Create a file in `_reviews/`:

```yaml
---
layout: entry
title: "Album Title"
author: "Your Name"
date: 2025-01-15
cover: /assets/images/cover.jpg
album_cover_alt: "Album artwork for…"
pullquote: "A memorable quote from the review"
---

# Your review content in Markdown

Pull-quotes, images, and links render with brand styles automatically.
```

### New Podcast

Create a file in `_podcasts/`:

```yaml
---
layout: entry
title: "Episode Title"
date: 2025-01-15
cover: /assets/images/thumbnail.jpg
youtube_id: "VIDEO_ID"
# OR
youtube_url: "https://www.youtube.com/embed/..."
guest_about: |
  ## Guest Bio
  Markdown-formatted biography
guest_website_url: "https://guest-site.com"
guest_socials:
  - label: "Instagram"
    url: "https://instagram.com/..."
  - label: "Twitter"
    url: "https://twitter.com/..."
---

## Episode Notes

Content in Markdown.
```

---

## Deployment

### GitHub Pages (Automatic)

1. Push changes to `main` branch
2. GitHub Actions workflow (`.github/workflows/pages.yml`) automatically builds & deploys
3. Site live at https://eshaansoood.github.io/brbpodcast/ within 1–3 minutes

**Workflow file:**
```yaml
.github/workflows/pages.yml
- Sets up Ruby 3.1
- Runs `bundle install && bundle exec jekyll build`
- Uploads `_site` to Pages
```

### Local Static Deployment

If deploying the static HTML directly (no Jekyll):

```bash
# Generate static HTML
jekyll build

# Upload `_site/` contents to your hosting
```

---

## Responsive Design

### Breakpoints

- **Mobile**: ≤ 767px (1 column, stacked)
- **Tablet**: 768–1199px (2 columns)
- **Desktop**: ≥ 1200px (3 columns for listings)

### Container

- Max width: 72rem (1152px)
- Mobile gutters: 16px
- Tablet+ gutters: 24px

---

## Accessibility

### Checklist

- [x] One `<h1>` per page
- [x] Proper heading hierarchy (H1 → H2 → H3)
- [x] Skip link (appears on focus)
- [x] Focus rings visible (2px solid pink, 2px offset)
- [x] All text WCAG AA compliant (≥ 4.5:1)
- [x] Semantic HTML (`<button>`, `<nav>`, `<main>`, etc.)
- [x] Respects `prefers-reduced-motion`
- [x] All interactive elements keyboard accessible
- [x] Form inputs have visible labels

### Testing

Test with:
- Keyboard only (Tab through all elements)
- Screen reader (NVDA, JAWS, VoiceOver)
- Color contrast analyzer (WebAIM, Contrast Checker)
- Browser DevTools lighthouse

---

## Customization

### Changing Colors

Edit `assets/build/css/overrides.css`:

```css
:root {
  --color-page: #FAF8F5; /* ← Change here */
  --color-primary: #654F84;
  /* … etc */
}
```

All components automatically use the new colors.

### Typography

Change font families in `overrides.css`:

```css
--font-display: 'Bebas Neue', sans-serif; /* heading font */
--font-body: 'Georgia', serif; /* body font */
```

Or update `_layouts/default.html` to load custom fonts.

### Spacing

Adjust spacing increments:

```css
--spacing-sm: 16px; /* was 12px */
--spacing-md: 20px; /* was 16px */
```

All components that use CSS variables adapt automatically.

---

## Building & Deployment Tips

### Jekyll Build Errors

**Error**: "Bundler SudoNotPermitted"
- **Fix**: Install Ruby 3.x via rbenv/asdf instead of using system Ruby

**Error**: "Permission denied @ rb_sysopen"
- **Fix**: Ensure `_site/` directory is writable: `chmod -R 755 _site/`

### CSS Not Loading

- Ensure links in `_layouts/default.html` use `relative_url` Liquid tag
- On GitHub Pages, check that `baseurl: /brbpodcast` is set in `_config.yml`
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Images Not Loading

- Use `relative_url` in Liquid: `{{ image.jpg | relative_url }}`
- Store images in `assets/images/` directory
- Use webp or jpg for photos (smaller file sizes)

---

## Performance

### Current Optimizations

- CSS minified in `build.css` and `overrides.css`
- Images lazy-loaded with `loading="lazy"`
- Fonts preloaded in `<head>`
- No third-party JavaScript bloat

### Lighthouse Scores (Target)

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

Test with: https://pagespeed.web.dev/

---

## Contributing

When adding new pages or components:

1. **Follow the color system** (see `DESIGN_SYSTEM.md`)
2. **Use CSS variables** for all colors, spacing, fonts
3. **Test accessibility** (focus rings, contrast, keyboard nav)
4. **Respect spacing rhythm** (8/12/16/24/32/48px)
5. **Use semantic HTML** (`<button>` not `<div role="button">`)
6. **Test on mobile** before pushing
7. **Update DESIGN_SYSTEM.md** if introducing new patterns

---

## Resources

- **Figma Design** (if applicable): [Link]
- **GitHub Issues**: https://github.com/EshaanSoood/brbpodcast/issues
- **Jekyll Docs**: https://jekyllrb.com/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

---

## Changelog

### v2.0 (Design System Refactor)

- Complete CSS refactor implementing visual design contract
- New color system with role-based tokens
- Comprehensive spacing rhythm (8/12/16/24/32/48px)
- Updated button styles (trapezoid shape, new hover states)
- Chamfered frames on cards and images
- Enhanced accessibility (focus rings, skip link, semantic HTML)
- Mobile-first responsive design (1/2/3 column grid)
- DESIGN_SYSTEM.md documentation added
- All components tested for WCAG AA compliance

### v1.0 (Initial Release)

- Static Jekyll site setup
- GitHub Pages deployment
- Basic responsive layout
- Navigation and footer
- Review and podcast collections
