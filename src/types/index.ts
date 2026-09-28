export type PlanId = 'free' | 'creator' | 'pro';
export type BillingCycle = 'monthly' | 'yearly';

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  badge?: string;
  features: string[];
  ctaText: string;
}

export interface Show {
  id: string;
  title: string;
  category: string;
  host: string;
  duration: string;
  description: string;
  scheduleTime: string;
  genre: string;
  isLive?: boolean;
  audioFrequency?: number[];
  tonePitch?: number; // Pitch in Hz for procedural synth preview
}

export interface UserSession {
  name: string;
  email: string;
  country?: string;
  dateOfBirth?: string;
  planId: PlanId;
  billingCycle: BillingCycle;
  interests: string[];
  favoriteContent: string[];
  listeningTime: string;
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface AudioTrackState {
  show: Show | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  progress: number; // 0 to 100
  currentTime: number; // seconds
  duration: number; // seconds
  isLiveStream: boolean;
}
