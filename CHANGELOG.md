# Changelog

All notable changes to the **Wavenest Radio** platform prototype are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.7] - 2026-09-28
### Added
- Created comprehensive `README.md` with complete architecture, user flows, and how-to-run instructions.
- Created `TESTING.md` matrix with 16 automated and edge-case test results.
- Created `PROJECT-SUMMARY.md` executive overview.
- Added SVG social icons to Footer and optimized semantic headings.
- Cleaned all TypeScript types and enforced zero build warnings with `tsc -b`.

---

## [1.6] - 2026-09-28
### Added
- Vitest and React Testing Library setup in `vite.config.ts` with JSDOM environment.
- Automated test suite covering 11 critical test cases and edge cases in `src/tests/app.test.tsx`.
- Mock AudioContext and mock canvas-confetti fixtures in `src/tests/setup.ts`.
### Fixed
- Fixed multiple elements conflict with `WAVENEST` and `Find your frequency` text queries in tests.
- Added defensive error handling for corrupted `localStorage` JSON strings.

---

## [1.5] - 2026-09-28
### Added
- Member Dashboard at `/dashboard` featuring time-based greeting (*"Good morning/afternoon/evening"*).
- Dynamic recommendation engine pairing user's onboarding tags to shows database.
- Live Broadcast master feed quick access card.
- Account profile modal with plan summary, selected interests, and Sign Out action.
- Persistent dockable mini audio player at the bottom of the viewport with waveform animator, scrubber, and volume control.

---

## [1.4] - 2026-09-28
### Added
- Multi-step interactive onboarding wizard (`/onboarding`) featuring 5 distinct steps:
  1. Welcome & personalization introduction
  2. Multi-select interest tags (minimum 1 required with validation)
  3. Preferred content format selection
  4. Prime listening hours selector
  5. Completion celebration screen with dynamic confetti animation via `canvas-confetti`
- State preservation across back/next navigation.

---

## [1.3] - 2026-09-28
### Added
- Dedicated signup page (`/signup`) carrying selected tier and billing frequency banner.
- Custom client-side form validation with inline friendly error messages:
  - Name (required, min 2 chars)
  - Email (regex format validation)
  - Password (min 8 chars)
  - Confirm Password (exact match verification)
- Password visibility toggle (eye icon) and length meter.
- Safe prototype persistence storing session to `localStorage` without plaintext passwords.

---

## [1.2] - 2026-09-28
### Added
- Dedicated `/pricing` route and reusable `PricingSection` component.
- Interactive Monthly / Yearly billing toggle featuring an automated 20% annual discount calculation ($9/mo -> $86/yr, $19/mo -> $182/yr).
- 3 structured tiers: Free ($0), Creator ($9/mo, Most Popular), Pro ($19/mo, Patron Tier).
- Comprehensive 11-feature comparison table comparing capabilities across tiers.

---

## [1.1] - 2026-09-28
### Added
- Dark-first design system in `src/index.css` with tokens for `#080B12`, `#101522`, `#151B29`, `#7C5CFC`, and `#2DD4BF`.
- SaaS Hero section with CSS/SVG reactive frequency equalizer and "ON AIR" status beacon.
- Social Proof section with 4 stats (50K+ listeners, 120+ shows, 35+ weekly broadcasts, 24/7 live stream).
- 4 Core Feature cards with Lucide React iconography.
- Curated Shows section showcasing 6 resident shows with playable previews.
- Accessible 6-question FAQ Accordion.

---

## [1.0] - 2026-09-28
### Added
- Initialized React 19 + TypeScript + Vite 8 project scaffolding.
- Configured React Router v7 for client-side routing.
- Established project folder structure (`components/`, `pages/`, `context/`, `data/`, `types/`, `tests/`).
- Added SVG brand favicon and Google Fonts (Inter & Manrope).
