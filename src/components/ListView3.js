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
import { npNext, deleteImg, heart, minus, plus } from "@/assets";
import FastImage from "react-native-fast-image";

export const ListView3 = (props) => {
  let {
    imgSrc,
    addWish,
    delItem,
    wishImg,
    title,
    pColor,
    pSize,
    availablity,
    price,
    quantity,
    salePrice,
    onClick,
    onDecreaseValue,
    onIncreaseValue,
  } = props;
  return (
    <>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.btnstyle}>
          <View style={{ flex: 0.4 }}>
            <View>
              <FastImage
                style={{ width: 120, height: 100 }}
                source={imgSrc}
                resizeMode={FastImage.resizeMode.contain}
                PlaceholderContent={
                  <ActivityIndicator size="large" color="0000ff" />
                }
              />
              <View style={{ marginTop: hp(2) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: wp(5),
                    // justifyContent: "space-between",
                    marginTop: hp(0.5),
                  }}
                >
                  <TouchableOpacity
                    onPress={onDecreaseValue}
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
                    onPress={onIncreaseValue}
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
            </View>
          </View>
          <View style={{ flex: 0.45 }}>
            <Text style={styles.textStyle} numberOfLines={2}>
              {title}
            </Text>
            <Text style={styles.avaibality}>
              {availablity > 0 ? "In stock" : "Out of stocks!"}{" "}
            </Text>
            {/* 
            <View style={{ flexDirection: "row",marginTop:hp(0.5) }}>
              <Text style={styles.price}>{`${"KES"+ " "+ price.toLocaleString()}`}</Text>
              <Text style={styles.saleprice}>{`${"KES"+ " "+ salePrice.toLocaleString()}`}</Text>
            </View>
            */}
            <View style={{ marginTop: hp(0.5) }}>
              {price === salePrice ? (
                <Text style={styles.saleprice}>
                  {`${"KES" + " " + salePrice.toLocaleString()}`}
                </Text>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.price}>
                    {`${"KES" + " " + price.toLocaleString()}`}
                  </Text>
                  <Text style={[styles.saleprice, { marginLeft: wp(1) }]}>
                    {`${"KES" + " " + salePrice.toLocaleString()}`}
                  </Text>
                </View>
              )}
            </View>
            {pColor ? (
              <Text
                style={[
                  typography.label,
                  {
                    marginVertical: hp(0.5),
                  },
                ]}
              >
                Color : {pColor}
              </Text>
            ) : null}

            {pSize ? (
              <Text style={typography.label}>Size : {pSize}</Text>
            ) : null}
          </View>

          <View
            style={{
              flex: 0.15,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <TouchableOpacity
              onPress={addWish}
              style={{ width: 30, height: 50, alignSelf: "flex-end" }}
            >
              <Image source={wishImg} style={{ width: 17, height: 16 }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={delItem}
              style={{
                width: 30,
                height: 50,
                paddingTop: 30,
                alignSelf: "flex-end",
              }}
            >
              <Image source={deleteImg} style={{ width: 18, height: 18 }} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flex: 1,
    flexDirection: "row",
    borderRadius: spacing.xs,
    marginTop: hp(1.2),
    backgroundColor: COLORS.WHITE,
    paddingLeft: wp(4),
    paddingRight: wp(2),
    paddingVertical: wp(4),
  },
  textStyle: {
    fontSize: wp(3.3),
    color: COLORS.BLACK,
    fontFamily: "ProductSans-Regular",
    marginTop: wp(0.5),
  },
  avaibality: {
    color: "#20C700",
    fontSize: wp(3),
    marginTop: hp(0.7),
    fontFamily: "ProductSans-Regular",
  },

  price: {
    fontSize: wp(3.5),
    color: "red",
    marginTop: hp(0.2),
    textDecorationLine: "line-through",
    fontFamily: "ProductSans-Regular",
  },
  saleprice: {
    fontSize: wp(3.5),
    color: COLORS.GREEN_BTN,
    fontFamily: "ProductSans-Regular",
  },
});
