# ChallengeHub

A Vue 3 + TypeScript app for a 5-day trading challenge with exchange connection verification. Built with the Composition API, Tailwind CSS, and composable-based state (no Pinia/Vuex).

## Tech stack

- **Vue 3** with `<script setup>` (Composition API)
- **TypeScript** (strict mode)
- **Tailwind CSS** (v4)
- **Vite** for dev and build

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (e.g. `http://localhost:5173`).

**Other commands**

- `npm run build` — production build
- `npm run preview` — preview the production build locally

---

## Features

### Challenge progress dashboard

- **5-day challenge** — Day 1 is unlocked; Day N unlocks when Day N−1 is complete.
- **2–3 tasks per day** — e.g. “Watch today’s lesson”, “Place 1 practice trade”, “Post your trade screenshot”.
- **Day status** — Locked / In progress / Completed, with clear badges.
- **Overall progress** — “X / 5 days complete” and a progress bar.
- **Next Action banner** — Shows the current active day and “Complete the tasks below to unlock the next day.”
- **Completion state** — When all 5 days are done, a “Challenge complete” message is shown.
- **Fixed header** — Title, progress bar, and banner stay fixed; only the day cards scroll.

### Exchange connection (Day 1)

- **“Connect your exchange account”** task on Day 1.
- **Mock exchange API** — Simulates checking connection and fails ~30% of the time (timeout, server error, network error).
- **UI states** — Idle → Check connection → Loading (skeleton) → Success or Error with retry.
- **Retry** — “Try again” on error; user-visible error messages.
- **Task completion** — The task is marked complete only when the exchange API returns success.

### Error handling and resilience (bonus)

- **Retry with backoff** — After each failure, the next retry is delayed (1s, 2s, … up to 5s).
- **Loading skeleton** — Exchange task shows a skeleton while checking/retrying instead of only a spinner.
- **Circuit breaker** — After 3 consecutive failures, retries are paused for 30 seconds; the UI shows “Try again in Xs” and the retry button is disabled until the cooldown ends.

---

## Event tracking

Events are logged to the console via `useTracking()` (e.g. `[Track] eventName { ... }`).

**Required**

- `challenge_dashboard_viewed` — on app load
- `day_opened` — payload: `{ dayId }`
- `task_toggled` — payload: `{ dayId, taskId, completed }`
- `day_completed` — payload: `{ dayId }`
- `challenge_completed` — when all 5 days are complete

**Exchange (nice-to-have)**

- `exchange_connection_attempted` — payload: `{ timestamp }`
- `exchange_connection_succeeded` — payload: `{ timestamp, responseTime }`
- `exchange_connection_failed` — payload: `{ timestamp, errorType, willRetry }`

---

## Production-style improvements (not implemented)

Ideas you could add for a more resilient production setup:

- **Retry backoff** — Exponential backoff and jitter; we use linear backoff (1s, 2s, …) here.
- **Circuit breaker** — Half-open state to probe recovery; we use a simple 30s cooldown.
- **Error boundaries** — Vue error boundaries or a global error handler to catch component errors and show a fallback UI.
- **Loading skeletons** — Broader use (e.g. for the whole dashboard or day list) while data loads.
- **Persistence** — Save progress (e.g. `localStorage` or API) so it survives refresh.
- **Analytics** — Send the same events to a real analytics backend instead of (or in addition to) the console.
