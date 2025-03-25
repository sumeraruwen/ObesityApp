// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const ExerciseScreen = ({ navigation }) => {
//   const userLimitations = { hasJointPain: false };
//   const workoutSuggestion = [
//     { name: 'Brisk Walking', duration: '20 min', icon: 'walking' },
//     { name: 'Light Running', duration: '10 min', icon: 'running', restricted: userLimitations.hasJointPain },
//     { name: 'Stretching', duration: '5 min', icon: 'child' },
//   ].filter(exercise => !exercise.restricted);
//   const [completedExercises, setCompletedExercises] = useState([]);
//   const totalExercises = workoutSuggestion.length;
//   const completedCount = completedExercises.length;
//   const progressPercentage = (completedCount / totalExercises) * 100;

//   const toggleCompletion = (index) => {
//     setCompletedExercises(completedExercises.includes(index)
//       ? completedExercises.filter(i => i !== index)
//       : [...completedExercises, index]);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Workout Plan</Text>
//         <Text style={styles.subtitle}>Tailored for your needs</Text>
//       </View>
//       <View style={styles.workoutCard}>
//         <View style={styles.progressContainer}>
//           <View style={styles.progressCircle}>
//             <View style={{ ...styles.progressFill, height: `${progressPercentage}%` }} />
//             <Text style={styles.progressText}>{completedCount}/{totalExercises}</Text>
//           </View>
//           <Text style={styles.cardTitle}>Today’s Routine</Text>
//         </View>
//         {workoutSuggestion.map((exercise, index) => (
//           <View key={index} style={styles.exerciseItem}>
//             <View style={styles.exerciseContent}>
//               <Icon name={exercise.icon} size={24} color="#34C759" />
//               <Text style={styles.exerciseText}>{exercise.name} - {exercise.duration}</Text>
//             </View>
//             <TouchableOpacity onPress={() => toggleCompletion(index)} style={styles.checkButton}>
//               <Icon
//                 name={completedExercises.includes(index) ? 'check-circle' : 'circle'}
//                 size={24}
//                 color={completedExercises.includes(index) ? '#34C759' : '#666666'}
//               />
//             </TouchableOpacity>
//           </View>
//         ))}
//         <TouchableOpacity style={styles.startButton} onPress={() => alert('Starting a 35-min timer!')}>
//           <Text style={styles.buttonText}>Start Workout</Text>
//         </TouchableOpacity>
//       </View>
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
//   workoutCard: { backgroundColor: '#FFFFFF', margin: 16, padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
//   progressContainer: { alignItems: 'center', marginBottom: 20 },
//   progressCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' },
//   progressFill: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#34C759' },
//   progressText: { fontSize: 20, fontWeight: 'bold', color: '#333333', position: 'absolute' },
//   cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#3B82F6', marginTop: 12 },
//   exerciseItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 12, padding: 12, backgroundColor: '#F9F9F9', borderRadius: 8 },
//   exerciseContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
//   exerciseText: { fontSize: 16, color: '#333333', marginLeft: 12 },
//   checkButton: { padding: 4 },
//   startButton: { backgroundColor: '#3B82F6', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, marginTop: 20, alignItems: 'center' },
//   buttonText: { color: '#F5F5F5', fontSize: 16, fontWeight: '600' },
//   backButton: { margin: 16, padding: 12, backgroundColor: '#3B82F6', borderRadius: 8, alignItems: 'center' },
//   backButtonText: { fontSize: 16, color: '#F5F5F5', fontWeight: '600' },
// });

// export default ExerciseScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const ExerciseScreen = ({ navigation }) => {
//   const [exercises, setExercises] = useState([]);
//   const [completedExercises, setCompletedExercises] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [fadeAnim] = useState(new Animated.Value(0)); // Animation for fade-in

