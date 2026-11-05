import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, Leaf, Info, ArrowRight } from 'lucide-react';
import type { PageId } from '@/components/navigation';

type LoginProps = { onNavigate: (page: PageId) => void };
type DemoAccount = { fullName: string; phone: string; passwordHash: string };
const accountsStorageKey = 'agriconnect-demo-accounts';

function readDemoAccounts(): Record<string, DemoAccount> {
  const savedAccounts = localStorage.getItem(accountsStorageKey);
  if (!savedAccounts) return {};

  const parsed: unknown = JSON.parse(savedAccounts);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Saved demo accounts are invalid. Clear this site’s local storage and try again.');
  }

  const accounts: Record<string, DemoAccount> = {};
  for (const [email, value] of Object.entries(parsed)) {
    if (
      typeof value !== 'object' ||
      value === null ||
      !('fullName' in value) ||
      typeof value.fullName !== 'string' ||
      !('phone' in value) ||
      typeof value.phone !== 'string' ||
      !('passwordHash' in value) ||
      typeof value.passwordHash !== 'string'
    ) {
      throw new Error('Saved demo accounts are invalid. Clear this site’s local storage and try again.');
    }
    accounts[email] = { fullName: value.fullName, phone: value.phone, passwordHash: value.passwordHash };
  }
  return accounts;
}

async function hashPassword(password: string): Promise<string> {
  if (!globalThis.crypto?.subtle) {
    throw new Error('Password hashing is unavailable in this browser. Open the app on localhost or HTTPS.');
  }
  const digest = await globalThis.crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
}

export default function Login({ onNavigate }: LoginProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readDemoAccounts();
      const passwordHash = await hashPassword(password);

      if (mode === 'register') {
        if (accounts[normalizedEmail]) {
          setError('An account with this email already exists. Please log in instead.');
          return;
        }

        accounts[normalizedEmail] = { fullName: fullName.trim(), phone: phone.trim(), passwordHash };
        localStorage.setItem(accountsStorageKey, JSON.stringify(accounts));
        setNotice('Demo account created. Opening your dashboard...');
      } else {
        const account = accounts[normalizedEmail];
        if (!account || account.passwordHash !== passwordHash) {
          setError('Email or password is incorrect. Register first if you do not have a demo account.');
          return;
        }
        setNotice(`Welcome back, ${account.fullName || normalizedEmail}. Opening your dashboard...`);
      }

      setPassword('');
      setConfirmPassword('');
      window.setTimeout(() => onNavigate('dashboard'), 700);
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'Could not complete the demo login. Please try again.');
    }
  };

  const changeMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setNotice('');
    setError('');
    setPassword('');
    setConfirmPassword('');
    setFullName('');
    setPhone('');
  };

  return (
    <div className="animate-fade-in min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-agri-500 to-agri-700 flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Leaf className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-agri-800">AgriConnect</h1>
          <p className="text-sm text-gray-400">Farmer Support Portal</p>
        </div>

        {notice && (
          <div role="status" className="bg-sky-50 border border-sky-200 rounded-xl p-4 mb-4 flex gap-3 text-sm text-sky-800">
            <Info className="w-5 h-5 shrink-0" />
            <p>{notice}</p>
          </div>
        )}
        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card p-7">
          <div className="flex gap-1 p-1 bg-gray-100 rounded-xl mb-6">
            <button
              type="button"
              onClick={() => changeMode('login')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'login' ? 'bg-white text-agri-700 shadow-sm' : 'text-gray-500'}`}
            >
              <LogIn className="w-4 h-4" /> Login
            </button>
            <button
              type="button"
              onClick={() => changeMode('register')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${mode === 'register' ? 'bg-white text-agri-700 shadow-sm' : 'text-gray-500'}`}
            >
              <UserPlus className="w-4 h-4" /> Register
            </button>
          </div>

          <h2 className="text-xl font-display font-bold text-gray-900 mb-1">
            {mode === 'login' ? 'Welcome back!' : 'Create your account'}
          </h2>
          <p className="text-sm text-gray-400 mb-6">
            {mode === 'login' ? 'Log in with a demo account saved in this browser.' : 'Create a demo account stored only in this browser.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <>
                <div>
                  <label htmlFor="full-name" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input id="full-name" type="text" required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Ramesh Patil" className="input-field !pl-11" />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input id="phone" type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" className="input-field !pl-11" />
                  </div>
                </div>
              </>
            )}

            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="farmer@example.com" className="input-field !pl-11" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input id="password" type={showPassword ? 'text' : 'password'} required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label htmlFor="confirm-password" className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input id="confirm-password" type={showConfirm ? 'text' : 'password'} required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" className="input-field !pl-11 !pr-11" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600" aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}>
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
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
              <button type="button" onClick={() => changeMode(mode === 'login' ? 'register' : 'login')} className="text-agri-600 font-semibold hover:text-agri-700">
                {mode === 'login' ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Demo mode only: accounts are saved in this browser and are not secure authentication.
        </p>
      </div>
    </div>
  );
}
