import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../views/WelcomeScreen';
import Login from '../views/Login';
import Signup from '../views/Signup';
import ForgotPasswordScreen from '../views/ForgotPasswordScreen';
import HealthAssessment from '../views/HealthAssessment';
import HomeScreen from '../views/HomeScreen';
import NutritionScreen from '../views/NutritionScreen';
import ExerciseScreen from '../views/ExerciseScreen';
import MotivationScreen from '../views/MotivationScreen';
import ProfileScreen from '../views/ProfileScreen';
import WorkoutHistory from '../views/WorkoutHistory';
import GoalsScreen from '../views/GoalsScreen';
import HealthyTipsScreen from '../views/HealthTipsScreen';
import CommunityScreen from '../views/CommunityScreen';

const Stack = createStackNavigator();

const StackNavigation = ({ user }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="HealthAssessment" component={HealthAssessment} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NutritionScreen" component={NutritionScreen} />
      <Stack.Screen name="ExerciseScreen" component={ExerciseScreen} />
      <Stack.Screen name="MotivationScreen" component={MotivationScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="WorkoutHistory" component={WorkoutHistory} />
      <Stack.Screen name="GoalsScreen" component={GoalsScreen} />
      <Stack.Screen name="HealthyTipsScreen" component={HealthyTipsScreen} />
      <Stack.Screen name="CommunityScreen" component={CommunityScreen} />

    </Stack.Navigator>
  );
};

export default StackNavigation;

