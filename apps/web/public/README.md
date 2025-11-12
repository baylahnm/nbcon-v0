# Public Assets

This folder contains **static assets** that are served directly by Next.js at the root URL path.

## Structure

```
public/
├── images/          # Static images (accessible at /images/...)
│   ├── hero/        # Hero section images
│   ├── features/    # Feature showcase images
│   └── screenshots/ # Screenshot images
└── icons/           # Static icons (accessible at /icons/...)
    ├── favicon.ico  # Browser favicon
    └── logo.svg     # Logo files
```

## Usage

### Static Images (public/images/)

**When to use:**
- Large images that don't need bundling
- Images referenced in HTML metadata (Open Graph, Twitter cards)
- Images referenced by URL in components
- Images that need direct URL access

**Example:**
```tsx
// In component
<img src="/images/hero/main-hero.png" alt="Hero" />

// In metadata
<meta property="og:image" content="/images/hero/main-hero.png" />

// In CSS
background-image: url('/images/features/feature-1.png');
```

### Static Icons (public/icons/)

**When to use:**
- Favicon files (`favicon.ico`, `favicon.svg`)
- Logo files referenced by URL
- Icons used in HTML `<link>` tags

**Example:**
```tsx
// In _document.tsx
<link rel="icon" href="/icons/favicon.ico" />
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

// In component
<img src="/icons/logo.svg" alt="Logo" />
```

## Notes

- Files in `public/` are **not optimized** by Next.js automatically
- Use `next/image` component for optimization when possible
- Paths are relative to root: `/images/...` not `/public/images/...`
- Files are served as-is without bundling

