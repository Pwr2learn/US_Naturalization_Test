# USCIS Naturalization Test App

A Next.js application designed to help users prepare for the United States Naturalization Test.

## Features
- **Civics Test**: Practice the 128 civics questions from the 2025 Naturalization Civics Test with an interactive study mode.
- **Reading & Writing**: Prepare for the English reading and writing portion of the test.
- **Interview**: Simulate the naturalization interview experience.

## Getting Started

First, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Privacy & Security

This repository is configured to keep private and local development details secure:
- `.env` files (containing secrets or local configs) are ignored by git.
- Editor-specific folders (`.vscode`, `.idea`) and OS files (`.DS_Store`) are ignored.
- Only the source code necessary to build and run the application is tracked.

## Deployment

This project is configured to be deployed automatically to GitHub Pages using GitHub Actions (`.github/workflows/nextjs.yml`). Any push to the `main` branch will trigger a production build and deployment.
