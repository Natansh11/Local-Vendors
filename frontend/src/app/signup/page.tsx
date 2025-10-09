'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircleIcon, 
  ExclamationCircleIcon,
  ArrowPathIcon,
  SparklesIcon,
  ShieldCheckIcon,
  FireIcon
} from '@heroicons/react/24/outline';

export default function ExtraordinarySignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'register' | 'otp' | 'success'>('register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    location: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [vendorId, setVendorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);

    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      alert(`Demo OTP: ${randomOtp}\n(In production, this will be sent via SMS)`);
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpVerify = async () => {
    setLoading(true);
    setError('');

    const enteredOtp = otp.join('');
    
    if (enteredOtp === generatedOtp) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const newVendorId = `VNDR-${randomNum}`;
      setVendorId(newVendorId);

      setTimeout(() => {
        setLoading(false);
        setStep('success');
      }, 1000);
    } else {
      setError('Invalid OTP. Please try again.');
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    setOtp(['', '', '', '', '', '']);
    alert(`New OTP: ${randomOtp}\n(In production, this will be sent via SMS)`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="particle-bg">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background: [
                'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
              ][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl w-full relative z-10">
        {/* Logo/Brand */}
        <div className="text-center mb-8 float-animation">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-2">🏪</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-3">
            <span className="gradient-text">Sahakarita</span>
          </h1>
          <p className="text-neutral-600 text-lg">
            {step === 'register' && '✨ Create your Digital Patta'}
            {step === 'otp' && '🔐 Verify your phone number'}
            {step === 'success' && '🎉 Registration successful!'}
          </p>
        </div>

        {/* Registration Form */}
        {step === 'register' && (
          <div className="glass-card rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              {error && (
                <div className="neu-pressed p-4 rounded-xl flex items-center text-red-600">
                  <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 glass-card rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="Ram Kumar"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 glass-card rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="ram@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 glass-card rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    placeholder="+91 98765 43210"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">
                    Business Type *
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-4 glass-card rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                    required
                  >
                    <option value="">Select...</option>
                    <option value="vegetables">🥬 Vegetables</option>
                    <option value="fruits">🍎 Fruits</option>
                    <option value="snacks">🍿 Snacks</option>
                    <option value="clothing">👕 Clothing</option>
                    <option value="handicrafts">🎨 Handicrafts</option>
                    <option value="other">📦 Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-4 glass-card rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  placeholder="Near XYZ Market, Lucknow"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-magnetic gradient-warm text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
                {loading ? 'Sending OTP...' : (
                  <>
                    <SparklesIcon className="h-6 w-6" />
                    Register & Get OTP
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-neutral-600">
                Already have an account?{' '}
                <Link href="/signin" className="text-orange-500 font-bold hover:text-orange-600">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* OTP Verification Screen */}
        {step === 'otp' && (
          <div className="glass-card rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="inline-block glow-warm rounded-full p-6 mb-4">
                <ShieldCheckIcon className="h-16 w-16 text-orange-500" />
              </div>
              <h2 className="text-3xl font-bold text-neutral-800 mb-2">Enter OTP</h2>
              <p className="text-neutral-600">
                We've sent a 6-digit code to<br />
                <span className="font-bold text-orange-500">{formData.phone}</span>
              </p>
            </div>

            {error && (
              <div className="neu-pressed p-4 rounded-xl mb-6 flex items-center text-red-600">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            {/* OTP Input */}
            <div className="flex justify-center gap-3 mb-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-14 h-14 text-center text-2xl font-bold neu-card focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !digit && index > 0) {
                      const prevInput = document.getElementById(`otp-${index - 1}`);
                      prevInput?.focus();
                    }
                  }}
                />
              ))}
            </div>

            <button
              onClick={handleOtpVerify}
              disabled={loading || otp.join('').length < 6}
              className="w-full btn-magnetic gradient-warm text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
            >
              {loading && <ArrowPathIcon className="h-6 w-6 animate-spin" />}
              {loading ? 'Verifying...' : (
                <>
                  <CheckCircleIcon className="h-6 w-6" />
                  Verify OTP
                </>
              )}
            </button>

            <button
              onClick={handleResendOtp}
              className="w-full text-orange-500 font-bold hover:text-orange-600 transition-colors py-2"
            >
              🔄 Resend OTP
            </button>

            <div className="mt-4 text-center">
              <button
                onClick={() => setStep('register')}
                className="text-neutral-600 hover:text-neutral-900 text-sm"
              >
                ← Change phone number
              </button>
            </div>
          </div>
        )}

        {/* Success Screen */}
        {step === 'success' && (
          <div className="glass-card rounded-3xl p-8 shadow-2xl text-center">
            <div className="glow-cool rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="h-16 w-16 text-emerald-500" />
            </div>

            <h2 className="text-4xl font-bold mb-2">
              <span className="gradient-text">Welcome to Sahakarita!</span>
            </h2>
            <p className="text-neutral-600 mb-8 text-lg">Your Digital Patta has been created successfully</p>

            {/* Vendor ID Card */}
            <div className="animated-gradient rounded-3xl p-8 text-white mb-6 shadow-2xl relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              <div className="relative z-10">
                <p className="text-white/80 text-sm mb-2 flex items-center justify-center gap-2">
                  <SparklesIcon className="h-4 w-4" />
                  Your Digital Patta ID
                </p>
                <p className="text-5xl font-bold mb-6">{vendorId}</p>
                <div className="glass-card-dark rounded-2xl p-6">
                  <p className="text-2xl font-bold mb-2">{formData.name}</p>
                  <p className="text-white/80">{formData.businessType}</p>
                  <p className="text-white/60 text-sm mt-1">{formData.location}</p>
                </div>
              </div>
            </div>

            <div className="neu-pressed rounded-2xl p-6 mb-6">
              <p className="text-neutral-700 text-sm flex items-center justify-center gap-2">
                <FireIcon className="h-5 w-5 text-yellow-500" />
                <strong>Status:</strong> Pending Verification
              </p>
              <p className="text-neutral-600 text-xs mt-2">
                Your account will be verified by our admin team within 24-48 hours
              </p>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full btn-magnetic gradient-sunset text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
              <SparklesIcon className="h-6 w-6" />
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
