import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package, MapPin, Truck, Clock, CheckCircle2,
  ArrowRight, Navigation, Phone, MessageSquare,
  Map, Users, Sparkles, Zap, Award, Heart
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { volunteerService } from '../../services/mockServices';
import { toast } from 'sonner';

const VolunteerDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [assignedTasks, available] = await Promise.all([
        volunteerService.getTasks('usr_volunteer_1'),
        volunteerService.getAvailableTasks()
      ]);
      setTasks(assignedTasks);
      setAvailableTasks(available);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleAcceptTask = async (task) => {
    try {
      await volunteerService.acceptTask(task.id, 'usr_volunteer_1', 'Marcus Brody');
      toast.success(`Task Accepted! Ready to pick up ${task.foodName}`);
      // Refresh data
      const [assignedTasks, available] = await Promise.all([
        volunteerService.getTasks('usr_volunteer_1'),
        volunteerService.getAvailableTasks()
      ]);
      setTasks(assignedTasks);
      setAvailableTasks(available);
      setActiveTab('dashboard');
    } catch (error) {
      toast.error("Failed to accept task");
    }
  };

  const stats = [
    { label: 'Active Tasks', value: tasks.filter(t => t.status !== 'Delivered').length, icon: Zap, color: 'text-sky-500' },
    { label: 'Total Delivered', value: tasks.filter(t => t.status === 'Delivered').length, icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Distance Covered', value: '12.4 km', icon: Navigation, color: 'text-amber-500' },
    { label: 'Lives Impacted', value: '120+', icon: Heart, color: 'text-rose-500' },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Assigned': return <Badge variant="info">Assigned</Badge>;
      case 'Active': return <Badge variant="warning">In Transit</Badge>;
      case 'PickedUp': return <Badge variant="teal">Picked Up</Badge>;
      case 'Delivered': return <Badge variant="success">Delivered</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500" />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3 h-3" /> Delivery Partner Portal
          </div>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 dark:text-white">
            Welcome back, <span className="font-extrabold">Marcus.</span>
          </h1>
          <p className="text-slate-500 mt-1">Ready to bridge the gap and feed your community?</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Global Rank</div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">Top 5% Deliverer</div>
          </div>
        </motion.div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={stat.label} delay={i * 0.05} padding="p-5" hover>
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center ${stat.color} border border-slate-100 dark:border-slate-700`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white leading-none mb-1">{stat.value}</div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tabs / Content Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex gap-8">
            {['dashboard', 'tasks'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-extrabold uppercase tracking-widest transition-all relative ${activeTab === tab
                    ? 'text-emerald-600'
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
              >
                {tab === 'dashboard' ? 'My Active Tasks' : 'Discover New Tasks'}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-emerald-600"
                  />
                )}
              </button>
            ))}
          </div>
          <Link to="/volunteer/route" className="pb-4">
            <Button variant="ghost" size="sm" className="text-emerald-600 font-extrabold">
              <Map className="w-4 h-4 mr-2" /> View Live Map
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="wait">
            {activeTab === 'dashboard' ? (
              <motion.div
                key="my-tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid gap-4"
              >
                {tasks.length > 0 ? tasks.map((task, i) => (
                  <Card key={task.id} delay={i * 0.05} padding="p-0 overflow-hidden" hover>
                    <div className="flex flex-col lg:flex-row">
                      <div className="lg:w-1/3 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col justify-between border-r border-slate-100 dark:border-slate-800">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            {getStatusBadge(task.status)}
                            <span className="text-[10px] font-black text-slate-400">ID: {task.id}</span>
                          </div>
                          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">{task.foodName}</h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md w-fit">
                            <Package className="w-3 h-3" /> {task.quantity} • {task.mealCount} meals
                          </div>
                        </div>
                        <div className="mt-6 flex items-center gap-3">
                          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" className="w-10 h-10 rounded-full border-2 border-emerald-500/20" alt="Donor" />
                          <div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter leading-none">Donor</div>
                            <div className="text-sm font-extrabold text-slate-900 dark:text-white">{task.donorName || 'Grand Pavilion'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="lg:w-2/3 p-6 flex flex-col justify-between">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" /> Pickup Address
                              </div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                                {task.pickupAddress}
                              </p>
                            </div>
                            <div>
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                                <Navigation className="w-3 h-3" /> Delivery Point
                              </div>
                              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                                {task.assignedNgoName || 'Metropolis Community Center'}
                              </p>
                            </div>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 flex flex-col justify-center border border-slate-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-extrabold text-slate-500">Urgency Level</span>
                              <Badge variant={task.urgency === 'HIGH' ? 'danger' : 'warning'}>{task.urgency}</Badge>
                            </div>
                            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: task.urgency === 'HIGH' ? '90%' : '40%' }}
                                className={`h-full ${task.urgency === 'HIGH' ? 'bg-rose-500' : 'bg-amber-500'}`}
                              />
                            </div>
                            <div className="mt-2 text-[10px] font-bold text-slate-400 text-center">AI Freshness Prediction: {task.remainingUsableHours || '4'}h remaining</div>
                          </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex gap-2">
                            <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-emerald-600 transition-colors">
                              <Phone className="w-4 h-4" />
                            </button>
                            <button className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 hover:text-emerald-600 transition-colors">
                              <MessageSquare className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="secondary" size="sm" className="font-extrabold">Directions</Button>
                            {task.status !== 'Delivered' && (
                              <Button size="sm" className="font-extrabold px-6">Update Status</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )) : (
                  <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
                      <Truck className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">No active deliveries</h3>
                    <p className="text-slate-500 mt-1 mb-6">You're currently caught up on all tasks.</p>
                    <Button onClick={() => setActiveTab('tasks')} variant="secondary">Browse Available Tasks</Button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="available-tasks"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                {availableTasks.map((task, i) => (
                  <Card key={task.id} delay={i * 0.05} hover padding="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="premium" className="mb-2">New Surplus</Badge>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">{task.foodName}</h3>
                        <p className="text-sm font-bold text-emerald-600">{task.quantity} • {task.distance || '3.8 km'} away</p>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-100 dark:border-emerald-500/20">
                        <Package className="w-6 h-6" />
                      </div>
                    </div>
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <MapPin className="w-4 h-4 text-slate-400" /> {task.pickupAddress}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Clock className="w-4 h-4 text-slate-400" /> Must pick up by 10:30 PM
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      <Badge variant="danger">{task.urgency} URGENCY</Badge>
                      <Button onClick={() => handleAcceptTask(task)} size="sm" className="font-extrabold px-6">
                        Claim Task
                      </Button>
                    </div>
                  </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
