# ✅ Final Submission Checklist – SWAPI App (Allica Bank)

🗓️ Submission Deadline: **June 26, 2025**  
🧑‍💻 Candidate: **Pritam Kininge**

---

## 🚀 Core Features

- [x] Character List View  
  - [x] Star Wars Universe character with data (name, gender, planet)
  - [x] Pagination for stepped results 
    > This feature changed by developer and build Infinite scroll ( stepped results ) with virtualization (`react-window`) 
  - [x] Clicking character goes to detail screen
- [x] Search Character List View
  - [x] Search character by character name
  - [x] Clicking character goes to detail screen
- [x] Character Detail View
  - [x] display: name, hair color, eye color, gender, and home planet
    > Extra added skin color, birth year, height and mass
    > Extra planet images rendering
  - [x] list the films that the character has appeared in
    > Extra film images rendering
  - [x] list the starships that the character has piloted
    > (If time permits) Extra Starship images rendering
  - [x] provide the ability to add the character to the favourites list if they 
aren’t already on it
    > user can add or remove character in favourites list
- [x] Favourites view 
  - [x] display all characters that have been added to the favourites list (name, 
height, gender & home planet)
  - [x] provide the ability to remove characters from the favourites list
- [x] (Optional) provide the ability to amend the height or gender of a character
  > user can amend 'gender', 'height', 'mass', 'skin_color', 'hair_color', 'eye_color'

- [x] Redux-persisted favorite list with global state
- [x] Planet info lazy-loaded and cached
- [x] Character search with debounce and result rendering
- [x] Responsive, accessible UI (semantic elements, keyboard accessible)
- [x] Offline-ready edits and favorites

---

## 🧪 Testing & QA

### ✅ Unit & Integration (Jest + RTL)
- [x] Redux slices (characters, favorites, edits, search, cache)
- [x] UI components tested with edge cases
- [x] Custom utilities (e.g. fetch guards) covered
- [x] >90% overall test coverage  
  - [x] Attach [`docs/coverage/unit_test_coverage.md`](./docs/coverage/unit_test_coverage.md) report

### ✅ End-to-End (Cypress)
- [x] Navigation (home → detail → back)
- [x] Inline editing syncs state
- [x] Favorite toggle persists across reloads
- [x] Planet info fetch + display tested
- [x] Search UX verified
- [x] Infinite scroll verified

---

## 📄 Documentation

- [x] [`README.md`](./README.md): feature list, architecture, setup, scripts
- [x] [`docs/architecture/architecture.png`](./docs/architecture/architecture.png): clean diagram version
- [x] [`docs/architecture/swapi-architecture.md`](./docs/architecture/swapi-architecture.md): full tech + data architecture
- [x] [`docs/architecture/cache-architecture.md`](./docs/architecture/cache-architecture.md): in-memory + persistent strategy
- [x] [`docs/dev-notes.md`](./docs/dev-notes.md): folder structure, design decisions, testing
- [ ] [`code-style.md`](./docs/code-style.md), 
- [ ] (optional) `ci-pipeline.md`, 
- [ ] (optional) `mfe-strategy.md`

---

## 🧹 Final Polish

- [x] No console warnings or dead files
- [x] All `.env.local` is gitignored and secrets-free
- [x] `yarn dev`, `yarn build`, `yarn test`, `yarn lint` all pass
- [x] No ESLint or TypeScript errors
- [x] Codebase uses modular, feature-first structure

---

## 📤 Submission

- [x] Public repo or shared access with Allica Bank reviewers
- [x] Final commit message: `feat: Final submission for Allica Bank`
- [x] Confirm all assets are included (GIFs, coverage, docs)
- [x] Add footer to README: 

---

  _“Developed for Allica Bank technical assignment by [Pritam Kininge](https://github.com/kininge)”_

