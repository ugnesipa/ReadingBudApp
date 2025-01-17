import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ReviewTypeID, ReviewType } from '@/types';
import ReviewItem from '@/components/ReviewItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useSession } from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';
import { UserTypeID } from '@/types';

interface FollowedUser {
  _id: string;
  full_name: string;
  reviews: ReviewTypeID[]; // Type for reviews from followed users
}

export default function FollowedReviews() {
  const { session } = useSession();
  console.log('Session:', session);
  const [reviews, setReviews] = useState<ReviewTypeID[]>([]);

  useEffect(() => {
    if (session && session.userId) {
      axios
        .get(`http://localhost:3000/api/users/${session.userId}`)
        .then((response) => {
          console.log('API Response:', response.data);
  
          const userData = response.data.data;
  
          // Flatten and enrich reviews with user details
          const followedReviews = userData.following.flatMap((followedUser: UserTypeID['following'][number]) => 
            followedUser.reviews.map((review: UserTypeID['following'][number]['reviews'][number]) => ({
              ...review,
              user: {
                _id: followedUser._id,
                full_name: followedUser.full_name,
              },
            }))
          );
  
          console.log('Extracted Reviews:', followedReviews);
          setReviews(followedReviews);
        })
        .catch((error) => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [session]);
  

  if (!session) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to see reviews from followed users.</Text>
        <AuthButtons />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AuthButtons />
      {reviews.length > 0 ? (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
          <FlatList
  data={reviews}
  renderItem={({ item }) => {
    console.log('Rendering Review:', item);
    return <ReviewItem review={item} />;
  }}
  keyExtractor={(review: ReviewTypeID) => review._id}
/>
          </SafeAreaView>
        </SafeAreaProvider>
      ) : (
        <Text>No Reviews Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});
