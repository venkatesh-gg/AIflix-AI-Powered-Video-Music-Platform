import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Music, 
  Sparkles, 
  Users, 
  Star, 
  ArrowRight,
  Check
} from 'lucide-react';

function LandingPage() {
  const features = [
    {
      icon: Play,
      title: 'AI Video Generation',
      description: 'Create stunning videos from text descriptions using advanced AI models'
    },
    {
      icon: Music,
      title: 'Music Composition',
      description: 'Generate original music tracks in any genre with AI-powered composition'
    },
    {
      icon: Sparkles,
      title: 'Smart Content Library',
      description: 'Access a vast library of AI-generated and curated content'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Share your creations and discover content from other creators'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Content Creator',
      content: 'AIflix has revolutionized how I create content. The AI-generated videos are incredible!',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Music Producer',
      content: 'The music generation feature is mind-blowing. I can create full tracks in minutes.',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-dark-900/95 backdrop-blur-sm border-b border-dark-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-display font-bold">AIflix</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link
              to="/auth"
              className="px-4 py-2 text-dark-300 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
              Create Amazing Content
              <br />
              With AI Power
            </h1>
            <p className="text-xl text-dark-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into stunning videos and music using cutting-edge artificial intelligence. 
              Join thousands of creators already using AIflix to bring their vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 group"
              >
                Start Creating
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center px-8 py-3 border border-dark-600 rounded-lg font-semibold hover:bg-dark-800 transition-colors">
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-2xl p-8 backdrop-blur-sm border border-dark-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary-400 mb-2">50K+</div>
                    <div className="text-dark-300">Videos Generated</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-secondary-400 mb-2">25K+</div>
                    <div className="text-dark-300">Music Tracks Created</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-accent-400 mb-2">10K+</div>
                    <div className="text-dark-300">Active Creators</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-dark-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Powerful AI Features</h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Everything you need to create professional-quality content with the power of artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-800 p-6 rounded-xl border border-dark-700 hover:border-primary-500/50 transition-colors group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-dark-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">What Creators Say</h2>
            <p className="text-xl text-dark-300">Join thousands of satisfied creators worldwide</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-dark-800 p-8 rounded-xl border border-dark-700"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-500 fill-current" />
                  ))}
                </div>
                <p className="text-dark-200 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-dark-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-display font-bold mb-6">Ready to Start Creating?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join AIflix today and transform your creative process with the power of AI
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold text-lg hover:shadow-xl transition-all duration-200 group"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-800 border-t border-dark-700 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-display font-bold">AIflix</span>
            </div>
            <div className="text-dark-400 text-sm">
              © 2024 AIflix. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;