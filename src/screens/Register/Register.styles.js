import { StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { spacing } from '@/theme';
import {heightToDP as hp, widthToDP as wp} from '../../utils/Responsive';
import {COLORS} from '../../constants/colors';
//const { BORDER_COLOR,BLACK,ERROR_RED , ARROW_COLOR, WHITE } = COLORS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  back:{
    height:40,
    width:40,
    alignItems:"center",
    alignSelf:"flex-start",
    marginLeft:spacing.s,
    marginTop:hp(5),
   },
  logo:{
   height:67,
   width:184,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal:spacing.m,
    marginBottom:hp(5)
  },
  signIn:{
    fontSize: wp(5.5),
    fontWeight:"700",
    color:COLORS.BLACK,
    marginTop:spacing.m
  },
  lineText:{
    fontSize: wp(3.5),
    fontWeight:"400",
    color:COLORS.BLACK
  },
  hrLine:{
    height:1,
    backgroundColor:COLORS.BORDER,
    width:wp(20)
  },
  submitButton: {
    marginTop: spacing.m,
    backgroundColor:COLORS.GREEN_BTN
  },
  socialText:{
    fontSize: wp(5.5),
    fontWeight:"700",
    color:COLORS.BLACK
  },
  sociallogin: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: COLORS.BORDER,
    width: wp(42.5),
    height:hp(5),
    alignItems: 'center',
    justifyContent:"space-around",
    paddingHorizontal:wp(7)
}
});
