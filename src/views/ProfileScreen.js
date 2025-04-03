
// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const ProfileScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [editMode, setEditMode] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth().currentUser;
//       if (!user) {
//         navigation.navigate('Login');
//         return;
//       }

//       try {
//         const doc = await firestore().collection('users').doc(user.uid).get();
//         if (doc.exists && doc.data().healthAssessment) {
//           setUserData(doc.data().healthAssessment);
//           console.log('Fetched Firestore data:', doc.data().healthAssessment);
//         } else {
//           Alert.alert('Error', 'No health assessment data found.');
//           navigation.goBack();
//         }
//       } catch (error) {
//         console.error('Error fetching profile data:', error.message);
//         Alert.alert('Error', 'Failed to load profile data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [navigation]);

//   const handleInputChange = (field, value) => {
//     setUserData(prev => ({ ...prev, [field]: value }));
//   };

//   const toggleEditMode = () => {
//     setEditMode(prev => !prev);
//   };

//   const handleLogout = async () => {
//     await auth().signOut();
//     navigation.navigate('Login');
//   };

//   const saveChanges = async () => {
//     const user = auth().currentUser;
//     if (!user) return;

//     try {
//       if (!userData.Height || !userData.Weight || !userData.Age || 
//           !userData.Gender || !userData.Activity_Level || !userData.Goal || 
//           !userData.Health_Condition || !userData.Dietary_Preference || !userData.Food_Allergy) {
//         Alert.alert('Error', 'All fields are required.');
//         return;
//       }

//       const updatedData = {
//         ...userData,
//         Height: parseFloat(userData.Height) || userData.Height,
//         Weight: parseFloat(userData.Weight) || userData.Weight,
//         Age: parseInt(userData.Age, 10) || userData.Age,
//         Target_Weight: userData.Target_Weight ? parseFloat(userData.Target_Weight) : null,
//         Gender: userData.Gender,
//         Activity_Level: userData.Activity_Level,
//         Goal: userData.Goal,
//         Health_Condition: userData.Health_Condition,
//         Dietary_Preference: userData.Dietary_Preference,
//         Food_Allergy: userData.Food_Allergy,
//         updatedAt: firestore.Timestamp.now(),
//       };

//       await firestore()
//         .collection('users')
//         .doc(user.uid)
//         .set({ healthAssessment: updatedData }, { merge: true });

//       Alert.alert('Success', 'Profile updated successfully!');
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error saving profile:', error.message);
//       Alert.alert('Error', 'Failed to save changes: ' + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   if (!userData) return null;

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Profile</Text>
//         <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
//           <Icon name={editMode ? 'times' : 'edit'} size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Personal Details</Text>
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Height (cm)</Text>
//             <TextInput
//               style={[styles.input, !editMode && styles.disabledInput]}
//               value={String(userData.Height)}
//               onChangeText={value => handleInputChange('Height', value)}
//               editable={editMode}
//               keyboardType="numeric"
//               placeholder="170"
//               placeholderTextColor="#6B7280"
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Weight (kg)</Text>
//             <TextInput
//               style={[styles.input, !editMode && styles.disabledInput]}
//               value={String(userData.Weight)}
//               onChangeText={value => handleInputChange('Weight', value)}
//               editable={editMode}
//               keyboardType="numeric"
//               placeholder="70"
//               placeholderTextColor="#6B7280"
//             />
//           </View>
//         </View>
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Age</Text>
//             <TextInput
//               style={[styles.input, !editMode && styles.disabledInput]}
//               value={String(userData.Age)}
//               onChangeText={value => handleInputChange('Age', value)}
//               editable={editMode}
//               keyboardType="numeric"
//               placeholder="30"
//               placeholderTextColor="#6B7280"
//             />
//           </View>
//           <View style={styles.inputContainer}>
//             <Text style={styles.label}>Target Weight (kg)</Text>
//             <TextInput
//               style={[styles.input, !editMode && styles.disabledInput]}
//               value={String(userData.Target_Weight || '')}
//               onChangeText={value => handleInputChange('Target_Weight', value)}
//               editable={editMode}
//               keyboardType="numeric"
//               placeholder="65"
//               placeholderTextColor="#6B7280"
//             />
//           </View>
//         </View>
//         <Text style={styles.label}>Gender</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Gender}
//           onChangeText={value => handleInputChange('Gender', value)}
//           editable={editMode}
//           placeholder="Male"
//           placeholderTextColor="#6B7280"
//         />
//       </View>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Health Preferences</Text>
//         <Text style={styles.label}>Activity Level</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Activity_Level}
//           onChangeText={value => handleInputChange('Activity_Level', value)}
//           editable={editMode}
//           placeholder="Moderately Active"
//           placeholderTextColor="#6B7280"
//         />
//         <Text style={styles.label}>Goal</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Goal}
//           onChangeText={value => handleInputChange('Goal', value)}
//           editable={editMode}
//           placeholder="Improve Fitness"
//           placeholderTextColor="#6B7280"
//         />
//         <Text style={styles.label}>Health Condition</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Health_Condition}
//           onChangeText={value => handleInputChange('Health_Condition', value)}
//           editable={editMode}
//           placeholder="None"
//           placeholderTextColor="#6B7280"
//         />
//         <Text style={styles.label}>Dietary Preference</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Dietary_Preference}
//           onChangeText={value => handleInputChange('Dietary_Preference', value)}
//           editable={editMode}
//           placeholder="Mediterranean"
//           placeholderTextColor="#6B7280"
//         />
//         <Text style={styles.label}>Food Allergy</Text>
//         <TextInput
//           style={[styles.input, !editMode && styles.disabledInput]}
//           value={userData.Food_Allergy}
//           onChangeText={value => handleInputChange('Food_Allergy', value)}
//           editable={editMode}
//           placeholder="None"
//           placeholderTextColor="#6B7280"
//         />
//       </View>

