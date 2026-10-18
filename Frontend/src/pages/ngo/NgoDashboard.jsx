import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, TrendingUp, AlertTriangle, Truck,
  MapPin, ArrowRight, BarChart3, ClipboardList,
  Clock, ArrowUpRight, ArrowDownRight, Loader
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { donationService, ngoService } from '../../services/mockServices';

const NgoDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [donationsData, ngosData] = await Promise.all([
        ngoService.getAvailableDonationsForNgo('usr_ngo_1'),
        ngoService.getNgos()
      ]);
      setDonations(donationsData);
      setNgos(ngosData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Active Requests', value: donations.filter(d => d.status === 'Matched').length, icon: Package, color: 'text-blue-500' },
    { label: 'Available Donations', value: donations.filter(d => d.status === 'Pending').length, icon: ClipboardList, color: 'text-green-500' },
    { label: 'Predicted Demand', value: 'HIGH', icon: AlertTriangle, color: 'text-amber-500' },
    { label: 'Food Received', value: '120 kg', icon: TrendingUp, color: 'text-brand-dark' },
  ];

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'HIGH': return <Badge variant="danger">{urgency}</Badge>;
      case 'MEDIUM': return <Badge variant="warning">{urgency}</Badge>;
      case 'LOW': return <Badge variant="success">{urgency}</Badge>;
      default: return <Badge>{urgency}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-8 h-8 animate-spin text-brand-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Good morning.</h1>
          <p className="text-gray-500">Here's what your community needs today.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-charcoal-medium flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 dark:border-charcoal-medium">
        {['dashboard', 'discover', 'demand'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 font-medium text-sm border-b-2 transition-colors ${activeTab === tab
                ? 'border-brand-dark text-brand-dark dark:text-brand-fresh'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'dashboard' && (
        <Card>
          <h2 className="text-xl font-bold mb-6">Available Donations</h2>
          <div className="space-y-4">
            {donations.map(donation => (
              <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-charcoal-dark rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-fresh/20 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-brand-dark" />
                  </div>
                  <div>
                    <div className="font-semibold">{donation.foodName}</div>
                    <div className="text-sm text-gray-500">{donation.quantity} • {donation.mealCount} meals</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getUrgencyBadge(donation.urgency)}
                  <div className="text-right">
                    <div className="text-sm font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {donation.distance || '2.1 km'}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Expires in 3h 20m
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm">View</Button>
                    <Button size="sm">Request</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === 'demand' && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-6">Today's Demand</h2>
          <div className="space-y-4">
            {[
              { name: 'Rice', demand: 'HIGH', amount: '250 kg' },
              { name: 'Vegetables', demand: 'MEDIUM', amount: '120 kg' },
              { name: 'Fruits', demand: 'HIGH', amount: '80 kg' },
              { name: 'Packaged Food', demand: 'LOW', amount: '50 kg' },
            ].map(item => (
              <div key={item.name} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-charcoal-dark rounded-xl">
                <span className="font-medium">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{item.amount}</span>
                  <Badge variant={item.demand === 'HIGH' ? 'danger' : item.demand === 'MEDIUM' ? 'warning' : 'success'}>
                    {item.demand}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default NgoDashboard;
