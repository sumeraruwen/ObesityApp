// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import auth from '@react-native-firebase/auth';
// import { colors, dimensions, fontSizes } from '../styles/constants';
// import firestore from '@react-native-firebase/firestore';
// const Login = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);


//   // const handleLogin = async () => {
//   //   if (!email || !password) {
//   //     Alert.alert('Error', 'Please fill in all fields.');
//   //     return;
//   //   }
  
//   //   try {
//   //     const userCredential = await auth().signInWithEmailAndPassword(email, password);
//   //     console.log('Login successful!', userCredential.user.uid); // Log the UID
  
//   //     // Wait for auth state to be fully established
//   //     auth().onAuthStateChanged((user) => {
//   //       if (user) {
//   //         Alert.alert(
//   //           'Success', 
//   //           'Logged in successfully!',
//   //           [
//   //             {
//   //               text: 'OK',
//   //               onPress: () => navigation.navigate('HealthAssessment')
//   //             }
//   //           ]
//   //         );
//   //       }
//   //     });
  
//   //   } catch (error) {
//   //     console.error('Login Failed:', error.message);
//   //     Alert.alert('Login Failed', error.message);
//   //   }
//   // };

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }
  
//     try {
//       const userCredential = await auth().signInWithEmailAndPassword(email, password);
      
//       // Check if user has completed health assessment
//       const userDoc = await firestore()
//         .collection('users')
//         .doc(userCredential.user.uid)
//         .get();
  
//       if (!userDoc.exists || !userDoc.data()?.healthAssessment) {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'HealthAssessment' }],
//         });
//       } else {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'HomeScreen' }],
//         });
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
//             {/* <Text style={styles.forgetPasswordText}>Forgot Password?</Text> */}
      
//             <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
//             <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
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
//     color: colors.black,
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
//     borderColor: '#37B47E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: '3%',
//   },
//   rememberText: {
//     fontSize: fontSizes.fontMedium,
//     marginRight: 'auto',
//     color: '#37B47E',
//     fontWeight: '500',
//   },
//   forgetPasswordText: {
//     fontSize: fontSizes.fontMedium,
//     marginLeft: 'auto',
//     color: '#37B47E',
//     fontWeight: '500',
//   },
//   loginButton: {
//     backgroundColor: 'black',
//     width: '100%',
//     borderRadius: 12,
//     padding: 15,
//     alignItems: 'center',
//     marginTop: '23%',
//   },
//   loginButtonText: {
//     color: 'white',
//     fontSize: fontSizes.fontLarge,
//     fontWeight: 'bold',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '9%',
//   },
//   signupText: {
//     color: colors.black,
//     fontSize: fontSizes.fontMidMedium,
//   },
//   signupLink: {
//     color: '#37B47E',
//     fontSize: fontSizes.fontMidMedium,
//     fontWeight: 'bold',
//   },
// });

// export default Login;


import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
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
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Login</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text1}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text1}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIconContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setRememberMe(!rememberMe)}
            >
              {rememberMe ? <Text>✓</Text> : <Text>◻️</Text>}
            </TouchableOpacity>
            <Text style={styles.rememberText}>Remember Me</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgetPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
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
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light Gray background
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18%',
    marginBottom: '5%',
  },
  heading: {
    fontSize: 32, // Assuming fontSizes.fontXXXLarge is ~32
    fontWeight: 'bold',
    color: '#3B82F6', // Vibrant Blue for heading
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20, // Assuming dimensions.paddingLevel5 is ~20
  },
  text1: {
    fontSize: 18, // Assuming fontSizes.fontMediumPlus is ~18
    color: '#333333', // Dark Gray for labels
  },
  inputContainer: {
    marginBottom: '6%',
    marginTop: '10%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Dark Gray for input underline
    fontSize: 16, // Assuming fontSizes.fontMidMedium is ~16
    paddingVertical: 5,
    color: '#333333', // Dark Gray text
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '8%',
  },
  checkbox: {
    width: 17,
    height: 17,
    borderWidth: 1,
    borderColor: '#37B47E', // Soft Green for checkbox
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '3%',
  },
  rememberText: {
    fontSize: 14, // Assuming fontSizes.fontMedium is ~14
    marginRight: 'auto',
    color: '#37B47E', // Soft Green for text
    fontWeight: '500',
  },
  forgetPasswordText: {
    fontSize: 14,
    marginLeft: 'auto',
    color: '#37B47E', // Soft Green for link
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#3B82F6', // Vibrant Blue for button
    width: '100%',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: '23%',
  },
  loginButtonText: {
    color: '#F5F5F5', // Light Gray text on button
    fontSize: 20, // Assuming fontSizes.fontLarge is ~20
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '9%',
  },
  signupText: {
    color: '#333333', // Dark Gray for text
    fontSize: 16, // Assuming fontSizes.fontMidMedium is ~16
  },
  signupLink: {
    color: '#37B47E', // Soft Green for link
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;