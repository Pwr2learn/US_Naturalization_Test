---
name: vibe-security-audit
description: Use for comprehensive security audits of AI/vibe-coded apps, especially Next.js, Supabase, TypeScript, auth, APIs, file uploads, or deployment.
---

# Methodology
1. Discovery pass: map framework, database, auth, API layer, deployment, entry points, and data flow.
2. Systematic audit pass: use `docs/security-checklist.md` if present.
3. Mark each check PASS / FAIL / PARTIAL / N/A.
4. Prioritize real exploitable risk over theoretical issues.

# Critical Checks
- Exposed secrets/API keys/env vars.
- Missing or broken RLS/database rules.
- Missing server-side validation.
- Hallucinated, outdated, suspicious, or unused packages.
- Missing/inconsistent auth middleware.
- Rate limiting for paid/expensive endpoints.
- Unsafe CORS or file upload handling.

# Stop Conditions
- No authorization to audit.
- Request involves unauthorized scanning, exploitation, or third-party targets.
- Secrets are found: stop exposing them and recommend rotation.

# Finding Format
```md
Finding #:
Severity:
Category:
Location:
What is wrong:
Why it matters:
Evidence:
Fix:
Effort:
```

# Final Report
```md
Security posture:
Critical/high findings:
Quick wins:
Prioritized remediation plan:
What is already done right:
Checklist summary:
```
