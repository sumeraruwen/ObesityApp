import React from 'react';
import { View, Text, ScrollView, TextInput, FlatList, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HorizontalCardComponent from '../components/HorizontalCardComponent';
import MainHeaderComponent from '../components/MainHeaderComponent';
import SliderCardComponent from '../components/SliderCardComponent';
import { colors, dimensions, fontSizes } from '../styles/constants';


const HomeScreen = ({navigation}) => {
  // Dummy data for recommended items (replace with your data)
  const handleSignIn = () => {
    navigation.navigate('HomeScreen');
    
  };
  const handlePredict = () => {
   // navigation.navigate('PredictScreen');
    
  };
  const handleExerciseScreen1 = () => {
    // navigation.navigate('PredictScreen');
    navigation.navigate('ExerciseScreen1');
     
   };
  
  const recommendedItems = [
    {
      id: '1',
      topic: 'FULL BODY 7X4   CHALLENGE',
      name: 'Unless you are highly experienced and committed to working out, you will get overwhelmed if you exceed a certain threshold. ',
      //imageUrl: require('../assets/horizontal1.webp')
      //imageUrl: 'https://example.com/item1.jpg',
      backgroundImage:require('../assets/bgImage.webp'),
      buttonName:"Interested",
     

    },
    {
      id: '2',
      topic: 'LOWER BODY 7X4 CHALLENGE',
      name: 'Unless you are highly experienced and committed to working out, you will get overwhelmed if you exceed a certain threshold. ',
     // imageUrl: 'https://example.com/item1.jpg',
     backgroundImage:require('../assets/bgImage.webp'),
      buttonName:"Interested"

    },
   
    // Add more recommended items here
  ];

  // Dummy data for upcoming events (replace with your data)
  const upcomingEvents = [
    {
      id: '1',
      category: 'Somerset',
      topic: 'ABS BEGINEER',
      date:"4 EXERCISES",
      
      
    },
    {
      id: '2',
      category: 'Somerset',
      topic: 'CHEST BEGINEER',
      date:"2 EXERCISES",
 
    },
    {
      id: '3',
      category: 'Somerset',
      topic: 'ARM BEGINEER',
      date:"4 EXERCISES",
      
    },
    // Add more upcoming events here
  ];

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <MainHeaderComponent

      //  userImage={UserImage} // Replace with your image URL
      />

      <ScrollView style={{backgroundColor:'#fff'}}> 
        {/* Search Bar */}
        <View style={{ padding: 20 }}>
          <TextInput
            placeholder="Search..."
            style={{
              borderWidth: 1,
              borderRadius: 20,
              padding:10,
              borderColor: '#ccc',
            }}
          />
        </View>

        {/* Recommended Section */}
        <Text style={{ fontSize: fontSizes.fontLarge, fontWeight: '700', marginLeft: '6%' ,marginBottom:'5%',color:colors.black}}>
          Up Comming
        </Text>
        <FlatList
          data={recommendedItems}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HorizontalCardComponent
               name={item.name}
               topic={item.topic}
               date={item.date}
               imageUrl={item.imageUrl}
              
            />
          )}
        />

        {/* Upcoming Section */}
        <Text style={{ fontSize: fontSizes.fontLarge, fontWeight: '700', marginLeft: '6%', marginTop: '5%',color:colors.black }}>
        Recommended for You
        </Text>
        <FlatList
          data={upcomingEvents}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleExerciseScreen1}>
            <SliderCardComponent
              category={item.category}
              topic={item.topic}
              date={item.date}
              participants={item.participants}
              buttonName={item.buttonName}
            />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;


