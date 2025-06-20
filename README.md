# ⭐ Swapi App

A modern, performant, and accessible web app that lists Star Wars characters using data from [SWAPI.tech](https://swapi.tech/).
Built with **React**, **TypeScript**, **RTK Query**, **TailwindCSS**, and **react-window** for blazing-fast rendering.

---

## ✅ Features

* ♾️ Infinite Scroll with virtualization (`react-window`)
* 🎨 Star Wars-themed dark UI with custom Tailwind config
* 🔌 RTK Query-based data fetching and caching
* 🧪 Unit testing with Jest + React Testing Library
* 🔍 Integration testing using Cypress
* 📚 Dev Docs included in `/docs`

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

## 🧠 Upcoming Features

* Character Detail View
* Search Functionality
* Accessibility Audit
* Performance Optimization

## 🧪 Testing Summary

* ✅ Unit tests cover UI rendering, states, and logic using Jest + RTL
* 🔍 Integration testing (e.g., scroll, navigation) handled in Cypress
* ❌ MSW was considered but skipped due to polyfill issues in Node + JSDOM

---

## 👨‍💻 Author

Pritam Kininge
[GitHub](https://github.com/kininge) |
[LinkedIn](https://linkedin.com/in/pritam-kininge) |
[Leetcode](https://leetcode.com/u/kininge007/)
