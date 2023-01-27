import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
import { spacing } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { COLORS } from "@/constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hrLine:{
    height:1,
    backgroundColor:COLORS.BORDER,
    width:wp(30)
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: { 
    margin: wp(3),
    backgroundColor: "white",
    borderRadius: spacing.s,
    padding: wp(4),
  //  alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
});
