// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';
// import PushNotification from 'react-native-push-notification';

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

//   // Configure Push Notifications
//   useEffect(() => {
//     console.log('Configuring PushNotification');
//     PushNotification.configure({
//       onNotification: (notification) => {
//         console.log('Notification received:', notification);
//       },
//       requestPermissions: true,
//     });

//     PushNotification.checkPermissions((permissions) => {
//       console.log('Notification permissions:', permissions);
//       if (!permissions.alert) {
//         PushNotification.requestPermissions();
//       }
//     });
//   }, []);

//   // Daily Reset at Midnight
//   useEffect(() => {
//     const checkReset = async () => {
//       const now = new Date();
//       if (now.getHours() === 0 && now.getMinutes() === 0) {
//         const user = auth().currentUser;
//         if (user) {
//           const today = new Date().toISOString().split('T')[0];
//           setWaterIntake(0);
//           await firestore()
//             .collection('users')
//             .doc(user.uid)
//             .collection('water_logs')
//             .doc(today)
//             .set({ cups: 0, timestamp: firestore.Timestamp.now() }, { merge: true });
//           console.log('Water intake reset at midnight');
//           PushNotification.cancelLocalNotifications({ id: '12345' });
//         }
//       }
//     };

//     const interval = setInterval(checkReset, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch data on screen focus
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchUserData();
//       fetchWaterIntake();
//     });
//     return unsubscribe;
//   }, [navigation]);

//   // Temporary 10-second notification interval
//   useEffect(() => {
//     let intervalId;

//     const startReminderInterval = () => {
//       intervalId = setInterval(() => {
//         const remainingCups = targetWaterIntake - waterIntake;
//         if (remainingCups <= 0) {
//           console.log('Goal met, stopping reminders');
//           clearInterval(intervalId);
//           PushNotification.cancelLocalNotifications({ id: '12345' });
//           return;
//         }

//         console.log('Sending reminder for', remainingCups, 'cups remaining');
//         PushNotification.localNotification({
//           channelId: "default_channel_id",
//           title: "Water Reminder",
//           message: `Stay hydrated! You still need ${remainingCups} cup${remainingCups > 1 ? 's' : ''} today.`,
//           playSound: true,
//           vibrate: true,
//           priority: 'high',
//           id: '12345',
//         });
//       // }, 10 * 1000); // Every 10 seconds
//      }, 60 * 60 * 1000);
//     };

//     if (waterIntake > 0) {
//       console.log('Starting reminder interval');
//       startReminderInterval();
//     }

//     return () => {
//       if (intervalId) {
//         console.log('Cleaning up reminder interval');
//         clearInterval(intervalId);
//       }
//     };
//   }, [waterIntake]);

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

//   const fetchWaterIntake = async () => {
//     const user = auth().currentUser;
//     if (!user) return;

//     try {
//       const today = new Date().toISOString().split('T')[0];
//       const docRef = await firestore()
//         .collection('users')
//         .doc(user.uid)
//         .collection('water_logs')
//         .doc(today)
//         .get();

//       if (docRef.exists) {
//         setWaterIntake(docRef.data().cups || 0);
//       } else {
//         setWaterIntake(0);
//       }
//     } catch (error) {
//       console.error('Error fetching water intake:', error.message);
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

//       const response = await fetch('http://192.168.1.104:5000/predict_meal', {
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

//   const handleMoodSelection = (selectedMood) => {
//     setMood(selectedMood.name);
//     setSuggestion(selectedMood.suggestion);
//   };

//   const handleWaterIntake = async (cups) => {
//     const user = auth().currentUser;
//     if (!user) return;

//     console.log('Handling water intake:', cups);
//     setWaterIntake(cups);
//     const today = new Date().toISOString().split('T')[0];

//     try {
//       await firestore()
//         .collection('users')
//         .doc(user.uid)
//         .collection('water_logs')
//         .doc(today)
//         .set({ cups, timestamp: firestore.Timestamp.now() }, { merge: true });
//       console.log('Water intake saved:', cups);

