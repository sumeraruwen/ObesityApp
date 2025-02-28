// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// //import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { faApple, faDumbbell, faGlass } from '@fortawesome/free-solid-svg-icons';

// const NutritionScreen = ({ navigation }) => {
//   const [waterIntake, setWaterIntake] = useState(4); // Number of glasses
//   const targetWaterIntake = 8;

//   const recommendedMeal = {
//     category: 'Mediterranean Meal',
//     plan: 'Baked salmon with whole grain couscous and steamed broccoli',
//     calories: 550,
//     protein: '35g',
//     carbs: '45g',
//     fats: '25g'
//   };

//   const dailyProgress = {
//     consumed: 1250,
//     target: 1800,
//     remaining: 550
//   };

//   const mealTimings = [
//     { time: 'Breakfast', calories: 350, status: 'completed' },
//     { time: 'Lunch', calories: 450, status: 'completed' },
//     { time: 'Snack', calories: 450, status: 'upcoming' },
//     { time: 'Dinner', calories: 550, status: 'upcoming' }
//   ];

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
//               name="glass"
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
//       {/* Calories Progress Section */}
//       <View style={styles.heroSection}>
//         <View style={styles.calorieCircle}>
//           <Text style={styles.calorieNumber}>{dailyProgress.consumed}</Text>
//           <Text style={styles.calorieLabel}>kcal consumed</Text>
//         </View>
//         <View style={styles.calorieDetails}>
//           <View style={styles.calorieStat}>
//             <Text style={styles.statLabel}>Target</Text>
//             <Text style={styles.statValue}>{dailyProgress.target} kcal</Text>
//           </View>
//           <View style={styles.calorieStat}>
//             <Text style={styles.statLabel}>Remaining</Text>
//             <Text style={styles.statValue}>{dailyProgress.remaining} kcal</Text>
//           </View>
//         </View>
//       </View>

//       {/* AI Recommended Meal Card */}
//       <View style={styles.card}>
//         <View style={styles.recommendedHeader}>
//           <Icon name="star" size={24} color="#f59e0b" />
//           <Text style={styles.cardTitle}>AI Recommended Meal</Text>
//         </View>
//         <View style={styles.mealCategory}>
//           <Text style={styles.categoryText}>{recommendedMeal.category}</Text>
//         </View>
//         <Text style={styles.mealPlan}>{recommendedMeal.plan}</Text>
//         <View style={styles.nutritionGrid}>
//           <View style={styles.nutritionItem}>
//             <Text style={styles.nutritionValue}>{recommendedMeal.calories}</Text>
//             <Text style={styles.nutritionLabel}>Calories</Text>
//           </View>
//           <View style={styles.nutritionItem}>
//             <Text style={styles.nutritionValue}>{recommendedMeal.protein}</Text>
//             <Text style={styles.nutritionLabel}>Protein</Text>
//           </View>
//           <View style={styles.nutritionItem}>
//             <Text style={styles.nutritionValue}>{recommendedMeal.carbs}</Text>
//             <Text style={styles.nutritionLabel}>Carbs</Text>
//           </View>
//           <View style={styles.nutritionItem}>
//             <Text style={styles.nutritionValue}>{recommendedMeal.fats}</Text>
//             <Text style={styles.nutritionLabel}>Fats</Text>
//           </View>
//         </View>
//       </View>

//       {/* Water Tracker */}
//       {renderWaterTracker()}

//       {/* Daily Meals Timeline */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Today's Meals</Text>
//         {mealTimings.map((meal, index) => (
//           <View key={index} style={styles.mealTimelineItem}>
//             <View style={[
//               styles.timelineIndicator,
//               { backgroundColor: meal.status === 'completed' ? '#22c55e' : '#e5e7eb' }
//             ]} />
//             <View style={styles.mealTimelineContent}>
//               <Text style={styles.mealTime}>{meal.time}</Text>
//               <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
//             </View>
//             {meal.status === 'completed' && (
//               <Icon name="check-circle" size={20} color="#22c55e" />
//             )}
//           </View>
//         ))}
//       </View>

