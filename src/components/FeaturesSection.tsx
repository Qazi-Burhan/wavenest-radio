import React from 'react';
import { Radio, Mic2, ShieldCheck, Sparkles } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Radio,
      title: 'Live Radio',
      description: 'Listen to curated independent programming throughout the day. Hand-picked sets by resident selectors without algorithmic autoplay loops.',
      badge: 'Continuous Stream'
    },
    {
      icon: Mic2,
      title: 'Original Shows',
      description: 'Discover conversations, interviews, and exclusive productions. From deep investigative podcasts to unscripted late-night jam sessions.',
      badge: 'Exclusive Series'
    },
    {
      icon: ShieldCheck,
      title: 'Ad-Free Listening',
      description: 'Enjoy uninterrupted listening with premium plans. Zero commercial interruptions, zero corporate sponsor breaks—just pure sound.',
      badge: 'Uncompromised'
    },
    {
      icon: Sparkles,
      title: 'Personal Discovery',
      description: 'Build a listening experience around your interests. Select preferred genres, hosts, and broadcast slots to unlock custom recommendation feeds.',
      badge: 'Tailored Sound'
    }
  ];

  return (
    <section className="features-section" id="features" aria-label="Core Features">
      <div className="container">
        <div className="section-header">
          <p className="section-eyebrow">A Better Way to Listen</p>
          <h2 className="section-title">Designed for sonic purists and curious minds</h2>
          <p className="section-subtitle">
            Every feature on Wavenest is crafted to connect passionate listeners with the independent underground.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="card feature-card" id={`feature-card-${idx}`}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div className="feature-icon-wrapper">
                    <Icon size={24} />
                  </div>
                  <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                    {feature.badge}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {feature.title}
                </h3>

                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
