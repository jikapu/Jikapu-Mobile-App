import { StyleSheet } from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { spacing } from '@/theme';
import {COLORS} from '@/constants'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listView:{
   paddingHorizontal:wp(4),
   marginTop:hp(1)
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
  imgView: {
    flex: 0.3,
  },
  search: {
    width: 20,
    height: 20,
    marginLeft:wp(40)
  },
  searchView: {
    flex: 0.7,
  },
  categoryText:{
    fontSize: wp(5),
    fontWeight:"bold",
    color:COLORS.BLACK,

  },
  btnstyle: {
    width:wp(30),
    alignItems:"center",
    marginTop:hp(1.2),
   // backgroundColor:"green"
  },
  see:{
    flexDirection:"row",
    marginTop:spacing.m,
    alignItems:"center",
    justifyContent:"center",
  },
  subCategoryView:{
    marginTop:hp(4),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#0F96A0",
  },
  img:{
    width: 100,
    height: 100,
    borderWidth:3,
    borderColor:"#0F96A0" ,
    borderRadius: 100,
  },
  img1:{
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textStyle:{
    fontSize: wp(3.9),
    fontWeight:"normal",
    color:COLORS.BLACK,
    marginTop:spacing.xs
  }
});
