import React, { useState, useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Leaf, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'AI Intelligence', href: '/#ai' },
    { name: 'Impact', href: '/#impact' },
    { name: 'Join Us', href: '/#join' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-700">
      <div className="bg-glow" />
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-3.5'
          : 'bg-gradient-to-b from-slate-950/70 via-slate-950/30 to-transparent py-5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <span className={`text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
                <span className="font-light">Food</span><span className="font-extrabold text-emerald-600 dark:text-emerald-400">Bridge</span> <span className="text-amber-500 font-black">AI</span>
              </span>
            </Link>

            {/* Desktop Nav Items */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${isScrolled
                    ? 'text-slate-600 hover:text-emerald-600'
                    : 'text-slate-200 hover:text-amber-400'
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center gap-3 ml-4">
                <Link to="/login">
                  <button className={`text-sm font-semibold px-4 py-2 rounded-xl transition-colors ${isScrolled
                    ? 'text-slate-700 hover:text-emerald-600'
                    : 'text-white/90 hover:text-white'
                    }`}>
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`md:hidden p-2 rounded-xl transition-colors ${isScrolled
                ? 'bg-slate-100 text-slate-800'
                : 'bg-white/10 text-white backdrop-blur-md'
                }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-80 h-full bg-white z-[70] shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-slate-900">FoodBridge AI</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {navLinks.map(link => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-semibold text-slate-700 hover:text-emerald-600 py-2 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3 rounded-xl border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20">
                    Get Started
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Outlet Content */}
      <main className="flex-grow">{children || <Outlet />}</main>

      {!isLoginPage && (
        <footer className="bg-slate-900 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl tracking-tight text-white">
                <span className="font-light">Food</span><span className="font-extrabold text-emerald-500">Bridge</span> <span className="text-amber-500 font-black">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Intelligent surplus food redistribution connecting donors, NGOs, and delivery volunteers seamlessly.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" /> 100% Verified Food Safety Protocol
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#ai" className="hover:text-emerald-400 transition-colors">AI Intelligence</a></li>
              <li><a href="#impact" className="hover:text-emerald-400 transition-colors">Impact Analytics</a></li>
              <li><a href="#join" className="hover:text-emerald-400 transition-colors">Join Network</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Role Portals</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/register/donor" className="hover:text-emerald-400 transition-colors">Surplus Food Donors</Link></li>
              <li><Link to="/register/ngo" className="hover:text-amber-400 transition-colors">NGOs & Shelters</Link></li>
              <li><Link to="/register/volunteer" className="hover:text-emerald-400 transition-colors">Delivery Volunteers</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Agent Control Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <p className="text-sm leading-relaxed mb-4">
              Have questions or want to launch FoodBridge AI in your city?
            </p>
            <a href="mailto:support@foodbridge.ai" className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300">
              support@foodbridge.ai <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FoodBridge AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Security</a>
          </div>
        </div>
        </footer>
      )}
    </div>
  );
};

export default PublicLayout;
