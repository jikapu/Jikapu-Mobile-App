//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { CommonActions } from "@react-navigation/native";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { addOrderComplete } from "@/actions/home/HomeAction";
import { useSelector, useDispatch } from "react-redux";
import { stock } from "@/assets";
import { NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { COLORS } from "@/constants";
import { spacing, typography } from "@/theme";
import {
  Button1,
  Button,
  CustomHeader,
  InputField,
  GuestScreen,
} from "@/components";
import moment from "moment";
export const ThankYou = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    statusCount,
    isFreshCount,
    paymentMode,
    txncd,
    deliveryDate,
    deliveryStartTime,
    deliveryEndTime,
  } = route.params;
  console.log("status count,. if resh", statusCount, isFreshCount);
  const [orderNo, setOrderNo] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    let data = {
      codVerified: "true",
      codVerifyCode: "ACBDE",
      isFresh: isFreshCount,
      paymentMethod: paymentMode,
      paymentStatus: "completed",
      transactionId: "61f3fd8a08b4393dc47b1843",
      // couponCodeId: "620e13cd0135043964fc9103",
      status: statusCount,
      deliveryDate: deliveryDate,
      deliveryStartTime: deliveryStartTime,
      deliveryEndTime: deliveryEndTime,
      txncd: txncd,
      // paymentCardId: "61f3fd8a08b4393dc47b1843",
    };
    dispatch(
      addOrderComplete(navigation, data, (res) => {
        console.log("add order complete res", res);
        setOrderNo(res?.data?.orderNumber);
        setFirstName(res.data?.customerId?.firstName);
        setLastName(res.data?.customerId?.lastName);
      })
    );
  }, []);

  const handleShopping = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: NAVIGATION.home }],
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: wp(4) }}>
        <Image
          source={stock}
          style={{
            width: 200,
            height: 200,
            alignSelf: "center",
            borderRadius: 200,
            marginTop: hp(10),
          }}
        />

        <Text
          style={[
            typography.title,
            {
              color: COLORS.PRIMARY,
              fontSize: wp(5.4),
              marginVertical: hp(1.5),
            },
          ]}
        >
          Thank you! your order has been placed.
        </Text>
        <Text style={typography.label}>
          Hello ! <Text style={typography.labelBold}>{firstName}</Text>
        </Text>
        <Text style={[typography.label, { marginVertical: hp(0.5) }]}>
          Thank you for shopping with us.{" "}
          <Text style={typography.labelBold}>
            Your Order ID is :
            <Text style={typography.labelBold}> {orderNo}</Text>
          </Text>{" "}
          We’ve sent you an email confirmation.
        </Text>
        <Text style={[typography.label, { marginVertical: hp(0.5) }]}>
          1 item will be delivered to{" "}
          <Text style={[typography.labelBold, { color: COLORS.PRIMARY }]}>
            {firstName} {lastName}
          </Text>{" "}
          From Jikapu.
        </Text>
        <Text style={typography.label}>
          Estimated delivery date:{" "}
          <Text style={typography.labelBold}>
            {moment(new Date()).format("dddd, MMM D ")} -{" "}
            {moment(new Date()).add(3, "days").format("dddd, MMM D ")}
          </Text>
        </Text>
        <Button
          style={{
            width: wp(40),
            height: hp(4.7),
            marginTop: hp(2.5),
            backgroundColor: COLORS.GREEN_BTN,
          }}
          title={"CONTINUE SHOPPING"}
          textStyle={{ fontSize: wp(3.2) }}
          handlePress={() => handleShopping()}
        />
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  section: {
    flex: 1,
    backgroundColor: COLORS.BG_SKYBLUE,
    margin: wp(4),
    borderRadius: spacing.xs,
  },
});
