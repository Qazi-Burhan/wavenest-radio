import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Radio,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateOnboardingPreferences } = useAuth();

  const userName = user?.name ? user.name.split(' ')[0] : 'Listener';

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => user?.interests || ['Indie Music', 'Alternative']);
  const [selectedContent, setSelectedContent] = useState<string[]>(() => user?.favoriteContent || ['Live Radio', 'Music Discovery']);
  const [listeningTime, setListeningTime] = useState<string>(() => user?.listeningTime || 'Late Night');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const interestOptions = [
    'Indie Music',
    'Podcasts',
    'Interviews',
    'Alternative',
    'Electronic',
    'Hip-Hop',
    'Rock',
    'Local Artists',
    'Culture',
    'Storytelling'
  ];

  const contentOptions = [
    { title: 'Live Radio', desc: 'Real-time 24/7 continuous station broadcasts' },
    { title: 'Podcasts', desc: 'In-depth narrative storytelling & weekly episodes' },
    { title: 'Interviews', desc: 'Unedited studio talks with underground creators' },
    { title: 'Music Discovery', desc: 'Curated deep cuts, vinyl digs & DIY demos' },
    { title: 'Artist Sessions', desc: 'Acoustic live takes & studio jam recordings' }
  ];

  const timeOptions = [
    { id: 'Morning', label: 'Morning (6 AM – 12 PM)', desc: 'Upbeat melodies & dawn acoustic rhythms' },
    { id: 'Afternoon', label: 'Afternoon (12 PM – 6 PM)', desc: 'Focus soundscapes & workday indie' },
    { id: 'Evening', label: 'Evening (6 PM – 10 PM)', desc: 'Prime shows, interviews & live sets' },
    { id: 'Late Night', label: 'Late Night (10 PM – 4 AM)', desc: 'Downtempo ambient, synth & deep vinyl' }
  ];

  useEffect(() => {
    if (currentStep === 5) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7C5CFC', '#2DD4BF', '#F8FAFC']
      });
    }
  }, [currentStep]);

  const toggleInterest = (tag: string) => {
    setErrorMsg('');
    setSelectedInterests((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleContent = (title: string) => {
    setSelectedContent((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  const handleNext = () => {
    if (currentStep === 2) {
      if (selectedInterests.length === 0) {
        setErrorMsg('Please select at least one interest to personalize your frequency.');
        return;
      }
    }

    if (currentStep < totalSteps) {
      setErrorMsg('');
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setErrorMsg('');
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    updateOnboardingPreferences(selectedInterests, selectedContent, listeningTime);
    navigate('/dashboard');
  };

  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div style={{ padding: '48px 0 96px', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        {/* Onboarding Wizard Card */}
        <div className="card" style={{ padding: '40px 36px', background: '#0e1322' }}>
          {/* Header & Step Indicator */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Onboarding Setup
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }} id="onboarding-step-indicator">
                Step {currentStep} of {totalSteps}
              </span>
            </div>

            {/* Progress Bar */}
            <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${progressPercentage}%`,
                  background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }}
                id="onboarding-progress-bar"
              ></div>
            </div>
          </div>

          {/* STEP 1: WELCOME */}
          {currentStep === 1 && (
            <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  background: 'rgba(124, 92, 252, 0.15)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#A78BFA',
                  margin: '0 auto 24px'
                }}
              >
                <Radio size={36} />
              </div>

              <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                Welcome to Wavenest, {userName}.
              </h1>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '520px', margin: '0 auto 32px' }}>
                We're excited to have you on our frequency. Take 60 seconds to personalize your listening feed so we can tailor curated broadcasts and resident show drops to your exact taste.
              </p>

              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-lg"
                id="onboarding-step1-continue"
                style={{ minWidth: '220px' }}
              >
                <span>Personalize Experience</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: INTERESTS (REQUIRED: MIN 1 SELECTION) */}
          {currentStep === 2 && (
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '8px' }}>Select Your Music & Audio Interests</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Pick tags that match your sonic palette. Choose as many as you like (minimum 1 required).
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                {interestOptions.map((tag) => {
                  const isSelected = selectedInterests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleInterest(tag)}
                      className="btn"
                      style={{
                        background: isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-secondary)',
                        border: '1px solid ' + (isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'),
                        borderRadius: 'var(--radius-full)',
                        padding: '10px 18px',
                        fontSize: '0.925rem'
                      }}
                      id={`interest-tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {isSelected && <Check size={14} style={{ marginRight: '4px' }} />}
                      <span>{tag}</span>
                    </button>
                  );
                })}
              </div>

              {errorMsg && (
                <div className="form-error-msg" style={{ marginBottom: '20px' }} id="onboarding-step2-error">
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: FAVORITE CONTENT */}
          {currentStep === 3 && (
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '8px' }}>Favorite Content Formats</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                How do you prefer to experience independent radio? Select your preferred mediums.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {contentOptions.map((opt) => {
                  const isSelected = selectedContent.includes(opt.title);
                  return (
                    <div
                      key={opt.title}
                      onClick={() => toggleContent(opt.title)}
                      className="card"
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(124, 92, 252, 0.12)' : '#0a0f1c',
                        borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 'var(--radius-md)'
                      }}
                      id={`content-opt-${opt.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{opt.title}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{opt.desc}</p>
                      </div>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '2px solid ' + (isSelected ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.2)'),
                          background: isSelected ? 'var(--accent-primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF'
                        }}
                      >
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: LISTENING PREFERENCE TIME */}
          {currentStep === 4 && (
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '1.85rem', marginBottom: '8px' }}>When do you usually listen?</h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                We'll prioritize recommendations matching your prime listening hours.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
                {timeOptions.map((time) => {
                  const isSelected = listeningTime === time.id;
                  return (
                    <div
                      key={time.id}
                      onClick={() => setListeningTime(time.id)}
                      className="card"
                      style={{
                        padding: '16px 20px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(45, 212, 191, 0.12)' : '#0a0f1c',
                        borderColor: isSelected ? 'var(--accent-secondary)' : 'var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 'var(--radius-md)'
                      }}
                      id={`time-pref-${time.id.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div>
                        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{time.label}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{time.desc}</p>
                      </div>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: '2px solid ' + (isSelected ? 'var(--accent-secondary)' : 'rgba(255, 255, 255, 0.2)'),
                          background: isSelected ? 'var(--accent-secondary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#080B12'
                        }}
                      >
                        {isSelected && <Check size={14} style={{ strokeWidth: 3 }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION & CELEBRATION */}
          {currentStep === 5 && (
            <div style={{ textAlign: 'center', padding: '16px 0 20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'rgba(45, 212, 191, 0.15)',
                  border: '2px solid var(--accent-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-secondary)',
                  margin: '0 auto 24px'
                }}
              >
                <CheckCircle2 size={44} />
              </div>

              <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', letterSpacing: '-0.02em' }}>
                You're all set.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>
                Your Wavenest experience is ready.
              </p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 28px' }}>
                We've tuned your personal dashboard with recommended shows, upcoming broadcast slots, and ad-free playback controls.
              </p>

              <div
                style={{
                  background: '#090d18',
                  padding: '16px 20px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  maxWidth: '460px',
                  margin: '0 auto 32px',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Preferences Configured:</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-secondary)', fontWeight: 600 }}>{listeningTime}</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {selectedInterests.map((interest, i) => (
                    <span key={i} className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="btn btn-teal btn-lg"
                id="onboarding-finish-btn"
                style={{ minWidth: '220px' }}
              >
                <span>Enter Wavenest</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Wizard Footer Controls (Steps 2 to 4) */}
          {currentStep > 1 && currentStep < 5 && (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--border-subtle)' }}>
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary btn-sm"
                id="onboarding-back-btn"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-sm"
                id="onboarding-continue-btn"
              >
                <span>Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
