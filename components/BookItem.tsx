import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { BookType } from '@/types';

interface MyProps {
    book: BookType;
}

export default function BookItem({book}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/books/[id]',
                params: { id: book._id }
            }}><Text>{book.title}</Text></Link>
            <Text>{book.author}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16
      }
});