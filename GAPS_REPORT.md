# Notes App - Gaps & Missing Features Report

Generated: 2026-07-12

---

## 🔴 Critical (Blockers)

### 1. No Authentication System
**Files:** `frontend/src/app/login/page.js` (mock only), `backend/server.js` (no auth middleware)
- Login is a mock with `setTimeout` redirect
- No JWT, sessions, cookies, or user management
- All API endpoints are public
- **Fix:** Add NextAuth.js or custom JWT middleware + user model

### 2. Trash Page Non-Functional
**Files:** `frontend/src/app/dashboard/trash/page.js`, `backend/controllers/noteController.js`
- UI shows "The incinerator is empty" hardcoded
- `getTrashNotes` controller exists but **no route** in `noteRoutes.js`
- No fetch call in frontend trash page
- **Fix:** Add `GET /api/notes/trash` route + wire up frontend

### 3. Backend `.env` Committed Risk
**File:** `backend/.env` contains real MongoDB Atlas URI with credentials
- **Immediate action:** Rotate credentials, add `.env` to `.gitignore`
- **Fix:** `echo ".env" >> .gitignore` (create if missing)

---

## 🟠 High (Broken Features)

### 4. No Input Validation
**Files:** `backend/controllers/noteController.js`
- `createNote` / `updateNote` accept empty title/content
- Mongoose schema has `default: ''` but no `required: true`
- No validation middleware (e.g., `express-validator`, `zod`)
- **Fix:** Add `required: true` to schema + validation middleware

### 5. No Error Handling for DB Connection
**File:** `backend/server.js:36-41`
- `mongoose.connect()` catches error but **does not exit process**
- App continues running without DB → crashes on first request
- No reconnection logic
- **Fix:** Add `process.exit(1)` on connect failure + `mongoose.connection.on('disconnected', ...)`

### 6. Search Uses MongoDB `$text` but No Index Guarantee
**File:** `backend/models/Note.js:14`
- `noteSchema.index({ title: 'text', content: 'text' })` defined
- But index creation is **async/background** — may not exist on first query
- **Fix:** Run `Note.syncIndexes()` on startup or ensure index via migration

### 7. Frontend Has No Error Boundaries / Loading States
- Dashboard shows error UI but **trash/archive pages lack error states**
- No global error boundary for React tree
- **Fix:** Add `ErrorBoundary` component + consistent loading skeletons

---

## 🟡 Medium (Quality Issues)

### 8. N+1 / Over-fetching
**File:** `frontend/src/app/dashboard/page.js:14-23`
- `loadNotes()` fetches **full note list** on every search/tag/sort change
- No pagination, no cursor-based loading
- **Fix:** Add pagination params (`page`, `limit`) to API + frontend

### 9. No Tests Anywhere
- Zero unit, integration, or e2e tests
- **Fix:** Add Vitest (backend) + Playwright/Cypress (frontend)

### 10. No Lint/Typecheck on Backend
**File:** `backend/package.json`
- Only `nodemon` in devDependencies
- No ESLint, Prettier, TypeScript
- **Fix:** Add `eslint`, `@types/node`, `typescript` + scripts

### 11. Hardcoded API URL Fallback
**File:** `frontend/src/api/notesApi.js:3`
- `NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/notes'`
- Works locally but **fails in production** without env var
- **Fix:** Document required env var in README

### 12. CORS Wide Open
**File:** `backend/server.js:10`
- `app.use(cors())` allows all origins
- **Fix:** Restrict to `process.env.FRONTEND_URL` in production

### 13. Autosave Race Condition
**File:** `frontend/src/app/dashboard/note/[id]/page.js:29-47`
- `debouncedSave` uses `noteIdRef` but **no cancellation** on unmount
- Rapid navigation can fire stale saves
- **Fix:** Use `AbortController` + cleanup in `useEffect` return

### 14. Tag Filter Client-Side Only (Archive)
**File:** `frontend/src/app/dashboard/archive/page.js:16-18`
- Archive search filters **in-memory** after fetch
- Should be server-side for large datasets
- **Fix:** Add `search` param to `fetchArchivedNotes` + backend query

### 15. No Soft-Delete Cleanup Job
- `deleted: true` notes accumulate forever
- No TTL index or cron to hard-delete after 30 days
- **Fix:** Add TTL index: `noteSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 30*24*60*60, partialFilterExpression: { deleted: true } })`

---

## 🟢 Low (Polish)

### 16. Missing Recover/Permanent Delete Routes
**Backend has controllers** (`recoverNote`, `permanentDeleteNote`) but **no routes** in `noteRoutes.js`

### 17. No Request Logging
- No Morgan/Winston for API request logs
- **Fix:** Add `morgan('combined')` middleware

### 18. Frontend Uses `lodash/debounce` but Not Tree-Shaken
- Imports full lodash for one function
- **Fix:** Use `use-debounce` hook or `just-debounce-it`

### 19. Inconsistent Response Shapes
- Some controllers return `{ success: true, data: [...] }`
- Others return `{ success: true, data: {} }` (empty object on delete)
- **Fix:** Standardize to `{ success: boolean, data: T, error?: string }`

### 20. No API Versioning
- Routes at `/api/notes` — no `/v1/` prefix
- **Fix:** Add version prefix for future compatibility

---

## ✅ What's Solid (Don't Touch)

| Feature | Status |
|---------|--------|
| Note model schema | ✅ Complete with text index |
| CRUD controllers | ✅ All 12 methods implemented |
| Pin/Archive/Restore logic | ✅ Correct toggles |
| Frontback API layer | ✅ Isolated in `notesApi.js` |
| Dashboard context | ✅ Search + sort global state |
| Optimistic UI updates | ✅ Pin/Archive/Delete with rollback |
| Autosave debounce | ✅ 800ms in editor |
| Color/tag persistence | ✅ Saved to DB |
| Tailwind theme system | ✅ Custom CSS variables |
| Vintage UI components | ✅ Ruled paper, stamps, clips |

---

## 📋 Quick Fix Priority Order

1. **Rotate MongoDB credentials** (`.env` exposed)
2. **Add `.gitignore`** with `.env`, `node_modules`, `.next`
3. **Add `required: true`** to title/content in Note schema
4. **Wire up Trash route** (`GET /api/notes/trash` + frontend)
5. **Fix DB connection crash** (exit on failure)
6. **Add CORS origin restriction**
7. **Add pagination** to list endpoints
8. **Add ESLint + TypeScript** to backend
9. **Add TTL index** for auto-cleanup of trash
10. **Write first test** (smoke test for `GET /api/notes`)

---

## 📁 Files to Create/Modify

```
backend/
├── .gitignore              # CREATE (missing)
├── package.json            # ADD: eslint, typescript, morgan, express-validator
├── server.js               # FIX: DB connection handling, CORS config, logging
├── models/Note.js          # FIX: required fields, TTL index
├── routes/noteRoutes.js    # ADD: trash, recover, permanent delete routes
├── middleware/             # CREATE: validation.js, errorHandler.js
└── controllers/noteController.js  # FIX: input validation

frontend/
├── .gitignore              # VERIFY: .env*, .next, node_modules
├── package.json            # ADD: vitest, @playwright/test, use-debounce
├── src/api/notesApi.js     # FIX: AbortController for autosave
├── src/app/dashboard/trash/page.js  # REWRITE: fetch + UI
├── src/components/         # CREATE: ErrorBoundary, LoadingSkeleton
└── src/middleware.ts       # CREATE: auth check (when auth added)
```