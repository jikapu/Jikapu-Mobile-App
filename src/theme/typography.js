import { StyleSheet } from 'react-native';
import {heightToDP as hp, widthToDP as wp} from '../utils/Responsive';
import { COLORS } from '@/constants'
export const typography = StyleSheet.create({
  title: {
    fontSize: wp(4.9),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Bold"
  },
  sText:{
    fontSize: wp(3),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Regular"
  },
  sTextBold:{
    fontSize: wp(3),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Bold"
  },
  pText: {
    fontSize: wp(3.3),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Regular"
  },
  pTextBold: {
    fontSize: wp(3.3),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Bold"
  },
  text: {
    fontSize: wp(3.7),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Regular"
  },
  textBold:{
    fontSize: wp(3.7),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Bold"
  },
  label: {
    color:COLORS.BLACK,
    fontSize:wp(3.9),
    fontFamily:"ProductSans-Regular"
  },
  labelBold:{
    fontSize: wp(3.9),
    color:COLORS.BLACK,
    fontFamily:"ProductSans-Bold"
  },
  labelLarge:{
    fontSize: wp(4.1),
    fontFamily:"ProductSans-Regular",
    color:"#98A0A6"
  },
  labelLargeBold:{
    fontSize: wp(4.1),
    color:COLORS.WHITE,
    fontFamily:"ProductSans-Bold",
  },
  btnText:{
    fontSize:wp(3.9),
    color:COLORS.WHITE,
    fontFamily:"ProductSans-Bold"
  },
  error: {
    fontSize: wp(3.2),
    fontWeight: 'normal',
    color:COLORS.ERROR_RED,
    fontFamily:"ProductSans-Regular",
  },
  placeholder:{
    fontSize:wp(3.7),
    fontFamily:"ProductSans-Regular",
    color:COLORS.PLACEHOLDER
  },
  p:{
    fontSize:wp(3.3),
    fontFamily:"ProductSans-Bold",
    color:COLORS.GREEN_BTN
  },
  inputText:{
    color:COLORS.BLACK,
    fontSize:wp(4.1),
    fontFamily:"ProductSans-Regular",
    padding:0
  }
});
