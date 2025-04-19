import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PushNotification from 'react-native-push-notification';

const GoalsScreen = ({ navigation }) => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ type: '', target: '', deadline: '' });
  const [loading, setLoading] = useState(true);
  const [progressData, setProgressData] = useState({ weight: 0, water: 0, workouts: 0 });

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    fetchGoals();
    fetchProgressData();
  }, [navigation]);

  useEffect(() => {
    PushNotification.configure({
      onNotification: (notification) => console.log('Notification:', notification),
      requestPermissions: true,
    });

    const interval = setInterval(() => {
      const incompleteGoals = goals.filter(g => !g.completed && new Date(g.deadline) > new Date());
      incompleteGoals.forEach(goal => {
        const daysLeft = Math.ceil((new Date(goal.deadline) - new Date()) / (1000 * 60 * 60 * 24));
        if (daysLeft <= 3 && daysLeft > 0) {
          PushNotification.localNotification({
            channelId: 'default_channel_id',
            title: 'Goal Reminder',
            message: `${goal.type} goal "${goal.target}" is due in ${daysLeft} day${daysLeft > 1 ? 's' : ''}!`,
            playSound: true,
            vibrate: true,
            priority: 'high',
          });
        }
      });
    }, 24 * 60 * 60 * 1000); // Daily check

    return () => clearInterval(interval);
  }, [goals]);

  // Auto complete Goals 
  useEffect(() => {
    const user = auth().currentUser;
    if (!user || goals.length === 0) return;

    goals.forEach(async (goal) => {
      if (goal.completed) return;

      let isCompleted = false;
      if (goal.type === 'Weight Loss' && progressData.weight <= goal.target) {
        isCompleted = true;
      } else if (goal.type === 'Workouts' && progressData.workouts >= goal.target) {
        isCompleted = true;
      } else if (goal.type === 'Water' && progressData.water >= goal.target) {
        isCompleted = true;
      }

      if (isCompleted) {
        try {
          await firestore().collection('users').doc(user.uid).collection('goals').doc(goal.id).update({
            completed: true,
            completedAt: firestore.Timestamp.now(),
          });
          setGoals(prevGoals => prevGoals.map(g => 
            g.id === goal.id ? { ...g, completed: true } : g
          ));
          PushNotification.localNotification({
            channelId: 'default_channel_id',
            title: 'Goal Achieved!',
            message: `Congrats! You completed your ${goal.type} goal: ${goal.target}.`,
            playSound: true,
            vibrate: true,
          });
        } catch (error) {
          console.error('Error auto-completing goal:', error);
        }
      }
    });
  }, [progressData, goals]);

  const fetchGoals = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const doc = await firestore().collection('users').doc(user.uid).collection('goals').get();
      const fetchedGoals = doc.docs.map(d => ({ id: d.id, ...d.data() }));
      setGoals(fetchedGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      Alert.alert('Error', 'Failed to load goals.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProgressData = async () => {
    const user = auth().currentUser;
    if (!user) return;

    try {
      const profileDoc = await firestore().collection('users').doc(user.uid).get();
      const waterDoc = await firestore().collection('users').doc(user.uid).collection('water_logs').doc(new Date().toISOString().split('T')[0]).get();
      const historyDoc = await firestore().collection('users').doc(user.uid).collection('workoutHistory').doc(new Date().toISOString().split('T')[0]).get();

      setProgressData({
        weight: profileDoc.data()?.healthAssessment?.Weight || 0,
        water: waterDoc.data()?.cups || 0,
        workouts: historyDoc.data()?.exercises?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const addGoal = async () => {
    if (!newGoal.type || !newGoal.target || !newGoal.deadline) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const user = auth().currentUser;
    if (!user) return;

    const goalData = {
      type: newGoal.type,
      target: newGoal.type === 'Weight Loss' ? parseFloat(newGoal.target) : parseInt(newGoal.target, 10),
      deadline: newGoal.deadline,
      completed: false,
      createdAt: firestore.Timestamp.now(),
    };

    try {
      const ref = await firestore().collection('users').doc(user.uid).collection('goals').add(goalData);
      setGoals([...goals, { id: ref.id, ...goalData }]);
      setNewGoal({ type: '', target: '', deadline: '' });
      Alert.alert('Success', 'Goal added!');
    } catch (error) {
      console.error('Error adding goal:', error);
      Alert.alert('Error', 'Failed to add goal.');
    }
  };

  const toggleGoalCompletion = async (goalId) => {
    const user = auth().currentUser;
    if (!user) return;

    const goal = goals.find(g => g.id === goalId);
    try {
      await firestore().collection('users').doc(user.uid).collection('goals').doc(goalId).update({
        completed: !goal.completed,
        completedAt: !goal.completed ? firestore.Timestamp.now() : null,
      });
      setGoals(goals.map(g => (g.id === goalId ? { ...g, completed: !g.completed } : g)));
      if (!goal.completed) {
        PushNotification.localNotification({
          channelId: 'default_channel_id',
          title: 'Goal Achieved!',
          message: `Congrats! You completed your ${goal.type} goal: ${goal.target}.`,
          playSound: true,
          vibrate: true,
        });
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const renderProgress = () => (
    <View style={styles.progressSection}>
      <Text style={styles.sectionTitle}>Your Progress Today</Text>
      <View style={styles.progressItem}>
        <Icon name="weight" size={20} color="#10B981" />
        <Text style={styles.progressText}>Weight: {progressData.weight} kg</Text>
      </View>
      <View style={styles.progressItem}>
        <Icon name="glass-whiskey" size={20} color="#10B981" />
        <Text style={styles.progressText}>Water: {progressData.water}/8 glasses</Text>
      </View>
      <View style={styles.progressItem}>
        <Icon name="dumbbell" size={20} color="#10B981" />
        <Text style={styles.progressText}>Workouts: {progressData.workouts} completed</Text>
      </View>
    </View>
  );

  const renderGoalForm = () => (
    <View style={styles.formSection}>
      <Text style={styles.sectionTitle}>Set a New Goal</Text>
      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Weight Loss, Workouts, Water)"
        placeholderTextColor="#6B7280"
        value={newGoal.type}
        onChangeText={text => setNewGoal({ ...newGoal, type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Target (e.g., 5 kg, 3 workouts, 8 glasses)"
        placeholderTextColor="#6B7280"
        value={newGoal.target}
        onChangeText={text => setNewGoal({ ...newGoal, target: text })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Deadline (e.g., 2025-12-31)"
        placeholderTextColor="#6B7280"
        value={newGoal.deadline}
        onChangeText={text => setNewGoal({ ...newGoal, deadline: text })}
      />
      <TouchableOpacity style={styles.addButton} onPress={addGoal}>
        <Text style={styles.addButtonText}>Add Goal</Text>
      </TouchableOpacity>
    </View>
  );

  const renderGoalsList = () => (
    <View style={styles.goalsSection}>
      <Text style={styles.sectionTitle}>Your Goals</Text>
      {goals.length === 0 ? (
        <Text style={styles.noGoalsText}>No goals set yet.</Text>
      ) : (
        goals.map(goal => (
          <TouchableOpacity
            key={goal.id}
            style={[styles.goalItem, goal.completed && styles.completedGoal]}
            onPress={() => toggleGoalCompletion(goal.id)}
          >
            <View style={styles.goalContent}>
              <Text style={styles.goalText}>{goal.type}: {goal.target}</Text>
              <Text style={styles.goalDeadline}>Due: {goal.deadline}</Text>
            </View>
            <Icon
              name={goal.completed ? 'check-circle' : 'circle'}
              size={24}
              color={goal.completed ? '#10B981' : '#D1D5DB'}
            />
          </TouchableOpacity>
        ))
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Goals</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          {renderProgress()}
          {renderGoalForm()}
          {renderGoalsList()}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: {
    backgroundColor: '#10B981',
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  headerText: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  progressSection: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827', marginBottom: 12 },
  progressItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  progressText: { fontSize: 16, color: '#6B7280', marginLeft: 12 },
  formSection: { padding: 16, backgroundColor: '#FFFFFF', borderRadius: 16, margin: 16, elevation: 2 },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#FFFFFF',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  goalsSection: { padding: 16 },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  completedGoal: { backgroundColor: '#E5E7EB', borderColor: '#10B981' },
  goalContent: { flex: 1 },
  goalText: { fontSize: 18, fontWeight: '500', color: '#111827' },
  goalDeadline: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  noGoalsText: { fontSize: 16, color: '#6B7280', textAlign: 'center' },
  backButton: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },
  backButtonText: { fontSize: 16, fontWeight: '600', color: '#3B82F6' },
  loadingText: { fontSize: 18, color: '#111827', textAlign: 'center', marginTop: 20 },
});

export default GoalsScreen;