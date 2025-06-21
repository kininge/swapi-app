# 🛠️ Developer Notes — Swapi App

This document provides technical insight for developers working on the Swapi App.  
It covers architecture, folder structure, conventions, and testing strategy.

---

## 📁 Folder Structure

```
.
├── src/
│ ├── components/         # Reusable UI components (Button, Card, Loader)
│ ├── features/
│ │ └── character/        # Character list screen, future detail view
│ ├── services/           # RTK Query API layer
│ ├── store/              # Redux store setup
│ ├── constants/          # API endpoints, theme values
│ ├── App.tsx             # Root component
│ ├── mocks/              # (Legacy) MSW mock handlers — deprecated
│ └── main.tsx            # Entry point with <Provider>
│
├── setupTests.ts         # Global test setup for Jest
├── docs/                 # Developer documentation
│   └── dev-notes.md      # Development notes
├── scripts/              # Project setup scripts
│   └── phase1-setup.sh
├── public/               # Static files
├── .eslintrc.json        # ESLint config
├── .prettierrc           # Prettier config
├── tailwind.config.js    # Tailwind theme customization
├── index.html            # App container
└── README.md             # Project info
```

---


---

## 🔌 API Integration

* SWAPI base URL is configured in `/constants/api.constant.ts`
* Characters fetched using RTK Query via `useGetCharactersQuery({ page })`
* Pagination handled via `next` field in response

---

## ♾️ Infinite Scroll Behavior

* Built using `IntersectionObserver`
* Trigger is a `<div ref={loaderRef}>` that becomes visible on scroll
* `react-window` is used for virtualization (fixed-height list items)
* Characters load in batches as user scrolls

### ⚠️ Dev Tip

`react-window` only renders visible items — DOM-based scroll detection must target outer wrapper or observer region.

---

## 🧪 Testing Strategy

### 🧰 Tools Used

| Tool                  | Purpose                    |
| --------------------- | -------------------------- |
| Jest                  | Unit testing               |
| React Testing Library | UI interaction & rendering |
| Cypress               | Integration & E2E tests    |

### ✅ Unit Tests (via Jest)

* Loader rendering
* Error and empty states
* Virtualized list logic (limited due to react-window)
* RTK Query mocked using direct mockReturnValue pattern
* Route rendering with `MemoryRouter`

### 🔍 Integration Tests (via Cypress)

* **Cypress Setup**
  - 📂 See: [`docs/cypress-setup.md`](./cypress-setup.md)

* **CharacterList Integration Test**
  - Verifies infinite scroll behavior using `react-window`
  - Scroll logic targets first child of `[data-testid="character-list-container"]`
  - DOM item change is verified by comparing `data-character-id` before and after scroll
  - 📂 See: [`cypress/e2e/characterList.cy.ts`](../cypress/e2e/characterList.cy.ts)

* **All other Integration Test**
  - 📂 See: [`cypress/e2e/`](../cypress/e2e/)

### ❌ Dropped: MSW

Although we considered MSW for API mocking in unit tests, we dropped it due to polyfill issues in Node 20+ (e.g. `BroadcastChannel`, `TransformStream`).  
Instead, RTK Query hooks are mocked directly.

---

## ✅ Test Coverage Targets

* Core logic >85%
* Components: smoke + render path
* Critical flows covered in Cypress

---

## 🔗 Navigation Strategy

* React Router DOM manages page navigation
* Pages live under `/pages`
* Routes defined in `/routes`
* Routing behavior:
  - `/` → Redirects to `/characters`
  - `/characters` → Character listing page
  - `/character/:id` → Character detail page (navigated via character card click)
* Navigation tested via Cypress (integration) and MemoryRouter (unit)

---

## 🎨 Theming

Custom Tailwind palette (tailwind.config.js):

```js
  colors: {
    'theme-primary': '#D90429',     // Sith Red
    'theme-secondary': '#1A1A1D',   // Dark Charcoal
    'theme-background': '#0B0C10',  // Near Black
    'theme-text': '#C5C6C7',        // Cold Grey
  }
```
---

## ✅ Coding Guidelines

* File types: `.ts` / `.tsx` only
* Naming: camelCase for components, functions and hooks
* Prefer `clsx()` for conditional classes
* Avoid `any`; strong typing required

---

## 🔐 Environment / Secrets

* No environment variables needed currently
* Future secrets (if any) should go in `.env.local` (gitignored)

---

## 🧹 Lint + Prettier

* ESLint + Prettier are configured
* Husky not added yet but planned for future commit hooks

---

## 🧠 Developer Tips
* IntersectionObserver needs real DOM scroll context — virtualized lists might require mocking container scroll.
* Jest must mock all data synchronously; async updates need `await waitFor()`.
* Don’t forget: `coverage/` and test-generated data folders are gitignored.
* Cypress scrolls might require { ensureScrollable: false } with react-window.

---
## 👨‍💻 Author

> ✍️ **Last Updated:** June 21, 2025  
> 👨‍💻 **Maintainer:** Pritam Kininge

[GitHub](https://github.com/kininge) |
[LinkedIn](https://linkedin.com/in/pritam-kininge) |
[Leetcode](https://leetcode.com/u/kininge007/)
