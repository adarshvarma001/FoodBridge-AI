import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, Heart, Zap, ShieldCheck,
  MapPin, Clock, Users, Truck, Award, BarChart3,
  Brain, Network, AlertTriangle, ChevronDown,
  Package, Search, Building, Sparkles
} from 'lucide-react';

const LandingPage = () => {
  const heroRef = useRef(null);
  const isHeroVisible = useInView(heroRef, { once: true, amount: 0.2 });

  const steps = [
    { id: '01', title: 'Upload Surplus', desc: 'Donors register excess edible food in under 1 minute.', icon: Package },
    { id: '02', title: 'AI Freshness Scan', desc: 'Predictive ML calculates remaining usable hours.', icon: Brain },
    { id: '03', title: 'NGO Collection', desc: 'Verified NGO partners claim & receive bulk meals.', icon: Network },
    { id: '04', title: 'Volunteer Dispatch', desc: 'Assigned riders transport meals directly to shelters.', icon: Truck },
    { id: '05', title: 'People in Need', desc: 'Hot meals served to hungry individuals, families & beggars.', icon: Heart },
  ];

  const features = [
    {
      title: 'Food Urgency Prediction',
      desc: 'Predicts exact usable shelf-life and pickup windows based on food age and ambient conditions.',
      badge: '98.4% Accuracy',
      icon: Zap,
    },
    {
      title: 'Regional Demand Forecasting',
      desc: 'Forecasts daily headcount and food category needs across 180+ verified local non-profits.',
      badge: 'Real-Time Sync',
      icon: BarChart3,
    },
    {
      title: 'Smart Matching Engine',
      desc: 'Matches surplus food with nearest recipient facilities using distance and capacity optimization.',
      badge: '< 2 Sec Match',
      icon: Network,
    },
    {
      title: 'Agentic Logistics Control',
      desc: 'Autonomous agents assign drivers, optimize transit waypoints, and issue live status updates.',
      badge: '6 Active Agents',
      icon: Brain,
    },
  ];

  const agents = [
    { id: 'donation', name: 'Donation Agent', role: 'Evaluates food safety & urgency', status: 'Active', tasks: '1,240', rate: '99.1%', icon: Package },
    { id: 'demand', name: 'Demand Agent', role: 'Forecasts NGO capacity needs', status: 'Active', tasks: '890', rate: '97.5%', icon: BarChart3 },
    { id: 'matching', name: 'Matching Agent', role: 'Optimizes donor-NGO pairing', status: 'Active', tasks: '1,140', rate: '98.9%', icon: Network },
    { id: 'logistics', name: 'Logistics Agent', role: 'Calculates shortest delivery route', status: 'Active', tasks: '760', rate: '96.8%', icon: Truck },
    { id: 'notification', name: 'Dispatch Agent', role: 'Coordinates notifications & alerts', status: 'Active', tasks: '3,200', rate: '99.8%', icon: Sparkles },
    { id: 'analytics', name: 'Audit Agent', role: 'Generates impact verification', status: 'Idle', tasks: '240', rate: '100%', icon: ShieldCheck },
  ];

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-700 overflow-x-hidden">

      {/* HERO SECTION WITH CRYSTAL CLEAR BACKGROUND VIDEO (UNTOUCHED PLACEMENT) */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-slate-950">
        <video
          src="/hero-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-100 scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-slate-950/50 z-10 pointer-events-none" />

        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-12 sm:pt-16">
          <motion.div
            ref={heroRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={isHeroVisible ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/60 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI Surplus Food Redistribution Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.15]">
              Turn Surplus Food Into <br className="hidden sm:inline" />
              <span className="font-extrabold text-emerald-400">Social Impact.</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 max-w-xl mx-auto font-normal leading-relaxed">
              Connecting food donors with NGOs and volunteers to feed people in need, shelters, and hungry individuals in real time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/register/donor" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <Package className="w-5 h-5" />
                  Donate Surplus Food
                </motion.button>
              </Link>
              <Link to="/register/ngo" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full sm:w-auto bg-white/15 backdrop-blur-md hover:bg-white/25 text-white border border-white/30 font-extrabold text-base px-8 py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Building className="w-5 h-5" />
                  Partner as NGO
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>

        <a
          href="#impact"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/70 hover:text-white transition-colors flex flex-col items-center gap-1 text-xs font-bold tracking-wider uppercase"
        >
          <span>Explore Impact</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
        </a>
      </section>

      {/* UNIQUE THEME SCROLL ANIMATIONS BELOW HERO */}

      {/* REAL-TIME IMPACT SECTION - STAGGERED 3D TILT REVEAL */}
      <section id="impact" className="py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              Verified Impact
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 mt-4 tracking-tight">
              Feeding Communities, <span className="font-extrabold text-emerald-600">Ending Hunger</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Food Rescued', value: '12,480 KG', sub: 'Prevented from waste', icon: Package },
              { label: 'Meals Served', value: '24,960+', sub: 'To shelters & beggars', icon: Heart },
              { label: 'NGO Partners', value: '184 Shelters', sub: 'Verified non-profits', icon: Building },
              { label: 'Active Volunteers', value: '310 Riders', sub: 'On-demand delivery', icon: Truck },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg shadow-slate-100 text-center group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-md shadow-emerald-500/10">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 mb-1.5">{stat.value}</div>
                <div className="text-sm font-extrabold text-slate-800">{stat.label}</div>
                <div className="text-xs text-slate-500 mt-1 font-medium">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - ALTERNATING WAVE SLIDE REVEAL */}
      <section id="how-it-works" className="py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              The Redistribution Bridge
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 mt-4 tracking-tight">
              How Food Flows <span className="font-extrabold text-emerald-600">To People in Need</span>
            </h2>
            <p className="text-slate-600 text-base mt-3">From business surplus to nourishing meals for shelters, soup kitchens, and beggars.</p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: "0 20px 30px -10px rgba(16, 185, 129, 0.15)" }}
                className="bg-slate-50/90 rounded-3xl p-7 border border-slate-200/90 hover:border-emerald-500 hover:bg-white transition-all flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-700">STAGE {step.id}</span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-md group-hover:bg-emerald-600 group-hover:text-white transition-all">
                      <step.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI INTELLIGENCE SECTION - RADIAL PULSE & FADE */}
      <section id="ai" className="py-28 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full inline-block">
              Smart Orchestration
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white mt-4 tracking-tight">
              Autonomous <span className="font-extrabold text-emerald-400">Agent Infrastructure</span>
            </h2>
            <p className="text-slate-400 text-base mt-3">
              AI agents continually monitoring food freshness, matching recipient demands, and managing volunteer delivery routes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.01, backgroundColor: 'rgba(30, 41, 59, 0.9)' }}
                className="bg-slate-900/80 backdrop-blur-md rounded-3xl p-8 border border-slate-800 shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-white">{feature.title}</h3>
                  </div>
                  <span className="text-xs font-extrabold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-normal">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent, i) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
                className="bg-slate-900/40 backdrop-blur-sm rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400">
                      <agent.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-white">{agent.name}</div>
                      <div className="text-xs text-slate-400 font-medium">{agent.role}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {agent.status}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <span>Tasks: <strong className="text-white font-extrabold">{agent.tasks}</strong></span>
                  <span>Accuracy: <strong className="text-emerald-400 font-extrabold">{agent.rate}</strong></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN NETWORK / ROLES SECTION - SCALE & DEPTH REVEAL */}
      <section id="join" className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              Get Started
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-slate-900 mt-4 tracking-tight">
              Join <span className="font-extrabold text-emerald-600">FoodBridge AI</span>
            </h2>
            <p className="text-slate-600 text-base mt-3">Tailored portals for food donors, non-profit shelters, and delivery volunteers.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Donor Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 25px 40px -15px rgba(16, 185, 129, 0.15)" }}
              className="bg-white rounded-3xl p-9 border border-slate-200/90 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-7 shadow-lg shadow-emerald-600/20">
                  <Package className="w-7 h-7" />
                </div>
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider">For Food Businesses</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">Surplus Donor</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                  Hotels, restaurants, caterers, and bakeries. Instantly log surplus meals for automated shelter pickup.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-700 mb-9">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Automated freshness evaluation</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Digital tax & donation receipts</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero listing fees</li>
                </ul>
              </div>
              <Link to="/register/donor">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
                >
                  Register as Donor <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* NGO Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 25px 40px -15px rgba(245, 158, 11, 0.2)" }}
              className="bg-white rounded-3xl p-9 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between relative"
            >
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-xs font-black uppercase px-4 py-1 rounded-full shadow-md tracking-wider">
                Highest Demand
              </div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-7 shadow-lg shadow-amber-500/20">
                  <Building className="w-7 h-7" />
                </div>
                <span className="text-xs font-black text-amber-700 uppercase tracking-wider">For Non-Profits</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">NGO & Shelter</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                  Shelters, food banks, and soup kitchens. Receive matched food deliveries to feed hungry individuals.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-700 mb-9">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> AI demand forecasting & scheduling</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant notification when food matches</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> End-to-end logistics coordination</li>
                </ul>
              </div>
              <Link to="/register/ngo">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-colors shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-sm"
                >
                  Register as NGO <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Volunteer Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 25px 40px -15px rgba(15, 23, 42, 0.2)" }}
              className="bg-white rounded-3xl p-9 border border-slate-200/90 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-7 shadow-lg shadow-slate-900/20">
                  <Truck className="w-7 h-7" />
                </div>
                <span className="text-xs font-black text-slate-600 uppercase tracking-wider">For Individuals</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1 mb-3">Delivery Partner</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-8 font-medium">
                  Volunteers with vehicles or bikes. Transport fresh meals from donors directly to nearby recipient shelters.
                </p>
                <ul className="space-y-3 text-xs font-bold text-slate-700 mb-9">
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Flexible pickup schedules</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> In-app GPS routing & instructions</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified impact tracking</li>
                </ul>
              </div>
              <Link to="/register/volunteer">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 rounded-2xl transition-colors shadow-lg shadow-slate-900/20 flex items-center justify-center gap-2 text-sm"
                >
                  Join as Volunteer <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-28 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/30 via-transparent to-amber-900/30 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full inline-block shadow-md">
            Zero Waste • Maximum Social Impact
          </span>
          <h2 className="text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
            Ready to stop food waste and <br className="hidden sm:inline" />
            <span className="font-extrabold text-emerald-400">feed people in your city?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto font-normal">
            Join FoodBridge AI today and connect surplus meals with shelters, soup kitchens, and individuals who need them most.
          </p>
          <div className="pt-2">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-lg px-10 py-5 rounded-2xl shadow-xl shadow-emerald-600/40 transition-all inline-flex items-center gap-3"
              >
                Create Free Account
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default LandingPage;
