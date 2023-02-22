import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  FlatList,
  Platform,
  Image,
  ToastAndroid,
  Alert,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { addOrder, getShippingCharges } from "@/actions/home/HomeAction";
import { addUserCard, getAllCards } from "@/actions/auth/UserActions";
import { typography, spacing } from "@/theme";
import { CustomHeader, Loader, Button } from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/CheckOut/PaymentOption/PaymentOption.styles";
import { COLORS, NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import { npMove, mpaisa, ipay } from "@/assets";

export const PaymentMethod = ({ route, navigation }) => {
  const { shippingAddress, billingAddress, cardDetails, status, isFresh } =
    route.params;
  const dispatch = useDispatch();
  const city = shippingAddress.city;
  const isLoading = useSelector((state) => state.common.isLoading);
  const [paymentMode, setPaymentMode] = useState("");
  const [showBackground1, setShowBackground1] = useState(false);
  const [showBackground2, setShowBackground2] = useState(false);

  const checkMpaisa = () => {
    setShowBackground1(true);
    setShowBackground2(false);
    setPaymentMode("mPesa");
    console.log(paymentMode);
  };
  const checkIpay = () => {
    setShowBackground2(true);
    setShowBackground1(false);
    setPaymentMode("iPay");
    console.log(paymentMode);
  };
  const addPayment = () => {
    if (paymentMode == "") {
      alert("Please select a Payment Mode");
    } else {
      let params = {
        device: Platform.OS,
        paymentMethod: paymentMode,
      };
      dispatch(
        addUserCard(navigation, params, (res) => {
          console.log("add payment mode card", res);
        })
      );
      let deliveryCharges = {
        city: city,
      };
      dispatch(
        getShippingCharges(navigation, deliveryCharges, (res) => {
          let param = {
            status: status,
            isFresh: isFresh,
            shippingPrice: res.charges,
          };
          dispatch(
            addOrder(navigation, param, (res) => {
              navigation.push(NAVIGATION.reviewOrder, {
                status: status,
                isFresh: isFresh,
                shippingAddress: shippingAddress,
                billingAddress: billingAddress,
                paymentMode: paymentMode,
                //  orderId:res.data._id
              });
            })
          );
        })
      );
    }
  };

  const addCard = () => {
    let params = {
      cardNumber: "",
      cardType: "",
      cvv: "",
      device: Platform.OS,
      expiryDate: "",
      nameOnCard: "",
      paymentMethod: paymentMode,
    };
    dispatch(
      addUserCard(navigation, params, (res) => {
        console.log("add payment mode card", res);
      })
    );
  };

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <CustomHeader
        title={strings.cart.paymentOption}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />

      <View
        style={{
          flex: 1,
          margin: wp(8),
        }}
      >
        <TouchableOpacity
          onPress={checkMpaisa}
          style={{
            flexDirection: "row",
            paddingHorizontal: wp(4),
            height: hp(6),
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: COLORS.WHITE,
            borderColor: showBackground1 ? COLORS.GREEN_BTN : COLORS.WHITE,
            borderWidth: showBackground1 ? 1 : 0,
            marginVertical: hp(1),
            borderRadius: 10,
          }}
        >
          <View style={{ flex: 0.2 }}>
            <Image source={mpaisa} style={{ width: 50, height: 20 }} />
          </View>

          <View style={{ flex: 0.8 }}>
            <Text style={typography.labelBold}>Mpesa</Text>
          </View>
          <View style={{ flex: 0 }}>
            <Image source={npMove} style={{ width: 8, height: 13 }} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={checkIpay}
          style={{
            backgroundColor: COLORS.WHITE,
            borderColor: showBackground2 ? COLORS.GREEN_BTN : COLORS.WHITE,
            borderWidth: showBackground2 ? 1 : 0,
            marginVertical: hp(1.2),
            borderRadius: 10,
            height: hp(6),
            flexDirection: "row",
            paddingHorizontal: wp(4),
            height: hp(6),
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 0.2 }}>
            <Image source={ipay} style={{ width: 50, height: 20 }} />
          </View>

          <View style={{ flex: 0.8 }}>
            <Text style={typography.labelBold}>iPay</Text>
          </View>
          <View style={{ flex: 0 }}>
            <Image source={npMove} style={{ width: 8, height: 13 }} />
          </View>
        </TouchableOpacity>
        {/*
         <Button style={{ backgroundColor: COLORS.YELLOW,marginTop:hp(1),width:wp(35)  }}
          handlePress={() => { addCard() }} title={"ADD CARD"} />
         */}

        <Button
          style={{
            backgroundColor: COLORS.GREEN_BTN,
            position: "relative",
            top: 330,
          }}
          handlePress={() => {
            addPayment();
          }}
          title={"CONTINUE"}
        />
      </View>
    </View>
  );
};
