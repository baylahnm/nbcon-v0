# Webpack TypeScript Parsing Error Fix Plan

**Created:** 2025-01-06  
**Issue:** Module parse failed: Unexpected token in `packages/config/supabaseClient.ts`  
**Next.js Version:** 15.5.6  
**Status:** Planning Phase

---

## Problem Summary

### Error Details
```
Module parse failed: Unexpected token (3:22)
../../packages/config/supabaseClient.ts
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file.
```

### Error Location
- **File:** `packages/config/supabaseClient.ts`
- **Line:** 3 (function declaration with TypeScript syntax)
- **Issue:** Webpack is trying to parse TypeScript files without proper loader configuration

---

## Root Cause Analysis

### Primary Issues Identified

1. **Package Configuration Problem**
   - `packages/config/package.json` has `"main": "./index.ts"` pointing directly to TypeScript
   - When webpack resolves `@nbcon/config`, it loads `.ts` files directly
   - Webpack doesn't have a loader configured to handle TypeScript syntax in workspace packages

2. **transpilePackages Not Working**
   - `transpilePackages: ['@nbcon/config', '@lobehub/icons']` is set in `next.config.cjs`
   - Next.js 15 may handle workspace packages differently than Next.js 14
   - The transpilation isn't being applied correctly to the workspace package

3. **Webpack Configuration Gap**
   - Current webpack config only handles Stripe externals
   - No explicit rule to handle TypeScript files from `packages/` directory
   - Previous attempts to add custom webpack rules conflicted with Next.js's built-in TypeScript handling

### Historical Context

**Previous Attempts (from cursor_chat_1025.md):**
- ✅ Added `transpilePackages: ['@nbcon/config']` - **Didn't work**
- ❌ Added custom webpack rule with `babel-loader` - **Conflicted with Next.js**
- ❌ Modified `supabaseClient.ts` code - **Didn't address root cause**
- ❌ Removed webpack rules - **Back to original error**

**Upgrade Context:**
- Project upgraded from Next.js 14.2.33 to Next.js 15.5.6
- Next.js 15 may have different behavior for workspace package transpilation
- React 19 compatibility required the upgrade

---

## Solution Options

### Option 1: Fix Webpack Configuration (Recommended - Immediate Fix)
**Pros:**
- Quick to implement
- Works with current package structure
- Minimal changes required

**Cons:**
- May need adjustment if Next.js updates change behavior
- Relies on webpack configuration

**Implementation:**
- Modify webpack config to explicitly handle TypeScript files from `packages/` directory
- Use Next.js's `defaultLoaders` to avoid conflicts
- Ensure rule is properly positioned in webpack rules chain

### Option 2: Restructure Package (Long-term Solution)
**Pros:**
- More robust and maintainable
- Follows best practices for monorepo packages
- Less dependent on webpack configuration

**Cons:**
- Requires build step for the package
- More changes needed
- Longer implementation time

**Implementation:**
- Add TypeScript build step to `packages/config`
- Update `package.json` to point to compiled JavaScript
- Add build script and output directory

### Option 3: Hybrid Approach (Recommended - Best of Both)
**Pros:**
- Immediate fix with Option 1
- Long-term stability with Option 2
- Gradual migration path

**Cons:**
- Two-phase implementation
- More planning required

---

## Implementation Plan

### Phase 1: Immediate Fix (Webpack Configuration)

#### Step 1.1: Update Webpack Configuration
- [ ] Modify `apps/web/next.config.cjs`
- [ ] Add webpack rule to handle TypeScript files from `packages/` directory
- [ ] Use Next.js's `defaultLoaders.babel` to avoid conflicts
- [ ] Ensure rule is positioned correctly in the rules chain
- [ ] Test that it doesn't conflict with existing Stripe externals handling

#### Step 1.2: Verify Package Structure
- [ ] Check `packages/config/package.json` structure
- [ ] Verify `packages/config/index.ts` exports correctly
- [ ] Ensure TypeScript paths are configured in `tsconfig.json`

#### Step 1.3: Clear Cache and Test
- [ ] Delete `.next` directory in `apps/web/`
- [ ] Clear any webpack cache
- [ ] Restart dev server
- [ ] Verify error is resolved
- [ ] Test that Supabase client imports work correctly

