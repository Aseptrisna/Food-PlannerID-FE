import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';
import type { User, LoginCredentials, RegisterCredentials } from '../types/user.types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = authService.getToken();
        const savedUser = authService.getUser();

        if (token && savedUser) {
          // Verify token is still valid by fetching profile
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } catch (error) {
        // Token invalid, clear storage
        authService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await authService.login(credentials);
      authService.saveToken(response.access_token);
      authService.saveUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const response = await authService.register(credentials);
      authService.saveToken(response.access_token);
      authService.saveUser(response.user);
      setUser(response.user);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      authService.saveUser(profile);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
