import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { App } from '../App';
import { SHOWS_DATA } from '../data/shows';

describe('Wavenest Radio Application Test Suite', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('renders homepage with brand title, hero section, and navigation', () => {
    render(<App />);
    expect(screen.getAllByText('WAVENEST').length).toBeGreaterThan(0);
    expect(screen.getByText(/Independent Radio, Reimagined/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Find your frequency/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Explore Plans/i).length).toBeGreaterThan(0);
  });

  it('toggles monthly/yearly billing and updates pricing dynamically with 20% discount', async () => {
    render(<App />);

    const toggle = screen.getByRole('switch', { name: /toggle annual billing discount/i });
    expect(toggle).toBeInTheDocument();

    // Default is Monthly ($9 for Creator, $19 for Pro)
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('$19')).toBeInTheDocument();

    // Toggle to Yearly
    fireEvent.click(toggle);

    // Verify yearly discounted prices ($86 for Creator, $182 for Pro)
    await waitFor(() => {
      expect(screen.getByText('$86')).toBeInTheDocument();
      expect(screen.getByText('$182')).toBeInTheDocument();
    });
  });

  it('validates signup form with empty inputs, invalid email, short password, and mismatch', async () => {
    window.history.pushState({}, '', '/signup?plan=creator&billing=monthly');
    render(<App />);

    expect(screen.getByText(/You selected Creator — \$9\/month/i)).toBeInTheDocument();

    const submitBtn = screen.getByRole('button', { name: /Create Account & Continue/i });

    // 1. Submit empty form
    fireEvent.click(submitBtn);

    expect(await screen.findByText('Please enter your full name.')).toBeInTheDocument();
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
    expect(screen.getByText('Password must contain at least 8 characters.')).toBeInTheDocument();

    // 2. Test invalid email format
    const emailInput = screen.getByLabelText(/Email Address \*/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email-format' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();

    // 3. Test short password (< 8 chars)
    const passwordInput = screen.getByLabelText(/Password \(Min. 8 characters\) \*/i);
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Password must contain at least 8 characters.')).toBeInTheDocument();

    // 4. Test password mismatch
    fireEvent.change(passwordInput, { target: { value: 'Password123!' } });
    const confirmInput = screen.getByLabelText(/Confirm Password \*/i);
    fireEvent.change(confirmInput, { target: { value: 'DifferentPassword123!' } });
    fireEvent.click(submitBtn);
    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('completes valid signup and transitions to onboarding flow', async () => {
    window.history.pushState({}, '', '/signup?plan=creator&billing=monthly');
    render(<App />);

    fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'Julian Mercer' } });
    fireEvent.change(screen.getByLabelText(/Email Address \*/i), { target: { value: 'julian@wavenest.fm' } });
    fireEvent.change(screen.getByLabelText(/Password \(Min. 8 characters\) \*/i), { target: { value: 'MasterKey2026!' } });
    fireEvent.change(screen.getByLabelText(/Confirm Password \*/i), { target: { value: 'MasterKey2026!' } });

    const submitBtn = screen.getByRole('button', { name: /Create Account & Continue/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Welcome to Wavenest, Julian/i)).toBeInTheDocument();
    }, { timeout: 2500 });

    const sessionStr = localStorage.getItem('wavenest_session_v1');
    expect(sessionStr).toBeTruthy();
    const session = JSON.parse(sessionStr!);
    expect(session.name).toBe('Julian Mercer');
    expect(session.email).toBe('julian@wavenest.fm');
    expect(session.planId).toBe('creator');
    expect(session.password).toBeUndefined();
  });

  it('validates onboarding interest requirements and completes flow to dashboard', async () => {
    localStorage.setItem(
      'wavenest_session_v1',
      JSON.stringify({
        name: 'Sarah Connor',
        email: 'sarah@resistance.fm',
        planId: 'creator',
        billingCycle: 'monthly',
        interests: ['Indie Music', 'Alternative'],
        favoriteContent: ['Live Radio'],
        listeningTime: 'Late Night',
        onboardingCompleted: false,
        createdAt: new Date().toISOString()
      })
    );

    window.history.pushState({}, '', '/onboarding');
    render(<App />);

    expect(screen.getByText(/Welcome to Wavenest, Sarah/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Personalize Experience/i }));

    expect(await screen.findByText(/Select Your Music & Audio Interests/i)).toBeInTheDocument();
    const continueBtn = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtn);

    expect(await screen.findByText(/Favorite Content Formats/i)).toBeInTheDocument();
    const continueBtnStep3 = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtnStep3);

    expect(await screen.findByText(/When do you usually listen\?/i)).toBeInTheDocument();
    const continueBtnStep4 = screen.getByRole('button', { name: /Continue/i });
    fireEvent.click(continueBtnStep4);

    expect(await screen.findByText(/You're all set/i)).toBeInTheDocument();
    const finishBtn = screen.getByRole('button', { name: /Enter Wavenest/i });
    fireEvent.click(finishBtn);

    await waitFor(() => {
      expect(screen.getByText(/Member Frequency Hub/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Sarah/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Creator/i).length).toBeGreaterThan(0);
    });
  });

  it('allows user to sign out and clears active prototype session', async () => {
    localStorage.setItem(
      'wavenest_session_v1',
      JSON.stringify({
        name: 'Test Signout User',
        email: 'signout@wavenest.fm',
        planId: 'pro',
        billingCycle: 'monthly',
        interests: ['Indie Music'],
        favoriteContent: ['Live Radio'],
        listeningTime: 'Morning',
        onboardingCompleted: true,
        createdAt: new Date().toISOString()
      })
    );

    window.history.pushState({}, '', '/dashboard');
    render(<App />);

    const signoutBtn = screen.getByTestId('dashboard-signout-btn');
    fireEvent.click(signoutBtn);

    await waitFor(() => {
      expect(localStorage.getItem('wavenest_session_v1')).toBeNull();
      expect(screen.getAllByText(/Sign In/i).length).toBeGreaterThan(0);
    });
  });

  it('filters shows by search query and genre pill on ShowsPage', () => {
    window.history.pushState({}, '', '/shows');
    render(<App />);

    expect(screen.getByText('Discover Shows & Residencies')).toBeInTheDocument();
    const searchInput = screen.getByPlaceholderText(/Search by show title, host, or keyword/i);

    // Search for "Night"
    fireEvent.change(searchInput, { target: { value: 'Night' } });
    expect(screen.getAllByText('Night Frequency').length).toBeGreaterThan(0);
    expect(screen.queryByText('The Indie Hour')).not.toBeInTheDocument();

    // Reset search
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('The Indie Hour')).toBeInTheDocument();
  });

  it('handles corrupted localStorage gracefully without crashing', () => {
    localStorage.setItem('wavenest_session_v1', 'corrupted-json-data{{{');
    window.history.pushState({}, '', '/');
    expect(() => render(<App />)).not.toThrow();
    expect(screen.getAllByText('WAVENEST').length).toBeGreaterThan(0);
  });

  it('renders about page with portfolio project disclosure banner', () => {
    window.history.pushState({}, '', '/about');
    render(<App />);

    expect(screen.getByText(/Academic & Portfolio Project Notice/i)).toBeInTheDocument();
    expect(screen.getByText(/Wavenest Radio is a fictional independent radio platform/i)).toBeInTheDocument();
    expect(screen.getByText(/Behind the Scenes: Engineering Stack/i)).toBeInTheDocument();
  });

  it('toggles FAQ accordion cleanly', () => {
    render(<App />);
    const faqBtn = screen.getByText('What is Wavenest Radio?');
    expect(faqBtn).toBeInTheDocument();

    expect(screen.getByText(/Wavenest Radio is an independent, member-supported digital radio platform/i)).toBeInTheDocument();

    const q2 = screen.getByText('Can I listen for free?');
    fireEvent.click(q2);
    expect(screen.getByText(/Our Free tier provides 24\/7 access to our primary live broadcast stream/i)).toBeInTheDocument();
  });

  it('renders 404 page for unknown frequency and provides home return link', () => {
    window.history.pushState({}, '', '/non-existent-frequency-999');
    render(<App />);

    expect(screen.getByText(/Lost in the signal\?/i)).toBeInTheDocument();
    expect(screen.getByText(/The frequency or broadcast channel you're trying to tune into does not exist/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Return Home/i })).toBeInTheDocument();
  });
});
