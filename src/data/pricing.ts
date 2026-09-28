import type { Plan } from '../types';

export const PRICING_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Essential access for casual listeners and music discoverers.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    popular: false,
    ctaText: 'Start Free',
    features: [
      '24/7 curated live radio',
      'Weekly show schedule & program guide',
      'Selected podcast episodes & replays',
      'Basic genre discovery',
      'Standard audio streaming quality (128 kbps)'
    ]
  },
  {
    id: 'creator',
    name: 'Creator',
    tagline: 'The ideal setup for dedicated listeners and active music lovers.',
    monthlyPrice: 9,
    yearlyPrice: 86, // ~20% discount (normally 108)
    popular: true,
    badge: 'MOST POPULAR',
    ctaText: 'Choose Creator',
    features: [
      'Everything in Free',
      '100% ad-free listening experience',
      'Access to all premium shows & series',
      'Exclusive artist interviews & deep-dives',
      'Early access to weekly podcast episodes',
      'Personalized music & show recommendations',
      'High-definition lossless audio (320 kbps)'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Full station access, master archives, and private community events.',
    monthlyPrice: 19,
    yearlyPrice: 182, // ~20% discount (normally 228)
    popular: false,
    badge: 'PATRON TIER',
    ctaText: 'Choose Pro',
    features: [
      'Everything in Creator',
      'Full 10-year premium show & live archive',
      'Exclusive live broadcast sessions & green rooms',
      'Virtual community events & host Q&As',
      'Ultra early access & unreleased studio cuts',
      'Advanced recommendation engine & custom tags',
      'Member-only discord access & vinyl discounts'
    ]
  }
];

export const PLAN_COMPARISON_TABLE = [
  { feature: '24/7 Live Radio Streaming', free: true, creator: true, pro: true },
  { feature: 'Standard Audio (128 kbps)', free: true, creator: true, pro: true },
  { feature: 'Weekly Program Schedule', free: true, creator: true, pro: true },
  { feature: 'Ad-Free Listening', free: false, creator: true, pro: true },
  { feature: 'High-Fidelity Audio (320 kbps)', free: false, creator: true, pro: true },
  { feature: 'Exclusive Artist Interviews', free: false, creator: true, pro: true },
  { feature: 'Early Episode Drops', free: false, creator: true, pro: true },
  { feature: 'Personalized Recommendations', free: false, creator: true, pro: true },
  { feature: 'Full Archive Vault Access', free: false, creator: false, pro: true },
  { feature: 'Live Studio Green Rooms', free: false, creator: false, pro: true },
  { feature: 'Community Discord & Direct Host Access', free: false, creator: false, pro: true }
];
