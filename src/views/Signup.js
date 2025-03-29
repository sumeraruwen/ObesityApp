// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import ButtonComponent from '../components/ButtonComponent';
// import auth from '@react-native-firebase/auth';

// const Signup = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = async () => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }

//     try {
//       const userCredential = await auth().createUserWithEmailAndPassword(email, password);
//       // Update the user's displayName with the entered name
//       await userCredential.user.updateProfile({
//         displayName: name,
//       });
//       console.log('User created successfully with name:', name);
//       Alert.alert('Success', 'User created successfully!');
//       setTimeout(() => navigation.navigate('Login'), 1000);
//     } catch (error) {
//       console.error('Signup Failed:', error.message);
//       Alert.alert('Signup Failed', error.message);
//     }
//   };

//   const customStyles = {
//     backgroundColor: '#3B82F6',
//     width: '100%',
//     borderRadius: 12,
//     textHeight: 20,
//     marginTop: '20%',
//     color: '#F5F5F5',
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContent}>
//       <View style={styles.container}>
//         <View style={styles.headingContainer}>
//           <Text style={styles.heading}>Sign Up</Text>
//         </View>

//         <View style={styles.mainContainer}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>Name</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your name"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>

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

//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>Phone</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your phone number"
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//             />
//           </View>

//           <View style={styles.inputContainer}>
//             <Text style={styles.text1}>Password</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter your password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//           </View>

//           <View style={{ alignItems: 'center' }}>
//             <ButtonComponent
//               text="Sign Up"
//               onPress={handleSignup}
//               customStyles={customStyles}
//             />
//           </View>

//           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '9%', justifyContent: 'center', marginBottom: '8%' }}>
//             <Text style={{ color: '#333333', fontSize: 16 }}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={{ color: '#10B981', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
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
//     backgroundColor: '#F5F5F5',
//   },
//   headingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '18%',
//     marginBottom: '5%',
//   },
//   text1: {
//     fontSize: 18,
//     color: '#333333',
//   },
//   mainContainer: {
//     width: '100%',
//     paddingHorizontal: 20,
//   },
//   heading: {
//     fontSize: 32,
//     marginBottom: '2%',
//     fontWeight: 'bold',
//     color: '#3B82F6',
//   },
//   inputContainer: {
//     marginBottom: '6%',
//     marginTop: '10%',
//   },
//   input: {
//     width: '100%',
//     fontSize: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#333333',
//     color: '#333333',
//   },
// });

// export default Signup;

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/; // Assumes 10-digit phone number
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Minimum 6 characters
  };

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number.');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      await userCredential.user.updateProfile({ displayName: name });
      console.log('User created successfully with name:', name);
      Alert.alert('Success', 'User created successfully!');
      setTimeout(() => navigation.navigate('Login'), 1000);
    } catch (error) {
      console.error('Signup Failed:', error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Sign Up</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#6B7280"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            placeholderTextColor="#6B7280"
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#6B7280"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#6B7280"
          />

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
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
    paddingTop: 30,
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
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#10B981',
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
  signupButtonText: {
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
    color: '#10B981',
  },
});

export default Signup;