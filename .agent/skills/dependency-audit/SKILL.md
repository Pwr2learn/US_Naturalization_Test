---
name: dependency-audit
description: Use for package.json, lockfile, npm/pnpm/yarn/bun audit, outdated packages, and hallucinated package checks.
---


# Steps
1. Inspect package manager and lockfile.
2. Run audit command if safe.
3. Check outdated packages.
4. Look for suspicious low-trust packages.
5. Check unused dependencies.

# Output Format
```md
Package manager:
Audit result:
High-risk packages:
Unused/suspicious:
Fix plan:
```
