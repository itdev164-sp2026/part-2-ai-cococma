# AI Agent Instructions — ITDEV-164 Course Project

You are assisting a student building an AI-native full-stack web application.

## Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 + Shadcn/ui
- **Icons:** Lucide React
- **Backend/Auth:** Supabase (added in later assignments)

## Architecture Rules

1. **Prefer React Server Components (RSC).** Only add `"use client"` when the component requires browser APIs, event handlers, or hooks (`useState`, `useEffect`, etc.).
2. **Use Tailwind utility classes for all styling.** Do not create CSS modules or use inline `style` objects.
3. **Use the `cn()` helper** from `@/lib/utils` when merging conditional class names.
4. **Follow the path alias.** Import from `@/components`, `@/lib`, etc. — never use relative paths like `../../`.

## Folder Structure

```
src/
├── app/            # Routes and layouts (App Router)
│   ├── layout.tsx  # Root layout
│   ├── page.tsx    # Home page
│   └── globals.css # Tailwind directives and theme tokens
├── components/     # Reusable UI components
└── lib/            # Utilities and shared logic
```

## Code Style

- Name component files in **kebab-case** (e.g., `mode-toggle.tsx`).
- Export components as **named exports** (not default), except for page/layout files.
- Keep components small and composable.
- Use `Lucide React` for all icons — do not install other icon libraries.

## When Generating Code

- Always include proper TypeScript types — avoid `any`.
- Validate data at system boundaries using **Zod** schemas (added in Assignment 4).
- Write self-documenting code. Only add comments where the logic is non-obvious.
