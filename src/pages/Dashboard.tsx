import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Music, 
  TrendingUp, 
  Clock, 
  Sparkles,
  ArrowRight,
  Eye,
  Heart
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

function Dashboard() {
  const { user } = useAuth();
  const { featuredContent, generations } = useContent();

  const recentGenerations = generations.slice(0, 3);
  const stats = [
    {
      label: 'Total Views',
      value: '12.5K',
      icon: Eye,
      color: 'text-primary-400'
    },
    {
      label: 'Content Created',
      value: '24',
      icon: Sparkles,
      color: 'text-secondary-400'
    },
    {
      label: 'Total Likes',
      value: '892',
      icon: Heart,
      color: 'text-accent-400'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
          <h1 className="text-3xl font-display font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-primary-100 mb-6">
            Ready to create something amazing today? Your creativity awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/generate"
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 group"
            >
              <Sparkles className="mr-2 w-5 h-5" />
              Generate Content
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/browse"
              className="inline-flex items-center px-6 py-3 border border-white/20 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              <Play className="mr-2 w-5 h-5" />
              Browse Library
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {stats.map((stat, index) => (
          <div key={stat.label} className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-400 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-dark-700 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Recent Generations */}
      {recentGenerations.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-white">Recent Generations</h2>
            <Link
              to="/generate"
              className="text-primary-400 hover:text-primary-300 font-medium flex items-center"
            >
              View All
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

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
                  <div className="w-full bg-dark-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${generation.progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Featured Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white">Featured Content</h2>
          <Link
            to="/browse"
            className="text-primary-400 hover:text-primary-300 font-medium flex items-center"
          >
            Browse All
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContent.slice(0, 6).map((content) => (
            <Link
              key={content.id}
              to={`/watch/${content.id}`}
              className="group"
            >
              <div className="bg-dark-800 rounded-xl overflow-hidden border border-dark-700 hover:border-primary-500/50 transition-all duration-200 group-hover:scale-105">
                <div className="relative">
                  <img
                    src={content.thumbnail}
                    alt={content.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {content.type === 'video' ? (
                        <Play className="w-6 h-6 text-white" />
                      ) : (
                        <Music className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 truncate">{content.title}</h3>
                  <p className="text-dark-400 text-sm mb-3 line-clamp-2">{content.description}</p>
                  <div className="flex items-center justify-between text-xs text-dark-400">
                    <span>{content.views.toLocaleString()} views</span>
                    <span>{content.genre}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;