---
name: security-check
description: Use before handling auth, secrets, payments, user data, deploys, public APIs, or database rules.
---


# Checks
1. Secrets/env vars are not exposed.
2. Auth is enforced server-side.
3. User identity comes from session, not body.
4. Inputs are validated server-side.
5. Database access is scoped.
6. Rate limits protect expensive endpoints.
7. Errors do not leak internals.
8. Dependencies are trusted and locked.

# Output Format
```md
Security status:
Findings:
Severity:
Recommended fix:
Validation:
```
