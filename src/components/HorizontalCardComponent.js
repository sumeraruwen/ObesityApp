import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';
import { dimensions } from '../styles/constants';
import ButtonComponent from './ButtonComponent';

const HorizontalCardComponent = ({ name, topic ,buttonName,backgroundImageSource }) => {
  return (
   

    <View style={styles.card}>
      <ImageBackground
      source={require('../assets/bg3.webp')} // Replace with the path to your background image
      style={styles.backgroundImage}
    >
      {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
      {/* <Image  source={require('../assets/horizontal2.webp')} style={styles.image} /> */}
       
      <View style={{padding:dimensions.paddingLevel3}}>
    
      <Text style={styles.topic}>{topic}</Text>
      <Text style={styles.name}>{name}</Text>
      {/* <View style={{padding: dimensions.paddingLevel6, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
            style={styles.interestedButton}
            onPress={() => {
              // Handle "Interested" button press
            }}
          >
            <Text style={styles.interestedButtonText}>{buttonName}</Text>
          </TouchableOpacity>
      </View> */}
      </View>
      </ImageBackground>
    </View>
  
    
  );
};

const styles = StyleSheet.create({
  card: {
    width: dimensions.widthLevel5,
    height:dimensions.heightLevel14,
   // marginRight: 20,
    marginLeft:25,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius:15,
    //backgroundColor:'#37B47E',
    overflow: 'hidden',
    
    //padding: 10,
  },
  backgroundImage: {
    width: '100%', // Cover the entire width of the card
    height: '100%', // Cover the entire height of the card
    resizeMode: 'cover', // Maintain aspect ratio while covering the entire space
  },
 
  image: {
    width: dimensions.widthLevel10,
    height: dimensions.heightLevel9,
    borderTopLeftRadius: 15,  // Adjust this value to control the top-left corner radius
    borderTopRightRadius: 15, 
    
  },
  name: {
    color: 'white',
    marginTop: dimensions.paddingLevel4,

  },
  topic: {
    color: 'white',
    fontWeight:'500',
    marginTop: 2,
    fontSize:20,
   
  },

  interestedButton: {
    backgroundColor: '#FE3F3F', // Blue color, you can change it
    borderRadius: 20,
    padding: 5,
    width: 220, // Set the desired width
    height: 38, // Set the desired height
    justifyContent: 'center', // Center the button content vertically
    alignItems: 'center', // Center the button content horizontally
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5, 
   // marginTop:'10%'

    //marginTop: 10,
    
  },
  interestedButtonText: {
    color: 'black',
    textAlign: 'center',
  },
  // backgroundImage: {
  //   flex: 1,
  //   resizeMode: 'cover', // or 'stretch' for different cover options
  // },
 
});

export default HorizontalCardComponent;
