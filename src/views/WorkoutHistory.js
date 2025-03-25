import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const WorkoutHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      const subscriber = firestore()
        .collection('users')
        .doc(user.uid)
        .collection('workoutHistory')
        .orderBy('date', 'desc')
        .onSnapshot(snapshot => {
          const historyData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setHistory(historyData);
        });
      return () => subscriber();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.historyItem}>
            <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
            {item.exercises.map((ex, idx) => (
              <Text key={idx} style={styles.exercise}>{`${ex.name} - ${ex.duration}`}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#2196F3', marginBottom: 16 },
  historyItem: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  date: { fontSize: 16, fontWeight: '600', color: '#263238', marginBottom: 8 },
  exercise: { fontSize: 14, color: '#607D8B' },
});

export default WorkoutHistory;