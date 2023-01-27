//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet,View, Text,Pressable,Image, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { npMove, npRight } from '@/assets';
import {heightToDP as hp, widthToDP as wp} from '../../utils/Responsive';
import {COLORS} from '@/constants';


export const Button1 = (props) => {
  let { title,style, handlePress,textStyle } = props;
  return (
      <TouchableOpacity  onPress={handlePress} style={[styles.button, style]}>  
          <View style={{flex:0.99}}>
          <Text style={[ typography.label, textStyle]}>{title}</Text>
          </View>
         <View  >
         <Image source={npMove} style={{alignSelf:"flex-end",}} />
         </View>
      </TouchableOpacity>
  )

}

const styles = StyleSheet.create({
    button: {
     flex:1,
     flexDirection:"row",
      alignItems: 'center',
      borderRadius: 7,
      paddingVertical: spacing.xs,
      marginVertical:spacing.xs,
      paddingHorizontal:spacing.m,
      borderWidth:1,
      borderColor:"#7070704F",
      height:hp(6),
      backgroundColor:COLORS.WHITE,
      opacity:1
    },
  });