'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticate, setSession, clearSession, getSession } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const session = getSession();
    setUser(session);
    setLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    const authenticatedUser = authenticate(email, password);
    if (authenticatedUser) {
      setUser(authenticatedUser);
      setSession(authenticatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    clearSession();
  };

  if (!loaded) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
