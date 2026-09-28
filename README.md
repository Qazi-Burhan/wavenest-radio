# Wavenest Radio

> **Independent voices. Original sound. Your frequency.**  
> A client-ready, portfolio-grade SaaS marketing website, dynamic pricing system, and interactive onboarding flow designed for an independent radio station.

---

## 1. Project Overview

**Wavenest Radio** is a modern, responsive web application engineered as an individual Week 3 internship project. It is modeled after an independent, member-supported digital radio platform that broadcasts commercial-free curated music, original shows, in-depth interviews, and cultural conversations without algorithmic repetition or corporate interference.

The platform bridges the authentic aesthetic of independent radio culture with the UX and conversion architecture of leading SaaS products.

---

## 2. Project Scope

This project delivers a comprehensive front-end digital experience:
- Fully functional marketing landing page with hero audio visualizer, platform statistics, feature highlights, and resident shows.
- Interactive pricing matrix with dynamic Monthly and Yearly billing toggles (calculating a 20% annual discount in real time).
- End-to-end signup flow that carries chosen membership plans directly into registration.
- Custom client-side form validation with accessible, user-friendly inline error messaging.
- Multi-step interactive onboarding wizard (5 steps) tailoring music tastes, content preferences, and listening habits, completed with a celebratory confetti blast.
- Personalized member dashboard with time-aware greetings, plan details, live broadcast quick-play, and dynamic recommendations based on selected interests.
- Persistent, dockable mini audio player utilizing the HTML5 Web Audio API for dual-oscillator harmonic chord synthesis and animated frequency visualization.
- Complete documentation, automated test suite with Vitest and React Testing Library, and Git/GitHub commit history.

*Note: In accordance with project requirements, authentication, payment processing, and database storage are realistically simulated on the front end using `localStorage`. No actual payments or sensitive credentials are processed.*

---

## 3. Objectives

1. **Portfolio-Grade UI/UX:** Create a stunning, dark-first visual identity that avoids generic templates and demonstrates strong typography, harmonious spacing, subtle glassmorphism, and responsive design.
2. **Zero Dead UI Elements:** Ensure every link, button, modal, form input, audio preview, and navigation item performs its intended front-end behavior with zero broken routes or console errors.
3. **Robust Form Validation:** Implement defensive validation for empty fields, invalid email patterns, short passwords (<8 characters), and mismatched password confirmations.
4. **Smooth State Persistence:** Preserve user sessions, selected tiers, and onboarding preferences across page refreshes.
5. **Engineering Best Practices:** Clean, modular TypeScript architecture with automated test coverage and documentation understandable by any hiring manager or technical lead.

---

## 4. Features

### 🎧 Curated Radio & Audio Player
- **Docked Mini Audio Player:** Docked at the bottom of the screen with play/pause, interactive timeline scrubber, time elapsed/duration display, volume slider, mute toggle, and minimize/expand states.
- **Procedural Audio Synthesizer:** Uses the HTML5 Web Audio API to generate warm, relaxing ambient synthesizer chords (root + fifth harmonics) tailored to each show's pitch frequency.
- **Live Broadcast Channel:** 1-click trigger to tune into Studio A's 24/7 continuous master stream.
- **Catalog & Search:** Shows catalog with real-time search filtering and genre category pills (Ambient, Indie Rock, Spoken Word, Electronic, etc.).

### 💳 SaaS Pricing Tiers & Billing Toggle
- **Three Membership Tiers:**
  - **Free ($0/mo):** 24/7 live stream, weekly schedule, basic discovery.
  - **Creator ($9/mo or $86/yr):** Marked as *Most Popular*, ad-free listening, exclusive interviews, 320 kbps high-definition streaming.
  - **Pro ($19/mo or $182/yr):** Patron tier with full 10-year master archive vault, virtual green rooms, and community perks.
