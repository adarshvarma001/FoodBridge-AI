import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Clock, MapPin, Calendar, AlertTriangle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { donationService } from '../../services/mockServices';

const CreateDonation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const [formData, setFormData] = useState({
    foodName: '',
    category: 'Prepared Meals',
    quantity: '',
    mealCount: '',
    prepTime: '',
    storageCondition: 'Refrigerated',
    packaging: 'Sealed Containers',
    foodAge: 'Fresh',
    remainingUsableHours: '8',
    pickupAddress: '',
    city: '',
    location: '',
    pickupDeadline: '',
    preferredPickupTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const newDonation = await donationService.createDonation(formData, user);
    setResult(newDonation);
    setLoading(false);
    setCurrentStep(5); // Review/Result step
  };

  const urgencyColors = {
    HIGH: 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400',
    MEDIUM: 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-400',
    LOW: 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Package className="w-5 h-5" /> Food Information</h3>
            <input name="foodName" value={formData.foodName} onChange={handleChange} placeholder="Food Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none focus:ring-2 focus:ring-brand-dark/30" required />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none">
              <option>Prepared Meals</option>
              <option>Vegetables & Fruits</option>
              <option>Bakery Products</option>
              <option>Dairy & Packaged</option>
            </select>
            <div className="grid grid-cols-2 gap-4">
              <input name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity (kg)" type="number" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
              <input name="mealCount" value={formData.mealCount} onChange={handleChange} placeholder="Meal Count" type="number" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            </div>
            <input name="prepTime" value={formData.prepTime} onChange={handleChange} type="datetime-local" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            <div className="flex justify-end">
              <Button onClick={nextStep}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><Clock className="w-5 h-5" /> Food Condition</h3>
            <select name="storageCondition" value={formData.storageCondition} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none">
              <option>Refrigerated</option>
              <option>Frozen</option>
              <option>Ambient</option>
              <option>Hot Hold</option>
            </select>
            <input name="packaging" value={formData.packaging} onChange={handleChange} placeholder="Packaging Type" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            <input name="foodAge" value={formData.foodAge} onChange={handleChange} placeholder="Food Age" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            <input name="remainingUsableHours" value={formData.remainingUsableHours} onChange={handleChange} placeholder="Remaining Usable Hours" type="number" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button onClick={nextStep}>Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2"><MapPin className="w-5 h-5" /> Pickup Details</h3>
            <input name="pickupAddress" value={formData.pickupAddress} onChange={handleChange} placeholder="Pickup Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" required />
            <div className="grid grid-cols-3 gap-4">
              <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location/ZIP" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
              <input name="pickupDeadline" value={formData.pickupDeadline} onChange={handleChange} type="datetime-local" className="px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            </div>
            <input name="preferredPickupTime" value={formData.preferredPickupTime} onChange={handleChange} placeholder="Preferred Pickup Time" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-charcoal-medium bg-white dark:bg-charcoal-darker outline-none" />
            <div className="flex justify-between">
              <Button variant="secondary" onClick={prevStep}><ArrowLeft className="mr-2 w-4 h-4" /> Back</Button>
              <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Donation'}</Button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Donation Submitted!</h3>
              <p className="text-gray-500">ID: {result?.id}</p>
            </div>

            {result?.urgency && (
              <Card className="bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  <h4 className="font-bold">AI ANALYSIS</h4>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-4 py-2 rounded-full font-bold ${urgencyColors[result.urgency]}`}>{result.urgency} URGENCY</span>
                  <span className="text-2xl font-bold">{result.urgencyScore}%</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Recommended action: Pickup within 2 hours.</p>
                <div className="space-y-2">
                  <div className="text-xs font-medium">Why?</div>
                  {result.urgencyFactors.map((factor, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs w-32">{factor.name}</span>
                      <div className="flex-1 h-2 bg-gray-200 dark:bg-charcoal-medium rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full" style={{ width: `${factor.percentage}%` }} />
                      </div>
                      <span className="text-xs">{factor.percentage}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="secondary" onClick={() => navigate('/donor/dashboard')}>Back to Dashboard</Button>
              <Button onClick={() => navigate('/donor/donations')}>View All Donations <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create Donation</h1>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 5].map(step => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${currentStep >= step ? 'bg-brand-dark text-white' : 'bg-gray-200 dark:bg-charcoal-medium text-gray-500'}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <Card className="p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default CreateDonation;
