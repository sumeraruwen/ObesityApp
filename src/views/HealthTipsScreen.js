import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import auth from '@react-native-firebase/auth';

// Professional tips for obese individuals
const OBESITY_TIPS = [
  { text: 'Break your meals into smaller portions to control hunger throughout the day.', source: 'Nutritionist' },
  { text: 'Walk for 10 minutes after each meal to boost metabolism and burn calories.', source: 'Fitness Expert' },
  { text: 'Swap sugary drinks for water or herbal tea to cut empty calories.', source: 'Dietitian' },
  { text: 'Use a food journal to track what you eat—awareness is the first step to change.', source: 'Behavioral Coach' },
  { text: 'Aim for 7-8 hours of sleep nightly—lack of rest can increase cravings.', source: 'Sleep Specialist' },
  { text: 'Choose high-fiber foods like vegetables and legumes to stay full longer.', source: 'Nutritionist' },
  { text: 'Start with light strength training to build muscle and improve fat loss.', source: 'Fitness Expert' },
  { text: 'Set realistic goals, like losing 1-2 pounds per week, for sustainable progress.', source: 'Health Coach' },
  { text: 'Practice mindful eating—focus on your food without distractions.', source: 'Behavioral Coach' },
  { text: 'Join a support group or buddy up—accountability helps you stay on track.', source: 'Psychologist' },
];

const HealthyTipsScreen = ({ navigation }) => {
  const [dailyTip, setDailyTip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) {
      navigation.navigate('Login');
      return;
    }
    updateDailyTip();
    setLoading(false);
  }, [navigation]);

  const updateDailyTip = () => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
    const tipIndex = dayOfYear % OBESITY_TIPS.length;
    setDailyTip(OBESITY_TIPS[tipIndex]);
  };

  const handleAction = () => {
    // Example actions based on tip content
    if (dailyTip.text.includes('water')) {
      navigation.navigate('NutritionScreen'); // Log water
    } else if (dailyTip.text.includes('goal')) {
      navigation.navigate('GoalsScreen'); // Set a goal
    } else if (dailyTip.text.includes('walk') || dailyTip.text.includes('training')) {
      navigation.navigate('ExerciseScreen'); // Start a workout
    } else {
      alert('Take a moment to apply this tip today!');
    }
  };

  const renderTipCard = () => (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Icon name="lightbulb" size={30} color="#10B981" />
        <Text style={styles.tipCategory}>Daily Tip</Text>
      </View>
      <Text style={styles.tipText}>{dailyTip?.text}</Text>
      <Text style={styles.tipSource}>— {dailyTip?.source}</Text>
      <TouchableOpacity style={styles.actionButton} onPress={handleAction}>
        <Text style={styles.actionButtonText}>Try This</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Healthy Tips</Text>
        <Text style={styles.headerSubtitle}>Your Daily Guide to Better Health</Text>
      </View>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <>
          {renderTipCard()}
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
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    alignItems: 'center',
  },
  headerText: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  headerSubtitle: { fontSize: 16, color: '#D1FAE5', marginTop: 8 },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipCategory: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
    marginLeft: 12,
  },
  tipText: {
    fontSize: 18,
    color: '#111827',
    lineHeight: 26,
    marginBottom: 8,
  },
  tipSource: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  loadingText: {
    fontSize: 18,
    color: '#111827',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HealthyTipsScreen;