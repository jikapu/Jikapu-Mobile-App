import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {  npRight, } from "@/assets";
import {
  RadioButton,
  Button,
  CustomHeader,

} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Subscriptions/Subscriptions.styles.js";
import { shadow, spacing, typography } from "@/theme";
import { COLORS, NAVIGATION } from "@/constants";
import { useSelector, useDispatch } from "react-redux";

export const Support = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.support}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
      />
      <View style={{ padding: wp(4) }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor:COLORS.WHITE,
            borderRadius:10,
            padding:wp(3)
          }}
        >
          <View style={{ flexDirection: "column", flex: 0.95 }}>
            <Text style={typography.labelBold}>My product is broken I need refund</Text>
            <Text style={[typography.pText,{marginTop:hp(0.5)}]}>Oct 12, 2022 Website Problem</Text>
            <View style={{flexDirection:"row",marginVertical:hp(1)}}> 
              <TouchableOpacity
                style={{
                  width: wp(20),
                  height: hp(5),
                  backgroundColor: "#F8E9EB",
                  borderRadius:10,
                  alignItems:"center",
                  justifyContent:"center"
                }}
              >
                <Text style={{ color: "#C05C6C" }}>Urgent</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: wp(20),
                  height: hp(5),
                  marginLeft:wp(5),
                  backgroundColor: "#EBF8ED",
                  borderRadius:10,
                  alignItems:"center",
                  justifyContent:"center"
                }}
              >
                <Text style={{ color: "#99D76B" }}>Open</Text>
              </TouchableOpacity>
           
            </View>
           
          </View>

          <View style={{ flex: 0.05,alignSelf:"center" }}>
          <Image
            source={npRight}
            style={{ width: 11, height: 19, }}
          />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
