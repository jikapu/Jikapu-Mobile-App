import { StyleSheet, Platform, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { spacing } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";

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
  see: {
    flexDirection: "row",
    marginTop: spacing.m,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryView: {
    marginTop: Platform.OS === "ios" ? hp(1) : hp(1.6),
    backgroundColor: COLORS.YELLOW_LIGHT,
    flex: 1,
    padding: wp(5),
    borderRadius: spacing.xs,
  },

  categoryText: {
    flex: 0.9,
    fontSize: wp(4.9),
    color: COLORS.BLACK,
    fontFamily: "ProductSans-Bold",
  },
  listView: {
    flex: 1,
    flexWrap: "wrap",
    alignItems: "center",
  },
  see: {
    flexDirection: "row",
    marginTop: spacing.m,
    alignItems: "center",
    justifyContent: "center",
  },
  btnstyle: {
    width: 103,
    alignItems: "center",
    marginTop: hp(1.2),
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#0F96A0",
  },
  img1: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  textStyle: {
    fontSize: wp(3.9),
    fontWeight: "normal",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  hrLine: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    flex: 1,
    marginTop: hp(1.5),
  },
  centeredView: {
    height: "84%",
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    height: "90%",
    backgroundColor: COLORS.WHITE,
    borderRadius: spacing.s,
    padding: wp(4),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: spacing.s,
    padding: spacing.xs,
    elevation: 2,
  },
  btnstyles: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.WHITE,
    width: wp(44.7),
    borderRadius: spacing.xs,
    marginTop: hp(1),
    shadowColor: "#00000014",
    shadowOpacity: 1,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 10,
  },
  title: {
    fontSize: wp(3.2),
    color: COLORS.BLACK,
    marginTop: spacing.xs,
    fontFamily: "ProductSans-Regular",
  },
  priceText: {
    fontSize: wp(3.2),
    color: COLORS.GREEN_BTN,
    fontFamily: "ProductSans-Bold",
    marginTop: hp(0.2),
  },
  cartText: {
    fontSize: wp(2.7),
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
  aboutText: {
    fontSize: wp(4.3),
    color: COLORS.BLACK,
    fontFamily: "ProductSans-Bold",
  },
  inlineText: {
    fontSize: wp(3.7),
    marginTop: hp(1),
    fontWeight: "normal",
    fontFamily: "ProductSans-Regular",
  },
  container1: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: "#DCDCDC",
  },
});
