---
name: debug
description: Use when behavior is broken, tests fail, tool calls fail, or errors are unclear.
---


# Steps
1. Capture exact error and context.
2. Identify one likely cause.
3. Test one hypothesis at a time.
4. Change only what is needed.
5. Validate the fix.
6. If two attempts fail, stop and re-plan.

# Gotchas
- Do not shotgun changes.
- Do not rewrite large areas before isolating cause.
- Do not claim fixed without validation.

# Output Format
```md
Symptom:
Likely cause:
Test performed:
Fix:
Validation:
Remaining risk:
```
