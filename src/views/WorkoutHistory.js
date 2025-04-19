import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const WorkoutHistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);

  useEffect(() => {
    fetchWorkoutHistory();
  }, []);

  const fetchWorkoutHistory = async () => {
    const user = auth().currentUser;
    console.log('Current user:', user ? user.uid : 'No user');
    if (!user) {
      navigation.navigate('Login');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const snapshot = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('workoutHistory')
        .orderBy('date', 'desc')
        .get();

      console.log('Documents found:', snapshot.size);
      const historyData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching workout history:', error.message, error.code);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateSummary = () => {
    const totalWorkouts = history.length;
    const totalDuration = history.reduce((sum, session) => {
      const sessionDuration = session.exercises.reduce((acc, ex) => acc + parseInt(ex.duration), 0);
      return sum + sessionDuration;
    }, 0);
    const avgDuration = totalWorkouts ? Math.round(totalDuration / totalWorkouts) : 0;
    return { totalWorkouts, avgDuration };
  };

  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  //Render History

  const renderSummary = () => {
    const { totalWorkouts, avgDuration } = calculateSummary();
    return (
      <View style={styles.summaryCard}>
        <Text style={styles.cardTitle}>Your Workout Stats</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Icon name="dumbbell" size={24} color="#3B82F6" />
            <Text style={styles.summaryText}>{totalWorkouts}</Text>
            <Text style={styles.summaryLabel}>Total Workouts</Text>
          </View>
          <View style={styles.summaryItem}>
            <Icon name="clock" size={24} color="#10B981" />
            <Text style={styles.summaryText}>{avgDuration} min</Text>
            <Text style={styles.summaryLabel}>Avg Duration</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderHistoryItem = ({ item }) => {
    const totalDuration = item.exercises.reduce((sum, ex) => sum + parseInt(ex.duration), 0);
    const isExpanded = expandedItem === item.id;

    return (
      <TouchableOpacity
        style={styles.historyItem}
        onPress={() => toggleExpand(item.id)}
      >
        <View style={styles.historyHeader}>
          <Text style={styles.historyDate}>
            {new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </Text>
          <View style={styles.historySummary}>
            <Text style={styles.historyCount}>{item.exercises.length} Exercises</Text>
            <Text style={styles.historyDuration}>{totalDuration} min</Text>
          </View>
          <Icon
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#4B5563"
          />
        </View>
        {isExpanded && (
          <View style={styles.exerciseDetails}>
            {item.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseRow}>
                <Icon name="check-circle" size={18} color="#10B981" />
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
              </View>
            ))}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Workout History</Text>
        <Text style={styles.subtitle}>Your Fitness Journey</Text>
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text style={styles.loadingText}>Loading your history...</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <>
            {renderSummary()}
            <FlatList
              data={history}
              renderItem={renderHistoryItem}
              keyExtractor={item => item.id}
              ListEmptyComponent={<Text style={styles.emptyText}>No workout history yet!</Text>}
              scrollEnabled={false}
            />
          </>
        )}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('ExerciseScreen')}>
          <Text style={styles.backButtonText}>Back to Exercises</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FAFC' },
  header: { 
    padding: 32, 
    backgroundColor: '#10B981', 
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
    color: '#E5E7EB', 
    marginTop: 8, 
    opacity: 0.9 
  },
  content: { padding: 16 },
  summaryCard: { 
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
    borderColor: '#E5E7EB' 
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#111827', 
    marginBottom: 12 
  },
  summaryRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around' 
  },
  summaryItem: { 
    alignItems: 'center' 
  },
  summaryText: { 
    fontSize: 24, 
    fontWeight: '800', 
    color: '#111827', 
    marginTop: 8 
  },
  summaryLabel: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginTop: 4 
  },
  historyItem: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, 
    padding: 16, 
    marginVertical: 8, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  historyHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  historyDate: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#111827' 
  },
  historySummary: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  historyCount: { 
    fontSize: 14, 
    color: '#6B7280', 
    marginRight: 8 
  },
  historyDuration: { 
    fontSize: 14, 
    color: '#6B7280' 
  },
  exerciseDetails: { 
    marginTop: 12, 
    paddingTop: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#E5E7EB' 
  },
  exerciseRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 4 
  },
  exerciseName: { 
    fontSize: 16, 
    color: '#111827', 
    marginLeft: 8, 
    flex: 1 
  },
  exerciseDuration: { 
    fontSize: 14, 
    color: '#6B7280' 
  },
  loadingContainer: { 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: { 
    fontSize: 18, 
    color: '#6B7280', 
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
  emptyText: { 
    fontSize: 16, 
    color: '#6B7280', 
    textAlign: 'center', 
    padding: 20 
  },
  backButton: { 
    marginVertical: 16, 
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
});

export default WorkoutHistoryScreen;