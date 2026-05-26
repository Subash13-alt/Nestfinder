'use client';

import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Optional: Export individual hooks for specific auth actions
export function useUser() {
  const { user } = useAuth();
  return user;
}

export function useIsAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}

export function useIsAdmin() {
  const { isAdmin } = useAuth();
  return isAdmin;
}

export function useLogin() {
  const { login } = useAuth();
  return login;
}

export function useLogout() {
  const { logout } = useAuth();
  return logout;
}

export function useRegister() {
  const { register } = useAuth();
  return register;
}