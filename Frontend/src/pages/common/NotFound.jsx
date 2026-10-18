import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchX, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <SearchX className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-8">The page you are looking for does not exist.</p>
        <Link to="/">
          <Button variant="secondary">
            <ArrowLeft className="mr-2 w-4 h-4" /> Go Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
