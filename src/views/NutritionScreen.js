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
//         Age: parseInt(userData.Age, 10),
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

//   // New water tracker with glass icons
//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#3B82F6" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setWaterIntake(index + 1)}
//             style={styles.glassContainer}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={24}
//               color={index < waterIntake ? '#3B82F6' : '#E5E7EB'}
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
//   waterHeader: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     marginBottom: 12 
//   },
//   cardTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold', 
//     color: '#3B82F6', 
//     marginLeft: 8 
//   },
//   waterGlasses: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     justifyContent: 'center', 
//     marginBottom: 12 
//   },
//   glassContainer: { 
//     padding: 4 
//   },
//   waterText: { 
//     fontSize: 16, 
//     color: '#333333', 
//     textAlign: 'center' 
//   },
//   backButton: { 
//     margin: 16, 
//     padding: 12, 
//     backgroundColor: '#FFFFFF', 
//     borderRadius: 8, 
//     alignItems: 'center' 
//   },
//   backButtonText: { 
//     fontSize: 16, 
//     color: '#3B82F6', 
//     fontWeight: '600' 
//   },
//   loadingText: { 
//     textAlign: 'center', 
//     fontSize: 16, 
//     color: '#666666', 
//     margin: 20 
//   },
// });

// export default NutritionScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const NutritionScreen = ({ navigation }) => {
//   const [mealSuggestion, setMealSuggestion] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [mood, setMood] = useState(null); // Track selected mood
//   const [suggestion, setSuggestion] = useState(''); // Display suggestion
//   const targetWaterIntake = 8;

//   // Mood options with icons and suggestions
//   const moods = [
//     { name: 'Happy', icon: 'smile', suggestion: 'Great mood! Enjoy your meal mindfully.' },
//     { name: 'Sad', icon: 'sad-tear', suggestion: 'Treat yourself to a healthy comfort food.' },
//     { name: 'Bored', icon: 'meh', suggestion: 'How about a quick walk instead of snacking?' },
//     { name: 'Stressed', icon: 'frown', suggestion: 'Try a 5-min deep breathing exercise before eating.' },
//   ];

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
//         Age: parseInt(userData.Age, 10),
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

//   // Log meal with mood to Firestore and show suggestion
//   const handleMoodSelection = async (selectedMood) => {
//     const user = auth().currentUser;
//     if (!user) return;

//     setMood(selectedMood.name);
//     setSuggestion(selectedMood.suggestion); // Show suggestion immediately

//     // Auto-log meal with mood
//     try {
//       const moodData = {
//         mood: selectedMood.name,
//         meal: mealSuggestion.name,
//         calories: mealSuggestion.calories,
//         timestamp: firestore.Timestamp.now(),
//       };
//       await firestore().collection('users').doc(user.uid).collection('mood_logs').add(moodData);
//       console.log('Meal logged with mood:', moodData);
//     } catch (error) {
//       console.error('Error logging meal with mood:', error.message);
//     }
//   };

//   // Render simplified mood picker with emojis only
//   const renderMoodPicker = () => (
//     <View style={styles.moodPickerCard}>
//       <Text style={styles.cardTitle}>How are you feeling?</Text>
//       <View style={styles.moodOptions}>
//         {moods.map(moodOption => (
//           <TouchableOpacity
//             key={moodOption.name}
//             style={[styles.moodButton, mood === moodOption.name && styles.moodButtonSelected]}
//             onPress={() => handleMoodSelection(moodOption)}
//           >
//             <Icon
//               name={moodOption.icon}
//               size={30}
//               color={mood === moodOption.name ? '#FFFFFF' : '#3B82F6'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       {suggestion ? (
//         <Text style={styles.suggestionText}>{suggestion}</Text>
//       ) : null}
//     </View>
//   );

