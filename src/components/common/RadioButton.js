import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";
import { checkCircle, uncheckCircle } from "@/assets";
import { COLORS } from "../../constants/colors";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { spacing } from "@/theme";
import { typography } from "@/theme";

export const RadioButton = (props) => {
  const { selectedOption, outerStyle, innerStyle, label, onPress, item } =
    props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(label)}>
        <View style={[styles.outerStyle, outerStyle]}>
          <Image
            resizeMode={"contain"}
            style={styles.checkBtn}
            source={selectedOption ? checkCircle : uncheckCircle}
          />
           <Text style={styles.radioText}>{label}</Text>
        </View>
       
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  outerStyle: {
    flexDirection: "row",
   // justifyContent: "space-between",
  },
  radioText: {
      marginLeft:wp(3),
    fontSize: wp(3.5),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
    paddingBottom: 5,
    textTransform: "capitalize",
    lineHeight: 21,
  },
  checkBtn: {
    height: 20,
    width: 20,
  },
});
