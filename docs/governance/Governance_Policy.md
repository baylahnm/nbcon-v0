# Governance Policy

## Branch Naming Convention
- `feature/*` - New features
- `fix/*` - Bug fixes
- `release/*` - Release branches
- `hotfix/*` - Critical production fixes

## Pull Request Process
1. **Requirements:**
   - 2 approvals minimum
   - CI pipeline must pass (lint, typecheck, tests)
   - E2E tests must pass
   - Coverage ≥ 90%

2. **Review Criteria:**
   - Code follows TypeScript strict mode
   - Tests added for new features
   - Documentation updated
   - No security vulnerabilities

## Release Management
- **Versioning:** Semantic versioning (vX.Y.Z)
- **Tagging:** All releases tagged in Git
- **Changelog:** Maintained in `CHANGELOG.md`

## Code Quality Standards
- ESLint: No warnings
- TypeScript: Strict mode, no `any` types
- Test Coverage: ≥ 90% across all layers
- Documentation: JSDoc for public APIs

