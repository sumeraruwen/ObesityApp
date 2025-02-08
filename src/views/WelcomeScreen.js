// src/WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity,ImageBackground } from 'react-native';
import ButtonComponent from '../components/ButtonComponent';

import {
    colors, dimensions,fontSizes
   
  } from '../styles/constants';

const WelcomeScreen = ({ navigation }) => {

    const customStyles = {
        backgroundColor: 'white',
        width: dimensions.widthLevel12,
        borderRadius: 20,
       // height:dimensions.heightLevel3,
       textHeight: fontSizes.fontMediumPlus,
        marginTop:'13%',
       color:"black",
      

        
      };

      const handleGetPress = () => {
        navigation.navigate('Login');
        
      };

  return (
<ImageBackground
      source={require('../assets/bgImage.webp')} // Replace with the path to your background image
      style={styles.backgroundImage}
    >
    
    <View style={styles.container}>
    <View style={styles.textContainer}>
      <Text style={styles.text}>Stay Fit.</Text>
      <Text style={styles.text}>Stay Strong.</Text>
      <Text style={styles.text}>Stay Healthy.</Text>

      <Text style={styles.text2}>Physical fitness is generally achieved through proper nutrition, 
      moderate-vigorous physical exercise, physical activity, and sufficient rest. ..!</Text>
      </View>
      
      <ButtonComponent
        text="Get Started"
        onPress={handleGetPress}
        customStyles={customStyles}
      />

       {/* Image at the bottom right corner */}
       {/* <Image
        source={require('../assets/WelcomeEllipse.webp')}
        style={styles.bottomRightImage}
      /> */}

       {/* Image at the bottom center */}
       {/* <Image
        source={require('../assets/girl2.webp')}
        style={styles.bottomCenterImage}
      /> */}
 
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Align the button to the bottom
   paddingBottom: '10%', // Add padding at the bottom for better spacing
  //  paddingHorizontal:'20%'
  },
  textContainer: {
    alignItems: 'flex-start', // Align text to the left side
   marginTop:"62%"
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' for different cover options
  },
  text: {
    fontSize: fontSizes.fontXXXXLarge,
    fontWeight: 'bold',
    marginTop: '3%',
    color:colors.white,
    
  },
  text2: {
    fontSize: fontSizes.fontMidMedium,
    marginTop: '15%',
    color:colors.white,
    width:dimensions.widthLevel3,
   // textAlign: 'center',
  },
  bottomRightImage: {
    position: 'absolute', // Position the image absolutely
    bottom: 0, // Place it at the bottom
    right: 0, // Place it at the right
  },
  bottomCenterImage: {
    position: 'absolute',
    bottom: 0,
    width:360,
    height:360,
    left:-10
  },
 
  
 
});

export default WelcomeScreen;
