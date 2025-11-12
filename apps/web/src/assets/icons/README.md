# Icons Directory

This directory contains icon assets for the nbcon.ai application.

## Icon Libraries

### 1. LobeHub Icons (AI/LLM Model Logos)
For AI model brand logos (OpenAI, Anthropic, Claude, etc.), use the `@lobehub/icons` package which is already installed.

**Usage:**
```tsx
import { OpenAI, Anthropic, Google } from '@lobehub/icons';

<OpenAI size={24} />
<Anthropic size={24} />
```

**Available Models:** See [LobeHub Icons](https://lobehub.com/icons) for the full list of 1275+ AI model icons.

### 2. Lucide Icons (UI Icons)
For general UI icons (shields, locks, users, etc.), use `lucide-react` which is already installed.

**Usage:**
```tsx
import { Shield, Lock, Users, Book, Search } from 'lucide-react';

<Shield className="h-4 w-4" />
```

**Common Icons Needed:**
- Security: `Shield`, `Lock`, `Key`
- Users: `Users`, `User`, `UserPlus`
- Navigation: `ArrowRight`, `ChevronDown`, `Menu`
- Actions: `Plus`, `Search`, `Settings`, `Bell`
- Content: `Book`, `FileText`, `MessageSquare`
- Status: `CheckCircle`, `AlertCircle`, `Clock`

### 3. Radix UI Icons
For Radix UI component-specific icons, use `@radix-ui/react-icons`.

## Downloading LobeHub Icons as SVG Files

If you need SVG files instead of React components, you can download them from:
- SVG: `https://unpkg.com/@lobehub/icons-static-svg@latest/icons/{icon-name}.svg`
- PNG (Light): `https://unpkg.com/@lobehub/icons-static-png@latest/light/{icon-name}.png`
- PNG (Dark): `https://unpkg.com/@lobehub/icons-static-png@latest/dark/{icon-name}.png`

## Icon Requirements

See `ICON_PROMPTS.md` for detailed icon requirements by page.

