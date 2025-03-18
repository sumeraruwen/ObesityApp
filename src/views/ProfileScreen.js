import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (!user) {
        navigation.navigate('Login');
        return;
      }

      try {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists && doc.data().healthAssessment) {
          setUserData(doc.data().healthAssessment);
          console.log('Fetched Firestore data:', doc.data().healthAssessment);
        } else {
          Alert.alert('Error', 'No health assessment data found.');
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
  }, [navigation]);

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
  };

  const saveChanges = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      // Validation
      if (!userData.Height || !userData.Weight || !userData.Age || 
          !userData.Gender || !userData.Activity_Level || !userData.Goal || 
          !userData.Health_Condition || !userData.Dietary_Preference || !userData.Food_Allergy) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      const updatedData = {
        ...userData,
        Height: parseFloat(userData.Height) || userData.Height, // Keep original if invalid
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
        .set({ healthAssessment: updatedData }, { merge: true });

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
        <Text style={styles.loadingText}>FitAdaptPro</Text>
      </View>
    );
  }

  if (!userData) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
          <Icon name={editMode ? 'times' : 'edit'} size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput
              style={[styles.input, !editMode && styles.disabledInput]}
              value={String(userData.Height)}
              onChangeText={value => handleInputChange('Height', value)}
              editable={editMode}
              keyboardType="numeric"
              placeholder="e.g., 170"
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
              placeholder="e.g., 70"
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
              placeholder="e.g., 30"
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
              placeholder="e.g., 65"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Gender}
            onChangeText={value => handleInputChange('Gender', value)}
            editable={editMode}
            placeholder="e.g., Male"
          />
        </View>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.sectionTitle}>Health Preferences</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Activity Level</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Activity_Level}
            onChangeText={value => handleInputChange('Activity_Level', value)}
            editable={editMode}
            placeholder="e.g., Moderately Active"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Goal</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Goal}
            onChangeText={value => handleInputChange('Goal', value)}
            editable={editMode}
            placeholder="e.g., Improve Fitness"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Health Condition</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Health_Condition}
            onChangeText={value => handleInputChange('Health_Condition', value)}
            editable={editMode}
            placeholder="e.g., Diabetes"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dietary Preference</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Dietary_Preference}
            onChangeText={value => handleInputChange('Dietary_Preference', value)}
            editable={editMode}
            placeholder="e.g., Mediterranean"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Food Allergy</Text>
          <TextInput
            style={[styles.input, !editMode && styles.disabledInput]}
            value={userData.Food_Allergy}
            onChangeText={value => handleInputChange('Food_Allergy', value)}
            editable={editMode}
            placeholder="e.g., Eggs"
          />
        </View>
      </View>

      {editMode && (
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 24,
    backgroundColor: '#3B82F6',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  editButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#3B82F6',
    marginBottom: 16,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#333333',
  },
  disabledInput: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#34C759',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 18,
    color: '#333333',
  },
});

export default ProfileScreen;