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
import { npNext } from "@/assets";
import FastImage from "react-native-fast-image";
export const ListView4 = (props) => {
  let { imgSrc, catText, onClick, btnStyles } = props;
  return (
    <View style={[styles.btnstyle, btnStyles]}>
      <TouchableOpacity
        onPress={onClick}
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flex: 0.25, alignItems: "flex-start" }}>
          <FastImage
            style={{ width: 60, height: 60, borderRadius: 60 }}
            source={imgSrc}
            PlaceholderContent={
              <ActivityIndicator size="small" color="0000ff" />
            }
          />
        </View>
        <View style={{ flex: 0.75, alignItems: "flex-start" }}>
          <Text style={styles.textStyle}>{catText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    paddingVertical: hp(0.7),
    paddingHorizontal: wp(2),
  },
  textStyle: {
    fontSize: wp(3.9),
    fontFamily: "ProductSans-Regular",
    color: COLORS.BLACK,
    //   marginTop:spacing.xs
  },
});
