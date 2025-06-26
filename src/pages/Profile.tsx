import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  Camera, 
  Save, 
  Shield,
  Settings,
  Bell,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Profile() {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    generationComplete: true,
    weeklyDigest: false,
    promotions: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSaveProfile = () => {
    if (user) {
      updateUser({
        name: formData.name,
        email: formData.email,
        avatar: formData.avatar
      });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }
  };

  const handlePasswordUpdate = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    // Simulate password update
    toast.success('Password updated successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordChange(false);
  };

  const handleAvatarUpload = () => {
    // Simulate avatar upload
    const avatars = [
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    ];
    
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    setFormData(prev => ({ ...prev, avatar: randomAvatar }));
    toast.success('Avatar updated!');
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-dark-300">Manage your account settings and preferences</p>
        </div>
        
        {user.isAdmin && (
          <div className="flex items-center gap-2 px-3 py-1 bg-accent-600/20 text-accent-400 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            Admin
          </div>
        )}
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-dark-800 rounded-xl p-8 border border-dark-700"
      >
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                src={formData.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150'}
                alt={formData.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-dark-600"
              />
              {isEditing && (
                <button
                  onClick={handleAvatarUpload}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center hover:bg-primary-700 transition-colors"
                >
                  <Camera className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
            
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-white">{user.name}</h2>
              <p className="text-dark-400">{user.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.subscription === 'free' && 'bg-dark-600 text-dark-300'
                } ${
                  user.subscription === 'pro' && 'bg-primary-600 text-white'
                } ${
                  user.subscription === 'premium' && 'bg-accent-600 text-white'
                }`}>
                  {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Member Since
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type="text"
                  value={new Date(user.joinDate).toLocaleDateString()}
                  disabled
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-3 text-white opacity-50"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center gap-2 px-6 py-3 bg-success-600 text-white rounded-lg hover:bg-success-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name,
                        email: user.email,
                        avatar: user.avatar || ''
                      });
                    }}
                    className="px-6 py-3 bg-dark-600 text-white rounded-lg hover:bg-dark-500 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-dark-800 rounded-xl p-8 border border-dark-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Security Settings</h3>
            <p className="text-dark-400">Manage your password and security preferences</p>
          </div>
          <Lock className="w-6 h-6 text-dark-400" />
        </div>

        {!showPasswordChange ? (
          <button
            onClick={() => setShowPasswordChange(true)}
            className="px-6 py-3 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
          >
            Change Password
          </button>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white"
                >
                  {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-12 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white"
                >
                  {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-200 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePasswordUpdate}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Update Password
              </button>
              <button
                onClick={() => {
                  setShowPasswordChange(false);
                  setPasswordData({
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                  });
                }}
                className="px-6 py-3 bg-dark-600 text-white rounded-lg hover:bg-dark-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-dark-800 rounded-xl p-8 border border-dark-700"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Notification Preferences</h3>
            <p className="text-dark-400">Choose what notifications you'd like to receive</p>
          </div>
          <Bell className="w-6 h-6 text-dark-400" />
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">
                  {key === 'emailUpdates' && 'Email Updates'}
                  {key === 'generationComplete' && 'Generation Complete'}
                  {key === 'weeklyDigest' && 'Weekly Digest'}
                  {key === 'promotions' && 'Promotions & Offers'}
                </h4>
                <p className="text-dark-400 text-sm">
                  {key === 'emailUpdates' && 'Receive important account updates via email'}
                  {key === 'generationComplete' && 'Get notified when your AI generations are ready'}
                  {key === 'weeklyDigest' && 'Weekly summary of your activity and new features'}
                  {key === 'promotions' && 'Special offers and promotional content'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary-600' : 'bg-dark-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Account Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-800 rounded-xl p-8 border border-dark-700"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Account Statistics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-400 mb-1">
              {user.credits.video}
            </div>
            <div className="text-dark-400 text-sm">Video Credits Remaining</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary-400 mb-1">
              {user.credits.music}
            </div>
            <div className="text-dark-400 text-sm">Music Credits Remaining</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-400 mb-1">
              {Math.floor((Date.now() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-dark-400 text-sm">Days as Member</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;