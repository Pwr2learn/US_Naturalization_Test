# Security Checklist for Vibe-Coded Apps

Use this as long reference material for `/vibe-security-audit` and `/pre-launch-security-check`.

## 80/20 Security Risks
Most AI/vibe-coded app security problems come from:
1. Exposed environment variables and API keys.
2. Missing or broken Row Level Security (RLS).
3. No server-side validation.
4. Outdated, hallucinated, or unused packages.
5. Missing or inconsistent authentication middleware.

## Required Pre-Launch Checks

### 1. Environment Variables + Secrets
- Search for hardcoded keys, tokens, passwords, connection strings, webhook URLs.
- Confirm `.env`, `.env.local`, `.env.production`, `.env*.local` are ignored.
- Check public prefixes: `NEXT_PUBLIC_`, `VITE_`, `REACT_APP_`.
- Server-only secrets must never use public prefixes.
- Check console logs and client-visible errors for secret leaks.
- Check production source maps.
- Confirm startup validates required env vars.

### 2. Database Security
For Supabase/Firebase/client-access databases:
- RLS/rules enabled on all relevant tables/collections.
- Policies exist; RLS enabled with no policies can look like a bug.
- INSERT/UPDATE policies include ownership checks.
- Use trusted identity sources, not user-editable metadata.
- Service-role/admin keys are server-only.
- Storage buckets have appropriate access policies.
- Raw SQL uses parameterized queries.

### 3. Authentication + Sessions
- Middleware exists for protected routes.
- Default-deny routing is preferred.
- Server-side operations verify the user securely.
- API routes handling user data check auth.
- Sessions use secure storage patterns.
- OAuth and reset flows are safe if used.

### 4. Server-Side Validation
- All API routes/server actions validate input server-side.
- User identity comes from session/JWT, not request body.
- User-generated content is sanitized before rendering.
- State-changing operations do not use GET.
- Error responses do not leak internals.
- Webhooks verify signatures.

### 5. Dependency Security
- Run package audit.
- Check for hallucinated/suspicious packages.
- Lockfile is committed.
- Outdated packages reviewed.
- Unused packages removed.

### 6. Rate Limiting
- Paid/expensive API routes are rate-limited server-side.
- Auth endpoints are rate-limited.
- Rate limit uses durable backing store when needed.

### 7. CORS
- Sensitive APIs do not use wildcard CORS.
- Credentials mode uses specific origins only.

### 8. File Uploads
- Server validates file type and size.
- Private/public uploads have different policies.
- Uploaded files cannot execute on the server.

## Output Format
```md
Security posture:
Critical/high findings:
Quick wins:
Prioritized remediation plan:
What is already done right:
Checklist summary:
```

## Finding Format
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
