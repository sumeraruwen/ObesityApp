import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

const HealthAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {
      height: '',
      weight: '',
      age: '',
      gender: ''
    },
    healthConditions: [],
    activityLevel: '',
    goals: [],
    dietaryPreferences: []
  });

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
              placeholder="Enter your height"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Weight (kg)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your weight"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your age"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.buttonGrid}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    },
    {
      title: "Health Conditions",
      subtitle: "Help us understand your health better",
      content: () => (
        <View style={styles.contentContainer}>
          <Text style={styles.helperText}>Select any conditions that apply:</Text>
          {[
            'High Blood Pressure',
            'Diabetes',
            'Joint Problems',
            'Heart Disease',
            'Respiratory Issues',
            'None of the above'
          ].map((condition) => (
            <TouchableOpacity 
              key={condition} 
              style={styles.checkboxContainer}
            >
              <View style={styles.checkbox} />
              <Text style={styles.checkboxText}>{condition}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    },
    {
      title: "Activity Level",
      subtitle: "Tell us about your current lifestyle",
      content: () => (
        <View style={styles.contentContainer}>
          {[
            {
              level: 'Sedentary',
              description: 'Little to no regular exercise'
            },
            {
              level: 'Lightly Active',
              description: 'Light exercise 1-3 days/week'
            },
            {
              level: 'Moderately Active',
              description: 'Moderate exercise 3-5 days/week'
            },
            {
              level: 'Very Active',
              description: 'Hard exercise 6-7 days/week'
            }
          ].map((activity) => (
            <TouchableOpacity 
              key={activity.level} 
              style={styles.activityCard}
            >
              <Text style={styles.activityTitle}>{activity.level}</Text>
              <Text style={styles.activityDescription}>{activity.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    },
    {
      title: "Your Goals",
      subtitle: "What would you like to achieve?",
      content: () => (
        <View style={styles.contentContainer}>
          {[
            'Weight Loss',
            'Improve Fitness',
            'Better Health',
            'Increase Energy',
            'Build Strength',
            'Better Sleep'
          ].map((goal) => (
            <TouchableOpacity 
              key={goal} 
              style={styles.checkboxContainer}
            >
              <View style={styles.checkbox} />
              <Text style={styles.checkboxText}>{goal}</Text>
            </TouchableOpacity>
          ))}
          
          <View style={[styles.inputGroup, styles.marginTop]}>
            <Text style={styles.label}>Target Weight (kg)</Text>
            <TextInput 
              style={styles.input}
              placeholder="Enter your target weight"
              keyboardType="numeric"
              placeholderTextColor="#666"
            />
          </View>
        </View>
      )
    },
    {
      title: "Dietary Preferences",
      subtitle: "Tell us about your eating habits",
      content: () => (
        <View style={styles.contentContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Diet Type</Text>
            {[
              'No Restrictions',
              'Vegetarian',
              'Vegan',
              'Pescatarian',
              'Keto',
              'Mediterranean'
            ].map((diet) => (
              <TouchableOpacity 
                key={diet} 
                style={styles.radioContainer}
              >
                <View style={styles.radio} />
                <Text style={styles.radioText}>{diet}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={[styles.inputGroup, styles.marginTop]}>
            <Text style={styles.label}>Food Allergies/Intolerances</Text>
            <View style={styles.allergyContainer}>
              {[
                'Dairy', 'Nuts', 'Eggs', 'Soy', 'Gluten', 'Shellfish'
              ].map((allergy) => (
                <TouchableOpacity 
                  key={allergy} 
                  style={styles.allergyTag}
                >
                  <View style={styles.smallCheckbox} />
                  <Text style={styles.allergyText}>{allergy}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      )
    }
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / steps.length) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} of {steps.length}
          </Text>
        </View>

        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.subtitle}>{steps[currentStep].subtitle}</Text>
        
        {steps[currentStep].content()}

        <View style={styles.navigationContainer}>
          <TouchableOpacity
            onPress={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            style={[
              styles.navButton,
              styles.backButton,
              currentStep === 0 && styles.disabledButton
            ]}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(prev => prev + 1);
              } else {
                console.log('Form submitted:', formData);
              }
            }}
            style={[styles.navButton, styles.nextButton]}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Complete ✓' : 'Next →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563eb',
    borderRadius: 4,
  },
  progressText: {
    marginTop: 8,
    textAlign: 'right',
    fontSize: 14,
    color: '#666666',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
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
  },
  helperText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    fontSize: 16,
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
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 4,
    marginRight: 12,
  },
  smallCheckbox: {
    width: 16,
    height: 16,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxText: {
    flex: 1,
  },
  activityCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
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
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
  },
  radio: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#2563eb',
    borderRadius: 10,
    marginRight: 12,
  },
  radioText: {
    flex: 1,
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
    borderColor: '#ddd',
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 8,
  },
  allergyText: {
    fontSize: 14,
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
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
  },
  backButtonText: {
    color: '#2563eb',
  },
  nextButtonText: {
    color: '#ffffff',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default HealthAssessment;