//   // Water tracker (unchanged)
//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#3B82F6" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setWaterIntake(index + 1)}
//             style={styles.glassContainer}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={24}
//               color={index < waterIntake ? '#3B82F6' : '#E5E7EB'}
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
//           {/* Removed Log button since emoji click handles logging */}
//         </View>
//       ) : (
//         <Text style={styles.loadingText}>Failed to load meal plan</Text>
//       )}
//       {renderMoodPicker()}
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
//   moodPickerCard: { 
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
//   cardTitle: { 
//     fontSize: 20, 
//     fontWeight: 'bold', 
//     color: '#3B82F6', 
//     marginBottom: 12, 
//     textAlign: 'center' 
//   },
//   moodOptions: { 
//     flexDirection: 'row', 
//     justifyContent: 'space-around' 
//   },
//   moodButton: { 
//     alignItems: 'center', 
//     padding: 10, 
//     borderWidth: 1, 
//     borderColor: '#3B82F6', 
//     borderRadius: 50, 
//     width: 60, 
//     height: 60, 
//     justifyContent: 'center' 
//   },
//   moodButtonSelected: { 
//     backgroundColor: '#3B82F6', 
//     borderColor: '#3B82F6' 
//   },
//   suggestionText: { 
//     fontSize: 16, 
//     color: '#333333', 
//     textAlign: 'center', 
//     marginTop: 12 
//   },
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
//   waterHeader: { 
//     flexDirection: 'row', 
//     alignItems: 'center', 
//     marginBottom: 12 
//   },
//   waterGlasses: { 
//     flexDirection: 'row', 
//     flexWrap: 'wrap', 
//     justifyContent: 'center', 
//     marginBottom: 12 
//   },
//   glassContainer: { 
//     padding: 4 
//   },
//   waterText: { 
//     fontSize: 16, 
//     color: '#333333', 
//     textAlign: 'center' 
//   },
//   backButton: { 
//     margin: 16, 
//     padding: 12, 
//     backgroundColor: '#FFFFFF', 
//     borderRadius: 8, 
//     alignItems: 'center' 
//   },
//   backButtonText: { 
//     fontSize: 16, 
//     color: '#3B82F6', 
//     fontWeight: '600' 
//   },
//   loadingText: { 
//     textAlign: 'center', 
//     fontSize: 16, 
//     color: '#666666', 
//     margin: 20 
//   },
// });

// export default NutritionScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const NutritionScreen = ({ navigation }) => {
//   const [mealSuggestion, setMealSuggestion] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [mood, setMood] = useState(null);
//   const [suggestion, setSuggestion] = useState('');
//   const targetWaterIntake = 8;

//   const moods = [
//     { name: 'Happy', icon: 'smile', suggestion: 'Great mood! Enjoy your meal mindfully.' },
//     { name: 'Sad', icon: 'sad-tear', suggestion: 'Treat yourself to a healthy comfort food.' },
//     { name: 'Bored', icon: 'meh', suggestion: 'How about a quick walk instead of snacking?' },
//     { name: 'Stressed', icon: 'frown', suggestion: 'Try a 5-min deep breathing exercise before eating.' },
//   ];

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth().currentUser;
//       if (!user) {
//         navigation.navigate('Login');
//         return;
//       }

//       try {
//         const doc = await firestore().collection('users').doc(user.uid).get();
//         if (doc.exists) {
//           const data = doc.data().healthAssessment;
//           console.log('Firestore healthAssessment:', data); // Debugging
//           await fetchMealPrediction(data);
//         } else {
//           setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//         }
//       } catch (error) {
//         console.error('Firestore fetch error:', error.message);
//         setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, [navigation]);

//   const fetchMealPrediction = async (userData) => {
//     try {
//       // Filter only required fields for the model
//       const filteredData = {
//         Height: userData.Height,
//         Weight: userData.Weight,
//         Age: userData.Age,
//         Gender: userData.Gender,
//         Activity_Level: userData.Activity_Level,
//         Goal: userData.Goal,
//         Health_Condition: userData.Health_Condition,
//         Dietary_Preference: userData.Dietary_Preference,
//         Food_Allergy: userData.Food_Allergy,
//       };
//       console.log('Sending to API:', filteredData); // Debugging

//       const response = await fetch('http://192.168.1.101:5000/predict_meal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(filteredData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         setMealSuggestion({
//           name: result.meal,
//           calories: result.calories,
//           details: result.details,
//         });
//       } else {
//         throw new Error(result.error || 'API error');
//       }
//     } catch (error) {
//       console.error('Fetch meal error:', error.message);
//       setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//     }
//   };

//   const handleMoodSelection = async (selectedMood) => {
//     const user = auth().currentUser;
//     if (!user || !mealSuggestion) return;

//     setMood(selectedMood.name);
//     setSuggestion(selectedMood.suggestion);

//     try {
//       await firestore().collection('users').doc(user.uid).collection('mood_logs').add({
//         mood: selectedMood.name,
//         meal: mealSuggestion.name,
//         calories: mealSuggestion.calories,
//         timestamp: firestore.Timestamp.now(),
//       });
//     } catch (error) {
//       console.error('Error logging mood:', error.message);
//     }
//   };

