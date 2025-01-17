import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import BookItem from '@/components/BookItem';

import { BookType, BookTypeID } from '@/types';

import { Link } from 'expo-router';

export default function Tab() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:3000/api/books')
         .then(response => {
          console.log(response.data);
          setBooks(response.data);
         })
         .catch(e => {
          console.log(e);
         });

  }, []);

  if(books.length === 0) return <Text>No Books found</Text>
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={books}
          renderItem={({item}) => <BookItem book={item} />}
          keyExtractor={(book: BookTypeID) => book._id}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