//       {editMode && (
//         <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       )}

//       <View style={styles.buttonRow}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <Text style={styles.logoutButtonText}>Log Out</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC', // Light gray-blue from HomeScreen
//   },
//   header: {
//     backgroundColor: '#10B981', // Green from HomeScreen
//     paddingTop: 40,
//     paddingBottom: 35,
//     paddingHorizontal: 24,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.2,
//   },
//   editButton: {
//     padding: 8,
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 12,
//   },
//   section: {
//     marginHorizontal: 20,
//     marginTop: 20,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 20,
//     elevation: 6,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.15,
//     shadowRadius: 6,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#111827', // Dark gray from HomeScreen
//     marginBottom: 16,
//   },
//   inputRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   inputContainer: {
//     flex: 1,
//     marginRight: 8,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#6B7280', // Muted gray from HomeScreen
//     marginBottom: 6,
//   },
//   input: {
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 12,
//     padding: 12,
//     fontSize: 16,
//     color: '#111827',
//   },
//   disabledInput: {
//     backgroundColor: '#F9FAFB',
//     borderColor: '#E5E7EB',
//     color: '#6B7280',
//   },
//   saveButton: {
//     backgroundColor: '#10B981', // Green from HomeScreen
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginHorizontal: 20,
//     marginVertical: 16,
//     elevation: 4,
//   },
//   saveButtonText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginHorizontal: 20,
//     marginVertical: 16,
//   },
//   backButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#10B981',
//     marginRight: 8,
//     elevation: 4,
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#10B981',
//   },
//   logoutButton: {
//     flex: 1,
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     backgroundColor: '#EF4444', // Keep red for logout
//     marginLeft: 8,
//     elevation: 4,
//   },
//   logoutButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7FAFC',
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//   },
// });

