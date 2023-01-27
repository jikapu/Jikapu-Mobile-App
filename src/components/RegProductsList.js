//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Button, DropdownPicker } from "@/components";
import { Rating, AirbnbRating } from "react-native-ratings";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { Input, Image } from "react-native-elements";
import { minus, plus } from "@/assets";
import { Quantity } from "./common/Quantity";
export const RegProductsList = (props) => {
  let {
    title,
    imgSrc,
    storeName,
    isRating = false,
    quantity,
    btnStyles,
    price,
    starCount,
    onClickProduct,
    addRegProduct,
    onChangeValue,
    isAddToCart = false,
    isStoreName = false,
    productColors = [],
    onIncreaseValue,
    onDecreaseValue,
  } = props;
  return (
    <View>
      <TouchableOpacity style={styles.btnstyle} onPress={onClickProduct}>
        <View
          style={{
            flex: 0.45,
            backgroundColor: COLORS.WHITE,
          }}
        >
          <Image
            source={imgSrc}
            resizeMode="contain"
            style={{ width: wp(30), height: hp(13) }}
            PlaceholderContent={
              <ActivityIndicator size="large" color="0000ff" />
            }
          />
        </View>
        <View style={{ flex: 0.55 }}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={{ marginTop: -hp(3.5) }}>
            <AirbnbRating
              count={5}
              reviews={""}
              defaultRating={starCount}
              isDisabled={true}
              size={12}
              starContainerStyle={{
                alignSelf: "flex-start",
              }}
              ratingContainerStyle={{
                marginLeft: -wp(1),
              }}
            />
          </View>
          <Text style={styles.storeText}>By: {storeName}</Text>
          <Text style={styles.priceText}>
            {"KES" + " " + price.toLocaleString()}
          </Text>
          {/*
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: hp(1),
            }}
          >
            <Text style={{ fontSize: wp(3.7), color: COLORS.ARROW }}>
             
            </Text>
          
            <DropdownPicker onChangeValue={onChangeValue} />
             </View>
            */}

          <Quantity />

          <TouchableHighlight
            onPress={addRegProduct}
            style={{
              flex: 1,
              height: hp(4),
              borderRadius: 5,
              backgroundColor: COLORS.PRIMARY,
              alignItems: "center",
              justifyContent: "center",
              marginTop: hp(0.5),
            }}
          >
            <Text style={styles.cartText}>Add to Registry</Text>
          </TouchableHighlight>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    //  flex: 1,
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
