import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
  as: Component = 'button',
  to,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium tracking-wide rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30 active:scale-[0.98]",
    secondary: "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-sm hover:shadow",
    accent: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-md shadow-amber-500/20 hover:shadow-lg active:scale-[0.98]",
    danger: "bg-rose-500 hover:bg-rose-600 text-white font-bold shadow-md shadow-rose-500/20",
    ghost: "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800",
    link: "text-emerald-600 dark:text-emerald-400 hover:underline underline-offset-4 p-0 h-auto",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs font-semibold rounded-lg",
    md: "px-5 py-2.5 text-sm font-semibold rounded-xl",
    lg: "px-7 py-3.5 text-base font-bold rounded-xl",
    xl: "px-9 py-4 text-lg font-bold rounded-2xl",
  };

  const MotionComponent = motion[Component] || motion.button;

  return (
    <MotionComponent
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ y: disabled ? 0 : -1 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      type={Component === 'button' ? type : undefined}
      to={to}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

export default Button;
