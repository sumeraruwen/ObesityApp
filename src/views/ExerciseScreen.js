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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchExercises();
      fetchCompletedExercises();
    });
    return unsubscribe;
  }, [navigation]);

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
          const response = await fetch('http://192.168.1.100:5000/predict_exercises', {
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
        const completedExercise = exercises[index];
        await updateWorkoutHistory(completedExercise);
        PushNotification.localNotification({
          channelId: "default_channel_id",
          title: "Exercise Completed",
          message: `Great job! You completed ${completedExercise.name}.`,
          playSound: true,
          vibrate: true,
          priority: 'high',
        });
      }
    } catch (error) {
      console.error('Error saving completion:', error);
    }
  };

  const updateWorkoutHistory = async (newlyCompletedExercise) => {
    const user = auth().currentUser;
    if (!user) return;

    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-03-25"
    const historyRef = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('workoutHistory')
      .doc(today);

    try {
      const doc = await historyRef.get();
      if (doc.exists) {
        // Update existing document by appending the new exercise
        const existingExercises = doc.data().exercises || [];
        const updatedExercises = [
          ...existingExercises,
          { name: newlyCompletedExercise.name, duration: newlyCompletedExercise.duration },
        ];
        await historyRef.update({
          exercises: updatedExercises,
          date: new Date().toISOString(),
        });
        console.log('Updated workoutHistory:', updatedExercises);
      } else {
        // Create new document for the day with the first completed exercise
        await historyRef.set({
          exercises: [{ name: newlyCompletedExercise.name, duration: newlyCompletedExercise.duration }],
          date: new Date().toISOString(),
        });
        console.log('Created workoutHistory:', [newlyCompletedExercise]);
      }
    } catch (error) {
      console.error('Error updating workout history:', error);
    }
  };

  const completeExercise = async () => {
    if (currentExerciseIndex !== null && timerSeconds === 0) {
      toggleCompletion(currentExerciseIndex);
      closeTimer();
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
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: { padding: 32, backgroundColor: '#10B981', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, alignItems: 'center' },
  headerText: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  subtitle: { fontSize: 16, color: '#E5E7EB', marginTop: 8, opacity: 0.9 },
  card: { margin: 16, padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2, borderWidth: 1, borderColor: '#E5E7EB' },
  loadingContainer: { alignItems: 'center', padding: 20 },
  loadingText: { fontSize: 18, color: '#6B7280', textAlign: 'center', marginTop: 20, fontWeight: '600' },
  errorText: { fontSize: 16, color: '#D32F2F', textAlign: 'center', padding: 20 },
  progressSection: { alignItems: 'center', marginBottom: 12 },
  progressRing: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' },
  progressFill: { position: 'absolute', top: 0, left: 0, height: '100%', backgroundColor: '#10B981' },
  progressText: { fontSize: 16, fontWeight: '600', color: '#111827' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 12 },
  durationText: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  exerciseItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 12, marginVertical: 8, borderWidth: 1, borderColor: '#E5E7EB', minHeight: 60 },
  completedItem: { backgroundColor: '#E5E7EB', borderColor: '#10B981' },
  exerciseContent: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 40 },
  exerciseDetails: { marginLeft: 16 },
  exerciseName: { fontSize: 18, fontWeight: '500', color: '#111827' },
  exerciseDuration: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  checkIcon: { position: 'absolute', right: 16 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24 },
  actionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, flex: 1, marginHorizontal: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  startButton: { backgroundColor: '#3B82F6' },
  refreshButton: { backgroundColor: '#10B981' },
  historyButton: { backgroundColor: '#4B5563' },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF', marginLeft: 8 },
  backButton: { marginHorizontal: 16, marginBottom: 16, paddingVertical: 12, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#3B82F6', backgroundColor: '#FFFFFF' },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#3B82F6' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { backgroundColor: '#FFFFFF', padding: 24, borderRadius: 20, width: '85%', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
  modalTitle: { fontSize: 24, fontWeight: '700', color: '#3B82F6', marginBottom: 12 },
  modalDuration: { fontSize: 40, fontWeight: '600', color: '#111827', marginBottom: 16 },
  modalInstructions: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 24, paddingHorizontal: 10 },
  timerButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  timerButton: { backgroundColor: '#4B5563', padding: 14, borderRadius: 10, alignItems: 'center', flex: 1, marginHorizontal: 5 },
  finishButton: { backgroundColor: '#10B981' },
  disabledButton: { backgroundColor: '#D1D5DB' },
});

export default ExerciseScreen;