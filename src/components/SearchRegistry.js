//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { searchIcon } from "@/assets";
import { Input } from "react-native-elements";
import LinearGradient from "react-native-linear-gradient";

export const SearchRegistry = (props) => {
  let {
    placeholderText,
    value,
    style,
    errorMessage,
    editable,
    setCode,
    handlePress,
    textStyle,
  } = props;
  return (
    <>
      <Input
        value={value}
        editable={editable}
        containerStyle={styles.container}
        errorStyle={{ color: "red" }}
        underlineColorAndroid={"transparent"}
        errorMessage={errorMessage}
        inputContainerStyle={{
          borderColor: "transparent",
          alignItems: "center",
          height:hp(6)
        }}
        placeholder="Search"
        rightIcon={
          <View>
            <LinearGradient
              colors={["#0F96A0", "#4C398E"]}
              style={styles.button}
            >
              <TouchableOpacity onPress={handlePress}>
                <Image source={searchIcon} style={styles.search} />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        }
        rightIconContainerStyle={{
          marginRight: -15,
          // marginTop:-1,
        }}
        onChangeText={(text) => setCode(text)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: wp(12),
    height: hp(6),
   // marginTop: -hp(2),
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLORS.WHITE,
  },
  search: {
    width: 20,
    height: 20,
  },
  container: {
    height: hp(6),
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: spacing.xs,
  },
});
