import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { ReviewType, ReviewTypeID } from '@/types';
import ReviewItem from '@/components/ReviewItem';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useSession } from '@/contexts/AuthContext';
import AuthButtons from '@/components/AuthButtons';

export default function AllReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
  
    axios.get('http://localhost:3000/api/reviews')
         .then(response => {
          setReviews(response.data);
         })
         .catch(e => {
          console.log(e);
         });
  
  }, []);
  

  return (
        <View style={styles.container}>
          <AuthButtons /> {/* Add AuthButtons at the top */}

          {reviews.length > 0 ? (
             <SafeAreaProvider>
             <SafeAreaView style={styles.container}>
               <FlatList
                 data={reviews}
                 renderItem={({item}) => <ReviewItem review={item} />}
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    }
});
