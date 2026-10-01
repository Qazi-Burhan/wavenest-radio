import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radio,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateOnboardingPreferences } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests && user.interests.length > 0
      ? user.interests
      : ['Indie Music', 'Alternative']
  );
  const [favoriteContent, setFavoriteContent] = useState<string[]>(
    user?.favoriteContent && user.favoriteContent.length > 0
      ? user.favoriteContent
      : ['Live Radio']
  );
  const [listeningTime, setListeningTime] = useState<string>(
    user?.listeningTime || 'Late Night'
  );

  const musicGenres = [
    'Indie Music',
    'Alternative',
    'Hip-Hop',
    'Electronic',
    'Rock',
    'Culture',
    'Storytelling',
    'Interviews',
    'Local Artists'
  ];

  const contentFormats = [
    { title: 'Live Radio', desc: 'Continuous 24/7 stream hosted by live DJs and resident selectors' },
    { title: 'Curated Shows', desc: 'Thematic 60-90 minute curated deep-dives and track journeys' },
    { title: 'Podcasts', desc: 'Narrative audio essays, investigative journalism, and history' },
    { title: 'Artist Sessions', desc: 'Intimate studio rehearsals, acoustic live sets, and tape cuts' },
    { title: 'Interviews', desc: 'Unedited long-form conversations with underground musicians' }
  ];

  const timeOptions = [
    { id: 'Morning', label: 'Morning (6 AM – 12 PM)', desc: 'Energizing acoustics, ambient jazz, and waking frequencies' },
    { id: 'Afternoon', label: 'Afternoon (12 PM – 6 PM)', desc: 'Upbeat indie selections, lo-fi beats, and work focus' },
    { id: 'Evening', label: 'Evening (6 PM – 11 PM)', desc: 'Golden hour synth, eclectic residencies, and artist interviews' },
    { id: 'Late Night', label: 'Late Night (11 PM – 6 AM)', desc: 'Hypnotic downtempo, deep electronic textures, and ambient tape loops' }
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleContent = (title: string) => {
    setFavoriteContent((prev) =>
      prev.includes(title) ? prev.filter((c) => c !== title) : [...prev, title]
    );
  };

  const handleNext = () => {
    if (currentStep === 2 && selectedInterests.length === 0) {
      setSelectedInterests(['Indie Music']);
    }
    if (currentStep === 3 && favoriteContent.length === 0) {
      setFavoriteContent(['Live Radio']);
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleFinish = () => {
    updateOnboardingPreferences(selectedInterests, favoriteContent, listeningTime);
    navigate('/dashboard');
  };

  const stepNumber = Math.max(1, currentStep - 1);
  const totalWizardSteps = 4;
  const progressPercent = (stepNumber / totalWizardSteps) * 100;

  return (
    <div className="section-padding" style={{ paddingTop: '90px', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        {/* Onboarding Shell Card */}
        <div className="onboarding-card">
          {/* Top Brand & Step Tracker */}
          <div className="onboarding-top-bar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Radio size={18} style={{ color: 'var(--accent-coral)' }} />
              <span style={{ fontWeight: 800, letterSpacing: '0.08em', fontSize: '0.95rem' }}>WAVENEST</span>
            </div>

            {currentStep > 1 && currentStep < 5 && (
              <div className="step-indicator-pill">
                <span>0{stepNumber} — 0{totalWizardSteps}</span>
              </div>
            )}
          </div>

          {/* Progress Bar (Visible during questions) */}
          {currentStep > 1 && currentStep < 5 && (
            <div className="wizard-progress-bar">
              <div
                className="wizard-progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          )}

          {/* STEP 1: WELCOME INTRO */}
          {currentStep === 1 && (
            <div style={{ textAlign: 'center', padding: '16px 0 10px' }}>
              <div className="onboarding-hero-icon">
                <Sparkles size={36} style={{ color: 'var(--accent-coral)' }} />
              </div>

              <h1 className="onboarding-step-title">
                Welcome to Wavenest, {user?.name || 'Listener'}
              </h1>

              <p className="onboarding-step-desc">
                Let's tune your personal frequency in four brief steps. We'll curate resident shows, custom tracklists, and broadcast reminders matched to your exact taste.
              </p>

              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn btn-primary btn-lg"
                id="onboarding-start-btn"
                style={{ margin: '0 auto', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Personalize Experience</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* STEP 2: INTERESTS / GENRES (01 — 04) */}
          {currentStep === 2 && (
            <div>
              <span className="wizard-kicker">STEP 01 OF 04</span>
              <h2 className="onboarding-step-title">
                What do you want to hear more of?
              </h2>
              <p className="onboarding-step-sub" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Select Your Music & Audio Interests. Choose as many as you like—we adapt daily.
              </p>

              <div className="genre-pill-grid">
                {musicGenres.map((genre) => {
                  const isSelected = selectedInterests.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => toggleInterest(genre)}
                      className={`genre-select-pill ${isSelected ? 'selected' : ''}`}
                      id={`genre-opt-${genre.toLowerCase().replace(/\s+/g, '-')}`}
                      aria-pressed={isSelected}
                    >
                      <div className={`checkbox-dot ${isSelected ? 'active' : ''}`}>
                        {isSelected && <Check size={11} />}
                      </div>
                      <span>{genre}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: DISCOVERY FORMATS (02 — 04) */}
          {currentStep === 3 && (
            <div>
              <span className="wizard-kicker">STEP 02 OF 04</span>
              <h2 className="onboarding-step-title">
                How do you like to discover?
              </h2>
              <p className="onboarding-step-sub" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Favorite Content Formats. Choose how you like your audio delivered.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {contentFormats.map((opt) => {
                  const isSelected = favoriteContent.includes(opt.title);
                  return (
                    <div
                      key={opt.title}
                      onClick={() => toggleContent(opt.title)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          toggleContent(opt.title);
                        }
                      }}
                      className={`format-card-row ${isSelected ? 'selected' : ''}`}
                      id={`content-opt-${opt.title.toLowerCase().replace(/\s+/g, '-')}`}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={0}
                    >
                      <div>
                        <h3 className="format-title">{opt.title}</h3>
                        <p className="format-desc">{opt.desc}</p>
                      </div>
                      <div className={`format-check-circle ${isSelected ? 'active' : ''}`}>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: LISTENING WINDOW (03 — 04) */}
          {currentStep === 4 && (
            <div>
              <span className="wizard-kicker">STEP 03 OF 04</span>
              <h2 className="onboarding-step-title">
                When are you usually listening?
              </h2>
              <p className="onboarding-step-sub" style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                When do you usually listen? We'll tailor your dashboard to your prime listening window.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                {timeOptions.map((time) => {
                  const isSelected = listeningTime === time.id;
                  return (
                    <div
                      key={time.id}
                      onClick={() => setListeningTime(time.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setListeningTime(time.id);
                        }
                      }}
                      className={`format-card-row ${isSelected ? 'selected' : ''}`}
                      id={`time-pref-${time.id.toLowerCase().replace(/\s+/g, '-')}`}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                    >
                      <div>
                        <h3 className="format-title">{time.label}</h3>
                        <p className="format-desc">{time.desc}</p>
                      </div>
                      <div className={`format-check-circle ${isSelected ? 'active' : ''}`}>
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 5: COMPLETION / TUNED (04 — 04) */}
          {currentStep === 5 && (
            <div style={{ textAlign: 'center', padding: '16px 0 10px' }}>
              <div className="completion-check-icon">
                <CheckCircle2 size={42} style={{ color: 'var(--status-live)' }} />
              </div>

              <h1 className="onboarding-step-title">
                Your frequency is tuned.
              </h1>
              <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '6px' }}>
                You're all set.
              </p>
              <p className="onboarding-step-desc" style={{ maxWidth: '480px', margin: '0 auto 28px' }}>
                We've configured your personalized station hub with tailored show recommendations, live broadcast feeds, and lossless playback.
              </p>

              {/* Personalized Frequency Summary Box */}
              <div className="personalized-summary-card">
                <div className="summary-row">
                  <span className="summary-key">Membership Tier:</span>
                  <span className="summary-val" style={{ color: 'var(--accent-coral)' }}>
                    {user?.planId ? user.planId.toUpperCase() : 'CREATOR'}
                  </span>
                </div>
                <div className="summary-row">
                  <span className="summary-key">Listening Window:</span>
                  <span className="summary-val">{listeningTime}</span>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span className="summary-key" style={{ display: 'block', marginBottom: '8px' }}>Tuned Frequencies:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {selectedInterests.map((interest, i) => (
                      <span key={i} className="genre-pill active" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleFinish}
                className="btn btn-primary btn-lg"
                id="onboarding-finish-btn"
                style={{ minWidth: '220px', margin: '0 auto' }}
              >
                <span>Enter Wavenest</span>
                <ArrowRight size={18} />
              </button>
            </div>
          )}

          {/* Wizard Footer Controls (Steps 2 to 4) */}
          {currentStep > 1 && currentStep < 5 && (
            <div className="wizard-nav-footer">
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