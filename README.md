# F11 Invest Backend

Live market data, order execution (via Ventura Securities EaseAPI), AI strategy
signals, the daily prediction challenge, and the F11 wallet/credit-line/referral
routes.

## ⚠️ Before you do anything else

1. **Rotate your Ventura API keys.** The keys that were previously hardcoded
   in `ventura.ts` and shared in a chat conversation should be treated as
   leaked. Get new ones from Ventura and put them only in a local `.env`
   file (never in code, never committed).
2. **This is not a GitHub Pages site.** It's a Node/Express server — GitHub
   Pages only serves static files and can't run this. Push the code to a
   GitHub *repository* for version control, then deploy it to something that
   runs Node: Render, Railway, Fly.io, an EC2/VM, etc. Point your existing
   static dashboard (`MasterDashboard`) at that server's URL for API calls.

## Deploy to Render

Two ways to do this — pick one.

### Option A: Blueprint (uses the included `render.yaml`)

1. Push this repo to GitHub (real `.env` stays local — it's gitignored).
2. In the Render dashboard: **New +** → **Blueprint** → connect the repo.
3. Render reads `render.yaml` and proposes a web service named
   `f11-invest-backend`. Confirm it.
4. Because `VENTURA_APP_KEY` and `VENTURA_SECRET_KEY` are marked
   `sync: false` in `render.yaml`, Render will prompt you to type the real
   values into the dashboard during setup — they're never read from the repo.
5. Deploy. Render runs `npm install && npm run build`, then `npm start`.

### Option B: Manual web service (no blueprint)

1. **New +** → **Web Service** → connect the repo.
2. Runtime: **Node**. Build command: `npm install && npm run build`. Start
   command: `npm start`.
3. Under **Environment**, add `VENTURA_APP_KEY` and `VENTURA_SECRET_KEY` with
   your real (rotated) values. Never put these in the repo itself.
4. Under **Health Check Path**, set `/health` — this route has no
   dependency on Ventura or a database, so a Ventura outage won't make Render
   think your whole service is down and restart it.
5. Deploy.

### Plan choice

`render.yaml` defaults to the `starter` plan. Render's free tier spins the
service down after inactivity, so the first request after idle time (e.g. a
market quote or a live trade) eats a cold-start delay of several seconds —
worth avoiding once real users are placing real orders through this. Fine for
early testing, not for production trading.

### After it's live

Your static dashboard (`MasterDashboard` on GitHub Pages) can now call this
service directly, e.g. `https://f11-invest-backend.onrender.com/invest/market/status`.
Update any hardcoded `localhost:5000` URLs in the frontend to point at the
Render URL, and make sure CORS is configured if the frontend and backend are
on different domains (GitHub Pages vs. Render) — add `cors` middleware in
`server.ts` scoped to your actual dashboard origin, not `*`, since this API
can place real trades.

## Setup

```bash
npm install
cp .env.example .env   # then fill in real Ventura keys
npm run dev             # local development
npm run build && npm start   # production
```

## Routes

| Method | Path | What it does |
|---|---|---|
| GET | `/invest/market/status` | Ventura connection status |
| GET | `/invest/market/quote/:symbol` | Live quote for a symbol |
| POST | `/invest/market/trade` | **Places a real order** via Ventura |
| POST | `/invest/predictions/call` | Submit a daily prediction |
| GET | `/invest/predictions/summary` | User's prediction progress |
| GET | `/invest/strategy/recommendations` | AI strategy signals (placeholder data — see compliance note below) |
| GET | `/invest/wallet/overview` | F11 coins, notional credit line, broker margin |
| POST | `/invest/referrals/invite` | Record a referral |
| GET | `/invest/referrals/summary` | Referral coins earned this month |

Note the route comments in the original code said `/api/invest/...` but the
actual registered paths (and your curl test) use `/invest/...` with no `/api`
prefix. I kept it path-consistent with what you tested against — pick one
convention and make the comments match if you add an `/api` prefix later.

## What's stubbed and needs real logic

- **`invest-users.ts`** and **`invest-referrals.ts`** — these were referenced
  by your router index but not included in what you sent me. I added minimal
  stubs so the project compiles; replace them with real persistence.
- **No database anywhere yet.** Every route currently returns hardcoded or
  in-memory data (`f11Coins: 450`, empty `activePredictions`, etc.). Wire up
  Postgres/Mongo/whatever you're using before this goes near real users —
  otherwise every user sees the same fake balance.
- **No auth on the prediction/wallet endpoints** beyond the bearer token
  Ventura itself expects. Add your own session/auth middleware in front of
  these routes.

## Regulatory notes (not legal advice — talk to an actual advisor)

This backend does two things that sit in regulated territory in India:

- **`/invest/market/trade`** places real trades with real money through a
  licensed broker (Ventura). Standard broker-integration rules apply — user
  consent, KYC, order confirmation flows, etc.
- **`/invest/strategy/recommendations`** returns specific, named-stock
  BUY/SELL calls with entry price, stop-loss, and target. Issuing calls like
  this generally requires the entity to be a SEBI-registered Investment
  Adviser (RIA), or for the signals to come from/be reviewed by one — this is
  true regardless of whether the calls are AI-generated.

Combining specific trade calls with live execution and gamified rewards
(F11 coins, credit-line boosts tied to prediction accuracy) is a stricter
combination than a pure paper-trading simulator. Get this reviewed by
compliance/legal counsel before it's live for real users — this is a business
decision, not something either of us should route around in code.
