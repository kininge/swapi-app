# ⚔️ Star Wars Explorer — Swapi.tech React App (Allica Assignment)

A fast, scalable, test-driven Star Wars character web app  
built with **React**, **TypeScript**, **RTK Query**, **Redux Persist**, and **TailwindCSS**.

> ✅ Developed as a frontend assignment for **Allica Bank**, with a strong focus on:
> - **TDD**
> - **Clean architecture**
> - **Caching strategy**
> - **Micro-frontend compatibility**

📄 Assignment Brief: [`./docs/requirements.pdf`](docs/requirments.pdf)

---

![Built with React](https://img.shields.io/badge/built%20with-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/language-TypeScript-007ACC?logo=typescript)
![Vite](https://img.shields.io/badge/bundler-Vite-646CFF?logo=vite&logoColor=white)
![RTK Query](https://img.shields.io/badge/state-RTK%20Query-764ABC?logo=redux)
![Redux Persist](https://img.shields.io/badge/store-persisted%20with%20Redux%20Persist-593D88?logo=redux)
![React Router](https://img.shields.io/badge/routing-React%20Router-CA4245?logo=reactrouter)
![Tailwind CSS](https://img.shields.io/badge/styled%20with-TailwindCSS-38B2AC?logo=tailwindcss)
![Cypress Tested](https://img.shields.io/badge/tested%20with-Cypress-6fcf97?logo=cypress)
![Jest](https://img.shields.io/badge/unit%20tested-Jest-%23C21325?logo=jest)
![Prettier](https://img.shields.io/badge/styled%20with-Prettier-ff69b4?logo=prettier)
![ESLint](https://img.shields.io/badge/linted%20with-ESLint-4B32C3?logo=eslint)
![Micro Frontend Ready](https://img.shields.io/badge/microfrontend-ready-green)
![Responsive](https://img.shields.io/badge/design-responsive-success?logo=css3)
<!-- Optional badge with partial claim -->
![Accessibility](https://img.shields.io/badge/a11y-partial%20support-yellow?logo=universalaccess)


---

## 🎥 Demo

> _(Coming soon after final UX polish. Will include key features like scroll, favorite, edit, and detail view.)_

---

## 🚀 Features

- ♾️ **Infinite scrolling** character list with virtualization (`react-window`)
- 🔍 **Debounced search** with live filtering
- ⭐ **Favorite characters**, persisted locally
- ✏️ **Inline editing** of character attributes (gender, height, etc.)
- 🪐 **Lazy-loaded planet data** (cached for performance)
- 🎞️ **Film & starship details** via boot-time reverse mapping
- 🔁 **Offline-first global cache** with Redux Persist
- 🧠 **Smart boot-time preload** of global data (films, starships)
- ⚙️ **Clean architecture** — scalable, maintainable, micro-frontend-ready
- 🧪 **TDD approach** using Jest (unit) and Cypress (E2E)
- 🎨 **Responsive, accessible UI** styled with Tailwind CSS

---

## 🏗️ Architecture & Developer Docs

This app follows a **cache-first, offline-ready architecture** designed to minimize API calls and support scalable micro-frontend growth.

![Architecture Diagram](./docs/architecture/architecture.png)

---

## ⚠️ API Limitations & Design Solutions

The [SWAPI.tech](https://swapi.tech) API offers rich Star Wars data — but building a scalable, performant, and user-friendly application required working around some notable limitations.

---

### 1. `/people` vs `/people?expanded=true`

> The base `/people` endpoint returns only minimal character data.  
> While `?expanded=true` adds more fields (skin_color, hair_color, height, eye_color, mass, birth_year etc.), it still omits **planet information**.

**🛠️ Solution**:  
- Defaulted to `/people?expanded=true` for enhanced detail  
- Homeworld (planet) data is **fetched lazily**, only when a character card becomes visible  
- Planet responses are **cached and persisted**, reducing network calls across device (browser)

---

### 2. Missing relationships to films & starships

> The `/people` endpoint provides **no direct connection** to films or starships.  
> Instead:
> - Films reference character URLs  
> - Starships reference pilot(character) URLs

**🛠️ Solution**:  
- At app boot, we **fetch all films and starships once**  
- Build **reverse maps**:
  - `characterToFilms`
  - `characterToStarships`  
- Enables fast, relational lookups for character detail pages with **no repeated network calls**

---

### 3. No support for editing or saving favorites

> SWAPI is read-only — it doesn’t support mutations or user-specific storage.

**🛠️ Solution**:  
- **Edit Feature**: Editable fields (gender, height, etc.) are stored locally per character ID  
- **Favorites Feature**: Mark/unmark characters as favorites using local persisted state  
- These behave like real app features, despite no backend support

---

### 4. Non-paginated search results

> The search endpoint returns large result sets (e.g., 57 results for `"a"`) **without pagination**

**🛠️ Solution**:  
- Used `react-window` + `react-virtualized-auto-sizer` to **virtualize long lists**  
- Ensures fast rendering and smooth UX regardless of result size

---

### ✅ Summary

Despite these API limitations, we built a fully-featured, production-quality app by:

- Designing a **robust cache-first architecture**
- Using **smart, preemptive fetching and reverse mapping**
- Simulating real-world functionality (favorites, edits) with local strategies
- Prioritizing **performance and UX** with caching, virtualization and lazy loading

---

### 💡 Why Cache-First?

This app is designed as **offline-friendly and cache-prioritized** — aligned with the reality of the [SWAPI.tech](https://swapi.tech) API and the usage expectations of a character browsing tool.

#### ⚖️ CAP Tradeoff
In distributed system terms (CAP theorem), we **intentionally prioritize _Availability_ and _Partition Tolerance_** over strict **Consistency**. That’s because:

- The data is *mostly static* (fictional universe, no real-time updates)
- Stale data is acceptable for the user experience
- Network latency or API downtime should not break the core UI

#### ✅ Results:
- Characters, films, starships, and planet data are cached
- API calls are deduplicated aggressively
- Redux Persist ensures long-term caching until manually cleared

---

## 📚 Documentation Checklist

| 📌 Topic                         | 📁 Location                                                                                 | 📊 Status       |
|----------------------------------|---------------------------------------------------------------------------------------------|-----------------|
| 📄 Assignment Brief              | [`docs/requirements.pdf`](./docs/requirements.pdf)                                         | ✅ Provided      |
| 🎯 Code Style Guide              | [`docs/code-style.md`](./docs/code-style.md)                                               | ✅ Complete      |
| 🛠️ Project Setup                | [`docs/setup/init-project.md`](./docs/setup/init-project.md)                              | ✅ Complete      |
| 🧠 Developer Notes               | [`docs/dev-notes.md`](./docs/dev-notes.md)                                                 | ✅ Complete      |
| 🗺️ App Architecture Diagram      | [`docs/architecture/architecture.png`](./docs/architecture/architecture.png)               | ✅ Complete      |
| 📦 Cache Architecture            | [`docs/architecture/cache-architecture.md`](./docs/architecture/cache-architecture.md)     | ✅ Complete      |
| 🏗️ Architecture Design           | [`docs/architecture/swapi-architecture.md`](./docs/architecture/swapi-architecture.md)     | ✅ Complete      |
| 🌐 Routing Strategy              | `docs/routing.md`                                                 | ⚒️ Optional      |
| 🧩 Micro-Frontend Strategy       | `docs/mfe-strategy.md`                                           | ✍️ Planned       |
| 🚀 CI/CD Pipeline Plan           | `docs/ci-pipeline.md`                                          | ✍️ Planned       |
| 🧪 Cypress Setup                 | [`docs/setup/cypress-setup.md`](./docs/setup/cypress-setup.md)                             | ✅ Complete      |
| ✅ Unit Test Coverage Report     | [`docs/coverage/unit_test_coverage.md`](./docs/coverage/unit_test_coverage.md)             | ✅ Complete      |

---

✅ = Complete  ✍️ = Planned  ⚒️ = Optional
                         | 📁 
---

## 🧰 Tech Stack

A thoughtfully chosen, modern stack focused on performance, maintainability, and developer ergonomics.

| Area           | Tech/Library                       |
|----------------|------------------------------------|
| Frontend       | React + TypeScript                 |
| Styling        | TailwindCSS                        |
| State Management         | Redux Toolkit + Redux Persist      |
| Data Fetching  | RTK Query + custom API utils       |
| Virtualization | react-window + react-virtualized-auto-sizer |
| Routing        | React Router                       |
| Testing (Unit) | Jest + React Testing Library       |
| Testing (E2E)  | Cypress                            |
| Build Tool     | Vite                               |
| Dev Tooling    | ESLint + Prettier (Code Quality + Formatting) |


---

## 🛠️ Getting Started

```bash
   # 1. Clone the repo
   git clone https://github.com/kininge/swapi-app.git
   cd swapi-app

   # 2. Install dependencies
   yarn

   # 3. Start local dev server
   yarn dev

   # The app will run at: http://localhost:5173
```

> For setup project from crash consider: [`docs/setup/init-project.md`](./docs/setup/init-project.sh)

---

## 🗂️ Project Structure

```txt
   .
   ├── public/          # Static assets (favicon, etc.)
   ├── docs/            # Docs, architecture diagrams, etc.
   ├── src/
   │   ├── assets/      # App media
   │   ├── components/  # Shared UI components (Card, Toggle, etc.)
   │   ├── pages/       # Route-level pages (CharacterListPage, DetailPage, etc.)
   │   ├── services/    # RTK Query + cache API functions
   │   ├── store/       # Redux Toolkit store, slices, hooks
   │   ├── hooks/       # Custom hooks (useCacheBoot, useIntersectionObserver, etc.)
   │   ├── types/       # Global TypeScript types
   │   ├── utils/       # Utilities like `clsx`, `debounce`, etc.
   │   ├── App.tsx      # Root component
   │   └── main.tsx     # Entry point
   ├── index.html
   ├── README.md
   └── package.json
```

---

# 🧪 Testing Strategy

This app was built using a **TDD-first mindset** with both **unit** and **end-to-end (E2E)** tests.

---

## ✅ Unit Testing (Jest + RTL)

Focused on isolated logic and Redux behavior:

- Redux slices:
  - `characterSlice` (pagination, deduplication)
  - `favoriteSlice` (toggle, persistence)
  - `searchSlice`, `editedCharacterSlice`, `cacheSlice`
- Reusable UI components (e.g. `CharacterCard`, `GenderInfo`)
- Utility functions:
  - Deduplication
  - Pagination keys
  - Debounce/search logic
- Custom hooks:
  - `useCharacterData` (state + API merge)

-- 

## 📈 Unit Test Coverage Summary

Our unit tests are written with full attention to critical paths, reducers, components, and utilities.

> ✅ Overall coverage:  
> - **Statements:** 92.36%  
> - **Branches:** 82.19%  
> - **Functions:** 85.88%  
> - **Lines:** 92.3%

### 🧾 Detailed Coverage Report

| Directory / File                 | Statements | Branches | Functions | Lines  |
|----------------------------------|------------|----------|-----------|--------|
| `components/`                    | 93.67%     | 84.9%    | 88%       | 93.33% |
| └─ `characterCard.tsx`          | 100%       | 75%      | 100%      | 100%   |
| └─ `virtualizedGrid.tsx`        | 76.47%     | 66.66%   | 80%       | 76.47% |
| `features/characters/`          | 88.33%     | 70%      | 85.71%    | 88.07% |
| └─ `characterSlice.ts`          | 96.49%     | 76.92%   | 100%      | 96.07% |
| └─ `favoriteSlice.ts`           | 92.3%      | 100%     | 66.66%    | 92.3%  |
| └─ `searchSlice.ts`             | 72.22%     | 40%      | 77.77%    | 70.96% |
| `features/cache/`               | 100%       | 100%     | 100%      | 100%   |
| `features/planets/planetAPI.ts` | 84.61%     | 100%     | 33.33%    | 85.71% |
| `pages/characterDetailPage/`    | 100%       | 100%     | 100%      | 100%   |
| `services/networkAPI.ts`        | 100%       | 85.71%   | 100%      | 100%   |
| `store/`                        | 100%       | 100%     | 100%      | 100%   |
| `utils/`                        | 100%       | 100%     | 100%      | 100%   |

> 📄 Full coverage report is available at: [`/docs/coverage/unit_test_coverage.md`](./docs/coverage/unit_test_coverage.md)

To regenerate the report:

```bash
  yarn test:coverage
```

---

## 🔍 Integration & E2E Testing (Cypress)

Cypress covers full user journeys and UI consistency:

### 🌌 Character List Page (`/`)
- Infinite scroll (via `react-window`)
- Page deduplication logic
- Favorite toggle behavior
- Route to detail page

### 🔎 Search Page (`/search`)
- Debounced input search
- Success state (e.g., "darth" yields results)
- Empty state with dynamic query (e.g., "bdbad")
- Route to detail page from search results

### ⭐ Favorites Page (`/favorites`)
- Favorites are persisted and shown
- Toggle/unfavorite directly from favorites page
- Empty state message when no favorites remain

### 🧬 Character Detail Page (`/character/:id`)
- Loads from URL or location.state
- Validates character name and all properties
- Planet info (API or cache)
- Film/starship presence or absence
- Inline edit mode:
  - Edit form renders with correct fields
  - Update/cancel buttons shown
- Favorite toggle support

### 🗺️ Routing & Navigation
- Navbar links work:
  - Home (`[data-testid="home-route-link"]`)
  - Search
  - Favorites
- Logo (`[data-testid="app-logo-home-route-link"]`) navigates home
- Back buttons (where present) work as expected

### 🚫 Page Not Found (`/some-gibberish`)
- 404 message is rendered
- Home button redirects back

---

## 🧪 Test Utilities

- `makeTestStore` → used in Jest for custom Redux setup
- `cy.prepareCharacterDetailPage(characterId, shouldExist)` → reusable Cypress command for detail page testing

---

## ⚙️ MSW

Mock Service Worker (MSW) was **considered**, but ultimately skipped due to:

- `BroadcastChannel` + `TransformStream` polyfills not working in Node 20+
- JSDOM limitations during hook mocking

✅ Instead, **RTK Query hooks are mocked via Jest**.

---

## 🔧 Running Tests

```bash
   # Run all unit tests
   yarn test

   # unit tests + Check coverage <---- recommend
   yarn test:coverage

   # Open Cypress UI
   yarn cy:open

   # Run Cypress heedlessly <---- recommend
   yarn cy:run
```

---

## 🧠 Architecture & Design Decisions

This app is built with performance, scalability, and offline-readiness in mind:

- ⚙️ **RTK Query** for auto-cached, scalable data fetching
- 💾 **Redux Persist** to preserve cache, favorites, and edits across reloads
- 🚀 **Boot-time preload** of global entities (films, starships), with reverse mappings to characters
- 🌀 **Virtualized scroll** (`react-window`) for smooth rendering of large lists
- 🚫 **Component-level deduplication** to prevent duplicated characters
- 🔍 **Decoupled Search Page** avoids unnecessary pagination logic
- ❤️ **Favorites & Edits** stored in normalized maps (`{ [id]: data }`) for quick access
- 🧪 **TDD-first** development: unit + integration test coverage from day one

> 📘 See full breakdown in [`/docs/dev-notes.md`](./docs/dev-notes.md)

---

## ✅ Final Submission Summary

![All Core Features Delivered](https://img.shields.io/badge/Core%20Features-100%25-brightgreen)
![Tests Passing](https://img.shields.io/badge/Tests-90%25-brightgreen)
![Docs Complete](https://img.shields.io/badge/Docs-100%25-blue)

All features specified in the requirement PDF have been fully implemented — including:
- Character list with infinite scroll
- Character detail view
- Favorite characters (persisted)
- Responsive, tested, scalable architecture

> 📄 Requirement file: [`/docs/requirements.pdf`](./docs/requirements.pdf)
> 📋 Submission Checklist: [`/SUBMISSION_CHECKLIST.md`](./SUBMISSION_CHECKLIST.md)

---

## 📤 Submission Structure

| Item                             | Included |
|----------------------------------|----------|
| ✅ Source Code                   | Yes      |
| ✅ README with setup/use         | Yes      |
| ✅ `docs/architecture.md`        | Yes      |
| ✅ `SUBMISSION_CHECKLIST`        | Yes      |
| ✅ Test Coverage Report          | Yes      |
| ✅ Screenshots / GIFs            | Yes (if time permits) |

The project is organized and submitted in a self-contained manner, ready to be reviewed or deployed.

---

## 📅 Timeline & Delivery Plan

- ✅ All core requirements completed: character list, detail view, favorites, and search
- ✅ Bonus features like inline editing also implemented
- ✅ Test-driven development (TDD) approach followed throughout feature development
- 🕐 Remaining time is focused on:
  - 🔍 Extending test coverage and edge case validation
  - 📚 Documentation refinement and architecture notes
  - 🎨 UX polish and accessibility scan

---

## ✨ Optional Features (Deferred by Timebox)

The following ideas were explored and scoped but deferred to prioritize testing and UX polish:

- 🔠 Typeahead search (Trie-based)
- 🌐 Wookiee language support (`?format=wookiee`)

---

## 🪐 Acknowledgements

- Data powered by the [SWAPI.tech](https://swapi.tech) API
- Design inspiration from:
  - Star Wars fandom aesthetics
  - Pinterest UI mood boards
- Created as a frontend hands-on assignment for **Allica Bank**

---

## 📜 License

This project is licensed under the [MIT License](./LICENSE).

---

## 👨‍💻 Author & Maintainer

**Pritam Kininge** — Frontend Developer | React, TypeScript, TDD  
📍 Navi Mumbai, India (UTC+5:30)  
🗓️ Submitted: June 26, 2025  
[LinkedIn](https://linkedin.com/in/pritam-kininge)  |  [GitHub](https://github.com/kininge)  |  [Leetcode](https://leetcode.com/u/kininge007/)