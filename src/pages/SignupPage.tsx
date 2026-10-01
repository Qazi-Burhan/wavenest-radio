import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Radio, Check, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PRICING_PLANS } from '../data/pricing';
import type { PlanId, BillingCycle } from '../types';

export const SignupPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { registerUser } = useAuth();

  const rawPlan = searchParams.get('plan') as PlanId | null;
  const rawBilling = searchParams.get('billing') as BillingCycle | null;

  const validPlan: PlanId = rawPlan && ['free', 'creator', 'pro'].includes(rawPlan) ? rawPlan : 'creator';
  const validBilling: BillingCycle = rawBilling === 'yearly' ? 'yearly' : 'monthly';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('United States');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const activePlan = PRICING_PLANS.find((p) => p.id === validPlan) || PRICING_PLANS[1];
  const displayPrice = validBilling === 'yearly' ? activePlan.yearlyPrice : activePlan.monthlyPrice;
  const periodLabel = validBilling === 'yearly' ? '/year' : '/month';

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { level: 0, text: 'Empty', color: 'var(--text-muted)' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { level: 1, text: 'Weak', color: '#EF4444' };
    if (score <= 2) return { level: 2, text: 'Fair', color: '#F59E0B' };
    return { level: 3, text: 'Strong', color: '#10B981' };
  };

  const passwordStrength = getPasswordStrength(password);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 8) {
      errs.password = 'Password must contain at least 8 characters.';
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }
    if (!termsAccepted) {
      errs.terms = 'Please accept the listener agreement.';
    }
    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate();
    setErrors(errs);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true
    });

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true);

      registerUser({
        name: fullName,
        email,
        country,
        dateOfBirth,
        planId: validPlan,
        billingCycle: validBilling
      });

      setIsSuccess(true);

      setTimeout(() => {
        navigate('/onboarding');
      }, 400);
    }
  };

  return (
    <div className="section-padding" style={{ paddingTop: '100px', minHeight: '90vh' }}>
      <div className="container">
        {isSuccess ? (
          /* Polished Success Transition State */
          <div className="signup-success-container">
            <div className="signup-success-card">
              <div className="success-pulse-icon">
                <Sparkles size={36} style={{ color: 'var(--accent-coral)' }} />
              </div>
              <h2 className="success-title">You're in.</h2>
              <p className="success-subtitle">
                Welcome to Wavenest, <strong>{fullName}</strong>. Let's tune your listening experience...
              </p>
              <div className="success-progress-loader">
                <div className="success-loader-fill"></div>
              </div>
            </div>
          </div>
        ) : (
          /* Editorial Split Grid: Left Brand Story + Right Form */
          <div className="signup-split-grid">
            {/* Left Column: Brand Storytelling & Plan Card */}
            <div className="signup-story-col">
              <div className="eyebrow-chip" style={{ marginBottom: '16px' }}>
                <span className="live-pulse-dot" style={{ width: '5px', height: '5px' }}></span>
                <span>MEMBER REGISTRATION</span>
              </div>

              <h1 className="signup-story-headline">
                Your next favorite voice is already broadcasting.
              </h1>

              <p className="signup-story-desc">
                Join our independent transmission collective. Support resident audio creators, listen ad-free in studio fidelity, and tune into human-curated radio.
              </p>

              {/* Selected Plan Summary Card */}
              <div className="signup-plan-summary-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span className="summary-card-kicker">SELECTED MEMBERSHIP</span>
                    <h3 className="summary-card-title">{activePlan.name} Tier</h3>
                  </div>
                  <div className="summary-card-price">
                    <span className="price-num">${displayPrice}</span>
                    <span className="price-sub">{periodLabel}</span>
                  </div>
                </div>

                <p className="summary-selected-text">
                  You selected {activePlan.name} — ${displayPrice}{periodLabel}
                </p>

                <ul className="summary-perks-list">
                  {activePlan.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="summary-perk-row">
                      <Check size={14} style={{ color: 'var(--accent-coral)', flexShrink: 0 }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/pricing"
                  className="summary-change-link"
                >
                  Change membership tier →
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="signup-trust-strip">
                <div className="trust-item">
                  <ShieldCheck size={18} style={{ color: 'var(--status-live)' }} />
                  <span>14-day refund guarantee</span>
                </div>
                <div className="trust-item">
                  <Radio size={18} style={{ color: 'var(--accent-coral)' }} />
                  <span>No credit card required for Free tier</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signup Form */}
            <div className="signup-form-col">
              <div className="signup-form-card">
                <div className="form-card-header">
                  <h2 className="form-card-title">Create your listener account</h2>
                  <p className="form-card-desc">Quick setup. No passwords stored in clear text.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="signup-fullname" className="form-label">
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="signup-fullname"
                      type="text"
                      placeholder="e.g. Julian Mercer"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      onBlur={() => handleBlur('fullName')}
                      className={`form-input ${touched.fullName && errors.fullName ? 'input-error' : ''}`}
                      autoComplete="name"
                      aria-invalid={Boolean(touched.fullName && errors.fullName)}
                      aria-describedby={touched.fullName && errors.fullName ? 'error-signup-fullname' : undefined}
                    />
                    {touched.fullName && errors.fullName && (
                      <div className="form-error-msg" id="error-signup-fullname" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.fullName}</span>
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
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? 'error-signup-email' : undefined}
                    />
                    {touched.email && errors.email && (
                      <div className="form-error-msg" id="error-signup-email" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label htmlFor="signup-password" className="form-label" style={{ marginBottom: 0 }}>
                        <span>Password (Min. 8 characters) *</span>
                      </label>
                      {password.length > 0 && (
                        <span id="signup-password-strength" role="status" aria-live="polite" style={{ fontSize: '0.75rem', fontWeight: 600, color: passwordStrength.color }}>
                          Strength: {passwordStrength.text}
                        </span>
                      )}
                    </div>
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
                        aria-invalid={Boolean(touched.password && errors.password)}
                        aria-describedby={touched.password && errors.password ? 'error-signup-password' : undefined}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0 }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {/* Password Strength Meter Bars */}
                    {password.length > 0 && (
                      <div
                        className="password-meter-wrap"
                        role="progressbar"
                        aria-label="Password strength"
                        aria-valuemin={0}
                        aria-valuemax={3}
                        aria-valuenow={passwordStrength.level}
                      >
                        <div className={`meter-seg ${passwordStrength.level >= 1 ? 'active-weak' : ''}`}></div>
                        <div className={`meter-seg ${passwordStrength.level >= 2 ? 'active-fair' : ''}`}></div>
                        <div className={`meter-seg ${passwordStrength.level >= 3 ? 'active-strong' : ''}`}></div>
                      </div>
                    )}

                    {touched.password && errors.password && (
                      <div className="form-error-msg" id="error-signup-password" role="alert">
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
                      aria-invalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      aria-describedby={touched.confirmPassword && errors.confirmPassword ? 'error-signup-confirm-password' : undefined}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="form-error-msg" id="error-signup-confirm-password" role="alert">
                        <AlertCircle size={14} />
                        <span>{errors.confirmPassword}</span>
                      </div>
                    )}
                  </div>

                  {/* Optional Country & DOB */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
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

                  {/* Agreement Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', margin: '14px 0 22px' }}>
                    <input
                      type="checkbox"
                      id="signup-terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      style={{ marginTop: '3px', accentColor: 'var(--accent-coral)', width: '16px', height: '16px', cursor: 'pointer' }}
                    />
                    <label htmlFor="signup-terms" style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', cursor: 'pointer', lineHeight: 1.5 }}>
                      I agree to the member terms. Simulation site for internship evaluation—no real credit cards are processed.
                    </label>
                  </div>
                  {touched.terms && errors.terms && (
                    <div className="form-error-msg" role="alert" style={{ marginBottom: '14px' }}>
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
                      <span>Tuning Frequency...</span>
                    ) : (
                      <>
                        <span>Create Account & Continue</span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>

                <div className="form-card-footer">
                  <p>
                    Already have a frequency profile?{' '}
                    <Link to="/dashboard" style={{ color: 'var(--accent-coral)', fontWeight: 600 }}>
                      Open Dashboard
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};