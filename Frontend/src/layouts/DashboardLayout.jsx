import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, Search, Bell, User, Settings, LogOut,
  Menu, X, MapPin, BarChart3, Bot, ClipboardList, ArrowRight,
  Zap, Command, Brain, Truck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const roleConfig = {
  DONOR: {
    label: 'Donor Dashboard',
    icon: Package,
    links: [
      { name: 'Dashboard', href: '/donor/dashboard', icon: LayoutDashboard },
      { name: 'My Donations', href: '/donor/donations', icon: Package },
      { name: 'Urgency AI', href: '/donor/urgency', icon: Brain },
      { name: 'Analytics', href: '/donor/analytics', icon: BarChart3 },
    ]
  },
  NGO: {
    label: 'NGO Dashboard',
    icon: ClipboardList,
    links: [
      { name: 'Dashboard', href: '/ngo/dashboard', icon: LayoutDashboard },
      { name: 'Discover Donations', href: '/ngo/discover', icon: Package },
      { name: 'Demand Forecast', href: '/ngo/demand', icon: BarChart3 },
      { name: 'Capacity', href: '/ngo/capacity', icon: Package },
    ]
  },
  VOLUNTEER: {
    label: 'Volunteer Dashboard',
    icon: Truck,
    links: [
      { name: 'Dashboard', href: '/volunteer/dashboard', icon: LayoutDashboard },
      { name: 'Tasks', href: '/volunteer/tasks', icon: ClipboardList },
      { name: 'Route Map', href: '/volunteer/route', icon: MapPin },
    ]
  },
  ADMIN: {
    label: 'Admin Center',
    icon: Bot,
    links: [
      { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { name: 'Agent Control', href: '/admin/agents', icon: Bot },
      { name: 'Platform Analytics', href: '/admin/analytics', icon: BarChart3 },
    ]
  }
};

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { setIsCommandPaletteOpen, notifications } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Keyboard shortcut for global search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const config = roleConfig[user?.role];
  const Icon = config?.icon || LayoutDashboard;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-cream dark:bg-charcoal-darkest text-charcoal-darkest dark:text-cream overflow-hidden">
      <div className="bg-glow" />
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-200 dark:border-charcoal-medium bg-white/50 dark:bg-charcoal-darker/50 backdrop-blur-sm transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'
          }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-gray-200 dark:border-charcoal-medium">
          <div className="w-10 h-10 bg-brand-dark rounded-xl flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6 text-brand-fresh" />
          </div>
          <AnimatePresence>
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="overflow-hidden"
              >
                <span className="text-lg tracking-tight">
                  <span className="font-light">Food</span><span className="font-extrabold text-emerald-600 dark:text-emerald-400">Bridge</span> <span className="text-amber-500 font-black">AI</span>
                </span>
                <p className="text-xs text-charcoal-light">{config?.label}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {config?.links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium mb-1 transition-colors hover:bg-brand-dark/10 dark:hover:bg-brand-dark/20 ${window.location.pathname === link.href
                  ? 'bg-brand-dark/10 text-brand-dark dark:text-brand-fresh'
                  : 'text-charcoal-darkest/70 dark:text-cream/70'
                }`}
            >
              <link.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-charcoal-medium">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-20 flex items-center justify-between px-6 bg-white/30 dark:bg-charcoal-darker/30 backdrop-blur-md border-b border-gray-200 dark:border-charcoal-medium z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-medium/50"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-light" />
              <input
                type="text"
                placeholder="Search... (Ctrl+K)"
                onClick={() => setIsCommandPaletteOpen(true)}
                readOnly
                className="pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-charcoal-medium/50 rounded-xl border-none focus:ring-2 focus:ring-brand-dark/30 w-64 cursor-pointer text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-charcoal-medium/50 transition-colors">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-charcoal-medium">
              <img
                src={user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover border-2 border-brand-fresh/30"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-semibold">{user?.name}</p>
                <p className="text-xs text-charcoal-light capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-gray-50/50 dark:bg-charcoal-darkest/50">
          <Outlet />
        </main>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60]"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-72 h-full bg-cream dark:bg-charcoal-darker z-[70] shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-12">
                  <span className="font-bold text-lg">Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {config?.links.map(link => (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-lg font-medium py-2 flex items-center gap-3 hover:text-brand-dark"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <link.icon className="w-5 h-5" /> {link.name}
                    </Link>
                  ))}
                  <hr className="my-2" />
                  <button onClick={handleLogout} className="text-lg font-medium py-2 text-red-500 flex items-center gap-3">
                    <LogOut className="w-5 h-5" /> Logout
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
