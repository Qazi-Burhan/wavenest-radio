import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, LogOut, Sliders, Clock, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface ProfileModalProps {
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleManagePreferences = () => {
    onClose();
    navigate('/onboarding');
  };

  const handleSignOut = () => {
    signOut();
    onClose();
    navigate('/');
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div className="profile-avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 id="profile-title" className="profile-name-text">{user.name}</h3>
              <p className="profile-email-text">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="modal-close-trigger"
            aria-label="Close Profile Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Plan Status Card */}
        <div className="profile-plan-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="profile-kicker">Active Membership</span>
            <span className="profile-plan-badge">
              {user.planId.toUpperCase()} TIER
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
              {user.planId === 'free' ? '$0' : user.planId === 'creator' ? (user.billingCycle === 'yearly' ? '$86' : '$9') : (user.billingCycle === 'yearly' ? '$182' : '$19')}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              /{user.billingCycle === 'yearly' ? 'year (20% Off)' : 'month'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--status-live)' }}>
            <ShieldCheck size={14} />
            <span>Patron Status Active • 320k Lossless Enabled</span>
          </div>
        </div>

        {/* Preferences Summary */}
        <div style={{ marginBottom: '22px' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Tuned Sound Preferences
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest, idx) => (
                <span key={idx} className="genre-pill active" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  {interest}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>No interests selected yet.</span>
            )}
          </div>

          {user.listeningTime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              <Clock size={14} style={{ color: 'var(--accent-coral)' }} />
              <span>Preferred Listening Window: <strong>{user.listeningTime}</strong></span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            type="button"
            onClick={handleManagePreferences}
            className="btn btn-secondary btn-full"
            id="profile-manage-preferences"
          >
            <Sliders size={16} />
            <span>Retune Audio Preferences</span>
          </button>

          <button
            type="button"
            onClick={handleSignOut}
            className="btn btn-ghost btn-full"
            id="profile-sign-out"
            style={{ color: '#F87171' }}
          >
            <LogOut size={16} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </div>
    </div>
  );
};