### Phase 2: Long-term Solution (Package Restructure)

#### Step 2.1: Add Build Configuration to Package
- [ ] Create `tsconfig.json` in `packages/config/` (if not exists)
- [ ] Configure TypeScript to output to `dist/` directory
- [ ] Add `build` script to `packages/config/package.json`
- [ ] Add `prepublishOnly` or `prepare` script for automatic builds

#### Step 2.2: Update Package Exports
- [ ] Update `packages/config/package.json`:
  - Change `"main"` from `"./index.ts"` to `"./dist/index.js"`
  - Change `"types"` from `"./index.ts"` to `"./dist/index.d.ts"`
  - Add `"exports"` field for better module resolution

#### Step 2.3: Update Build Process
- [ ] Add build step to root `package.json` scripts
- [ ] Ensure package builds before web app builds
- [ ] Update CI/CD pipeline if needed

#### Step 2.4: Migration and Cleanup
- [ ] Build the config package
- [ ] Test that everything still works
- [ ] Remove webpack workaround from Phase 1 (optional)
- [ ] Update documentation

---

## Detailed Implementation Steps

### Immediate Fix: Webpack Configuration

**File to Modify:** `apps/web/next.config.cjs`

**Changes Required:**
```javascript
webpack: (config, { isServer, defaultLoaders }) => {
  // Ensure TypeScript files in workspace packages are transpiled
  const path = require('path');
  const packagesPath = path.resolve(__dirname, '../../packages');
  
  // Find the oneOf rule that Next.js uses for file processing
  const oneOfRule = config.module.rules.find((rule) => rule.oneOf);
  
  if (oneOfRule) {
    // Find the TypeScript rule in oneOf
    const tsRuleIndex = oneOfRule.oneOf.findIndex((rule) => 
      rule.test && rule.test.toString().includes('tsx?')
    );
    
    if (tsRuleIndex !== -1) {
      // Clone the existing TypeScript rule and modify it to include packages
      const tsRule = oneOfRule.oneOf[tsRuleIndex];
      const newRule = {
        ...tsRule,
        include: [
          ...(Array.isArray(tsRule.include) ? tsRule.include : [tsRule.include]),
          packagesPath
        ].filter(Boolean)
      };
      
      // Replace the rule
      oneOfRule.oneOf[tsRuleIndex] = newRule;
    } else {
      // If no TypeScript rule found, add one specifically for packages
      oneOfRule.oneOf.unshift({
        test: /\.tsx?$/,
        include: [packagesPath],
        use: [defaultLoaders.babel],
      });
    }
  }

  // Existing Stripe externals handling
  if (!isServer) {
    // ... existing code ...
  }
  
  return config;
}
```

**Alternative Simpler Approach:**
```javascript
webpack: (config, { isServer, defaultLoaders }) => {
  const path = require('path');
  
  // Ensure packages directory is included in TypeScript processing
  config.resolve.alias = {
    ...config.resolve.alias,
  };
  
  // Modify module rules to include packages directory
  config.module.rules.forEach((rule) => {
    if (rule.oneOf) {
      rule.oneOf.forEach((oneOfRule) => {
        if (oneOfRule.test && oneOfRule.test.toString().includes('tsx?')) {
          if (!oneOfRule.include) {
            oneOfRule.include = [];
          }
          if (Array.isArray(oneOfRule.include)) {
            if (!oneOfRule.include.some(inc => 
              typeof inc === 'string' && inc.includes('packages')
            )) {
              oneOfRule.include.push(path.resolve(__dirname, '../../packages'));
            }
          }
        }
      });
    }
  });

  // Existing Stripe externals handling
  if (!isServer) {
    // ... existing code ...
  }
  
  return config;
}
```

---

## Testing Checklist

### After Phase 1 (Immediate Fix)
- [ ] Dev server starts without errors
- [ ] No "Module parse failed" error in console
- [ ] Pages that import `@nbcon/config` load successfully
- [ ] Supabase client works correctly
- [ ] Hot module reload works
- [ ] Production build completes successfully (`pnpm build`)

