import React from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, Heart, Eye } from 'lucide-react';
import { Content } from '../../types';
import { motion } from 'framer-motion';

interface ContentCardProps {
  content: Content;
}

function ContentCard({ content }: ContentCardProps) {
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link to={`/watch/${content.id}`}>
        <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-200">
          {/* Thumbnail */}
          <div className="relative">
            <img
              src={content.thumbnail}
              alt={content.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                {content.type === 'video' ? (
                  <Play className="w-6 h-6 text-white" />
                ) : (
                  <Music className="w-6 h-6 text-white" />
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
              {formatDuration(content.duration)}
            </div>

            {/* AI Badge */}
            {content.isAIGenerated && (
              <div className="absolute top-2 left-2 bg-gradient-to-r from-primary-500 to-secondary-500 px-2 py-1 rounded-full text-xs font-medium text-white">
                AI Generated
              </div>
            )}
          </div>

          {/* Content Info */}
          <div className="p-4">
            <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
              {content.title}
            </h3>
            
            <p className="text-dark-400 text-sm mb-3 line-clamp-2">
              {content.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-dark-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {formatViews(content.views)}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  {formatViews(content.likes)}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  content.type === 'video' 
                    ? 'bg-primary-600/20 text-primary-400' 
                    : 'bg-secondary-600/20 text-secondary-400'
                }`}>
                  {content.genre}
                </span>
              </div>
            </div>

            {/* Tags */}
            {content.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {content.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-dark-700 text-dark-300 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default ContentCard;