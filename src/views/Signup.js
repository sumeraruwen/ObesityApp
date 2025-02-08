// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';

// const Signup = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSignup = () => {
//     if (!name || !email || !phone || !password) {
//       Alert.alert('Error', 'Please fill in all fields.');
//       return;
//     }
//     Alert.alert('Success', 'User created successfully!');
//     navigation.navigate('Login');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Sign Up</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         value={phone}
//         onChangeText={setPhone}
//         keyboardType="phone-pad"
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Sign Up" onPress={handleSignup} />
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   link: {
//     color: 'blue',
//     marginTop: 20,
//     textAlign: 'center',
//   },
// });

// export default Signup;

// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
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
//       Alert.alert('Success', 'User created successfully!');
//       navigation.navigate('Login');
//     } catch (error) {
//       Alert.alert('Signup Failed', error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Sign Up</Text>
//       <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
//       <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
//       <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
//       <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
//       <Button title="Sign Up" onPress={handleSignup} />
//       <TouchableOpacity onPress={() => navigation.navigate('Login')}>
//         <Text style={styles.link}>Already have an account? Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20 },
//   heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, borderRadius: 5 },
//   link: { color: 'blue', marginTop: 20, textAlign: 'center' },
// });

// export default Signup;


import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';
import auth from '@react-native-firebase/auth';
import { colors, dimensions, fontSizes } from '../styles/constants';

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
      await auth().createUserWithEmailAndPassword(email, password);
      console.log('User created successfully!'); // Debugging
      Alert.alert('Success', 'User created successfully!');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000); // 1-second delay
    } catch (error) {
      console.error('Signup Failed:', error.message); // Debugging
      Alert.alert('Signup Failed', error.message);
    }
  };

  const customStyles = {
    backgroundColor: 'black',
    width: dimensions.widthLevel13,
    borderRadius: 12,
    textHeight: fontSizes.fontLarge,
    marginTop: '23%',
    color: 'white',
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

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: '9%', justifyContent: 'center' }}>
            <Text style={{ color: colors.black, fontSize: fontSizes.fontMidMedium }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={{ color: '#37B47E', fontSize: fontSizes.fontMidMedium, fontWeight: 'bold' }}>Login</Text>
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
  text1: {
    fontSize: fontSizes.fontMediumPlus,
    color: colors.black,
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: dimensions.paddingLevel5,
  },
  heading: {
    fontSize: fontSizes.fontXXXLarge,
    marginBottom: '2%',
    fontWeight: 'bold',
    color: colors.black,
  },
  inputContainer: {
    marginBottom: '6%',
    marginTop: '10%',
  },
  input: {
    width: '100%',
    fontSize: fontSizes.fontMidMedium,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: colors.black,
  },
});

export default Signup;