import { StyleSheet } from "react-native";
import {
  heightToDP as hp,
  widthToDP as wp,
} from "../../../../utils/Responsive";
import { spacing } from "@/theme";
import { COLORS } from "@/constants";
export const styles = StyleSheet.create({
  btnstyle: {
    borderRadius: spacing.xs,
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    height: hp(13),
  },
  textStyle: {
    fontSize: wp(3.9),
    fontWeight: "normal",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  statusStyle: {
    fontSize: wp(3.1),
    fontWeight: "normal",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  orderView: {
    height:hp(13),
    padding: wp(4),
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    borderRadius:spacing.xs
  },
  shipmentDetails:{
  //  flex:1,
    backgroundColor: COLORS.WHITE,
    borderRadius:spacing.xs,
  },
  hrLine:{
    height:1,
    backgroundColor:COLORS.BORDER,
    width:"100%"
  },
  free:{
    fontSize: wp(3.3),
    fontWeight: "normal",
    color: COLORS.BLACK,
    margin: spacing.s,
  },
  list:{
    marginTop:hp(2),
    flexDirection:"row",
    justifyContent:"space-between",
    
   
  } 
});
