import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import { dimensions, fontSizes } from '../styles/constants';

const SliderCardComponent = ({ category, topic, date, participants,buttonName }) => {
  return (
  
    <View style={styles.card}>
       <ImageBackground
      source={require('../assets/bg5.webp')} // Replace with the path to your background image
      style={styles.backgroundImage}
    >
      {/* <Image
       source={require('../assets/horizontal1.webp')}
        style={styles.sliderImage}
      /> */}

      {/* Card Details */}
     
      <View style={styles.detailsContainer}>
    
        {/* <Text style={styles.category}>{category}</Text> */}
        <Text style={styles.topic}>{topic}</Text>
        <Text style={styles.date}>{date}</Text>
       
       
      </View>
      </ImageBackground>
    </View>
    
  );
};

const styles = StyleSheet.create({
  card: {
    height:dimensions.heightLevel10,
    //width:'85%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginLeft: 20,
    marginRight:20,
    marginTop:20,
    
    flexDirection: 'column',
    alignContent:'center',
    overflow: 'hidden',
   
  },
  backgroundImage: {
    width: '100%', // Cover the entire width of the card
    height: '100%', // Cover the entire height of the card
    resizeMode: 'cover', // Maintain aspect ratio while covering the entire space
  },
  sliderImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,  // Adjust this value to control the top-left corner radius
    borderTopRightRadius: 15, 
    
  },
  detailsContainer: {
    padding: 10,
  },
  category: {
    color: 'white',
  },
  topic: {
    fontWeight:'700',
    color: 'white',
    marginTop: '5%',
    marginLeft:'5%',
    fontSize:fontSizes.fontXXXLarge
  },
  date: {
    color: 'white',
    marginTop: 3,
    marginLeft:'5%',
  },
 
  
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this to space out the elements
    marginBottom: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
     
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  iconText: {
    color: 'gray',
    marginRight: 10,
  },
  category: {
    color: 'gray',
  },
});

export default SliderCardComponent;
