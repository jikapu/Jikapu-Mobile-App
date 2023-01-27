import { StyleSheet } from "react-native";
import {
  heightToDP as hp,
  widthToDP as wp,
} from "@/utils";
import { spacing } from "@/theme";
import { COLORS } from "@/constants";
export const styles = StyleSheet.create({
  btnstyle: {
    borderRadius: spacing.xs,
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    height: hp(10),
    alignItems:"center" 
  },
  textStyle: {
    fontSize: wp(3.3),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
  },
});
