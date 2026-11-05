import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, Leaf, CheckCircle2, ArrowRight } from 'lucide-react';
import type { PageId } from '@/components/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type LoginProps = { onNavigate: (page: PageId) => void };

export default function Login({ onNavigate }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isResettingPassword, setIsResettingPassword] = useState(() => window.location.hash.includes('type=recovery'));
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add the project URL and anon key to .env.local, then restart the app.');
      return;
    }

    if ((mode === 'register' || isResettingPassword) && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      if (isResettingPassword) {
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
        onNavigate('dashboard');
        return;
      }

      if (mode === 'login') {
        const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) throw authError;
        onNavigate('dashboard');
        return;
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName, phone },
        },
      });
      if (authError) throw authError;

      if (data.session) {
        onNavigate('dashboard');
      } else {
        setNotice('Account created. Check your email to confirm your account, then log in.');
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    setError('');
    setNotice('');
    if (!isSupabaseConfigured || !supabase) {
      setError('Supabase is not configured. Add the project URL and anon key to .env.local, then restart the app.');
      return;
    }
    if (!email) {
      setError('Enter your email address first to reset your password.');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin,
      });
      if (authError) throw authError;
      setNotice('If an account exists for this email, a password reset link has been sent.');
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Could not send the password reset email.');
    } finally {
      setLoading(false);
    }
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

        {notice && (
          <div className="bg-agri-50 border border-agri-200 rounded-2xl p-6 text-center mb-4 animate-slide-up">
            <CheckCircle2 className="w-12 h-12 text-agri-600 mx-auto mb-3" />
            <h2 className="text-lg font-display font-bold text-gray-900 mb-1">Check your email</h2>
            <p className="text-sm text-gray-500">{notice}</p>
          </div>
        )}
        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
            {error}
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
            {isResettingPassword ? 'Set a new password' : mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {isResettingPassword ? 'Choose a new password for your account.' : mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Join AgriConnect to access all farmer services.'}
          </p>

          {!isSupabaseConfigured && (
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              Supabase setup is required before you can log in or register.
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isResettingPassword && mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ramesh Patil" className="input-field !pl-11" />
                </div>
              </div>
            )}

            {!isResettingPassword && <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="farmer@example.com" className="input-field !pl-11" />
              </div>
            </div>}

            {!isResettingPassword && mode === 'register' && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="input-field !pl-11" />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">{isResettingPassword ? 'New Password' : 'Password'}</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {(mode === 'register' || isResettingPassword) && (
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">{isResettingPassword ? 'Confirm New Password' : 'Confirm Password'}</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type={showConfirm ? 'text' : 'password'} required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {!isResettingPassword && mode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded text-agri-600 focus:ring-agri-500" />
                  Remember me
                </label>
                <button type="button" onClick={handlePasswordReset} disabled={loading} className="text-agri-600 font-medium hover:text-agri-700 disabled:opacity-50">Forgot password?</button>
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? 'Please wait...' : isResettingPassword ? 'Update Password' : mode === 'login' ? 'Login' : 'Create Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {isResettingPassword && (
            <div className="text-center mt-5">
              <button
                onClick={() => {
                  setIsResettingPassword(false);
                  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
                }}
                className="text-agri-600 font-semibold hover:text-agri-700"
              >
                Back to login
              </button>
            </div>
          )}

          {!isResettingPassword && <div className="text-center mt-5">
            <p className="text-sm text-gray-400">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-agri-600 font-semibold hover:text-agri-700">
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          By continuing, you agree to AgriConnect's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
