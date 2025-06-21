# 🏗️ SWAPI App – Architecture Overview

📌 Objective
Build a performant, testable, production-ready React application to explore characters from the Star Wars universe with advanced UX, caching, and offline-ready capabilities — all aligned with Allica Bank’s expectations.

---

## ⚙️ High-Level Architecture

```scss
                        ┌────────────┐
                        │   Browser  │
                        └────┬───────┘
                            │
                            ▼
                    ┌────────────────────┐
                    │   React App (Vite) │
                    └────────────────────┘
                            │
                            ▼
                    ┌────────────────────┐
                    │     RTK Query      │ ◀───➤ API Calls
                    └────────────────────┘
                            │
                            ▼
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
    ┌──────────────────┐        ┌─────────────────────────┐
    │ UI Rendering     │        │ Global State (Redux)    │
    │ - Character List │        │ - Characters (in-mem)   │
    │ - Details Page   │        │ - Planet Cache (memo)   │
    │ - Search         │        │ - Film & Starship maps  │
    │ - Favourites     │        │ - redux-persist enabled │
    └──────────────────┘        └─────────────────────────┘
```
---

## 🧠 Architectural Decisions

### 1. **Framework & Tooling**
- `React + TypeScript`: Scalable and typed.
- `Vite`: Fast dev experience.
- `TailwindCSS`: Rapid styling.
- `Redux Toolkit + RTK Query`: Predictable state, async API abstraction.
- `redux-persist`: Enables local caching of favorite characters and edits.
- `react-window`: List virtualization for large datasets.

---

## 📦 Data Fetching Strategy

| Feature            | Data Source | Strategy                              | Caching                    |
|--------------------|-------------|----------------------------------------|----------------------------|
| Character List     | `/people?expanded=true` | RTK Query paginated fetch              | In-Memory (Redux)         |
| Character Detail   | `/people/:id?expanded=true` + maps | Hydrated from global cache         | Derived                    |
| Planet Data        | `/planets/:id` | Lazy-loaded per character             | Memoized in redux-persist |
| Film & Starship    | `/films?expanded=true`, `/starships?expanded=true` | Loaded once on app init   | redux-persist              |
| Favourites & Edits | Local only  | redux-persist store                    | Device-specific persist    |

---

## 🧩 Caching Architecture

Split into 2 tiers:

| Tier               | Data                            | Method            |
|--------------------|----------------------------------|-------------------|
| **In-Memory**      | Characters (page-wise), loading states | Redux             |
| **Persistent**     | Film, Starship, Planet Cache, Favourites, Edits | redux-persist    |

---

## 🧪 Testing Strategy

| Layer              | Tools         | Coverage                    |
|--------------------|---------------|-----------------------------|
| Unit + UI          | Jest + RTL    | Components, hooks, utils    |
| E2E                | Cypress       | Navigation, search, list UX |

---

## 📁 File & Folder Structure (High-Level)

```
    src/
    │
    ├── app/                   # Redux store + RTK Query setup
    ├── features/
    │   ├── characters/        # Character slice, RTK hooks
    │   ├── planets/
    │   └── favorites/
    ├── components/            # UI components
    ├── pages/                 # Route views
    ├── constants/             # API & App config
    ├── services/              # API services
    └── utils/                 # Helper functions

```
---

## 🧳 Dev & Build Notes

| Area               | Approach                          |
|--------------------|-----------------------------------|
| Pagination         | Infinite scroll via IntersectionObserver |
| Search             | Character search → `/people?name=` |
| Accessibility      | Screen-reader friendly, semantic tags |
| Performance        | React.memo, virtualization, memoized selectors |
| Persist Location   | LocalStorage (via redux-persist)  |

---

## 📤 Submission Structure

| Item                    | Included |
|-------------------------|----------|
| Source Code             | ✅        |
| README with setup/use   | ✅        |
| `docs/architecture.png` | ✅        |
| `SUBMISSION_CHECKLIST`  | ✅        |
| Test Coverage Report    | ✅        |
| Screenshots / GIFs      | ✅ (if time permits) |

---

## ✅ Summary

This architecture supports:
- High performance for data-heavy lists
- Minimal API usage
- Enhanced offline-readiness
- A foundation ready for future scale, modularization, and even MFE if needed.
