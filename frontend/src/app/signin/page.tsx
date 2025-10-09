'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function SignInPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        router.push('/dashboard');
      } else {
        setError('Please fill in all fields');
        setLoading(false);
      }
    }, 1000);
  };

  // Particle background colors
  const particleColors = [
    'rgba(249, 115, 22, 0.3)', // Orange
    'rgba(16, 185, 129, 0.3)', // Emerald
    'rgba(168, 85, 247, 0.3)', // Purple
  ];

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4 py-12">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 animated-gradient" />
      
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle-bg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 3}px`,
              height: `${Math.random() * 5 + 3}px`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 20}s`,
              background: particleColors[Math.floor(Math.random() * particleColors.length)]
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Brand Section */}
        <div className="text-center mb-8 float">
          <div className="inline-block">
            <div className="text-7xl mb-4 animate-bounce">🏪</div>
            <h1 className="text-5xl font-bold text-shadow-glow mb-3">
              <span className="text-white">Sahakarita</span>
            </h1>
            <div className="h-1 w-32 mx-auto animated-gradient rounded-full" />
          </div>
          <p className="text-white text-lg mt-4 font-semibold">
            Welcome Back to Your Community
          </p>
        </div>

        {/* Sign In Form - Glassmorphism */}
        <div className="glass-card rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Decorative SVG Pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="signin-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="2" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#signin-pattern)" />
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl shadow-lg animate-shake">
                <p className="font-semibold text-center">{error}</p>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 glow-cool">
                  <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-14 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200 transition-all text-gray-900 placeholder-gray-500 font-medium shadow-lg"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 glow-warm">
                  <LockClosedIcon className="w-6 h-6 text-orange-600" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-14 pr-4 py-4 bg-white/50 backdrop-blur-sm border-2 border-white/30 rounded-2xl focus:border-orange-400 focus:ring-4 focus:ring-orange-200 transition-all text-gray-900 placeholder-gray-500 font-medium shadow-lg"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center group cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-400 cursor-pointer"
                />
                <span className="ml-3 text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors">
                  Remember me
                </span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm font-bold gradient-sunset bg-clip-text text-transparent hover:scale-105 transition-transform"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button - Magnetic Effect */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-magnetic gradient-warm px-8 py-4 rounded-2xl font-bold text-white shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center relative z-10">
            <p className="text-gray-800 font-medium">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-bold gradient-royal bg-clip-text text-transparent hover:scale-105 inline-block transition-transform"
              >
                Sign up now →
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials - Neumorphism */}
        <div className="mt-6 neu-card rounded-2xl p-6 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <p className="font-bold text-gray-800 mb-1">Demo Access</p>
              <p className="text-sm text-gray-600">
                Use any email and password to sign in and explore the platform
              </p>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-white/80 text-sm">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold">Secure Login • 256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
}
