import React from 'react';
import { Shield } from 'lucide-react';
import { PricingSection } from '../components/PricingSection';
import { FAQAccordion } from '../components/FAQAccordion';

export const PricingPage: React.FC = () => {
  return (
    <div className="pricing-page">
      {/* Core Pricing Section (Includes Header, Billing Toggle, Cards, and Comparison Table) */}
      <PricingSection showComparisonTable headingLevel="h1" />

      <div className="container">
        {/* Member Guarantee Trust Box */}
        <div
          className="manifesto-card wide"
          style={{
            marginTop: '40px',
            marginBottom: '64px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--radius-lg)',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--status-live)',
              flexShrink: 0
            }}
          >
            <Shield size={28} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              100% Risk-Free Patron Guarantee
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Try any membership plan risk-free. If you ever feel Wavenest isn't the right frequency for you, cancel in one click or contact support for a prompt refund within 14 days. No friction, no questions asked.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQAccordion />
      </div>
    </div>
  );
};