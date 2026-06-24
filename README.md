# SaaS RBAC Analytics Dashboard

A multi-tenant analytics dashboard built for a mock B2B SaaS product. Features role-based access control across three user tiers — Admin, Manager, and Employee — with each role seeing a different set of pages, actions, and data.

Built with React 18, Vite, Redux Toolkit, Recharts, React Router, and Tailwind CSS.

**Live demo:** _(add your Netlify URL here)_

---

## Features

- Three-tier RBAC — Admin, Manager, Employee each get distinct permissions, nav items, and dashboard views
- `PermissionProvider` with a `can("perm")` API — every gated UI element checks a single source of truth
- Protected routes — unauthenticated users redirect to login; wrong-role users see an access-denied screen
- Role-specific KPI cards on the dashboard — data changes based on who is logged in
- Inline role management — Admin can change any user's role directly from the Users table
- Custom `useFetch` hook — built-in debouncing, abort-on-unmount, and in-memory caching; reused across components
- Recharts data visualizations — area chart (Revenue vs Target), donut chart (Traffic Sources), bar chart (User Growth)
- Full monthly analytics table with MoM growth calculation
- Role switcher in Settings — lets anyone demo all three permission tiers live without logging out
- Light theme, clean sidebar layout, responsive down to tablet

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS |
| State | Redux Toolkit, Async Thunks, Context API |
| Routing | React Router v6 |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | JWT simulation with localStorage persistence |

---

## Project Structure

```
src/
├── components/
│   ├── charts/
│   │   ├── RevenueChart.jsx       # Area chart — revenue vs target
│   │   ├── TrafficChart.jsx       # Donut chart — traffic sources
│   │   └── UserGrowthChart.jsx    # Bar chart — monthly active users
│   ├── layout/
│   │   ├── DashboardLayout.jsx    # Sidebar + Outlet wrapper
│   │   ├── Sidebar.jsx            # Nav filtered by permission
│   │   └── ProtectedRoute.jsx     # Auth + permission guard
│   ├── tables/
│   │   └── UsersTable.jsx         # Searchable table with RBAC actions
│   └── ui/
│       ├── KPICard.jsx            # Metric card with trend badge
│       └── ActivityFeed.jsx       # Recent team activity list
├── context/
│   └── PermissionContext.jsx      # RBAC permission map + can() hook
├── data/
│   └── mockData.js                # Seed data — KPIs, users, charts
├── hooks/
│   └── useFetch.js                # Custom hook: debounce + cache + abort
├── pages/
│   ├── Login.jsx                  # Auth page with demo quick-login
│   ├── Dashboard.jsx              # Role-aware overview
│   ├── Analytics.jsx              # Charts + monthly breakdown table
│   ├── Users.jsx                  # User management (gated by role)
│   └── Settings.jsx               # Workspace config + role switcher
└── store/
    ├── index.js                   # Redux store
    ├── authSlice.js               # Login, logout, role update
    └── usersSlice.js              # Async fetch + CRUD reducers
```

---

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm

### Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

---

## Demo Accounts

Use these on the login page, or click the quick-login buttons:

| Role | Email | Password | Access |
|---|---|---|---|
| Admin | admin@acme.io | admin123 | All pages + user management + role changes |
| Manager | manager@acme.io | manager123 | Dashboard, Analytics, Users (read-only roles) |
| Employee | employee@acme.io | employee123 | Dashboard and Analytics only |

To switch roles without logging out, go to **Settings → Switch Role**.

---

## How RBAC Works

Permissions are declared once in `PermissionContext.jsx`:

```js
const permissions = {
  admin:    ["view_dashboard", "view_users", "edit_users", "delete_users", "view_analytics", "view_settings", "manage_roles"],
  manager:  ["view_dashboard", "view_users", "edit_users", "view_analytics"],
  employee: ["view_dashboard", "view_analytics"],
};
```

Every gated element calls `can("perm")` from the `usePermission` hook:

```jsx
// Sidebar — only shows nav items the current role can access
{navItems.filter(i => can(i.perm)).map(...)}

// Users table — conditionally renders action column
{can("edit_users") && <td>...</td>}

// Role dropdown only appears for admins
{can("manage_roles") ? <select ... /> : <span>{user.role}</span>}
```

Protected routes use the same hook — wrong-role users never reach the component at all.

---

## Redux State

### `authSlice`

Handles login, logout, and live role switching. Persists to `localStorage` so the session survives a page refresh.

### `usersSlice`

Fetches mock user data via an `AsyncThunk` with a simulated 600ms delay (mimics a real API call). Exposes `updateUserRole`, `updateUserStatus`, and `deleteUser` reducers that mutate state optimistically.

---

## Custom `useFetch` Hook

```js
const { data, loading, error } = useFetch(fetcher, deps, { debounce: 300 });
```

- Cancels the previous request on re-fetch using `AbortController`
- Caches responses in a module-level `Map` — same deps key = instant response, no extra network call
- Debounce delays the fetch when used with search inputs
- Cleans up on unmount — no state updates after component is gone

---

## Deployment

### Frontend (Netlify)

Add a `_redirects` file in `public/`:

```
/*    /index.html   200
```

Netlify build settings:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |

---

## Portfolio Context

This project demonstrates:

- RBAC patterns used in real product startup environments
- Redux Toolkit with async data fetching and optimistic UI state
- Custom hook design (`useFetch`) with production-grade concerns — caching, cancellation, debounce
- Clean component architecture with a single permission source of truth
- Data visualization with Recharts in a real dashboard context