//   const renderMoodPicker = () => (
//     <View style={styles.moodPickerCard}>
//       <Text style={styles.cardTitle}>How are you feeling?</Text>
//       <View style={styles.moodOptions}>
//         {moods.map(moodOption => (
//           <TouchableOpacity
//             key={moodOption.name}
//             style={[styles.moodButton, mood === moodOption.name && styles.moodButtonSelected]}
//             onPress={() => handleMoodSelection(moodOption)}
//           >
//             <Icon
//               name={moodOption.icon}
//               size={30}
//               color={mood === moodOption.name ? '#FFFFFF' : '#3B82F6'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       {suggestion ? <Text style={styles.suggestionText}>{suggestion}</Text> : null}
//     </View>
//   );

//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#3B82F6" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setWaterIntake(index + 1)}
//             style={styles.glassContainer}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={24}
//               color={index < waterIntake ? '#3B82F6' : '#E5E7EB'}
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
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Meal Plan</Text>
//         <Text style={styles.subtitle}>Tailored for your goals</Text>
//       </View>
//       {loading ? (
//         <Text style={styles.loadingText}>Loading your meal plan...</Text>
//       ) : mealSuggestion ? (
//         <View style={styles.mealCard}>
//           <Icon name="utensils" size={24} color="#3B82F6" />
//           <View style={styles.mealInfo}>
//             <Text style={styles.mealName}>{mealSuggestion.name}</Text>
//             <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
//             <Text style={styles.mealDetails}>{mealSuggestion.details}</Text>
//           </View>
//         </View>
//       ) : (
//         <Text style={styles.loadingText}>Failed to load meal plan</Text>
//       )}
//       {renderMoodPicker()}
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
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1, 
//     shadowRadius: 4, 
//     elevation: 2 
//   },
//   mealInfo: { flex: 1, marginLeft: 12 },
//   mealName: { fontSize: 16, fontWeight: '600', color: '#333333' },
//   mealCalories: { fontSize: 14, color: '#666666', marginTop: 4 },
//   mealDetails: { fontSize: 14, color: '#666666', marginTop: 8 },
//   moodPickerCard: { 
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
//   cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#3B82F6', marginBottom: 12, textAlign: 'center' },
//   moodOptions: { flexDirection: 'row', justifyContent: 'space-around' },
//   moodButton: { 
//     alignItems: 'center', 
//     padding: 10, 
//     borderWidth: 1, 
//     borderColor: '#3B82F6', 
//     borderRadius: 50, 
//     width: 60, 
//     height: 60, 
//     justifyContent: 'center' 
//   },
//   moodButtonSelected: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
//   suggestionText: { fontSize: 16, color: '#333333', textAlign: 'center', marginTop: 12 },
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
//   waterGlasses: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
//   glassContainer: { padding: 4 },
//   waterText: { fontSize: 16, color: '#333333', textAlign: 'center' },
//   backButton: { margin: 16, padding: 12, backgroundColor: '#FFFFFF', borderRadius: 8, alignItems: 'center' },
//   backButtonText: { fontSize: 16, color: '#3B82F6', fontWeight: '600' },
//   loadingText: { textAlign: 'center', fontSize: 16, color: '#666666', margin: 20 },
// });

// export default NutritionScreen;


// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const NutritionScreen = ({ navigation }) => {
//   const [mealSuggestion, setMealSuggestion] = useState(null);
//   const [waterIntake, setWaterIntake] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [mood, setMood] = useState(null);
//   const [suggestion, setSuggestion] = useState('');
//   const targetWaterIntake = 8;

//   const moods = [
//     { name: 'Happy', icon: 'smile', suggestion: 'Great mood! Enjoy your meal mindfully.' },
//     { name: 'Sad', icon: 'sad-tear', suggestion: 'Treat yourself to a healthy comfort food.' },
//     { name: 'Bored', icon: 'meh', suggestion: 'How about a quick walk instead of snacking?' },
//     { name: 'Stressed', icon: 'frown', suggestion: 'Try a 5-min deep breathing exercise before eating.' },
//   ];

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchUserData();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   const fetchUserData = async () => {
//     const user = auth().currentUser;
//     if (!user) {
//       navigation.navigate('Login');
//       return;
//     }

//     try {
//       const doc = await firestore().collection('users').doc(user.uid).get();
//       if (doc.exists) {
//         const data = doc.data().healthAssessment;
//         console.log('Firestore healthAssessment:', data);
//         await fetchMealPrediction(data);
//       } else {
//         setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//       }
//     } catch (error) {
//       console.error('Firestore fetch error:', error.message);
//       setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMealPrediction = async (userData) => {
//     try {
//       const filteredData = {
//         Height: userData.Height,
//         Weight: userData.Weight,
//         Age: userData.Age,
//         Gender: userData.Gender,
//         Activity_Level: userData.Activity_Level,
//         Goal: userData.Goal,
//         Health_Condition: userData.Health_Condition,
//         Dietary_Preference: userData.Dietary_Preference,
//         Food_Allergy: userData.Food_Allergy,
//       };
//       console.log('Sending to API:', filteredData);

//       const response = await fetch('http://192.168.1.101:5000/predict_meal', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(filteredData),
//       });
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`Network response not ok: ${response.status} - ${errorText}`);
//       }
//       const result = await response.json();
//       console.log('API response:', result);
//       setMealSuggestion({
//         name: result.meal,
//         calories: result.calories,
//         details: result.details,
//       });
//     } catch (error) {
//       console.error('Fetch meal error:', error.message, error.stack);
//       setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
//     }
//   };

