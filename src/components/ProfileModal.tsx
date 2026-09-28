import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, LogOut, Sliders } from 'lucide-react';
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, #3B82F6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFF',
                fontSize: '1.2rem',
                fontWeight: 700
              }}
            >
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 id="profile-title" style={{ fontSize: '1.15rem', fontWeight: 700 }}>{user.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{ color: 'var(--text-secondary)', padding: '6px', borderRadius: 'var(--radius-sm)' }}
            aria-label="Close Profile Modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Status Card */}
        <div style={{ background: '#090d18', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active Membership</span>
            <span className={`badge ${user.planId === 'pro' ? 'badge-teal' : 'badge-purple'}`}>
              {user.planId.toUpperCase()} PLAN
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {user.planId === 'free' ? '$0' : user.planId === 'creator' ? (user.billingCycle === 'yearly' ? '$86' : '$9') : (user.billingCycle === 'yearly' ? '$182' : '$19')}
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              /{user.billingCycle === 'yearly' ? 'year (Save 20%)' : 'month'}
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
            Prototype session status: Verified & active in localStorage.
          </p>
        </div>

        {/* Preferences Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '10px' }}>
            Personalized Frequencies
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {user.interests && user.interests.length > 0 ? (
              user.interests.map((interest, idx) => (
                <span key={idx} className="badge badge-purple" style={{ fontSize: '0.75rem', textTransform: 'none' }}>
                  {interest}
                </span>
              ))
            ) : (
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No interests selected yet.</span>
            )}
          </div>
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
            <span>Manage Preferences & Taste Profile</span>
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
