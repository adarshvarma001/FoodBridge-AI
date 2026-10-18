import React from 'react';

const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
    warning: 'bg-amber-50 text-amber-700 border border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
    danger: 'bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
    info: 'bg-sky-50 text-sky-700 border border-sky-100 dark:bg-sky-500/10 dark:text-sky-400 dark:border-sky-500/20',
    teal: 'bg-teal-50 text-teal-700 border border-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/20',
    premium: 'bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold tracking-tight',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
