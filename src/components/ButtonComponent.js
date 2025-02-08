// CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, fontSizes } from '../styles/constants';

const ButtonComponent = ({
  text,
  onPress,
  customStyles, // Custom styles for the button
}) => {
  const buttonStyles = {
    backgroundColor: customStyles.backgroundColor || '#FE3F3F',
    width: customStyles.width || 150,
  //  height:customStyles.height ||50,
    borderRadius: customStyles.borderRadius || 5,
    marginTop: customStyles.marginTop || 0,
  };

  const textStyles = {
    fontSize: customStyles.textHeight || 17,
    color:customStyles.color|| colors.black,
    fontWeight: '500',

  };

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyles]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
   // fontSize:fontSizes.fontMedium
  },
});

export default ButtonComponent;
