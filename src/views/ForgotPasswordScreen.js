import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import { colors, dimensions, fontSizes } from '../styles/constants';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
      navigation.goBack(); // Go back to the login screen
    } catch (error) {
      console.error('Password Reset Failed:', error.message); // Debugging
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Forgot Password</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text1}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Remember your password? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18%',
    marginBottom: '5%',
  },
  heading: {
    fontSize: fontSizes.fontXXXLarge,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: dimensions.paddingLevel5,
  },
  text1: {
    fontSize: fontSizes.fontMediumPlus,
    color: colors.black,
  },
  inputContainer: {
    marginBottom: '6%',
    marginTop: '10%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: fontSizes.fontMidMedium,
    paddingVertical: 5,
    color: colors.black,
  },
  resetButton: {
    backgroundColor: '#3B82F6',
    width: '100%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: '23%',
  },
  resetButtonText: {
    color: 'white',
    fontSize: fontSizes.fontLarge,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '9%',
  },
  loginText: {
    color: colors.black,
    fontSize: fontSizes.fontMidMedium,
  },
  loginLink: {
    color: '#37B47E',
    fontSize: fontSizes.fontMidMedium,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;