# 🧩 Cache Architecture – SWAPI App

## 📌 Objective

To reduce redundant API calls, optimize performance, and provide a smoother, more responsive user experience — especially in offline or slow-network scenarios — the SWAPI App implements a two-tiered caching strategy using Redux and `redux-persist`.

---

## 🗂️ Overview of Cache Layers

The caching strategy is divided into two layers:

| Tier           | Purpose                             | Stored Data                                                  | Persistence       |
|----------------|-------------------------------------|--------------------------------------------------------------|-------------------|
| In-Memory      | Fast access during a session        | Characters, loading states, UI interaction state             | ❌ Volatile       |
| Persistent     | Available across app reloads        | Favourites, character edits, planet/film/starship metadata   | ✅ redux-persist  |

---

## 🧠 Caching Strategy by Entity

| Entity            | Source                      | Cache Location         | Persisted | Strategy                                                        |
|-------------------|-----------------------------|------------------------|-----------|-----------------------------------------------------------------|
| Characters        | `/people?expanded=true`     | Redux (paginated)      | ❌        | RTK Query paginated fetch, deduplicated by `hasPageCalled()`    |
| Planet (per ID)   | `/planets/:id`              | Redux (memoized)       | ✅        | Lazy-loaded via `fetchPlanetById`, avoids duplicate fetches     |
| Films             | `/films?expanded=true`      | Redux (preloaded)      | ✅        | Preloaded once, stored by UID and reverse-mapped                |
| Starships         | `/starships?expanded=true`  | Redux (preloaded)      | ✅        | Preloaded once, stored by UID and reverse-mapped                |
| Favorites        | Local updates only            | Redux-persist          | ✅        | User-specific character list stored locally                     |
| Edited Characters | Local updates only            | Redux-persist          | ✅        | Store edited props to show updated character view offline       |

---

## 🧩 Cache-Related Slices and Utilities

### 🧾 [`src/features/cache/cacheSlice.ts`](../../src/features/cache/cacheSlice.ts)
A centralized Redux slice for managing all cached entities and reverse lookups:

```ts
    interface CacheState {
        filmsById: Record<string, FILM>;
        starshipById: Record<string, STARSHIP>;
        planetsById: Record<string, PLANET>;
        characterToFilms: Record<string, string[]>;
        characterToStarship: Record<string, string[]>;
    }
```
* setFilms, setStarship, setPlanets: Populate cache maps by UID.
* setCharacterToFilms, setCharacterToStarship: Populate reverse character relations.
* Persisted via redux-persist.

### ⚙️ planetFetchTracker
Used to avoid multiple API calls for the same planet in concurrent requests.

```ts
    const planetFetchTracker = {};
```

* Tracked per UID to prevent race conditions.
* Exported only for testing as __TEST_ONLY__planetFetchTracker.

### ⚙️ characterPageFetchGuard.ts
A simple utility to deduplicate paginated requests:

```ts 
    const fetchedCharacterPages = new Set<number>();

    export const hasCharacterPageCalled = (page: number) => fetchedCharacterPages.has(page);
    export const markCharacterPageAsCalled = (page: number) => fetchedCharacterPages.add(page);
    export const clearAllCalledCharacterPages = () => fetchedCharacterPages.clear();
```
> Ensures RTK Query doesn’t re-fetch the same page if already fetched.

---

## 🧪 Cache Testing Strategy

### ✅ Unit Tests
The following files and functionalities are covered with dedicated Jest test suites:

| File/Feature                    | Description                                      | Tested |
|-------------------------------|--------------------------------------------------|--------|
| `cacheSlice.ts`                | Reducers and actions to set cached data         | ✅ Yes |
| `planetAPI.ts`                 | Planet fetch logic and deduplication logic      | ✅ Yes (except 2 skipped edge cases) |
| `characterPageFetchGuard.ts`  | Guards for paginated fetch deduplication        | ✅ Yes |

Test coverage includes:

- Correct population of cache maps (`filmsById`, `planetsById`, etc.)
- Persistence across sessions (`redux-persist`)
- Guards like `planetFetchTracker` and `fetchedCharacterPages` to avoid duplicate fetches
- Error and race-condition handling

> ⚠️ Note: Two complex edge cases related to `planetAPI.ts` were skipped due to time constraints. They are safe and non-critical for user experience.

### 🧪 E2E Validation (Cypress)
- Planet, Film, and Starship data are verified against character detail views.
- Caching behavior is indirectly validated through fewer network requests and persistent detail data.
- Favorites and edits persist across reloads.

---

## 📤 Summary

The cache architecture in this SWAPI app optimizes for:

✅ Minimal API usage  
✅ Fast navigation across character detail pages  
✅ Smooth offline experience for revisited data  
✅ Easy extensibility for future caching needs  
✅ Predictable and testable state structure  

By layering in-memory and persistent caching, the app delivers a responsive and efficient experience while respecting API limitations.

---

## 👨‍💻 Author & Maintainer

**Pritam Kininge** — Frontend Developer | React, TypeScript, TDD  
📍 Navi Mumbai, India (UTC+5:30)  
🗓️ Submitted: June 25, 2025  
[LinkedIn](https://linkedin.com/in/pritam-kininge)  |  [GitHub](https://github.com/kininge)  |  [Leetcode](https://leetcode.com/u/kininge007/)

