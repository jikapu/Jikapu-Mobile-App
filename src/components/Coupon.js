import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants';
import { heightToDP as hp, widthToDP as wp } from '../utils/Responsive';
import { spacing } from '@/theme';

export const Coupon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text1} numberOfLines={2}>Free Shipping for orders of KES 3500 and Above T&C Apply</Text>
        
      </View>
      <View style={styles.view2}>
        <Text style={styles.text3}>USE COUPON CODE</Text>
        <Text style={styles.text4}>JIKANEW</Text>
        <Text style={styles.text5}>
        Jikapu is built on a trust-based relationship between our customers and vendors and ensure utmost online shopping convenience. Our vision is to be the world’s leading online market of choice by harnessing the power of technology to create in a sustainable way, convenient, and exceptional online shopping experience.
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex:1,
    marginVertical:hp(4),
    marginHorizontal: wp(4),
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius:8,
   
  },
  view1: {
    backgroundColor: COLORS.PRIMARY,
    width:"100%",
    height: hp(7),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopLeftRadius:spacing.xs,
    borderTopRightRadius:spacing.xs,
  },
  text1: {
    fontSize: wp(4.1),
    fontWeight: 'bold',
    color: COLORS.WHITE,
    width:wp(68)
  },
  text2: {
    fontSize: wp(8),
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  view2: {
    borderBottomLeftRadius:spacing.xs,
    borderBottomRightRadius:spacing.xs,
    backgroundColor: COLORS.YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:wp(3)
  },
  text3: {
    fontSize: wp(4),
    fontWeight: 'normal',
    color: COLORS.BLACK,
  },
  text4: {
    fontSize: wp(9),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  text5: {
   /// paddingVertical:hp(1),
    fontSize: wp(3.1),
    paddingHorizontal:wp(5),
    color: COLORS.BLACK,
  },
});
