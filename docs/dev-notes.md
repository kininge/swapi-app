# 🛠️ Developer Notes — Swapi App

This document provides deep technical insight for developers working on the Swapi App — a Star Wars character explorer built as a frontend assignment for Allica Bank.

It complements the main README by diving into internal logic, design rationale, testing architecture, caching behavior, and performance strategies. If you’re maintaining, extending, or debugging this app, this guide is your map.

---

## 🧠 Project Philosophy

The Swapi App is built as a **production-grade frontend assignment** for Allica Bank, demonstrating proficiency in scalable architecture, performance optimization, and developer experience.

Our goal is to create a **responsive, micro-frontend-compatible Star Wars character explorer** that balances clean code, UX clarity, and performance — all while working around the limitations of the [SWAPI.tech](https://swapi.tech) API.

### Guiding Principles

- ⚡ **Performance First:** Infinite scroll with `react-window`, cache-first data fetching, and global boot-time caching ensure responsiveness at scale.
- 🧩 **Scalability & MFE Readiness:** Each route and feature is self-contained with minimal global state coupling, making it easy to plug into a shell app.
- 💡 **Developer Empathy:** TDD workflow, strong typing, and thoughtful architecture choices reduce friction and promote maintainability.
- 📦 **Minimal API Assumptions:** Due to known SWAPI limitations, fallback mechanisms like lazy loading and local caching are used to ensure consistent UX.
- 🧪 **Test Coverage by Design:** From the start, we prioritized testability across logic layers and edge cases.

---

## 🧱 Architecture Overview

The Swapi App follows a **layered architecture** designed for clarity, separation of concerns, and micro-frontend compatibility.

---

### 📂 Directory Responsibilities

```txt
  /src
  ├── pages/        # Route-level containers only:
  │                 # • HomePage, DetailPage, SearchPage, FavoritesPage, NotFoundPage
  ├── features/     # Domain logic and stateful modules:
  │                 # • inline edit logic for characters, planets, films, starships
  ├── components/   # Pure, reusable UI components:
  │                 # • Card, Loader, FavoriteToggle, SearchInput, etc.
  ├── services/     # RTK Query APIs and cache logic:
  │                 # • Endpoint definitions, reverse mapping code
  ├── store/        # Redux setup and persistence:
  │                 # • store.ts, slices (favorites, edits, cache), persist config
  ├── hooks/        # Generic reusable React hooks:
  │                 # • useIntersectionObserver, useCacheBoot
  ├── utils/        # Pure helper functions & trackers:
  │                 # • clsx, debounce, planetFetchTracker (dedupe tracker)
  ├── constants/    # App-wide constants:
  │                 # • API URLs, theme tokens, route paths
  ├── types/        # Shared TypeScript types:
  │                 # • Character, Planet, Film, Starship, etc.
```
* **Pages**: orchestrate routes; import feature logic & components.
* **Features**: encapsulate business/domain logic; reusable beyond pages.
* **Components**: UI primitives, stateless.
* **Services**: handle data fetching (RTK Query) and caching strategies.
* **Store**: configures Redux, slices, and persistence behavior.
* **Hooks/Utils/Constants/Types**: self-explanatory and used across layers.

> Updating the codebase to reflect this structure ensures clean separation and better maintainability.

---

## 🌐 Routing Structure

Routing is managed by **React Router DOM**:

```txt
  /                       → redirect → /home
  /home                   → HomePage (CharacterList)
  /character/:characterId → DetailPage
  /search                 → SearchPage
  /favorites              → FavoritesPage
  /*                      → NotFoundPage
```

- Routes are defined in `/routes/index.tsx`
- Integration-ready for MFE shells via isolated route mounting

---

### 🧩 Micro‑Frontend Compatibility

#### ✅ What We’ve Already Achieved

- **Route-based isolation**: Each route and its pages are modular and self-contained.  
- **Layered structure**: UI, logic, data, and state layers are clearly separated.  
- **Global state configured**: Redux store is centralized but could be isolated in a host/shell context.

---

#### 🔧 What We Could Do Next

1. **Module Federation (via Webpack/Vite)**  
   - Expose each page/feature as a remote module, to be dynamically loaded by a shell.

2. **CSS isolation**  
   - Prevent style bleed using Shadow DOM, or through PostCSS prefixing/scoping (e.g. `postcss-prefixwrap`).

3. **Runtime loading**  
   - Dynamically import feature modules at route mount (e.g., using `import()` and React.lazy).

4. **Shared dependencies**  
   - Use Module Federation to share critical libraries (React, Redux, RTK, React Router) as singletons and avoid duplication.

---

### 🚀 Shell‑Based MFE Integration

In a typical **shell-to-remotes architecture**:

- The **shell** handles global concerns: Redux store, theming, routing, analytics.
- Each feature page is exposed as a **remote** via Module Federation, hosted independently.
- At runtime, the shell dynamically loads and mounts these remotes:

```js
await __webpack_init_sharing__('default');
const container = window['swapi_app_remote'];
await container.init(__webpack_share_scopes__.default);
const Page = await container.get('./HomePage');
```
---

## 🧰 Developer Ergonomics

- 🔄 Hot reload with **Vite**  
- ✨ Strong TypeScript support (`*.ts`, `*.tsx` only)  
- ✅ ESLint + Prettier enforcing consistent style and formatting  
- 🧪 Testable architecture:
  - Clean layering enables easy mocking of logic and API
  - Features are unit-tested independently
  - Integration tests (Cypress) validate real-world flows

---

## 🧱 Scalability Notes

The architecture is intentionally designed to support future growth:

- **Add new features** (e.g. Vehicles, Species) under `/features` with minimal changes  
- **Scoped slices** and **lazy-loaded routes** ensure efficient bundle splitting  
- Supports **shell-based MFE integration**, enabling host apps to inject features dynamically  
- Facilitates **plugin-style injection** of new UI modules without global refactor, ensuring flexibility and maintainability

---

## 🔌 API Strategy

This section describes how we interact with the SWAPI.tech backend—highlighting our caching, deduplication, and offline-first strategies to work around API limitations and design goals.

---

### 💡 SWAPI Challenges

- **Limited `/people` data**: We use `/people?expanded=true`, but critical fields like homeworld are still missing.
- **No direct relationships** for films/starships on character endpoints.
- **Search endpoint lacks pagination**, potentially returning large result sets.
- **Read-only API**: Requires workarounds to support editing or favorites via local state.

---

### ⚙️ Fetching Techniques

#### 1. Paginated Character Loading

- Use RTK Query to fetch `/people?expanded=true` with page numbers.
- Use the `next` pointer in the API response to manage infinite loading.

#### 2. Lazy Planet Fetching & Deduplication

- Planet details (homeworld) are fetched **on-demand** when viewing characters.
- We track fetched planets using:
  - **Redux slice**: `planetById`, storing fetched planet data.
  - **In-memory cache**: `planetFetchTracker: Record<string, boolean>` to prevent duplicate API calls in the same session.

#### 3. Boot-time Global Preload & Reverse Mapping

- We fetch **all Films and Starships** at app startup.
- Build reverse mappings:
  - `characterId → array of films`
  - `characterId → array of starships`
- Enables quick relational lookup without extra API calls.

---

### 🧠 Caching & Resilience Strategy

- **Cache-first with Redux Persist**:
  - RTK Query caches requests, storing data in Redux.
  - Redux Persist maintains this cache across sessions, offering offline usability.
- **Availability over Consistency**:
  - Prioritizing availability, accepting stale data as acceptable in our static fictional context.
  - This aligns with CAP theory—favoring **Availability and Partition Tolerance** over strict consistency.
- **API rate-limit awareness**:
  - Avoiding redundant calls through deduplication reduces strain.
  - If needed, could be extended with throttling or retry logic.

---

### 🔄 Efficient Search Results Handling

- Debounced search input reduces API load.
- Use `react-window` virtualization to render large result sets efficiently, emulating pagination without backend support.

---

### 🗃️ Handling Errors & Rate Limits

- UI uses RTK Query `isLoading`, `isError` states for clear feedback.
- No complex rate-limit logic implemented yet:
  - Could be enhanced using retry logic or exponential backoff in `baseQuery`.
- Offline experience stays graceful thanks to persisted cache.

---

### 📦 Why We Prioritized Caching

1. **Performance**: Minimize latency and API calls to improve user experience.
2. **Efficiency**: Deduplication via `planetFetchTracker` saves bandwidth and API usage.
3. **Offline usability**: Persisted cache ensures the app remains usable without constant connectivity.
4. **API reliability**: SWAPI.tech may have rate limits or intermittent issues—our design mitigates these.
5. **Fictional data**: Since data doesn't change often, serving slightly stale data is acceptable and expected.

---

### 🧭 Summary

Our API layer blends multiple strategies:

- **Lazy-loading** of planet/homeworld data with in-memory dedupe
- **Boot-time preloads** of global entities with reverse indexing
- **Cache-first persistence** for offline-first UX
- **Efficient virtualization** for search results
- **Resilient UX** through error handling

Together, this ensures a performant, maintainable, and developer-friendly approach—optimizing for the static environment and the limitations of SWAPI.tech.

---

# 🧪 Testing Strategy

This application was built with a **TDD-first mindset**, balancing **unit**, **integration**, and **end-to-end (E2E)** tests to ensure long-term stability and confidence.

---

## ✅ What’s Covered

| Layer        | Tools                | Scope                                                              |
|--------------|----------------------|---------------------------------------------------------------------|
| Unit         | Jest + RTL           | Functions, Redux slices, utilities, UI components, hooks            |
| Integration  | Jest + RTL           | RTK Query hooks, editing workflows, component logic                 |
| End-to-End   | Cypress              | Full user journeys: home, search, favorites, character detail, edit |
| Helpers      | `makeTestStore`, `cy.prepareCharacterDetailPage` | Store injection, reusable Cypress setup              |

---

## ✅ Unit Testing (Jest + RTL)

Focused on isolated logic and Redux behavior:

- **Redux slices**:
  - `characterSlice`, `favoriteSlice`, `searchSlice`, `editedCharacterSlice`, `cacheSlice`
- **Reusable UI components**:
  - `CharacterCard`, `GenderInfo`, `VirtualizedGrid`, etc.
- **Utility functions**:
  - Deduplication, pagination keys, debounce logic
- **Custom hooks**:
  - `useCharacterData` (location vs. API merging)

---

## 📈 Unit Test Coverage Summary

> ✅ **Statements**: 92.36%  
> ✅ **Branches**: 82.19%  
> ✅ **Functions**: 85.88%  
> ✅ **Lines**: 92.3%

> 📄 See full report here: [`docs/coverage/unit_test_coverage.md`](./docs/coverage/unit_test_coverage.md)

To regenerate:

```bash
  yarn test:coverage
```

---

## 🔍 Integration & E2E Testing (Cypress)

Covers **real user journeys and UI correctness** using `Cypress` and `data-testid` selectors.

---

### 🌌 Character List Page (`/`)
- Infinite scroll implemented via `react-window`
- Page deduplication logic using `characterPageFetchGuard`
- Favorite toggle interactions persist to Redux
- Navigation to character detail page via card click

---

### 🔎 Search Page (`/search`)
- Debounced search field handles async updates
- Valid and invalid query states handled:
  - E.g., "darth" → results shown
  - "zzz" → empty message
- Detail page route tested from search results

---

### ⭐ Favorites Page (`/favorites`)
- Renders favorited characters correctly
- Toggle/unfavorite directly from favorites page
- Shows empty state when list is cleared

---

### 🧬 Character Detail Page (`/character/:id`)
- Loads data from:
  - `location.state.character` if passed
  - Or fallback: `useGetCharacterByIdQuery(id)`
- Verifies:
  - `character-name` and all properties
  - `film` and `starship` sections (or empty states)
  - Planet info fetched (with `data-testid="planet-key"`)
- Inline edit mode:
  - Editable fields: `height`, `mass`, `skin_color`, `hair_color`, `eye_color`
  - `save-updates` and `cancel-updates` buttons tested
- Favorite button toggles Redux state

---

### 🧭 Routing & Navigation
- All navbar routes work correctly:
  - Home → `[data-testid="home-route-link"]`
  - Search → `[data-testid="search-route-link"]`
  - Favorites → `[data-testid="favorites-route-link"]`
  - Logo → `[data-testid="app-logo-home-route-link"]`
- 404 (`/invalid-page`) renders:
  - `character-not-found` or page not found text
  - Go to Home button navigates back

---

### 🚀 Additional Utilities

- `cy.prepareCharacterDetailPage(id, shouldExist)`  
  → A custom Cypress command that:
  - Waits for the loader to render/disappear
  - Verifies detail page or not-found state based on `shouldExist`

```ts
  cy.prepareCharacterDetailPage('1', true);
  cy.prepareCharacterDetailPage('1000', false);
```
---

## ⚙️ Mocking Strategy (No MSW)

> We considered using **Mock Service Worker (MSW)** for fully intercepting API calls, but opted for a simpler, more stable approach due to environment limitations.

### ❌ Why MSW Was Skipped

- **Node 20+ Compatibility Issues**:
  - `BroadcastChannel` and `TransformStream` polyfills are not fully supported in the Node environment Cypress and Jest rely on.
- **JSDOM Limitations**:
  - Streaming requests and `Response.body` behaviors aren't well supported in testing environments.

---

### ✅ What We Use Instead

- **Jest + React Testing Library**:
  - RTK Query hooks are mocked directly at the unit level.
  - This avoids the need for full network simulation.
  - Example: `jest.mock('../../features/characters/characterApi')`

- **Cypress**:
  - Cypress tests rely on **real network calls** to SWAPI during development.
  - Fallback and loading states are tested directly from the UI.

> ⚡ This strategy keeps tests fast, avoids brittle mocks, and supports progressive enhancement.

---

## 🧪 Test Commands

```bash
  # Run all unit tests
  yarn test

  # Run tests and generate coverage report
  yarn test:coverage

  # Launch Cypress Test Runner UI
  yarn cy:open

  # Run Cypress E2E tests in headless/CI mode
  yarn cy:run
```

> 💡 Tip: Use data-testid attributes for stable Cypress selectors.

---

## 💾 Caching & Persistence

This section explains our cache-first, offline-capable strategy and why it optimizes for user experience, resilience, and API limitations.

---

### ✅ Goals

- **Minimize network requests** for performance.
- **Persist data across sessions**, even offline.
- **Avoid redundant fetches**, especially for planets.
- **Handle SWAPI’s potential rate limits** gracefully.
- **Favor availability over consistency**, which suits our use-case.

---

### 🧠 Caching Layers

1. **RTK Query Cache**  
   - All fetched data (characters, films, starships, planets) is stored in the Redux cache via RTK Query.

2. **Redux Persist**  
   - Persists the entire Redux store to local storage, enabling:
     - Full app rehydration on reload.
     - Offline usage with data integrity.
     - Avoiding unnecessary API calls on revisit.

3. **In-Memory Deduplication**  
   - We maintain an in-session cache:
     ```ts
     export const planetFetchTracker: Record<string, boolean> = {};
     ```
     - Prevents repeated planet fetches during a session.
     - Works alongside the `planetById` slice, ensuring we only fetch new data when needed.

---

### ⚖️ Why Cache-First?

Our caching strategy is informed by CAP theorem principles — in a distributed system with network partitions, one must choose between consistency or availability.

We deliberately **favor Availability and Partition Tolerance (AP)**:

- **Availability**: The app always responds, even with stale data.
- **Partition Tolerance**: The app remains functional offline, cached reads continue.
- **Consistency**: Minor staleness is acceptable for our static dataset.

#### Real-world analogies:

- News apps or catalog browsers often show cached content when offline.
- Our use-case (Star Wars characters) tolerates slight staleness.

---

### 🚫 Trade-Offs & Edge Cases

- **Stale data**: Planet names or film counts may update upstream—but rarely; acceptable for UX.
- **LocalStorage limits**: Redux Persist rehydrates small serialized data—this scale is safe for our dataset.
- **Cache poisoning**: If corrupt data is persisted, manual `clear site data` will fix it.
- **No conflict-resolution needed**: No user-submitted data sync or multi-device editing.

---

### 🗃️ State Structure (Persisted)

These Redux slices are persisted via Redux Persist to maintain data across sessions and reloads:

#### 📦 cacheSlice – Global Resource Cache

```ts
  const initialState: CacheState = {
    filmsById: {},
    starshipById: {},
    planetsById: {},
    characterToFilms: {},
    characterToStarship: {},
  };

  export const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
      setFilms(state, action: PayloadAction<Record<string, FILM>>) {
        state.filmsById = action.payload;
      },
      setStarship(state, action: PayloadAction<Record<string, STARSHIP>>) {
        state.starshipById = action.payload;
      },
      setPlanets(state, action: PayloadAction<Record<string, PLANET>>) {
        Object.assign(state.planetsById, action.payload);
      },
      setCharacterToFilms(state, action: PayloadAction<Record<string, string[]>>) {
        state.characterToFilms = action.payload;
      },
      setCharacterToStarship(state, action: PayloadAction<Record<string, string[]>>) {
        state.characterToStarship = action.payload;
      },
    },
  });
```

#### ✏️ editedCharacterSlice – User Edits Cache

```ts
  interface EditCacheState {
    editedCharactersById: Record<string, EditedFields>;
  }

  const initialState: EditCacheState = {
    editedCharactersById: {},
  };

  export const editedCharacterSlice = createSlice({
    name: 'editedCharacter',
    initialState,
    reducers: {
      setCharacterEdits: (state, action: PayloadAction<{ uid: string; changes: EditedFields }>) => {
        const { uid, changes } = action.payload;
        state.editedCharactersById[uid] = {
          ...state.editedCharactersById[uid],
          ...changes,
        };
      },
      resetCharacterEdits: (state, action: PayloadAction<string>) => {
        delete state.editedCharactersById[action.payload];
      },
    },
  });
```
---

#### ❤️ favoritesSlice – Favorite Characters Store

```ts
  interface FavoritesState {
    favoriteCharacters: Record<string, CHARACTER>;
  }

  const initialState: FavoritesState = {
    favoriteCharacters: {},
  };

  export const favoritesSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
      toggleFavorite(state, action: PayloadAction<CHARACTER>) {
        const id = action.payload.uid;
        if (state.favoriteCharacters[id]) {
          delete state.favoriteCharacters[id];
        } else {
          state.favoriteCharacters[id] = action.payload;
        }
      },
      updateFavoriteCharacter(
        state,
        action: PayloadAction<{ id: string; updates: Partial<CHARACTER['properties']> }>
      ) {
        const { id, updates } = action.payload;
        if (state.favoriteCharacters[id]) {
          state.favoriteCharacters[id].properties = {
            ...state.favoriteCharacters[id].properties,
            ...updates,
          };
        }
      },
    },
  });
```

---

### ✨ Summary

Our multi-layer cache approach delivers:

- **Fast load times** (no wasted network rounds)
- **Offline-first capability**
- **Deduplication at both session and persisted levels**
- **Graceful handling of stale data in a read-heavy static app**

This ensures a robust, resilient experience built around SWAPI’s strengths and limitations.

---

## 🧩 Micro‑Frontend Compatibility

The Swapi App’s architecture is purposefully structured to support future **micro‑frontend (MFE)** deployment. This section outlines what we've implemented and how we can evolve it further.

---

### ✅ What We’ve Achieved So Far

- **Route-based isolation**: Each route and its associated page is a self-contained module.
- **Layered design**: UI, logic, data, and state layers are clearly separated.
- **Centralized Redux store**: Ready to be scoped or shared within a shell if needed.

---

### 🔧 What We Can Do Next

1. **Module Federation (via Webpack/Vite)**  
   - Use Module Federation to expose pages/features as remotes dynamically loaded by a host shell.

2. **CSS isolation**  
   - Prevent style bleed-out using Shadow DOM, CSS module prefixes, or Tailwind scoping (e.g., `postcss-prefixwrap`).

3. **Runtime feature loading**  
   - Dynamically import features using `import()` and `React.lazy()` during route initialization.

4. **Shared dependencies**  
   - Configure shared React, Redux, RTK, React Router as singletons through Module Federation to prevent version duplication.

---

### 🚀 Shell-Based MFE Architecture

In a typical host-shell design, you would:

- Maintain a **host shell** responsible for global providers (Redux, theming, routing).
- Define **remote modules** for each page/feature (Home, Detail, Search, Favorites).
- Dynamically load remotes at runtime:

```js
  await __webpack_init_sharing__('default');
  const container = window['swapi_app_remote'];
  await container.init(__webpack_share_scopes__.default);
  const Page = await container.get('./HomePage');
```
- Use shared state or event buses to communicate between shell and remotes — keeping coupling minimal

---

### ⚠️ Best Practices & Considerations

- Keep MFEs small and focused — don’t over-modularize.
- Use independent deployment pipelines for each micro-frontend.
- Clearly define integration contracts — shared state/data interfaces or events
- Plan for error resilience — use error boundaries and fallbacks if remote fails to load 
- Avoid dependency mismatches — version conflicts must be managed carefully 

--- 

### 🧭 Summary

We’re architecturally ahead of the curve: routes and features are structured for MFE. The next step includes implementing Module Federation, isolating styles and shared dependencies, and establishing robust deployment and failure strategies. This future-proofs the app for enterprise-scale modular expansion while maintaining cohesion and performance.

---

## 🎨 Styling & Theming

This section outlines how we handle theming, responsiveness, and style isolation to maintain the Swapi App's consistent "Star Wars Dark" aesthetic.

---

### 🌑 Star Wars Dark Theme (Default, Static)

- The app enforces a single, static **dark theme** inspired by Star Wars UI — no light mode or theme toggle.
- We tailored Tailwind’s custom config to align with this Timeless Star Wars aesthetic:
  - Moody shades of dark gray, navy, and Sith-red accents — echoing iconic UI elements from the franchise.
  - Encourages a sleek, immersive experience with high contrast and low eye strain — ideal for viewing in dark environments.

---

### 🎨 Design Tokens & Tailwind Configuration

- We define semantic theme tokens in Tailwind (`theme-primary`, `theme-background`, `theme-text`, etc.).
- Semantic names (e.g., `bg-theme-background`) prevent arbitrary values and enable consistent styling across components.
- Spacing, typography, and breakpoints are standardized for better design cohesion.

---

### ⚛️ Component‑Level Styling

- Components use **Tailwind utility classes** exclusively, along with meaningful theme tokens.
- Custom CSS is avoided; when needed, we leverage Tailwind’s `@apply`.
- This keeps styling consistent, reusable, and compliant with the dark theme aesthetic.

---

### 📐 Responsive Design

- Responsive utilities (`sm:`, `md:`, `lg:` etc.) ensure layouts adapt across devices.
- Design breakpoints were tested for real-world screen versatility (mobile → desktop).

---

### 🧩 CSS Isolation for Future MFE

To ensure style integrity in micro-frontend contexts:

1. **`important: true`** in Tailwind config ensures our dark styles aren't overridden by host environments.
2. Future scope options:
   - **PostCSS prefixwrap** (e.g., `.swapi-root { … }`) to namespace styles.
   - **CSS Modules** or **Shadow DOM** for isolating feature styling within remotes.

---

### 🧭 Summary

Our use of a **single Star Wars-inspired dark theme** provides:

- A consistent, immersive aesthetic aligned with franchise UI design.
- A maintenance-friendly styling system using theme tokens.
- Foundation for responsive and micro-frontend-ready layout.

---

## 🔧 Important Design Decisions

This section documents the key design rationales behind major architectural and implementation choices, helping future developers understand *why* things were built a certain way—beyond just *what* they do.

---

### 🧠 1. Isolation Through Layered Architecture

**Decision:** We structured the codebase into layers (`pages`, `features`, `components`, `services`, `store`, `hooks`, `utils`, `constants`, `types`).  
**Why:** This follows the principles of Separation of Concerns and Single Responsibility — critical for maintainability, testability, and gradual scaling.

---

### 🔍 2. Cache-First over On-Demand Fetching

**Decision:** Use RTK Query + Redux Persist + deduplication (`planetFetchTracker`) to minimize network calls.  
**Why:** Prioritize **Availability** over **Consistency**, given SWAPI is static and rate-limited. Cached data ensures fast loading and offline tolerance—even if slightly stale.

---

### 🛠️ 3. Boot-Time Preload & Reverse Mapping

**Decision:** Fetch all films and starships at startup and build `characterId → list` mappings.  
**Why:** Compensates for SWAPI's lack of direct relations in `/people`, eliminating repeated fetches and improving performance in detail views.

---

### ✏️ 4. Local Inline Editing & Favorites

**Decision:** Implement inline editing and favorites using Redux slices (`editedCharactersById`, `favoriteCharacters`) — no backend support.  
**Why:** SWAPI is read-only. We simulated user-driven mutations locally to demonstrate full-stack feature behavior without requiring backend changes.

---

### 🧪 5. TDD and Testable Design Approach

**Decision:** Adopt TDD (tests written before/alongside code) across units, features, and append integration/E2E suites.  
**Why:** TDD enforces behavior-first development, helps produce cleaner, modular API hooks, and minimizes regressions.

---

### 🌑 6. Star Wars‑Inspired Dark‑Only Theme

**Decision:** Use a single, static dark theme styled via Tailwind tokens with no runtime switching.  
**Why:** Aligns with the aesthetic of Star Wars UIs and simplifies development by avoiding theme toggles and related complexity.

---

### 🧩 7. Micro‑Frontend Readiness

**Decision:** We structured routes/components with modularity and scoped styles (`important: true`, prefixing) in mind.  
**Why:** To allow future integration as independent micro-frontends using Module Federation—without rearchitecting for runtime loading or isolation.

---

### 🧐 8. Documentation for Design Rationale

**Decision:** Use this section to document the *why* behind decisions, not just the *what*.  
**Why:** Following design rationale best practices (ADR, QOC models) promotes future maintainability and clarity in architectural evolution.

---

### 🧭 Alternatives Considered

- **MSW for mocking** was dropped due to Node polyfill issues (`BroadcastChannel`, `TransformStream`) and complexity.
- **Light/Dark theme toggle** was considered but later removed to favor focused design and rapid implementation.

---

### ✅ Summary

These documented decisions explain why our architecture is organized as it is, why we prioritized availability and testability, and how our choices lead to an app that's easy to maintain, scale, and evolve.  

---

## 🧰 Tooling & Developer Experience (DX) Setup

This section covers the tools and configurations that ensure consistent code quality, streamlined development, and quick onboarding.

---

### 🔧 Core Tooling Stack

- **Vite** – Fast dev server with hot module replacement.
- **TypeScript** – Strong typing and code safety across `.ts` / `.tsx`.
- **ESLint** – Static code analysis for bug prevention and style consistency.
- **Prettier** – Automated formatting, backed by ESLint for conflicts.
- **Husky + lint-staged** *(optional but recommended)* – Enforces lint/format rules via pre-commit hooks.
  *Why*: Prevents style or lint violations from entering version control—a widely adopted standard in collaborative teams.

> Note: As the sole developer, Husky isn’t installed. However, if the project expands, consider adding Husky + lint-staged to enforce consistent code style before commits.

---

### 🪛 Project Bootstrap Script

To quickly scaffold the app, we provide a setup script: [`./docs/setup/init-project.sh`](docs/setup/init-project.sh)

or you can simply run. 

```bash 
  bash ./docs/setup/init-project.sh
```

This creates a new Vite + React + TypeScript project with:

* Tailwind v3, PostCSS, Autoprefixer
* React Router & Redux Toolkit
* Axios, ESLint, and Prettier
* Git initialization and initial commit

---

### 🛠️ Setup & Workflow Steps

1. **Project setup script**
  ```bash
    cd swapi-app
    bash ./scripts/setup.sh
  ```

2.  All dependencies are installed automatically by the script (Vite, React, TS, Tailwind,     Router, Redux, Axios, ESLint, Prettier, etc.).

3. (Optional) Install **Husky** & lint-staged if you're collaborating with others to enforce pre-commit checks:
  ```bash
    yarn add -D husky lint-staged
    npx husky install
  ```
4. (Optional) Configure lint-staged in package.json:
  ```jsonc
    "lint-staged": {
      "src/**/*.{ts,tsx}": [
        "eslint --fix",
        "prettier --write"
      ],
      "*.{json,md}": [
        "prettier --write"
      ]
    }
  ```
5. (Optional) Add a Husky pre-commit hook:
  ```bash
    npx husky add .husky/pre-commit "npx lint-staged"
  ```
---

### ✅ Developer Experience & Benefits

- Mobility: Fast hot-reload dev cycle via Vite.
- Consistency: ESLint + Prettier enforce uniform code style.
- Quality Gates: Optional Husky + lint-staged ensure clean commits when working in teams.
- Onboarding speed: The setup script gets new developers running instantly.
- Clean history: Pre-commit checks keep PRs and commit history tidy.

--- 

### 🪶 Optional Enhancements

- Commit message linting using Commitlint.
- CI integration: Run lint, test, and lint-staged on every PR.
- IDE integration: Auto-format on save and integration of ESLint/Prettier in the IDE.

---

### 🧭 Summary

Our setup workflow promotes a fast, consistent, and high-quality development environment. The optional Git hooks can be added as the team grows to help maintain code hygiene and reduce manual formatting work.

---

## ⚠️ Known Limitations / Gotchas

This section highlights important constraints, architectural quirks, and user-experience considerations to watch out for during development or future enhancement.

---

### 1. Infinite Scroll UX Constraints

- **Back button usability**: Users navigating back from a character detail often land at the top of the list, potentially losing their scroll position.  
- **Footer access**: Continuous loading could prevent users from accessing footer content (if present).  
- **Searchability issues**: `Ctrl + F` may not locate content loaded dynamically beyond the current viewport.

---

### 2. SEO / Shareability Concerns

- The infinite scroll approach can make deep-linking to specific characters unreliable since every route must rebuild scroll state dynamically, and search engines may not discover content loaded via scroll.

---

### 3. SWAPI Rate Limits

- SWAPI.tech limits API calls to ~10,000 requests per IP/day. Heavy dev activity may exceed this.  
- Our dedupe logic and caching strategy help mitigate, but watch for temporary blocks.

---

### 4. Stale Data Risk

- Cache-first design can show outdated data (e.g., new films/starships added after initial fetch).  
- While acceptable for a static Star Wars dataset, it may create inconsistencies during long-running sessions.

---

### 5. LocalStorage Size.

- Redux Persist may hit storage limits if user experiments with inline editing or favorites extensively.  
- Currently no eviction strategy in place—consider implementing LRU or size-cap policies if needed.

---

### 6. No Offline Service Worker

- Users offline post-initial-load can still navigate cached data, but the app won’t load without initial assets because there’s no service worker or PWA support.

---

### 7. Accessibility Gaps

- Infinite scroll may hamper accessibility for screen readers and keyboard users who can’t easily navigate dynamically loaded content}.
- No ARIA roles indicating “feed” or section landmark for continuous content.

