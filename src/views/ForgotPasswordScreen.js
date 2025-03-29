// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { colors, dimensions, fontSizes } from '../styles/constants';

// const ForgotPasswordScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');

//   const handleResetPassword = async () => {
//     if (!email) {
//       Alert.alert('Error', 'Please enter your email address.');
//       return;
//     }

//     try {
//       await auth().sendPasswordResetEmail(email);
//       Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
//       navigation.goBack(); // Go back to the login screen
//     } catch (error) {
//       console.error('Password Reset Failed:', error.message); // Debugging
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.container}>
//         <View style={styles.headingContainer}>
//           <Text style={styles.heading}>Forgot Password</Text>
//         </View>

//         <View style={styles.mainContainer}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>Email</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />
//           </View>

//           <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
//             <Text style={styles.resetButtonText}>Reset Password</Text>
//           </TouchableOpacity>

//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>Remember your password? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={styles.loginLink}>Login</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollViewContent: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '18%',
//     marginBottom: '5%',
//   },
//   heading: {
//     fontSize: fontSizes.fontXXXLarge,
//     fontWeight: 'bold',
//     color: '#3B82F6',
//   },
//   mainContainer: {
//     width: '100%',
//     paddingHorizontal: dimensions.paddingLevel5,
//   },
//   text1: {
//     fontSize: fontSizes.fontMediumPlus,
//     color: colors.black,
//   },
//   inputContainer: {
//     marginBottom: '6%',
//     marginTop: '10%',
//   },
//   input: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     fontSize: fontSizes.fontMidMedium,
//     paddingVertical: 5,
//     color: colors.black,
//   },
//   resetButton: {
//     backgroundColor: '#3B82F6',
//     width: '100%',
//     borderRadius: 12,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: '23%',
//   },
//   resetButtonText: {
//     color: 'white',
//     fontSize: fontSizes.fontLarge,
//     fontWeight: 'bold',
//   },
//   loginContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '9%',
//   },
//   loginText: {
//     color: colors.black,
//     fontSize: fontSizes.fontMidMedium,
//   },
//   loginLink: {
//     color: '#37B47E',
//     fontSize: fontSizes.fontMidMedium,
//     fontWeight: 'bold',
//   },
// });

// export default ForgotPasswordScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Success', 'Password reset email sent. Please check your inbox.');
      navigation.goBack();
    } catch (error) {
      console.error('Password Reset Failed:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Forgot Password</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#6B7280"
          />

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
    backgroundColor: '#F7FAFC', // Light gray-blue from HomeScreen
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#10B981', // Green from HomeScreen
    paddingTop: 50,
    paddingBottom: 45,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 35,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280', // Muted gray from HomeScreen
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#111827', // Dark gray from HomeScreen
    marginBottom: 25,
  },
  resetButton: {
    backgroundColor: '#10B981', // Green from HomeScreen
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981', // Green from HomeScreen
  },
});

export default ForgotPasswordScreen;