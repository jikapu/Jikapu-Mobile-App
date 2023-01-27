import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
} from "react-native";
import {
  icon01,
  icon02,
  eyeOpen,
  eyeClose,
  editCalendar,
  regDate,
  npDown,
  icon03,
  downArrow,
  icon04,
  npUp,
} from "@/assets";

//import downArrow from '../assets/images/subscription/dropdown.png';
import { COLORS } from "../../constants/colors";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { spacing } from "@/theme";
import { typography } from "@/theme";
import { Input } from "react-native-elements";

export const InputField = (props) => {
  let {
    label,
    error,
    value,
    setCode,
    placeholder,
    containerStyle,
    inputStyle,
    maxLength,
    iconStyle,
    type,
    isDropdown,
    labelStyle = {},
    rightIcon,
    editable = true,
    secureTextEntry = false,
  } = props;
  return (
    <View style={containerStyle}>
      {/* 
       <Text style={[typography.label,labelStyle] }>
        {label}
      </Text>
      */}
      {isDropdown ? (
        <Pressable
          style={[styles.inputContainer]}
          onPress={() => props.btnPress()}
        >
          <Input
            editable={false}
            style={typography.inputText}
            inputContainerStyle={{
              borderBottomWidth: 0,
              alignItems: "center",
            }}
            inputStyle={{ marginTop: Platform.OS === "ios" ? hp(3) : hp(3.4) }}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={COLORS.PLACEHOLDER}
            maxLength={maxLength}
            underlineColorAndroid={"transparent"}
            onChangeText={(text) => setCode(text)}
            autoCapitalize="none"
            rightIconContainerStyle={{ marginTop: hp(3) }}
            rightIcon={
              <Image
                resizeMode={"contain"}
                style={[styles.iconstyle, iconStyle]}
                source={
                  type == "editCalendar"
                    ? editCalendar
                    : type == "dropdown"
                    ? downArrow
                    : type == "dropdownNp"
                    ? npDown
                    : type == "calender"
                    ? regDate
                    : ""
                }
              />
            }
          />
        </Pressable>
      ) : (
        <View style={[styles.inputContainer]}>
          <Input
            secureTextEntry={secureTextEntry}
            inputContainerStyle={{
              borderBottomWidth: 0,
            }}
            editable={editable}
            style={typography.inputText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={COLORS.PLACEHOLDER}
            maxLength={maxLength}
            underlineColorAndroid={"transparent"}
            onChangeText={(text) => setCode(text)}
            autoCapitalize="none"
            inputStyle={{
              marginTop: Platform.OS === "ios" ? hp(3) : hp(3.4),
              padding: 0,
            }}
            rightIcon={rightIcon}
            rightIconContainerStyle={styles.logo}
            /*
            rightIcon={<Image
              resizeMode={"contain"}
              style={styles.logo}
              source={
                type == "user"
                  ? icon03
                  : type == "email"
                  ? icon01
                  : type == "phone"
                  ? icon04 
                  : type == "password"
                  ? icon02 
                  : ""
              }
            />}
            
        */
          />
        </View>
      )}

      <Text style={typography.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: spacing.xs,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BORDER,
    height: hp(6),
    marginTop: hp(1),
  },
  logo: {
    width: 32,
    height: 25,
    marginTop: hp(3.6),
    marginRight: -wp(3),
  },
  dropDownContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: spacing.s,
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BORDER,
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowRadius: spacing.xs,
    flex: 1,
    width: "200%",
  },
  iconstyle: {
    width: 14,
    height: 14,
  },
});
