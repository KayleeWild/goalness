// app/(auth)/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig'; // Adjust path based on your project structure

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false); // New state to toggle between sign-in/sign-up

  const handleAuthAction = async () => {
    setLoading(true);
    try {
      if (isSigningUp) {
        // Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully! You are now signed in.');
      } else {
        // Sign In
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Signed in successfully!');
      }
      // useProtectedRoute will handle the redirect automatically now
    } catch (error: any) {
      // More user-friendly error messages based on Firebase error codes
      let errorMessage = error.message;
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already in use. Try signing in or use a different email.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters long.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      }
      Alert.alert('Authentication Error', errorMessage);
      console.error(`${isSigningUp ? "Sign Up" : "Sign In"} Error:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isSigningUp ? 'Sign Up' : 'Sign In'}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#999" // Added placeholder text color
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading} // Disable input when loading
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999" // Added placeholder text color
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!loading} // Disable input when loading
      />
      {loading ? (
        <ActivityIndicator size="large" color="#B37EAC" /> 
      ) : (
        <>
          <Button
            title={isSigningUp ? 'Create Account' : 'Sign In'}
            onPress={handleAuthAction}
            color="#B37EAC" // Example: use your theme color
          />
          <View style={styles.spacer} /> 
          <Button
            title={isSigningUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            onPress={() => setIsSigningUp(prev => !prev)} // Toggle between modes
            color="#666" // A slightly different color for the secondary action
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fdfdfd', // Ensure a contrasting background
  },
  title: {
    fontSize: 28, // Slightly larger for better prominence
    fontWeight: 'bold',
    marginBottom: 30, // More space below the title
    color: '#333', // Darker color for the title
  },
  input: {
    width: '90%', // Slightly wider input fields
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd', // Lighter border color
    borderRadius: 8, // More rounded corners
    marginBottom: 15, // More space between inputs
    backgroundColor: '#fff', // White background for inputs
    color: '#333', // Ensure input text is visible
    fontSize: 16,
  },
  buttonContainer: {
    // This style is no longer needed directly as we are rendering buttons directly
  },
  spacer: {
    height: 10, // Small spacer between buttons
  },
});

export default LoginScreen;