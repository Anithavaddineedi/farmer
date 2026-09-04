import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';
import type { PageId } from '@/components/Navbar';

type LoginProps = { onNavigate: (page: PageId) => void };

export default function Login({ onNavigate }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onNavigate('dashboard');
    }, 2000);
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-agri-800">AgriConnect</h1>
          <p className="text-sm text-gray-400">Farmer Support Portal</p>
        </div>

        {success && (
          <div className="bg-agri-50 border border-agri-200 rounded-2xl p-6 text-center mb-4 animate-slide-up">
            <CheckCircle2 className="w-12 h-12 text-agri-600 mx-auto mb-3" />
            <h2 className="text-lg font-display font-bold text-gray-900 mb-1">Success!</h2>
            <p className="text-sm text-gray-500">{mode === 'login' ? 'You are now logged in. Redirecting to dashboard...' : 'Account created! Redirecting to dashboard...'}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card p-7">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white text-agri-700 shadow-sm' : 'text-gray-500'}`}
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white text-agri-700 shadow-sm' : 'text-gray-500'}`}
            >
              <UserPlus className="w-4 h-4" /> Register
            </button>
          </div>

          <h2 className="text-xl font-display font-bold text-gray-900 mb-1">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Join AgriConnect to access all farmer services.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" required placeholder="Ramesh Patil" className="input-field !pl-11" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" required placeholder="farmer@example.com" className="input-field !pl-11" />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" required placeholder="+91 98765 43210" className="input-field !pl-11" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} required placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-agri-600 focus:ring-agri-500" />
                  Remember me
                </label>
                <button type="button" className="text-agri-600 font-medium hover:text-agri-700">Forgot password?</button>
              </div>
            )}

            <button type="submit" className="btn-primary w-full">
              {mode === 'login' ? 'Login' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-5">
            <p className="text-sm text-gray-400">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-agri-600 font-semibold hover:text-agri-700">
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to AgriConnect's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
