import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Mail, Lock, AlertCircle, ArrowRight, Zap, Sparkles } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setForgotMsg('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res?.data?.role?.toLowerCase() === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setForgotMsg('');
    setEmail('demo@fittrack.com');
    setPassword('password123');
    try {
      setLoading(true);
      await login('demo@fittrack.com', 'password123');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Demo login failed. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setForgotMsg('Password reset functionality will be available in future updates.');
  };

  return (
    <div 
      className="dark min-h-screen relative bg-cover bg-center flex items-center justify-center p-4 selection:bg-green-100 selection:text-green-900 dark:selection:bg-slate-800 dark:selection:text-slate-100"
      style={{ backgroundImage: 'url("/login-bg.jpg")' }}
    >
      {/* Background Blur Overlay */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/70 border border-slate-700/50 backdrop-blur-xl shadow-2xl rounded-3xl p-8 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-[12px] bg-green-700 text-white shadow-md shadow-green-700/20 mb-2 hover:bg-green-600 transition-colors">
            <Activity className="w-6 h-6" />
          </Link>
          <h1 className="font-sora text-2xl font-bold text-navy-900 dark:text-slate-200 tracking-tight">Welcome to FitTrack</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Sign in to your account to monitor your daily goals</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Forgot Password Notice */}
        {forgotMsg && (
          <div className="bg-green-050 border border-green-200 text-green-800 px-4 py-3 rounded-xl text-sm text-center">
            {forgotMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-5 h-5" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white/80 dark:bg-slate-900/50 shadow-inner text-navy-900 dark:text-slate-200 transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">
                Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs font-semibold text-green-700 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/80 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-sm bg-white/80 dark:bg-slate-900/50 shadow-inner text-navy-900 dark:text-slate-200 transition-all duration-300"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 hover:-translate-y-1 text-white font-sora font-semibold rounded-xl shadow-[0_8px_20px_rgba(31,111,79,0.25)] hover:shadow-[0_12px_26px_rgba(31,111,79,0.32)] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/60" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-slate-900 px-3 text-slate-400">Or Quick Access</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-emerald-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-500/40 text-emerald-300 font-sora font-semibold text-sm rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-emerald-950/40 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
            <span>⚡ One-Click Instant Demo Login</span>
          </button>

          <div className="bg-slate-950/50 border border-emerald-500/20 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-400">Demo User:</span>
              <span className="font-mono text-emerald-300 font-semibold">demo@fittrack.com</span>
            </div>
            <span className="font-mono text-slate-500 text-[11px]">Pass: password123</span>
          </div>
        </form>




        {/* Footer Link */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 pt-2 border-t border-line dark:border-slate-700">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-green-700 hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

