import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { UserType } from '@/types';

interface MyProps {
    book: UserType;
}

export default function UserItem({user}: MyProps){
    return (
        <View style={styles.item}>
            <Link href={{
                pathname: '/users/[id]',
                params: { id: user._id }
            }}><Text>{user.full_name}</Text></Link>
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