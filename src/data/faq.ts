export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'what-is-wavenest',
    question: 'What is Wavenest Radio?',
    answer: 'Wavenest Radio is an independent, member-supported digital radio platform broadcasting curated underground music, original shows, in-depth interviews, and cultural conversations without algorithmic repetition or corporate sponsor interference.'
  },
  {
    id: 'can-i-listen-free',
    question: 'Can I listen for free?',
    answer: 'Yes! Our Free tier provides 24/7 access to our primary live broadcast stream, our weekly program guide, and select podcast preview episodes without requiring any credit card or payment information.'
  },
  {
    id: 'included-in-creator',
    question: 'What is included in Creator?',
    answer: 'The Creator plan ($9/month or $86/year) gives you uninterrupted 100% ad-free listening, on-demand playback of all weekly shows, exclusive artist interviews, early access to episodes, custom algorithmic discovery tailored to your musical tastes, and 320 kbps high-definition streaming.'
  },
  {
    id: 'included-in-pro',
    question: 'What is included in Pro?',
    answer: 'The Pro plan ($19/month or $182/year) is our patron-level membership. It includes everything in Creator, plus access to our comprehensive 10-year master archive, private live studio green rooms, virtual monthly Q&As with station hosts, member-only community perks, and discounts on limited-edition station vinyl.'
  },
  {
    id: 'can-i-cancel',
    question: 'Can I cancel my plan?',
    answer: 'Absolutely. You can modify, upgrade, downgrade, or cancel your subscription at any time directly through your account preferences with zero cancellation fees or lock-in contracts.'
  },
  {
    id: 'available-on-mobile',
    question: 'Is this available on mobile?',
    answer: 'Yes, Wavenest Radio is completely responsive and optimized for mobile devices, tablets, laptops, and desktops. The audio player continues playing seamlessly across browser views on iOS and Android devices.'
  }
];
