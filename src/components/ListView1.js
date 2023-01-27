//import { useTheme } from '@react-navigation/native';

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { Input, Image } from "react-native-elements";
import { npRight } from "@/assets";

export const ListView1 = (props) => {
  let { imgSrc, title, onClick, orderStatus } = props;
  return (
    <>
      <TouchableOpacity style={styles.btnstyle} onPress={onClick}>
        <View style={{ flex:0.24,}}>
          <Image
            source={imgSrc}
            style={{ width: "100%", height: hp(8),}}
            resizeMode={"contain"}
            PlaceholderContent={
              <ActivityIndicator size="large" color="0000ff" />
            }
          />
        </View>
        <View style={{ flex: 0.62,}}>
          <Text style={styles.textStyle} numberOfLines={2}>{title}</Text>
          <Text style={styles.statusStyle}>{orderStatus}</Text>
        </View>

        <View style={{ flex: 0.1,}}>
          <Image
            source={npRight}
            style={{ width: 11, height: 19,marginLeft:wp(3)}}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(12),
    alignItems: "center",
    marginTop: hp(1.2),
    backgroundColor: COLORS.WHITE,
    borderRadius:spacing.xs
  },
  textStyle: {
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  statusStyle: {
    fontSize: wp(3.1),
    fontFamily:"ProductSans-Regular",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
});
