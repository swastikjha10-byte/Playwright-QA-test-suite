# Playwright QA Assignment

A focused Playwright and TypeScript suite covering core SauceDemo UI journeys and ReqRes API contracts.

## Prerequisites and setup

- Node.js 20 or later
- npm

Install dependencies and browser binaries:

```bash
npm install
npx playwright install chromium
```

Run all tests:

```bash
npx playwright test
```

Useful targeted commands:

```bash
npm run test:ui
npm run test:api
npm run report
```


## Architecture

UI tests remain assertion-oriented while `pages/` owns product interactions and durable SauceDemo `data-test` locators. 
Each test receives a fresh Playwright browser context, so the suite is safe to run in parallel without cart or authentication state leaking between tests. 
API coverage uses Playwright's `request` fixture directly; it does not use a browser page.

The ReqRes create-then-verify example checks the create response because ReqRes is a mock service and does not persist newly created users. 
In a persistent API, the same pattern would follow the POST with `GET /api/users/{id}` and assert the returned resource.