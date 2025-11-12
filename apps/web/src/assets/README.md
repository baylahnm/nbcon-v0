# Imported Assets

This folder contains **assets that are imported** in your code and bundled by Next.js.

## Structure

```
src/assets/
├── images/          # Images imported in components
└── icons/           # SVG components and icon files
    └── components/  # React SVG components
```

## Usage

### Imported Images (src/assets/images/)

**When to use:**
- Images imported directly in React components
- Images that need TypeScript type checking
- Images that benefit from Next.js optimization
- Component-specific images

**Example:**
```tsx
// Import image
import heroImage from '@/assets/images/hero-bg.png';
import featureIcon from '@/assets/images/feature-icon.png';

// Use in component
<Image src={heroImage} alt="Hero" />
<img src={featureIcon} alt="Feature" />
```

**With Next.js Image component:**
```tsx
import Image from 'next/image';
import heroImage from '@/assets/images/hero-bg.png';

<Image 
  src={heroImage} 
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### SVG Icons (src/assets/icons/)

**When to use:**
- Custom SVG icons not available in icon libraries
- SVG files that need to be imported as React components
- Icons that need dynamic styling or theming

**Example - SVG as Component:**
```tsx
// src/assets/icons/components/CustomIcon.tsx
import React from 'react';

export const CustomIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="..." fill="currentColor" />
  </svg>
);

// Usage
import { CustomIcon } from '@/assets/icons/components/CustomIcon';
<CustomIcon className="h-5 w-5 text-primary" />
```

**Example - SVG as Image:**
```tsx
import logoSvg from '@/assets/icons/logo.svg';
<img src={logoSvg} alt="Logo" />
```

## Path Alias

Make sure your `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Notes

- Assets here are **bundled** by Next.js
- Next.js automatically optimizes images when using `next/image`
- TypeScript will provide type checking for imports
- SVG files can be imported as React components with proper configuration

## Icon Libraries

For most icons, prefer using icon libraries:
- **lucide-react**: Primary icon library (see `src/lib/icons.tsx`)
- **react-icons**: Brand/service icons
- **@radix-ui/react-icons**: Radix UI component icons

Only use custom SVGs here when you need something not available in libraries.