### After Phase 2 (Long-term Solution)
- [ ] Package builds successfully (`cd packages/config && pnpm build`)
- [ ] Compiled JavaScript files exist in `packages/config/dist/`
- [ ] Type definitions are generated
- [ ] Web app imports work with compiled package
- [ ] All existing functionality works
- [ ] No runtime errors

---

## Risk Assessment

### Low Risk
- ✅ Webpack configuration changes (reversible)
- ✅ Testing in development environment first

### Medium Risk
- ⚠️ Changes to package structure (requires build step)
- ⚠️ Potential impact on other packages importing `@nbcon/config`

### Mitigation Strategies
1. Test thoroughly in development before production
2. Keep backup of working configuration
3. Implement Phase 1 first, then Phase 2 after validation
4. Document all changes for rollback if needed

---

## Success Criteria

### Phase 1 Success
- ✅ Build error resolved
- ✅ Dev server runs without errors
- ✅ All imports from `@nbcon/config` work
- ✅ No console errors related to module parsing

### Phase 2 Success
- ✅ Package has proper build process
- ✅ Compiled output is used instead of source TypeScript
- ✅ Build process is automated
- ✅ No webpack workarounds needed

---

## Notes and Considerations

### Next.js 15 Specific
- Next.js 15 may have different behavior for `transpilePackages`
- Workspace packages (pnpm workspaces) may need special handling
- Consider checking Next.js 15 documentation for workspace package best practices

### Monorepo Considerations
- Other packages may have similar issues
- Consider standardizing package structure across all workspace packages
- May need to apply similar fixes to other packages if they have TypeScript exports

### Environment Variables
- Current `supabaseClient.ts` uses `VITE_SUPABASE_URL` (Vite convention)
- Should also support `NEXT_PUBLIC_SUPABASE_URL` (Next.js convention)
- Consider updating environment variable handling

---

## References

- [Next.js transpilePackages Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/transpilePackages)
- [Next.js Webpack Configuration](https://nextjs.org/docs/app/api-reference/next-config-js/webpack)
- [Webpack Module Rules](https://webpack.js.org/configuration/module/#modulerules)
- Previous attempts documented in: `docs/cursor_chats/cursor_chat_1025.md`

---

## Next Steps

1. **Review this plan** - Ensure all stakeholders understand the approach
2. **Start with Phase 1** - Implement immediate webpack fix
3. **Test thoroughly** - Verify fix works in development
4. **Plan Phase 2** - Schedule package restructure for next iteration
5. **Document changes** - Update any relevant documentation

---

**Last Updated:** 2025-01-06  
**Status:** Phase 1 Attempted - Webpack Config Not Working

---

## Implementation Status

### Phase 1 Attempts (All Failed)
- ❌ **Attempt 1:** Modified existing TypeScript rules to include packages directory
- ❌ **Attempt 2:** Added explicit rule with defaultLoaders.babel
- ❌ **Attempt 3:** Added resolve alias and removed externals
- ❌ **Attempt 4:** Cloned SWC loader configuration from existing rules
- ❌ **Attempt 5:** Added rule at beginning of oneOf array with SWC loader

**Root Cause Identified:**
The webpack configuration modifications are not taking effect. This suggests that:
1. Next.js 15's webpack configuration structure is different than expected
2. The rules are being applied in a different order than we're modifying them
3. There may be a deeper issue with how workspace packages are resolved

**Decision:** Moving to Phase 2 (Package Restructure) as the webpack approach is not working.

### Phase 2 Implementation (✅ COMPLETE)
- ✅ **Step 2.1:** Created `tsconfig.json` for packages/config with proper TypeScript configuration
- ✅ **Step 2.2:** Updated `package.json` to point to `./dist/index.js` instead of `./index.ts`
- ✅ **Step 2.3:** Added build script and successfully compiled TypeScript to JavaScript
- ✅ **Step 2.4:** Created `dist/` folder with compiled `.js` and `.d.ts` files
- ✅ **Step 2.5:** Added build step to `apps/web/package.json` (`prebuild` hook)
- ✅ **Step 2.6:** Added `build:config` script to root `package.json`
- ✅ **Step 2.7:** Updated `deploy:web` to build config package first

**Status:** Package restructure complete. Ready for testing after dev server restart.

