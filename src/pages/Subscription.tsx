import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star, CreditCard, Calendar, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { subscriptionPlans } from '../services/mockData';
import toast from 'react-hot-toast';

function Subscription() {
  const { user, updateUser } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.subscription || 'free');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async (planId: string) => {
    if (planId === user?.subscription) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user subscription
      const newCredits = planId === 'pro' 
        ? { video: 20, music: 50 }
        : planId === 'premium'
        ? { video: 50, music: 100 }
        : { video: 2, music: 5 };
      
      updateUser({ 
        subscription: planId as any,
        credits: newCredits
      });
      
      toast.success(`Successfully upgraded to ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan!`);
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'free': return Users;
      case 'pro': return Zap;
      case 'premium': return Crown;
      default: return Star;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'free': return 'from-dark-600 to-dark-700';
      case 'pro': return 'from-primary-600 to-primary-700';
      case 'premium': return 'from-accent-600 to-accent-700';
      default: return 'from-dark-600 to-dark-700';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold text-white mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
          Unlock the full power of AI content generation with our flexible subscription plans
        </p>
      </motion.div>

      {/* Current Plan Status */}
      {user && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-dark-800 rounded-xl p-6 border border-dark-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${getPlanColor(user.subscription)}`}>
                {React.createElement(getPlanIcon(user.subscription), { 
                  className: "w-6 h-6 text-white" 
                })}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Current Plan: {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)}
                </h3>
                <p className="text-dark-400">
                  {user.subscription === 'free' 
                    ? 'Upgrade to unlock more features'
                    : 'Thank you for being a premium member!'
                  }
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-dark-400 mb-1">Remaining Credits</div>
              <div className="flex gap-4">
                <span className="text-white">
                  <span className="text-primary-400">{user.credits.video}</span> Video
                </span>
                <span className="text-white">
                  <span className="text-secondary-400">{user.credits.music}</span> Music
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Pricing Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {subscriptionPlans.map((plan, index) => {
          const Icon = getPlanIcon(plan.id);
          const isCurrentPlan = user?.subscription === plan.id;
          const isPopular = plan.id === 'pro';
          
          return (
            <div
              key={plan.id}
              className={`relative bg-dark-800 rounded-2xl p-8 border transition-all duration-200 ${
                isCurrentPlan 
                  ? 'border-primary-500 ring-2 ring-primary-500/20' 
                  : 'border-dark-700 hover:border-primary-500/50'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${getPlanColor(plan.id)} mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  {plan.price > 0 && <span className="text-dark-400">/month</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-dark-200">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={isCurrentPlan || isProcessing}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                  isCurrentPlan
                    ? 'bg-dark-600 text-dark-400 cursor-not-allowed'
                    : plan.id === 'free'
                    ? 'bg-dark-700 text-white hover:bg-dark-600'
                    : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing...
                  </div>
                ) : isCurrentPlan ? (
                  'Current Plan'
                ) : plan.id === 'free' ? (
                  'Downgrade'
                ) : (
                  'Upgrade Now'
                )}
              </button>
            </div>
          );
        })}
      </motion.div>

      {/* Billing Information */}
      {user?.subscription !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-dark-800 rounded-xl p-6 border border-dark-700"
        >
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Billing Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-white mb-2">Payment Method</h4>
              <div className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg">
                <CreditCard className="w-5 h-5 text-dark-400" />
                <span className="text-dark-200">•••• •••• •••• 4242</span>
                <span className="text-xs text-dark-400 ml-auto">Expires 12/25</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-2">Next Billing Date</h4>
              <div className="flex items-center gap-3 p-3 bg-dark-700 rounded-lg">
                <Calendar className="w-5 h-5 text-dark-400" />
                <span className="text-dark-200">February 15, 2024</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-dark-700">
            <div className="flex items-center justify-between">
              <span className="text-dark-300">Monthly Total</span>
              <span className="text-xl font-semibold text-white">
                ${subscriptionPlans.find(p => p.id === user.subscription)?.price || 0}/month
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-dark-800 rounded-xl p-8 border border-dark-700"
      >
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Frequently Asked Questions
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Can I change my plan anytime?</h4>
            <p className="text-dark-300">
              Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">What happens to unused credits?</h4>
            <p className="text-dark-300">
              Unused credits expire at the end of each billing cycle. We recommend using them before your plan renews.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Is there a free trial?</h4>
            <p className="text-dark-300">
              All new users start with our Free plan, which includes limited generations to try our AI features.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Subscription;