import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Heart, 
  Share2, 
  Download,
  ArrowLeft,
  Eye,
  Clock,
  User,
  Calendar
} from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Watch() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { content } = useContent();
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [currentContent, setCurrentContent] = useState(content.find(item => item.id === id));

  useEffect(() => {
    const foundContent = content.find(item => item.id === id);
    if (!foundContent) {
      navigate('/browse');
      return;
    }
    setCurrentContent(foundContent);
  }, [id, content, navigate]);

  if (!currentContent) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-300">Loading content...</p>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const handleDownload = () => {
    if (user?.subscription === 'free') {
      toast.error('Download feature requires Pro or Premium subscription');
      return;
    }
    toast.success('Download started');
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const relatedContent = content
    .filter(item => item.id !== currentContent.id && item.type === currentContent.type)
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm border-b border-dark-700 z-50">
        <div className="flex items-center justify-between h-16 px-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-dark-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-display font-bold text-white">AIflix</span>
          </div>
        </div>
      </div>

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Player */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 mb-6"
              >
                <div className="aspect-video relative">
                  {currentContent.type === 'video' ? (
                    <ReactPlayer
                      url={currentContent.url}
                      width="100%"
                      height="100%"
                      playing={isPlaying}
                      volume={isMuted ? 0 : volume}
                      controls={false}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary-600 to-primary-600 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{currentContent.title}</h3>
                        <p className="text-white/80">Music Track</p>
                      </div>
                    </div>
                  )}

                  {/* Custom Controls Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => setIsMuted(!isMuted)}
                          className="text-white hover:text-primary-400 transition-colors"
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={isMuted ? 0 : volume}
                          onChange={(e) => setVolume(parseFloat(e.target.value))}
                          className="w-20 accent-primary-500"
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm">
                          {formatDuration(currentContent.duration)}
                        </span>
                        <button className="text-white hover:text-primary-400 transition-colors">
                          <Maximize className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Content Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-dark-800 rounded-xl p-6 border border-dark-700 mb-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-white mb-2">{currentContent.title}</h1>
                    <div className="flex items-center space-x-4 text-dark-400 text-sm mb-4">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {formatViews(currentContent.views)} views
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {currentContent.createdAt}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDuration(currentContent.duration)}
                      </span>
                    </div>
                  </div>

                  {currentContent.isAIGenerated && (
                    <div className="bg-gradient-to-r from-primary-500 to-secondary-500 px-3 py-1 rounded-full text-sm font-medium text-white">
                      AI Generated
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-600 text-white' 
                        : 'bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                    <span>{isLiked ? 'Liked' : 'Like'}</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  <button
                    onClick={handleDownload}
                    className="flex items-center space-x-2 px-4 py-2 bg-dark-700 text-dark-300 hover:text-white hover:bg-dark-600 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-dark-300 leading-relaxed mb-4">{currentContent.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentContent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-dark-700 text-dark-300 rounded-full text-sm hover:bg-dark-600 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-xl font-semibold text-white mb-4">Related Content</h2>
                <div className="space-y-4">
                  {relatedContent.map((item) => (
                    <Link
                      key={item.id}
                      to={`/watch/${item.id}`}
                      className="block bg-dark-800 rounded-lg p-3 border border-dark-700 hover:border-primary-500/50 transition-colors group"
                    >
                      <div className="flex space-x-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-24 h-16 rounded-lg object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white mb-1 truncate group-hover:text-primary-400 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-dark-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between text-xs text-dark-400">
                            <span>{formatViews(item.views)} views</span>
                            <span>{item.genre}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {relatedContent.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-dark-400" />
                    </div>
                    <p className="text-dark-400">No related content found</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Watch;