import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { PRICING_PLANS, PLAN_COMPARISON_TABLE } from '../data/pricing';
import { useAuth } from '../context/AuthContext';
import type { PlanId } from '../types';

interface PricingSectionProps {
  showComparisonTable?: boolean;
  headingLevel?: 'h1' | 'h2';
}

export const PricingSection: React.FC<PricingSectionProps> = ({ showComparisonTable = true, headingLevel = 'h2' }) => {
  const [isYearly, setIsYearly] = useState<boolean>(false);
  const { setSelectedPlan, setBillingCycle } = useAuth();
  const navigate = useNavigate();
  const Heading = headingLevel;

  const handleSelectPlan = (planId: PlanId) => {
    setSelectedPlan(planId);
    setBillingCycle(isYearly ? 'yearly' : 'monthly');
    navigate(`/signup?plan=${planId}&billing=${isYearly ? 'yearly' : 'monthly'}`);
  };

  return (
    <section className="section-padding pricing-section" aria-label="Membership Tiers">
      <div className="container">
        {/* Editorial Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">MEMBERSHIP</span>
          <Heading className="section-title">Choose how deeply you want to listen.</Heading>
          <p className="section-desc">
            Simple, transparent membership for independent radio. Directly funding independent broadcast infrastructure and resident selectors.
          </p>
        </div>

        {/* Monthly / Yearly Billing Toggle */}
        <div className="pricing-toggle-wrap">
          <span className={`toggle-label-text ${!isYearly ? 'active' : ''}`}>Monthly Billing</span>

          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label="toggle annual billing discount"
            className={`pricing-switch ${isYearly ? 'checked' : ''}`}
            onClick={() => setIsYearly(!isYearly)}
          >
            <span className="switch-thumb"></span>
          </button>

          <span className={`toggle-label-text ${isYearly ? 'active' : ''}`}>
            Yearly Billing
            <span className="save-badge">Save 20% annually</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="pricing-cards-grid">
          {PRICING_PLANS.map((plan) => {
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? '/year' : '/month';
            const isFeatured = plan.id === 'creator';

            return (
              <div
                key={plan.id}
                className={`pricing-card ${isFeatured ? 'featured' : ''}`}
                id={`pricing-card-${plan.id}`}
              >
                {/* Visual Popular Flag */}
                {isFeatured && (
                  <div className="popular-ribbon">
                    <Sparkles size={13} />
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-tagline">{plan.tagline}</p>
                </div>

                {/* Price Display: Rendered with explicit '$price' for exact element match */}
                <div className="plan-price-box">
                  <div className="plan-price-amount">
                    <span className="price-digits">${price}</span>
                    <span className="price-period">{period}</span>
                  </div>
                  {isYearly && plan.monthlyPrice > 0 && (
                    <span className="plan-billed-note">
                      Billed annually (save ${(plan.monthlyPrice * 12) - plan.yearlyPrice}/yr)
                    </span>
                  )}
                  {plan.monthlyPrice === 0 && (
                    <span className="plan-billed-note">Free forever • No card needed</span>
                  )}
                </div>

                {/* Call to Action Button */}
                <button
                  type="button"
                  onClick={() => handleSelectPlan(plan.id)}
                  className={`btn ${isFeatured ? 'btn-primary' : 'btn-secondary'} btn-full`}
                  id={`btn-select-plan-${plan.id}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={16} />
                </button>

                {/* Features List */}
                <div className="plan-features-block">
                  <span className="features-list-title">What's included:</span>
                  <ul className="plan-features-list">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="feature-list-row">
                        <div className="check-icon-circle">
                          <Check size={13} />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        {showComparisonTable && (
          <div className="comparison-table-wrapper" id="plan-comparison-table">
            <div className="comparison-header">
              <h3 className="comparison-title">Full Feature Comparison</h3>
              <p className="comparison-subtitle">Every tier supports independent radio transmitters and broadcast engineering.</p>
            </div>

            <div className="table-responsive-box">
              <table className="comparison-table">
                <caption className="sr-only">Features included with each Wavenest membership plan</caption>
                <thead>
                  <tr>
                    <th scope="col" style={{ width: '40%' }}>Feature Capabilities</th>
                    <th scope="col" style={{ textAlign: 'center', width: '20%' }}>Free</th>
                    <th scope="col" style={{ textAlign: 'center', width: '20%', color: 'var(--accent-coral)' }}>Creator</th>
                    <th scope="col" style={{ textAlign: 'center', width: '20%' }}>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {PLAN_COMPARISON_TABLE.map((row, rIdx) => (
                    <tr key={rIdx}>
                      <td className="row-feature-name">{row.feature}</td>
                      <td className="row-tier-val">
                        {row.free ? <Check size={18} className="icon-check-tier" /> : <span className="icon-dash-tier">—</span>}
                      </td>
                      <td className="row-tier-val highlighted-col">
                        {row.creator ? <Check size={18} className="icon-check-tier accent" /> : <span className="icon-dash-tier">—</span>}
                      </td>
                      <td className="row-tier-val">
                        {row.pro ? <Check size={18} className="icon-check-tier" /> : <span className="icon-dash-tier">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="comparison-footnote">
              <Shield size={16} style={{ color: 'var(--status-live)' }} />
              <span>All plans include our 14-day patron satisfaction guarantee. Cancel or switch tiers at any time with one click.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};