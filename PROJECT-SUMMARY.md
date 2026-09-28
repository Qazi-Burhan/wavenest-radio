# Project Summary: Wavenest Radio

**Author:** Supreme-Trader  
**Course / Assignment:** Individual Week 3 Internship Project  
**Date:** September 28, 2026  
**Repository:** `wavenest-radio`

---

## 1. Executive Summary & Purpose

Wavenest Radio is a portfolio-grade, client-ready SaaS marketing website, pricing engine, signup flow, and onboarding portal built for a fictional independent radio station. Modern mainstream audio streaming platforms are increasingly dominated by algorithmic loops, corporate playlists, and repetitive Top-40 formulas. Wavenest Radio models an independent alternative: a human-curated, listener-supported digital station broadcasting 24/7 commercial-free underground music, resident artist podcasts, and candid cultural discussions.

The objective of this project was to design and engineer a complete, working front-end digital product that blends the creative identity of an independent cultural institution with the rigorous UX, conversion architecture, and polish of modern SaaS products like Linear, Raycast, and Spotify.

---

## 2. Design Philosophy & Visual Identity

To embody an audio-first, editorial, and technologically sophisticated brand, the application implements a custom dark-first design system without relying on generic component libraries:

- **Curated Dark Palette:** Deep void background (`#080B12`), secondary chassis (`#101522`), and structured surface cards (`#151B29`), punctuated by an electric violet primary accent (`#7C5CFC`) and a vibrant teal secondary accent (`#2DD4BF`).
- **Typography Hierarchy:** Clean, modern geometric headings rendered in *Manrope* paired with high-legibility body copy in *Inter*.
- **Tactile Audio Aesthetics:** Rather than static stock photography, the hero and player consoles feature dynamic CSS/SVG frequency equalizer waves, an animated "ON AIR" pulsating beacon, and custom tone synthesis.
- **Responsive Architecture:** Fully tested from 360px mobile viewports up to 1440px wide screens, utilizing a responsive navigation drawer, fluid grids, and adaptive card stacks.

---

## 3. Technology Stack & Key Implementation Decisions

| Layer | Technology | Decision Rationale |
| :--- | :--- | :--- |
| **Framework** | **React 19 + TypeScript** | Provides strict component type-safety, modular UI architecture, and predictable state. |
| **Build Tool** | **Vite 8** | Instant Hot Module Replacement (HMR) and optimized sub-second production builds (1.13s bundle time). |
| **Styling** | **Modern Vanilla CSS (Custom Properties)** | 100% control over design tokens, glassmorphism, responsive breakpoints, and animations without Tailwind build overhead or version collisions. |
| **Audio Engine** | **HTML5 Web Audio API** | Implements real procedural dual-oscillator harmonic chord synthesis (triangle + sine) when shows are previewed, ensuring the browser produces real soothing sound without broken external MP3 links. |
| **Persistence** | **LocalStorage Prototype State** | Encapsulated in `AuthContext` to persist user profiles, selected plans, and onboarding tags across browser reloads while strictly omitting sensitive password storage. |
| **Testing** | **Vitest + Testing Library** | Comprehensive 11-test suite validating business rules, edge cases, and client-side form validation. |

---

## 4. Key Features & User Journey

1. **SaaS Hero & Social Proof:** Value proposition with working "Listen Live" and "Explore Plans" CTAs, supported by 4 key station statistics.
2. **Curated Shows Catalog:** 6 resident shows with duration pills, broadcast schedules, air slots, and working "Preview" audio triggers.
3. **Dynamic Pricing Tiers:** Free ($0), Creator ($9/mo, Most Popular), and Pro ($19/mo) with an interactive Monthly/Yearly toggle executing an automated 20% discount ($86/yr and $182/yr).
4. **Selected Plan Carry-Through & Form Validation:** Carries the chosen plan and billing frequency directly into `/signup`. Validates full name (min 2 chars), email (regex pattern), password (min 8 chars), and password confirmation with immediate inline feedback.
5. **Multi-Step Onboarding Wizard:** 5 distinct steps guiding users through music interests (min 1 required), content preferences, and prime listening hours, concluding with a celebratory confetti blast and redirection.
6. **Personalized Member Dashboard:** Time-aware greeting (*"Good morning/afternoon/evening, [User Name]"*), active subscription details, recommended shows algorithmically matched to onboarding interests, and an interactive account profile modal.
7. **Persistent Docked Audio Player:** Sticky bottom bar featuring a play/pause toggle, interactive seek scrubber, time elapsed/duration display, volume slider, mute, and minimize/expand toggle.

---

## 5. Problems Discovered, Debugged & Fixed

1. **Unused Imports & Strict Type Import Rules (`verbatimModuleSyntax`):**  
   *Issue:* Vite's TypeScript configuration required type-only imports (`import type { Show }`) and flagged unused Lucide icons (`Sparkles`, `Activity`).  
   *Fix:* Cleaned all imports and refactored type imports to strictly use `import type`, resulting in 0 compiler warnings.
2. **Ambiguous Testing Library Queries:**  
   *Issue:* Testing queries for `WAVENEST` and `Find your frequency` failed because text appeared in multiple legitimate locations (Navbar and Footer, Hero and Bottom Banner).  
   *Fix:* Converted ambiguous single queries to `getAllByText` length assertions and added explicit `data-testid` attributes.
3. **Corrupted LocalStorage Fault Tolerance:**  
   *Issue:* If manual testing or bad storage left invalid JSON, the app could crash during mounting.  
   *Fix:* Wrapped `JSON.parse` in try/catch blocks within `AuthContext`, defaulting to an unauthenticated state gracefully.

---

## 6. What Could Be Improved With More Time

1. **Backend Integration:** Integrate Supabase or PostgreSQL with Node.js/Express for real multi-tenant account authentication and session tokens.
2. **Stripe Billing Portal:** Connect Stripe Elements in test mode to support real mock credit card and Apple Pay processing.
3. **HLS Audio Streaming:** Connect a real Shoutcast/Icecast audio stream URL for real radio streaming alongside the procedural synthesizer.
4. **Social Sharing:** Add OpenGraph dynamic image cards when sharing individual shows on social media.
