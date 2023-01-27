//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../utils/Responsive';
import { COLORS } from '@/constants';
import { Input, Image } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

export const ListView5 = (props) => {
  let {
    title,
    imgSrc,
    storeName,
    btnStyles,
    price,
    onClickProduct,
    onClickCart,
    isAddToCart = false,
  } = props;
  return (
    <>
      <TouchableOpacity style={[styles.btnstyle, btnStyles]} onPress={onClickProduct}>
        <View
          style={{
            flex: 1,
            marginTop: hp(1.5),
            flexDirection: 'row',
            backgroundColor: COLORS.WHITE,
          }}
        >
          <View style={{ flex: 0.3,}}>
            {/*
             <Image
              source={imgSrc}
              resizeMode={'contain'}
              style={{ flex:1,justifyContent:"center",height:hp(8) }}
              PlaceholderContent={<ActivityIndicator size="large" color="0000ff" />}
            />
            */}
           <FastImage
             style={{ flex:1,justifyContent:"center",height:hp(8) }}
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
              flex: 0.8,
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.storeText}>By: Store Name</Text>
            <Text style={styles.priceText}>{`${"KES"+ " "+ price.toLocaleString()}`}</Text>
          </View>
        </View>
        <View style={{ flex: 1, height: 1,marginVertical:hp(1.2), backgroundColor: COLORS.BORDER }} />
        <View style={{ flex: 1, flexDirection: 'row',alignItems:"center" }}>
            <View style={{flex:0.4 ,flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{ backgroundColor: '#F08686', width: 16, height: 16, borderRadius: 100 }} />
          <View style={{ backgroundColor: '#000000', width: 16, height: 16, borderRadius: 100 }} />
          <View style={{ backgroundColor: '#F086', width: 16, height: 16, borderRadius: 100 }} />
          <View style={{ backgroundColor: '#F082', width: 16, height: 16, borderRadius: 100 }} />
            </View>
           
           <View style={{flex:0.6,marginLeft:wp(10)}}>
           {isAddToCart == true ? (
            <TouchableHighlight
              onPress={onClickCart}
              style={{
                flex: 1,
                height: hp(4),
                borderRadius:5,
                backgroundColor: COLORS.PRIMARY,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={styles.cartText}>ADD TO CART</Text>
            </TouchableHighlight>
          ) : null}
           </View>
          
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  btnstyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: COLORS.WHITE,
    width: wp(44.7),
    borderRadius: spacing.xs,
    marginTop: hp(1),
  },
  title: {
    fontSize: wp(4.3),
    fontFamily:"ProductSans-Bold",
    color: COLORS.BLACK,
    marginTop: spacing.xs,
  },
  storeText: {
    fontSize: wp(3.1),
    fontFamily:"ProductSans-Regular",
    color: COLORS.PLACEHOLDER,
  },
  priceText: {
    fontSize: wp(3.9),
    fontFamily:"ProductSans-Regular",
    color: COLORS.GREEN_BTN,
  },
  cartText: {
    fontSize: wp(3.5),
    fontFamily:"ProductSans-Bold",
    color: COLORS.WHITE,
  },
});
