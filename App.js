// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import StackNavigation from './src/navigation/StackNavigation';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';


// const Stack = createStackNavigator();

// const App = () => {

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(async (user) => {
//       if (user) {
//         const userDoc = await firestore()
//           .collection('users')
//           .doc(user.uid)
//           .get();
        
//         if (!userDoc.exists || !userDoc.data()?.healthAssessment) {
//           navigation.replace('HealthAssessment');
//         } else {
//           navigation.replace('HomeScreen');
//         }
//       }
//     });
  
//     return unsubscribe;
//   }, []);

//   return (
//     <NavigationContainer>
//      <StackNavigation/>
//     </NavigationContainer>
//   );
// };

// export default App;


// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import StackNavigation from './src/navigation/StackNavigation';
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState(null);
//   const navigation = React.useRef(null);

//   useEffect(() => {
//     const unsubscribe = auth().onAuthStateChanged(async (user) => {
//       // Don't auto-navigate here, just set the user state
//       setUser(user);
//       setInitializing(false);
//     });

//     return unsubscribe;
//   }, []);

//   if (initializing) return null;

//   return (
//     <NavigationContainer ref={navigation}>
//       <StackNavigation user={user} />
//     </NavigationContainer>
//   );
// };

// export default App;

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