//       console.log('Sending immediate notification');
//       PushNotification.localNotification({
//         channelId: "default_channel_id",
//         title: "Water Updated",
//         message: `You’ve logged ${cups} cup${cups > 1 ? 's' : ''}!`,
//         playSound: true,
//         vibrate: true,
//         priority: "high",
//       });
//     } catch (error) {
//       console.error('Error saving water intake:', error.message);
//       Alert.alert('Error', 'Failed to save water intake.');
//     }
//   };

//   const renderMealSection = () => (
//     <View style={styles.mealSection}>
//       <Text style={styles.mealSectionTitle}>Meal of the Moment</Text>
//       {loading ? (
//         <Text style={styles.loadingText}>Crafting your meal...</Text>
//       ) : mealSuggestion ? (
//         <View style={styles.mealCard}>
//           <View style={styles.mealIconContainer}>
//             <Icon name="utensils" size={50} color="#FFFFFF" />
//           </View>
//           <View style={styles.mealContent}>
//             <Text style={styles.mealName}>{mealSuggestion.name}</Text>
//             <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
//             <Text style={styles.mealDetails}>{mealSuggestion.details}</Text>
//           </View>
//         </View>
//       ) : (
//         <Text style={styles.loadingText}>Oops, no meal yet!</Text>
//       )}
//     </View>
//   );

//   const renderMoodPicker = () => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>How’s Your Vibe?</Text>
//       <View style={styles.moodOptions}>
//         {moods.map((moodOption) => (
//           <TouchableOpacity
//             key={moodOption.name}
//             style={[styles.moodButton, mood === moodOption.name && styles.moodButtonSelected]}
//             onPress={() => handleMoodSelection(moodOption)}
//           >
//             <Icon
//               name={moodOption.icon}
//               size={26}
//               color={mood === moodOption.name ? '#FFFFFF' : '#10B981'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       {suggestion ? <Text style={styles.suggestionText}>{suggestion}</Text> : null}
//     </View>
//   );

//   const renderWaterTracker = () => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Water Tracker</Text>
//       <View style={styles.waterGlasses}>
//         {[...Array(targetWaterIntake)].map((_, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => handleWaterIntake(index + 1)}
//             style={styles.glassContainer}
//           >
//             <Icon
//               name="glass-whiskey"
//               size={20}
//               color={index < waterIntake ? '#3B82F6' : '#D1D5DB'}
//             />
//           </TouchableOpacity>
//         ))}
//       </View>
//       <Text style={styles.waterText}>
//         {waterIntake}/{targetWaterIntake} glasses
//         {waterIntake < targetWaterIntake ? ` - ${targetWaterIntake - waterIntake} to go!` : ' - Goal met!'}
//       </Text>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       {renderMealSection()}
//       <View style={styles.secondarySection}>
//         {renderMoodPicker()}
//         {renderWaterTracker()}
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
//           <Text style={styles.backButtonText}>Back to Home</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC',
//   },
//   mealSection: {
//     backgroundColor: '#10B981',
//     paddingVertical: 32,
//     paddingHorizontal: 20,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     minHeight: 300,
//   },
//   mealSectionTitle: {
//     fontSize: 32,
//     fontWeight: '800',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 20,
//     letterSpacing: 0.5,
//   },
//   mealCard: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   mealIconContainer: {
//     backgroundColor: '#10B981',
//     borderRadius: 50,
//     padding: 16,
//     marginRight: 20,
//   },
//   mealContent: {
//     flex: 1,
//   },
//   mealName: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#111827',
//     lineHeight: 34,
//   },
//   mealCalories: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#4B5563',
//     marginTop: 4,
//   },
//   mealDetails: {
//     fontSize: 16,
//     color: '#6B7280',
//     marginTop: 8,
//     lineHeight: 24,
//   },
//   secondarySection: {
//     padding: 16,
//   },
//   card: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 12,
//   },
//   moodOptions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   moodButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     borderWidth: 2,
//     borderColor: '#10B981',
//   },
//   moodButtonSelected: {
//     backgroundColor: '#10B981',
//     borderColor: '#10B981',
//   },
//   suggestionText: {
//     fontSize: 15,
//     color: '#4B5563',
//     textAlign: 'center',
//     marginTop: 8,
//   },
//   waterGlasses: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     flexWrap: 'wrap',
//     marginBottom: 8,
//   },
//   glassContainer: {
//     padding: 4,
//   },
//   waterText: {
//     fontSize: 14,
//     color: '#4B5563',
//     textAlign: 'center',
//   },
//   backButton: {
//     backgroundColor: '#FFFFFF',
//     paddingVertical: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#3B82F6',
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#3B82F6',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginTop: 20,
//     fontWeight: '600',
//   },
// });

