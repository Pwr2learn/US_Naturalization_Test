---
name: cinematic-landing-page
description: Use when building a premium cinematic React/Vite/Tailwind/GSAP landing page from brand, aesthetic, value props, and CTA.
---

# Steps
1. Ask exactly these 4 questions in one batch:
   - Brand name and one-line purpose
   - Aesthetic direction: Organic Tech, Midnight Luxe, Brutalist Signal, Vapor Clinic
   - Three key value propositions
   - Primary CTA
2. Read `docs/design-system-prompts.md` if present.
3. Map the aesthetic to palette, fonts, image mood, hero pattern, spacing, and motion.
4. Build the page with intentional sections: navbar, hero, features, manifesto, process/protocol, CTA/pricing, footer.
5. Validate mobile, desktop, image loading, animation cleanup, and build/lint.

# Requirements
- No generic AI/SaaS layout.
- No placeholder-looking sections.
- Use real design tokens and consistent art direction.
- Use GSAP carefully; clean up animation contexts in React.
- Keep performance usable.

# Stop Conditions
- User has not provided enough brand/content input.
- Required dependencies would be installed without approval.
- Build/test fails twice.

# Gotchas
- Do not ask extra follow-up questions after the required intake unless blocked.
- Do not add random animations that hurt performance.
- Do not ignore mobile.

# Output Format
```md
Built:
Files changed:
Validated:
Open items:
```
