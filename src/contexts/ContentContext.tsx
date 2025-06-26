import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Content, AIGenerationRequest } from '../types';
import { mockContent } from '../services/mockData';
import { aiService } from '../services/aiService';

interface ContentContextType {
  content: Content[];
  generations: AIGenerationRequest[];
  featuredContent: Content[];
  generateContent: (request: Omit<AIGenerationRequest, 'id' | 'createdAt' | 'status' | 'progress'>) => Promise<string>;
  getGenerationStatus: (id: string) => AIGenerationRequest | undefined;
  searchContent: (query: string) => Content[];
  filterContent: (type?: 'video' | 'music', genre?: string) => Content[];
  addToLibrary: (content: Content) => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content[]>(mockContent);
  const [generations, setGenerations] = useState<AIGenerationRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const featuredContent = content.filter(item => item.views > 10000).slice(0, 6);

  useEffect(() => {
    // Simulate periodic updates to generation status
    const interval = setInterval(() => {
      const activeGenerations = aiService.getAllRequests();
      setGenerations(activeGenerations);
      
      // Add completed generations to content library
      activeGenerations.forEach(gen => {
        if (gen.status === 'completed' && gen.result) {
          const exists = content.find(c => c.id === gen.result!.id);
          if (!exists) {
            setContent(prev => [gen.result!, ...prev]);
          }
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [content]);

  const generateContent = async (request: Omit<AIGenerationRequest, 'id' | 'createdAt' | 'status' | 'progress'>) => {
    setIsLoading(true);
    
    const fullRequest: AIGenerationRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending',
      progress: 0
    };

    try {
      const requestId = await aiService.generateContent(fullRequest);
      setGenerations(prev => [fullRequest, ...prev]);
      return requestId;
    } finally {
      setIsLoading(false);
    }
  };

  const getGenerationStatus = (id: string) => {
    return aiService.getRequestStatus(id);
  };

  const searchContent = (query: string) => {
    if (!query.trim()) return content;
    
    return content.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const filterContent = (type?: 'video' | 'music', genre?: string) => {
    return content.filter(item => {
      const typeMatch = !type || item.type === type;
      const genreMatch = !genre || item.genre.toLowerCase() === genre.toLowerCase();
      return typeMatch && genreMatch;
    });
  };

  const addToLibrary = (newContent: Content) => {
    setContent(prev => [newContent, ...prev]);
  };

  return (
    <ContentContext.Provider value={{
      content,
      generations,
      featuredContent,
      generateContent,
      getGenerationStatus,
      searchContent,
      filterContent,
      addToLibrary,
      isLoading
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
}