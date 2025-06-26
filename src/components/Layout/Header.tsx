import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, User, LogOut, Settings, CreditCard } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-dark-800/95 backdrop-blur-sm border-b border-dark-700 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center space-x-8">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-display font-bold text-white">AIflix</span>
          </Link>
        </div>

        <div className="flex-1 max-w-xl mx-8">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search videos, music, and more..."
              className="w-full bg-dark-700 text-white placeholder-dark-400 border border-dark-600 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-4 h-4" />
          </form>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg transition-colors"
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
              <span className="text-sm">{user?.name}</span>
            </button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-2"
                >
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </Link>
                  <Link
                    to="/subscription"
                    className="flex items-center space-x-2 px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Subscription</span>
                  </Link>
                  <hr className="border-dark-700 my-2" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-dark-300 hover:text-white hover:bg-dark-700 transition-colors w-full text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;