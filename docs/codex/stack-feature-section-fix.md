# Fixing `@lobehub/icons` SSR Import Errors

## Context

`StackFeatureSection` imports several icons from `@lobehub/icons/es/...`. These files are pure ES modules (ESM). When Next.js renders the page on the server, Node tries to execute the ESM directly and throws:

```
SyntaxError: Cannot use import statement outside a module
```

## Root Cause

The `@lobehub/icons` package publishes native ES modules in the `/es/` directory. When Next.js server-side renders the page, it bundles the component into `.next/server/pages/index.js`, which runs in a CommonJS environment. The CJS runtime doesn't understand `import ... from ...` syntax, causing the error.

## Fix Options

### Option 1 – Use Dynamic Imports (Recommended Quick Fix)

This ensures icons only load on the client side, avoiding SSR issues entirely.

1. Open `apps/web/src/components/ui/stack-feature-section.tsx`
2. Replace the static icon imports (lines 9-14) with dynamic client-only imports:

```tsx
import dynamic from "next/dynamic";

const Claude = dynamic(() => import("@lobehub/icons/es/Claude"), { ssr: false });
const OpenAI = dynamic(() => import("@lobehub/icons/es/OpenAI"), { ssr: false });
const Gemini = dynamic(() => import("@lobehub/icons/es/Gemini"), { ssr: false });
const DeepSeek = dynamic(() => import("@lobehub/icons/es/DeepSeek"), { ssr: false });
const Perplexity = dynamic(() => import("@lobehub/icons/es/Perplexity"), { ssr: false });
const Grok = dynamic(() => import("@lobehub/icons/es/Grok"), { ssr: false });
```

No other code changes are required. The component already uses these imports correctly.

3. Restart the Next.js dev server (`pnpm dev`)

### Option 2 – Transpile the Package

1. Ensure `apps/web/next.config.cjs` includes:
   ```js
   transpilePackages: ['@nbcon/config', '@lobehub/icons'],
   ```
   (This is already present on line 44)

2. Stop the dev server
3. Remove the build cache:
   ```powershell
   Remove-Item -Recurse -Force apps/web/.next
   ```
4. Restart the server

If the error persists after cache removal, fall back to Option 1.

### Option 3 – Wrap Entire Component (Alternative)

If you prefer to keep static imports but disable SSR for the entire component:

```tsx
// In the file that imports StackFeatureSection
import dynamic from "next/dynamic";

const StackFeatureSection = dynamic(
  () => import("@/components/ui/stack-feature-section"),
  { ssr: false }
);
```

This is less granular but works if you want to keep the component file unchanged.

## Verification

- Run `pnpm dev`
- Load the home page; confirm it renders without SSR errors
- Check the terminal to ensure no "Cannot use import statement outside a module" messages remain
- Verify icons appear correctly after the page loads (may have a brief delay with dynamic imports)

## Why Option 1 is Recommended

- **Immediate fix**: No need to clear caches or wait for transpilation
- **Reliable**: Works regardless of Next.js version or build configuration
- **Minimal impact**: Icons are visual elements that don't need SSR
- **Performance**: Icons load only when needed on the client

## Technical Details

The `@lobehub/icons` package structure:
- `/es/` directory contains pure ESM modules
- These use native `import/export` syntax
- Next.js server bundle runs in CommonJS mode
- Without transpilation, Node.js cannot parse ESM syntax in CJS context

Dynamic imports with `{ ssr: false }` tell Next.js to:
1. Skip server-side rendering for these components
2. Load them only in the browser where ESM is natively supported
3. Bundle them separately for client-side code splitting

