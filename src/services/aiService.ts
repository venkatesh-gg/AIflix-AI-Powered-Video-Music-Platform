import { AIGenerationRequest, Content } from '../types';
import { mockContent } from './mockData';

class AIService {
  private activeRequests = new Map<string, AIGenerationRequest>();

  async generateContent(request: AIGenerationRequest): Promise<string> {
    this.activeRequests.set(request.id, request);
    
    // Simulate AI processing with progress updates
    this.simulateProcessing(request);
    
    return request.id;
  }

  private async simulateProcessing(request: AIGenerationRequest) {
    const totalSteps = 10;
    const stepDuration = 2000; // 2 seconds per step
    
    for (let i = 0; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      
      const progress = (i / totalSteps) * 100;
      const updatedRequest = {
        ...request,
        progress,
        status: i === totalSteps ? 'completed' as const : 'processing' as const
      };

      if (i === totalSteps) {
        // Generate mock result
        const result: Content = {
          id: Date.now().toString(),
          title: `Generated ${request.type}: ${request.prompt.slice(0, 30)}...`,
          description: `AI-generated ${request.type} based on: "${request.prompt}" with ${request.style} style`,
          thumbnail: request.type === 'video' 
            ? 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800'
            : 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
          duration: request.duration,
          type: request.type,
          genre: request.style,
          isAIGenerated: true,
          url: request.type === 'video' 
            ? 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
            : 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          views: 0,
          likes: 0,
          tags: [request.style.toLowerCase(), 'ai-generated'],
          createdAt: new Date().toISOString().split('T')[0],
        };
        
        updatedRequest.result = result;
      }

      this.activeRequests.set(request.id, updatedRequest);
    }
  }

  getRequestStatus(requestId: string): AIGenerationRequest | undefined {
    return this.activeRequests.get(requestId);
  }

  getAllRequests(): AIGenerationRequest[] {
    return Array.from(this.activeRequests.values());
  }

  getAvailableStyles(type: 'video' | 'music'): string[] {
    if (type === 'video') {
      return ['Cinematic', 'Anime', 'Realistic', 'Abstract', 'Sci-Fi', 'Fantasy', 'Documentary'];
    } else {
      return ['Pop', 'Rock', 'Classical', 'Jazz', 'Electronic', 'Hip-Hop', 'Ambient', 'Folk'];
    }
  }

  getAvailableMoods(): string[] {
    return ['Happy', 'Sad', 'Energetic', 'Calm', 'Mysterious', 'Romantic', 'Epic', 'Dark'];
  }
}

export const aiService = new AIService();