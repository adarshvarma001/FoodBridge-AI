import React from 'react';
import { motion } from 'framer-motion';
import { Users, Package, BarChart3, Bot, Truck, Heart } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '4,650+', icon: Users, color: 'text-blue-500' },
    { label: 'Donations', value: '2,340+', icon: Package, color: 'text-green-500' },
    { label: 'Food Saved', value: '12,480 kg', icon: Heart, color: 'text-red-500' },
    { label: 'Active Agents', value: '6', icon: Bot, color: 'text-brand-dark' },
    { label: 'NGO Partners', value: '184+', icon: Truck, color: 'text-purple-500' },
    { label: 'Platform Efficiency', value: '96.8%', icon: BarChart3, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="p-4 text-center">
              <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
