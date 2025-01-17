import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'pink' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Feather name="book-open" size={28} color={color} />,
        }}
      /><Tabs.Screen
      name="reviews/index"
      options={{
        title: 'reviews',
        tabBarIcon: ({ color }) => <Feather name="book-open" size={28} color={color} />,
      }}
    />
      <Tabs.Screen
        name="books/index"
        options={{
          title: 'Books',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookshelf" size={24} color={color} />,
        }}
      />
      <Tabs.Screen 
        name='(auth)'
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name='home'
        options={{
          href: null
        }}
      />
      <Tabs.Screen 
        name='profile'
        options={{
          title: '',
          tabBarIcon: ({ color }) => <MaterialIcons name="person" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