//       {/* Log Meal Button */}
//       <TouchableOpacity style={styles.logMealButton}>
//         <Icon name="plus" size={18} color="#fff" />
//         <Text style={styles.buttonText}>Log Meal</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   heroSection: {
//     backgroundColor: '#3b82f6',
//     padding: 24,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   calorieCircle: {
//     backgroundColor: '#2563eb',
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   calorieNumber: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   calorieLabel: {
//     color: '#fff',
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   calorieDetails: {
//     flex: 1,
//     marginLeft: 24,
//   },
//   calorieStat: {
//     marginBottom: 16,
//   },
//   statLabel: {
//     color: '#fff',
//     opacity: 0.9,
//   },
//   statValue: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   card: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   recommendedHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   mealCategory: {
//     backgroundColor: '#f59e0b',
//     alignSelf: 'flex-start',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//     marginBottom: 8,
//   },
//   categoryText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   mealPlan: {
//     fontSize: 16,
//     lineHeight: 24,
//     marginBottom: 16,
//   },
//   nutritionGrid: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#f3f4f6',
//     padding: 16,
//     borderRadius: 12,
//   },
//   nutritionItem: {
//     alignItems: 'center',
//   },
//   nutritionValue: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#3b82f6',
//   },
//   nutritionLabel: {
//     color: '#6b7280',
//     fontSize: 12,
//     marginTop: 4,
//   },
//   waterTrackerCard: {
//     ...this.card,
//     margin: 16,
//     padding: 20,
//   },
//   waterHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   waterGlasses: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 12,
//   },
//   waterText: {
//     textAlign: 'center',
//     color: '#6b7280',
//   },
//   mealTimelineItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   timelineIndicator: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 12,
//   },
//   mealTimelineContent: {
//     flex: 1,
//   },
//   mealTime: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   mealCalories: {
//     color: '#6b7280',
//   },
//   logMealButton: {
//     backgroundColor: '#3b82f6',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 16,
//     margin: 16,
//     borderRadius: 12,
//     gap: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default NutritionScreen;



// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   Image, 
//   ScrollView, 
//   TouchableOpacity, 
//   SafeAreaView,
//   Dimensions
// } from 'react-native';
// import { ProgressBar } from 'react-native-paper';
// //import Ionicons from '@react-native-vector-icons/ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// const { width } = Dimensions.get('window');

// const NutritionScreen = () => {
//   // Sample meal data (would come from your ML model in production)
//   const [mealData, setMealData] = useState({
//     category: 'Mediterranean Meal',
//     name: 'Baked salmon with whole grain couscous and steamed broccoli',
//     image: 'https://via.placeholder.com/350x200',
//     calories: 520,
//     macros: {
//       protein: 32, // grams
//       carbs: 48,   // grams
//       fats: 18,    // grams
//     },
//     ingredients: [
//       '6 oz Salmon fillet',
//       '1/2 cup Whole grain couscous',
//       '1 cup Steamed broccoli',
//       '1 tbsp Olive oil',
//       '1 Lemon, sliced',
//       'Fresh herbs (dill, parsley)',
//       'Salt and pepper to taste'
//     ],
//     nutritionalBenefits: [
//       'Rich in omega-3 fatty acids',
//       'High in protein',
//       'Contains fiber and essential vitamins',
//       'Anti-inflammatory properties'
//     ]
//   });

//   // Water tracking
//   const [waterIntake, setWaterIntake] = useState(3);
//   const waterGoal = 8;

//   const handleGenerateAlternative = () => {
//     // In production, this would call your ML model again
//     alert('Generating alternative meal recommendation...');
//     // Mock response - in real app, you'd call your ML API
//     setMealData({
//       ...mealData,
//       category: 'High Protein Meal', 
//       name: 'Grilled chicken with quinoa and roasted vegetables',
//       calories: 480,
//       macros: {
//         protein: 38,
//         carbs: 42,
//         fats: 14,
//       }
//     });
//   };

//   const handleSaveToFavorites = () => {
//     alert('Meal saved to favorites!');
//   };

//   const handleAddWater = () => {
//     if (waterIntake < waterGoal) {
//       setWaterIntake(waterIntake + 1);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.header}>
//           <Text style={styles.headerTitle}>Meal Recommendation</Text>
//           <Text style={styles.mealCategory}>{mealData.category}</Text>
//         </View>

//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: mealData.image }} 
//             style={styles.mealImage} 
//             resizeMode="cover"
//           />
//         </View>

//         <View style={styles.mealInfoContainer}>
//           <Text style={styles.mealName}>{mealData.name}</Text>
          
//           <View style={styles.calorieContainer}>
//             <Ionicons name="flame" size={20} color="#ff6b6b" />
//             <Text style={styles.calorieText}>{mealData.calories} calories</Text>
//           </View>

//           <View style={styles.macrosContainer}>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroValue}>{mealData.macros.protein}g</Text>
//               <Text style={styles.macroLabel}>Protein</Text>
//             </View>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroValue}>{mealData.macros.carbs}g</Text>
//               <Text style={styles.macroLabel}>Carbs</Text>
//             </View>
//             <View style={styles.macroItem}>
//               <Text style={styles.macroValue}>{mealData.macros.fats}g</Text>
//               <Text style={styles.macroLabel}>Fats</Text>
//             </View>
//           </View>
          
//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Ingredients</Text>
//             {mealData.ingredients.map((ingredient, index) => (
//               <View key={index} style={styles.ingredientItem}>
//                 <Ionicons name="ellipse-sharp" size={8} color="#4CAF50" style={styles.bulletPoint} />
//                 <Text style={styles.ingredientText}>{ingredient}</Text>
//               </View>
//             ))}
//           </View>

//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Nutritional Benefits</Text>
//             {mealData.nutritionalBenefits.map((benefit, index) => (
//               <View key={index} style={styles.benefitItem}>
//                 <Ionicons name="checkmark" size={16} color="#4CAF50" style={styles.checkIcon} />
//                 <Text style={styles.benefitText}>{benefit}</Text>
//               </View>
//             ))}
//           </View>

//           <View style={styles.waterTrackerContainer}>
//             <Text style={styles.sectionTitle}>Water Intake</Text>
//             <View style={styles.waterProgressContainer}>
//               <View style={styles.waterGlassRow}>
//                 {Array.from({ length: waterGoal }).map((_, index) => (
//                   <TouchableOpacity 
//                     key={index} 
//                     onPress={handleAddWater}
//                     style={styles.waterGlassContainer}
//                   >
//                     <Ionicons 
//                       name="water" 
//                       size={24} 
//                       color={index < waterIntake ? "#2196F3" : "#E0E0E0"} 
//                     />
//                   </TouchableOpacity>
//                 ))}
//               </View>
//               <Text style={styles.waterText}>{waterIntake} of {waterGoal} glasses</Text>
//               <ProgressBar 
//                 progress={waterIntake/waterGoal} 
//                 color="#2196F3" 
//                 style={styles.waterProgress} 
//               />
//             </View>
//           </View>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity 
//               style={[styles.button, styles.saveButton]} 
//               onPress={handleSaveToFavorites}
//             >
//               <Ionicons name="heart" size={18} color="#fff" />
//               <Text style={styles.buttonText}>Save to Favorites</Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity 
//               style={[styles.button, styles.alternativeButton]} 
//               onPress={handleGenerateAlternative}
//             >
//               <Ionicons name="refresh" size={18} color="#fff" />
//               <Text style={styles.buttonText}>Generate Alternative</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   mealCategory: {
//     fontSize: 16,
//     color: '#4CAF50',
//     marginTop: 4,
//   },
//   imageContainer: {
//     width: '100%',
//     height: 200,
//   },
//   mealImage: {
//     width: '100%',
//     height: '100%',
//   },
//   mealInfoContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 25,
//     borderTopRightRadius: 25,
//     marginTop: -20,
//     paddingHorizontal: 20,
//     paddingTop: 25,
//     paddingBottom: 30,
//   },
//   mealName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   calorieContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   calorieText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#ff6b6b',
//     marginLeft: 8,
//   },
//   macrosContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#f8f8f8',
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 20,
//   },
//   macroItem: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   macroValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   macroLabel: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   sectionContainer: {
//     marginVertical: 15,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   ingredientItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   bulletPoint: {
//     marginRight: 10,
//   },
//   ingredientText: {
//     fontSize: 15,
//     color: '#444',
//   },
//   benefitItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   checkIcon: {
//     marginRight: 10,
//   },
//   benefitText: {
//     fontSize: 15,
//     color: '#444',
//   },
//   waterTrackerContainer: {
//     marginVertical: 15,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 15,
//     padding: 15,
//   },
//   waterProgressContainer: {
//     alignItems: 'center',
//   },
//   waterGlassRow: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 10,
//   },
//   waterGlassContainer: {
//     marginHorizontal: 8,
//   },
//   waterText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 5,
//   },
//   waterProgress: {
//     height: 8,
//     width: '100%',
//     borderRadius: 4,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 10,
//     paddingVertical: 12,
//     paddingHorizontal: 15,
//     flex: 1,
//     marginHorizontal: 5,
//   },
//   saveButton: {
//     backgroundColor: '#FF5252',
//   },
//   alternativeButton: {
//     backgroundColor: '#4CAF50',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
// });

// export default NutritionScreen;


//===================new code from grok=============

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const NutritionScreen = ({ navigation }) => {
  // Sample meal suggestion (replace with ML model output)
  const mealSuggestion = {
    name: 'Low-carb meal: Grilled chicken and red rice',
    calories: 450,
  };

  // Water intake state (glasses)
  const [waterIntake, setWaterIntake] = useState(0); // Number of glasses consumed
  const targetWaterIntake = 8; // Target: 8 glasses

  // Function to render water glasses
  const renderWaterTracker = () => (
    <View style={styles.waterTrackerCard}>
      <View style={styles.waterHeader}>
        <Icon name="tint" size={24} color="#3b82f6" />
        <Text style={styles.cardTitle}>Water Intake</Text>
      </View>
      <View style={styles.waterGlasses}>
        {[...Array(targetWaterIntake)].map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setWaterIntake(index + 1)}
          >
            <Icon
              name="glass-whiskey"
              size={24}
              color={index < waterIntake ? '#3b82f6' : '#e5e7eb'}
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Meal Plan</Text>
        <Text style={styles.subtitle}>Tailored for your goals</Text>
      </View>

      {/* Meal Suggestion Card */}
      <View style={styles.mealCard}>
        <Icon name="utensils" size={40} color="#3b82f6" />
        <Text style={styles.mealName}>{mealSuggestion.name}</Text>
        <Text style={styles.mealCalories}>{mealSuggestion.calories} kcal</Text>
        <TouchableOpacity
          style={styles.logButton}
          onPress={() => alert('Meal logged successfully!')} // Replace with logging logic
        >
          <Text style={styles.logButtonText}>Log Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Water Tracker */}
      {renderWaterTracker()}

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
  mealCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mealName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3b82f6',
    marginTop: 12,
    textAlign: 'center',
  },
  mealCalories: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 8,
  },
  logButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 16,
  },
  logButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  waterTrackerCard: {
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
  waterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginLeft: 8,
  },
  waterGlasses: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  waterText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6b7280',
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

export default NutritionScreen;