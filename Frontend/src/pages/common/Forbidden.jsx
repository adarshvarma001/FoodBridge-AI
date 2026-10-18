import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const Forbidden = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ShieldAlert className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">403</h1>
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="text-gray-500 mb-8">You don't have permission to access this page.</p>
        <Link to="/">
          <Button variant="secondary">
            <ArrowLeft className="mr-2 w-4 h-4" /> Return to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Forbidden;