// export default NutritionScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NutritionScreen = ({ navigation, route }) => {
  const [mealSuggestion, setMealSuggestion] = useState(null);
  const [allMeals, setAllMeals] = useState([]);
  const [waterIntake, setWaterIntake] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mood, setMood] = useState(null);
  const [suggestion, setSuggestion] = useState('');
  const [lastHealthData, setLastHealthData] = useState(null);
  const targetWaterIntake = 8;

  const moods = [
    { name: 'Happy', icon: 'smile', suggestion: 'Great mood! Enjoy your meal mindfully.' },
    { name: 'Sad', icon: 'sad-tear', suggestion: 'Treat yourself to a healthy comfort food.' },
    { name: 'Bored', icon: 'meh', suggestion: 'How about a quick walk instead of snacking?' },
    { name: 'Stressed', icon: 'frown', suggestion: 'Try a 5-min deep breathing exercise before eating.' },
  ];

  useEffect(() => {
    console.log('Configuring PushNotification');
    PushNotification.configure({
      onNotification: (notification) => {
        console.log('Notification received:', notification);
      },
      requestPermissions: true,
    });

    PushNotification.checkPermissions((permissions) => {
      console.log('Notification permissions:', permissions);
      if (!permissions.alert) {
        PushNotification.requestPermissions();
      }
    });
  }, []);

  useEffect(() => {
    const checkReset = async () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        const user = auth().currentUser;
        if (user) {
          const today = new Date().toISOString().split('T')[0];
          setWaterIntake(0);
          await firestore()
            .collection('users')
            .doc(user.uid)
            .collection('water_logs')
            .doc(today)
            .set({ cups: 0, timestamp: firestore.Timestamp.now() }, { merge: true });
          console.log('Water intake reset at midnight');
          PushNotification.cancelLocalNotifications({ id: '12345' });
        }
      }
    };

    const interval = setInterval(checkReset, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('NutritionScreen focused, route params:', route.params);
      fetchUserData();
      fetchWaterIntake();
    });
    return unsubscribe;
  }, [navigation, route.params]); // Added route.params to trigger on navigation

  useEffect(() => {
    let intervalId;
    const startReminderInterval = () => {
      intervalId = setInterval(() => {
        const remainingCups = targetWaterIntake - waterIntake;
        if (remainingCups <= 0) {
          console.log('Goal met, stopping reminders');
          clearInterval(intervalId);
          PushNotification.cancelLocalNotifications({ id: '12345' });
          return;
        }

        console.log('Sending reminder for', remainingCups, 'cups remaining');
        PushNotification.localNotification({
          channelId: "default_channel_id",
          title: "Water Reminder",
          message: `Stay hydrated! You still need ${remainingCups} cup${remainingCups > 1 ? 's' : ''} today.`,
          playSound: true,
          vibrate: true,
          priority: 'high',
          id: '12345',
        });
      }, 60 * 60 * 1000);
    };

    if (waterIntake > 0) {
      console.log('Starting reminder interval');
      startReminderInterval();
    }

    return () => {
      if (intervalId) {
        console.log('Cleaning up reminder interval');
        clearInterval(intervalId);
      }
    };
  }, [waterIntake]);

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

        const healthDataString = JSON.stringify(data);
        if (healthDataString !== lastHealthData || route.params?.refresh) {
          console.log('Health data changed or refresh requested, clearing cache');
          console.log('Previous:', lastHealthData);
          console.log('Current:', healthDataString);
          const today = new Date().toISOString().split('T')[0];
          await AsyncStorage.removeItem(`meals_${today}`);
          setLastHealthData(healthDataString);
          if (route.params?.refresh) {
            console.log('Forced refresh from route params');
            navigation.setParams({ refresh: false }); // Reset param
          }
        } else {
          console.log('No change in health data');
        }

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

  const fetchWaterIntake = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const today = new Date().toISOString().split('T')[0];
      const docRef = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('water_logs')
        .doc(today)
        .get();

      if (docRef.exists) {
        setWaterIntake(docRef.data().cups || 0);
      } else {
        setWaterIntake(0);
      }
    } catch (error) {
      console.error('Error fetching water intake:', error.message);
    }
  };

  const fetchMealPrediction = async (userData) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const cachedMealsKey = `meals_${today}`;
      const cachedMeals = await AsyncStorage.getItem(cachedMealsKey);

      if (cachedMeals && !route.params?.refresh) {
        console.log('Using cached meals:', cachedMeals);
        const meals = JSON.parse(cachedMeals);
        setAllMeals(meals);
        selectDailyMeal(meals);
        return;
      }

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

      const response = await fetch('http://192.168.1.104:5000/predict_meal', {
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

      const meals = result.meals;
      setAllMeals(meals);
      await AsyncStorage.setItem(cachedMealsKey, JSON.stringify(meals));
      selectDailyMeal(meals);
    } catch (error) {
      console.error('Fetch meal error:', error.message, error.stack);
      setMealSuggestion({ name: 'Default Meal', calories: 450, details: 'Default suggestion' });
    }
  };

  const selectDailyMeal = (meals) => {
    const dayOfWeek = new Date().getDay();
    const mealIndex = dayOfWeek % meals.length;
    const selectedMeal = meals[mealIndex];
    console.log('Selected meal for day', dayOfWeek, ':', selectedMeal);
    setMealSuggestion({
      name: selectedMeal.meal,
      calories: selectedMeal.calories,
      details: selectedMeal.details,
    });
  };

  const handleMoodSelection = (selectedMood) => {
    setMood(selectedMood.name);
    setSuggestion(selectedMood.suggestion);
  };

  const handleWaterIntake = async (cups) => {
    const user = auth().currentUser;
    if (!user) return;

    console.log('Handling water intake:', cups);
    setWaterIntake(cups);
    const today = new Date().toISOString().split('T')[0];

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('water_logs')
        .doc(today)
        .set({ cups, timestamp: firestore.Timestamp.now() }, { merge: true });
      console.log('Water intake saved:', cups);

      console.log('Sending immediate notification');
      PushNotification.localNotification({
        channelId: "default_channel_id",
        title: "Water Updated",
        message: `You’ve logged ${cups} cup${cups > 1 ? 's' : ''}!`,
        playSound: true,
        vibrate: true,
        priority: "high",
      });
    } catch (error) {
      console.error('Error saving water intake:', error.message);
      Alert.alert('Error', 'Failed to save water intake.');
    }
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
        {moods.map((moodOption) => (
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
            onPress={() => handleWaterIntake(index + 1)}
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
      <Text style={styles.waterText}>
        {waterIntake}/{targetWaterIntake} glasses
        {waterIntake < targetWaterIntake ? ` - ${targetWaterIntake - waterIntake} to go!` : ' - Goal met!'}
      </Text>
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