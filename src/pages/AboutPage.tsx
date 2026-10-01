import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Radio, Compass, Heart, Cpu, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="section-padding" style={{ paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Transparent Portfolio Project Notice Banner */}
        <div className="portfolio-notice-banner" style={{ marginBottom: '48px' }}>
          <div className="notice-icon-box">
            <ShieldAlert size={24} style={{ color: 'var(--accent-coral)' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Academic & Portfolio Project Notice
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <strong>Wavenest Radio is a fictional independent radio platform</strong> created as an individual Week 3 internship portfolio project demonstrating modern SaaS marketing, dynamic pricing tiers, realistic client-side signup flow, form validation, multi-step interactive onboarding, and custom audio player engineering. This is a front-end simulation; no real billing or production accounts are processed.
            </p>
          </div>
        </div>

        {/* Hero / About Editorial Narrative */}
        <div style={{ maxWidth: '840px', marginBottom: '56px' }}>
          <div className="eyebrow-chip" style={{ marginBottom: '14px' }}>
            <span className="live-pulse-dot" style={{ width: '5px', height: '5px' }}></span>
            <span>STATION MANIFESTO</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '20px' }}>
            Independent voices. <br />
            Original sound. Your frequency.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
            Wavenest was founded in response to the corporate homogenization of internet audio. When algorithms dictate music, culture becomes repetitive, sanitised, and predictable. We built Wavenest to champion human curiosity, underground tape labels, and unfiltered radio discourse.
          </p>
        </div>

        {/* Editorial Narrative Grid */}
        <div className="manifesto-grid" style={{ marginBottom: '64px' }}>
          <div className="manifesto-card featured">
            <div className="manifesto-icon-box">
              <Radio size={28} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">01 / OUR STORY</span>
              <h3 className="manifesto-title">Why Independent Radio Matters</h3>
              <p className="manifesto-text">
                Commercial streaming platforms optimize for passive background listening and advertiser retention. Radio, in its true historical form, is about communion—a shared sonic frequency where you stumble upon unreleased demos, intimate host musings, and breakthrough underground genres you never knew existed.
              </p>
            </div>
          </div>

          <div className="manifesto-card">
            <div className="manifesto-icon-box">
              <Compass size={24} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">02 / HUMAN CURATION</span>
              <h3 className="manifesto-title">Human Curation Over Algorithms</h3>
              <p className="manifesto-text">
                Every track, interview, and spoken segment on Wavenest is hand-selected by resident DJs and community hosts. No algorithmic shuffle—only passionate selectors digging through vinyl crates and overseas tape labels.
              </p>
            </div>
          </div>

          <div className="manifesto-card">
            <div className="manifesto-icon-box">
              <Heart size={24} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">03 / PATRON SUPPORT</span>
              <h3 className="manifesto-title">Sustainable Patron Economics</h3>
              <p className="manifesto-text">
                Over 70% of all listener membership revenue flows directly to resident producers, studio engineers, and independent audio storytellers.
              </p>
            </div>
          </div>

          <div className="manifesto-card wide">
            <div className="manifesto-icon-box">
              <Users size={26} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">04 / COMMUNITY</span>
              <h3 className="manifesto-title">What We Believe: Open Sound For All</h3>
              <p className="manifesto-text">
                We believe radio is a public good. That is why our primary 24/7 live transmission will always remain 100% free and open to anyone worldwide with a web browser, receiver, or mobile phone.
              </p>
            </div>
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="manifesto-card wide" style={{ padding: '36px', marginBottom: '64px' }} id="engineering">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
            <Cpu size={24} style={{ color: 'var(--accent-coral)' }} />
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-display)' }}>Behind the Scenes: Engineering Stack</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.6', marginBottom: '24px' }}>
            This project is engineered as a production-grade modern web application adhering to professional front-end and product engineering standards:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div className="stack-info-box">
              <span className="stack-tag">Framework</span>
              <p className="stack-title">React 19 + TypeScript</p>
              <p className="stack-desc">Strict type safety, custom hooks, and reactive context state</p>
            </div>

            <div className="stack-info-box">
              <span className="stack-tag">Build Tool</span>
              <p className="stack-title">Vite 8</p>
              <p className="stack-desc">Instant Hot Module Replacement & optimized production bundle</p>
            </div>

            <div className="stack-info-box">
              <span className="stack-tag">Design System</span>
              <p className="stack-title">Editorial Dark CSS</p>
              <p className="stack-desc">Custom CSS variables, typography scale, and responsive containers</p>
            </div>

            <div className="stack-info-box">
              <span className="stack-tag">Audio Synthesis</span>
              <p className="stack-title">HTML5 Web Audio API</p>
              <p className="stack-desc">Dual oscillator harmonic synth & procedural ambient preview</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginBottom: '16px' }}>Ready to experience Wavenest?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/pricing" className="btn btn-primary btn-lg">
              Explore Plans
            </Link>
            <Link to="/shows" className="btn btn-secondary btn-lg">
              Listen to Shows
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};