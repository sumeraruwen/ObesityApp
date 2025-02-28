// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const ExerciseScreen = ({ navigation }) => {
//   // Sample workout suggestion (replace with ML model output)
//   const workoutSuggestion = [
//     { name: 'Brisk Walking', duration: '20 min' },
//     { name: 'Light Running', duration: '10 min' },
//   ];

//   // State to track workout completion
//   const [isCompleted, setIsCompleted] = useState(false);

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Your Workout Plan</Text>
//         <Text style={styles.subtitle}>Move towards your goals</Text>
//       </View>

//       {/* Workout Recommendation Card */}
//       <View style={styles.workoutCard}>
//         <Icon name="dumbbell" size={40} color="#3b82f6" />
//         <Text style={styles.cardTitle}>Today’s Routine</Text>
//         {workoutSuggestion.map((exercise, index) => (
//           <View key={index} style={styles.exerciseItem}>
//             <Icon name="shoe-prints" size={20} color="#3b82f6" />
//             <Text style={styles.exerciseText}>
//               {exercise.name} - {exercise.duration}
//             </Text>
//           </View>
//         ))}
//         <TouchableOpacity
//           style={styles.startButton}
//           onPress={() => alert('Workout started!')} // Replace with timer logic
//         >
//           <Text style={styles.buttonText}>Start Workout</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.completeButton}
//           onPress={() => setIsCompleted(true)}
//           disabled={isCompleted}
//         >
//           <Text
//             style={[
//               styles.buttonText,
//               isCompleted && { color: '#22c55e' }, // Green when completed
//             ]}
//           >
//             {isCompleted ? 'Completed!' : 'Mark as Done'}
//           </Text>
//         </TouchableOpacity>
//       </View>

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
//   workoutCard: {
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
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#3b82f6',
//     marginTop: 12,
//     marginBottom: 16,
//   },
//   exerciseItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 8,
//     width: '100%',
//   },
//   exerciseText: {
//     fontSize: 16,
//     color: '#6b7280',
//     marginLeft: 12,
//   },
//   startButton: {
//     backgroundColor: '#3b82f6',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   completeButton: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#3b82f6',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     marginTop: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   backButton: {
//     margin: 16,
//     padding: 12,
//     backgroundColor: '#fff',
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
//     color: '#3b82f6',
//     fontWeight: '600',
//   },
// });

// export default ExerciseScreen;

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ExerciseScreen = ({ navigation }) => {
  // Sample user data with limitations (replace with actual user input/ML model)
  const userLimitations = { hasJointPain: false }; // Example: toggle to true for testing

  // Sample workout suggestion from ML model
  const workoutSuggestion = [
    { name: 'Brisk Walking', duration: '20 min', icon: 'walking' },
    { name: 'Light Running', duration: '10 min', icon: 'running', restricted: userLimitations.hasJointPain },
    { name: 'Stretching', duration: '5 min', icon: 'child' },
  ].filter(exercise => !exercise.restricted); // Filter out restricted exercises

  // State for completion progress
  const [completedExercises, setCompletedExercises] = useState([]); // Track completed indices

  // Calculate progress percentage
  const totalExercises = workoutSuggestion.length;
  const completedCount = completedExercises.length;
  const progressPercentage = (completedCount / totalExercises) * 100;

  // Toggle completion of an exercise
  const toggleCompletion = (index) => {
    if (completedExercises.includes(index)) {
      setCompletedExercises(completedExercises.filter((i) => i !== index));
    } else {
      setCompletedExercises([...completedExercises, index]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Workout Plan</Text>
        <Text style={styles.subtitle}>Tailored for your needs</Text>
      </View>

      {/* Workout Card */}
      <View style={styles.workoutCard}>
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <View
              style={{
                ...styles.progressFill,
                height: `${progressPercentage}%`,
              }}
            />
            <Text style={styles.progressText}>
              {completedCount}/{totalExercises}
            </Text>
          </View>
          <Text style={styles.cardTitle}>Today’s Routine</Text>
        </View>

        {/* Exercise List */}
        {workoutSuggestion.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <Icon name={exercise.icon} size={24} color="#3b82f6" />
            <Text style={styles.exerciseText}>
              {exercise.name} - {exercise.duration}
            </Text>
            <TouchableOpacity
              onPress={() => toggleCompletion(index)}
              style={styles.checkButton}
            >
              <Icon
                name={completedExercises.includes(index) ? 'check-circle' : 'circle'}
                size={20}
                color={completedExercises.includes(index) ? '#22c55e' : '#6b7280'}
              />
            </TouchableOpacity>
          </View>
        ))}

        {/* Start Workout Button */}
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => alert('Workout started!')} // Replace with timer/step tracker
        >
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 20,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  workoutCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  progressFill: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#3b82f6',
  },
  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    position: 'absolute',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginTop: 12,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  exerciseText: {
    fontSize: 16,
    color: '#6b7280',
    flex: 1,
    marginLeft: 12,
  },
  checkButton: {
    padding: 4,
  },
  startButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    margin: 16,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3b82f6',
    fontWeight: '600',
  },
});

export default ExerciseScreen;