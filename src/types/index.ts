export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: SubscriptionTier;
  credits: {
    video: number;
    music: number;
  };
  joinDate: string;
  isAdmin?: boolean;
}

export type SubscriptionTier = 'free' | 'pro' | 'premium';

export interface Content {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: number;
  type: 'video' | 'music';
  genre: string;
  createdBy?: string;
  isAIGenerated: boolean;
  url: string;
  views: number;
  likes: number;
  tags: string[];
  createdAt: string;
}

export interface AIGenerationRequest {
  id: string;
  type: 'video' | 'music';
  prompt: string;
  style: string;
  mood?: string;
  genre?: string;
  duration: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: Content;
  createdAt: string;
  estimatedCompletion?: string;
}

export interface SubscriptionPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  features: string[];
  limits: {
    videoGenerations: number;
    musicGenerations: number;
    maxDuration: number;
    priority: boolean;
  };
}