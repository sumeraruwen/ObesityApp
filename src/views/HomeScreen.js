// import React, { useEffect } from 'react';
// import { View, Text, ScrollView, TextInput, FlatList, StyleSheet } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import HorizontalCardComponent from '../components/HorizontalCardComponent';
// import MainHeaderComponent from '../components/MainHeaderComponent';
// import SliderCardComponent from '../components/SliderCardComponent';
// import { colors, dimensions, fontSizes } from '../styles/constants';
// import auth from '@react-native-firebase/auth';


// const HomeScreen = ({navigation}) => {

//   useEffect(() => {
//     if (!auth().currentUser) {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Welcome' }],
//       });
//     }
//   }, []);

//   // Dummy data for recommended items (replace with your data)
//   const handleSignIn = () => {
//     navigation.navigate('HomeScreen');
    
//   };
//   const handlePredict = () => {
//    // navigation.navigate('PredictScreen');
    
//   };
//   const handleExerciseScreen1 = () => {
//     // navigation.navigate('PredictScreen');
//     navigation.navigate('ExerciseScreen1');
     
//    };
  
//   const recommendedItems = [
//     {
//       id: '1',
//       topic: 'FULL BODY 7X4   CHALLENGE',
//       name: 'Unless you are highly experienced and committed to working out, you will get overwhelmed if you exceed a certain threshold. ',
//       //imageUrl: require('../assets/horizontal1.webp')
//       //imageUrl: 'https://example.com/item1.jpg',
//       backgroundImage:require('../assets/bgImage.webp'),
//       buttonName:"Interested",
     

//     },
//     {
//       id: '2',
//       topic: 'LOWER BODY 7X4 CHALLENGE',
//       name: 'Unless you are highly experienced and committed to working out, you will get overwhelmed if you exceed a certain threshold. ',
//      // imageUrl: 'https://example.com/item1.jpg',
//      backgroundImage:require('../assets/bgImage.webp'),
//       buttonName:"Interested"

//     },
   
//     // Add more recommended items here
//   ];

//   // Dummy data for upcoming events (replace with your data)
//   const upcomingEvents = [
//     {
//       id: '1',
//       category: 'Somerset',
//       topic: 'ABS BEGINEER',
//       date:"4 EXERCISES",
      
      
//     },
//     {
//       id: '2',
//       category: 'Somerset',
//       topic: 'CHEST BEGINEER',
//       date:"2 EXERCISES",
 
//     },
//     {
//       id: '3',
//       category: 'Somerset',
//       topic: 'ARM BEGINEER',
//       date:"4 EXERCISES",
      
//     },
//     // Add more upcoming events here
//   ];

//   return (
//     <View style={{ flex: 1 }}>
//       {/* Header */}
//       <MainHeaderComponent

//       //  userImage={UserImage} // Replace with your image URL
//       />

//       <ScrollView style={{backgroundColor:'#fff'}}> 
//         {/* Search Bar */}
//         <View style={{ padding: 20 }}>
//           <TextInput
//             placeholder="Search..."
//             style={{
//               borderWidth: 1,
//               borderRadius: 20,
//               padding:10,
//               borderColor: '#ccc',
//             }}
//           />
//         </View>

//         {/* Recommended Section */}
//         <Text style={{ fontSize: fontSizes.fontLarge, fontWeight: '700', marginLeft: '6%' ,marginBottom:'5%',color:colors.black}}>
//           Up Comming
//         </Text>
//         <FlatList
//           data={recommendedItems}
//           horizontal={true}
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <HorizontalCardComponent
//                name={item.name}
//                topic={item.topic}
//                date={item.date}
//                imageUrl={item.imageUrl}
              
//             />
//           )}
//         />

//         {/* Upcoming Section */}
//         <Text style={{ fontSize: fontSizes.fontLarge, fontWeight: '700', marginLeft: '6%', marginTop: '5%',color:colors.black }}>
//         Recommended for You
//         </Text>
//         <FlatList
//           data={upcomingEvents}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={handleExerciseScreen1}>
//             <SliderCardComponent
//               category={item.category}
//               topic={item.topic}
//               date={item.date}
//               participants={item.participants}
//               buttonName={item.buttonName}
//             />
//             </TouchableOpacity>
//           )}
//         />
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({});

// export default HomeScreen;


// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const HomeScreen = () => {
//   const weightEntries = [
//     { week: 'Week 1', weight: '98.0' },
//     { week: 'Week 2', weight: '97.2' },
//     { week: 'Week 3', weight: '96.5' },
//     { week: 'Week 4', weight: '95.8' },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* User Status Summary */}
//       <View style={styles.card}>
//         <View style={styles.statusContainer}>
//           <View>
//             <Text style={styles.dashboardTitle}>Welcome back, Alex</Text>
//             <Text style={styles.textGray}>Current BMI: 32.5 (Obese Class I)</Text>
//           </View>
//           <TouchableOpacity style={styles.outlineButton}>
//             <Icon name="balance-scale" size={16} color="#6b7280" />
//             <Text style={styles.buttonText}>Log Weight</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* AI Insights Card */}
//       <View style={[styles.card, styles.gradientBg]}>
//         <View style={styles.insightsHeader}>
//           <Icon name="lightbulb-o" size={32} color="#fff" />
//           <Text style={[styles.cardTitle, styles.whiteText]}>AI Health Insights</Text>
//         </View>
//         <Text style={styles.whiteText}>Based on your recent progress, we've adjusted your plan:</Text>
//         <View style={styles.insightsList}>
//           <Text style={styles.whiteText}>• Modified workout intensity for better results</Text>
//           <Text style={styles.whiteText}>• Adjusted meal portions based on activity level</Text>
//           <Text style={styles.whiteText}>• Added low-impact exercises for joint health</Text>
//         </View>
//       </View>

//       {/* Weight Progress */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Weight Progress</Text>
//         <View style={styles.weightContainer}>
//           {weightEntries.map((entry, index) => (
//             <View key={entry.week} style={styles.weightEntry}>
//               <Text style={styles.weightWeek}>{entry.week}</Text>
//               <Text style={styles.weightValue}>{entry.weight} kg</Text>
//               {index < weightEntries.length - 1 && (
//                 <View style={styles.weightTrend}>
//                   <Icon name="arrow-down" size={12} color="#22c55e" />
//                   <Text style={styles.trendValue}>-0.7 kg</Text>
//                 </View>
//               )}
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* Today's Plans */}
//       <View style={styles.plansGrid}>
//         {/* Workout Plan */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="dumbbell" size={16} color="#6b7280" />
//             <Text style={styles.cardTitle}>Today's Workout Plan</Text>
//           </View>
//           <View style={styles.planContent}>
//             <View style={styles.planBox}>
//               <Text style={styles.planTitle}>30-min Low Impact Routine</Text>
//               <Text style={styles.textGray}>Optimized for your knee condition</Text>
//             </View>
//             <TouchableOpacity style={styles.primaryButton}>
//               <Text style={styles.primaryButtonText}>View Full Plan</Text>
//               <Icon name="arrow-right" size={16} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Nutrition Plan */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="apple" size={16} color="#6b7280" />
//             <Text style={styles.cardTitle}>Today's Meal Plan</Text>
//           </View>
//           <View style={styles.planContent}>
//             <View style={styles.planBox}>
//               <Text style={styles.planTitle}>1800 kcal Balanced Plan</Text>
//               <Text style={styles.textGray}>Adjusted for your dietary preferences</Text>
//             </View>
//             <TouchableOpacity style={styles.primaryButton}>
//               <Text style={styles.primaryButtonText}>View Full Plan</Text>
//               <Icon name="arrow-right" size={16} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* Weekly Goals & Reminders */}
//       <View style={styles.plansGrid}>
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="calendar" size={16} color="#3b82f6" />
//             <Text style={styles.sectionTitle}>Weekly Goal Progress</Text>
//           </View>
//           <Text style={styles.textGray}>Target: Lose 0.5 kg this week</Text>
//           <Text style={styles.textSuccess}>On track! Current loss: 0.3 kg</Text>
//         </View>

