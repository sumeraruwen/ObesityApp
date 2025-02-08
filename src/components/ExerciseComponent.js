// VideoScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';
import { fontSizes } from '../styles/constants';

const ExerciseComponent = ({ videoSource, buttonText, onPress,exerciseName,exerciseCount }) => {
  return (
    <View style={styles.container}>
      {/* Video Animation */}
      <Video
        source={videoSource}
        style={styles.video}
        resizeMode="cover"  // Adjust resizeMode to "cover"
        repeat
      />

    <Text style={styles.exText}>{exerciseName}</Text>
    <Text style={styles.exCount}>{exerciseCount}</Text>
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      video: {
        width: '100%',
        height: '50%',
        position: 'absolute',
        top: 0,
        left: 0,
      },
      button: {
        backgroundColor: '#0000CD',
        padding: 15,
        borderRadius: 20,
        width:200,
        marginTop: '10%',
        alignItems: 'center',
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        
      },
      exText:{
        color: 'black',
        fontSize: fontSizes.fontXXXLarge,
        fontWeight: 'bold',  
        marginTop:'100%',
        marginBottom:'10%'
      },
      exCount:{
        color: 'black',
        fontSize: 40,
        fontWeight: 'bold',
        
       //marginTop:20 
      }
    });
export default ExerciseComponent;
