# Website Optimization Guide

This document outlines all optimizations implemented for the Ramadan Giving website.

## 🚀 Performance Optimizations

### 1. Script Loading

**Before:** All scripts loaded with `beforeInteractive` strategy, blocking page load
**After:** 
- amCharts scripts load with `lazyOnload` strategy
- particles.js loads only when visible (Intersection Observer)
- Reduced particle count on mobile devices

### 2. Font Optimization

```typescript
// Fonts now use:
display: 'swap',    // Prevent FOIT (Flash of Invisible Text)
preload: true,      // Preload critical fonts
```

### 3. Image Optimization

Run `npm run optimize:images` to analyze images:
- Identifies oversized images (>100KB warning, >500KB error)
- Recommends WebP conversion
- Suggests compression for large files

**Recommendations:**
- Convert large JPEGs to WebP format
- Resize images to their display dimensions
- Use responsive images with srcset

### 4. Lazy Loading

- Particles.js only initializes when visible
- Blog images use `loading="lazy"`
- Off-screen components use dynamic imports

### 5. Reduced Motion Support

```typescript
// Respects user preference for reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

## 🔍 SEO Optimizations

### 1. Metadata Configuration

- **metadataBase**: Set for proper OG image URLs
- **Title template**: `%s | Ramadan Giving`
- **OpenGraph & Twitter cards**: Fully configured
- **Robots config**: Proper indexing rules

### 2. Sitemap Generation

Auto-generated sitemap includes:
- All static pages with priorities
- All blog posts with last modified dates
- Proper change frequencies

### 3. Robots.txt

```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://ramadangiving.github.io/sitemap.xml
```

### 4. JSON-LD Structured Data

```json
{
  "@type": "NonProfitOrganization",
  "name": "Ramadan Giving",
  "foundingDate": "2021",
  "areaServed": ["Toronto", "Cairo"]
}
```

### 5. Web App Manifest

PWA-ready configuration with:
- App icons
- Theme colors
- Standalone display mode

## ♿ Accessibility Improvements

### 1. Skip Link

Keyboard users can skip navigation:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### 2. ARIA Attributes

- Loading states: `aria-busy="true"`
- Decorative elements: `aria-hidden="true"`
- Live regions for dynamic content

### 3. Semantic HTML

- Proper heading hierarchy
- Landmark roles
- Form labels

## 📊 Monitoring & Analytics

### Web Vitals Tracking

```typescript
import { reportWebVitals } from '@/components/Analytics';

// Tracks: LCP, FID, CLS, FCP, TTFB
```

### Performance Observer

Custom observers for:
- Largest Contentful Paint (LCP)
- First Input Delay (FID)
- Cumulative Layout Shift (CLS)

## 🛠 Available Commands

```bash
# Development
npm run dev              # Start dev server

# Build
npm run build            # Build with post generation
npm run prebuild         # Generate posts.json

# Content
npm run posts            # Regenerate posts.json
npm run new-post "Title" # Create new blog post

# Optimization
npm run optimize:images  # Analyze image sizes
npm run lighthouse       # Run Lighthouse audit

# Linting
npm run lint            # Run ESLint
```

## 📁 New Files Created

```
src/
├── app/
│   ├── sitemap.ts       # Auto-generated sitemap
│   ├── robots.ts        # Robots.txt configuration
│   ├── manifest.ts      # PWA manifest
│   ├── loading.tsx      # Loading state UI
│   ├── error.tsx        # Error boundary
│   └── not-found.tsx    # 404 page
├── components/
│   ├── Analytics.tsx    # Web Vitals & tracking
│   ├── OptimizedImage.tsx # Image with skeleton
│   └── SkipLink.tsx     # Accessibility skip link
└── lib/
    └── posts.ts         # Blog post utilities

scripts/
├── generate-posts.js    # Generate posts.json
├── new-post.js         # Create blog posts
└── optimize-images.js  # Image analysis
```

## 🎯 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |
| TTI | < 3.8s | ✅ |

## 📈 Future Improvements

1. **Image CDN**: Use Cloudinary or imgix for automatic optimization
2. **Edge Caching**: Deploy to Vercel Edge for global CDN
3. **Service Worker**: Add offline support
4. **Bundle Analysis**: Use `npm run analyze` to identify large bundles
5. **Critical CSS**: Extract above-the-fold CSS
6. **Preloading**: Add `<link rel="preload">` for critical assets

## 🔄 GitHub Actions Workflows

### 1. `deploy.yml` - Build & Deploy
**Triggers:** Push to `main`, PRs, Manual

```yaml
Jobs:
├── build          # Install, generate posts, build
├── lighthouse     # Performance audit (PRs only)
└── deploy         # Deploy to GitHub Pages (main only)
```

**Features:**
- Auto-generates `posts.json` from markdown
- Caches Next.js build
- Runs image analysis
- Lints code
- Deploys to GitHub Pages

### 2. `ci.yml` - Continuous Integration
**Triggers:** All PRs and pushes

```yaml
Jobs:
├── quality        # Lint + Type check
├── build          # Build verification + bundle size
└── content        # Validate posts + check large images
```

**Features:**
- Validates code quality
- Reports bundle sizes in PR summary
- Lists large images that need optimization

### 3. `lighthouse.yml` - Performance Audit
**Triggers:** After deployment, Manual

```yaml
Jobs:
└── lighthouse     # Run Lighthouse on live site
```

**Features:**
- Tests live site performance
- Audits /, /donate/, /blog/
- Uploads reports as artifacts

### 4. `optimize-images.yml` - Image Optimization
**Triggers:** PRs with image changes, Manual

```yaml
Jobs:
└── optimize       # Analyze and optimize images
```

**Features:**
- Analyzes new images
- Auto-optimizes with Sharp
- Commits optimized images back to PR

### Workflow Diagram

```
Push to main
    │
    ▼
┌─────────────────────┐
│  CI (quality/build) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Deploy to GitHub   │
│      Pages          │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Lighthouse Audit   │
│   (post-deploy)     │
└─────────────────────┘
```

### PR Workflow

```
Open PR
    │
    ├──► CI checks (lint, type, build)
    │
    ├──► Image optimization (if images changed)
    │
    └──► Lighthouse preview audit
```

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.lighthouserc.json` | Lighthouse CI thresholds |
| `.github/workflows/*.yml` | GitHub Actions workflows |

## 🔧 GitHub Pages Headers

Since static export doesn't support dynamic headers, create a `_headers` file for Netlify or configure via GitHub Actions:

```
# Cache static assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable

# Security headers
/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
```

