//import { useTheme } from '@react-navigation/native';
import PropTypes from "prop-types";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  ActivityIndicator,
  TouchableHighlight,
  Image,
  TouchableOpacity,
} from "react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { spacing, typography } from "@/theme";
import { heightToDP as hp, widthToDP as wp } from "../utils/Responsive";
import { COLORS } from "@/constants";
import { Input,  } from "react-native-elements";
import { deleteImg } from "@/assets";
import FastImage from "react-native-fast-image";
export const ListView2 = (props) => {
  let {
    title,
    imgSrc,
    storeName,
    delItem,
    isDel = false,
    isBuy = false,
    isRating = false,
    btnStyles,
    price,
    shortDes,
    starCount,
    onClickProduct,
    onClickCart,
    onClickBuy,
    isAddToCart = false,
    isStoreName = false,
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
            paddingHorizontal: wp(4),
            marginBottom: hp(1),
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 0.9 }}>
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            {isRating == true ? (
              <View>
                <AirbnbRating
                  count={5}
                  reviews={""}
                  defaultRating={starCount}
                  isDisabled={true}
                  size={12}
                  starContainerStyle={{ alignSelf: "flex-start" }}
                  ratingContainerStyle={{
                    marginLeft: -wp(1),
                    marginTop: Platform.OS === 'ios' ? -hp(4) : -hp(6.8),
                   
                  }}
                />
              </View>
            ) : null}
            <Text style={styles.storeText}>{storeName}</Text>
            <Text style={styles.priceText}>{`${
              "KES" + " " + price?.toLocaleString()
            }`}</Text>
          </View>
          {isDel == true ? (
            <View style={{ flex: 0.15, alignSelf: "flex-end" }}>
              <TouchableOpacity onPress={delItem}>
                <Image source={deleteImg} style={{ width: 22, height: 22 }} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        {isAddToCart == true ? (
          <TouchableOpacity
            onPress={onClickCart}
            style={{
              height: hp(4.5),
              borderRadius: 5,
              marginVertical: hp(1),
              backgroundColor: COLORS.PRIMARY,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.cartText}>ADD TO CART</Text>
          </TouchableOpacity>
        ) : null}
        {isBuy == true ? (
          <TouchableOpacity
            onPress={onClickBuy}
            style={{
              height: hp(4.5),
              borderRadius: 5,
              backgroundColor: COLORS.GREEN_BTN,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={styles.cartText}>BUY NOW</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flexDirection: "column",
    backgroundColor: COLORS.WHITE,
    width: wp(44.7),
    borderRadius: spacing.xs,
    marginTop: hp(1),
    shadowColor: "#00000014",
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: wp(4.3),
    fontFamily: "ProductSans-Bold",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  storeText: {
    fontSize: wp(3.3),
    fontFamily: "ProductSans-Regular",
    color: COLORS.PLACEHOLDER,
    marginVertical:1.5
  },
  priceText: {
    fontSize: wp(3.9),
    fontFamily: "ProductSans-Bold",
    color: COLORS.GREEN_BTN,
  },
  cartText: {
    fontSize: wp(3.7),
    color: COLORS.WHITE,
    fontFamily: "ProductSans-Bold",
  },
});
