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
    paddingHorizontal:wp(4),
  },
  subCategoryView:{
    marginTop:hp(2),
    marginHorizontal:wp(4),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#0F96A0",
  },
  categoryText:{
    fontSize: wp(4.9),
    fontFamily:"ProductSans-Bold",
    color:COLORS.BLACK,
    marginTop:hp(1)
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
    width:wp(30),
    alignItems:"center",
    marginTop:hp(1.2),
  },
  img:{
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth:3,
    borderColor:"#0F96A0" 
  },
  img1:{
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textStyle:{
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Regular",
    color:COLORS.BLACK,
    marginTop:spacing.xs,
  
  },
  eView:{
    marginTop:hp(3),
    backgroundColor:COLORS.WHITE,
    marginHorizontal:wp(4),
    borderRadius:spacing.xs,
    padding:wp(3)
  },
  img2:{
     width: 110, height: 100, 
  },
  btn:{
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding:wp(4),
    borderRadius: spacing.xs,
    shadowColor: '#00000014',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,  
    elevation: 5,
    marginHorizontal:wp(0.8),  
  }
 
});
