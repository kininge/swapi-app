# ⭐ Swapi App

A modern, performant, and accessible web app that lists Star Wars characters using data from [SWAPI.tech](https://swapi.tech/).
Built with **React**, **TypeScript**, **RTK Query**, **TailwindCSS**, and **react-window** for blazing-fast rendering.

![Built with React](https://img.shields.io/badge/built%20with-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/language-TypeScript-007ACC?logo=typescript)
![Vite](https://img.shields.io/badge/bundler-vite-646CFF?logo=vite&logoColor=white)
![RTK Query](https://img.shields.io/badge/state-RTK%20Query-764ABC?logo=redux)
![Cypress Tested](https://img.shields.io/badge/tested%20with-cypress-6fcf97?logo=cypress)
![Jest](https://img.shields.io/badge/unit%20tested-jest-%23C21325?logo=jest)
![Prettier](https://img.shields.io/badge/styled%20with-prettier-ff69b4?logo=prettier)
![Micro Frontend Ready](https://img.shields.io/badge/microfrontend-ready-green)

---

## 🎥 Demo

![Swapi App Demo](./public/demo.gif)

---

## ✅ Features

* ♾️ Infinite Scroll with virtualization (`react-window`)
* 🎨 Star Wars-themed dark UI with custom Tailwind config
* 🔌 RTK Query-based data fetching and caching
* 🧪 Unit testing with Jest + React Testing Library
* 🔍 Integration testing using Cypress
* 📚 Dev Docs included in `/docs`
* 🧭 Character detail routing via React Router


---

## 🛠️ Tech Stack

| Tech                  | Purpose                                         |
| --------------------- | ----------------------------------------------- |
| React + Vite          | Frontend Framework + Build Tool                 |
| TypeScript            | Type Safety                                     |
| Tailwind CSS          | Utility-first Styling                           |
| Redux Toolkit         | State Management & API Layer (RTK Query)        |
| react-window          | Virtualized List for performant infinite scroll |
| Jest                  | Unit Testing Framework                          |
| React Testing Library | UI Testing Utilities                            |
| Cypress               | Integration & E2E Testing                       |

---

## 📦 Setup Instructions

```bash
# Clone the repo
git clone https://github.com/kininge/swapi-app.git
cd swapi-app

# Install dependencies
yarn

# Start the app
yarn dev

# Note: App will run at: http://localhost:5173
```

## 🗂️ Project Structure

```
.
├── src/
│   ├── assets/       	  # Media storage
│   ├── components/       # Reusable UI components
│   ├── features/         # Feature-specific UI + logic
│   ├── services/         # RTK Query API setup
│   ├── store/            # Redux store config
│   ├── constants/        # Centralized config (API URLs, theme)
│   ├── hooks/        	  # Custom hooks
│   ├── pages/        	  # Screens in App
│   ├── routes/        	  # Routing
│   ├── index.css         # Root css
│   └── App.tsx           # Root component
│
├── index.html
├── README.md
```
---


## 📚 Docs

- 🛠️ Developer Notes: [`docs/dev-notes.md`](./docs/dev-notes.md)
- 🧪 Cypress Setup: [`docs/cypress-setup.md`](./docs/cypress-setup.md)
- 🧑‍💻 Code Guidelines: [`docs/code-style.md`](./docs/code-style.md) _(planned)_
- 🧩 Micro Frontend Strategy: [`docs/mfe-strategy.md`](./docs/mfe-strategy.md) _(planned)_
- ⚙️ CI/CD Pipeline: [`docs/ci-pipeline.md`](./docs/ci-pipeline.md) _(planned)_
- 🔗 Routing Setup: [`docs/routing.md`](./docs/routing.md) _(planned or optional)_


---

## 🧠 Upcoming Features

* Character Detail View
* Search Functionality
* Accessibility Audit
* Performance Optimization

---

## 🧪 Testing Summary

* ✅ Unit tests cover UI rendering, states, and logic using Jest + RTL
* 🔍 Integration testing (e.g., scroll, navigation) handled in Cypress
* 🔍 Cypress integration tests cover:
+   - Infinite scroll (CharacterList)
+   - Character detail navigation (`/character/:id`) on card click
+   - DOM updates for virtualized lists using `data-character-id`
* ❌ MSW was considered but skipped due to polyfill issues in Node + JSDOM

---

## ✅ Final Submission

![MVP Progress](https://img.shields.io/badge/MVP%20Progress-80%25-yellowgreen)
![Tests Passing](https://img.shields.io/badge/Tests-90%25-brightgreen)
![Docs Complete](https://img.shields.io/badge/Docs-Complete-blue)

- 📄 [MVP Delivery Tracker](./MVP_DELIVERY_TRACKER.md)
- 📋 [Final Submission Checklist](./SUBMISSION_CHECKLIST.md)

---

## 👨‍💻 Author

Pritam Kininge
[GitHub](https://github.com/kininge) |
[LinkedIn](https://linkedin.com/in/pritam-kininge) |
[Leetcode](https://leetcode.com/u/kininge007/)

---
