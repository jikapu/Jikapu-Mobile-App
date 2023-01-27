import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import { spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgView: {
    flex: 0.3,
  },
  searchView: {
    flex: 0.7,
  },
  categoryView:{
    paddingHorizontal:wp(0)
  },
  categoryText:{
    fontSize: wp(3.9),
   // fontWeight:"bold",
   fontFamily:"ProductSans-Bold",
    color:COLORS.BLACK,
    marginTop:spacing.xs
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
  featureView:{
    paddingHorizontal:wp(4)
  }
 
});
