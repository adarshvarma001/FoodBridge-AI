import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = false,
  padding = 'p-6',
  delay = 0,
  animate = true,
  ...props
}) => {
  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 15 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : false}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.5, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 dark:border-slate-800/60 ${padding} ${hover ? 'hover:-translate-y-1 hover:border-emerald-500/30' : ''
        } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
