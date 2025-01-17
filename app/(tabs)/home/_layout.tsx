import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Slot } from 'expo-router';

export default function ReviewsLayout() {
  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navbar}>
        <Link href="/(tabs)/home/all-reviews" style={styles.link}>
          <Text style={styles.linkText}>All Reviews</Text>
        </Link>
        <Link href="/(tabs)/home/followed-reviews" style={styles.link}>
          <Text style={styles.linkText}>Followed Reviews</Text>
        </Link>
      </View>

      {/* Render the selected screen */}
      <View style={styles.content}>
        <Slot />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#841584',
  },
  link: {
    padding: 10,
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
