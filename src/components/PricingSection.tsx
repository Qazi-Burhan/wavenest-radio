import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { PRICING_PLANS } from '../data/pricing';
import { useAuth } from '../context/AuthContext';
import type { PlanId } from '../types';

interface PricingSectionProps {
  showTitle?: boolean;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ showTitle = true }) => {
  const { setSelectedPlan, billingCycle, setBillingCycle } = useAuth();
  const navigate = useNavigate();

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    navigate(`/signup?plan=${planId}&billing=${billingCycle}`);
  };

  const isYearly = billingCycle === 'yearly';

  return (
    <section className="pricing-section" id="pricing" aria-label="Membership Pricing Plans">
      <div className="container">
        {showTitle && (
          <div className="section-header">
            <p className="section-eyebrow">Membership & Subscriptions</p>
            <h2 className="section-title">Fuel independent sound. Choose your tier.</h2>
            <p className="section-subtitle">
              Every tier directly finances independent artists, broadcast equipment, and commercial-free music curation.
            </p>
          </div>
        )}

        {/* Monthly / Yearly Toggle */}
        <div className="billing-toggle-container">
          <span className={`toggle-label ${!isYearly ? 'active' : ''}`}>Monthly</span>

          <div
            className={`toggle-switch ${isYearly ? 'checked' : ''}`}
            id="billing-cycle-toggle"
            role="switch"
            aria-checked={isYearly}
            tabIndex={0}
            onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBillingCycle(isYearly ? 'monthly' : 'yearly');
              }
            }}
            aria-label="Toggle annual billing discount"
          >
            <div className="toggle-knob"></div>
          </div>

          <span className={`toggle-label ${isYearly ? 'active' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Yearly Billing</span>
            <span className="discount-pill">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const periodText = plan.id === 'free' ? '/month' : isYearly ? '/year' : '/month';

            return (
              <div
                key={plan.id}
                className={`pricing-card ${plan.popular ? 'popular' : ''}`}
                id={`pricing-card-${plan.id}`}
              >
                {plan.popular && (
                  <div className="popular-ribbon" id="popular-badge">
                    {plan.badge || 'MOST POPULAR'}
                  </div>
                )}

                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                    {plan.tagline}
                  </p>

                  <div className="price-box">
                    <span className="price-num" id={`price-display-${plan.id}`}>
                      ${price}
                    </span>
                    <span className="price-period">{periodText}</span>
                  </div>

                  {isYearly && plan.id !== 'free' && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>
                      Billed annually (equivalent to ${(price / 12).toFixed(2)}/mo)
                    </p>
                  )}

                  <ul className="features-list">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-list-item">
                        <Check size={18} className="feature-check-icon" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`btn btn-lg btn-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                  id={`btn-choose-plan-${plan.id}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
