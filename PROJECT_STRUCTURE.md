# Project Structure

This document describes the folder and file organization for the Moruf Prompt Engineer Portfolio project, along with best practices and conventions.

---

## Root

- `api/` — Serverless API routes (chatbot, booking, lead capture)
- `public/` — Static assets (images, icons, manifest)
- `src/` — Main source code
- `index.html` — Main HTML entry point
- `package.json`, `tsconfig.json`, etc. — Project configuration

## src/

- `assets/` — Static images and assets used in the app
- `components/` — Reusable UI and page-level components
  - `chatbot/` — Chatbot-specific UI, logic, and helpers
  - `ui/` — Generic UI components (buttons, cards, etc.)
- `features/` — Domain-driven feature modules
  - `chatbot/` — Chatbot logic (hooks, state, etc.)
  - `contact/`, `projects/` — Other features (expand as needed)
- `hooks/` — Custom React hooks
- `lib/` — Shared utilities, types, and chatbot flows/intents
- `pages/` — Top-level pages (one per route/case study)
- `ui/` — Generic UI components (if not in `components/ui/`)

## Best Practices

- **No empty folders:** Remove folders with no files.
- **Consistent naming:**
  - Components: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts(x)`
  - Utilities: `camelCase.ts`
- **Feature-first:** Place domain logic in `features/` when possible.
- **UI separation:** Generic UI in `components/ui/` or `src/ui/`, feature-specific UI in feature folders.
- **API routes:** All backend/serverless logic in `api/`.

## Example Structure

```
api/
public/
src/
  assets/
  components/
    ChatBot.tsx
    chatbot/
      ...
    ui/
      Button.tsx
      Card.tsx
  features/
    chatbot/
      hooks/
        useAIResponse.ts
      ...
    contact/
    projects/
  hooks/
    useAIChatbot.ts
    useMobile.tsx
  lib/
    chatbot/
      flows.ts
      intents.ts
      types.ts
    utils.ts
  pages/
    Index.tsx
    BookACall.tsx
    ...
  ui/
    ...
```

---

## Visual Diagram

Below is a visual diagram of the project structure for quick understanding:

```mermaid
flowchart TD
    A[Root]
    A --> B(api/)
    A --> C(public/)
    A --> D(src/)
    A --> E(index.html)
    A --> F(package.json, tsconfig.json, ...)
    D --> D1(assets/)
    D --> D2(components/)
    D2 --> D2a(ChatBot.tsx)
    D2 --> D2b(chatbot/)
    D2b --> D2b1[Chatbot UI, logic, helpers]
    D2 --> D2c(ui/)
    D2c --> D2c1[Button.tsx, Card.tsx, ...]
    D --> D3(features/)
    D3 --> D3a(chatbot/)
    D3a --> D3a1(hooks/)
    D3a1 --> D3a1a[useAIResponse.ts]
    D3 --> D3b(contact/)
    D3 --> D3c(projects/)
    D --> D4(hooks/)
    D4 --> D4a[useAIChatbot.ts, useMobile.tsx]
    D --> D5(lib/)
    D5 --> D5a(chatbot/)
    D5a --> D5a1[flows.ts, intents.ts, types.ts]
    D5 --> D5b[utils.ts]
    D --> D6(pages/)
    D6 --> D6a[Index.tsx, BookACall.tsx, ...]
    D --> D7(ui/)
```

---

**Keep this structure up to date as the project evolves.**