- **Dynamic Billing Toggle:** Instant toggle between Monthly and Yearly billing displaying a realistic 20% discount badge without page reloads.
- **11-Point Feature Comparison Table:** Detailed side-by-side feature matrix.

### 📝 Client-Side Signup Flow & Validation
- **Plan Continuity:** Automatically displays a banner indicating the user's selected tier and billing frequency (e.g., *"You selected Creator — $9/month"*).
- **Inline Validation:** Validates required name, RFC-compliant email, 8+ character password, and matching password confirmation before allowing submission.
- **Password Safety:** Excludes plaintext passwords from `localStorage` persistence.

### 🚀 5-Step Interactive Onboarding Wizard
- **Step 1:** Personalized welcome and rationale.
- **Step 2:** Music & Audio Interests (10 tags; requires at least 1 selection before continuing).
- **Step 3:** Preferred Content Formats (Live Radio, Podcasts, Interviews, Music Discovery, Artist Sessions).
- **Step 4:** Prime Listening Hours (Morning, Afternoon, Evening, Late Night).
- **Step 5:** Completion celebration featuring dynamic confetti animation (`canvas-confetti`) and taste summary.

### 📊 Member Dashboard & Account Center
- **Dynamic Greeting:** Contextual time-of-day greeting (*"Good morning"*, *"Good afternoon"*, or *"Good evening"*, followed by the user's name).
- **Recommendation Engine:** Dynamically queries the shows database to surface broadcasts matching the user's onboarding tags.
- **Account Modal:** View profile information, active tier, and manage taste preferences.
- **Session Management:** Sign Out button cleanly clears active prototype state and redirects to Home.

### 📱 Responsive Layout & Accessibility
- Tested and optimized across 360px, 390px, 768px, 1024px, and 1440px viewports.
- Mobile drawer navigation with animated hamburger trigger.
- Semantic HTML5 structure, ARIA expanded attributes for FAQs and accordions, and `@media (prefers-reduced-motion)` support.

---

## 5. User Flow

```
Home Page (/)
  ├── Explore Plans ──> Pricing Page (/pricing)
  │                      └── Choose Plan ──> Signup Page (/signup?plan=creator&billing=yearly)
  │                                           └── Form Validation ──> Onboarding (/onboarding)
  │                                                                     ├── Step 1: Welcome
  │                                                                     ├── Step 2: Select Interests (min 1)
  │                                                                     ├── Step 3: Select Content Format
  │                                                                     ├── Step 4: Select Listening Hours
  │                                                                     └── Step 5: Confetti Celebration
  │                                                                           └── Enter Wavenest ──> Dashboard (/dashboard)
  │                                                                                                   ├── Personalized Feed
  │                                                                                                   ├── Mini Audio Player
  │                                                                                                   └── Account & Sign Out
  ├── Listen Live ──> Activates Mini Audio Player
  ├── Shows Catalog (/shows) ──> Search & Genre Filtering ──> Play Previews
  ├── About Page (/about) ──> Station Mission & Portfolio Disclosure
  └── Unknown Route (* ) ──> 404 "Lost in the signal?" ──> Return Home
```

---

## 6. Technology Stack

- **Core:** React 19, TypeScript 6
- **Build Tool & Dev Server:** Vite 8
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Audio Engine:** HTML5 Web Audio API (procedural dual-oscillator synthesis)
- **Effects:** Canvas Confetti (`canvas-confetti`)
- **Styling:** Modern Vanilla CSS with CSS Custom Properties and Glassmorphism
- **State & Storage:** React Context API + Browser `localStorage`
- **Testing:** Vitest 5, `@testing-library/react`, `@testing-library/jest-dom`, JSDOM

---

## 7. Design Approach

Wavenest Radio employs a curated dark-first visual identity inspired by high-end audio hardware and modern developer-focused SaaS platforms:

- **Primary Background:** `#080B12` (deep obsidian black)
- **Secondary Background:** `#101522` (charcoal midnight)
- **Card Background:** `#151B29` (elevated slate surface)
- **Primary Accent:** `#7C5CFC` (electric violet)
- **Secondary Accent:** `#2DD4BF` (vibrant teal)
- **Borders & Dividers:** `rgba(255, 255, 255, 0.08)`
- **Typography:** *Manrope* for bold, modern headings; *Inter* for legible body and UI controls

---

## 8. Project Structure

```
wavenest-radio/
├── public/
│   └── favicon.svg           # Custom SVG radio wave favicon
├── src/
│   ├── assets/               # Static assets & graphics
│   ├── components/           # Reusable UI components
│   │   ├── AudioPlayer.tsx   # Persistent mini audio player with Web Audio API
│   │   ├── FAQAccordion.tsx  # Accessible FAQ accordion
│   │   ├── FeatureCards.tsx  # 4 core feature cards
│   │   ├── Footer.tsx        # 5-column responsive footer & social links
│   │   ├── Hero.tsx          # Hero section with frequency equalizer console
│   │   ├── Navbar.tsx        # Sticky header with mobile drawer & user badge
│   │   ├── PricingSection.tsx# Pricing tiers with monthly/yearly toggle
│   │   ├── ProfileModal.tsx  # Account & preferences modal
│   │   ├── ShowsSection.tsx  # Resident shows with preview buttons
│   │   └── SocialProof.tsx   # Platform metrics & statistics
│   ├── context/
│   │   ├── AudioContext.tsx  # Global audio player & Web Audio synthesizer
│   │   └── AuthContext.tsx   # Prototype session & localStorage persistence
│   ├── data/
│   │   ├── faq.ts            # FAQ questions and answers
│   │   ├── pricing.ts        # Tiers and 11-point comparison matrix
│   │   └── shows.ts          # 6 curated shows with audio metadata
│   ├── pages/
│   │   ├── AboutPage.tsx     # Mission and portfolio project disclosure
│   │   ├── DashboardPage.tsx # Personalized member dashboard
│   │   ├── HomePage.tsx      # Marketing landing page
│   │   ├── NotFoundPage.tsx  # Custom 404 frequency error page
│   │   ├── OnboardingPage.tsx# 5-step wizard with confetti celebration
│   │   ├── PricingPage.tsx   # Dedicated pricing & comparison table
│   │   ├── ShowsPage.tsx     # Shows catalog with search and genre pills
│   │   └── SignupPage.tsx    # Registration form with client-side validation
│   ├── tests/
│   │   ├── app.test.tsx      # Automated unit and integration test suite
│   │   └── setup.ts          # Vitest setup & Web Audio / scroll mocks
│   ├── types/
│   │   └── index.ts          # Core TypeScript interfaces & types
│   ├── App.css               # Page and component styles
│   ├── App.tsx               # Master router and layout wrapper
│   ├── index.css             # Design tokens, variables, and global CSS
│   └── main.tsx              # React DOM entry point
├── CHANGELOG.md              # Version history from v1.0 to v1.7
├── PROJECT-SUMMARY.md        # Half-page executive project summary
├── README.md                 # Project documentation
├── TESTING.md                # Test matrix, results, and edge-case reports
├── package.json              # Project scripts and dependencies
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite & Vitest configuration
```

---

## 9. How to Run

### Prerequisites
- Node.js v18+ (tested on Node v24.19.0)
- npm v9+ (tested on npm 11.17.0)

### Installation & Local Development
```bash
# 1. Navigate to the project directory
cd wavenest-radio

# 2. Install dependencies
npm install

# 3. Start the Vite development server
npm run dev

# 4. Open http://localhost:5173/ in your browser
```

### Production Build & Preview
```bash
# Type check and generate production bundle
npm run build

# Preview the production build locally
npm run preview
```

### Running Automated Tests
```bash
# Run the test suite once
npx vitest run

# Run tests in interactive watch mode
npx vitest
```

---

## 10. Git/GitHub Workflow

The project was developed with a clean, sequential Git commit history:

1. `chore: initial project setup with Vite, React, TypeScript, and dependencies`
2. `feat: create application shell, dark theme design tokens, and navigation`
3. `feat: build homepage with hero frequency console and audio visualizer`
4. `feat: add platform statistics, feature cards, and curated shows section`
5. `feat: implement interactive pricing tiers with 20% annual discount toggle`
6. `feat: implement signup flow with selected plan carry-through`
7. `feat: implement client-side form validation with inline error messaging`
8. `feat: build multi-step interactive onboarding flow with confetti celebration`
9. `feat: implement personalized member dashboard, recommendations, and audio player`
10. `feat: improve responsive design across mobile, tablet, and desktop viewports`
11. `test: set up Vitest and React Testing Library with automated test suite`
12. `docs: add comprehensive README, TESTING, CHANGELOG, and PROJECT-SUMMARY`
13. `chore: final polish, build verification, and clean delivery packaging`

---

## 11. Testing

Comprehensive automated tests are located in `src/tests/app.test.tsx` and documented in detail in [`TESTING.md`](./TESTING.md).

All **11 tests pass with 100% success rate**:
- Homepage rendering, brand logo, and CTAs
- Dynamic pricing calculation and yearly discount toggle
- Form validation (empty inputs, invalid emails, short passwords, password mismatches)
- Valid signup and safe session storage
- Onboarding wizard validation and progress transitions
- Member dashboard personalization and time-based greetings
- Shows catalog search and category filtering
- Session sign out and cache clearing
- Corrupted storage recovery
- Accessible FAQ accordion
- Custom 404 page routing

---

## 12. Issues Found and Fixed

| Issue | Root Cause | Resolution |
| :--- | :--- | :--- |
| **Strict Type Imports (`TS1484`)** | TypeScript's `verbatimModuleSyntax` flagged type imports without the `type` keyword. | Refactored all type imports to `import type { ... }`. |
| **Lucide Icon Deprecations** | Newer versions of `lucide-react` removed brand icons (`Github`, `Twitter`). | Implemented clean, accessible inline SVG social icons in `Footer.tsx`. |
| **Ambiguous Testing Library Queries** | Text queries for `WAVENEST` matched both header and footer logos. | Replaced singular `getByText` with `getAllByText` length assertions and added explicit `data-testid` attributes. |
| **Storage Corruption Risk** | Manually malformed `localStorage` data could cause JSON parsing crashes. | Wrapped all storage parsing in try/catch handlers falling back cleanly to an unauthenticated session. |

---

## 13. Known Limitations

- **Simulated Backend:** User registration and onboarding preferences are stored in the browser's `localStorage` rather than a remote database. Clearing browser data will reset the session.
- **Audio Synthesis:** Rather than streaming copyrighted broadcast audio, the player synthesizes procedural ambient chords via the Web Audio API.

---

## 14. Future Improvements

1. **Persistent Cloud Database:** Connect Supabase or Firebase Authentication for cloud session sync.
2. **Payment Integration:** Integrate Stripe test-mode Elements to process realistic mock subscriptions.
3. **Real Audio Streaming:** Connect an Icecast/Shoutcast internet radio stream endpoint.
4. **Social Sharing:** Add OpenGraph dynamic cards for sharing individual shows on social media.

---

## 15. AI Assistance

AI assistance was utilized during this project for:
- Initial project scaffolding and TypeScript interface drafting.
- Designing responsive CSS custom properties and color palettes.
- Formulating test cases in Vitest and React Testing Library.
- Reviewing accessibility attributes (ARIA roles) and generating documentation templates.

All generated code was manually inspected, type-checked, and verified through automated test suites and local browser execution.

---

## 16. Author

- **Developer:** Supreme-Trader  
- **Course / Assignment:** Week 3 Internship Project  
- **Project Title:** SaaS Product Marketing Site with Pricing Tiers & Signup Flow for an Independent Radio Station  
- **Date:** September 28, 2026
