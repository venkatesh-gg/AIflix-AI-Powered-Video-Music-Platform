import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Music, 
  Sparkles, 
  Clock, 
  Zap,
  Settings,
  Download,
  Share2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';
import { aiService } from '../services/aiService';
import toast from 'react-hot-toast';

function Generate() {
  const { user, updateUser } = useAuth();
  const { generateContent, generations, isLoading } = useContent();
  const [activeTab, setActiveTab] = useState<'video' | 'music'>('video');
  const [formData, setFormData] = useState({
    prompt: '',
    style: '',
    mood: '',
    duration: 30
  });

  const videoStyles = aiService.getAvailableStyles('video');
  const musicStyles = aiService.getAvailableStyles('music');
  const moods = aiService.getAvailableMoods();

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Check credits
    const requiredCredits = activeTab === 'video' ? 1 : 1;
    const availableCredits = user.credits[activeTab];
    
    if (availableCredits < requiredCredits) {
      toast.error(`Insufficient ${activeTab} credits. Please upgrade your plan.`);
      return;
    }

    try {
      await generateContent({
        type: activeTab,
        prompt: formData.prompt,
        style: formData.style,
        mood: formData.mood,
        duration: formData.duration
      });

      // Deduct credits
      updateUser({
        credits: {
          ...user.credits,
          [activeTab]: user.credits[activeTab] - requiredCredits
        }
      });

      toast.success(`${activeTab} generation started! Check your dashboard for progress.`);
      
      // Reset form
      setFormData({
        prompt: '',
        style: '',
        mood: '',
        duration: 30
      });
    } catch (error) {
      toast.error('Failed to start generation. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const recentGenerations = generations.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          AI Content Generator
        </h1>
        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
          Transform your ideas into stunning videos and music using the power of artificial intelligence
        </p>
      </motion.div>

      {/* Credits Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800 rounded-xl p-6 border border-dark-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Generation Credits</h3>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary-400" />
                <span className="text-white font-medium">{user?.credits.video}</span>
                <span className="text-dark-400">video credits</span>
              </div>
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-secondary-400" />
                <span className="text-white font-medium">{user?.credits.music}</span>
                <span className="text-dark-400">music credits</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              user?.subscription === 'free' && 'bg-dark-600 text-dark-300'
            } ${
              user?.subscription === 'pro' && 'bg-primary-600 text-white'
            } ${
              user?.subscription === 'premium' && 'bg-accent-600 text-white'
            }`}>
              {user?.subscription.charAt(0).toUpperCase()}{user?.subscription.slice(1)} Plan
            </span>
          </div>
        </div>
      </motion.div>

      {/* Generation Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex border-b border-dark-700">
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'video'
                ? 'bg-primary-600 text-white'
                : 'text-dark-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            <Play className="w-5 h-5" />
            Video Generation
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'music'
                ? 'bg-secondary-600 text-white'
                : 'text-dark-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            <Music className="w-5 h-5" />
            Music Generation
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleGenerate} className="p-6 space-y-6">
          {/* Prompt */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Description *
            </label>
            <textarea
              name="prompt"
              value={formData.prompt}
              onChange={handleInputChange}
              placeholder={
                activeTab === 'video'
                  ? 'Describe the video you want to create (e.g., "A serene sunset over a mountain lake with birds flying")'
                  : 'Describe the music you want to create (e.g., "Upbeat electronic dance music with heavy bass")'
              }
              className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Style */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Style *
              </label>
              <select
                name="style"
                value={formData.style}
                onChange={handleInputChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              >
                <option value="">Select a style</option>
                {(activeTab === 'video' ? videoStyles : musicStyles).map(style => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
            </div>

            {/* Mood */}
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Mood
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
                className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a mood (optional)</option>
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-dark-200 mb-2">
              Duration: {formData.duration} seconds
            </label>
            <input
              type="range"
              name="duration"
              min={activeTab === 'video' ? 15 : 10}
              max={
                user?.subscription === 'free' ? 30 :
                user?.subscription === 'pro' ? 300 :
                1200
              }
              value={formData.duration}
              onChange={handleInputChange}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-dark-400 mt-1">
              <span>{activeTab === 'video' ? '15s' : '10s'}</span>
              <span>
                {user?.subscription === 'free' ? '30s' :
                 user?.subscription === 'pro' ? '5min' :
                 '20min'} max
              </span>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.prompt || !formData.style}
            className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700'
                : 'bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700'
            } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate {activeTab === 'video' ? 'Video' : 'Music'}
              </>
            )}
          </button>
        </form>
      </motion.div>

      {/* Recent Generations */}
      {recentGenerations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-display font-bold text-white mb-6">Recent Generations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentGenerations.map((generation) => (
              <div key={generation.id} className="bg-dark-800 rounded-xl p-6 border border-dark-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${
                    generation.type === 'video' ? 'bg-primary-600' : 'bg-secondary-600'
                  }`}>
                    {generation.type === 'video' ? (
                      <Play className="w-5 h-5 text-white" />
                    ) : (
                      <Music className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    generation.status === 'completed' 
                      ? 'bg-success-50 text-success-600' 
                      : generation.status === 'processing'
                        ? 'bg-warning-50 text-warning-600'
                        : 'bg-dark-600 text-dark-300'
                  }`}>
                    {generation.status}
                  </span>
                </div>
                
                <h3 className="font-semibold text-white mb-2 truncate">
                  {generation.prompt.slice(0, 40)}...
                </h3>
                <p className="text-dark-400 text-sm mb-4">{generation.style}</p>
                
                {generation.status === 'processing' && (
                  <div className="w-full bg-dark-700 rounded-full h-2 mb-4">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${generation.progress}%` }}
                    ></div>
                  </div>
                )}

                {generation.status === 'completed' && generation.result && (
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex items-center justify-center px-3 py-2 bg-dark-700 text-dark-300 rounded-lg hover:text-white transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default Generate;