---

### 🔧 Mitigation Suggestions

- Use **Session Storage** to remember scroll positions for back button navigation.
- Add a `Load More` button fallback at the bottom of scroll containers for better UX and footer access.
- Consider **service worker** for offline asset caching.
- Monitor cache growth; implement eviction based on size or age.
- Add minimal ARIA roles (e.g., `role="feed"`, `aria-live`) to improve accessibility.

---

### 🧭 Summary

While the Swapi App is feature-rich and performance-focused, developers should be aware of:

- Infinite scroll UX / SEO limitations
- Potential rate limits and stale data behavior
- Storage constraints and offline loading gaps
- Accessibility improvements needed

---

## 🚀 Future Enhancements

As the app matures, here are several strategic improvements that could elevate user experience, performance, and resilience.

---

### 🔧 1. PWA & Service Worker Support

- **Introduce a Service Worker** to cache assets and dynamic data (app shell + JSON). This enables full offline capability and quicker load times.
- **Cache strategies**: Use "cache first" for static assets and "stale-while-revalidate" for API requests.
- Provide an **offline fallback page** displayed when the user is disconnected.

---

### ⚙️ 2. Infinite Scroll + Pagination Hybrid

- Convert to a hybrid approach: visually infinite scroll but backed by **paginated component URLs** (e.g., `?page=2`) that work without JavaScript.
- Use `history.pushState()` to update URLs during scroll, improving navigability and bookmark-ability.
- Add a “**Load More**” button fallback to improve accessibility, usability, and footer reach.

