'use client';

import { useEffect } from 'react';
import { useAuth } from '../lib/hooks.js';
import { validateToken } from '../lib/slices/authSlice.js';

export default function AuthInitializer() {
  const { dispatch, isAuthenticated } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated on app load
    const token = localStorage.getItem('token');
    if (token && !isAuthenticated) {
      dispatch(validateToken());
    }
  }, [dispatch, isAuthenticated]);

  return null; // This component doesn't render anything
}
