import { StyleSheet, Dimensions } from 'react-native';
import { spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../../utils/Responsive';
import {COLORS} from '@/constants'
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryView:{
   
    backgroundColor:COLORS.WHITE,
    marginVertical:hp(2)
  },
  
  
  categoryText:{
   // fontSize: wp(5.5),
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
  lineText:{
    fontSize: wp(3.5),
    fontWeight:"400",
    color:COLORS.GREEN_BTN
  },
  hrLine:{
    height:1,
    backgroundColor:COLORS.BORDER,
    width:wp(30)
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
   
  },
  modalView: {
    height:"95.8%",
    width:"94%",
    margin: wp(4),
    backgroundColor: "white",
    borderRadius: spacing.s,
    padding: wp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
 
});
