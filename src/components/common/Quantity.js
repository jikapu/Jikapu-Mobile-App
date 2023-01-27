import React,{useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";
import { searchIcon1,minus,plus } from "@/assets";
import { Input } from "react-native-elements";

export const Quantity = (props) => {
  let {
    placeholderText,
    value,
    style,
    errorMessage,
    totalQ,
    editable,
    setCode,
    handlePress,
    textStyle,
  } = props;
  const [quantity, setQuantity] = useState(1)
  const onIncreaseValue = () => {
    if (quantity >= 5) {
      return quantity;
    } else {
      setQuantity(quantity + 1);
    }
  };

  const onDecreaseValue = () => {
    if (quantity <= 1) {
      return quantity;
    } else {
      setQuantity(quantity - 1);
    }
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: hp(1),
      }}
    >
      <Text style={{ fontSize: wp(3.7), color: COLORS.ARROW }}>Quantity</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginLeft: wp(5),
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            onDecreaseValue();
          }}
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            paddingTop: 5.5,
            backgroundColor: COLORS.BG_LIGHT,
          }}
        >
          <Image source={minus} style={{ width: 12, height: 9 }} />
        </TouchableOpacity>
        <Text style={{ paddingHorizontal: wp(2) }}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            onIncreaseValue();
          }}
          style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.BG_LIGHT,
          }}
        >
          <Image source={plus} style={{ width: 12, height: 12 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  search: {
    width: 20,
    height: 20,
  },
  container: {
    height: hp(5),
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: spacing.xs,
  },
});
