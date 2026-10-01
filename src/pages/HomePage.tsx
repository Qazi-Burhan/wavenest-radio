import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { WhyWavenest } from '../components/WhyWavenest';
import { FeaturesSection } from '../components/FeaturesSection';
import { ShowsSection } from '../components/ShowsSection';
import { PricingSection } from '../components/PricingSection';
import { FAQAccordion } from '../components/FAQAccordion';

export const HomePage: React.FC = () => {
  return (
    <>
      {/* 1. Hero Section: Sound without the noise */}
      <Hero />

      {/* 2. Editorial Metrics Strip */}
      <SocialProof />

      {/* 3. Why Wavenest Editorial Manifesto Section */}
      <WhyWavenest />

      {/* 4. Varied Features Section */}
      <FeaturesSection />

      {/* 5. Shows Showcase Grid */}
      <ShowsSection limit={6} />

      {/* 6. Pricing & Membership Tiers */}
      <PricingSection />

      {/* 7. FAQ Accordion */}
      <FAQAccordion />

      {/* 8. Bottom Editorial Invitation */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="editorial-cta-box">
            <div className="cta-kicker">
              <span className="live-pulse-dot"></span>
              <span>COMMUNITY FREQUENCY</span>
            </div>

            <h2 className="cta-headline">
              Ready to tune into voices worth hearing?
            </h2>

            <p className="cta-description">
              Start with free 24/7 live streaming, or become a patron member to unlock lossless archives, resident DJ tracklists, and community broadcast sessions.
            </p>

            <div className="cta-button-row">
              <Link to="/pricing" className="btn btn-primary btn-lg" id="bottom-cta-plans">
                <span>Explore Membership</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/shows" className="btn btn-secondary btn-lg" id="bottom-cta-shows">
                <span>Browse Shows & Residencies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};