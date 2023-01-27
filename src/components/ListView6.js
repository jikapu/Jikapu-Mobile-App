//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { Input, Image } from "react-native-elements";
import { Rating, AirbnbRating } from "react-native-ratings";
import FastImage from 'react-native-fast-image';

export const ListView6 = (props) => {
  let {
    title,
    imgSrc,
    storeName,
    btnStyles,
    price,
    starCount,
    itemColor = "",
    productColors = [],
    onClickProduct,
    onClickCart,
    isAddToCart = false,
  } = props;

  return (
    <>
      <TouchableOpacity
        style={[styles.btnstyle, btnStyles]}
        onPress={onClickProduct}
      >
        <View
          style={{
            flex: 0.45,
            backgroundColor: COLORS.WHITE,
          }}
        >
          <FastImage
            style={{ width: wp(30), height: hp(13) }}
            source={imgSrc}
            resizeMode={FastImage.resizeMode.contain}
            PlaceholderContent={
              <ActivityIndicator size="large" color="0000ff" />
            }
          />

        </View>
        <View style={{ flex: 0.55 }}>
          <Text style={styles.title} numberOfLines={3}>{title}</Text>
          <View style={{ marginTop: -hp(3.5) }}>
            <AirbnbRating
              count={5}
              reviews={""}
              defaultRating={starCount}
              isDisabled={true}
              size={12}
              starContainerStyle={{ alignSelf: "flex-start" }}
              ratingContainerStyle={{ marginLeft: -wp(1) }}
            />
          </View>
          <Text style={styles.storeText}>By: {storeName}</Text>
          <Text style={styles.priceText}>{"KES" + price.toLocaleString()}</Text>
          <View style={{ flexDirection: "row",marginTop:hp(0.3) }}>
             {productColors?.length > 0 ? (
              productColors?.map((i) => {
                return (
                  <View
                    style={{
                      width: 14,
                      height: 14,
                      marginRight:5,
                      borderRadius: 100,
                      backgroundColor: i,
                      marginTop: hp(0.5),
                    }}
                  />
                );
              })
            ):null}
          </View>
        </View>
        {/*
         {isAddToCart == true ? (
          <TouchableHighlight 
          onPress={onClickCart}
          style={{
            flex: 1,
            height: hp(5),
            borderRadius:5,
            backgroundColor: COLORS.PRIMARY,
            alignItems: 'center',
            justifyContent: 'center',
          }}
    
        >
          <Text style={styles.cartText}>Add to cart</Text>
        </TouchableHighlight>
        ):null }
        */}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
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
    fontFamily:"ProductSans-Bold",
    color: COLORS.BLACK,
   
  },
  storeText: {
    fontSize: wp(3.1),
    fontFamily:"ProductSans-Regular",
    color: COLORS.PLACEHOLDER,
    marginTop: hp(0.2),
  },
  priceText: {
    fontSize: wp(3.9),
    color: COLORS.GREEN_BTN,
    marginTop: hp(0.4),
    fontFamily:"ProductSans-Regular"
  },
  cartText: {
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Bold",
    color: COLORS.WHITE,
  },
});
