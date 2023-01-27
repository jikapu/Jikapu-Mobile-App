import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  categoryView:{
    paddingHorizontal:wp(4)
  },
  categoryText:{
    fontSize: wp(5.5),
  //  fontWeight:"bold",
    color:COLORS.BLACK,
    marginTop:spacing.m,
    fontFamily:"ProductSans-Bold"
  },
  listView:{
    flex:1,
    flexWrap:'wrap',
    alignItems:'center'
  },
  see:{
    flexDirection:"row",
    marginTop:spacing.m,
    alignItems:"center",
    justifyContent:"center",
  },
  textStyle: {
    fontSize: wp(5.5),
   // fontWeight: 'normal',
    color: COLORS.BLACK,
    marginTop: spacing.xs,
    fontFamily:"ProductSans-Regular"
  },
 
});
