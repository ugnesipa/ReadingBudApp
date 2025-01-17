import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet } from 'react-native';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { useSession } from '@/contexts/AuthContext';

export default function AuthButtons() {
  const { session, signOut } = useSession(); // Access session and signOut from context
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false); // Close the modal upon successful login
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false); // Close the modal upon successful registration
  };

  return (
    <View>
      {session ? (
        <Button onPress={signOut} title="Logout" color="#841584" />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <Button
            onPress={() => setShowLogin(true)}
            title="Login"
            color="#841584"
          />
          <Button
            onPress={() => setShowRegister(true)}
            title="Register"
            color="#841584"
          />
        </View>
      )}

      {/* Login Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLogin}
        onRequestClose={() => setShowLogin(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            <LoginForm onSuccess={handleLoginSuccess} />
            <Button onPress={() => setShowLogin(false)} title="Close" color="grey" />
          </View>
        </View>
      </Modal>

      {/* Register Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showRegister}
        onRequestClose={() => setShowRegister(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Register</Text>
            <RegisterForm onSuccess={handleRegisterSuccess} />
            <Button onPress={() => setShowRegister(false)} title="Close" color="grey" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
