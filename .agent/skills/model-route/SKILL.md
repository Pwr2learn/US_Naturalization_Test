---
name: model-route
description: Use when choosing Gemini model tier for cost, speed, and quality tradeoffs.
---


# Routing
- Flash-class: simple edits, extraction, formatting, short summaries.
- Pro-class: normal coding, debugging, UI, refactors.
- Highest-reasoning Pro/Deep Think-class when available: hard architecture, security review, final critique, complex bugs.

# Rules
- Use cheapest capable model.
- Use expensive models for planning/review only when possible.
- Downgrade after hard reasoning is complete.
- Compact context before escalation.

# Output Format
```md
Task complexity:
Chosen model tier:
Reason:
Downgrade point:
```
