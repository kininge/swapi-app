# ✨ Code Style Guide – Swapi App

This document defines the coding conventions followed in the Swapi App. It helps maintain consistency, readability, and scalability across the codebase.

---

## 1. General Principles

- ✅ Prioritize readability and maintainability over cleverness.
- 🧱 Follow **modular design** — isolate logic by feature.
- 🔁 Avoid repetition (DRY) and unnecessary abstraction (KISS).
- 🧪 Write testable code; prefer pure functions when possible.

---

## 2. Folder & File Naming

- Use **kebab-case** for folders: `character-detail-page/`
- Use **camelCase** or descriptive file names: `characterCard.tsx`, `useSearchCharacters.ts`
- Co-locate files per feature inside `features/`, `pages/`, `components/`.

---

## 3. React Component Style

- Use **function components** only.
- Prefer arrow functions:  
  ✅ `const MyComponent = () => { ... }`
- Use `Props` interfaces for typed props.
- Keep components small and single-purpose.

---

## 4. Hooks & Utilities

- Custom hooks must start with `use`:  
  ✅ `useInfiniteScroll.ts`
- Keep reusable logic in `src/utils/` or `src/hooks/`.
- Avoid complex `useEffect`; extract into helpers if needed.

---

## 5. Redux (RTK + RTK Query)

- Use `createSlice` and `createAsyncThunk` from RTK.
- Slice files go under `src/features/[featureName]/`.
- Keep reducers pure and small.
- Use selectors for data access in components.

---

## 6. TypeScript Rules

- Avoid `any` — always define explicit types.
- Use `interface` for object shape definitions.
- Use `enum` or union types for finite sets.

```ts
    type Gender = 'male' | 'female' | 'n/a';
```
--- 

## 7. TailwindCSS Guidelines

- Use semantic utility classes; avoid inline styles.
- Keep class strings clean and grouped for readability:
```tsx
  className="flex items-center justify-between p-4 text-sm"
```
* Reuse styling logic by abstracting into components if repeated often.
* For conditional styles, use libraries like clsx or classnames.

---

## 8. Testing Style

* Use Jest with React Testing Library for unit and integration tests.

* Use Cypress for end-to-end testing.

* Place test files alongside components or in __tests__/ folders.

* Follow descriptive naming for test cases:

```ts
it('should display favorite icon correctly when character is favorited', () => {
  ...
});
```
* Prefer queries like getByRole, getByLabelText, and findByTestId for better accessibility coverage.
---

## 9. Linting & Formatting

* Linting configured with:
- * @typescript-eslint/eslint-plugin
- * eslint-plugin-unused-imports
- * eslint-config-prettier

* Run manually with:

```bash
    yarn lint
    yarn lint:fix
```
* Prettier used to auto-format on save (via editor or pre-commit hook)
---

## 10. Commit Messages (Optional but Recommended)
Follow Conventional Commits format:

```pgsql
    feat: add infinite scroll to character list
    fix: correct tooltip rendering for gender info
    refactor: extract characterCard into its own file
    docs: update cache architecture explanation
```
---
## ✅ Summary

* Following these code style conventions ensures:
* Code is readable and predictable.
* Onboarding new contributors is easier.
* Code reviews and debugging are faster.

--- 

## 👨‍💻 Author & Maintainer

**Pritam Kininge** — Frontend Developer | React, TypeScript, TDD  
📍 Navi Mumbai, India (UTC+5:30)  
🗓️ Submitted: June 21, 2025  
[LinkedIn](https://linkedin.com/in/pritam-kininge)  |  [GitHub](https://github.com/kininge)  |  [Leetcode](https://leetcode.com/u/kininge007/)
