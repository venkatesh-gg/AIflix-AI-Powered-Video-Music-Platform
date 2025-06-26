import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Sparkles, 
  User, 
  CreditCard, 
  Settings,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import clsx from 'clsx';

function Sidebar() {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Browse', href: '/browse', icon: Search },
    { name: 'Generate', href: '/generate', icon: Sparkles },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Subscription', href: '/subscription', icon: CreditCard },
  ];

  if (user?.isAdmin) {
    navigation.push({ name: 'Admin Panel', href: '/admin', icon: Shield });
  }

  return (
    <nav className="fixed left-0 top-16 bottom-0 w-64 bg-dark-800 border-r border-dark-700 overflow-y-auto">
      <div className="p-4">
        <div className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700'
                )
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </div>

        {user && (
          <div className="mt-8 p-4 bg-dark-700 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">Generation Credits</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-dark-300">Video</span>
                <span className="text-white">{user.credits.video}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-dark-300">Music</span>
                <span className="text-white">{user.credits.music}</span>
              </div>
            </div>
            <div className="mt-3">
              <span className={clsx(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                user.subscription === 'free' && 'bg-dark-600 text-dark-300',
                user.subscription === 'pro' && 'bg-primary-600 text-white',
                user.subscription === 'premium' && 'bg-accent-600 text-white'
              )}>
                {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Sidebar;