//   const handleMoodSelection = async (selectedMood) => {
//     const user = auth().currentUser;
//     if (!user || !mealSuggestion) return;

//     setMood(selectedMood.name);
//     setSuggestion(selectedMood.suggestion);

//     try {
//       await firestore().collection('users').doc(user.uid).collection('mood_logs').add({
//         mood: selectedMood.name,
//         meal: mealSuggestion.name,
//         calories: mealSuggestion.calories,
//         timestamp: firestore.Timestamp.now(),
//       });
//     } catch (error) {
//       console.error('Error logging mood:', error.message);
//     }
//   };

//   const renderMoodPicker = () => (
//     <View style={styles.moodPickerCard}>
//       <Text style={styles.cardTitle}>How are you feeling?</Text>
//       <View style={styles.moodOptions}>
//         {moods.map(moodOption => (
//           <TouchableOpacity
//             key={moodOption.name}
//             style={[styles.moodButton, mood === moodOption.name && styles.moodButtonSelected]}
//             onPress={() => handleMoodSelection(moodOption)}
//           >
//             <Icon
//               name={moodOption.icon}
//               size={30}
//               color={mood === moodOption.name ? '#FFFFFF' : '#3B82F6'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       {suggestion ? <Text style={styles.suggestionText}>{suggestion}</Text> : null}
//     </View>
//   );

