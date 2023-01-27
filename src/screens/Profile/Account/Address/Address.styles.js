import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { spacing } from '@/theme';
import {COLORS} from '@/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
  },
  profileView:{
    alignItems:'center',
    marginTop:hp(3.5),
    paddingBottom:hp(5)
  },
  contact:{
    fontSize: wp(4),
    fontWeight:"normal",
    color:COLORS.BLACK,
    marginTop:spacing.s
  },
  userName:{
    fontSize: wp(5.5),
    fontWeight:"bold",
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
