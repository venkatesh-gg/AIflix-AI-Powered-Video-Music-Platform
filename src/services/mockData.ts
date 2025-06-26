import { Content, AIGenerationRequest, SubscriptionPlan } from '../types';

export const mockContent: Content[] = [
  {
    id: '1',
    title: 'Neon Dreams',
    description: 'A cyberpunk short film exploring the future of AI consciousness',
    thumbnail: 'https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 1800,
    type: 'video',
    genre: 'Sci-Fi',
    isAIGenerated: true,
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    views: 15420,
    likes: 1250,
    tags: ['cyberpunk', 'ai', 'futuristic'],
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Midnight Jazz',
    description: 'Smooth jazz composition perfect for late-night relaxation',
    thumbnail: 'https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 240,
    type: 'music',
    genre: 'Jazz',
    isAIGenerated: true,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    views: 8750,
    likes: 632,
    tags: ['jazz', 'relaxing', 'midnight'],
    createdAt: '2024-01-12',
  },
  {
    id: '3',
    title: 'Epic Adventure',
    description: 'High-energy orchestral piece for adventure scenes',
    thumbnail: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 180,
    type: 'music',
    genre: 'Orchestral',
    isAIGenerated: true,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    views: 12300,
    likes: 890,
    tags: ['orchestral', 'epic', 'adventure'],
    createdAt: '2024-01-10',
  },
  {
    id: '4',
    title: 'Nature\'s Symphony',
    description: 'A beautiful documentary about wildlife and nature',
    thumbnail: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 2700,
    type: 'video',
    genre: 'Documentary',
    isAIGenerated: false,
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    views: 25600,
    likes: 2100,
    tags: ['nature', 'wildlife', 'documentary'],
    createdAt: '2024-01-08',
  },
  {
    id: '5',
    title: 'Electronic Pulse',
    description: 'High-energy electronic dance music with futuristic vibes',
    thumbnail: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 200,
    type: 'music',
    genre: 'Electronic',
    isAIGenerated: true,
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    views: 18900,
    likes: 1420,
    tags: ['electronic', 'dance', 'futuristic'],
    createdAt: '2024-01-05',
  },
  {
    id: '6',
    title: 'Mystical Forest',
    description: 'A fantasy short film set in an enchanted forest',
    thumbnail: 'https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=800',
    duration: 1200,
    type: 'video',
    genre: 'Fantasy',
    isAIGenerated: true,
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
    views: 9800,
    likes: 750,
    tags: ['fantasy', 'forest', 'mystical'],
    createdAt: '2024-01-03',
  }
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      '2 video generations per month',
      '5 music generations per month',
      'Max 30 seconds duration',
      'Standard quality',
      'Community support'
    ],
    limits: {
      videoGenerations: 2,
      musicGenerations: 5,
      maxDuration: 30,
      priority: false
    }
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 19.99,
    features: [
      '20 video generations per month',
      '50 music generations per month',
      'Max 5 minutes duration',
      'HD quality',
      'Priority processing',
      'Advanced AI models',
      'Email support'
    ],
    limits: {
      videoGenerations: 20,
      musicGenerations: 50,
      maxDuration: 300,
      priority: true
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.99,
    features: [
      'Unlimited video generations',
      'Unlimited music generations',
      'Max 20 minutes duration',
      '4K quality',
      'Highest priority processing',
      'Latest AI models',
      'Custom model training',
      'Dedicated support',
      'Commercial license'
    ],
    limits: {
      videoGenerations: -1,
      musicGenerations: -1,
      maxDuration: 1200,
      priority: true
    }
  }
];

export function generateMockAIRequest(type: 'video' | 'music', prompt: string, style: string): AIGenerationRequest {
  return {
    id: Date.now().toString(),
    type,
    prompt,
    style,
    status: 'pending',
    progress: 0,
    createdAt: new Date().toISOString(),
    estimatedCompletion: new Date(Date.now() + 120000).toISOString(), // 2 minutes from now
    duration: type === 'video' ? 60 : 30
  };
}