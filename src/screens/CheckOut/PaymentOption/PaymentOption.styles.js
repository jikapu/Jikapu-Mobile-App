import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { spacing } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { COLORS } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    width: wp(20),
    height: hp(10),
  },
  highlightBtn:{
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    width: wp(20),
    height: hp(10),
    borderWidth:2,
    borderColor:COLORS.GREEN_BTN
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
});
