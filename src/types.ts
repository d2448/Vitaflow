export type UserRole = 'pregnant' | 'athlete' | 'both';

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  role: UserRole;
  pregnancyDueDate?: string; // ISO string
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  dietaryPreferences: string[];
  lastPeriodDate?: string;
}

export interface DiaryEntry {
  id: string;
  userId: string;
  date: string;
  weekOfPregnancy?: number;
  mood: string;
  symptoms: string[];
  notes: string;
  imageUrl?: string;
  weight?: number;
}

export interface Appointment {
  id: string;
  userId: string;
  date: string;
  title: string;
  description: string;
  location?: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  date: string;
  type: string;
  duration: number; // minutes
  intensity: 'low' | 'medium' | 'high';
  notes?: string;
}

export interface Recommendation {
  type: 'nutrition' | 'fitness';
  content: string;
  timestamp: string;
}
