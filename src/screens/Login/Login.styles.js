import { StyleSheet,Dimensions } from 'react-native';
import { spacing } from '@/theme';
import {heightToDP as hp, widthToDP as wp} from '@/utils';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:hp(8),
    alignItems: 'center',
    justifyContent:'center'
  },
  logo:{
   height:67,
   width:184
  },
  formContainer: {
    width: '100%',
    paddingHorizontal:spacing.m
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
    width:wp(30)
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
    height:hp(6),
    alignItems: 'center',
    justifyContent:"space-around",
    paddingHorizontal:wp(7)
},
guestBtn:{
  alignSelf:"center",
  alignItems:"center",
  flexDirection:"row",
  marginVertical:hp(3)
}
});
