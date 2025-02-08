// import React from "react";
// import { createStackNavigator } from "@react-navigation/stack";
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// import Login from '../views/Login';
// import Signup from '../views/Signup';
// import WelcomeScreen from "../views/WelcomeScreen";
// // import SignInScreen from "../views/SignIn";
// // import SignUpScreen1 from "../views/SignUpScreen1";
// // import SignUpScreen2 from "../views/SignUpScreen2";
// //import VerificationScreen from "../views/VerificationScreen";
// //import ClassifiedNavigation from "./ClassifiedNavigation";
//  import HomeScreen from "../views/HomeScreen";
//  import ForgotPasswordScreen from "../views/ForgotPasswordScreen";
//  import HealthAssessment from "../views/HealthAssessment";

// // import PredictScreen from "../views/PredictScreen";
// // import DietPlanScreen from "../views/DietPlanScreen";
// // import ExerciseScreen1 from "../views/ExerciseScreen1";
// // import ExerciseScreen2 from "../views/ExerciseScreen2";
// // import ExerciseScreen3 from "../views/ExerciseScreen3";
// //import NotificationScreen from "../views/NotificationScreen";
// //import ChatScreen from "../views/ChatScreen";




// const Stack = createStackNavigator();

// const StackNavigation = () => {
//   return (
//      <Stack.Navigator
     
//          screenOptions={{
//           header:()=>null
          
//          }}
//          initialRouteName="WelcomeScreen"
//       >

//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Signup" component={Signup} />

//         <Stack.Screen name="WelcomeScreen"component={WelcomeScreen}/>
//         {/* <Stack.Screen name="SignIn" component={SignInScreen}/>
//         <Stack.Screen name="SignUpScreen1" component={SignUpScreen1}/> */}
//         {/* <Stack.Screen name="SignUpScreen2" component={SignUpScreen2}/> */}
//         {/* <Stack.Screen name="VerificationScreen" component={VerificationScreen}/> */}
//         <Stack.Screen name="HomeScreen" component={HomeScreen}/>
//         <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
//         <Stack.Screen name="HealthAssessment" component={HealthAssessment} />
//         {/* <Stack.Screen name="ExerciseScreen1" component={ExerciseScreen1}/>
//         <Stack.Screen name="ExerciseScreen2" component={ExerciseScreen2}/>
//         <Stack.Screen name="ExerciseScreen3" component={ExerciseScreen3}/>
//         <Stack.Screen name="PredictScreen" component={PredictScreen}/>
//         <Stack.Screen name="DietPlanScreen" component={DietPlanScreen}/> */}
//         {/* <Stack.Screen name="HomeScreen" component={ClassifiedNavigation}/>
//         <Stack.Screen name="Chat" component={ChatScreen} /> */}
//         {/* <Stack.Screen name="Notification" component={NotificationScreen}/> */}
        
//         {/* <Stack.Screen name="TabNavigation" component={TabNavigation}/> */}
        
       
//       </Stack.Navigator> 
//   );
// }

//  export default StackNavigation;


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../views/WelcomeScreen';
import Login from '../views/Login';
import Signup from '../views/Signup';
import HealthAssessment from '../views/HealthAssessment';
import HomeScreen from '../views/HomeScreen';

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
      <Stack.Screen name="HealthAssessment" component={HealthAssessment} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;