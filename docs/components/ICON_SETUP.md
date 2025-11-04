# Icon Libraries Setup Guide

## ✅ Web App (`apps/web`) - COMPLETE

### Installed Packages
- ✅ `lucide-react` - Primary icon set (modern & consistent)
- ✅ `bootstrap-icons` - Supplementary minimal icons  
- ✅ `@fortawesome/fontawesome-free` - Legacy/social icons

### Configuration
Global CSS imports added to `apps/web/src/pages/_app.tsx`:
```typescript
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
```

### Usage

#### Lucide React (Recommended)
```tsx
import { Menu, ChevronDown, Star } from "lucide-react";

<Menu className="h-5 w-5" />
```

#### Bootstrap Icons
```tsx
// Direct usage
<i className="bi bi-house" />

// Or via helper
import { BootstrapIcon } from "@/lib/icons";
<BootstrapIcon.House className="text-primary" />
```

#### Font Awesome
```tsx
// Direct usage
<i className="fas fa-home" />
<i className="fab fa-github" />

// Or via helper
import { FontAwesomeIcon } from "@/lib/icons";
<FontAwesomeIcon.GitHub className="text-primary" />
```

#### Centralized Helper (`apps/web/src/lib/icons.ts`)
```tsx
import { LucideIcon, BootstrapIcon, FontAwesomeIcon } from "@/lib/icons";

// Lucide (re-exported)
import { Menu } from "lucide-react"; // Same as LucideIcon.Menu

// Bootstrap
<BootstrapIcon.House />

// Font Awesome
<FontAwesomeIcon.GitHub />
```

---

## 📱 Mobile App (`apps/mobile`) - PENDING SETUP

**Note:** Mobile app directory exists but package.json not found. When setting up mobile:

### Installation
```bash
pnpm --filter mobile add react-native-vector-icons
```

### Expo Configuration
Add to `apps/mobile/app.json`:
```json
{
  "expo": {
    "plugins": ["react-native-vector-icons"]
  }
}
```

### Usage
```tsx
import Icon from "react-native-vector-icons/FontAwesome";

<Icon name="home" size={24} color="#000" />
```

---

## 📚 Icon Library Comparison

| Library | Use Case | Bundle Size | Type Support |
|---------|----------|-------------|--------------|
| **Lucide React** | Primary icons (recommended) | Small | ✅ Full TypeScript |
| **Bootstrap Icons** | Minimal supplementary icons | Medium | ⚠️ Class-based |
| **Font Awesome** | Social/legacy icons | Large | ⚠️ Class-based |
| **React Icons** | Already installed | Large | ✅ Full TypeScript |

---

## 🎯 Best Practices

1. **Prefer Lucide React** for new components (type-safe, tree-shakeable)
2. **Use Bootstrap Icons** for specific UI patterns that match Bootstrap aesthetic
3. **Use Font Awesome** only for brand/social icons not available in Lucide
4. **Use centralized helper** (`@/lib/icons.ts`) for consistency

---

## 🔍 Quick Reference

### Common Lucide Icons
- `Menu`, `X`, `ChevronDown`, `ChevronUp`, `ChevronLeft`, `ChevronRight`
- `Search`, `Settings`, `User`, `Bell`, `Star`, `Heart`
- `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`

### Common Bootstrap Icons
- `bi-house`, `bi-person`, `bi-gear`, `bi-search`
- `bi-chevron-down`, `bi-list`, `bi-x`

### Common Font Awesome Icons
- `fas fa-home`, `fas fa-user`, `fas fa-cog`
- `fab fa-github`, `fab fa-twitter`, `fab fa-linkedin`

---

## ✅ Verification

Run to verify setup:
```bash
cd apps/web
pnpm install
pnpm run dev
```

Check browser console for any CSS loading errors.

