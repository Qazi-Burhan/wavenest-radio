import React from 'react';
import { Headphones, ShieldCheck, Disc, Compass } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="section-padding features-section" aria-label="Station Features">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">WHAT WE DELIVER</span>
          <h2 className="section-title">Engineered for pure listening pleasure.</h2>
          <p className="section-desc">
            A broadcasting platform built with modern audio tech, uncompromising fidelity, and zero commercial distractions.
          </p>
        </div>

        {/* Varied Asymmetrical Layout */}
        <div className="features-editorial-grid">
          {/* Feature 1: Large Horizontal Lead */}
          <div className="feature-item large-horizontal">
            <div className="feature-item-body">
              <div className="feature-icon-badge">
                <Headphones size={26} />
              </div>
              <span className="feature-kicker">ACOUSTIC EXCELLENCE</span>
              <h3 className="feature-heading">320kbps Lossless Audiophile Stream</h3>
              <p className="feature-summary">
                Experience pristine studio-quality audio directly in your browser. Mastered with dynamic range preservation so you hear every vinyl crackle, tape saturation, and synth harmonic exactly as intended.
              </p>
              <div className="feature-meta-pill">
                <span>FLAC & Opus Codec Support</span>
              </div>
            </div>
            <div className="feature-visual-panel">
              <div className="feature-soundwave-decor">
                {[40, 70, 90, 60, 85, 95, 75, 50, 80, 100, 65, 85, 45, 90, 70].map((h, i) => (
                  <div key={i} className="soundwave-bar" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 2: Compact */}
          <div className="feature-item compact">
            <div className="feature-icon-badge">
              <ShieldCheck size={22} />
            </div>
            <span className="feature-kicker">ZERO INTERRUPTIONS</span>
            <h3 className="feature-heading">100% Commercial-Free</h3>
            <p className="feature-summary">
              No insurance commercials, car ads, or algorithmic sponsor promos. Pure uninterrupted soundscapes.
            </p>
          </div>

          {/* Feature 3: Compact */}
          <div className="feature-item compact">
            <div className="feature-icon-badge">
              <Disc size={22} />
            </div>
            <span className="feature-kicker">ON-DEMAND REPLAYS</span>
            <h3 className="feature-heading">10-Year Master Vault</h3>
            <p className="feature-summary">
              Revisit historic resident sessions, guest DJ tape cuts, and unreleased studio rehearsals on demand.
            </p>
          </div>

          {/* Feature 4: Full Width */}
          <div className="feature-item full-width">
            <div className="feature-full-inner">
              <div className="feature-icon-badge">
                <Compass size={24} />
              </div>
              <div className="feature-full-content">
                <span className="feature-kicker">INTELLIGENT TUNING</span>
                <h3 className="feature-heading">Context-Aware Frequency Recommendations</h3>
                <p className="feature-summary">
                  Tailored show suggestions mapped to your listening routine—from ambient lo-fi morning focus to late-night deep electronic sessions.
                </p>
              </div>
              <div className="feature-action-tag">
                <span>Personalized Daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};