import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from 'axios';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [books, setBooks] = useState<{ title: string; _id: string }[]>([]);
  const [reviews, setReviews] = useState<{ title: string; _id: string }[]>([]);
  const [users, setUsers] = useState<{ full_name: string; _id: string }[]>([]);

  // Fetch books data from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/books')
      .then((response) => {
        console.log('Books:', response.data);
        setBooks(response.data);
      })
      .catch((e) => {
        console.log('Error fetching books:', e);
      });
  }, []);

  // Fetch users data from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users')
      .then((response) => {
        console.log('Users:', response.data);
        setUsers(response.data);
      })
      .catch((e) => {
        console.log('Error fetching users:', e);
      });
  }, []);

  // Fetch reviews data from the API
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/reviews')
      .then((response) => {
        console.log('Reviews:', response.data);
        setReviews(response.data);
      })
      .catch((e) => {
        console.log('Error fetching reviews:', e);
      });
  }, []);

  // Filter books, reviews, and users based on the search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredReviews = reviews.filter((review) =>
    review.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredUsers = users.filter((user) =>
    user.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render item for books, reviews, and users
  const renderItem = ({ item, type }: { item: { title?: string; full_name?: string; _id: string }, type: string }) => {
    let content = '';
    if (type === 'book') content = item.title || '';
    else if (type === 'review') content = item.title || '';
    else if (type === 'user') content = item.full_name || '';

    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.itemText}>{content}</Text>
      </TouchableOpacity>
    );
  };

  // Combine filtered data
  const combinedData = [
    ...filteredBooks.map((book) => ({ ...book, type: 'book' })),
    ...filteredReviews.map((review) => ({ ...review, type: 'review' })),
    ...filteredUsers.filter(user => typeof user === 'object').map(user => ({ ...user, type: 'user' })),
  ];

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search books, reviews, or users"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => renderItem({ item, type: item.type })}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchbar: {
    marginBottom: 20,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});
