#!/bin/bash

# Phase 1: Project Setup with Yarn, Vite, TypeScript, Tailwind v3, Redux, Router

# ANSI Colors for CLI Output
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
NC="\033[0m" # No Color

# 1. Create project with Vite and TypeScript
echo -e "${YELLOW}🚀 Creating Vite + React + TS project...${NC}"
yarn create vite swapi-app --template react-ts
cd swapi-app

# 2. Install TailwindCSS v3, PostCSS, Autoprefixer
echo -e "${YELLOW}🎨 Installing TailwindCSS v3 and dependencies...${NC}"
yarn add -D tailwindcss@3.3.2 postcss autoprefixer

# 3. Initialize Tailwind config
echo -e "${YELLOW}🛠 Initializing Tailwind config...${NC}"
yarn tailwindcss init -p

# 4. Configure Tailwind (tailwind.config.js)
echo -e "${YELLOW}🔧 Updating Tailwind config for content paths...${NC}"
sed -i '' "s|content: \[\]|content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']|" tailwind.config.js

# 5. Add Tailwind to ./src/index.css
echo -e "${YELLOW}💅 Injecting Tailwind directives into index.css...${NC}"
echo '@tailwind base;' > src/index.css
echo '@tailwind components;' >> src/index.css
echo '@tailwind utilities;' >> src/index.css

# 6. Install React Router & Redux Toolkit
echo -e "${YELLOW}🧭 Installing React Router & Redux Toolkit...${NC}"
yarn add react-router-dom @reduxjs/toolkit react-redux

# 7. Install Axios for API abstraction
echo -e "${YELLOW}🔌 Installing Axios...${NC}"
yarn add axios

# 8. Install ESLint + Prettier
echo -e "${YELLOW}🧹 Installing ESLint and Prettier...${NC}"
yarn add -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import eslint-config-prettier eslint-plugin-jsx-a11y

# 9. Optional: Setup Git and create initial commit
echo -e "${YELLOW}📚 Initializing Git and committing setup...${NC}"
git init
git add .
git commit -m "🔧 Initial setup with Vite + React + TS + Tailwind v3 + Redux"

# Final output
echo -e "\n${GREEN}✅ Project scaffolded with Tailwind v3 + Redux Toolkit.\n"
echo -e "📁 Next: Create folder structure, setup routing, and write README (including RTK justification).${NC}\n"
