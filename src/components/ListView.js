//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../utils/Responsive';
import { COLORS } from '@/constants';
import { searchIcon } from '@/assets';
import { Input,Image } from 'react-native-elements';

export const ListView = (props) => {
  let {
    title,
    imgSrc,
    imgStyle,
    catText,
    onClick,
    buttonStyle,
    titleStyle,
    numLines,
    isClicked = false,
  } = props;
  return (
    <>
      <TouchableOpacity style={[styles.btnstyle,buttonStyle]} onPress={onClick} > 
          <Image 
            resizeMode={"contain"}
            source={imgSrc}
            style={imgStyle}
            PlaceholderContent={<ActivityIndicator size="large" color="0000ff" />}
          />
          <Text style={[styles.textStyle,titleStyle]} numberOfLines={numLines}>{catText}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    width:103,
    flex:1,
    borderRadius: 100,
    alignItems:"center",
    marginTop:hp(1.2),
  
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth:3,
    borderColor:"#0F96A0" 
  },
  textStyle:{
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Regular",
    color:COLORS.BLACK,
    marginTop:spacing.xs
  }
});