//   const renderWaterTracker = () => (
//     <View style={styles.waterTrackerCard}>
//       <View style={styles.waterHeader}>
//         <Icon name="tint" size={24} color="#3B82F6" />
//         <Text style={styles.cardTitle}>Water Intake</Text>
//       </View>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setWaterIntake(index + 1)}
//             style={styles.glassContainer}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={24}
//               color={index < waterIntake ? '#3B82F6' : '#E5E7EB'}
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
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Meal Plan</Text>
//         <Text style={styles.subtitle}>Tailored for your goals</Text>
//       </View>
//       {loading ? (
//         <Text style={styles.loadingText}>Loading your meal plan...</Text>
//       ) : mealSuggestion ? (
//         <View style={styles.mealCard}>
//           <Icon name="utensils" size={24} color="#3B82F6" />
//           <View style={styles.mealInfo}>
//             <Text style={styles.mealName}>{mealSuggestion.name}</Text>
//             <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
//             <Text style={styles.mealDetails}>{mealSuggestion.details}</Text>
//           </View>
//         </View>
//       ) : (
//         <Text style={styles.loadingText}>Failed to load meal plan</Text>
//       )}
//       {renderMoodPicker()}
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
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 }, 
//     shadowOpacity: 0.1, 
//     shadowRadius: 4, 
//     elevation: 2 
//   },
//   mealInfo: { flex: 1, marginLeft: 12 },
//   mealName: { fontSize: 16, fontWeight: '600', color: '#333333' },
//   mealCalories: { fontSize: 14, color: '#666666', marginTop: 4 },
//   mealDetails: { fontSize: 14, color: '#666666', marginTop: 8 },
//   moodPickerCard: { 
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
//   cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#3B82F6', marginBottom: 12, textAlign: 'center' },
//   moodOptions: { flexDirection: 'row', justifyContent: 'space-around' },
//   moodButton: { 
//     alignItems: 'center', 
//     padding: 10, 
//     borderWidth: 1, 
//     borderColor: '#3B82F6', 
//     borderRadius: 50, 
//     width: 60, 
//     height: 60, 
//     justifyContent: 'center' 
//   },
//   moodButtonSelected: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
//   suggestionText: { fontSize: 16, color: '#333333', textAlign: 'center', marginTop: 12 },
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
//   waterGlasses: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 12 },
//   glassContainer: { padding: 4 },
//   waterText: { fontSize: 16, color: '#333333', textAlign: 'center' },
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
  const [mood, setMood] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const targetWaterIntake = 8;

  const moods = [
    { name: 'Happy', icon: 'smile', suggestion: 'Great mood! Enjoy your meal mindfully.' },
    { name: 'Sad', icon: 'sad-tear', suggestion: 'Treat yourself to a healthy comfort food.' },
    { name: 'Bored', icon: 'meh', suggestion: 'How about a quick walk instead of snacking?' },
    { name: 'Stressed', icon: 'frown', suggestion: 'Try a 5-min deep breathing exercise before eating.' },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUserData = async () => {
    const user = auth().currentUser;
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    try {
      const doc = await firestore().collection('users').doc(user.uid).get();
      if (doc.exists) {
        const data = doc.data().healthAssessment;
        console.log('Firestore healthAssessment:', data);
        await fetchMealPrediction(data);
      } else {
        setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
      }
    } catch (error) {
      console.error('Firestore fetch error:', error.message);
      setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
    } finally {
      setLoading(false);
    }
  };

  const fetchMealPrediction = async (userData) => {
    try {
      const filteredData = {
        Height: userData.Height,
        Weight: userData.Weight,
        Age: userData.Age,
        Gender: userData.Gender,
        Activity_Level: userData.Activity_Level,
        Goal: userData.Goal,
        Health_Condition: userData.Health_Condition,
        Dietary_Preference: userData.Dietary_Preference,
        Food_Allergy: userData.Food_Allergy,
      };
      console.log('Sending to API:', filteredData);

      const response = await fetch('http://192.168.1.101:5000/predict_meal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredData),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response not ok: ${response.status} - ${errorText}`);
      }
      const result = await response.json();
      console.log('API response:', result);
      setMealSuggestion({
        name: result.meal,
        calories: result.calories,
        details: result.details,
      });
    } catch (error) {
      console.error('Fetch meal error:', error.message, error.stack);
      setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
    }
  };

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood.name);
    setSuggestion(selectedMood.suggestion);
  };

  const renderMealSection = () => (
    <View style={styles.mealSection}>
      <Text style={styles.mealSectionTitle}>Meal of the Moment</Text>
      {loading ? (
        <Text style={styles.loadingText}>Crafting your meal...</Text>
      ) : mealSuggestion ? (
        <View style={styles.mealCard}>
          <View style={styles.mealIconContainer}>
            <Icon name="utensils" size={50} color="#FFFFFF" />
          </View>
          <View style={styles.mealContent}>
            <Text style={styles.mealName}>{mealSuggestion.name}</Text>
            <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
            <Text style={styles.mealDetails}>{mealSuggestion.details}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Oops, no meal yet!</Text>
      )}
    </View>
  );

  const renderMoodPicker = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>How’s Your Vibe?</Text>
      <View style={styles.moodOptions}>
        {moods.map(moodOption => (
          <TouchableOpacity
            key={moodOption.name}
            style={[styles.moodButton, mood === moodOption.name && styles.moodButtonSelected]}
            onPress={() => handleMoodSelection(moodOption)}
          >
            <Icon
              name={moodOption.icon}
              size={26}
              color={mood === moodOption.name ? '#FFFFFF' : '#10B981'}
            />
          </TouchableOpacity>
        ))}
      </View>
      {suggestion ? <Text style={styles.suggestionText}>{suggestion}</Text> : null}
    </View>
  );

  const renderWaterTracker = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Water Tracker</Text>
      <View style={styles.waterGlasses}>
        {[...Array(targetWaterIntake)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setWaterIntake(index + 1)}
            style={styles.glassContainer}
          >
            <Icon
              name="glass-whiskey"
              size={20}
              color={index < waterIntake ? '#3B82F6' : '#D1D5DB'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.waterText}>{waterIntake}/{targetWaterIntake} glasses</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderMealSection()}
      <View style={styles.secondarySection}>
        {renderMoodPicker()}
        {renderWaterTracker()}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  mealSection: {
    backgroundColor: '#10B981',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    minHeight: 300,
  },
  mealSectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  mealCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  mealIconContainer: {
    backgroundColor: '#10B981',
    borderRadius: 50,
    padding: 16,
    marginRight: 20,
  },
  mealContent: {
    flex: 1,
  },
  mealName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 34,
  },
  mealCalories: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4B5563',
    marginTop: 4,
  },
  mealDetails: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 8,
    lineHeight: 24,
  },
  secondarySection: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#10B981',
  },
  moodButtonSelected: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  suggestionText: {
    fontSize: 15,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 8,
  },
  waterGlasses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  glassContainer: {
    padding: 4,
  },
  waterText: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
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
  loadingText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
});

export default NutritionScreen;