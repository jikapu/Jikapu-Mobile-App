//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text,Pressable, TouchableOpacity } from 'react-native';
import { typography,spacing } from '@/theme';
import {heightToDP as hp, widthToDP as wp} from '../../utils/Responsive';
import {COLORS} from '@/constants'
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: spacing.xs,
    padding: spacing.xs,
    width: '100%',
    height:hp(6),
    backgroundColor:COLORS.PRIMARY,
    opacity:1
  },
});

export const Button = (props) => {
  let { title,style, handlePress,textStyle, disable = false} = props;
  return (
      <TouchableOpacity  onPress={handlePress} style={[styles.button, style]} disabled={disable}>
          <Text style={[typography.btnText,textStyle]}>{title}</Text>
      </TouchableOpacity>
  )
}
