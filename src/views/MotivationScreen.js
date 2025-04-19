import React from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const MotivationScreen = ({ navigation }) => {
  const quotes = [
    "Small steps every day lead to big results!",
    "You’re stronger than you think!",
    "Keep going—every workout counts!",
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Stay Motivated</Text>
        <Text style={styles.subtitle}>Fuel your fire</Text>
      </View>
      <View style={styles.motivationCard}>
        <Text style={styles.cardTitle}>Daily Inspiration</Text>
        {quotes.map((quote, index) => (
          <View key={index} style={styles.quoteItem}>
            <Icon name="star" size={20} color="#3B82F6" />
            <Text style={styles.quoteText}>{quote}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { padding: 20, backgroundColor: '#3B82F6', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerText: { fontSize: 28, fontWeight: 'bold', color: '#FFF' },
  subtitle: { fontSize: 16, color: '#FFF', opacity: 0.9, marginTop: 4 },
  motivationCard: { backgroundColor: '#FFF', margin: 16, padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#3B82F6', marginBottom: 12 },
  quoteItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  quoteText: { fontSize: 16, color: '#333', marginLeft: 12, flex: 1 },
  backButton: { margin: 16, padding: 12, backgroundColor: '#3B82F6', borderRadius: 8, alignItems: 'center' },
  backButtonText: { fontSize: 16, color: '#FFF', fontWeight: '600' },
});

export default MotivationScreen;