// export default ProfileScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [displayName, setDisplayName] = useState(''); // Added for username
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    let authUnsubscribe = () => {};

    authUnsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        navigation.navigate('Login');
        setLoading(false);
        setUserData(null);
        setDisplayName('');
        return;
      }

      const fetchUserData = async () => {
        try {
          const doc = await firestore().collection('users').doc(user.uid).get();
          if (doc.exists) {
            setUserData(doc.data().healthAssessment || {});
            setDisplayName(doc.data().profile?.displayName || user.email.split('@')[0]);
            console.log('Fetched Firestore data:', doc.data());
          } else {
            Alert.alert('Error', 'No user data found.');
            navigation.goBack();
          }
        } catch (error) {
          console.error('Error fetching profile data:', error.message);
          Alert.alert('Error', 'Failed to load profile data.');
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    });

    return () => authUnsubscribe();
  }, [navigation]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await auth().signOut();
      // Navigation handled by onAuthStateChanged
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out.');
    }
  };

  const saveChanges = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      if (!userData.Height || !userData.Weight || !userData.Age || 
          !userData.Gender || !userData.Activity_Level || !userData.Goal || 
          !userData.Health_Condition || !userData.Dietary_Preference || !userData.Food_Allergy) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      const updatedData = {
        ...userData,
        Height: parseFloat(userData.Height) || userData.Height,
        Weight: parseFloat(userData.Weight) || userData.Weight,
        Age: parseInt(userData.Age, 10) || userData.Age,
        Target_Weight: userData.Target_Weight ? parseFloat(userData.Target_Weight) : null,
        Gender: userData.Gender,
        Activity_Level: userData.Activity_Level,
        Goal: userData.Goal,
        Health_Condition: userData.Health_Condition,
        Dietary_Preference: userData.Dietary_Preference,
        Food_Allergy: userData.Food_Allergy,
        updatedAt: firestore.Timestamp.now(),
      };

      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(
          {
            healthAssessment: updatedData,
            profile: { displayName: displayName || user.email.split('@')[0] }, // Save displayName
          },
          { merge: true }
        );

      Alert.alert('Success', 'Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error saving profile:', error.message);
      Alert.alert('Error', 'Failed to save changes: ' + error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!userData) return null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Profile</Text>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <Icon name={editMode ? 'times' : 'edit'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={displayName}
          onChangeText={setDisplayName}
          editable={editMode}
          placeholder="Enter your username"
          placeholderTextColor="#6B7280"
        />
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={String(userData.Height)}
              onChangeText={value => handleInputChange('Height', value)}
              editable={editMode}
              keyboardType="numeric"
              placeholder="170"
              placeholderTextColor="#6B7280"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={String(userData.Weight)}
              onChangeText={value => handleInputChange('Weight', value)}
              editable={editMode}
              keyboardType="numeric"
              placeholder="70"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={String(userData.Age)}
              onChangeText={value => handleInputChange('Age', value)}
              editable={editMode}
              keyboardType="numeric"
              placeholder="30"
              placeholderTextColor="#6B7280"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Target Weight (kg)</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={String(userData.Target_Weight || '')}
              onChangeText={value => handleInputChange('Target_Weight', value)}
              editable={editMode}
              keyboardType="numeric"
              placeholder="65"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>
        <Text style={styles.label}>Gender</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Gender}
          onChangeText={value => handleInputChange('Gender', value)}
          editable={editMode}
          placeholder="Male"
          placeholderTextColor="#6B7280"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Preferences</Text>
        <Text style={styles.label}>Activity Level</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Activity_Level}
          onChangeText={value => handleInputChange('Activity_Level', value)}
          editable={editMode}
          placeholder="Moderately Active"
          placeholderTextColor="#6B7280"
        />
        <Text style={styles.label}>Goal</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Goal}
          onChangeText={value => handleInputChange('Goal', value)}
          editable={editMode}
          placeholder="Improve Fitness"
          placeholderTextColor="#6B7280"
        />
        <Text style={styles.label}>Health Condition</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Health_Condition}
          onChangeText={value => handleInputChange('Health_Condition', value)}
          editable={editMode}
          placeholder="None"
          placeholderTextColor="#6B7280"
        />
        <Text style={styles.label}>Dietary Preference</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Dietary_Preference}
          onChangeText={value => handleInputChange('Dietary_Preference', value)}
          editable={editMode}
          placeholder="Mediterranean"
          placeholderTextColor="#6B7280"
        />
        <Text style={styles.label}>Food Allergy</Text>
        <TextInput
          style={[styles.input, !editMode && styles.disabledInput]}
          value={userData.Food_Allergy}
          onChangeText={value => handleInputChange('Food_Allergy', value)}
          editable={editMode}
          placeholder="None"
          placeholderTextColor="#6B7280"
        />
      </View>

      {editMode && (
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    backgroundColor: '#10B981',
    paddingTop: 40,
    paddingBottom: 35,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: { fontSize: 30, fontWeight: '700', color: '#FFFFFF', letterSpacing: 0.2 },
  editButton: { padding: 8, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 12 },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: '#111827', marginBottom: 16 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  inputContainer: { flex: 1, marginRight: 8 },
  label: { fontSize: 14, fontWeight: '500', color: '#6B7280', marginBottom: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  disabledInput: { backgroundColor: '#F9FAFB', borderColor: '#E5E7EB', color: '#6B7280' },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 16,
    elevation: 4,
  },
  saveButtonText: { fontSize: 18, fontWeight: '600', color: '#FFFFFF' },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 16 },
  backButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#10B981',
    marginRight: 8,
    elevation: 4,
  },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#10B981' },
  logoutButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#EF4444',
    marginLeft: 8,
    elevation: 4,
  },
  logoutButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F7FAFC' },
  loadingText: { fontSize: 18, fontWeight: '600', color: '#111827' },
});

export default ProfileScreen;