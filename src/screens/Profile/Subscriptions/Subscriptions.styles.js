import { StyleSheet } from "react-native";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { spacing, typography } from "@/theme";
import { COLORS } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    paddingVertical: wp(8),
    paddingHorizontal: wp(5),
  },
  tabView: {
    flexDirection: "row",
    height: hp(6),
    backgroundColor: "white",
    borderRadius: 10,
  },
  btnStyle: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  btnStyle1: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  hrLine: {
    height: 0.5,
    backgroundColor: COLORS.BORDER,
    width: "100%",
  },
  btnstyles: {
    flex: 1,
    flexDirection:"row",
    borderRadius: spacing.xs,
    backgroundColor: COLORS.WHITE,
   
    paddingVertical: wp(4),
    marginBottom:hp(1.5)
  },
  textStyle: {
    fontSize: wp(3.7),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
    marginTop: wp(0.5),
  },
  weight: {
    fontSize: wp(3.3),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
    marginVertical: hp(1),
  },
  avaibality: {
    color: "#20C700",
    fontSize: wp(3),
    fontWeight: "normal",
    marginTop: wp(0.5),
  },

  price: {
    fontSize: wp(3.9),
    color: "#0F96A0",
    marginTop: wp(0.5),
    fontFamily:"ProductSans-Bold"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: wp(4),
    backgroundColor: "white",
    borderRadius: spacing.s,
    padding: wp(8),
    //  alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView1: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(10),
  },
  modalView1: {
    height: "95.8%",
    width: "94%",
    margin: wp(4),
    backgroundColor: "white",
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
  btnStyle2: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.WHITE,
    borderRadius: spacing.xs,
    marginVertical: hp(0.8),
    shadowColor: "#00000014",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    elevation: 1,
    padding: spacing.xs,
  },
  title: {
    fontSize: wp(4.3),
    fontWeight: "normal",
    color: COLORS.BLACK,
  },
  storeText: {
    fontSize: wp(3.1),
    fontWeight: "normal",
    color: COLORS.PLACEHOLDER,
    marginTop: hp(0.2),
  },
  priceText: {
    fontSize: wp(3.9),
    fontWeight: "normal",
    color: COLORS.GREEN_BTN,
    marginTop: hp(0.4),
    fontWeight: "bold",
  },
  cartText: {
    fontSize: wp(3.9),
    fontWeight: "bold",
    color: COLORS.WHITE,
  },
});
