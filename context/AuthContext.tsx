// src/context/authContext.tsx (or wherever you prefer to put contexts)
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/src/config/firebaseConfig'; // Adjust this path if needed!
import { useRouter, useSegments } from 'expo-router'; // Import useRouter and useSegments

interface AuthContextType {
  user: User | null;
  loading: boolean; // Add a loading state for initial auth check
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start as true

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Auth state checked, set loading to false
    });
    return unsubscribe; // Cleanup subscription on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// This is a crucial hook for Expo Router to handle redirects based on auth state
export function useProtectedRoute(user: User | null, loading: boolean) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!loading) { // Only run once authentication state is determined
      const inAuthGroup = segments[0] === '(auth)';

      if (user && inAuthGroup) {
        // User is signed in, redirect away from auth pages to tabs
        router.replace('/(tabs)');
      } else if (!user && !inAuthGroup) {
        // User is not signed in, redirect to auth pages
        router.replace('./(auth)/login'); // Or whatever your login screen path is
      }
    }
  }, [user, loading, segments]); // Re-run when user, loading, or segments change
}