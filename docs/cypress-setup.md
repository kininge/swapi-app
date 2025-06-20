# 🧪 Cypress Integration Testing Setup — Swapi App

> ✅ Last updated: 2025-06-20  
> 👨‍💻 Maintainer: [Pritam Kininge](https://github.com/kininge)

This document explains how Cypress is integrated into the Swapi App for end-to-end (E2E) and integration testing. It includes installation, configuration, and sample tests for the `CharacterList` component.

---

## 🚀 Overview

Cypress is used to verify user journeys such as:
- Initial render of characters
- Infinite scrolling and lazy loading
- Loading indicators and edge cases

---

## 📦 Installation

Install Cypress as a dev dependency:

```bash
yarn add -D cypress
# or
npm install -D cypress
```

--- 

# 🛠️ Project Setup Steps
Follow these steps in order to avoid configuration issues:

### 1. Create Cypress Config (cypress.config.cjs)
``` js
    // cypress.config.cjs
    module.exports = {
        e2e: {
            baseUrl: "http://localhost:5173", // Vite default
            specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        },
    };
```
Using .cjs avoids ES module issues on Node 18+ and 20+.

--- 

### 2. Create Support File
``` bash
    mkdir -p cypress/support
    touch cypress/support/e2e.ts
```
```js
    // cypress/support/e2e.ts
    import './commands';
```
Also create an empty commands file:
```bash
    touch cypress/support/commands.ts
```
---
### 3. Create Initial Test
Create a new file:
``` bash 
    mkdir -p cypress/e2e
    touch cypress/e2e/characterList.cy.ts
```
``` ts 
    // cypress/e2e/characterList.cy.ts
    describe("CharacterList Integration", () => {
        beforeEach(() => {
            cy.visit("/");
        });

        it("renders initial characters", () => {
            cy.get('[data-testid="character-item"]').should("have.length.greaterThan", 0);
        });

        it("loads more characters on scroll", () => {
            cy.get('[data-testid="character-item"]')
            .its("length")
            .then(initialCount => {
                cy.scrollTo("bottom");
                cy.wait(1500); // delay for new items
                cy.get('[data-testid="character-item"]').should("have.length.greaterThan", initialCount);
            });
        });

        it("shows loader while fetching", () => {
            cy.intercept("GET", "**/people*", { delay: 500 }).as("getPeople");
            cy.reload();
            cy.wait("@getPeople");
            cy.get('[data-testid="loader"]').should("exist");
        });
    });
```
---
### 4. Add data-testid Attributes
Don't forget attributes that help testing code to locate DOM elements ex:
``` tsx
    // CharacterList.tsx
    <li data-testid="character-item">{character.name}</li>

    // Loader.tsx
    <div data-testid="loader">Loading...</div>
```
---
### 5. Add Scripts to package.json
This will help to run cypress project
``` json 
    "scripts": {
        "cy:open": "cypress open",
        "cy:run": "cypress run"
    }
```
---
### 6. Update .gitignore
You definitely don't want to pollute your github with code genrated data 
``` 
    # Cypress artifacts
    /cypress/videos/
    /cypress/screenshots/
```
---
### 7. Finally, Launch Cypress
Use this after all setup is done. It opens the interactive Cypress test runner.
``` bash
    npx cypress open
```
or you can use commands:
``` bash
    // open UI
    yarn cy:open
```
``` bash
    // Headless Run
    yarn cy:run
```
> Note : You have to run app first before hand -----> yarn dev