---

### 🔍 3. SEO Enhancements

- Expose each scroll page via a unique URL, enabling search engine indexing.
- Server-side rendering (SSR) or pre-render critical pages like `/character/:id` to improve crawlability and social sharing metadata.

---

### 🛡️ 4. User Consent & Security Enhancements

- Secure any web storage/caches to prevent data injection or poisoning.
- Validate and sanitize all remote content stored in caches.

---

### 🚧 5. Cache Size Limits & Eviction Policies

- Monitor **Redux Persist** storage use.
- Add **LRU-style eviction** or an expiration policy to keep stored data within safe limits.

---

### 🦾 6. Comprehensive Accessibility Improvements

- Add ARIA roles (e.g., `role="feed"`, `aria-live`) for dynamic lists.
- Ensure interactive controls (search, load more) are keyboard accessible and screen-reader friendly.

---

## 🧭 Roadmap Compass

| Initiative                    | Benefit                                                   |
|-----------------------------|------------------------------------------------------------|
| PWA & Offline Support       | Faster load & full offline usability                      |
| Infinite Scroll Hybrid      | Better SEO, accessibility, and deep-linking              |
| SEO & SSR Improvements       | Enhanced indexing and social media share previews         |
| Storage & Cache Policies    | Safe and efficient client-side persistence               |
| Accessibility Enhancements | Inclusive UX for all users                                |

---

## 👨‍💻 Author & Maintainer

**Pritam Kininge**  
Frontend Developer • React, TypeScript, TDD  
📍 Navi Mumbai, India (UTC+5:30)  
📅 Last Updated: June 26, 2025

For questions, feedback, or collaboration, feel free to connect:  
[GitHub](https://github.com/kininge) | [LinkedIn](https://linkedin.com/in/pritam-kininge) | [Leetcode](https://leetcode.com/u/kininge007/)


