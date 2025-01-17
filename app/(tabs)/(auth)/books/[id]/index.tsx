import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { useLocalSearchParams } from 'expo-router';
import { useSession } from '@/contexts/AuthContext'; // Import the session hook

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { BookType } from '@/types';


export default function Tab() {
  const [book, setBook] = useState<BookType | null>(null);
  const { id } = useLocalSearchParams();
  const { session } = useSession(); // Retrieve the token from the session

  useEffect(() => {
    if (!session) {
      console.error('No token found. Please log in first.');
      return;
    }

    axios.get(`http://localhost:3000/api/books/${id}`, {
            headers: {
              Authorization: `Bearer ${session}`, // Use the dynamic token
            }
        })
         .then(response => {
            console.log(response.data);
            setBook(response.data);
         })
         .catch(e => {
            console.log(e);
         });

  }, [id]);

  if(!book) return <Text>Book not found</Text>
  
  return (
    <View style={styles.container}>
        <Text>{book.title}</Text>
        <Text>{book.author}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
