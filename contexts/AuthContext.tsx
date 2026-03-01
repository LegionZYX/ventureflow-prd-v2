'use client';

import React, { createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'fa' | 'broker';
}

const DEMO_USER: User = {
  id: '1',
  email: 'admin@ventureflow.com',
  name: 'FA Admin',
  role: 'admin',
};

interface AuthContextType {
  user: User;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Always assume logged in for demo - no loading, no auth check
  return (
    <AuthContext.Provider value={{
      user: DEMO_USER,
      login: () => {},
      logout: () => {},
      isAuthenticated: true,
      isLoading: false,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
