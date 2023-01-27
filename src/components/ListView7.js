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
import { Rating, AirbnbRating } from "react-native-ratings";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { Input, Image } from "react-native-elements";
import { deleteImg } from "@/assets";
import FastImage from "react-native-fast-image";

export const ListView7 = (props) => {
  let {
    title,
    imgSrc,
    storeName,
    isRating = false,
    btnStyles,
    price,
    starCount,
    onClickProduct,
    onClickCart,
    isAddToCart = false,
    isStoreName = false,
    productColors = [],
  } = props;
  return (
    <>
      <TouchableOpacity
        style={[styles.btnstyle, btnStyles]}
        onPress={onClickProduct}
      >
        <View
          style={{
            marginVertical: hp(2),
            width: wp(35),
            flex: 1,
            alignSelf: "center",
            backgroundColor: COLORS.WHITE,
            paddingHorizontal: wp(2),
          }}
        >
          <FastImage
            style={{ width: "100%", height: hp(14) }}
            source={imgSrc}
            resizeMode={FastImage.resizeMode.contain}
            PlaceholderContent={
              <ActivityIndicator size="large" color="0000ff" />
            }
          />

        </View>
       
        <View
          style={{
            backgroundColor: COLORS.BG_ULTRA_LIGHT,
            paddingHorizontal: wp(1),
            marginBottom: hp(0.5),
            alignItems:"center"
          }}
        >
           <View
          style={{
            flexDirection: "row",
            marginTop: hp(0.3),
            alignSelf: "center",
          }}
        >
          {productColors?.length > 0
            ? productColors?.map((i) => {
                return (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      marginRight: 5,
                      borderRadius: 100,
                      backgroundColor: i,
                      marginTop: hp(0.5),
                    }}
                  />
                );
              })
            : null}
        </View>
          <View style={{ alignSelf:"center" }}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>

            {isRating == true ? (
              <View
                style={{ marginTop: Platform.OS === "ios" ? -hp(4) : -hp(6.8), alignSelf:"center" }}
              >
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
            ) : null}
            <Text style={styles.storeText}>{storeName}</Text>
            <Text style={styles.priceText}>{`${
              "KES" + " " + price?.toLocaleString()
            }`}</Text>
            
          </View>
          
          {isAddToCart == true ? (
              <View style={{flexDirection:"row"}}>
              <TouchableOpacity
                    onPress={onClickCart}
                    style={{
                       flex: 1,
                     // width:wp(35),
                      height: hp(4.5),
                      borderRadius: 5,
                      marginTop: hp(1),
                      marginBottom:hp(0.5),
                      backgroundColor: COLORS.PRIMARY,
                      alignSelf: "flex-start",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={styles.cartText}>ADD TO CART</Text>
                  </TouchableOpacity>
              </View>
            ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.WHITE,
    width: wp(42),
    borderRadius: spacing.xs,
    marginTop: hp(1),
    alignItems: "center",
    shadowColor: "#00000014",
    shadowOpacity: 1,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 10,
  },
  title: {
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Bold",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
    alignSelf: "center",
  },
  storeText: {
    fontSize: wp(3),
    fontFamily:"ProductSans-Regular",
    color: COLORS.PLACEHOLDER,
    marginVertical: hp(0.5),
    alignSelf: "center",
  },
  priceText: {
    fontSize: wp(3.7),
    fontFamily:"ProductSans-Regular",
    color: COLORS.GREEN_BTN,
    alignSelf: "center",
  },
  cartText: {
    fontSize: wp(3.7),
    fontFamily:"ProductSans-Bold",
    color: COLORS.WHITE,
  },
});
