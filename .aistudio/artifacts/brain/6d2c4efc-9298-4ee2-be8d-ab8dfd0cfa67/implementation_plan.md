# Netlify Deployment Architecture & Compatibility Plan

Enable seamless, zero-downtime deployment of the CELPIP Master 12 simulation platform on Netlify with full serverless AI support and SPA routing.

---

## 1. Problem Statement & Architecture Analysis

In the current setup, the application operates as an Express + Vite full-stack server (`server.ts`):
- In local development and Node.js hosting environments, Express serves both static frontend assets and four backend API endpoints (`/api/tts-speech`, `/api/transcribe-audio`, `/api/evaluate-writing`, `/api/evaluate-speaking`).
- Netlify is a Jamstack / Serverless hosting provider. If deployed as a purely static Vite build (`npm run build` output in `dist`), requests to `/api/*` would return `404 Not Found`, and page refreshes on non-root paths could result in routing errors without rewrite rules.

To guarantee that **nothing breaks apart** when hosted on Netlify, we will implement:
1. **Netlify Functions Backend**: Wrap and expose the four AI routes as a Netlify Serverless Function (`netlify/functions/api.ts`).
2. **Netlify Configuration (`netlify.toml`)**:
   - Define the build command (`npm run build`), publish directory (`dist`), and functions directory (`netlify/functions`).
   - Route `/api/*` to `/.netlify/functions/api/:splat` (status 200 rewrite).
   - Route SPA URLs (`/*`) to `/index.html` (status 200 rewrite) to ensure bookmarking and refreshes never break.
3. **Dual-Environment Compatibility**:
   - Keep the local development and AI Studio environment running smoothly on `tsx server.ts` with zero disruption.
   - Refactor shared route logic into modular handlers so both `server.ts` and `netlify/functions/api.ts` share the exact same battle-tested logic.
4. **Resilient Netlify Environment Variables & Client Fallback**:
   - Support `GEMINI_API_KEY` configured in Netlify's site settings.
   - Maintain client-side fallbacks (Web Speech API, local scoring rubrics) so that even if a Netlify function hits a timeout or API key limit, the test taker's exam experience never crashes.

---

## 2. Proposed Changes

### A. Dependencies & Tooling
- Install `serverless-http` to cleanly bridge the Express API router to AWS Lambda / Netlify Function execution:
  - `serverless-http`

### B. Shared API Module
- Extract route handlers into `src/server/apiRouter.ts` (or mountable Express router):
  - `POST /api/tts-speech` (Gemini 3.8 Flash TTS with Canadian prosody)
  - `POST /api/transcribe-audio` (Gemini audio transcription)
  - `POST /api/evaluate-writing` (CLB 1–12 rubric analysis)
  - `POST /api/evaluate-speaking` (Fluency, coherence, and grammar analysis)
- `server.ts` imports and mounts `apiRouter`.
- `netlify/functions/api.ts` imports `apiRouter` and wraps it with `serverless(app)`.

### C. Netlify Configuration (`netlify.toml`)
- Create `netlify.toml` in project root:
  ```toml
  [build]
    command = "npm run build"
    publish = "dist"
    functions = "netlify/functions"

  [[redirects]]
    from = "/api/*"
    to = "/.netlify/functions/api/:splat"
    status = 200

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

### D. Verification and Deployment Readiness
- Verify `npm run build` succeeds (`dist` generated).
- Verify `tsc --noEmit` / `lint_applet` passes.
- Provide a clear, step-by-step Netlify Deployment Guide in a README or project documentation detailing:
  - Connecting GitHub/Git repository or using `netlify deploy`.
  - Setting `GEMINI_API_KEY` in Netlify Dashboard: **Site configuration > Environment variables**.
  - Testing the live site and verifying TTS & AI evaluation.

---

## 3. Verification Plan

1. **Compilation**: Run `compile_applet` and `lint_applet` to confirm full TypeScript compliance.
2. **Build Test**: Run `vite build` to ensure `dist/` builds with zero errors or asset bundling warnings.
3. **Route Integrity**: Verify both local server (`server.ts`) and serverless handler maintain identical request/response schemas.
