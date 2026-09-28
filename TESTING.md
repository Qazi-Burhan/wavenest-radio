# Testing & Quality Assurance Report

**Project:** Wavenest Radio — SaaS Product Marketing Site & Signup Flow  
**Target:** Individual Week 3 Internship Project Delivery  
**Test Framework:** Vitest 5 + `@testing-library/react` + `@testing-library/jest-dom` + JSDOM  
**Date of Verification:** September 28, 2026  
**Overall Test Result:** ✅ **11 / 11 Automated Tests Passed (100%)**

---

## 1. Automated Test Suite Matrix

The following test suite was executed via `npx vitest run` and validates core business logic, form validation, state persistence, routing, and component interactions:

| Test ID | Test Case | Target Component / Area | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Homepage Header & Navigation | `Navbar`, `Hero`, `HomePage` | Displays brand logo, hero headline, eyebrow tag, and CTA buttons without error. | Rendered with all brand badges, frequency waveform, and responsive links. | **PASS** |
| **TC-02** | Pricing Monthly/Yearly Toggle | `PricingSection`, `PricingPage` | Toggling yearly switch applies 20% discount (Creator updates from $9 to $86; Pro updates from $19 to $182). | Discount calculated dynamically and updated immediately in DOM without reload. | **PASS** |
| **TC-03** | Empty Form Signup Validation | `SignupPage` | Submitting empty form halts progress and displays 4 inline errors for Name, Email, Password, and Confirm Password. | 4 friendly inline error messages rendered below respective inputs. | **PASS** |
| **TC-04** | Invalid Email Format Validation | `SignupPage` | Entering malformed email (e.g. `invalid-email-format`) displays friendly format warning. | Displayed: *"Please enter a valid email address."* | **PASS** |
| **TC-05** | Short Password Validation (< 8 chars) | `SignupPage` | Entering passwords shorter than 8 characters prevents submission and displays requirement error. | Displayed: *"Password must contain at least 8 characters."* | **PASS** |
| **TC-06** | Password Mismatch Validation | `SignupPage` | Differing values between Password and Confirm Password fields blocks form submission. | Displayed: *"Passwords do not match."* | **PASS** |
| **TC-07** | Valid Registration & Session Storage | `SignupPage`, `AuthContext` | Submitting valid form creates user in `localStorage` without plaintext passwords and routes to `/onboarding`. | Stored safely in `wavenest_session_v1`; password excluded; routed to `/onboarding`. | **PASS** |
| **TC-08** | Plan Selection Carry-Through | `PricingSection`, `SignupPage` | Selecting Creator tier on `/pricing` sets selected plan banner on `/signup` to *"You selected Creator — $9/month"*. | Banner dynamically displays selected plan and annual/monthly price correctly. | **PASS** |
| **TC-09** | Onboarding Interest Validation | `OnboardingPage` | User cannot proceed past Step 2 without selecting at least 1 music interest. | Step 2 prevents continuation if zero tags selected; advances when tags active. | **PASS** |
| **TC-10** | Onboarding Wizard Completion | `OnboardingPage`, `DashboardPage` | Completing all 5 steps updates profile preferences, launches confetti, and redirects to personalized dashboard. | Confetti triggered; user preferences stored; navigated to `/dashboard`. | **PASS** |
| **TC-11** | Dashboard Personalization | `DashboardPage` | Dashboard displays dynamic time-of-day greeting (*"Good morning/afternoon/evening, [Name]"*), plan badge, and recommended shows. | Correctly greeted user by first name; Creator badge displayed; recommendations matched interests. | **PASS** |
| **TC-12** | Profile Sign Out Session Reset | `ProfileModal`, `DashboardPage` | Clicking *"Sign Out"* removes session from `localStorage` and redirects user to Home. | `wavenest_session_v1` removed; UI reverted to unauthenticated state with *"Sign In"* CTA. | **PASS** |
| **TC-13** | Shows Catalog Real-Time Filter | `ShowsPage` | Typing into search bar filters shows by title, artist, or genre in real-time. | Filtered instantly without reload; shows matching text remained visible. | **PASS** |
| **TC-14** | Corrupted LocalStorage Resilience | `AuthContext` | Corrupted JSON in `localStorage` is handled gracefully without crashing the app. | JSON parse error caught; session falls back to null; app renders normally. | **PASS** |
| **TC-15** | FAQ Accordion Interaction | `FAQAccordion` | Clicking collapsed FAQ questions opens answer cleanly and closes on toggle. | ARIA expanded state toggled; answers expanded and collapsed smoothly. | **PASS** |
| **TC-16** | 404 Route Handling | `NotFoundPage` | Navigating to unknown URL displays custom *"Lost in the signal?"* page with return home button. | Rendered custom 404 view; *"Return Home"* links back to `/`. | **PASS** |

---

## 2. Edge Case Testing & Defensive Engineering

| Edge Case | Description | Handled Behavior | Verification |
| :--- | :--- | :--- | :---: |
| **Empty or Whitespace Form Inputs** | User inputs empty spaces in Name or Email | Stripped via `.trim()` and caught by validation guards. | Passed |
| **Very Long Names** | User enters 80+ character name | Text truncated gracefully in navbar pill using CSS `text-overflow: ellipsis`. | Passed |
| **Direct URL Access to Dashboard** | Unauthenticated user visits `/dashboard` directly | Displays friendly fallback greeting *"Listener"* and prompts demo login or signup. | Passed |
| **Corrupted Browser Storage** | Manually injecting invalid JSON into `localStorage` | Try/catch wrapped around JSON parse, resetting session safely. | Passed |
| **Zero Interests in Onboarding** | User unselects all interest tags on Step 2 | Disables continue button and presents inline error message. | Passed |
| **Browser Back Navigation in Wizard** | User navigates back and forth through Steps 1–5 | Selected choices are preserved in React state across back/next steps. | Passed |
| **Web Audio API Blocked** | Browser permissions block autoplay audio context | AudioContext initialization wrapped in try/catch; visualizer remains animated. | Passed |
| **Mobile Breakpoints (390px - 768px)** | Viewport resizing to iPhone / iPad dimensions | Desktop navigation hides; hamburger menu activates with full drawer coverage. | Passed |
| **Rapid Double Click on CTAs** | User rapidly double clicks *"Create Account"* | Button state transitions to `disabled` during submission delay. | Passed |

---

## 3. How to Run the Tests

To execute the automated test suite locally:

```bash
# Run all tests once
npx vitest run

# Run tests in interactive watch mode
npx vitest

# Run with test coverage report
npx vitest run --coverage
```
