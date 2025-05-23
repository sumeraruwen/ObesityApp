import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const HealthAssessment = () => {
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (!user) {
        Alert.alert(
          'Authentication Error',
          'Please log in again.',
          [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
        );
      }
    });
    return () => unsubscribe();
  }, []);

  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: { height: '', weight: '', age: '', gender: '' },
    healthConditions: [],
    activityLevel: '',
    goals: [],
    targetWeight: '',
    dietaryPreferences: { dietType: '', allergies: [] },
  });

  const handleBasicInfoChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, [field]: value },
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      basicInfo: { ...prev.basicInfo, gender },
    }));
  };

  const toggleHealthCondition = (condition) => {
    setFormData(prev => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter(item => item !== condition)
        : [...prev.healthConditions, condition],
    }));
  };

  const setActivityLevel = (level) => {
    setFormData(prev => ({ ...prev, activityLevel: level }));
  };

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(item => item !== goal)
        : [...prev.goals, goal],
    }));
  };

  const setDietType = (dietType) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: { ...prev.dietaryPreferences, dietType },
    }));
  };

  const toggleAllergy = (allergy) => {
    setFormData(prev => ({
      ...prev,
      dietaryPreferences: {
        ...prev.dietaryPreferences,
        allergies: prev.dietaryPreferences.allergies.includes(allergy)
          ? prev.dietaryPreferences.allergies.filter(item => item !== allergy)
          : [...prev.dietaryPreferences.allergies, allergy],
      },
    }));
  };

 //Validate the Form

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        const { height, weight, age, gender } = formData.basicInfo;
        if (!height || !weight || !age || !gender) {
          Alert.alert('Missing Information', 'Please fill in all basic information fields');
          return false;
        }
        if (isNaN(parseFloat(height)) || isNaN(parseFloat(weight)) || isNaN(parseInt(age, 10))) {
          Alert.alert('Invalid Input', 'Height, weight, and age must be valid numbers');
          return false;
        }
        break;
         case 1:
        if (formData.healthConditions.length === 0) {
          Alert.alert('Missing Information', 'Please select at least one option or "None of the above"');
          return false;
        }
        break;
      case 2:
        if (!formData.activityLevel) {
          Alert.alert('Missing Information', 'Please select your activity level');
          return false;
        }
        break;
      case 3:
        if (formData.goals.length === 0 || !formData.targetWeight) {
          Alert.alert('Missing Information', 'Please select at least one goal and enter target weight');
          return false;
        }
        if (isNaN(parseFloat(formData.targetWeight))) {
          Alert.alert('Invalid Input', 'Target weight must be a valid number');
          return false;
        }
        break;
          case 4:
        if (!formData.dietaryPreferences.dietType) {
          Alert.alert('Missing Information', 'Please select a diet type');
          return false;
        }
        break;
    }
    return true;
  };

  

  const handleSubmit = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        Alert.alert('Error', 'You must be logged in to save your assessment.');
        return;
      }
  
      // Normalize data to match model expectations
      const normalizedData = {
        Height: parseFloat(formData.basicInfo.height),
        Weight: parseFloat(formData.basicInfo.weight),
        Age: parseInt(formData.basicInfo.age, 10),
        Gender: formData.basicInfo.gender.charAt(0).toUpperCase() + formData.basicInfo.gender.slice(1), // Capitalize
        Activity_Level: formData.activityLevel,
        Goal: formData.goals[0] || 'Better Health', 
        Health_Condition: formData.healthConditions[0] || 'None', 
        Dietary_Preference: formData.dietaryPreferences.dietType,
        Food_Allergy: formData.dietaryPreferences.allergies[0] || 'No Allergies', // Deafult If Empty
        Target_Weight: parseFloat(formData.targetWeight), 
        completedAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      };
  
      console.log('Saving to Firestore:', normalizedData);
      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set({ healthAssessment: normalizedData }, { merge: true });
  
      Alert.alert('Success', 'Your health assessment has been saved!', [
        { text: 'OK', onPress: () => navigation.replace('HomeScreen') },
      ]);
    } catch (error) {
      const errorMessage = `Failed to save assessment: ${error.code || ''} - ${error.message || ''}`;
      Alert.alert('Error', errorMessage);
      console.error('Detailed error:', { code: error.code, message: error.message, fullError: error });
    }
  };

  const steps = [
    {
      title: "Basic Information",
      subtitle: "Let's start with your basic details",
      content: () => (
        <View style={styles.contentContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Height (cm)</Text>
            <TextInput 
              style={styles.input}
              value={formData.basicInfo.height}
              onChangeText={(value) => handleBasicInfoChange('height', value)}
              keyboardType="numeric"
              placeholderTextColor="#666"
              placeholder="Enter your height"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput 
              style={styles.input}
              value={formData.basicInfo.weight}
              onChangeText={(value) => handleBasicInfoChange('weight', value)}
              keyboardType="numeric"
              placeholderTextColor="#666"
              placeholder="Enter your weight"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput 
              style={styles.input}
              value={formData.basicInfo.age}
              onChangeText={(value) => handleBasicInfoChange('age', value)}
              keyboardType="numeric"
              placeholderTextColor="#666"
              placeholder="Enter your age"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.buttonGrid}>
              <TouchableOpacity 
                style={[styles.button, formData.basicInfo.gender === 'male' && styles.selectedButton]}
                onPress={() => handleGenderSelect('male')}
              >
                <Text style={[styles.buttonText, formData.basicInfo.gender === 'male' && styles.selectedButtonText]}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, formData.basicInfo.gender === 'female' && styles.selectedButton]}
                onPress={() => handleGenderSelect('female')}
              >
                <Text style={[styles.buttonText, formData.basicInfo.gender === 'female' && styles.selectedButtonText]}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ),
    },
    {
      title: "Health Conditions",
      subtitle: "Help us understand your health better",
      content: () => (
        <View style={styles.contentContainer}>
          <Text style={styles.helperText}>Select any conditions that apply:</Text>
          {['High Blood Pressure', 'Diabetes', 'Joint Problems', 'Heart Disease', 'Respiratory Issues', 'None of the above'].map((condition) => (
            <TouchableOpacity 
              key={condition}
              style={[styles.checkboxContainer, formData.healthConditions.includes(condition) && styles.selectedCheckbox]}
              onPress={() => toggleHealthCondition(condition)}
            >
              <View style={[styles.checkbox, formData.healthConditions.includes(condition) && styles.checkedCheckbox]}>
                {formData.healthConditions.includes(condition) && <Text style={styles.checkMark}>✓</Text>}
              </View>
              <Text style={styles.checkboxText}>{condition}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      title: "Activity Level",
      subtitle: "Tell us about your current lifestyle",
      content: () => (
        <View style={styles.contentContainer}>
          {[
            { level: 'Sedentary', description: 'Little to no regular exercise' },
            { level: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
            { level: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
            { level: 'Very Active', description: 'Hard exercise 6-7 days/week' },
          ].map((activity) => (
            <TouchableOpacity 
              key={activity.level}
              style={[styles.activityCard, formData.activityLevel === activity.level && styles.selectedActivityCard]}
              onPress={() => setActivityLevel(activity.level)}
            >
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{activity.level}</Text>
                <Text style={styles.activityDescription}>{activity.description}</Text>
              </View>
              {formData.activityLevel === activity.level && (
                <View style={styles.selectedIndicator}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ),
    },
    {
      title: "Your Goals",
      subtitle: "What would you like to achieve?",
      content: () => (
        <View style={styles.contentContainer}>
          {['Weight Loss', 'Improve Fitness', 'Better Health', 'Increase Energy', 'Build Strength', 'Better Sleep'].map((goal) => (
            <TouchableOpacity 
              key={goal}
              style={[styles.checkboxContainer, formData.goals.includes(goal) && styles.selectedCheckbox]}
              onPress={() => toggleGoal(goal)}
            >
              <View style={[styles.checkbox, formData.goals.includes(goal) && styles.checkedCheckbox]} />
              <Text style={styles.checkboxText}>{goal}</Text>
            </TouchableOpacity>
          ))}
          <View style={[styles.inputGroup, styles.marginTop]}>
            <Text style={styles.label}>Target Weight (kg)</Text>
            <TextInput 
              style={styles.input}
              value={formData.targetWeight}
              onChangeText={(value) => setFormData(prev => ({ ...prev, targetWeight: value }))}
              keyboardType="numeric"
              placeholderTextColor="#666"
              placeholder="Enter your target weight"
            />
          </View>
        </View>
      ),
    },
    {
      title: "Dietary Preferences",
      subtitle: "Tell us about your eating habits",
      content: () => (
        <View style={styles.contentContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Diet Type</Text>
            {['No Restrictions', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Mediterranean'].map((diet) => (
              <TouchableOpacity 
                key={diet}
                style={[styles.radioContainer, formData.dietaryPreferences.dietType === diet && styles.selectedRadio]}
                onPress={() => setDietType(diet)}
              >
                <View style={[styles.radio, formData.dietaryPreferences.dietType === diet && styles.checkedRadio]} />
                <Text style={styles.radioText}>{diet}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={[styles.inputGroup, styles.marginTop]}>
            <Text style={styles.label}>Food Allergies/Intolerances</Text>
            <View style={styles.allergyContainer}>
              {['Dairy', 'Nuts', 'Eggs', 'Soy', 'Gluten', 'Shellfish'].map((allergy) => (
                <TouchableOpacity 
                  key={allergy}
                  style={[styles.allergyTag, formData.dietaryPreferences.allergies.includes(allergy) && styles.selectedAllergyTag]}
                  onPress={() => toggleAllergy(allergy)}
                >
                  <View style={[styles.smallCheckbox, formData.dietaryPreferences.allergies.includes(allergy) && styles.checkedSmallCheckbox]}>
                    {formData.dietaryPreferences.allergies.includes(allergy) && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={styles.allergyText}>{allergy}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      ),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${((currentStep + 1) / steps.length) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>{currentStep + 1} of {steps.length}</Text>
        </View>
        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
        {steps[currentStep].content()}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            style={[styles.navButton, styles.backButton, currentStep === 0 && styles.disabledButton]}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (validateCurrentStep()) {
                if (currentStep < steps.length - 1) {
                  setCurrentStep(prev => prev + 1);
                } else {
                  handleSubmit();
                }
              }
            }}
            style={[styles.navButton, styles.nextButton]}
          >
            <Text style={styles.nextButtonText}>{currentStep === steps.length - 1 ? 'Complete ✓' : 'Next →'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Light Gray background
  },
  card: {
    margin: 20,
    backgroundColor: '#FFFFFF', // White card
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0', // Light gray base
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#34C759', // Soft Green for progress
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'right',
    fontSize: 14,
    color: '#333333', // Dark Gray text
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#3B82F6', // Vibrant Blue for title
  },
  subtitle: {
    fontSize: 16,
    color: '#333333', // Dark Gray for subtitle
    marginBottom: 24,
  },
  contentContainer: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333333', 
  },
  helperText: {
    fontSize: 14,
    color: '#333333', 
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 8,
    fontSize: 16,
    color: '#333333', 
  },
  buttonGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  button: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 8,
    backgroundColor: '#FFFFFF', 
  },
  buttonText: {
    textAlign: 'center',
    color: '#333333', 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#34C759', 
    borderRadius: 4,
    marginRight: 12,
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#34C759', 
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxText: {
    flex: 1,
    color: '#333333',
  },
  activityCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 8,
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#333333', 
  },
  activityDescription: {
    fontSize: 14,
    color: '#666666', 
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 8,
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#34C759', 
    borderRadius: 10,
    marginRight: 12,
  },
  radioText: {
    flex: 1,
    color: '#333333', 
  },
  allergyContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  allergyTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#333333', 
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 8,
  },
  allergyText: {
    fontSize: 14,
    color: '#333333', 
  },
  marginTop: {
    marginTop: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  nextButton: {
    backgroundColor: '#3B82F6', // Vibrant Blue for next/complete
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: '#3B82F6', // Vibrant Blue for back
  },
  nextButtonText: {
    color: '#F5F5F5', // Light Gray text on button
  },
  disabledButton: {
    opacity: 0.5,
  },
  selectedButton: {
    backgroundColor: '#37B47E', // Soft Green for selected
    borderColor: '#37B47E',
  },
  selectedButtonText: {
    color: '#F5F5F5', // Light Gray text on selected
  },
  selectedCheckbox: {
    borderColor: '#37B47E', // Soft Green border
    backgroundColor: '#E6F4EA', // Light green background
  },
  checkedCheckbox: {
    backgroundColor: '#37B47E', // Soft Green fill
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#F5F5F5', // Light Gray checkmark
    fontSize: 14,
  },
  selectedActivityCard: {
    borderColor: '#37B47E', // Soft Green border
    backgroundColor: '#E6F4EA', // Light green background
    borderWidth: 2,
  },
  selectedRadio: {
    borderColor: '#37B47E', // Soft Green border
    backgroundColor: '#E6F4EA', // Light green background
  },
  checkedRadio: {
    borderWidth: 6,
    borderColor: '#37B47E', // Soft Green fill
  },
  selectedAllergyTag: {
    borderColor: '#37B47E', // Soft Green border
    backgroundColor: '#E6F4EA', // Light green background
  },
  checkedSmallCheckbox: {
    backgroundColor: '#37B47E', // Soft Green fill
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HealthAssessment;