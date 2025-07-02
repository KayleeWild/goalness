// app/(auth)/login.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, AuthError, signInWithCredential } from 'firebase/auth';
import { auth } from '../../src/config/firebaseConfig'; // Adjust path based on your project structure

import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false); // New state to toggle between sign-in/sign-up

  const googleWebClientId = Constants.expoConfig?.extra?.googleWebClientId;
  const facebookAppId = Constants.expoConfig?.extra?.facebookAppId;

  const [requestGoogle, responseGoogle, promptAsyncGoogle] = Google.useAuthRequest(
    {
      clientId: googleWebClientId,
      scopes: ['profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        native: 'goalness://redirect',
      }),
    }
  );

  const [requestFacebook, responseFacebook, promptAsyncFacebook] = Facebook.useAuthRequest(
    {
      clientId: facebookAppId,
      scopes: ['public_profile', 'email'],
      redirectUri: AuthSession.makeRedirectUri({
        native: 'goalness://redirect'
      }),
    }
  );

  useEffect(() => {
    if (responseGoogle?.type === 'success') {
      const { id_token, access_token } = responseGoogle.authentication as { id_token?: string; access_token?: string };

      if (id_token) {
        setLoading(true);
        const credential = GoogleAuthProvider.credential(id_token, access_token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('Google user signed in:', userCredential.user.email);
            Alert.alert('Success', `Signed in with Google as ${userCredential.user.email}!`);
          })
          .catch((error) => {
            handleAuthError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        Alert.alert('Authentication Error', 'Google ID Token missing. Could not sign in.');
      }
    } else if (responseGoogle?.type === 'cancel') {
      Alert.alert('Login Cancelled', 'Google sign-in was cancelled.');
    } else if (responseGoogle?.type === 'error') {
      Alert.alert('Google Sign-In Error', `An error occured: ${responseGoogle.error?.message || 'Unknown error'}`);
    }
  }, [responseGoogle]);

  useEffect(() => {
    if (responseFacebook?.type === 'success') {
      const { access_token } = responseFacebook.authentication as { access_token?: string };

      if (access_token) {
        setLoading(true);
        const credential = FacebookAuthProvider.credential(access_token);
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            console.log('Facebook user signed in:', userCredential.user.email);
            Alert.alert('Success', `Signed in with Facebook as ${userCredential.user.email}!`);
          })
          .catch((error) => {
            handleAuthError(error);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        Alert.alert('Authentication Error', 'Facebook Access Token missing. Could not sign in.');
      }
    } else if (responseFacebook?.type === 'cancel') {
      Alert.alert('Login Cancelled', 'Facebook sign-in was cancelled.');
    } else if (responseFacebook?.type === 'error') {
      Alert.alert('Facebook Sign-In Error', `An error occured: ${responseFacebook.error?.message || 'Unknown error'}`);
    }
  }, [responseFacebook]);

  // const googleProvider = new GoogleAuthProvider();
  // const facebookProvider = new FacebookAuthProvider();

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
      // let errorMessage = error.message;
      // if (error.code === 'auth/email-already-in-use') {
      //   errorMessage = 'This email is already in use. Try signing in or use a different email.';
      // } else if (error.code === 'auth/invalid-email') {
      //   errorMessage = 'The email address is not valid.';
      // } else if (error.code === 'auth/weak-password') {
      //   errorMessage = 'Password should be at least 6 characters long.';
      // } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      //   errorMessage = 'Invalid email or password.';
      // }
      // Alert.alert('Authentication Error', errorMessage);
      // console.error(`${isSigningUp ? "Sign Up" : "Sign In"} Error:`, error);
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!requestGoogle) {
      Alert.alert("Error", "Google login is not ready. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await promptAsyncGoogle();
    } catch (error: any) {
      handleAuthError(error);
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    if (!requestFacebook) {
      Alert.alert("Error", "Facebook login is not ready. Please try again.");
      return;
    }
    setLoading(true);
    try {
      await promptAsyncFacebook();
    } catch (error: any) {
      handleAuthError(error);
      setLoading(false);
    }
  };

  const handleAuthError = (error: any) => {
    let errorMessage = error.message;

    if (error.code) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use. Try signing in or use a different email.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'The email address is not valid.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/popup-closed-by-user':
          errorMessage = 'Login cancelled by the user.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Another login request is already in progress.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password or social sign-in is not enabled in Firebase project settings.';
          break;
        case 'auth/account-exists-with-different-credential':
          // This is the important one for linking!
          errorMessage = 'An account with this email already exists using a different sign-in method. Please sign in with your existing method.';
          // For a more advanced UX, you would store `error.credential` and the `error.customData.email`
          // Then prompt the user to sign in with their existing method (e.g., email/password)
          // and then call `linkWithCredential(user, pendingCredential)` to link the accounts.
          // This is beyond a simple implementation but is crucial for a smooth user experience.
          break;
        default:
          errorMessage = `Authentication error: ${error.message}`;
          break; 
      }
    } else {
      console.warn("Non-Firebase error during auth:", error);
      errorMessage = `An unexpected error occurred: ${errorMessage}`;
    }

    Alert.alert('Authentication Error', errorMessage);
    console.error(`${isSigningUp ? " Sign Up" : "Sign In"} Error:`, error);
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

          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn} disabled={!requestGoogle}>
            <Image source={require('@/assets/images/google-icon.png')} style = {styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn} disabled={!requestFacebook}>
            <Image source={require('@/assets/images/facebook-icon.png')} style = {styles.socialIcon} />
            <Text style={styles.socialButtonText}>Sign in with Facebook</Text>
          </TouchableOpacity>

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
  socialButton: {
    flexDirection: 'row', // Arrange icon and text horizontally
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // White background for social buttons
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '90%',
    marginBottom: 15,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  socialButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  spacer: {
    height: 10, // Small spacer between buttons
  },
});

export default LoginScreen;