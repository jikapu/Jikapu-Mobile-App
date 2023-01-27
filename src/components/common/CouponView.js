//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { COLORS } from '@/constants';
import { searchIcon } from '@/assets';
import { Input,Image } from 'react-native-elements';

export const CouponView = (props) => {
  let {
    bgHeadingColor,
    name,
    code,
    expiry,
    amount,
    minimumOrder,
    product,
    status,
    handleCopy
  } = props;
  return (
    <View style={styles.coinStyle}>
    <View style={[styles.headingView,bgHeadingColor]}>
        <Text style={[typography.labelLargeBold, { color: COLORS.WHITE }]}>{name}</Text>
    </View>
    <View style={{ padding: wp(4), backgroundColor: COLORS.WHITE, justifyContent: "space-between", }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
            <Text style={typography.sText}>Discount :</Text>
            <Text style={typography.pTextBold} numberOfLines={1}>{amount}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: hp(1), justifyContent: "space-between", }}>
            <Text style={typography.sText}>Minimum Order :</Text>
            <Text style={typography.pTextBold}  numberOfLines={1}>{minimumOrder}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: hp(1), justifyContent: "space-between", }}>
            <Text style={typography.sText}>Status :</Text>
            <Text style={typography.pTextBold}  numberOfLines={1}>{status}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: hp(1), justifyContent: "space-between", }}>
            <Text style={typography.sText}>Products :</Text>
            <Text style={typography.pTextBold} numberOfLines={1}>{product}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: hp(1), justifyContent: "space-between", }}>
            <Text style={typography.sText}>Expiry :</Text>
            <Text style={typography.pTextBold}  numberOfLines={1}>{expiry}</Text>
        </View>
        <TouchableOpacity style={styles.btnStyle} onPress={() => handleCopy()}>
            <Text style={[typography.sText,{color:COLORS.WHITE}]}>Code :</Text>
            <Text  style={[typography.pTextBold,{color:COLORS.WHITE}]}  numberOfLines={1}>{code}</Text>
        </TouchableOpacity>
    </View>      
</View>
  );
};

const styles = StyleSheet.create({
    coinStyle: {
        width:wp(43.5),
        backgroundColor: COLORS.WHITE,
        borderWidth: 1,
        borderRadius:10,
        borderColor:"#70707033",
        marginTop: hp(3),
    },
    headingView:{
        alignItems: "center", justifyContent: "center", backgroundColor: COLORS.BLACK,  height: hp(5),borderTopRightRadius: 10, borderTopLeftRadius: 10,
    },
    btnStyle:{
        height:hp(5),borderRadius:5,padding:wp(2),marginTop:hp(1),
        backgroundColor:COLORS.GREEN_BTN,flexDirection:"row",alignItems:"center",justifyContent:"space-between"
    },
    
  
});
