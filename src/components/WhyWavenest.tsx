import React from 'react';
import { Radio, Users, Sparkles, HeartHandshake } from 'lucide-react';

export const WhyWavenest: React.FC = () => {
  return (
    <section className="section-padding manifesto-section" aria-label="Why Wavenest">
      <div className="container">
        {/* Editorial Statement Header */}
        <div className="manifesto-header">
          <span className="section-eyebrow">OUR PHILOSOPHY</span>
          <h2 className="manifesto-headline">
            A different signal for a different kind of listener.
          </h2>
          <p className="manifesto-sub">
            The mainstream internet is overflowing with auto-generated playlists, commercial interruption, and algorithmic echo chambers. Wavenest was built by broadcast journalists, sound artists, and record collectors who believe radio should feel intimate, surprising, and human.
          </p>
        </div>

        {/* Asymmetrical Editorial Composition Grid */}
        <div className="manifesto-grid">
          {/* Card 1: Large Featured Lead */}
          <div className="manifesto-card featured">
            <div className="manifesto-icon-box">
              <Radio size={28} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">01 / PROGRAMMING</span>
              <h3 className="manifesto-title">Independent Programming</h3>
              <p className="manifesto-text">
                Free from corporate sponsor mandates, record label payola, and algorithmic homogeny. Every track, interview, and spoken segment is selected purely for sonic merit and narrative depth.
              </p>
              <div className="manifesto-metric-badge">
                <span>100% Listener Supported</span>
              </div>
            </div>
          </div>

          {/* Card 2: Human Curation */}
          <div className="manifesto-card">
            <div className="manifesto-icon-box">
              <Sparkles size={24} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">02 / HUMAN TASTE</span>
              <h3 className="manifesto-title">Human Curation</h3>
              <p className="manifesto-text">
                Real music selectors digging through record crates, bedroom tapes, and overseas tape labels. No robotic shuffle—only thoughtful sequencing crafted by passionate selectors.
              </p>
            </div>
          </div>

          {/* Card 3: Original Voices */}
          <div className="manifesto-card">
            <div className="manifesto-icon-box">
              <Users size={24} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">03 / PERSPECTIVE</span>
              <h3 className="manifesto-title">Original Voices</h3>
              <p className="manifesto-text">
                Amplifying marginalized storytellers, emerging underground producers, and diaspora sound artists who don't fit into commercial top-40 formats.
              </p>
            </div>
          </div>

          {/* Card 4: Wide Community First Banner */}
          <div className="manifesto-card wide">
            <div className="manifesto-icon-box">
              <HeartHandshake size={26} />
            </div>
            <div className="manifesto-content">
              <span className="manifesto-tag">04 / ECOSYSTEM</span>
              <h3 className="manifesto-title">Community First</h3>
              <p className="manifesto-text">
                A non-extractive patronage economy where over 70% of subscription revenue flows directly back to resident DJs, interviewers, and community transmission infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};