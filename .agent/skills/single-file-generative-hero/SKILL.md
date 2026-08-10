---
name: single-file-generative-hero
description: Use when creating a one-file procedural/generative hero or landing section, especially for Gemini one-shot creative website tasks.
---

# Steps
1. Confirm theme, content, and whether the output must be exactly one HTML file.
2. Use procedural CSS/SVG/canvas/math for visuals when required.
3. Avoid external image assets if the task requires pure code.
4. Keep the code browser-ready and self-contained.
5. Validate performance, responsiveness, and no missing dependencies.

# Stop Conditions
- User needs framework integration instead of single-file output.
- Visual requirements conflict with performance or accessibility.

# Gotchas
- Do not use placeholder images when the prompt says procedural only.
- Do not add explanation if user asks for raw code only.

# Output Format
Raw HTML only when requested. Otherwise provide files changed and validation.
