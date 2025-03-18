//===================new code from grok=============

// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const NutritionScreen = ({ navigation }) => {
//   // Sample meal suggestion (replace with ML model output)
//   const mealSuggestion = {
//     name: 'Low-carb meal: Grilled chicken and red rice',
//     calories: 450,
//   };

//   // Water intake state (glasses)
//   const [waterIntake, setWaterIntake] = useState(0); // Number of glasses consumed
//   const targetWaterIntake = 8; // Target: 8 glasses

//   // Function to render water glasses
//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#3b82f6" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setWaterIntake(index + 1)}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={24}
//               color={index < waterIntake ? '#3b82f6' : '#e5e7eb'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text style={styles.waterText}>
//         {waterIntake} of {targetWaterIntake} glasses
//       </Text>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Meal Plan</Text>
//         <Text style={styles.subtitle}>Tailored for your goals</Text>
//       </View>

//       {/* Meal Suggestion Card */}
//       <View style={styles.mealCard}>
//         <Icon name="utensils" size={40} color="#3b82f6" />
//         <Text style={styles.mealName}>{mealSuggestion.name}</Text>
//         <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
//         <TouchableOpacity
//           style={styles.logButton}
//           onPress={() => alert('Meal logged successfully!')} // Replace with logging logic
//         >
//           <Text style={styles.logButtonText}>Log Meal</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Water Tracker */}
//       {renderWaterTracker()}

