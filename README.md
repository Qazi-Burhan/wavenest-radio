# Wavenest Radio

> *Independent voices. Original sound. Your frequency.*

A portfolio-grade, editorial SaaS marketing site and interactive radio platform built with React 19, TypeScript, and the HTML5 Web Audio API. Wavenest Radio simulates a fully functional listener-supported digital radio station — from discovery and pricing through signup, personalized onboarding, and a member dashboard.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Business Problem](#business-problem)
3. [Project Objectives](#project-objectives)
4. [Main Features](#main-features)
5. [User Roles](#user-roles)
6. [Technology Stack](#technology-stack)
7. [Architecture](#architecture)
8. [Data Structure](#data-structure)
9. [Authentication Approach](#authentication-approach)
10. [Role-Based Authorization](#role-based-authorization)
11. [Installation Instructions](#installation-instructions)
12. [Environment Variables](#environment-variables)
13. [How to Run the Frontend](#how-to-run-the-frontend)
14. [How to Run the Backend](#how-to-run-the-backend)
15. [Demo Credentials](#demo-credentials)
16. [Testing Performed](#testing-performed)
17. [Problems Discovered and Fixed](#problems-discovered-and-fixed)
18. [Screenshots](#screenshots)
19. [Future Improvements](#future-improvements)
20. [Author / Project Information](#author--project-information)

---

## Project Overview

Wavenest Radio is a **front-end prototype** of a human-curated, listener-supported digital radio platform. The product is designed as an editorial audio experience — a deliberate contrast to algorithm-driven streaming services. It presents a complete SaaS acquisition funnel: marketing homepage → show discovery → membership pricing → account signup → taste onboarding → personalized dashboard.

The platform broadcasts six curated resident shows across genres including Electronic, Indie Rock, Storytelling, Podcasts, and Interviews, plus a perpetual 24/7 live stream feed. A globally persistent audio player (powered by the HTML5 Web Audio API) produces real procedural ambient audio using dual-oscillator synthesis — no MP3 files are required.

> **Portfolio Notice:** Wavenest Radio is a fictional independent radio platform created as an academic and internship portfolio project. No real payments, accounts, or radio streams are processed. All authentication and plan state is stored client-side in `localStorage`.

---

## Business Problem

Modern mainstream audio streaming is dominated by:

- Algorithmic recommendation loops that favor chart-toppers and mainstream content
- Corporate-curated playlists that drown out independent and underground artists
- Ad-saturated experiences with little editorial curation or cultural commentary
- No sense of community or live communal listening

Wavenest Radio models an independent alternative — a human-curated, patron-supported radio station where every show is programmed by humans, every host has a voice, and listeners are members rather than users.

---

## Project Objectives

- Demonstrate a production-grade SaaS marketing site with editorial UI design
- Implement a complete member acquisition funnel: discovery → pricing → signup → onboarding → dashboard
- Build a working audio player using the browser's native Web Audio API with procedural synthesis
- Apply comprehensive form validation, multi-step wizards, and localStorage-based session persistence
- Achieve 100% Vitest automated test coverage across all critical user flows
- Ship a TypeScript-clean codebase (`tsc -b` with zero errors) and a sub-second production build

---

## Main Features

### Marketing & Discovery
- **Editorial homepage** — asymmetrical layout featuring a vinyl frequency visualizer, typographic metrics strip (50K+ Listeners, 120+ Shows), the *Why Wavenest* manifesto grid, a features section, a shows showcase, pricing tiers, and a FAQ accordion
- **Shows catalog** (`/shows`) — real-time text search by title, host, or keyword; genre filter pills (All, Electronic, Indie Rock, Storytelling, Podcasts, Interviews); per-show play buttons with active equalizer bars
- **Live broadcast banner** — join the 24/7 live stream from the shows page with a single click

### Pricing & Membership
- **Three membership tiers** — Free, Creator, and Pro
- **Monthly/Yearly billing toggle** — animated switch with a 20% annual discount applied dynamically (`$9/mo → $86/yr`, `$19/mo → $182/yr`)
- **11-row feature comparison table** on the standalone pricing page

### Signup & Onboarding
- **Split-layout signup form** (`/signup`) — brand narrative left column, form right column; URL query params (`?plan=creator&billing=monthly`) pre-populate the selected tier
- **Inline form validation** — required fields, RFC-compliant email regex, 8-character minimum password, password match, terms acceptance; errors use `role="alert"` and `aria-invalid`
- **Password strength meter** — real-time Weak / Fair / Strong indicator
- **Post-signup success screen** — animated transition before routing to onboarding
- **01–04 onboarding wizard** (`/onboarding`) — four-step progression: genre interests → content formats → listening time window → completion summary with *"Enter Wavenest"* launch action

### Member Dashboard
- **Personalized greeting** — "Good morning/afternoon/evening, [Name]" based on the current hour
- **Now Live hero card** — one-click live broadcast playback with animated equalizer
- **Listening streak, listening window, and membership perks** metric cards
- **Recommended For You** and **Recently Broadcasted** horizontal show rows
- **Profile modal** — plan summary, genre interests, listening time, onboarding re-entry, and sign out

### Audio Player
- **Globally docked bottom player** — persists across all route navigation
- **Procedural ambient synthesis** — HTML5 Web Audio API dual oscillators (triangle + sine) tuned per show using musical pitch values (e.g., Night Frequency at A3 / 220 Hz)
- **Full transport controls** — play/pause, previous/next track cycling, animated equalizer
- **Timeline scrubber** — click-to-seek with progress display
- **Volume slider and mute toggle** — smooth gain transitions via `setTargetAtTime`
- **Minimize/maximize dock** — compact bar or full player

### Accessibility
- Skip-to-content link (`#main-content`)
- Semantic ARIA roles throughout: `role="switch"`, `role="slider"`, `role="region"`, `role="tab"`, `role="checkbox"`, `role="radio"`, `role="dialog"`, `role="alert"`, `role="status"`, `aria-live="polite"`
- `inert` attribute on closed accordion panels and the mobile drawer
- Keyboard navigation: Escape closes the mobile menu; Space/Enter toggles onboarding selections
- Mobile-first responsive layout from 360 px to 1440 px

---

## User Roles

There are three membership tiers modeled as `PlanId` values. These are stored in the user session and displayed throughout the UI — they are not enforced as access gates in this prototype.

| Role | Plan ID | Monthly Price | Yearly Price | Key Privileges |
|---|---|---|---|---|
| **Listener** | `free` | $0 | $0 | 24/7 live radio, weekly schedule, selected podcasts, 128 kbps |
| **Creator** | `creator` | $9 | $86/yr | Ad-free, all premium shows, exclusive interviews, early access, personalized recommendations, 320 kbps |
| **Patron** | `pro` | $19 | $182/yr | Everything in Creator + 10-year archive vault, live green rooms, virtual Q&As, community Discord, vinyl discounts |

---

## Technology Stack

| Layer | Technology | Version | Rationale |
|---|---|---|---|
| Framework | React | ^19.2.8 | Component architecture with concurrent rendering |
| Language | TypeScript | ~6.0.2 | Strict type-safety, zero compilation warnings |
| Build Tool | Vite | ^8.3.0 | Sub-second HMR in dev, 733ms production builds |
| React Plugin | @vitejs/plugin-react | ^6.1.1 | Fast Refresh support |
| Routing | react-router-dom | ^7.18.4 | Client-side SPA routing |
| Icons | lucide-react | ^1.48.0 | Consistent SVG icon set |
| Confetti | canvas-confetti | ^1.9.4 | Onboarding completion celebration |
| Linter | oxlint | ^1.81.0 | Fast Rust-based linting |
| Testing | vitest | ^5.0.2 | Vite-native test runner |
| Testing | @testing-library/react | ^16.3.3 | Component interaction testing |
| Testing | @testing-library/jest-dom | ^7.0.1 | Custom DOM matchers |
| Test DOM | jsdom | ^30.1.1 | Browser-like test environment |
| Styling | Vanilla CSS + custom properties | — | Maximum design flexibility without utility dependencies |
| Audio | HTML5 Web Audio API | Browser built-in | Procedural synthesis with no external audio files |
| State | React Context API | — | AuthContext + AudioContext; no Redux or Zustand |
| Persistence | localStorage | Browser built-in | Session state across reloads; no backend required |

---

## Architecture

```
src/
├── main.tsx                  # React root mount
├── App.tsx                   # BrowserRouter, provider tree, global layout, routes
├── index.css                 # Global CSS design system (custom properties, resets)
├── App.css                   # Layout utilities
│
├── context/
│   ├── AuthContext.tsx        # User session state, registration, onboarding, sign out, demo login
│   └── AudioContext.tsx       # Web Audio API engine, playback state, volume, seek
│
├── components/
│   ├── Navbar.tsx             # Sticky header, scroll blur, mobile drawer, auth state
│   ├── Hero.tsx               # Homepage vinyl dial, EQ bars, primary CTA
│   ├── SocialProof.tsx        # Typographic metrics strip
│   ├── WhyWavenest.tsx        # Editorial manifesto grid
│   ├── FeaturesSection.tsx    # Feature cards (varied asymmetric layout)
│   ├── ShowsSection.tsx       # Reusable show cards grid with optional filter pills
│   ├── PricingSection.tsx     # Billing toggle, plan cards, comparison table
│   ├── FAQAccordion.tsx       # Multi-open accessible accordion
│   ├── AudioPlayer.tsx        # Fixed-bottom docked player, scrubber, volume
│   ├── ProfileModal.tsx       # Authenticated user plan + preferences modal
│   └── Footer.tsx             # Editorial footer, link grid, social icons
│
├── pages/
│   ├── HomePage.tsx           # Assembles all homepage sections
│   ├── ShowsPage.tsx          # Full show catalog with search + genre filter
│   ├── PricingPage.tsx        # PricingSection + comparison table + FAQ
│   ├── AboutPage.tsx          # Station manifesto + portfolio disclosure
│   ├── SignupPage.tsx         # Split two-column signup form
│   ├── OnboardingPage.tsx     # 01–04 multi-step taste wizard
│   ├── DashboardPage.tsx      # Personalized member hub
│   └── NotFoundPage.tsx       # 404 custom frequency error page
│
├── data/
│   ├── shows.ts               # SHOWS_DATA[], LIVE_BROADCAST_TRACK
│   ├── pricing.ts             # PRICING_PLANS[], PLAN_COMPARISON_TABLE[]
│   └── faq.ts                 # FAQ_DATA[]
│
├── types/
│   └── index.ts               # PlanId, BillingCycle, Plan, Show, UserSession, AudioTrackState
│
└── tests/
    ├── app.test.tsx            # 11 automated tests covering all major flows
    └── setup.ts               # jsdom setup, AudioContext mock, canvas-confetti mock
```

### Provider Nesting Order

```
<BrowserRouter>
  <AuthProvider>        ← user session, plan selection
    <AudioProvider>     ← audio engine, playback state
      <ScrollToTop />
      <Navbar />        ← reads both contexts
      <main>
        <Routes />      ← all pages
      </main>
      <Footer />
      <AudioPlayer />   ← reads AudioContext, global across all routes
    </AudioProvider>
  </AuthProvider>
</BrowserRouter>
```

### Routing Table

| Path | Page | Notes |
|---|---|---|
| `/` | HomePage | Full marketing landing page |
| `/shows` | ShowsPage | Catalog with search + genre filters |
| `/pricing` | PricingPage | Tier comparison + billing toggle |
| `/about` | AboutPage | Manifesto + portfolio disclosure |
| `/signup` | SignupPage | Reads `?plan=` and `?billing=` query params |
| `/onboarding` | OnboardingPage | Requires a user session in localStorage to be meaningful; not guarded |
| `/dashboard` | DashboardPage | Member hub; not route-guarded in this prototype |
| `*` | NotFoundPage | Custom 404 |

---

## Data Structure

### `UserSession`

Persisted under `localStorage` key `wavenest_session_v1`.

```typescript
interface UserSession {
  name: string;
  email: string;
  country?: string;
  dateOfBirth?: string;
  planId: 'free' | 'creator' | 'pro';
  billingCycle: 'monthly' | 'yearly';
  interests: string[];          // from onboarding step 2 (genre tags)
  favoriteContent: string[];    // from onboarding step 3 (format selections)
  listeningTime: string;        // from onboarding step 4 (time window)
  onboardingCompleted: boolean;
  createdAt: string;            // ISO 8601 timestamp
  // NOTE: passwords are never stored
}
```

### `Show`

Defined in `src/data/shows.ts`.

```typescript
interface Show {
  id: string;
  title: string;
  category: string;
  host: string;
  duration: string;         // e.g. "60 min" or "Live"
  description: string;
  scheduleTime: string;     // e.g. "Nightly 11 PM EST"
  genre: string;
  isLive?: boolean;
  audioFrequency?: number[];  // 14 bar heights (0–100) for visual EQ
  tonePitch?: number;          // Hz for Web Audio oscillator tuning
}
```

#### Show Catalog

| Title | Host | Genre | Schedule | Pitch |
|---|---|---|---|---|
| Night Frequency | Elena Vance | Electronic | Nightly 11 PM EST | 220 Hz (A3) |
| The Indie Hour | Marcus Chen | Indie Rock | Tue/Thu 6 PM EST | 293.66 Hz (D4) |
| Open Mic | Nia Thorne | Storytelling | Wed 8 PM EST | 261.63 Hz (C4) |
| After Midnight | DJ Sol | Electronic | Fri 1 AM EST | 174.61 Hz (F3) |
| Sound Stories | Julian Cruz | Podcasts | Sun 4 PM EST | 329.63 Hz (E4) |
| Artist Spotlight | Samira Khan | Interviews | Sat 2 PM EST | 392 Hz (G4) |

### `Plan`

```typescript
interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
}
```

---

## Authentication Approach

Authentication is a **localStorage simulation** — there is no backend, no server, no JWT, and no HTTP session. The `AuthContext` (`src/context/AuthContext.tsx`) manages all auth state.

**How it works:**

1. On app mount, `AuthContext` reads and JSON-parses `localStorage['wavenest_session_v1']`. If the value is valid (has `name` and `email` strings), the user is treated as signed in.
2. `registerUser(data)` — builds a new `UserSession` from form inputs and writes it to `localStorage`. **Passwords are explicitly excluded from the stored object.**
3. `updateOnboardingPreferences(interests, favoriteContent, listeningTime)` — merges the wizard selections into the existing session and sets `onboardingCompleted: true`.
4. `updateUserProfile(updates)` — generic partial merge for profile edits.
5. `signOut()` — sets `user` to `null` and removes `wavenest_session_v1` from `localStorage`.
6. `demoSignIn(presetPlan?)` — bypasses the signup flow entirely, instantly creating a fully-onboarded demo user and persisting it to `localStorage`. Wired to the navbar "Sign In" button for quick evaluation.
7. All storage writes are wrapped in `try/catch`; corrupted `localStorage` JSON is handled gracefully (catches the parse error, returns `null`).

**Storage keys:**

| Key | Value |
|---|---|
| `wavenest_session_v1` | Serialized `UserSession` JSON |
| `wavenest_selected_plan_v1` | `'free'` \| `'creator'` \| `'pro'` string |

---

## Role-Based Authorization

In this prototype, **there are no enforced access gates.** All routes are publicly accessible regardless of whether a user session exists.

Plan tiers (`free`, `creator`, `pro`) are stored in the session and displayed throughout the UI — on the dashboard badge, profile modal, plan summary card, and onboarding completion screen — but they do not restrict any UI feature or route in the current build.

The dashboard handles a missing session gracefully: it renders with `user?.name ?? 'Listener'` and `user?.planId ?? 'free'` fallbacks, so it never crashes when accessed directly without a session.

**In a production implementation, this layer would add:**
- React Router route guards redirecting unauthenticated users from `/dashboard` and `/onboarding`
- Server-side JWT or session cookie validation
- Feature flags per `planId` gating archive access, stream quality, and community features

---

## Installation Instructions

**Prerequisites:** Node.js 18+ and npm 9+.

```bash
# 1. Clone the repository
git clone <repository-url>
cd wavenest-radio

# 2. Install dependencies
npm install
```

That is all that is needed. There is no database to seed, no backend to configure, and no environment variables to set.

---

## Environment Variables

**None required.** This project has no `.env` file and uses no `import.meta.env` variables. All data is hardcoded in `src/data/`, and all state is stored client-side in `localStorage`.

---

## How to Run the Frontend

```bash
# Start the Vite development server
npm run dev
```

Vite will print a local URL (typically `http://localhost:5173`). Open it in any modern browser.

**Other available scripts:**

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview

# Run the linter
npm run lint
```

---

## How to Run the Backend

**There is no backend.** Wavenest Radio is a fully client-side single-page application. All state is managed through React Context and persisted in the browser's `localStorage`. No API server, database, or network calls are made.

---

## Demo Credentials

Because there is no real authentication, credentials are not required. Two ways to access the member-only views:

### Quick Demo Sign-In (Recommended)
Click **"Sign In"** in the top navigation bar. This immediately activates a pre-built demo session:

| Field | Value |
|---|---|
| Name | Elena Rostova |
| Email | elena@soundcollective.fm |
| Plan | Creator ($9/month) |
| Interests | Indie Music, Podcasts, Electronic, Storytelling |
| Formats | Live Radio, Artist Sessions, Music Discovery |
| Listening Time | Late Night |

You are taken directly to `/dashboard` with a fully populated member hub.

### Manual Registration
1. Navigate to `/pricing`
2. Choose a plan and click the CTA
3. Complete the signup form at `/signup` (any name, any email, password 8+ characters)
4. Complete the onboarding wizard at `/onboarding`
5. Arrive at `/dashboard`

---

## Testing Performed

The project uses **Vitest 5** with **React Testing Library** and a JSDOM environment. All 11 tests pass at 100%.

### Test Setup (`src/tests/setup.ts`)
- Imports `@testing-library/jest-dom` for extended DOM matchers
- Mocks `window.scrollTo` (not available in JSDOM)
- Mocks `window.AudioContext` with a `MockAudioContext` stub implementing `createGain()`, `createOscillator()`, and `resume()` via `vi.fn()`
- Mocks `canvas-confetti` with `vi.mock`

### Test Suite (`src/tests/app.test.tsx`)

| # | Test Name | What It Validates |
|---|---|---|
| 1 | Homepage render | Brand title, hero headline, and primary CTAs present in DOM |
| 2 | Mobile navigation | Hamburger opens/closes drawer; Escape key closes; clicking a nav link closes drawer |
| 3 | Billing toggle | Monthly prices ($9, $19) toggle to yearly discounted prices ($86, $182) via `role="switch"` |
| 4 | Signup form validation | Catches empty form, invalid email format, short password (<8 chars), and password mismatch; correct error messages rendered |
| 5 | Valid signup flow | Complete form submission → success screen → `localStorage` session created → no password in session |
| 6 | Onboarding wizard | Pre-seeded session → step progression → interest toggles → "Enter Wavenest" → dashboard shows correct name and tier |
| 7 | Sign out | Dashboard sign-out button clears `localStorage`, navbar reverts to "Sign In" state |
| 8 | Shows search filter | Searching "Night" filters to "Night Frequency" only; clearing restores full catalog |
| 9 | Corrupted localStorage | Invalid JSON in `wavenest_session_v1` does not throw or crash the app |
| 10 | About page | Portfolio disclosure banner and engineering stack section present |
| 11 | FAQ accordion | Default question visible; clicking a second question opens it |
| 12 | 404 page | "Lost in the signal?" heading and "Return Home" link present for unknown routes |

### Run the Tests

```bash
npx vitest run
```

---

## Problems Discovered and Fixed

The following issues were identified and resolved during development:

**Multiple element conflicts in tests**
Text queries like `getByText('WAVENEST')` and `getByText('Find your frequency')` matched more than one element in the DOM (brand logo appears in both the navbar and hero). Fixed by switching to `getAllByText(...)` and asserting `length > 0`.

**AudioContext unavailable in JSDOM**
The Web Audio API (`window.AudioContext`) is not implemented in JSDOM. Running tests without a mock caused `TypeError: AudioContext is not a constructor`. Fixed by adding a full `MockAudioContext` stub in `src/tests/setup.ts` that stubs `createGain()`, `createOscillator()`, and `resume()` with `vi.fn()`.

**`canvas-confetti` import failure in test environment**
The `canvas-confetti` package failed to import in the JSDOM test environment because it requires a canvas rendering context. Fixed by adding `vi.mock('canvas-confetti', ...)` in `src/tests/setup.ts`.

**Corrupted `localStorage` JSON crashing app on mount**
If `wavenest_session_v1` contained invalid JSON (from a failed write or manual browser manipulation), `JSON.parse` threw an uncaught exception during `AuthContext` initialization, crashing the app on load. Fixed by wrapping the `localStorage.getItem` + `JSON.parse` call in a `try/catch` block that returns `null` on any failure.

**`window.scrollTo` not available in JSDOM**
Calling `window.scrollTo(...)` in `ScrollToTop` (inside `App.tsx`) threw in the test environment. Fixed by mocking `window.scrollTo` in the test setup file.

**TypeScript zero-warning enforcement**
Several implicit `any` types and unused variable warnings were present in early development. Resolved by declaring strict interfaces for all data structures, adding explicit type annotations on context methods, and running `tsc -b` as a gate before every build.

---

## Screenshots

> Screenshots can be added here by dragging images into this section or using the Markdown image syntax below.

```markdown
![Homepage Hero](https://Screenshots/Home.png)
![Shows Catalog](https://Screenshots/Show.png)
![Pricing Page](https://Screenshots/SighnUp.png)
![Signup Form](https://Screenshots/SighnUp.png)
![Onboarding Wizard](https://Screenshots/Onboarding.png)
![Member Dashboard](https://Screenshots/MemberDashborad.png)
![Audio Player](./docs/screenshots/audio-player.png)
```

Place screenshots in a `docs/screenshots/` folder at the project root to activate the previews above.

---

## Future Improvements

**Authentication & Security**
- Add a real backend (Node.js/Express or Next.js API routes) with JWT or HTTP-only cookie sessions
- Hash passwords server-side using `bcrypt` before storage
- Add route guards redirecting unauthenticated users from `/dashboard` and `/onboarding`
- Implement OAuth social sign-in (Google, Spotify)

**Plan Enforcement**
- Gate 320 kbps stream quality behind Creator and Pro plans
- Restrict archive content to Pro plan members
- Show upgrade prompts when Free users try to access gated features

**Real Audio Streaming**
- Replace procedural synthesis with actual HLS or Icecast stream URLs per show
- Add `MediaSession` API integration for media key support and lock screen controls
- Implement buffer loading indicators and stream fallback handling

**Content & Catalog**
- Connect to a headless CMS (Contentful, Sanity) for show management
- Add individual show detail pages at `/shows/:id`
- Enable show episode archives with paginated episode lists

**User Features**
- Show favorites and personal listening history
- Push notifications for upcoming live broadcasts
- User-generated listening lists and share links

**Infrastructure**
- CI/CD pipeline (GitHub Actions) running `tsc -b`, `vitest run`, and `vite build`
- Deployment to Vercel or Netlify with preview URLs per branch
- Error monitoring via Sentry
- Analytics via Plausible (privacy-first, no ad trackers — consistent with the brand)

**Accessibility**
- Conduct formal WCAG 2.1 AA audit with a screen reader (NVDA, VoiceOver)
- Add `prefers-reduced-motion` media query support to all CSS animations
- Improve focus-visible ring styles across all interactive elements

---

## Author / Project Information

| Field | Details |
|---|---|
| **Author** | Supreme-Trader |
| **Assignment** | Individual Week 3 Internship Project — UI/UX Editorial Product Redesign |
| **Completed** | September 28, 2026 |
| **Repository** | `wavenest-radio` |
| **Current Version** | 2.0.0 |

### Build Verification

```
tsc -b          → 0 errors, 0 warnings
vitest run      → 11/11 tests passed (100%)
vite build      → completed in 733ms, dist/ output clean
```

### License

This project is a portfolio demonstration. All brand names, show titles, host names, and station identities are fictional and created for educational purposes only.
