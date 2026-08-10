# Design System Prompts Reference

Use this as long reference material for premium website generation. Do not load it for non-design tasks.

## When to Use
Use with:
- `/cinematic-landing-page`
- `/single-file-generative-hero`
- `/liquid-metal-hero`
- `/architectural-atelier-section`
- `creative-frontend-builder` agent

## Core Design Principle
Do not build generic AI websites. Build polished, intentional interfaces with strong art direction, real layout logic, strong typography, responsive behavior, and validated interactions.

## Cinematic Landing Page Inputs
Ask these 4 questions in one batch:
1. Brand name and one-line purpose
2. Aesthetic direction
3. Three key value propositions
4. Primary CTA

## Cinematic Presets

### Organic Tech
Clinical boutique, biological research lab + luxury magazine.
- Palette: Moss, Clay, Cream, Charcoal
- Fonts: Plus Jakarta Sans / Outfit / Cormorant Garamond / IBM Plex Mono
- Mood: forest, moss, laboratory glassware

### Midnight Luxe
Private members club + high-end watchmaker.
- Palette: Obsidian, Champagne, Ivory, Slate
- Fonts: Inter / Playfair Display / JetBrains Mono
- Mood: dark marble, gold, luxury interiors

### Brutalist Signal
Control room for the future, raw precision.
- Palette: Paper, Signal Red, Off-white, Black
- Fonts: Space Grotesk / DM Serif Display / Space Mono
- Mood: concrete, brutalist, industrial

### Vapor Clinic
Genome lab inside a Tokyo nightclub.
- Palette: Deep Void, Plasma, Ghost, Graphite
- Fonts: Sora / Instrument Serif / Fira Code
- Mood: bioluminescence, neon reflections, microscopy

## Premium Rules
- Add subtle noise/texture to avoid flat gradients.
- Use rounded 2rem–3rem containers where appropriate.
- Buttons should feel magnetic and responsive.
- Use real image sourcing when images are required.
- Use GSAP responsibly and clean up animation contexts in React.
- Validate mobile and desktop.

## Page Structure for Cinematic Landing Pages
1. Floating island navbar
2. Full-height hero opening shot
3. Interactive feature artifacts
4. Manifesto/philosophy section
5. Protocol/process section
6. Pricing or get-started section
7. Footer

## Single-File Generative Hero
Use when the user wants a single browser-ready HTML file with procedural visuals only.
Rules:
- One file only.
- No external image assets.
- Use canvas/SVG/CSS/math for visuals.
- Keep performance acceptable.
- Output raw HTML only when requested.

## Liquid Metal Hero
Use for premium light-mode hero sections with soft UI, glassmorphism, liquid metal button effects, Paper.js canvas, GSAP entrance animations, parallax, and custom cursor.

## Architectural Atelier Section
Use for editorial architectural/art-direction sections.
Rules:
- No generic SaaS bento grids.
- Use strict palette and typography.
- Use asymmetry, texture, grid lines, editorial spacing, and responsive degradation.

## Validation
Before finalizing design work:
- Check mobile layout.
- Check desktop layout.
- Check animation performance.
- Check image loading.
- Check accessibility basics.
- Check that the result does not look generic.