//       {/* Back to Home Button */}
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.navigate('HomeScreen')}
//       >
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   header: {
//     padding: 20,
//     backgroundColor: '#3b82f6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   headerText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#fff',
//     opacity: 0.9,
//     marginTop: 4,
//   },
//   mealCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   mealName: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#3b82f6',
//     marginTop: 12,
//     textAlign: 'center',
//   },
//   mealCalories: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginTop: 8,
//   },
//   logButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   logButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   waterTrackerCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   waterHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3b82f6',
//     marginLeft: 8,
//   },
//   waterGlasses: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   waterText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   backButton: {
//     margin: 16,
//     padding: 12,
//     backgroundColor: '#3B82F6',
//     borderRadius: 8,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   backButtonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '600',
//   },
// });

// export default NutritionScreen;





//working================

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const NutritionScreen = ({ navigation }) => {
//   const [mealSuggestion, setMealSuggestion] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const targetWaterIntake = 8;

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth().currentUser;
//       console.log('Current user:', user ? user.uid : 'No user logged in');
//       if (!user) {
//         console.log('Redirecting to Login - No user authenticated');
//         navigation.navigate('Login');
//         return;
//       }

//       try {
//         const doc = await firestore().collection('users').doc(user.uid).get();
//         if (doc.exists) {
//           const data = doc.data().healthAssessment;
//           console.log('Firestore data:', data);
//           await fetchMealPrediction(data);
//         } else {
//           console.log('No health assessment found for user:', user.uid);
//           setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
//         }
//       } catch (error) {
//         console.error('Firestore fetch error:', error.message);
//         setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [navigation]);


//   const fetchMealPrediction = async (userData) => {
//     try {
//       const apiUrl = 'http://192.168.1.102:5000/predict_meal';
//       console.log('Fetching meal prediction from:', apiUrl);
  
//       const payload = {
//         Height: parseFloat(userData.Height),
//         Weight: parseFloat(userData.Weight),
//         Age: parseInt(userData.Age, 10),  // Add Age from Firestore
//         Gender: userData.Gender,
//         Activity_Level: userData.Activity_Level,
//         Goal: userData.Goal,
//         Health_Condition: userData.Health_Condition === 'None' ? 'None' : userData.Health_Condition,
//         Dietary_Preference: userData.Dietary_Preference,
//         Food_Allergy: userData.Food_Allergy === 'No Allergies' ? 'No Allergies' : userData.Food_Allergy,
//       };
//       console.log('Sending data to API:', JSON.stringify(payload, null, 2));
  
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
  
//       console.log('API response status:', response.status);
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`API error: ${response.status} - ${errorText}`);
//       }
  
//       const result = await response.json();
//       console.log('API response data:', result);
//       setMealSuggestion({
//         name: result.meal,
//         calories: Math.round(Math.random() * 300) + 300,
//       });
//     } catch (error) {
//       console.error('Fetch meal prediction error:', error.message);
//       setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
//     }
//   };

//   const addWaterGlass = () => setWaterIntake(Math.min(waterIntake + 1, targetWaterIntake));
//   const removeWaterGlass = () => setWaterIntake(Math.max(waterIntake - 1, 0));

//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#34C759" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterControls}>
//         <TouchableOpacity onPress={removeWaterGlass} style={styles.waterButton}>
//           <Icon name="minus" size={20} color="#3B82F6" />
//         </TouchableOpacity>
//         <Text style={styles.waterText}>{waterIntake}/{targetWaterIntake} glasses</Text>
//         <TouchableOpacity onPress={addWaterGlass} style={styles.waterButton}>
//           <Icon name="plus" size={20} color="#3B82F6" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Meal Plan</Text>
//         <Text style={styles.subtitle}>Tailored for your goals</Text>
//       </View>
//       {loading ? (
//         <Text style={styles.loadingText}>Loading your meal plan...</Text>
//       ) : mealSuggestion ? (
//         <View style={styles.mealCard}>
//           <Icon name="utensils" size={24} color="#3B82F6" />
//           <Text style={styles.mealName}>{mealSuggestion.name}</Text>
//           <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
//           <TouchableOpacity style={styles.logButton} onPress={() => alert(`${mealSuggestion.name} logged!`)}>
//             <Text style={styles.logButtonText}>Log</Text>
//           </TouchableOpacity>
//         </View>
//       ) : (
//         <Text style={styles.loadingText}>Failed to load meal plan</Text>
//       )}
//       {renderWaterTracker()}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
//         <Text style={styles.backButtonText}>Back to Home</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F5F5F5' },
//   header: { padding: 20, backgroundColor: '#3B82F6', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
//   headerText: { fontSize: 28, fontWeight: 'bold', color: '#F5F5F5' },
//   subtitle: { fontSize: 16, color: '#F5F5F5', opacity: 0.9, marginTop: 4 },
//   mealCard: { 
//     backgroundColor: '#FFFFFF', 
//     margin: 16, 
//     padding: 20, 
//     borderRadius: 12, 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     justifyContent: 'space-between', 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1, 
//     shadowRadius: 4, 
//     elevation: 2 
//   },
//   mealName: { fontSize: 16, fontWeight: '600', color: '#333333', flex: 1, marginLeft: 12 },
//   mealCalories: { fontSize: 14, color: '#666666', marginRight: 12 },
//   logButton: { backgroundColor: '#3B82F6', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6 },
//   logButtonText: { color: '#F5F5F5', fontSize: 14, fontWeight: '600' },
//   waterTrackerCard: { 
//     backgroundColor: '#FFFFFF', 
//     margin: 16, 
//     padding: 20, 
//     borderRadius: 16, 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1, 
//     shadowRadius: 4, 
//     elevation: 2 
//   },
//   waterHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
//   cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#3B82F6', marginLeft: 8 },
//   waterControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
//   waterButton: { padding: 8 },
//   waterText: { fontSize: 16, color: '#333333' },
//   backButton: { margin: 16, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center' },
//   backButtonText: { fontSize: 16, color: '#3B82F6', fontWeight: '600' },
//   loadingText: { textAlign: 'center', fontSize: 16, color: '#666666', margin: 20 },
// });

// export default NutritionScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const NutritionScreen = ({ navigation }) => {
  const [mealSuggestion, setMealSuggestion] = useState(null);
  const [waterIntake, setWaterIntake] = useState(0);
  const [loading, setLoading] = useState(true);
  const targetWaterIntake = 8;

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      console.log('Current user:', user ? user.uid : 'No user logged in');
      if (!user) {
        console.log('Redirecting to Login - No user authenticated');
        navigation.navigate('Login');
        return;
      }

      try {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          const data = doc.data().healthAssessment;
          console.log('Firestore data:', data);
          await fetchMealPrediction(data);
        } else {
          console.log('No health assessment found for user:', user.uid);
          setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
        }
      } catch (error) {
        console.error('Firestore fetch error:', error.message);
        setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [navigation]);

  const fetchMealPrediction = async (userData) => {
    try {
      const apiUrl = 'http://192.168.1.102:5000/predict_meal';
      console.log('Fetching meal prediction from:', apiUrl);

      const payload = {
        Height: parseFloat(userData.Height),
        Weight: parseFloat(userData.Weight),
        Age: parseInt(userData.Age, 10),
        Gender: userData.Gender,
        Activity_Level: userData.Activity_Level,
        Goal: userData.Goal,
        Health_Condition: userData.Health_Condition === 'None' ? 'None' : userData.Health_Condition,
        Dietary_Preference: userData.Dietary_Preference,
        Food_Allergy: userData.Food_Allergy === 'No Allergies' ? 'No Allergies' : userData.Food_Allergy,
      };
      console.log('Sending data to API:', JSON.stringify(payload, null, 2));

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('API response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('API response data:', result);
      setMealSuggestion({
        name: result.meal,
        calories: Math.round(Math.random() * 300) + 300,
      });
    } catch (error) {
      console.error('Fetch meal prediction error:', error.message);
      setMealSuggestion({ name: 'Default Meal: Grilled Chicken Salad', calories: 450 });
    }
  };

  // New water tracker with glass icons
  const renderWaterTracker = () => (
    <View style={styles.waterTrackerCard}>
      <View style={styles.waterHeader}>
        <Icon name="tint" size={24} color="#3B82F6" />
        <Text style={styles.cardTitle}>Water Intake</Text>
      </View>
      <View style={styles.waterGlasses}>
        {[...Array(targetWaterIntake)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setWaterIntake(index + 1)}
            style={styles.glassContainer}
          >
            <Icon
              name="glass-whiskey"
              size={24}
              color={index < waterIntake ? '#3B82F6' : '#E5E7EB'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.waterText}>
        {waterIntake} of {targetWaterIntake} glasses
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Meal Plan</Text>
        <Text style={styles.subtitle}>Tailored for your goals</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading your meal plan...</Text>
      ) : mealSuggestion ? (
        <View style={styles.mealCard}>
          <Icon name="utensils" size={24} color="#3B82F6" />
          <Text style={styles.mealName}>{mealSuggestion.name}</Text>
          <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
          <TouchableOpacity style={styles.logButton} onPress={() => alert(`${mealSuggestion.name} logged!`)}>
            <Text style={styles.logButtonText}>Log</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Failed to load meal plan</Text>
      )}
      {renderWaterTracker()}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 20, backgroundColor: '#3B82F6', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#F5F5F5' },
  subtitle: { fontSize: 16, color: '#F5F5F5', opacity: 0.9, marginTop: 4 },
  mealCard: { 
    backgroundColor: '#FFFFFF', 
    margin: 16, 
    padding: 20, 
    borderRadius: 12, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  mealName: { fontSize: 16, fontWeight: '600', color: '#333333', flex: 1, marginLeft: 12 },
  mealCalories: { fontSize: 14, color: '#666666', marginRight: 12 },
  logButton: { backgroundColor: '#3B82F6', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6 },
  logButtonText: { color: '#F5F5F5', fontSize: 14, fontWeight: '600' },
  waterTrackerCard: { 
    backgroundColor: '#FFFFFF', 
    margin: 16, 
    padding: 20, 
    borderRadius: 16, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  waterHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#3B82F6', 
    marginLeft: 8 
  },
  waterGlasses: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    marginBottom: 12 
  },
  glassContainer: { 
    padding: 4 
  },
  waterText: { 
    fontSize: 16, 
    color: '#333333', 
    textAlign: 'center' 
  },
  backButton: { 
    margin: 16, 
    padding: 12, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  backButtonText: { 
    fontSize: 16, 
    color: '#3B82F6', 
    fontWeight: '600' 
  },
  loadingText: { 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#666666', 
    margin: 20 
  },
});

export default NutritionScreen;