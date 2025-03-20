import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Alert } from 'react-native';
import StackNavigation from './src/navigation/StackNavigation';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const navigation = React.useRef(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigation}>
      <StackNavigation user={user} />
    </NavigationContainer>
  );
};

export default App;

