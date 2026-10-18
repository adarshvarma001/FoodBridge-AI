import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Building, Truck, ArrowRight, Sparkles } from 'lucide-react';
import Card from '../../components/ui/Card';

const RegisterPage = () => {
  const roles = [
    {
      id: 'donor',
      title: 'Surplus Donor',
      subtitle: 'Restaurants, Hotels & Grocers',
      desc: 'Donate extra edible food directly to local NGOs before it expires.',
      icon: User,
      color: 'emerald',
      tag: 'Food Businesses'
    },
    {
      id: 'ngo',
      title: 'NGO Partner',
      subtitle: 'Shelters & Food Banks',
      desc: 'Receive large shipments of food to redistribute to people and beggars.',
      icon: Building,
      color: 'amber',
      tag: 'Registered Charities'
    },
    {
      id: 'volunteer',
      title: 'Delivery Hero',
      subtitle: 'Riders & Drivers',
      desc: 'Help pick up meals from donors and drop them off where needed most.',
      icon: Truck,
      color: 'slate',
      tag: 'Individual Impact'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Impact
          </div>
          <h1 className="text-4xl sm:text-5xl font-light text-slate-900 dark:text-white tracking-tight">
            Join the <span className="font-extrabold text-emerald-600">Redistribution Bridge</span>
          </h1>
          <p className="text-slate-500 mt-2 text-base">Select your role to help eliminate food waste and feed the hungry</p>
        </div>

        <div className="grid gap-4">
          {roles.map((r, i) => (
            <Link key={r.id} to={`/register/${r.id}`} className="group">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Card className="p-6 transition-all duration-300 border-slate-200/80 dark:border-slate-800 hover:border-emerald-500/40 hover:shadow-xl group-hover:bg-white dark:group-hover:bg-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        r.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/20' :
                        r.color === 'amber' ? 'bg-amber-50 text-amber-600 dark:bg-amber-500/20' :
                        'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
                      }`}>
                        <r.icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">{r.title}</h3>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase tracking-tighter">
                            {r.tag}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">{r.subtitle}</p>
                        <p className="text-xs text-slate-500 max-w-md">{r.desc}</p>
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-emerald-600 group-hover:text-white flex items-center justify-center text-slate-400 transition-colors">
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            Already part of the network?{' '}
            <Link to="/login" className="text-emerald-600 font-extrabold hover:underline">Log in here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
