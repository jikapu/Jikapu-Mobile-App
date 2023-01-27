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
    
    height: hp(12),
    alignItems:"center",
    paddingTop: hp(4),
    paddingHorizontal: hp(2),
    backgroundColor: COLORS.PRIMARY,
  },
  imgView: {
    flex: 0.2,
    marginTop:-wp(1)
  },
  searchView: {
    flex: 0.8,
  },
  categoryView:{
    padding:wp(4),
  },
  categoryText:{
    fontSize: wp(5),
    fontWeight:"bold",
    color:COLORS.BLACK,
    marginTop:spacing.m
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
  btnstyle: {
    width:103,
    alignItems:"center",
    marginTop:hp(1.2),
  
  },
  textStyle:{
    fontSize: wp(3.9),
    fontWeight:"normal",
    color:COLORS.BLACK,
    marginTop:spacing.xs
  }
 
});
