import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section:{
    flex:1,
    backgroundColor:COLORS.BG_SKYBLUE,
    margin:wp(4),
    borderRadius:spacing.xs
  }
 
});
