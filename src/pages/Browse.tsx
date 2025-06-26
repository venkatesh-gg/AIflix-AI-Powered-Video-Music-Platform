import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, Play, Music } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import ContentCard from '../components/Content/ContentCard';

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { content, searchContent, filterContent } = useContent();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedType, setSelectedType] = useState<'all' | 'video' | 'music'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const genres = ['all', 'Sci-Fi', 'Fantasy', 'Documentary', 'Jazz', 'Electronic', 'Orchestral'];

  const filteredContent = useMemo(() => {
    let results = content;

    if (searchQuery.trim()) {
      results = searchContent(searchQuery);
    }

    if (selectedType !== 'all') {
      results = results.filter(item => item.type === selectedType);
    }

    if (selectedGenre !== 'all') {
      results = results.filter(item => item.genre === selectedGenre);
    }

    return results;
  }, [content, searchQuery, selectedType, selectedGenre, searchContent]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Browse Content</h1>
          <p className="text-dark-300">Discover amazing AI-generated videos and music</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'grid' 
                ? 'bg-primary-600 text-white' 
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-primary-600 text-white' 
                : 'bg-dark-700 text-dark-300 hover:text-white'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800 rounded-xl p-6 border border-dark-700"
      >
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos, music, and more..."
              className="w-full bg-dark-700 text-white placeholder-dark-400 border border-dark-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </form>

        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-dark-400" />
            <span className="text-sm text-dark-400">Filters:</span>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="bg-dark-700 text-white border border-dark-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="video">Videos</option>
            <option value="music">Music</option>
          </select>

          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="bg-dark-700 text-white border border-dark-600 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {genres.map(genre => (
              <option key={genre} value={genre}>
                {genre === 'all' ? 'All Genres' : genre}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Results */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-dark-300">
            {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ContentCard content={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-dark-800 rounded-xl p-4 border border-dark-700 hover:border-primary-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-24 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-dark-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                    <div className="flex items-center gap-4 text-xs text-dark-400">
                      <span className="flex items-center gap-1">
                        {item.type === 'video' ? <Play className="w-3 h-3" /> : <Music className="w-3 h-3" />}
                        {item.type}
                      </span>
                      <span>{item.genre}</span>
                      <span>{item.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filteredContent.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-dark-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
            <p className="text-dark-400">Try adjusting your search terms or filters</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Browse;