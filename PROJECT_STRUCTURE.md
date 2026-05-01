# Project Structure

This project is organized as a simple Vite + React portfolio with a small backend/API layer for chatbot, booking, and lead capture.

## Root

- `api/` Serverless API routes used in deployment
- `public/` Static assets served directly
- `src/` Frontend application source
- `server.mjs` Local Express API server for development
- `index.html` Vite entry HTML
- `package.json` Project scripts and dependencies

## Frontend (`src/`)

- `assets/` Local imported assets
- `components/` Reusable site sections and shared UI
- `components/chatbot/` Chatbot UI-adjacent helpers, constants, icons, and storage
- `components/ui/` Shared UI primitives used across the app
- `features/chatbot/` Chatbot feature logic such as hooks and guardrails
- `hooks/` Shared React hooks
- `lib/` Shared utilities and chatbot domain logic
- `pages/` Route-level pages

## Structure Notes

- Keep shared UI in `src/components/ui/`.
- Keep chatbot-specific logic close to `src/components/chatbot/` and `src/features/chatbot/`.
- Remove placeholder or duplicate folders instead of keeping parallel structures that are not used.
- Put route pages in `src/pages/` and shared sections in `src/components/`.

## Current Shape

```text
api/
public/
src/
  assets/
  components/
    chatbot/
      constants/
      utils/
    ui/
  features/
    chatbot/
      guardrails.ts
      hooks/
  hooks/
  lib/
    chatbot/
  pages/
server.mjs
index.html
package.json
```
