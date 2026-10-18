import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const RoleSelectionPage = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const userData = {
      role,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      password: formData.get('password'),
      address: formData.get('address'),
      city: formData.get('city'),
    };

    if (role === 'NGO') {
      userData.ngoName = formData.get('ngoName');
      userData.ngoType = formData.get('ngoType');
      userData.capacity = formData.get('capacity');
    }

    if (role === 'VOLUNTEER') {
      userData.vehicleType = formData.get('vehicleType');
      userData.preferredRadius = formData.get('radius');
    }

    const result = await register(userData);
    setLoading(false);
    if (result.success) {
      navigate(`/${role.toLowerCase()}/dashboard`);
    }
  };

  const renderForm = () => {
    switch (role) {
      case 'donor':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Organization Name</label>
              <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="e.g., The Grand Pavilion" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input name="address" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="Street address" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <input name="city" required placeholder="City" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" />
              <input name="state" required placeholder="State" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" />
              <input name="pincode" required placeholder="Pincode" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" />
            </div>
          </>
        );
      case 'ngo':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">NGO Name</label>
              <input name="ngoName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="e.g., Hope Feeding Foundation" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Registration Number</label>
              <input name="regNumber" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="NGO-12345" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">NGO Type</label>
              <select name="ngoType" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none">
                <option value="">Select type</option>
                <option value="Shelter">Shelter</option>
                <option value="Soup Kitchen">Soup Kitchen</option>
                <option value="Food Bank">Food Bank</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Daily Capacity (meals)</label>
              <input name="capacity" type="number" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="500" />
            </div>
          </>
        );
      case 'volunteer':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Vehicle Type</label>
              <select name="vehicleType" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none">
                <option value="">Select vehicle</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="E-Bike">E-Bike</option>
                <option value="Van">Van</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Radius (km)</label>
              <input name="radius" type="number" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="8" />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-cream dark:bg-charcoal-darkest">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-2 capitalize">{role} Registration</h2>
          <p className="text-sm text-gray-500 mb-6">Complete your profile to get started</p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="Adarsh" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input name="phone" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input name="confirmPassword" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker focus:ring-2 focus:ring-brand-dark/30 outline-none" />
              </div>
            </div>
            {renderForm()}
            <Button type="submit" className="w-full mt-6" disabled={loading}>
              {loading ? 'Creating Account...' : 'Complete Registration'}
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
};

export default RoleSelectionPage;
