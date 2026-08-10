---
name: pre-launch-security-check
description: Use before deploying, publishing, demoing, or sharing any app built with AI/Antigravity/Gemini.
---

# Steps
1. Read `docs/security-checklist.md` if present.
2. Check secrets and `.env*` handling.
3. Check auth-protected pages and API routes.
4. Check server-side validation for user input.
5. Check Supabase/Firebase/database rules if used.
6. Check package audit, lockfile, and suspicious dependencies.
7. Check rate limiting for paid/expensive endpoints.
8. Check CORS and file uploads if applicable.
9. Return launch verdict.

# Launch Verdicts
- BLOCKED: critical/high risk found.
- CAUTION: medium issues remain.
- OK TO DEMO: no obvious blocking issues.
- OK TO LAUNCH: validated security baseline.

# Stop Conditions
- Secrets are found.
- Auth is missing from private routes.
- Database rules/RLS are missing.
- Paid endpoints have no rate limiting.

# Output Format
```md
Launch verdict:
Blockers:
Quick fixes:
Validated checks:
Open risks:
```
