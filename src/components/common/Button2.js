//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { edit } from "@/assets";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";

export const Button2 = (props) => {
  let { title, para, style, handlePress, textStyle } = props;
  return (
    <View style={[styles.button, style]}>
      <View style={{ flex: 0.99 }}>
        <Text style={[typography.sTextBold, textStyle]}>{title}</Text>
        <Text numberOfLines={2} style={typography.sText}>
          {para}
        </Text>
      </View>
        <TouchableOpacity
          style={{ width: wp(10), height: hp(4.5) }}
          onPress={() => {handlePress()}}
        >
          <Image source={edit} style={{width:14,height:14,alignSelf:"flex-end"}} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    borderRadius: 10,
    padding: spacing.xs,
    marginVertical: spacing.xs,
    height: hp(7.2),
    backgroundColor: COLORS.WHITE,
  },
});