//   useEffect(() => {
//     fetchExercises();
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 800,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const fetchExercises = async () => {
//     const user = auth().currentUser;
//     if (!user) {
//       navigation.navigate('Login');
//       return;
//     }

//     try {
//       const doc = await firestore().collection('users').doc(user.uid).get();
//       if (doc.exists) {
//         const healthAssessment = doc.data().healthAssessment;
//         const response = await fetch('http://192.168.1.105:5000/predict_exercises', { // Replace with your backend IP
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(healthAssessment),
//         });
//         if (!response.ok) throw new Error('Failed to fetch exercises');
//         const result = await response.json();
//         const formattedExercises = result.exercises.map(name => ({
//           name: name.split(' - ')[0],
//           duration: name.split(' - ')[1],
//           icon: getIconForExercise(name),
//         }));
//         setExercises(formattedExercises);
//       }
//     } catch (error) {
//       console.error('Error fetching exercises:', error);
//       setExercises([
//         { name: 'Full Body Stretchhhh', duration: '5 min', icon: 'child' },
//         { name: 'Water Aerobics', duration: '15 min', icon: 'swimmer' },
//         { name: 'Wall Push-Ups', duration: '8 min', icon: 'dumbbell' },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getIconForExercise = (name) => {
//     const exerciseIcons = {
//       'Full Body Stretch': 'child', 'Seated Hamstring Stretch': 'child', 
//       'Shoulder and Arm Stretch': 'child', 'Neck and Back Stretch': 'child',
//       'Seated Cat-Cow Stretch': 'child', 'Brisk Walking': 'walking',
//       'Water Aerobics': 'swimmer', 'Stationary Cycling': 'bicycle',
//       'Slow Pace Walking': 'walking', 'Step-Ups (Low Height)': 'walking',
//       'Chair Cardio Dance': 'music', 'Chair Squats': 'chair',
//       'Wall Push-Ups': 'dumbbell', 'Seated Resistance Band Rows': 'dumbbell',
//       'Leg Press (Seated)': 'dumbbell', 'Arm Curls (Light Weights)': 'dumbbell',
//       'Seated Marching': 'walking', 'Arm Circles': 'sync',
//       'Side Leg Lifts': 'child', 'Ankle Rotations': 'sync',
//     };
//     const exerciseName = name.split(' - ')[0];
//     return exerciseIcons[exerciseName] || 'dumbbell';
//   };

//   const toggleCompletion = (index) => {
//     setCompletedExercises(prev => 
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   const totalDuration = exercises.reduce((sum, ex) => sum + parseInt(ex.duration), 0);
//   const totalExercises = exercises.length;
//   const completedCount = completedExercises.length;
//   const progressPercentage = totalExercises ? (completedCount / totalExercises) * 100 : 0;

//   return (
//     <ScrollView style={styles.container}>
//       <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
//         <Text style={styles.headerText}>Your Exercise Plan</Text>
//         <Text style={styles.subtitle}>Personalized for your health goals</Text>
//       </Animated.View>

//       <View style={styles.card}>
//         {loading ? (
//           <Text style={styles.loadingText}>Crafting your workout...</Text>
//         ) : (
//           <>
//             <View style={styles.progressSection}>
//               <View style={styles.progressRing}>
//                 <Animated.View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
//                 <Text style={styles.progressText}>{completedCount}/{totalExercises}</Text>
//               </View>
//               <Text style={styles.cardTitle}>Today’s Workout</Text>
//               <Text style={styles.durationText}>{totalDuration} min total</Text>
//             </View>

//             {exercises.map((exercise, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={[
//                   styles.exerciseItem,
//                   completedExercises.includes(index) && styles.completedItem,
//                 ]}
//                 onPress={() => toggleCompletion(index)}
//               >
//                 <View style={styles.exerciseContent}>
//                   <Icon name={exercise.icon} size={28} color="#4CAF50" />
//                   <View style={styles.exerciseDetails}>
//                     <Text style={styles.exerciseName}>{exercise.name}</Text>
//                     <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
//                   </View>
//                 </View>
//                 <Icon
//                   name={completedExercises.includes(index) ? 'check-circle' : 'circle'}
//                   size={24}
//                   color={completedExercises.includes(index) ? '#4CAF50' : '#B0BEC5'}
//                 />
//               </TouchableOpacity>
//             ))}

//             <TouchableOpacity
//               style={styles.startButton}
//               onPress={() => alert(`Starting your ${totalDuration}-minute workout!`)}
//             >
//               <Text style={styles.buttonText}>Start Workout</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>

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
//     backgroundColor: '#F7F9FC',
//   },
//   header: {
//     padding: 24,
//     backgroundColor: '#2196F3',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.5,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#E3F2FD',
//     marginTop: 8,
//     opacity: 0.9,
//   },
//   card: {
//     margin: 16,
//     padding: 20,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.15,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   progressSection: {
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   progressRing: {
//     width: 90,
//     height: 90,
//     borderRadius: 45,
//     backgroundColor: '#ECEFF1',
//     justifyContent: 'center',
//     alignItems: 'center',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   progressFill: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     height: '100%',
//     backgroundColor: '#4CAF50',
//   },
//   progressText: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#263238',
//   },
//   cardTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#2196F3',
//     marginTop: 12,
//   },
//   durationText: {
//     fontSize: 14,
//     color: '#78909C',
//     marginTop: 4,
//   },
//   exerciseItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 16,
//     backgroundColor: '#FAFAFA',
//     borderRadius: 12,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: '#E0E0E0',
//   },
//   completedItem: {
//     backgroundColor: '#E8F5E9',
//     borderColor: '#4CAF50',
//   },
//   exerciseContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   exerciseDetails: {
//     marginLeft: 16,
//   },
//   exerciseName: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#263238',
//   },
//   exerciseDuration: {
//     fontSize: 14,
//     color: '#78909C',
//     marginTop: 2,
//   },
//   startButton: {
//     backgroundColor: '#2196F3',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginTop: 24,
//     shadowColor: '#2196F3',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     elevation: 4,
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   backButton: {
//     marginHorizontal: 16,
//     marginBottom: 16,
//     padding: 12,
//     backgroundColor: '#607D8B',
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   backButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#607D8B',
//     textAlign: 'center',
//     padding: 20,
//   },
// });

// export default ExerciseScreen;

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated, ActivityIndicator, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const ExerciseScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [timerModalVisible, setTimerModalVisible] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [scaleAnim] = useState(new Animated.Value(1));
  const timerRef = useRef(null);

  // Configure Push Notifications
  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) => {
        console.log('Notification received:', notification);
      },
      requestPermissions: true,
    });

    PushNotification.checkPermissions((permissions) => {
      if (!permissions.alert) {
        PushNotification.requestPermissions();
      }
    });
  }, []);

  // Fetch data and persist completion on focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchExercises();
      fetchCompletedExercises();
    });
    return unsubscribe;
  }, [navigation]);

  // Exercise reminder every hour if incomplete
  useEffect(() => {
    let intervalId;
    const startReminderInterval = () => {
      intervalId = setInterval(() => {
        const remainingExercises = exercises.length - completedExercises.length;
        if (remainingExercises <= 0) {
          clearInterval(intervalId);
          PushNotification.cancelLocalNotifications({ id: 'exerciseReminder' });
          return;
        }
        PushNotification.localNotification({
          channelId: "default_channel_id",
          title: "Exercise Reminder",
          message: `You have ${remainingExercises} exercise${remainingExercises > 1 ? 's' : ''} left for today!`,
          playSound: true,
          vibrate: true,
          priority: 'high',
          id: 'exerciseReminder',
        });
      }, 60 * 60 * 1000); // Every hour
    };

    if (exercises.length > 0 && completedExercises.length < exercises.length) {
      startReminderInterval();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [exercises, completedExercises]);

  const fetchExercises = async () => {
    const user = auth().currentUser;
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cachedPlan = await AsyncStorage.getItem('exercisePlan');
      if (cachedPlan) {
        setExercises(JSON.parse(cachedPlan));
      } else {
        const doc = await firestore().collection('users').doc(user.uid).get();
        if (doc.exists) {
          const healthAssessment = doc.data().healthAssessment;
          const response = await fetch('http://192.168.1.105:5000/predict_exercises', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(healthAssessment),
          });
          if (!response.ok) throw new Error('Failed to fetch exercises');
          const result = await response.json();
          const formattedExercises = result.exercises.map(name => ({
            name: name.split(' - ')[0],
            duration: name.split(' - ')[1],
            icon: getIconForExercise(name),
            instructions: getInstructionsForExercise(name),
          }));
          setExercises(formattedExercises);
          await AsyncStorage.setItem('exercisePlan', JSON.stringify(formattedExercises));
          saveWorkoutHistory(formattedExercises);
        } else {
          throw new Error('User data not found');
        }
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setError(error.message);
      setExercises([
        { name: 'Gentle Yoga Flow', duration: '10 min', icon: 'child', instructions: 'Sit comfortably, flow through gentle poses.' },
        { name: 'Slow Pace Walking', duration: '25 min', icon: 'walking', instructions: 'Walk at a relaxed pace, swing arms naturally.' },
        { name: 'Seated Resistance Band Rows', duration: '10 min', icon: 'dumbbell', instructions: 'Sit, pull band towards chest.' },
      ]);
    } finally {
      setLoading(false);
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    }
  };

  const fetchCompletedExercises = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const doc = await firestore().collection('users').doc(user.uid).get();
      if (doc.exists && doc.data().completedExercises) {
        setCompletedExercises(doc.data().completedExercises);
      }
    } catch (error) {
      console.error('Error fetching completed exercises:', error);
    }
  };

  const getIconForExercise = (name) => {
    const exerciseIcons = {
      'Full Body Stretch': 'child', 'Seated Hamstring Stretch': 'child', 'Gentle Yoga Flow': 'child',
      'Brisk Walking': 'walking', 'Water Aerobics': 'swimmer', 'Stationary Cycling': 'bicycle',
      'Slow Pace Walking': 'walking', 'Chair Cardio Dance': 'music', 'Chair Squats': 'chair',
      'Wall Push-Ups': 'dumbbell', 'Seated Resistance Band Rows': 'dumbbell', 'Arm Curls (Light Weights)': 'dumbbell',
      'Seated Marching': 'walking', 'Arm Circles': 'sync', 'Standing Arm Swings': 'sync',
    };
    return exerciseIcons[name.split(' - ')[0]] || 'dumbbell';
  };

  const getInstructionsForExercise = (name) => {
    const exerciseInstructions = {
      'Full Body Stretch': 'Stand tall, reach arms up, then bend forward gently.',
      'Gentle Yoga Flow': 'Sit comfortably, flow through gentle poses like cat-cow.',
      'Brisk Walking': 'Walk at a steady pace, keep posture upright.',
      'Water Aerobics': 'In water, perform arm and leg movements against resistance.',
      'Wall Push-Ups': 'Face wall, place hands shoulder-width, push in and out.',
      'Seated Resistance Band Rows': 'Sit, hold band, pull elbows back to chest.',
    };
    return exerciseInstructions[name.split(' - ')[0]] || 'Follow standard exercise form.';
  };

  const toggleCompletion = async (index) => {
    const user = auth().currentUser;
    if (!user) return;

    const newCompleted = completedExercises.includes(index)
      ? completedExercises.filter(i => i !== index)
      : [...completedExercises, index];
    setCompletedExercises(newCompleted);

    try {
      await firestore().collection('users').doc(user.uid).update({
        completedExercises: newCompleted,
        lastCompleted: firestore.FieldValue.serverTimestamp(),
      });
      if (!completedExercises.includes(index)) {
        PushNotification.localNotification({
          channelId: "default_channel_id",
          title: "Exercise Completed",
          message: `Great job! You completed ${exercises[index].name}.`,
          playSound: true,
          vibrate: true,
          priority: 'high',
        });
      }
    } catch (error) {
      console.error('Error saving completion:', error);
    }
  };

  const completeExercise = async () => {
    if (currentExerciseIndex !== null && timerSeconds === 0) {
      toggleCompletion(currentExerciseIndex);
      closeTimer();
    }
  };

  const saveWorkoutHistory = async (exercises) => {
    const user = auth().currentUser;
    if (user) {
      const historyEntry = {
        date: new Date().toISOString(),
        exercises: exercises.map(ex => ({ name: ex.name, duration: ex.duration })),
      };
      await firestore().collection('users').doc(user.uid).collection('workoutHistory').add(historyEntry);
    }
  };

  const startTimer = (index) => {
    setCurrentExerciseIndex(index);
    setTimerSeconds(parseInt(exercises[index].duration) * 60);
    setTimerModalVisible(true);
    setIsTimerRunning(true);
    timerRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
  };

  const resumeTimer = () => {
    if (!isTimerRunning && timerSeconds > 0) {
      setIsTimerRunning(true);
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const closeTimer = () => {
    clearInterval(timerRef.current);
    setTimerModalVisible(false);
    setIsTimerRunning(false);
    setCurrentExerciseIndex(null);
  };

  const refreshPlan = async () => {
    await AsyncStorage.removeItem('exercisePlan');
    setCompletedExercises([]);
    fetchExercises();
  };

  const onPressIn = () => Animated.spring(scaleAnim, { toValue: 0.95, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();

  const totalDuration = exercises.reduce((sum, ex) => sum + parseInt(ex.duration), 0);
  const totalExercises = exercises.length;
  const completedCount = completedExercises.length;

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.headerText}>Your Exercise Plan</Text>
        <Text style={styles.subtitle}>Tailored to Your Health Profile</Text>
      </Animated.View>

      <View style={styles.card}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Crafting your workout...</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}. Showing default plan.</Text>
        ) : (
          <>
            <View style={styles.progressSection}>
              <View style={styles.progressRing}>
                <Animated.View style={[styles.progressFill, { width: `${(completedCount / totalExercises) * 100}%` }]} />
                <Text style={styles.progressText}>{completedCount}/{totalExercises}</Text>
              </View>
              <Text style={styles.cardTitle}>Today’s Workout Plan</Text>
              <Text style={styles.durationText}>{totalDuration} min • {completedCount} of {totalExercises} completed</Text>
            </View>

            {exercises.map((exercise, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.exerciseItem,
                  completedExercises.includes(index) && styles.completedItem,
                ]}
                onPress={() => toggleCompletion(index)}
                onLongPress={() => !completedExercises.includes(index) && startTimer(index)}
              >
                <View style={styles.exerciseContent}>
                  <Icon name={exercise.icon} size={28} color={completedExercises.includes(index) ? '#10B981' : '#3B82F6'} />
                  <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
                  </View>
                </View>
                <Icon
                  name={completedExercises.includes(index) ? 'check-circle' : 'circle'}
                  size={24}
                  color={completedExercises.includes(index) ? '#10B981' : '#D1D5DB'}
                  style={styles.checkIcon}
                />
              </TouchableOpacity>
            ))}

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.startButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={() => startTimer(exercises.findIndex(ex => !completedExercises.includes(exercises.indexOf(ex))))}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name="play" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>Start Workout</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.refreshButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={refreshPlan}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name="sync" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>New Plan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.historyButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={() => navigation.navigate('WorkoutHistory')}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name="history" size={18} color="#FFFFFF" />
                <Text style={styles.buttonText}>History</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* Timer Modal */}
      <Modal visible={timerModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{exercises[currentExerciseIndex]?.name}</Text>
            <Text style={styles.modalDuration}>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</Text>
            <Text style={styles.modalInstructions}>{exercises[currentExerciseIndex]?.instructions}</Text>
            <View style={styles.timerButtons}>
              <TouchableOpacity
                style={[styles.timerButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={isTimerRunning ? pauseTimer : resumeTimer}
                disabled={timerSeconds === 0}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name={isTimerRunning ? 'pause' : 'play'} size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timerButton, timerSeconds === 0 ? styles.finishButton : styles.disabledButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={completeExercise}
                disabled={timerSeconds !== 0}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name="check" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.timerButton, { transform: [{ scale: scaleAnim }] }]}
                onPress={closeTimer}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
              >
                <Icon name="times" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' }, // From NutritionScreen
  header: { 
    padding: 32, 
    backgroundColor: '#10B981', // Green from NutritionScreen
    borderBottomLeftRadius: 40, 
    borderBottomRightRadius: 40, 
    alignItems: 'center' 
  },
  headerText: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: '#FFFFFF', 
    letterSpacing: 0.5 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#E5E7EB', // Lighter gray from NutritionScreen
    marginTop: 8, 
    opacity: 0.9 
  },
  card: { 
    margin: 16, 
    padding: 16, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2, 
    borderWidth: 1, 
    borderColor: '#E5E7EB' // From NutritionScreen
  },
  loadingContainer: { alignItems: 'center', padding: 20 },
  loadingText: { 
    fontSize: 18, 
    color: '#6B7280', // Gray from NutritionScreen
    textAlign: 'center', 
    marginTop: 20, 
    fontWeight: '600' 
  },
  errorText: { 
    fontSize: 16, 
    color: '#D32F2F', 
    textAlign: 'center', 
    padding: 20 
  },
  progressSection: { alignItems: 'center', marginBottom: 12 },
  progressRing: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#D1D5DB', // Light gray from NutritionScreen
    justifyContent: 'center', 
    alignItems: 'center', 
    overflow: 'hidden', 
    position: 'relative' 
  },
  progressFill: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: '100%', 
    backgroundColor: '#10B981' // Green from NutritionScreen
  },
  progressText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#111827' // Dark gray from NutritionScreen
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#111827', 
    marginBottom: 12 
  },
  durationText: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 4 
  },
  exerciseItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 16, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    marginVertical: 8, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    minHeight: 60 
  },
  completedItem: { 
    backgroundColor: '#E5E7EB', // Subtle gray for completed
    borderColor: '#10B981' 
  },
  exerciseContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1, 
    marginRight: 40 
  },
  exerciseDetails: { 
    marginLeft: 16 
  },
  exerciseName: { 
    fontSize: 18, 
    fontWeight: '500', 
    color: '#111827' 
  },
  exerciseDuration: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 2 
  },
  checkIcon: { 
    position: 'absolute', 
    right: 16 
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 24 
  },
  actionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    paddingHorizontal: 16, 
    borderRadius: 12, 
    flex: 1, 
    marginHorizontal: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  startButton: { 
    backgroundColor: '#3B82F6' // Blue from NutritionScreen
  },
  refreshButton: { 
    backgroundColor: '#10B981' // Green from NutritionScreen
  },
  historyButton: { 
    backgroundColor: '#4B5563' // Darker gray from NutritionScreen
  },
  buttonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#FFFFFF', 
    marginLeft: 8 
  },
  backButton: { 
    marginHorizontal: 16, 
    marginBottom: 16, 
    paddingVertical: 12, 
    borderRadius: 12, 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#3B82F6', 
    backgroundColor: '#FFFFFF' 
  },
  backButtonText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#3B82F6' 
  },
  modalContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.6)' 
  },
  modalContent: { 
    backgroundColor: '#FFFFFF', 
    padding: 24, 
    borderRadius: 20, 
    width: '85%', 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 6 
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: '700', 
    color: '#3B82F6', 
    marginBottom: 12 
  },
  modalDuration: { 
    fontSize: 40, 
    fontWeight: '600', 
    color: '#111827', 
    marginBottom: 16 
  },
  modalInstructions: { 
    fontSize: 16, 
    color: '#6B7280', 
    textAlign: 'center', 
    marginBottom: 24, 
    paddingHorizontal: 10 
  },
  timerButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%' 
  },
  timerButton: { 
    backgroundColor: '#4B5563', 
    padding: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    flex: 1, 
    marginHorizontal: 5 
  },
  finishButton: { 
    backgroundColor: '#10B981' 
  },
  disabledButton: { 
    backgroundColor: '#D1D5DB' 
  },
});

export default ExerciseScreen;