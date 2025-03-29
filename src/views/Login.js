// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }
  
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(email, password);
//       const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();
  
//       if (!userDoc.exists || !userDoc.data()?.healthAssessment) {
//         navigation.reset({ index: 0, routes: [{ name: 'HealthAssessment' }] });
//       } else {
//         navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
//       }
//     } catch (error) {
//       console.error('Login Failed:', error.message);
//       Alert.alert('Login Failed', error.message);
//     }
//   };
  
//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.container}>
//         <View style={styles.headingContainer}>
//           <Text style={styles.heading}>Login</Text>
//         </View>

//         <View style={styles.mainContainer}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>E-mail</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//             />
//             <TouchableOpacity
//               style={styles.eyeIconContainer}
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.checkboxContainer}>
//             <TouchableOpacity
//               style={styles.checkbox}
//               onPress={() => setRememberMe(!rememberMe)}
//             >
//               {rememberMe ? <Text>✓</Text> : <Text>◻️</Text>}
//             </TouchableOpacity>
//             <Text style={styles.rememberText}>Remember Me</Text>
//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
//               <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
//             <Text style={styles.loginButtonText}>Login</Text>
//           </TouchableOpacity>

//           <View style={styles.signupContainer}>
//             <Text style={styles.signupText}>Don't have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//               <Text style={styles.signupLink}>Sign Up</Text>
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
//     backgroundColor: '#F5F5F5', // Light Gray background
//   },
//   headingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '18%',
//     marginBottom: '5%',
//   },
//   heading: {
//     fontSize: 32, // Assuming fontSizes.fontXXXLarge is ~32
//     fontWeight: 'bold',
//     color: '#3B82F6', // Vibrant Blue for heading
//   },
//   mainContainer: {
//     width: '100%',
//     paddingHorizontal: 20, // Assuming dimensions.paddingLevel5 is ~20
//   },
//   text1: {
//     fontSize: 18, // Assuming fontSizes.fontMediumPlus is ~18
//     color: '#333333', // Dark Gray for labels
//   },
//   inputContainer: {
//     marginBottom: '6%',
//     marginTop: '10%',
//   },
//   input: {
//     width: '100%',
//     borderBottomWidth: 1,
//     borderBottomColor: '#333333', // Dark Gray for input underline
//     fontSize: 16, // Assuming fontSizes.fontMidMedium is ~16
//     paddingVertical: 5,
//     color: '#333333', // Dark Gray text
//   },
//   eyeIconContainer: {
//     position: 'absolute',
//     right: 0,
//     bottom: 10,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: '8%',
//   },
//   checkbox: {
//     width: 17,
//     height: 17,
//     borderWidth: 1,
//     borderColor: '#37B47E', // Soft Green for checkbox
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: '3%',
//   },
//   rememberText: {
//     fontSize: 14, // Assuming fontSizes.fontMedium is ~14
//     marginRight: 'auto',
//     color: '#37B47E', // Soft Green for text
//     fontWeight: '500',
//   },
//   forgetPasswordText: {
//     fontSize: 14,
//     marginLeft: 'auto',
//     color: '#37B47E', // Soft Green for link
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: '#3B82F6', // Vibrant Blue for button
//     width: '100%',
//     borderRadius: 12,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: '23%',
//   },
//   loginButtonText: {
//     color: '#F5F5F5', // Light Gray text on button
//     fontSize: 20, // Assuming fontSizes.fontLarge is ~20
//     fontWeight: 'bold',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '9%',
//   },
//   signupText: {
//     color: '#333333', // Dark Gray for text
//     fontSize: 16, // Assuming fontSizes.fontMidMedium is ~16
//   },
//   signupLink: {
//     color: '#37B47E', // Soft Green for link
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Login;


import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();

      if (!userDoc.exists || !userDoc.data()?.healthAssessment) {
        navigation.reset({ index: 0, routes: [{ name: 'HealthAssessment' }] });
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'HomeScreen' }] });
      }
    } catch (error) {
      console.error('Login Failed:', error.message);
      Alert.alert('Login Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Login</Text>
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

          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#6B7280"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Icon name="check" size={12} color="#FFFFFF" />}
              </View>
              <Text style={styles.checkboxText}>Remember Me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
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
    backgroundColor: '#F7FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#10B981',
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
    paddingTop: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#111827',
    marginBottom: 25,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: 14,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkboxText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  loginButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signupText: {
    fontSize: 16,
    color: '#6B7280',
  },
  signupLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
});

export default Login;