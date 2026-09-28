import React, { createContext, useContext, useState } from 'react';
import type { PlanId, BillingCycle, UserSession } from '../types';

const STORAGE_KEY = 'wavenest_session_v1';
const PLAN_KEY = 'wavenest_selected_plan_v1';

interface AuthContextType {
  user: UserSession | null;
  selectedPlan: PlanId;
  billingCycle: BillingCycle;
  setSelectedPlan: (plan: PlanId) => void;
  setBillingCycle: (cycle: BillingCycle) => void;
  registerUser: (data: {
    name: string;
    email: string;
    country?: string;
    dateOfBirth?: string;
    planId: PlanId;
    billingCycle: BillingCycle;
  }) => void;
  updateOnboardingPreferences: (
    interests: string[],
    favoriteContent: string[],
    listeningTime: string
  ) => void;
  updateUserProfile: (updates: Partial<UserSession>) => void;
  signOut: () => void;
  demoSignIn: (presetPlan?: PlanId) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlanState] = useState<PlanId>(() => {
    try {
      const saved = localStorage.getItem(PLAN_KEY);
      if (saved && ['free', 'creator', 'pro'].includes(saved)) {
        return saved as PlanId;
      }
    } catch {
      // fallback
    }
    return 'creator';
  });

  const [billingCycle, setBillingCycleState] = useState<BillingCycle>('monthly');

  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.name === 'string' && typeof parsed.email === 'string') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse user session from localStorage', e);
    }
    return null;
  });

  const setSelectedPlan = (plan: PlanId) => {
    setSelectedPlanState(plan);
    try {
      localStorage.setItem(PLAN_KEY, plan);
    } catch {
      // storage unavailable
    }
  };

  const setBillingCycle = (cycle: BillingCycle) => {
    setBillingCycleState(cycle);
  };

  const registerUser = (data: {
    name: string;
    email: string;
    country?: string;
    dateOfBirth?: string;
    planId: PlanId;
    billingCycle: BillingCycle;
  }) => {
    const newUser: UserSession = {
      name: data.name.trim(),
      email: data.email.trim(),
      country: data.country || 'United States',
      dateOfBirth: data.dateOfBirth || '',
      planId: data.planId,
      billingCycle: data.billingCycle,
      interests: [],
      favoriteContent: [],
      listeningTime: '',
      onboardingCompleted: false,
      createdAt: new Date().toISOString()
    };

    setUser(newUser);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  const updateOnboardingPreferences = (
    interests: string[],
    favoriteContent: string[],
    listeningTime: string
  ) => {
    if (!user) return;
    const updated: UserSession = {
      ...user,
      interests,
      favoriteContent,
      listeningTime,
      onboardingCompleted: true
    };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  const updateUserProfile = (updates: Partial<UserSession>) => {
    if (!user) return;
    const updated: UserSession = { ...user, ...updates };
    setUser(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Storage write error', e);
    }
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error('Storage clear error', e);
    }
  };

  const demoSignIn = (presetPlan: PlanId = 'creator') => {
    const demoUser: UserSession = {
      name: 'Elena Rostova',
      email: 'elena@soundcollective.fm',
      country: 'United States',
      dateOfBirth: '1996-04-12',
      planId: presetPlan,
      billingCycle: 'monthly',
      interests: ['Indie Music', 'Podcasts', 'Electronic', 'Storytelling'],
      favoriteContent: ['Live Radio', 'Artist Sessions', 'Music Discovery'],
      listeningTime: 'Late Night',
      onboardingCompleted: true,
      createdAt: new Date().toISOString()
    };
    setUser(demoUser);
    setSelectedPlanState(presetPlan);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
      localStorage.setItem(PLAN_KEY, presetPlan);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        selectedPlan,
        billingCycle,
        setSelectedPlan,
        setBillingCycle,
        registerUser,
        updateOnboardingPreferences,
        updateUserProfile,
        signOut,
        demoSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
