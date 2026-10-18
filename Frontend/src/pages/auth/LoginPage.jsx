import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, ShieldCheck, Heart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate(`/${result.user.role.toLowerCase()}/dashboard`);
    } else {
      setError(result.message);
    }
  };

  const handleDemoLogin = (role) => {
    const users = {
      DONOR: { email: 'adarsh@donor.com', password: 'password' },
      NGO: { email: 'sarah@hopefeeding.org', password: 'password' },
      VOLUNTEER: { email: 'marcus@volunteer.net', password: 'password' },
      ADMIN: { email: 'admin@foodbridge.ai', password: 'password' },
    };
    setEmail(users[role].email);
    setPassword(users[role].password);
  };

  return (
    <div className="dark relative flex min-h-[100dvh] overflow-x-hidden bg-slate-950 text-white lg:h-[100dvh] lg:overflow-hidden">
      {/* Background Glows for WOW Factor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Visual - Immersive Side */}
      <div className="relative hidden overflow-hidden bg-slate-950 p-12 lg:flex lg:w-7/12 lg:items-center lg:justify-center">
        {/* Animated background lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" fill="none" />
          </svg>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-xl text-left"
        >
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/20 backdrop-blur-xl">
            <LogIn className="w-10 h-10 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-light text-white tracking-tight mb-4">
            Welcome <span className="font-extrabold text-emerald-400">Back.</span>
          </h1>
          <p className="max-w-sm text-lg text-slate-400">
            Sign in to continue your mission of bridge-building between abundance and need.
          </p>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Secure AI-Powered Logistics</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Real-time Community Impact</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Form - Interactive Side */}
      <div className="flex min-h-[100dvh] w-full items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 pb-6 pt-24 sm:px-8 lg:w-5/12 lg:px-10 lg:py-16">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[28rem]"
        >
          <div className="w-full">
            <div className="mb-6">
              <h2 className="mb-2 text-3xl font-light text-white">
                User <span className="font-extrabold">Login</span>
              </h2>
              <p className="text-slate-400">Enter your access credentials below</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-200">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border-0 bg-slate-800/70 py-3 pl-11 pr-4 text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    placeholder="name@organization.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold text-slate-200">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full rounded-xl border-0 bg-slate-800/70 py-3 pl-11 pr-12 text-white placeholder-slate-400 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-bold text-rose-400"
                >
                  {error}
                </motion.div>
              )}

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  Forgot Password?
                </Link>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In Now'}
              </Button>
            </form>

            <div className="mt-6 border-t border-slate-800/80 pt-6">
              <p className="text-center text-sm text-slate-400">
                New to the platform?{' '}
                <Link to="/register" className="text-emerald-600 font-extrabold hover:underline">Join the Network</Link>
              </p>
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Demo Access</span>
                <div className="h-px flex-1 bg-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['DONOR', 'NGO', 'VOLUNTEER', 'ADMIN'].map(role => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    className="rounded-lg bg-slate-800/80 px-4 py-2 text-[10px] font-bold uppercase tracking-tighter text-slate-300 transition-all hover:bg-emerald-500/10 hover:text-emerald-400"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
