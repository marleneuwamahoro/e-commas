# Ecomus Store

A fully functional e-commerce web client built with React, Vite, Tailwind CSS, Axios, and TanStack Query.

## Tech Stack

| Layer | Library |
|---|---|
| UI framework | React 18 (function components + hooks) |
| Routing | React Router v6 |
| Styling | Tailwind CSS v3 |
| HTTP client | Axios (centralized instance at src/api/client.js) |
| Server state | TanStack Query v5 (useQuery / useMutation) |
| Local state | React Context + useReducer (cart, auth) |
| Toasts | react-hot-toast |
| Build | Vite |

## Setup

```bash
git clone https://github.com/your-username/ecomus-store.git
cd ecomus-store
npm install
cp .env.example .env   # set VITE_API_BASE_URL
npm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| VITE_API_BASE_URL | API base URL (e.g. https://api.escuelajs.co/api/v1) |

## Project Structure

```
src/
├── api/                  # Axios instance + API functions
│   ├── client.js         # Centralized Axios with interceptors
│   ├── products.js
│   ├── auth.js
│   └── orders.js
├── context/              # Local UI/app state (cart, auth)
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── features/             # TanStack Query hooks per domain
│   ├── products/hooks.js
│   └── orders/hooks.js
├── components/
│   ├── Layout.jsx
│   └── ui/               # Reusable primitives
└── pages/                # One file per route
```

## State Management

Server state (products, categories, orders from API) lives ONLY in the TanStack Query cache.
UI state (search input, qty selectors, form fields, modal open) lives in local useState.
Cart and auth live in Context + localStorage for cross-refresh persistence.

## API Note

Currently wired to Platzi Fake Store API as a stand-in. Swap VITE_API_BASE_URL to the real E-Comus base URL and update field mappings in src/api/ to match its response shape.
