// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState({
//     name: 'User',
//     currentWeight: 95.8,
//     calorieGoal: 1800,
//     steps: 4500,
//     height: 170,
//     bmi: 0,
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const user = auth().currentUser;
//       if (!user) {
//         console.log('No user logged in');
//         navigation.navigate('Login');
//         return;
//       }

//       try {
//         const userName = user.displayName || 'User';
//         console.log('Fetched name from Auth:', userName);

//         const userDoc = await firestore().collection('users').doc(user.uid).get();
//         if (userDoc.exists) {
//           const firestoreData = userDoc.data();
//           const healthAssessment = firestoreData.healthAssessment || {};
//           const weight = healthAssessment.Weight || 95.8;
//           const height = healthAssessment.Height || 170;
//           const bmi = calculateBMI(weight, height);

//           setUserData({
//             name: userName,
//             currentWeight: weight,
//             calorieGoal: firestoreData.calorieGoal || 1800,
//             steps: firestoreData.steps || 4500,
//             height: height,
//             bmi: bmi,
//           });
//         } else {
//           setUserData(prev => ({ ...prev, name: userName }));
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error.message);
//         setUserData(prev => ({ ...prev, name: 'User' }));
//       }
//     };

//     fetchUserData();
//   }, [navigation]);

//   const calculateBMI = (weight, height) => {
//     const heightInMeters = height / 100;
//     return (weight / (heightInMeters * heightInMeters)).toFixed(1);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.headerSection}>
//         <View style={styles.headerContent}>
//           <Text style={styles.headerText}>Hello, {userData.name}</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
//             <Icon name="user-circle" size={28} color="#FFFFFF" />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.headerSubtitle}>Your daily health dashboard</Text>
//       </View>

//       <View style={styles.statsSection}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={28} color="#10B981" />
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={28} color="#10B981" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={28} color="#10B981" />
//           <Text style="styles.statValue">{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="calculator" size={28} color="#10B981" />
//           <Text style={styles.statValue}>{userData.bmi}</Text>
//           <Text style={styles.statLabel}>BMI</Text>
//         </View>
//       </View>

//       <View style={styles.actionsSection}>
//         <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('ExerciseScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="dumbbell" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Today’s Workout</Text>
//             <Text style={styles.tileSubtitle}>Power up your day</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('NutritionScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="apple-alt" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Meal Plan</Text>
//             <Text style={styles.tileSubtitle}>Nourish your body</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity>

//         {/* <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('ProfileScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="chart-line" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Track Progress</Text>
//             <Text style={styles.tileSubtitle}>Monitor your success</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity> */}

//         <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('GoalsScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="chart-line" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Set & Track Goals</Text>
//             <Text style={styles.tileSubtitle}>Monitor your success</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('HealthyTipsScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="star" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Healthy Tips</Text>
//             <Text style={styles.tileSubtitle}>Keep the spark alive</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('CommunityScreen')}>
//           <View style={styles.tileIconContainer}>
//             <Icon name="star" size={36} color="#FFFFFF" />
//           </View>
//           <View style={styles.tileTextContainer}>
//             <Text style={styles.tileTitle}>Community</Text>
//             <Text style={styles.tileSubtitle}>Keep the spark alive</Text>
//           </View>
//           <Icon name="chevron-right" size={20} color="#10B981" />
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7FAFC', // Light gray-blue
//   },
//   headerSection: {
//     backgroundColor: '#10B981', // Vibrant green header
//     paddingTop: 40,
//     paddingBottom: 35,
//     paddingHorizontal: 24,
//     borderBottomLeftRadius: 40,
//     borderBottomRightRadius: 40,
//     elevation: 10,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//   },
//   headerContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontSize: 30,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: 0.2,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#D1FAE5', // Light green tint for subtitle
//     marginTop: 6,
//   },
//   statsSection: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   statCard: {
//     width: '48%',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//   },
//   statValue: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#111827',
//     marginTop: 12,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 4,
//   },
//   actionsSection: {
//     paddingHorizontal: 20,
//     paddingBottom: 20,
//   },
//   actionTile: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     padding: 16,
//     marginBottom: 16,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//     borderWidth: 1,
//     borderColor: '#FFFFFF',
//   },
//   tileIconContainer: {
//     backgroundColor: '#10B981',
//     borderRadius: 12,
//     padding: 12,
//     marginRight: 16,
//   },
//   tileTextContainer: {
//     flex: 1,
//   },
//   tileTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#111827',
//   },
//   tileSubtitle: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginTop: 4,
//   },
// });

