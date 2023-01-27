import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { spacing, typography } from "@/theme";
import { strings } from "@/localization";
import { heightToDP as hp, widthToDP as wp } from "../../utils/Responsive";
import { COLORS } from "@/constants";
import { Button } from "@/components";
import { jikapu, ic1, ic, bag, searchIcon1 } from "@/assets";

const data = [
  {
    id: 1,
    des: "Check order status and track, change or return items",
    img: ic,
  },
  {
    id: 2,
    des: "Create lists with items you want, now or later",
    img: ic1,
  },
  {
    id: 3,
    des: "Shop past purchases and everything essentials",
    img: bag,
  },
];

export const GuestScreen = (props) => {
  let { title, style, handleLogin, handleSignUp, textStyle } = props;
  return (
    <View>
      {/*
      
      <View style={styles.headerTop} />
      <View style={styles.headerBottom}>
        <View style={styles.imgView}>
          <Image source={jikapu} />
        </View>
      </View>*/}
      

      <View
        style={{
          alignItems: "center",
          paddingHorizontal: wp(4),
          backgroundColor: COLORS.APP,
        }}
      >
        <Text
          style={{
            fontSize: wp(7),
            marginTop: hp(4),
            alignSelf: "center",
            fontWeight: "bold",
          }}
        >
          Sign in for the
        </Text>
        <Text
          style={{ fontSize: wp(7), alignSelf: "center", fontWeight: "bold" }}
        >
          best experience
        </Text>
        <View>
          <Button  
            handlePress={handleLogin}
            style={[
              styles.submitButton,
              { marginTop: hp(3), width: wp(80), height: hp(6) },
            ]}
            title={"Sign In"}
          />
        </View>
        <View>
          <Button
            handlePress={handleSignUp}
            title={"Create Account"}
            style={[
              styles.submitButton,
              {
                width: wp(80),
                height: hp(6),
                backgroundColor: COLORS.WHITE,
                borderWidth: 1,
                borderColor: COLORS.GREEN_BTN,
              },
            ]}
            textStyle={{ color: COLORS.GREEN_BTN }}
          />
        </View>

        <View fdx
          style={{
           height:hp(30),
            backgroundColor: COLORS.WHITE,
            marginTop: hp(3),
            borderRadius:spacing.xs,
            padding:wp(3)
          }}
        >
          {data.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                flexDirection: "column",
                paddingHorizontal:wp(3)
              }}
              data={data}
              extraData={data}
              keyExtractor={(item, index) => index.toString()}
              vertical
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: hp(1),
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "20%" }}>
                    <Image source={item.img} />
                  </View>

                  <View style={{ width: "70%" }}>
                    <Text style={{ fontSize: wp(3.7) }}>{item.des}</Text>
                  </View>
                </View>
              )}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: spacing.m,
    backgroundColor: COLORS.PRIMARY,
  },
  container: {
    flex: 1,
  },
  headerTop: {
    height: hp(6.5),
    width: "100%",
    backgroundColor: COLORS.PRIMARY,
  },
  headerBottom: {
    flexDirection: "row",
    height: hp(6.5),
    alignItems: "center",
    paddingVertical: hp(4),
    paddingHorizontal: hp(2),
    backgroundColor: COLORS.WHITE,
  },

  imgView: {
    flex: 0.3,
  },
});
