# 🛠️ Developer Notes — Swapi App

This document provides technical insight for developers working on the Swapi App.  
It covers architecture, folder structure, conventions, and future work.

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
│ ├── mocks/
│ │ ├── handlers.ts       # Mock API handlers
│ │ └── server.ts         # MSW server for testing
│ └── main.tsx            # Entry point with <Provider>
│
├── setupTests.ts         # Global test setup (includes MSW)
├── docs/                 # Developer documentation
│   └── dev-notes.md	    # development notes
├── scripts/
│   └── phase1-setup.sh	  # project setup nodes
├── public/               # Vite static files              
├── .eslintrc.json        # Linting config
├── .prettierrc           # Prettier config
├── tailwind.config.js    # Tailwind theme customization
├── index.html            # App container
└── README.md             # Project info
```

---

## 🔌 API Integration

- SWAPI base URL is configured in `/constants/api.constant.ts`
- API is accessed via `services/characterApi.ts` using **RTK Query**
- Query: `useGetCharactersQuery({ page })`

---

## ♾️ Infinite Scroll Behavior

- Implemented with `IntersectionObserver`
- Triggered when `<div ref={loaderRef}>` enters viewport
- Uses `react-window` for virtualization (fixed-height rendering)
- Auto-increments page state if `data.next` exists

---

## 🎨 Theming

Custom Tailwind color palette in `tailwind.config.js`:

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

- All files in src/ are TypeScript (.ts/.tsx)
- Component names: PascalCase
- State slices and API files: camelCase
- Avoid any; prefer strong typing
- Use clsx for dynamic class names

---

## 🧪 Testing Strategy

### 📦 Tools Used

- ✅ Jest – Unit test runner
- ✅ React Testing Library – Render and interact with components
- ✅ MSW (Mock Service Worker) – API mocking (v2 syntax with http and HttpResponse)

### 🧪 Setup Notes

- Global test setup is defined in src/setupTests.ts
- MSW handlers live in src/mocks/handlers.ts
- Mock server is configured in src/mocks/server.ts
- Jest is configured via jest.config.ts at the project root

---

## 🤝 Contributing

- Fork the repo: https://github.com/kininge/swapi-app
- Create a branch: feat/your-feature-name
- Write/update relevant tests and docs
- Open a PR with detailed description

--- 

#### ✍️ Document updated on: 2025-06-20
#### 👨‍💻 Maintainer: [Pritam Kininge](https://github.com/kininge)