// export default HomeScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: 'User',
    currentWeight: 95.8,
    height: 170,
    bmi: 0,
    waterIntake: 0,
    targetWeight: 80,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth().currentUser;
      if (!user) {
        console.log('No user logged in');
        navigation.navigate('Login');
        return;
      }

      try {
        const userName = user.displayName || 'User';
        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const firestoreData = userDoc.data();
          const healthAssessment = firestoreData.healthAssessment || {};
          const weight = healthAssessment.Weight || 95.8;
          const height = healthAssessment.Height || 170;
          const waterIntake = firestoreData.waterIntake || 0;
          const targetWeight = healthAssessment.TargetWeight || 60;
          const bmi = calculateBMI(weight, height);

          setUserData({
            name: userName,
            currentWeight: weight,
            height,
            bmi,
            waterIntake,
            targetWeight,
          });
        } else {
          setUserData(prev => ({ ...prev, name: userName }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        setUserData(prev => ({ ...prev, name: 'User' }));
      }
    };

    fetchUserData();
  }, [navigation]);

  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateWaterCupsToGo = (intake) => {
    const totalCups = 8; // 2L = 8 cups (250 mL each)
    const cupsConsumed = Math.floor(intake / 0.25);
    return totalCups - cupsConsumed >= 0 ? totalCups - cupsConsumed : 0;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>Hello, {userData.name}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
            <Icon name="user-circle" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerSubtitle}>Your daily health dashboard</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Icon name="weight" size={28} color="#10B981" />
          <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
          <Text style={styles.statLabel}>Weight</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="calculator" size={28} color="#10B981" />
          <Text style={styles.statValue}>{userData.bmi}</Text>
          <Text style={styles.statLabel}>BMI</Text>
        </View>
        <TouchableOpacity
          style={styles.statCard}
          onPress={() => navigation.navigate('WaterTrackerScreen')}
        >
          <Icon name="tint" size={28} color="#10B981" />
          <Text style={styles.statValue}>{calculateWaterCupsToGo(userData.waterIntake)}/8 cups</Text>
          <Text style={styles.statLabel}>Water to Go</Text>
        </TouchableOpacity>
        <View style={styles.statCard}>
          <Icon name="bullseye" size={28} color="#10B981" />
          <Text style={styles.statValue}>{userData.targetWeight} kg</Text>
          <Text style={styles.statLabel}>Target Weight</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('ExerciseScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="dumbbell" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Today’s Workout</Text>
            <Text style={styles.tileSubtitle}>Power up your day</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('NutritionScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="apple-alt" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Meal Plan</Text>
            <Text style={styles.tileSubtitle}>Here the Meal plan</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('GoalsScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="chart-line" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Set & Track Goals</Text>
            <Text style={styles.tileSubtitle}>Monitor your success</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('HealthyTipsScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="star" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Healthy Tips</Text>
            <Text style={styles.tileSubtitle}>Keep the spark alive</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('CommunityScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="users" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Community</Text>
            <Text style={styles.tileSubtitle}>Join the conversation</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
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
  headerSection: {
    backgroundColor: '#10B981',
    paddingTop: 40,
    paddingBottom: 35,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#D1FAE5',
    marginTop: 6,
  },
  statsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 12,
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  actionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  actionTile: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  tileIconContainer: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
  },
  tileTextContainer: {
    flex: 1,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  tileSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
});

export default HomeScreen;