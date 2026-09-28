import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        padding: '96px 24px',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
      id="not-found-container"
    >
      <div style={{ maxWidth: '520px' }}>
        <div
          style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: 'rgba(124, 92, 252, 0.12)',
            border: '2px dashed var(--accent-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#A78BFA',
            margin: '0 auto 24px',
            animation: 'pulse-ring 2.5s infinite'
          }}
        >
          <Radio size={40} />
        </div>

        <span className="badge badge-purple" style={{ marginBottom: '16px' }}>
          Error 404 • Frequency Not Found
        </span>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Lost in the signal?
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '32px' }}>
          The frequency or broadcast channel you're trying to tune into does not exist or has moved to an unlisted archive.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
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
