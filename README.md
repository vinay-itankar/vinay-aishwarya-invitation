# Vinay & Aishwarya Wedding Invitation

The source and images for Vinay and Aishwarya's wedding invitation. The site is exported as a static Next.js app and published with GitHub Pages.

## Run locally

```bash
npm ci
npm run dev
```

## Build for GitHub Pages

Set `NEXT_PUBLIC_BASE_PATH` to the repository name with a leading slash, then build:

```bash
$env:NEXT_PUBLIC_BASE_PATH = "/vinay-aishwarya-invitation"
npm run build
```

The static site is written to `out/`. The GitHub Actions workflow builds and deploys it automatically whenever changes are pushed to `main`.
