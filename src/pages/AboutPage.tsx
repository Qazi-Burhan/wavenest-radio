import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Heart, ShieldAlert, Cpu, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div style={{ padding: '48px 0 80px' }}>
      <div className="container">
        {/* Transparent Portfolio Prototype Notice Banner */}
        <div
          className="card"
          style={{
            background: 'rgba(124, 92, 252, 0.08)',
            border: '1px solid rgba(124, 92, 252, 0.3)',
            padding: '24px',
            marginBottom: '48px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
          }}
        >
          <ShieldAlert size={26} style={{ color: '#A78BFA', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '6px' }}>
              Academic & Portfolio Project Notice
            </h3>
            <p style={{ fontSize: '0.925rem', color: '#CBD5E1', lineHeight: '1.6' }}>
              <strong>Wavenest Radio is a fictional independent radio platform</strong> created as an individual Week 3 internship portfolio project demonstrating modern SaaS marketing, dynamic pricing tiers, realistic client-side signup flow, form validation, multi-step interactive onboarding, and custom audio player engineering. This is a front-end simulation; no real billing or production accounts are processed.
            </p>
          </div>
        </div>

        {/* Hero / About Header */}
        <div style={{ maxWidth: '780px', marginBottom: '56px', textAlign: 'left' }}>
          <div className="eyebrow-chip" style={{ marginBottom: '12px' }}>
            <span>The Wavenest Ethos</span>
          </div>
          <h1 style={{ fontSize: '3.25rem', letterSpacing: '-0.03em', lineHeight: '1.15', marginBottom: '20px' }}>
            Independent voices. Original sound. Your frequency.
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Wavenest was born out of a desire to rescue music and spoken storytelling from algorithmic homogenization. We believe music should be curated by passionate human beings who live and breathe underground culture.
          </p>
        </div>

        {/* Narrative Columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '64px' }}>
          <div className="card">
            <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>
              <Radio size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>1. The Problem With Modern Streaming</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Mainstream streaming services rely on algorithmic feedback loops that reinforce top-40 repetition and penalize experimental sounds. Independent artists struggle to find engaged audiences, while listeners are trapped in predictable sonic echo chambers.
            </p>
          </div>

          <div className="card">
            <div style={{ color: 'var(--accent-secondary)', marginBottom: '16px' }}>
              <Compass size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>2. Human-Curated Curation</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              Every show, playlist, and live broadcast on Wavenest is programmed by resident selectors, producers, and community hosts. We champion grassroots sounds, local garage recordings, and long-form conversational radio.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#F59E0B', marginBottom: '16px' }}>
              <Heart size={28} />
            </div>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '10px' }}>3. The Patron-Supported Model</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
              By shifting from ad-sponsored interruptions to direct listener support, stations can remain true to artistic integrity without catering to corporate interests or invasive track monitoring.
            </p>
          </div>
        </div>

        {/* Technical Architecture Overview */}
        <div className="card" style={{ padding: '40px', marginBottom: '64px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <Cpu size={24} style={{ color: 'var(--accent-primary)' }} />
            <h2 style={{ fontSize: '1.8rem' }}>Behind the Scenes: Engineering Stack</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            This project is engineered as a client-ready modern web application adhering to professional front-end principles:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <div style={{ background: '#090d18', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Framework</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>React 19 + TypeScript</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Strict type safety & component reusability</p>
            </div>

            <div style={{ background: '#090d18', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, textTransform: 'uppercase' }}>Build Tool</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>Vite 8</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Instant HMR & optimized production bundles</p>
            </div>

            <div style={{ background: '#090d18', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: 700, textTransform: 'uppercase' }}>Styling System</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>Modern Dark-First CSS</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Custom CSS custom properties, glassmorphism & tokens</p>
            </div>

            <div style={{ background: '#090d18', padding: '16px 20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>Audio Simulation</span>
              <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>HTML5 Web Audio API</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Procedural synth harmonic generation & reactive EQ</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Ready to experience Wavenest?</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
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
