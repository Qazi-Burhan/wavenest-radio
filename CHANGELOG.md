# Changelog

All notable changes to the **Wavenest Radio** platform prototype are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [2.0.0] - UI/UX Editorial Product Redesign (2026-09-28)

### Redesigned Visual Identity & Design System
- Overhauled color hierarchy from generic dark/purple SaaS to an editorial high-contrast audio-first palette: Deep Charcoal (`#090A0F`), Obsidian surfaces (`#11131C`, `#181C2A`), Warm Bone text (`#F5F5F0`), Vivid Electric Coral (`#FF5A36`), and Emerald Live indicator (`#10B981`).
- Eliminated generic cookie-cutter gradients across all cards in favor of intentional borders, typographic asymmetry, and tactile media surfaces.
- Implemented Google Fonts pairing: **Space Grotesk** / **Manrope** for display and titles, **Inter** for readable body and metadata.

### Reworked Navigation
- Created minimal desktop navigation with custom SVG frequency waveform brand symbol and `● LIVE 98.4 FM` pulsing badge.
- Added scroll listener with smooth transition from transparent to frosted blur surface on scroll.
- Built a mobile navigation drawer replacing basic dropdowns.

### Redesigned Hero Section
- Engineered an asymmetrical editorial composition: *"LIVE FROM THE INDEPENDENT FREQUENCY"*, large editorial headline *"Sound without the noise"*, and curated sub-lead.
- Built an interactive vinyl frequency visualizer dial with concentric grooves, reactive CSS audio spectrum bars, volume slider, and live broadcast audio player integration.
- Established strict CTA hierarchy: Primary *"Start Listening"* + Secondary *"Explore Plans"*.

### Editorial Social Proof & "Why Wavenest" Manifesto
- Replaced boxy number cards with a typographic metrics strip: *50K+ Listeners, 120+ Independent Shows, 35+ Weekly Broadcasts, 24/7 Live Programming*.
- Created new `WhyWavenest` editorial manifesto component featuring asymmetrical composition: *01 Independent Programming, 02 Human Curation, 03 Original Voices, 04 Community First*.
- Upgraded Features section with varied layout (large horizontal lead, split compact cards, full-width tuning banner).

### High-Fidelity Shows Catalog
- Upgraded show cards with bespoke vinyl-style artwork gradients (*Night Frequency, The Indie Hour, Open Mic, After Midnight, Sound Stories, Artist Spotlight*).
- Added interactive hover elevation, active equalizer bars during playback, and filter pills.

### Upgraded SaaS Pricing & Comparison
- Redesigned pricing tiers (*Free, Creator, Pro*) with Creator highlighted via a refined *"MOST POPULAR"* badge and subtle accent border.
- Integrated an animated Monthly ↔ Yearly billing toggle offering 20% annual savings ($86/yr vs $9/mo, $182/yr vs $19/mo).
- Added a responsive 11-row feature capability comparison table with sticky header and 14-day refund guarantee note.

### Split Storytelling Signup Experience
- Transformed centered modal into a split editorial grid: Left brand narrative (*"Your next favorite voice is already broadcasting"*) + plan summary card; Right form with floating labels.
- Added dynamic password strength evaluation (Weak, Fair, Strong), visibility toggle, and inline RFC-compliant validations.
- Engineered polished post-signup transition screen (*"You're in. Let's tune your Wavenest experience"*).

### Interactive Multi-Step Onboarding Wizard
- Designed centered, spacious `01 — 04` wizard with animated progress track.
- Step 1: Multi-select music & audio interests with check pills.
- Step 2: Discovery content format selection (Live Radio, Curated Shows, Podcasts, Artist Sessions, Interviews).
- Step 3: Listening time window selection (Morning, Afternoon, Evening, Late Night).
- Step 4: Frequency tuned completion screen with live preferences summary and *"Enter Wavenest"* launch action.

### Reimagined Member Frequency Dashboard
- Built personalized greeting (*"Good morning/afternoon/evening, [Name]"*) with active streak tracker and member tier badge.
- Added large "Now Live" hero banner with live audio visualizer and 1-click playback.
- Integrated horizontal media rows for recently broadcasted archives and curated recommendations.

### Global Audio Player & Accessibility
- Fixed bottom docked streaming player with track artwork, live indicator, play/pause, prev/next track cycling, time scrubber, volume slider, and minimize/maximize dock states.
- Enhanced semantic HTML5 markup, ARIA roles (`role="switch"`, `role="region"`, `role="slider"`), keyboard navigation, and contrast ratios.

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