//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="exclamation-circle" size={16} color="#f97316" />
//             <Text style={styles.sectionTitle}>Health Reminders</Text>
//           </View>
//           <Text style={styles.textGray}>Time to update your health metrics</Text>
//           <TouchableOpacity style={[styles.outlineButton, styles.mt2]}>
//             <Text style={styles.buttonText}>Update Now</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: '#f3f4f6',
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 24,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   dashboardTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   textGray: {
//     color: '#6b7280',
//   },
//   textSuccess: {
//     color: '#22c55e',
//   },
//   gradientBg: {
//     backgroundColor: '#3b82f6',
//   },
//   whiteText: {
//     color: '#fff',
//   },
//   insightsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   insightsList: {
//     marginTop: 8,
//     paddingLeft: 8,
//   },
//   weightContainer: {
//     marginTop: 16,
//   },
//   weightEntry: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   weightWeek: {
//     flex: 1,
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   weightValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 16,
//   },
//   weightTrend: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   trendValue: {
//     fontSize: 14,
//     color: '#22c55e',
//   },
//   plansGrid: {
//     gap: 16,
//   },
//   planContent: {
//     gap: 16,
//   },
//   planBox: {
//     backgroundColor: '#f9fafb',
//     padding: 12,
//     borderRadius: 8,
//   },
//   planTitle: {
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//     marginBottom: 12,
//   },
//   primaryButton: {
//     backgroundColor: '#3b82f6',
//     padding: 12,
//     borderRadius: 8,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 8,
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   outlineButton: {
//     padding: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#e5e7eb',
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: '#6b7280',
//   },
//   mt2: {
//     marginTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const HomeScreen = () => {
//   const weightEntries = [
//     { week: 'Week 1', weight: '98.0' },
//     { week: 'Week 2', weight: '97.2' },
//     { week: 'Week 3', weight: '96.5' },
//     { week: 'Week 4', weight: '95.8' },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* Hero Section with Status */}
//       <View style={styles.heroCard}>
//         <View style={styles.heroContent}>
//           <Text style={styles.welcomeText}>Welcome back,</Text>
//           <Text style={styles.nameText}>Alex</Text>
//           <View style={styles.bmiContainer}>
//             <Text style={styles.bmiText}>BMI: 32.5</Text>
//             <Text style={styles.bmiLabel}>Obese Class I</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.floatingButton}>
//           <Icon name="balance-scale" size={20} color="#fff" />
//           <Text style={styles.floatingButtonText}>Log Weight</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Progress Summary */}
//       <View style={styles.progressCard}>
//         <Text style={styles.sectionTitle}>Your Progress</Text>
//         <View style={styles.weightChart}>
//           {weightEntries.map((entry, index) => (
//             <View key={entry.week} style={styles.chartEntry}>
//               <View style={[styles.chartBar, { height: 100 - index * 10 }]} />
//               <Text style={styles.chartLabel}>{entry.weight}</Text>
//               <Text style={styles.chartWeek}>{entry.week}</Text>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* AI Insights */}
//       <View style={styles.insightsCard}>
//         <View style={styles.insightsHeader}>
//           <Icon name="lightbulb-o" size={24} color="#fff" />
//           <Text style={styles.insightsTitle}>AI Health Insights</Text>
//         </View>
//         <View style={styles.insightsList}>
//           <View style={styles.insightItem}>
//             <Icon name="check-circle" size={20} color="#22c55e" />
//             <Text style={styles.insightText}>Workout intensity optimized</Text>
//           </View>
//           <View style={styles.insightItem}>
//             <Icon name="check-circle" size={20} color="#22c55e" />
//             <Text style={styles.insightText}>Meal portions adjusted</Text>
//           </View>
//           <View style={styles.insightItem}>
//             <Icon name="check-circle" size={20} color="#22c55e" />
//             <Text style={styles.insightText}>Added joint-friendly exercises</Text>
//           </View>
//         </View>
//       </View>

//       {/* Today's Plans */}
//       <View style={styles.todayCards}>
//         <TouchableOpacity style={styles.planCard}>
//           <Icon name="dumbbell" size={24} color="#3b82f6" />
//           <Text style={styles.planTitle}>Today's Workout</Text>
//           <Text style={styles.planDescription}>30-min Low Impact</Text>
//           <View style={styles.planArrow}>
//             <Icon name="arrow-right" size={20} color="#3b82f6" />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.planCard}>
//           <Icon name="apple" size={24} color="#3b82f6" />
//           <Text style={styles.planTitle}>Today's Meals</Text>
//           <Text style={styles.planDescription}>1800 kcal Plan</Text>
//           <View style={styles.planArrow}>
//             <Icon name="arrow-right" size={20} color="#3b82f6" />
//           </View>
//         </TouchableOpacity>
//       </View>

//       {/* Weekly Goal Card */}
//       <View style={styles.goalCard}>
//         <View style={styles.goalHeader}>
//           <Icon name="star" size={24} color="#f59e0b" />
//           <Text style={styles.goalTitle}>Weekly Goal</Text>
//         </View>
//         <View style={styles.goalProgress}>
//           <Text style={styles.goalTarget}>Target: 0.5 kg loss</Text>
//           <View style={styles.progressBar}>
//             <View style={[styles.progressFill, { width: '60%' }]} />
//           </View>
//           <Text style={styles.goalCurrent}>Current: 0.3 kg loss</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   heroCard: {
//     backgroundColor: '#3b82f6',
//     padding: 24,
//     borderBottomLeftRadius: 24,
//     borderBottomRightRadius: 24,
//   },
//   heroContent: {
//     marginBottom: 20,
//   },
//   welcomeText: {
//     color: '#fff',
//     fontSize: 16,
//     opacity: 0.9,
//   },
//   nameText: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: 'bold',
//   },
//   bmiContainer: {
//     marginTop: 8,
//   },
//   bmiText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: '600',
//   },
//   bmiLabel: {
//     color: '#fff',
//     opacity: 0.9,
//   },
//   floatingButton: {
//     backgroundColor: '#2563eb',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 12,
//     alignSelf: 'flex-start',
//     gap: 8,
//   },
//   floatingButtonText: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   progressCard: {
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
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   weightChart: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     height: 120,
//     paddingTop: 20,
//   },
//   chartEntry: {
//     alignItems: 'center',
//     flex: 1,
//   },
//   chartBar: {
//     width: 8,
//     backgroundColor: '#3b82f6',
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   chartLabel: {
//     fontSize: 12,
//     color: '#6b7280',
//     marginBottom: 4,
//   },
//   chartWeek: {
//     fontSize: 10,
//     color: '#9ca3af',
//   },
//   insightsCard: {
//     backgroundColor: '#1e40af',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//   },
//   insightsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   insightsTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   insightsList: {
//     gap: 12,
//   },
//   insightItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 12,
//     borderRadius: 8,
//   },
//   insightText: {
//     color: '#fff',
//     flex: 1,
//   },
//   todayCards: {
//     flexDirection: 'row',
//     gap: 16,
//     padding: 16,
//   },
//   planCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   planTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 12,
//   },
//   planDescription: {
//     color: '#6b7280',
//     fontSize: 14,
//     marginTop: 4,
//   },
//   planArrow: {
//     position: 'absolute',
//     right: 16,
//     top: 16,
//   },
//   goalCard: {
//     backgroundColor: '#fff',
//     margin: 16,
//     padding: 20,
//     borderRadius: 16,
//     marginBottom: 32,
//   },
//   goalHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   goalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   goalProgress: {
//     gap: 8,
//   },
//   goalTarget: {
//     fontSize: 16,
//     color: '#6b7280',
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#e5e7eb',
//     borderRadius: 4,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#22c55e',
//     borderRadius: 4,
//   },
//   goalCurrent: {
//     fontSize: 14,
//     color: '#22c55e',
//     fontWeight: '500',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// //import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import { faApple, faDumbbell, faGlass } from '@fortawesome/free-solid-svg-icons';

// const HomeScreen = ({ navigation }) => {
//   const weightData = [
//     { week: 'Week 1', weight: '98.0', change: '-0.8' },
//     { week: 'Week 2', weight: '97.2', change: '-0.7' },
//     { week: 'Week 3', weight: '96.5', change: '-0.7' },
//     { week: 'Week 4', weight: '95.8', change: '-0.7' }
//   ];

//   const insights = [
//     'Workout intensity optimized for your progress',
//     'Meal portions adjusted based on activity',
//     'Added low-impact exercises for joints'
//   ];

//   return (
//     <ScrollView style={styles.container}>
//       {/* Hero Section */}
//       <View style={styles.heroSection}>
//         <View>
//           <Text style={styles.welcomeText}>Welcome back,</Text>
//           <Text style={styles.nameText}>Alex</Text>
//           <View style={styles.bmiContainer}>
//             <Text style={styles.bmiValue}>BMI: 32.5</Text>
//             <Text style={styles.bmiLabel}>Obese Class I</Text>
//           </View>
//         </View>
//         <TouchableOpacity style={styles.logButton}>
//           <Icon name="balance-scale" size={18} color="#fff" />
//           <Text style={styles.buttonText}>Log Weight</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Weight Progress Card */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Weight Progress</Text>
//         <View style={styles.weightGrid}>
//           {weightData.map((entry, index) => (
//             <View key={index} style={styles.weightEntry}>
//               <Text style={styles.weekLabel}>{entry.week}</Text>
//               <Text style={styles.weightValue}>{entry.weight} kg</Text>
//               <View style={styles.changeContainer}>
//                 <Icon name="arrow-down" size={12} color="#22c55e" />
//                 <Text style={styles.changeText}>{entry.change} kg</Text>
//               </View>
//             </View>
//           ))}
//         </View>
//       </View>

//       {/* AI Insights Card */}
//       <View style={[styles.card, styles.insightsCard]}>
//         <View style={styles.insightsHeader}>
//           <Icon name="lightbulb-o" size={24} color="#fff" />
//           <Text style={styles.insightsTitle}>AI Health Insights</Text>
//         </View>
//         {insights.map((insight, index) => (
//           <View key={index} style={styles.insightItem}>
//             <Icon name="check-circle" size={18} color="#22c55e" />
//             <Text style={styles.insightText}>{insight}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Today's Plans */}
//       <View style={styles.plansContainer}>
//         <TouchableOpacity style={styles.planCard}>
//           <View style={styles.planHeader}>
//             <Icon name="dumbbell" size={20} color="#3b82f6" />
//             <Text style={styles.planTitle}>Today's Workout</Text>
//           </View>
//           <Text style={styles.planDetails}>30-min Low Impact</Text>
//           <Icon name="arrow-right" size={16} color="#3b82f6" style={styles.planArrow} />
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.planCard} onPress={() => navigation.navigate('NutritionScreen')}>
//           <View style={styles.planHeader}>
//             <Icon name="apple" size={20} color="#3b82f6" />
//             <Text style={styles.planTitle}>Today's Meals</Text>
//           </View>
//           <Text style={styles.planDetails}>1800 kcal Plan</Text>
//           <Icon name="arrow-right" size={16} color="#3b82f6" style={styles.planArrow} />
//         </TouchableOpacity>
//       </View>

//       {/* Weekly Goal Card */}
//       <View style={styles.card}>
//         <View style={styles.goalHeader}>
//           <Icon name="star" size={24} color="#f59e0b" />
//           <Text style={styles.cardTitle}>Weekly Goal</Text>
//         </View>
//         <Text style={styles.goalTarget}>Target: 0.5 kg loss</Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: '60%' }]} />
//         </View>
//         <Text style={styles.progressText}>Current: 0.3 kg loss</Text>
//       </View>
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
//     justifyContent: 'space-between',
//   },
//   welcomeText: {
//     color: '#fff',
//     fontSize: 16,
//     opacity: 0.9,
//   },
//   nameText: {
//     color: '#fff',
//     fontSize: 28,
//     fontWeight: 'bold',
//   },
//   bmiContainer: {
//     marginTop: 8,
//   },
//   bmiValue: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   bmiLabel: {
//     color: '#fff',
//     opacity: 0.9,
//   },
//   logButton: {
//     backgroundColor: '#2563eb',
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 12,
//     borderRadius: 12,
//     height: 44,
//     gap: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '500',
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
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   weightGrid: {
//     gap: 12,
//   },
//   weightEntry: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e5e7eb',
//   },
//   weekLabel: {
//     flex: 1,
//     color: '#6b7280',
//   },
//   weightValue: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginRight: 16,
//   },
//   changeContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 4,
//   },
//   changeText: {
//     color: '#22c55e',
//     fontSize: 14,
//   },
//   insightsCard: {
//     backgroundColor: '#1e40af',
//   },
//   insightsHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginBottom: 16,
//   },
//   insightsTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   insightItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     backgroundColor: 'rgba(255, 255, 255, 0.1)',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//   },
//   insightText: {
//     color: '#fff',
//     flex: 1,
//   },
//   plansContainer: {
//     flexDirection: 'row',
//     gap: 16,
//     padding: 16,
//   },
//   planCard: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 16,
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   planHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   planTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   planDetails: {
//     color: '#6b7280',
//     marginTop: 8,
//   },
//   planArrow: {
//     position: 'absolute',
//     right: 16,
//     top: 16,
//   },
//   goalHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   goalTarget: {
//     color: '#6b7280',
//     marginTop: 12,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: '#e5e7eb',
//     borderRadius: 4,
//     marginTop: 8,
//   },
//   progressFill: {
//     height: '100%',
//     backgroundColor: '#22c55e',
//     borderRadius: 4,
//   },
//   progressText: {
//     color: '#22c55e',
//     marginTop: 8,
//     fontWeight: '500',
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const HomeScreen = ({ navigation }) => {
//   // Sample user data (replace with ML model outputs or API calls)
//   const userData = {
//     name: 'Alex',
//     currentWeight: 95.8, // From user input or progress tracking
//     calorieGoal: 1800,   // From your calorie ML model
//     steps: 4500,         // Optional, if activity tracking is integrated
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Greeting Section */}
//       <View style={styles.greetingSection}>
//         <Text style={styles.greetingText}>Hi {userData.name}!</Text>
//         <Text style={styles.subtitle}>Your personalized health hub</Text>
//       </View>

//       {/* Quick Stats */}
//       <View style={styles.quickStats}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={24} color="#3b82f6" />
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={24} color="#3b82f6" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={24} color="#3b82f6" />
//           <Text style={styles.statValue}>{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//       </View>

//       {/* Navigation Tiles */}
//       <View style={styles.tilesContainer}>
//         <TouchableOpacity
//           style={styles.tile}
//           onPress={() => navigation.navigate('ExerciseScreen')}
//         >
//           <Icon name="dumbbell" size={30} color="#3b82f6" />
//           <Text style={styles.tileText}>Today’s Workout</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tile}
//           onPress={() => navigation.navigate('NutritionScreen')}
//         >
//           <Icon name="apple-alt" size={30} color="#3b82f6" />
//           <Text style={styles.tileText}>Meal Plan</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tile}
//           onPress={() => navigation.navigate('ProgressTrackingScreen')}
//         >
//           <Icon name="chart-line" size={30} color="#3b82f6" />
//           <Text style={styles.tileText}>Track Progress</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.tile}
//           onPress={() => navigation.navigate('MotivationScreen')}
//         >
//           <Icon name="star" size={30} color="#3b82f6" />
//           <Text style={styles.tileText}>Motivation</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f4f6',
//   },
//   greetingSection: {
//     padding: 20,
//     backgroundColor: '#3b82f6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greetingText: {
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
//   quickStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//   },
//   statCard: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '30%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#3b82f6',
//     marginTop: 8,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#6b7280',
//     marginTop: 4,
//   },
//   tilesContainer: {
//     padding: 16,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   tile: {
//     width: '48%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tileText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#3b82f6',
//     marginTop: 12,
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const HomeScreen = ({ navigation }) => {
//   const userData = {
//     name: 'Alex',
//     currentWeight: 95.8,
//     calorieGoal: 1800,
//     steps: 4500,
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.greetingSection}>
//         <Text style={styles.greetingText}>Hi {userData.name}!</Text>
//         <Text style={styles.subtitle}>Your personalized health hub</Text>
//       </View>

//       <View style={styles.quickStats}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={24} color="#34C759" /> 
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//       </View>

//       <View style={styles.tilesContainer}>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ExerciseScreen')}>
//           <Icon name="dumbbell" size={30} color="#3B82F6" /> 
//           <Text style={styles.tileText}>Today’s Workout</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('NutritionScreen')}>
//           <Icon name="apple-alt" size={30} color="#3B82F6" />
//           <Text style={styles.tileText}>Meal Plan</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ProgressTrackingScreen')}>
//           <Icon name="chart-line" size={30} color="#3B82F6" />
//           <Text style={styles.tileText}>Track Progress</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('MotivationScreen')}>
//           <Icon name="star" size={30} color="#3B82F6" />
//           <Text style={styles.tileText}>Motivation</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5', // Light Gray
//   },
//   greetingSection: {
//     padding: 20,
//     backgroundColor: '#3B82F6', // Vibrant Blue
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greetingText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#F5F5F5', // Light Gray text
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#F5F5F5',
//     opacity: 0.9,
//     marginTop: 4,
//   },
//   quickStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF', // White
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '30%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333', // Dark Gray
//     marginTop: 8,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666666', // Lighter gray
//     marginTop: 4,
//   },
//   tilesContainer: {
//     padding: 16,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   tile: {
//     width: '48%',
//     backgroundColor: '#FFFFFF',
//     padding: 20,
//     borderRadius: 16,
//     alignItems: 'center',
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   tileText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#3B82F6', // Vibrant Blue
//     marginTop: 12,
//   },
// });

// export default HomeScreen;

// import React from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';

// const HomeScreen = ({ navigation }) => {
//   const userData = {
//     name: 'Alex',
//     currentWeight: 95.8,
//     calorieGoal: 1800,
//     steps: 4500,
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.greetingSection}>
//         <Text style={styles.greetingText}>Hi {userData.name}!</Text>
//         <Text style={styles.subtitle}>Your personalized health hub</Text>
//       </View>

//       <View style={styles.quickStats}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//       </View>

//       <View style={styles.tilesContainer}>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ExerciseScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="dumbbell" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Today’s Workout</Text>
//               <Text style={styles.tileSubtitle}>Get moving now!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('NutritionScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="apple-alt" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Meal Plan</Text>
//               <Text style={styles.tileSubtitle}>Fuel your day!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ProgressTrackingScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="chart-line" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Track Progress</Text>
//               <Text style={styles.tileSubtitle}>See your gains!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('MotivationScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="star" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Motivation</Text>
//               <Text style={styles.tileSubtitle}>Stay inspired!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   greetingSection: {
//     padding: 20,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greetingText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#F5F5F5',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#F5F5F5',
//     opacity: 0.9,
//     marginTop: 4,
//   },
//   quickStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF',
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '30%',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginTop: 8,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 4,
//   },
//   tilesContainer: {
//     padding: 16,
//     flexDirection: 'column', // One card per row
//   },
//   tile: {
//     width: '100%', // Full width
//     height: 100, // Fixed height for rectangular shape
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   tileContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//     flex: 1,
//   },
//   tileTextContainer: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   tileText: {
//     fontSize: 18, // Slightly larger text
//     fontWeight: '600',
//     color: '#3B82F6',
//   },
//   tileSubtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 4,
//   },
// });

// export default HomeScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const HomeScreen = ({ navigation }) => {
//   const [userData, setUserData] = useState({
//     name: 'User', // Default until fetched
//     currentWeight: 95.8,
//     calorieGoal: 1800,
//     steps: 4500,
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
//         // Get name from Firebase Auth
//         const userName = user.displayName || 'User';
//         console.log('Fetched name from Auth:', userName);

//         // Optionally fetch additional data from Firestore
//         const userDoc = await firestore().collection('users').doc(user.uid).get();
//         if (userDoc.exists) {
//           const firestoreData = userDoc.data();
//           setUserData({
//             name: userName, // Use Auth name; override with firestoreData.name if preferred
//             currentWeight: firestoreData.healthAssessment?.Weight || 95.8,
//             calorieGoal: firestoreData.calorieGoal || 1800,
//             steps: firestoreData.steps || 4500,
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

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.greetingSection}>
//         <Text style={styles.greetingText}>Hi {userData.name}!</Text>
//         <Text style={styles.subtitle}>Your personalized health hub</Text>
//       </View>

//       <View style={styles.quickStats}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//       </View>

//       <View style={styles.tilesContainer}>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ExerciseScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="dumbbell" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Today’s Workout</Text>
//               <Text style={styles.tileSubtitle}>Get moving now!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('NutritionScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="apple-alt" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Meal Plan</Text>
//               <Text style={styles.tileSubtitle}>Fuel your day!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ProfileScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="chart-line" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Track Progress</Text>
//               <Text style={styles.tileSubtitle}>See your gains!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('MotivationScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="star" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Motivation</Text>
//               <Text style={styles.tileSubtitle}>Stay inspired!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   greetingSection: {
//     padding: 20,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greetingText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#F5F5F5',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#F5F5F5',
//     opacity: 0.9,
//     marginTop: 4,
//   },
//   quickStats: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     padding: 16,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF',
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '30%',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginTop: 8,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 4,
//   },
//   tilesContainer: {
//     padding: 16,
//     flexDirection: 'column',
//   },
//   tile: {
//     width: '100%',
//     height: 100,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   tileContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//     flex: 1,
//   },
//   tileTextContainer: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   tileText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#3B82F6',
//   },
//   tileSubtitle: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 4,
//   },
// });

// export default HomeScreen;


//===========================

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
//     height: 170, // Default until fetched
//     bmi: 0,      // Will be calculated
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
//         // Get name from Firebase Auth
//         const userName = user.displayName || 'User';
//         console.log('Fetched name from Auth:', userName);

//         // Fetch data from Firestore
//         const userDoc = await firestore().collection('users').doc(user.uid).get();
//         if (userDoc.exists) {
//           const firestoreData = userDoc.data();
//           const healthAssessment = firestoreData.healthAssessment || {};
//           const weight = healthAssessment.Weight || 95.8;
//           const height = healthAssessment.Height || 170; // Height in cm
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

//   // BMI Calculation Function
//   const calculateBMI = (weight, height) => {
//     const heightInMeters = height / 100; // Convert cm to meters
//     const bmi = weight / (heightInMeters * heightInMeters);
//     return bmi.toFixed(1); // Round to 1 decimal place
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.greetingSection}>
//         <Text style={styles.greetingText}>Hi {userData.name}!</Text>
//         <Text style={styles.subtitle}>Your personalized health hub</Text>
//       </View>

//       <View style={styles.quickStats}>
//         <View style={styles.statCard}>
//           <Icon name="weight" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.currentWeight} kg</Text>
//           <Text style={styles.statLabel}>Weight</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="fire" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
//           <Text style={styles.statLabel}>Calorie Goal</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="shoe-prints" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.steps}</Text>
//           <Text style={styles.statLabel}>Steps</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Icon name="calculator" size={24} color="#34C759" />
//           <Text style={styles.statValue}>{userData.bmi}</Text>
//           <Text style={styles.statLabel}>BMI</Text>
//         </View>
//       </View>

//       <View style={styles.tilesContainer}>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ExerciseScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="dumbbell" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Today’s Workout</Text>
//               <Text style={styles.tileSubtitle}>Get moving now!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('NutritionScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="apple-alt" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Meal Plan</Text>
//               <Text style={styles.tileSubtitle}>Fuel your day!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('ProfileScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="chart-line" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Track Progress</Text>
//               <Text style={styles.tileSubtitle}>See your gains!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.tile} onPress={() => navigation.navigate('MotivationScreen')}>
//           <View style={styles.tileContent}>
//             <Icon name="star" size={40} color="#3B82F6" />
//             <View style={styles.tileTextContainer}>
//               <Text style={styles.tileText}>Motivation</Text>
//               <Text style={styles.tileSubtitle}>Stay inspired!</Text>
//             </View>
//             <Icon name="chevron-right" size={20} color="#3B82F6" />
//           </View>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   greetingSection: {
//     padding: 20,
//     backgroundColor: '#3B82F6',
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   greetingText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#F5F5F5',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#F5F5F5',
//     opacity: 0.9,
//     marginTop: 4,
//   },
//   quickStats: {
//     flexDirection: 'row',
//     flexWrap: 'wrap', // Allow wrapping for 4 stats
//     justifyContent: 'space-around',
//     padding: 16,
//   },
//   statCard: {
//     backgroundColor: '#FFFFFF',
//     padding: 12,
//     borderRadius: 12,
//     alignItems: 'center',
//     width: '45%', // Adjust width for 2-per-row layout
//     marginBottom: 16, // Space between rows
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   statValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333333',
//     marginTop: 8,
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#666666',
//     marginTop: 4,
//   },
//   tilesContainer: {
//     padding: 16,
//     flexDirection: 'column',
//   },
//   tile: {
//     width: '100%',
//     height: 100,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     marginBottom: 16,
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 8,
//   },
//   tileContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//     flex: 1,
//   },
//   tileTextContainer: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   tileText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#3B82F6',
//   },
//   tileSubtitle: {
//     fontSize: 14,
//     color: '#666666',
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
    calorieGoal: 1800,
    steps: 4500,
    height: 170,
    bmi: 0,
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
        console.log('Fetched name from Auth:', userName);

        const userDoc = await firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const firestoreData = userDoc.data();
          const healthAssessment = firestoreData.healthAssessment || {};
          const weight = healthAssessment.Weight || 95.8;
          const height = healthAssessment.Height || 170;
          const bmi = calculateBMI(weight, height);

          setUserData({
            name: userName,
            currentWeight: weight,
            calorieGoal: firestoreData.calorieGoal || 1800,
            steps: firestoreData.steps || 4500,
            height: height,
            bmi: bmi,
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
          <Icon name="fire" size={28} color="#10B981" />
          <Text style={styles.statValue}>{userData.calorieGoal} kcal</Text>
          <Text style={styles.statLabel}>Calorie Goal</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="shoe-prints" size={28} color="#10B981" />
          <Text style="styles.statValue">{userData.steps}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="calculator" size={28} color="#10B981" />
          <Text style={styles.statValue}>{userData.bmi}</Text>
          <Text style={styles.statLabel}>BMI</Text>
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
            <Text style={styles.tileSubtitle}>Nourish your body</Text>
          </View>
          <Icon name="chevron-right" size={20} color="#10B981" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionTile} onPress={() => navigation.navigate('ProfileScreen')}>
          <View style={styles.tileIconContainer}>
            <Icon name="chart-line" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Track Progress</Text>
            <Text style={styles.tileSubtitle}>Monitor your success</Text>
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
            <Icon name="star" size={36} color="#FFFFFF" />
          </View>
          <View style={styles.tileTextContainer}>
            <Text style={styles.tileTitle}>Community</Text>
            <Text style={styles.tileSubtitle}>Keep the spark alive</Text>
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
    backgroundColor: '#F7FAFC', // Light gray-blue
  },
  headerSection: {
    backgroundColor: '#10B981', // Vibrant green header
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
    color: '#D1FAE5', // Light green tint for subtitle
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