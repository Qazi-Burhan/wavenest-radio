import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/pricing';
import type { PlanId, BillingCycle } from '../types';

export const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { selectedPlan, setSelectedPlan, billingCycle, setBillingCycle, registerUser } = useAuth();

  // Read URL params or fallback to context
  useEffect(() => {
    const planParam = searchParams.get('plan') as PlanId | null;
    const billingParam = searchParams.get('billing') as BillingCycle | null;

    if (planParam && ['free', 'creator', 'pro'].includes(planParam)) {
      setSelectedPlan(planParam);
    }
    if (billingParam && ['monthly', 'yearly'].includes(billingParam)) {
      setBillingCycle(billingParam);
    }
  }, [searchParams, setSelectedPlan, setBillingCycle]);

  // Form Fields State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(true);

  // Inline Validation Errors
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Current selected plan details
  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlan) || PRICING_PLANS[1];
  const currentPrice = billingCycle === 'yearly' ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;
  const currentRateDisplay = currentPlan.id === 'free' ? '$0/month' : billingCycle === 'yearly' ? `$${currentPrice}/year` : `$${currentPrice}/month`;

  // Validation Logic
  const validate = () => {
    const errs: typeof errors = {};

    // 1. Name validation
    if (!name.trim()) {
      errs.name = 'Please enter your full name.';
    } else if (name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Please enter a valid email address.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    // 3. Password validation
    if (!password) {
      errs.password = 'Password must contain at least 8 characters.';
    } else if (password.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }

    // 4. Confirm password validation
    if (!confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    } else if (confirmPassword !== password) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    // 5. Terms check
    if (!termsAccepted) {
      errs.terms = 'Please accept the prototype terms to continue.';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate();
    setErrors(validationErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true
    });

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      setTimeout(() => {
        registerUser({
          name,
          email,
          country,
          dateOfBirth,
          planId: selectedPlan,
          billingCycle
        });
        setIsSubmitting(false);
        navigate('/onboarding');
      }, 700);
    }
  };

  return (
    <div style={{ padding: '48px 0 96px' }}>
      <div className="container" style={{ maxWidth: '640px' }}>
        {/* Selected Plan Summary Banner (Required: Section 14) */}
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, #182035 0%, #111726 100%)',
            border: '1px solid var(--border-accent)',
            padding: '20px 24px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
          id="selected-plan-banner"
        >
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.06em' }}>
              Selected Membership
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-primary)' }}>
              You selected {currentPlan.name} — {currentRateDisplay}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {billingCycle === 'yearly' ? 'Annual billing (Includes 20% discount)' : 'Monthly flexible billing'}
            </p>
          </div>

          <Link
            to="/pricing"
            className="btn btn-secondary btn-sm"
            id="change-plan-link"
            style={{ fontSize: '0.8rem' }}
          >
            Change Plan
          </Link>
        </div>

        {/* Signup Card */}
        <div className="card" style={{ padding: '36px', background: '#0e1322' }}>
          <div style={{ textAlign: 'left', marginBottom: '28px' }}>
            <h1 style={{ fontSize: '2rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Create your listener account
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
              Unlock your frequency. Customize your feed and start streaming uninterrupted independent audio.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate id="signup-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="signup-name" className="form-label">
                <span>Full Name *</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Julian Mercer"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: undefined });
                  }}
                  onBlur={() => handleBlur('name')}
                  className={`form-input ${touched.name && errors.name ? 'input-error' : ''}`}
                  autoComplete="name"
                />
              </div>
              {touched.name && errors.name && (
                <div className="form-error-msg" id="error-signup-name">
                  <AlertCircle size={14} />
                  <span>{errors.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="signup-email" className="form-label">
                <span>Email Address *</span>
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                onBlur={() => handleBlur('email')}
                className={`form-input ${touched.email && errors.email ? 'input-error' : ''}`}
                autoComplete="email"
              />
              {touched.email && errors.email && (
                <div className="form-error-msg" id="error-signup-email">
                  <AlertCircle size={14} />
                  <span>{errors.email}</span>
                </div>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="signup-password" className="form-label">
                <span>Password (Min. 8 characters) *</span>
                {password.length > 0 && (
                  <span style={{ fontSize: '0.75rem', color: password.length >= 8 ? 'var(--status-success)' : 'var(--text-muted)' }}>
                    {password.length >= 8 ? '✓ Length OK' : `${password.length}/8 chars`}
                  </span>
                )}
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors({ ...errors, password: undefined });
                  }}
                  onBlur={() => handleBlur('password')}
                  className={`form-input ${touched.password && errors.password ? 'input-error' : ''}`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="form-error-msg" id="error-signup-password">
                  <AlertCircle size={14} />
                  <span>{errors.password}</span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="signup-confirm-password" className="form-label">
                <span>Confirm Password *</span>
              </label>
              <input
                id="signup-confirm-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                }}
                onBlur={() => handleBlur('confirmPassword')}
                className={`form-input ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
                autoComplete="new-password"
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="form-error-msg" id="error-signup-confirm-password">
                  <AlertCircle size={14} />
                  <span>{errors.confirmPassword}</span>
                </div>
              )}
            </div>

            {/* Optional Fields: Country and Date of Birth */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="signup-country" className="form-label">
                  <span>Country (Optional)</span>
                </label>
                <select
                  id="signup-country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-select"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Brazil">Brazil</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="signup-dob" className="form-label">
                  <span>Birth Date (Optional)</span>
                </label>
                <input
                  id="signup-dob"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', margin: '16px 0 24px', textAlign: 'left' }}>
              <input
                type="checkbox"
                id="signup-terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                style={{ marginTop: '4px', accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
              />
              <label htmlFor="signup-terms" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                I agree to the prototype listener terms and understand this is an internship simulation site. No credit card will be charged.
              </label>
            </div>
            {touched.terms && errors.terms && (
              <div className="form-error-msg" style={{ marginBottom: '16px' }}>
                <AlertCircle size={14} />
                <span>{errors.terms}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-lg btn-full"
              id="signup-submit-btn"
            >
              {isSubmitting ? (
                <span>Configuring Account Frequency...</span>
              ) : (
                <>
                  <span>Create Account & Continue</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Prototype Security Disclaimer */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              🔒 Prototype Notice: Authentication and payment processing are simulated for this Week 3 individual project. Real passwords are not stored in localStorage.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
