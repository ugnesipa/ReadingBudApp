import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { ReviewType } from '@/types';

interface MyProps {
    review: ReviewType;
}

export default function ReviewItem({review}: MyProps){

    function formatISODate(isoDate) {
        const date = new Date(isoDate); // Convert ISODate to Date object
    
        // Extract date components
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
    
        // Extract time components
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Combine into the desired format
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
    const updatedAtFormatted = formatISODate(review.updatedAt);

    return (
        <View style={styles.item}>
            <Text style={styles.date}>{updatedAtFormatted}</Text>
            <Link href={{
                pathname: '/users/[id]',
                params: { id: review.user._id }
            }} style={styles.userlink}>
            <Text style={styles.fullname}>{review.user.full_name}</Text>
            </Link>
            <Link href={{
                pathname: '/reviews/[id]',
                params: { id: review._id }
            }} style={styles.reviewlink}><Text style={styles.title}>{review.title}</Text></Link>
            <Link href={{
                pathname: '/books/[id]',
                params: { id: review.book._id }
            }} style={styles.booklink}>
             <Text style={styles.book}>Book: {review.book.title} by {review.book.author}</Text>
             </Link>
                        <Text style={styles.rating}>Rating: {review.rating}/5</Text>

                        <Text>{review.text.length > 50 ? review.text.slice(0, 50) + '...' : review.text}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#eaeaea',
        padding: 20,
        marginVertical: 12,
        marginHorizontal: 16
      },
      fullname: {
        fontSize: 14,
        marginBottom: 15,
      },
      date: {
        fontSize: 10,
        color: 'gray',

      },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        rating: {
            fontSize: 14,
            color: 'orange',
            marginBottom: 15,

        },
        book: {
            fontSize: 14,
            color: 'gray',
            fontWeight: 'bold',
            marginBottom: 5,

        },
        reviewlink: {
            marginBottom: 5,
        },
        booklink: {
            marginBottom: 5,
        },
        userlink: {
            marginBottom: 10,
        }

});