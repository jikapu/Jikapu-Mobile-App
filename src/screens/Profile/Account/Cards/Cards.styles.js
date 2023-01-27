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
  
  listView:{
    paddingHorizontal:wp(4)
  },
  submitButton: {
    marginTop: spacing.m,
    backgroundColor:COLORS.GREEN_BTN
  },
});
