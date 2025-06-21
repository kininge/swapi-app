# 🧠 Cache Architecture – Swapi App

This document outlines the caching strategy and data hydration plan for the Star Wars character explorer app built for the Allica Bank assignment. The cache layer ensures fast UX, reduced API load, and offline-first behavior wherever possible.

---

## ⚠️ Critical Note on Backend API Limitations

> One of the biggest limitations in [swapi.tech](https://swapi.tech)'s `/people` API is the **absence of any film or starship references** in the character response — even with `expanded=true`.

This makes it **impossible to know**:
- Which **films** a character appears in
- Which **starships** a character pilots

Yet, the assignment *requires* us to show:
- A character's film appearances
- The starships flown by a character

---

### ✅ Solution: Reverse-Map via Film & Starship APIs

To overcome this:
- We **preload** all films and starships on app boot
- Then we **reverse-map characters** from these datasets

This architecture enables us to:
- **Link characters to their films and starships** reliably
- Cache this enriched data for **fast UX** and **offline support**
- Avoid blocking the UI for missing relationships

> 🧠 Without this approach, the app would have to make dozens of chained API calls per character — which is unacceptable for performance, DX, or UX.

---

## 🎯 Goals

- Enable smooth, non-blocking user experience
- Cache data intelligently to minimize redundant network calls
- Avoid UI flickering or loading states unless absolutely necessary
- Use persistent local device storage (`redux-persist`) for key datasets
- Maintain separation between server-side data and client-local edits

---

## 🗂️ What We Cache

| Entity         | Cache Location     | Lifetime        | Usage                            |
|----------------|--------------------|------------------|-----------------------------------|
| Characters     | In-memory (RTK)     | Per session     | List rendering, search           |
| Planets        | redux-persist       | Long-term       | Hydrate homeworld name           |
| Films          | redux-persist       | Long-term       | Link characters to films         |
| Starships      | redux-persist       | Long-term       | Link characters to starships     |
| Favourites     | redux-persist       | Long-term       | Persisted by device              |
| Edits (UI-only)| redux-persist       | Long-term       | Offline edit support             |

---

## 🧩 Data Flow Example

### 🧱 Character Card Rendering (List Page)

> Goal: Display `name`, `gender`, and `home planet` for each character.

---

### ✅ Step 1: Initial Character Fetch

**API Call**
GET /people?page=1&limit=10&expanded=true

**Outcome**
- Returns list of characters (with `name`, `gender`, `homeworld` as URL reference).
- Stored in **Redux in-memory** via RTK Query.

---

### ✅ Step 2: Enriching Each Card with Home Planet

**Planet Name Lookup Flow**
1. For each character in the list:
    - Extract `homeworld.url`.
2. Check if the `planet[id]` is in the persisted cache:
    - ✅ **If present** → Use cached planet name.
    - ❌ **If absent**  → Call API:

    ```
    GET /planets/:id
    ```

    → Cache the result in `redux-persist`.

---

### 🖼 Final Output: Character Card UI

```txt
┌────────────────────────────────────────────┐
│ Name:       Chewbacca                      │
│ Gender:     Male                           │
│ Homeworld:  Kashyyyk                       │
└────────────────────────────────────────────┘
```
Homeworld field appears after async hydration if not cached initially.

## 🚀 App Boot: Global Preloading (Films & Starships)

To support character detail pages, search enrichment, and filter-ready UI, we preload auxiliary datasets at application startup.

---

### 🎬 Films Cache Flow

1. On app load, check if `films` exist in the redux-persist store.
2. If missing:
    ```
    GET /films?expanded=true
    ```
3. Extract and persist:
    - Film metadata (title, release date, etc.)
    - Character IDs linked to films
    - Linked starships, species, and planet IDs

> 🧠 This enables fast lookups for:
> - Character-to-Film mapping
> - Enriched detail views without nested calls

---

### 🛸 Starships Cache Flow

1. On app load, check if `starships` are cached.
2. If missing:
    ```
    GET /starships?expanded=true&limit=40&page=1
    ```
3. Persist full starship list including:
    - `name`, `model`, `class`
    - `pilots` (character references)
    - `films` that include this starship

> 🔄 This creates a **reverse mapping**:
> - Starship → Characters → Films
> - Helpful for character detail views

---

### 🌍 Planets Cache Flow (Lazy + Opportunistic)

1. Characters contain `homeworld` as a URL (e.g., `/planets/14`).
2. On-demand planet enrichment:
    - First check if `planet[14]` is cached.
    - If not:
      ```
      GET /planets/14
      ```
    - Cache planet name in `planets` slice.

> 💡 Lazy-loading + caching ensures planets are only fetched **once**, ever.

---

## 📦 Cache Access Priority

When rendering any entity:
1. Attempt to resolve all relational fields (e.g., homeworld, films, starships) **from persisted cache**.
2. If missing:
    - Perform API fetch.
    - On success, cache and update display.
3. Prefer enriching `display` over blocking UI interactions.

---

## 🧠 Why This Works

This preloading strategy:
- **Minimizes runtime API calls** once booted
- Ensures **search and detail pages don’t lag**
- Keeps our app **device-persistent and offline-aware**
- Reduces perceived latency and improves **UX fluidity**

---
