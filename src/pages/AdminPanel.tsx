import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Video, 
  Music, 
  DollarSign, 
  TrendingUp, 
  Shield,
  Search,
  Filter,
  MoreVertical,
  Ban,
  CheckCircle,
  XCircle,
  Eye,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useContent } from '../contexts/ContentContext';

function AdminPanel() {
  const { user } = useAuth();
  const { content } = useContent();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'analytics'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock admin data
  const adminStats = [
    {
      label: 'Total Users',
      value: '12,543',
      change: '+12%',
      icon: Users,
      color: 'text-primary-400'
    },
    {
      label: 'Content Generated',
      value: '8,921',
      change: '+8%',
      icon: Video,
      color: 'text-secondary-400'
    },
    {
      label: 'Monthly Revenue',
      value: '$45,230',
      change: '+15%',
      icon: DollarSign,
      color: 'text-accent-400'
    },
    {
      label: 'Active Subscriptions',
      value: '3,456',
      change: '+5%',
      icon: TrendingUp,
      color: 'text-success-500'
    }
  ];

  const mockUsers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      subscription: 'pro',
      status: 'active',
      joinDate: '2024-01-15',
      contentGenerated: 24
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      subscription: 'premium',
      status: 'active',
      joinDate: '2024-01-10',
      contentGenerated: 45
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      subscription: 'free',
      status: 'suspended',
      joinDate: '2024-01-20',
      contentGenerated: 3
    }
  ];

  // Check if user is admin
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-dark-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
          <p className="text-dark-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: Video },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-dark-300">Manage users, content, and platform analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6 text-primary-400" />
          <span className="text-primary-400 font-medium">Administrator</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800 rounded-xl p-2 border border-dark-700"
      >
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-dark-800 rounded-xl p-6 border border-dark-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-dark-400 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-success-500 text-sm mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-dark-700 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New user registration', user: 'alice@example.com', time: '2 minutes ago' },
                { action: 'Content generated', user: 'bob@example.com', time: '5 minutes ago' },
                { action: 'Subscription upgraded', user: 'charlie@example.com', time: '10 minutes ago' },
                { action: 'Content reported', user: 'dave@example.com', time: '15 minutes ago' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-dark-700 last:border-b-0">
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-dark-400 text-sm">{activity.user}</p>
                  </div>
                  <span className="text-dark-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Search and Filters */}
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search users..."
                  className="w-full bg-dark-700 text-white placeholder-dark-400 border border-dark-600 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <select className="bg-dark-700 text-white border border-dark-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="all">All Users</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="free">Free Plan</option>
                <option value="pro">Pro Plan</option>
                <option value="premium">Premium Plan</option>
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-dark-800 rounded-xl border border-dark-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-700">
                  <tr>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">User</th>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">Subscription</th>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">Status</th>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">Content</th>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">Join Date</th>
                    <th className="text-left py-4 px-6 text-dark-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="border-t border-dark-700 hover:bg-dark-700/50">
                      <td className="py-4 px-6">
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-dark-400 text-sm">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.subscription === 'free' && 'bg-dark-600 text-dark-300'
                        } ${
                          user.subscription === 'pro' && 'bg-primary-600 text-white'
                        } ${
                          user.subscription === 'premium' && 'bg-accent-600 text-white'
                        }`}>
                          {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`flex items-center gap-1 ${
                          user.status === 'active' ? 'text-success-500' : 'text-error-500'
                        }`}>
                          {user.status === 'active' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white">{user.contentGenerated}</td>
                      <td className="py-4 px-6 text-dark-300">{user.joinDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button className="p-1 text-dark-400 hover:text-white">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-dark-400 hover:text-warning-500">
                            <Ban className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-dark-400 hover:text-error-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Content Tab */}
      {activeTab === 'content' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h3 className="text-xl font-semibold text-white mb-4">Content Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Video className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{content.filter(c => c.type === 'video').length}</p>
                <p className="text-dark-400">Videos</p>
              </div>
              <div className="text-center">
                <Music className="w-8 h-8 text-secondary-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{content.filter(c => c.type === 'music').length}</p>
                <p className="text-dark-400">Music Tracks</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 text-accent-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-dark-400">Reported</p>
              </div>
            </div>
          </div>

          {/* Content List */}
          <div className="bg-dark-800 rounded-xl border border-dark-700">
            <div className="p-6 border-b border-dark-700">
              <h3 className="text-lg font-semibold text-white">Recent Content</h3>
            </div>
            <div className="divide-y divide-dark-700">
              {content.slice(0, 10).map((item) => (
                <div key={item.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-16 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="text-white font-medium">{item.title}</h4>
                      <p className="text-dark-400 text-sm">{item.type} • {item.genre}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-white">{item.views.toLocaleString()} views</p>
                      <p className="text-dark-400 text-sm">{item.createdAt}</p>
                    </div>
                    <button className="p-2 text-dark-400 hover:text-white">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h3 className="text-xl font-semibold text-white mb-4">Platform Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-400">85%</p>
                <p className="text-dark-400">User Retention</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-secondary-400">4.2</p>
                <p className="text-dark-400">Avg. Rating</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-400">12.5K</p>
                <p className="text-dark-400">Monthly Active</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-500">98.5%</p>
                <p className="text-dark-400">Uptime</p>
              </div>
            </div>
          </div>

          <div className="bg-dark-800 rounded-xl p-6 border border-dark-700">
            <h3 className="text-lg font-semibold text-white mb-4">Revenue Breakdown</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Free Plan</span>
                <span className="text-white">$0 (65% users)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Pro Plan</span>
                <span className="text-white">$28,450 (25% users)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-dark-300">Premium Plan</span>
                <span className="text-white">$16,780 (10% users)</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdminPanel;