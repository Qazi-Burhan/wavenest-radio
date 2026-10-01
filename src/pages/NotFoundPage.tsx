import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        padding: '120px 24px 96px',
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
      id="not-found-container"
    >
      <div style={{ maxWidth: '540px' }}>
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'rgba(255, 90, 54, 0.1)',
            border: '2px dashed var(--accent-coral)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-coral)',
            margin: '0 auto 24px'
          }}
        >
          <Radio size={40} />
        </div>

        <div className="eyebrow-chip" style={{ margin: '0 auto 16px' }}>
          <span>Error 404 • Frequency Not Found</span>
        </div>

        <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Lost in the signal?
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          The frequency or broadcast channel you're trying to tune into does not exist or has moved to an unlisted archive.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg" id="notfound-home-btn">
            <ArrowLeft size={18} />
            <span>Return Home</span>
          </Link>
          <Link to="/shows" className="btn btn-secondary btn-lg" id="notfound-shows-btn">
            <span>Browse Active Shows</span>
          </Link>
        </div>
      </div>
    </div>
  );
};