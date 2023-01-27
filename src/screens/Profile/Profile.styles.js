import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { spacing } from '@/theme';
import {COLORS} from '@/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  headerTop: {
    height: hp(6.5),
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
  },
  headerBottom: {
    flexDirection:"row",
    height: hp(6.5),
    alignItems:"center",
    paddingVertical: hp(4),
    paddingHorizontal: hp(2),
    backgroundColor: COLORS.BG_LIGHT,
  },
  search: {
    width: 20,
    height: 20,
    marginLeft:wp(40)
  },
  imgView: {
    flex: 0.3,
  },
  searchView: {
    flex: 0.7,
  },
  profileView:{
    alignItems:'center',
    marginTop:hp(3.5),
    paddingBottom:hp(5)
  },
  contact:{
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Regular",
    color:COLORS.BLACK,
   
  },
  userName:{
    fontSize: wp(4.5),
    fontFamily:"ProductSans-Bold",
    color:COLORS.BLACK,
    marginTop:spacing.xs
  },
  listView:{
    paddingHorizontal:wp(4)
  },
  submitButton: {
    marginTop: spacing.m,
    backgroundColor:COLORS.GREEN_BTN
  },
});
