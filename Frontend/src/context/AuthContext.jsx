import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../data/mock';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // Mimic API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    // Simple email-based lookup inside mock users
    const matchedUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (matchedUser) {
      setUser(matchedUser);
      localStorage.setItem('auth_user', JSON.stringify(matchedUser));
      setLoading(false);
      return { success: true, user: matchedUser };
    } else {
      setLoading(false);
      return { success: false, message: "Invalid email or password combination." };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const newUser = {
      id: `usr_${userData.role.toLowerCase()}_${Date.now()}`,
      joinedDate: new Date().toISOString().split('T')[0],
      profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      ...userData
    };

    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setLoading(false);
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  const updateProfile = async (profileData) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const updatedUser = { ...user, ...profileData };
    setUser(updatedUser);
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    setLoading(false);
    return { success: true, user: updatedUser };
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      updateProfile,
      isAuthenticated: !!user,
      role: user?.role || null
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
