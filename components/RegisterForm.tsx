import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { useSession } from '@/contexts/AuthContext';

interface RegisterFormProps {
  onSuccess: () => void; // Callback for successful login
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const { signIn } = useSession();

  const handleChange = (e: any) => {
    setForm(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const handlePress = () => {
    axios.post('http://localhost:3000/api/users/register', {
      full_name: form.full_name,
      email: form.email,
      password: form.password
    })
      .then(response => {
        signIn(response.data.token, response.data.userId);
        onSuccess(); // Close the modal
      })
      .catch(e => {
        setError(e.response?.data?.message || "An error occurred");
      });
  };

  return (
    <>
    <TextInput
        style={styles.input}
        placeholder='Username'
        value={form.full_name}
        onChange={handleChange}
        id='full_name'
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={form.email}
        onChange={handleChange}
        id='email'
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={form.password}
        onChange={handleChange}
        id='password'
      />
      <Text>{error}</Text>
      <Button 
        onPress={handlePress}
        title="Submit"
        color="#841584"
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10
  }
});
