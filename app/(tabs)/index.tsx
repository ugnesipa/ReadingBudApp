import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';

export default function Home() {
  const { session } = useSession(); // Access the user's session

  // Dynamically redirect based on the session status
  if (session) {
    return <Redirect href="/(tabs)/home/followed-reviews" />;
  } else {
    return <Redirect href="/(tabs)/home/all-reviews" />;
  }
}
