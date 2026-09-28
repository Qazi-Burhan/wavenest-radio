import React from 'react';
import { Check, Shield } from 'lucide-react';
import { PricingSection } from '../components/PricingSection';
import { FAQAccordion } from '../components/FAQAccordion';
import { PLAN_COMPARISON_TABLE } from '../data/pricing';

export const PricingPage: React.FC = () => {
  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <div className="eyebrow-chip" style={{ margin: '0 auto 12px' }}>
            <span>Transparent, Listener-First Pricing</span>
          </div>
          <h1 style={{ fontSize: '3.25rem', letterSpacing: '-0.03em', marginBottom: '16px' }}>
            Choose the frequency that fits you
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
            Support independent music curation with zero lock-in contracts. Upgrade, downgrade, or cancel anytime with a single click.
          </p>
        </div>

        {/* Core Pricing Cards Grid (Reusable Component) */}
        <PricingSection showTitle={false} />

        {/* Feature Comparison Table */}
        <div style={{ marginTop: '80px', marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Compare Plan Features</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Detailed breakdown of features included across each membership tier.
            </p>
          </div>

          <div
            className="card"
            style={{
              padding: '0',
              overflowX: 'auto',
              borderRadius: 'var(--radius-xl)'
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                textAlign: 'left',
                minWidth: '600px'
              }}
            >
              <thead>
                <tr style={{ background: '#0c101c', borderBottom: '1px solid var(--border-strong)' }}>
                  <th style={{ padding: '20px 24px', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700 }}>
                    Feature Capability
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center' }}>
                    Free ($0)
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '1rem', color: '#A78BFA', fontWeight: 800, textAlign: 'center', background: 'rgba(124, 92, 252, 0.08)' }}>
                    Creator ($9/mo)
                  </th>
                  <th style={{ padding: '20px 24px', fontSize: '1rem', color: 'var(--accent-secondary)', fontWeight: 800, textAlign: 'center' }}>
                    Pro ($19/mo)
                  </th>
                </tr>
              </thead>
              <tbody>
                {PLAN_COMPARISON_TABLE.map((row, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.015)'
                    }}
                  >
                    <td style={{ padding: '16px 24px', fontSize: '0.925rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {row.feature}
                    </td>

                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      {row.free ? (
                        <Check size={18} style={{ color: 'var(--accent-secondary)', margin: '0 auto' }} />
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 24px', textAlign: 'center', background: 'rgba(124, 92, 252, 0.04)' }}>
                      {row.creator ? (
                        <Check size={18} style={{ color: '#A78BFA', margin: '0 auto' }} />
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>

                    <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                      {row.pro ? (
                        <Check size={18} style={{ color: 'var(--accent-secondary)', margin: '0 auto' }} />
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Guarantee Trust Box */}
        <div
          className="card"
          style={{
            background: 'rgba(16, 21, 34, 0.5)',
            border: '1px solid var(--border-subtle)',
            padding: '36px',
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
              background: 'rgba(45, 212, 191, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-secondary)',
              flexShrink: 0
            }}
          >
            <Shield size={28} />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
              100% Risk-Free Guarantee
            </h3>
            <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Try any paid plan risk-free. If you ever feel Wavenest isn't the right frequency for you, cancel in one click or contact support for a friendly refund within 14 days. No questions asked.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQAccordion />
      </div>
    </div>
  );
};
