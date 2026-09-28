import React from 'react';
import { Users, Disc, Calendar, Radio } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const stats = [
    { value: '50K+', label: 'Active Monthly Listeners', icon: Users, sub: 'Worldwide community' },
    { value: '120+', label: 'Independent Shows', icon: Disc, sub: 'Curated archives' },
    { value: '35+', label: 'Weekly Broadcasts', icon: Calendar, sub: 'Original productions' },
    { value: '24/7', label: 'Live Programming', icon: Radio, sub: 'Continuous stream' }
  ];

  return (
    <section className="stats-section" aria-label="Platform Statistics">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            “Built for listeners who want something beyond the mainstream.”
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="stat-item" id={`stat-item-${idx}`}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={18} style={{ color: 'var(--accent-secondary)' }} />
                  <span className="stat-value">{stat.value}</span>
                </div>
                <span className="stat-label">{stat.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{stat.sub}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
