import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_NOTIFICATIONS } from '../data/mock';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(not => ({ ...not, read: true })));
  };

  const markNotificationAsRead = (id) => {
    setNotifications(prev => prev.map(not => not.id === id ? { ...not, read: true } : not));
  };

  const addNotification = (not) => {
    setNotifications(prev => [
      {
        id: `not_${Date.now()}`,
        time: "Just now",
        read: false,
        ...not
      },
      ...prev
    ]);
  };

  return (
    <AppContext.Provider value={{
      theme,
      setTheme,
      toggleTheme,
      notifications,
      markAllNotificationsAsRead,
      markNotificationAsRead,
      addNotification,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isNotificationsDrawerOpen,
      setIsNotificationsDrawerOpen
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
