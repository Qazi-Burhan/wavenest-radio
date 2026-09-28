import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { FeaturesSection } from '../components/FeaturesSection';
import { ShowsSection } from '../components/ShowsSection';
import { PricingSection } from '../components/PricingSection';
import { FAQAccordion } from '../components/FAQAccordion';

export const HomePage: React.FC = () => {
  return (
    <main id="main-content">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Social Proof / Stats */}
      <SocialProof />

      {/* 3. Core Features */}
      <FeaturesSection />

      {/* 4. Featured Shows Preview */}
      <ShowsSection limit={6} />

      {/* 5. Ethos / Manifesto Banner */}
      <section style={{ padding: '64px 0', background: '#0c101c', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-secondary)', marginBottom: '16px' }}>
            <Headphones size={20} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              The Independent Difference
            </span>
          </div>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', lineHeight: '1.25' }}>
            “No algorithmic repetition. No corporate sponsor dictates. Just pure, uncompromised human frequency.”
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Broadcasting 24 hours a day from our community studio. When you support Wavenest, 100% of member subscriptions go directly to grassroots audio producers, underground musicians, and open audio infrastructure.
          </p>
          <div style={{ marginTop: '28px' }}>
            <Link to="/about" className="btn btn-secondary" id="banner-learn-more">
              <span>Read Our Full Story</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Pricing Tiers Section */}
      <PricingSection />

      {/* 7. FAQ Accordion */}
      <FAQAccordion />

      {/* 8. Bottom CTA Banner */}
      <section style={{ padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div
            className="card"
            style={{
              padding: '56px 32px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, #13192b 0%, #0d1220 100%)',
              border: '1px solid var(--border-accent)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-glow)'
            }}
          >
            <span className="badge badge-purple" style={{ marginBottom: '16px' }}>
              Join 50,000+ Listeners
            </span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>
              Ready to find your frequency?
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 32px' }}>
              Sign up today with zero commitments. Start listening to 24/7 curated independent broadcasts right inside your browser.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/pricing" className="btn btn-primary btn-lg" id="bottom-cta-plans">
                <span>Explore Membership Tiers</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/shows" className="btn btn-secondary btn-lg" id="bottom-cta-shows">
                <span>Browse Schedule</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
