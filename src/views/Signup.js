// import React, { useState } from 'react';
// import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import ButtonComponent from '../components/ButtonComponent';
// import auth from '@react-native-firebase/auth';
// import { colors, dimensions, fontSizes } from '../styles/constants';

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
//       await auth().createUserWithEmailAndPassword(email, password);
//       console.log('User created successfully!'); // Debugging
//       Alert.alert('Success', 'User created successfully!');
//       setTimeout(() => {
//         navigation.navigate('Login');
//       }, 1000); // 1-second delay
//     } catch (error) {
//       console.error('Signup Failed:', error.message); // Debugging
//       Alert.alert('Signup Failed', error.message);
//     }
//   };

//   const customStyles = {
//     backgroundColor: 'black',
//     width: dimensions.widthLevel13,
//     borderRadius: 12,
//     textHeight: fontSizes.fontLarge,
//     marginTop: '23%',
//     color: 'white',
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

//           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '9%', justifyContent: 'center' }}>
//             <Text style={{ color: colors.black, fontSize: fontSizes.fontMidMedium }}>Already have an account? </Text>
//             <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//               <Text style={{ color: '#37B47E', fontSize: fontSizes.fontMidMedium, fontWeight: 'bold' }}>Login</Text>
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
//   text1: {
//     fontSize: fontSizes.fontMediumPlus,
//     color: colors.black,
//   },
//   mainContainer: {
//     width: '100%',
//     paddingHorizontal: dimensions.paddingLevel5,
//   },
//   heading: {
//     fontSize: fontSizes.fontXXXLarge,
//     marginBottom: '2%',
//     fontWeight: 'bold',
//     color: colors.black,
//   },
//   inputContainer: {
//     marginBottom: '6%',
//     marginTop: '10%',
//   },
//   input: {
//     width: '100%',
//     fontSize: fontSizes.fontMidMedium,
//     borderBottomWidth: 1,
//     borderBottomColor: 'gray',
//     color: colors.black,
//   },
// });

// export default Signup;

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
//       await auth().createUserWithEmailAndPassword(email, password);
//       console.log('User created successfully!');
//       Alert.alert('Success', 'User created successfully!');
//       setTimeout(() => navigation.navigate('Login'), 1000);
//     } catch (error) {
//       console.error('Signup Failed:', error.message);
//       Alert.alert('Signup Failed', error.message);
//     }
//   };

//   const customStyles = {
//     backgroundColor: '#3B82F6', // Vibrant Blue for button
//     width: '100%', // Adjusted from dimensions.widthLevel13 to match Login
//     borderRadius: 12,
//     textHeight: 20, // Assuming fontSizes.fontLarge is ~20
//     marginTop: '20%',
//     color: '#F5F5F5', // Light Gray text
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

//           <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '9%', justifyContent: 'center' , marginBottom:'8%'}}>
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
//     backgroundColor: '#F5F5F5', // Light Gray background
//   },
//   headingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: '18%',
//     marginBottom: '5%',
//   },
//   text1: {
//     fontSize: 18, // Assuming fontSizes.fontMediumPlus is ~18
//     color: '#333333', // Dark Gray for labels
//   },
//   mainContainer: {
//     width: '100%',
//     paddingHorizontal: 20, // Assuming dimensions.paddingLevel5 is ~20
//   },
//   heading: {
//     fontSize: 32, // Assuming fontSizes.fontXXXLarge is ~32
//     marginBottom: '2%',
//     fontWeight: 'bold',
//     color: '#3B82F6', // Vibrant Blue for heading
//   },
//   inputContainer: {
//     marginBottom: '6%',
//     marginTop: '10%',
//   },
//   input: {
//     width: '100%',
//     fontSize: 16, // Assuming fontSizes.fontMidMedium is ~16
//     borderBottomWidth: 1,
//     borderBottomColor: '#333333', // Dark Gray for input underline
//     color: '#333333', // Dark Gray text
//   },
// });

// export default Signup;

import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import auth from '@react-native-firebase/auth';

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !phone || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      // Update the user's displayName with the entered name
      await userCredential.user.updateProfile({
        displayName: name,
      });
      console.log('User created successfully with name:', name);
      Alert.alert('Success', 'User created successfully!');
      setTimeout(() => navigation.navigate('Login'), 1000);
    } catch (error) {
      console.error('Signup Failed:', error.message);
      Alert.alert('Signup Failed', error.message);
    }
  };

  const customStyles = {
    backgroundColor: '#3B82F6',
    width: '100%',
    borderRadius: 12,
    textHeight: 20,
    marginTop: '20%',
    color: '#F5F5F5',
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Sign Up</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.text1}>Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

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

          <View style={styles.inputContainer}>
            <Text style={styles.text1}>Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.text1}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View style={{ alignItems: 'center' }}>
            <ButtonComponent
              text="Sign Up"
              onPress={handleSignup}
              customStyles={customStyles}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '9%', justifyContent: 'center', marginBottom: '8%' }}>
            <Text style={{ color: '#333333', fontSize: 16 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#10B981', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
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
    backgroundColor: '#F5F5F5',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '18%',
    marginBottom: '5%',
  },
  text1: {
    fontSize: 18,
    color: '#333333',
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 32,
    marginBottom: '2%',
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  inputContainer: {
    marginBottom: '6%',
    marginTop: '10%',
  },
  input: {
    width: '100%',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    color: '#333333',
  },
});

export default Signup;