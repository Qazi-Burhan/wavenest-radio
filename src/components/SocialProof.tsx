import React from 'react';

export const SocialProof: React.FC = () => {
  const stats = [
    { value: '50K+', label: 'Listeners Worldwide', sublabel: 'Community supported' },
    { value: '120+', label: 'Independent Shows', sublabel: 'Original curation' },
    { value: '35+', label: 'Weekly Broadcasts', sublabel: 'Live from Studio A' },
    { value: '24/7', label: 'Live Programming', sublabel: 'Zero commercial ads' }
  ];

  return (
    <section className="stats-strip" aria-label="Station Key Statistics">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item" id={`stat-item-${idx}`}>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-sublabel">{stat.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};