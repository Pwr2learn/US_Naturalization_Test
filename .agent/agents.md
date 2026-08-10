# GEMINI.md — Antigravity + Gemini 3.1 Pro Operating Contract

Use this file as the project operating contract. Keep it lean. Put detailed workflows in `.agent/skills/` and long references in `docs/`.

---

## 0. Highest Priority: Token + Outcome Efficiency

Preserve tokens and cost through precision, not omission.

- Validate before execution.
- Use the smallest correct action.
- Do not repeat context, failed commands, or large outputs.
- Do not skip quality, validation, security, or user intent to save tokens.
- Use skills and docs only when relevant.
- Treat this project as insecure until security basics are checked.

---

## 1. Antigravity Agent Rules

Before autonomous work:

- Read this `GEMINI.md` and `.agent/RESOURCE_REGISTRY.md`.
- Use `/validate` before commands, installs, scraping, browser automation, deploys, or large edits.
- Create/update a short plan for complex work.
- Use artifacts/screenshots/checkpoints for UI, browser, or long-running work.
- Ask before destructive, paid, high-resource, public, or security-sensitive actions.
- Stop after two failed attempts and change strategy.
- Final response must say what changed and how it was validated.

---

## 2. Gemini 3.1 Pro Model Routing

Default model: **Gemini 3.1 Pro** for serious coding, design, security, and architecture work.

Use model tiers this way:

| Task type | Model approach |
|---|---|
| Simple cleanup, formatting, extraction, summaries | Use a cheaper/faster model if available |
| Normal coding, debugging, UI, refactors | Use Gemini 3.1 Pro |
| Security audit, architecture, complex debugging, final critique | Use Gemini 3.1 Pro with plan/review mode; keep context compact |

Rules:

- Do not use high-reasoning mode for repetitive low-value edits.
- Use Gemini 3.1 Pro for premium website generation and security review.
- Compact context before long reasoning.
- For big jobs, do plan/review first, then implement in smaller steps.

---

## 3. Process Validation Before Execution

Before commands, tools, browser automation, scraping, installs, deploys, scripts, or large edits, validate:

```md
Objective:
Current state:
Approach:
Files/tools affected:
Risk:
Validation method:
Stop condition:
```

Do not run tools blindly. Do not make bulk edits without a validation path.

---

## 4. Core Workflow: E.P.I.V.

1. **Explore:** inspect files, dependencies, docs, existing patterns, and constraints.
2. **Plan:** state approach, risks, model use if relevant, and stop conditions.
3. **Implement:** make incremental, reversible changes.
4. **Verify:** run tests, lint, build, logs, browser check, screenshot review, or manual review.

---

## 5. Context Conservation

- Keep responses compact.
- Do not print full files unless asked.
- Use diffs/targeted snippets instead of full rewrites.
- Use `.agent/skills/` for repeatable workflows.
- Put long references in `docs/`.
- Use `.agent/RESOURCE_REGISTRY.md` as the menu, not the full recipe.

---

## 6. Code Development Standards

- Follow existing project patterns.
- No new dependencies without justification.
- No secrets, credentials, or PII in output.
- Use explicit error handling.
- Prefer simple code over clever code.
- Run available validation before final response.

Code closeout:

```md
Status:
Changes:
Files:
Validation:
Open items:
```

---

## 7. Premium UI / Website Standards

For premium UI, website, hero, or landing page work:

- Use the relevant website/design skill before building.
- Avoid generic AI/SaaS layouts.
- Use strong design tokens: palette, typography, spacing, motion, interaction rules.
- Build responsive and accessible by default.
- Use semantic HTML, ARIA where needed, and proper contrast.
- Validate visual quality with screenshots/artifacts.
- Do not overbuild animations if performance or usability suffers.

Relevant skills:

- `/cinematic-landing-page`
- `/single-file-generative-hero`
- `/liquid-metal-hero`
- `/architectural-atelier-section`

---

## 8. Security Baseline for Vibe-Coded Apps

Before launch or production sharing, run `/vibe-security-audit` or `/pre-launch-security-check`.

Minimum security checks:

- No exposed API keys, secrets, tokens, cookies, or credentials.
- `.env*` is ignored and never committed.
- Supabase/Firebase/database access is protected by proper rules/RLS.
- Server-side validation exists for all API routes/server actions.
- Auth middleware protects private pages and API routes.
- Packages are real, current, locked, and audited.
- Expensive API routes have server-side rate limiting.
- CORS and file upload rules are safe.

---

## 9. Business / ROI Logic

For automation, workflow, product, sales, growth, or operational work:

- Connect work to business value.
- Flag time saved, risk reduced, revenue impact, quality improvement, or conversion impact.
- For lead/data workflows, dedupe and validate formatting.
- Flag reputation, billing, compliance, or customer-impact risks before action.

---

## 10. 2-Strike Failure Rule

If a command, browser action, script, install, scrape, test, or tool call fails twice, STOP.

Then provide:

```md
What failed:
Likely cause:
What was tried:
New approach:
User decision needed? yes/no
Lesson to add:
```

Do not continue retrying the same failing path.

---

## 11. Browser / Antigravity Rules

- Run browser preflight before browser-heavy work.
- Confirm the page/app is loaded correctly.
- Use screenshots/artifacts for visual validation.
- Never disrupt active user work.
- If browser tools fail twice, switch to API, HTTP, file-based, or manual strategy.
- For UI work, verify mobile and desktop states.

---

## 12. Documentation First

Before building against APIs, SDKs, auth, bots, plugins, MCP, payments, messaging, deployment, or third-party services:

- Read official docs first.
- Do not guess from memory.
- Do not use outdated patterns without verification.

---

## 13. User Intent Rules

- “Again” or “re-run” means repeat the same workflow with the same approach, not rebuild from scratch.
- For thumbnails/images/design: make only requested edits unless explicitly asked to redesign.
- If the user says “make it better,” preserve original intent and improve quality, clarity, UX, or validation.

---

## 14. Available Resources

Before complex work, check `.agent/RESOURCE_REGISTRY.md`.

Load detailed skill instructions only when relevant.

---

## 15. Hard Stops

Ask before proceeding when:

1. Credentials or API keys are missing.
2. Paid actions or high-resource usage may occur.
3. Data may be deleted, overwritten, exposed, or migrated.
4. Legal, financial, customer, or security risk exists.
5. Requirements conflict with architecture.
6. Repeated failure suggests more retries will waste tokens.
7. More expensive model use is unclear in value.

---

## 16. Closeout Protocol

For non-trivial tasks, end with:

```md
Done:
Validated:
Open items:
Next step:
```

For simple tasks, answer directly.

---

## 17. Continuous Improvement

At the end of failed, complex, or repeated workflows, check whether `GEMINI.md`, `AGENTS.md`, a skill, docs, or `.agent/LEARNED_LESSONS.md` should be updated.

Add only durable lessons that prevent future waste.
