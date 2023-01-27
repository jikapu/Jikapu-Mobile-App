import { StyleSheet, Dimensions } from "react-native";
import { spacing } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  back: {
    height: 40,
    width: 40,
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: spacing.s,
    marginTop: hp(5),
  },
  logo: {
    height: 68,
    width: 184,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: spacing.m,
    marginTop: spacing.m,
  },
  heading: {
    fontSize: wp(5.5),
    fontWeight: "700",
    color: COLORS.BLACK,
    marginTop: spacing.m,
    // fontFamily:strings.FONTS.BOLD
  },
  textStyle: {
    fontSize: wp(3.5),
    fontWeight: "400",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  hrLine: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    width: wp(30),
  },
  submitButton: {
    marginTop: spacing.m,
    backgroundColor: COLORS.GREEN_BTN,
  },
});
