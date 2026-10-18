import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, TrendingUp, CheckCircle2, Clock, AlertTriangle,
  MapPin, ArrowRight, Zap, Activity, BarChart3, Calendar,
  ClipboardList, Search
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { donationService } from '../../services/mockServices';

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await donationService.getDonations();
      setDonations(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Total Donations', value: donations.length, icon: Package, color: 'text-blue-500' },
    { label: 'Active', value: donations.filter(d => d.status === 'Active' || d.status === 'Matched').length, icon: Activity, color: 'text-green-500' },
    { label: 'Completed', value: donations.filter(d => d.status === 'Delivered').length, icon: CheckCircle2, color: 'text-brand-dark' },
    { label: 'Food Saved', value: `${donations.reduce((acc, d) => acc + (parseInt(d.mealCount) || 0), 0)} meals`, icon: BarChart3, color: 'text-amber-500' },
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-dark" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Adarsh 👋</h1>
          <p className="text-gray-500">Your impact is growing.</p>
        </div>
        <Link to="/donor/donations">
          <Button>
            <Zap className="mr-2 w-4 h-4" />
            Create Donation
          </Button>
        </Link>
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

      {/* Recent Donations */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Recent Donations</h2>
          <Link to="/donor/donations" className="text-sm text-brand-dark hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {donations.slice(0, 5).map((donation, i) => (
            <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-charcoal-dark rounded-xl hover:bg-gray-100 dark:hover:bg-charcoal-medium/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-fresh/20 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-brand-dark" />
                </div>
                <div>
                  <div className="font-semibold">{donation.foodName}</div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> {donation.quantity} • {donation.category}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {getUrgencyBadge(donation.urgency)}
                <Badge variant={donation.status === 'Delivered' ? 'success' : 'info'}>
                  {donation.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Links */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card hover className="p-6 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-brand-dark" />
            <span className="font-bold">AI Urgency Analysis</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Check the urgency score and freshness analysis of your donations.</p>
          <Link to="/donor/urgency" className="text-sm text-brand-dark hover:underline flex items-center gap-1">
            View Analysis <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
        <Card hover className="p-6 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-6 h-6 text-brand-dark" />
            <span className="font-bold">Impact Analytics</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Track your donation history, meals contributed, and food saved over time.</p>
          <Link to="/donor/analytics" className="text-sm text-brand-dark hover:underline flex items-center gap-1">
            View Reports <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
        <Card hover className="p-6 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="w-6 h-6 text-brand-dark" />
            <span className="font-bold">Schedule Pickup</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">Coordinate preferred pickup time and volunteer availability.</p>
          <Link to="/donor/donations" className="text-sm text-brand-dark hover:underline flex items-center gap-1">
            Manage Pickups <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default DonorDashboard;
