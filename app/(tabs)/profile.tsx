import React from 'react';
import { Link, Redirect } from 'expo-router';
import { useSession } from '@/contexts/AuthContext';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function ProfileScreen() {
  const { session } = useSession(); // Access the user's session

  // Dynamically redirect based on the session status
  if (session) {
    return (
        <View>
            <Text>This is your Profile</Text>
        </View>
    );
  } else {
    return (
        <View>
        <View>You must log in first.</View>
        <Link href='/home'>Back to home</Link>
        </View>
    );
  }
}
