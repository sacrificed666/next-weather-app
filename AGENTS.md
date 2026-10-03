# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

# Project rules

- The code contains no comments. Express intent through names, small functions and types; explain the rest in `docs/`. `npm run lint` enforces it with `lint/no-comments.js`.
- Imports point downwards only: `app → widgets → features → shared`. See [docs/architecture.md](./docs/architecture.md).
- Every user-facing text lives in `src/features/i18n/model/messages/` in all eight languages.
- Run `npm run check` before calling a change done, and `npm run build` when routes, server code or configuration changed.
- Keep `docs/` in sync with the code you change.
