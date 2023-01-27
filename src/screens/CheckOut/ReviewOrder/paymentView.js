//import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { Text, Alert, View, StyleSheet, SafeAreaView } from "react-native";
import {
  Button1,
  Button,
  CustomHeader,
  InputField,
  GuestScreen,
} from "@/components";
import { useSelector, useDispatch } from "react-redux";
import { NAVIGATION } from "@/constants";
import { heightToDP as hp, widthToDP as wp } from "@/utils/";
import { COLORS } from "@/constants";
import { spacing, typography } from "@/theme";
import { WebView, WebViewNavigation } from "react-native-webview";

export const PaymentView = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { resUrl, statusNo, isFreshNo, paymentMode,deliveryDate,deliveryStartTime,deliveryEndTime } = route.params;
  console.log("status",'isFreshh',statusNo, isFreshNo,deliveryDate,deliveryStartTime,deliveryEndTime)
  const [loading, setLoading] = useState(true);
  const [iPayUrl, setIPayUrl] = useState(resUrl != undefined ? resUrl : "");

  const handleResponse = (webViewState) => {
    console.log("webviewstate", webViewState);
    const { url } = webViewState;
    if (!url) return;
    const urlArr = webViewState.url.split(/(=|&)/);
    console.log(urlArr, "urlArr");
    const orderId = urlArr[6];
    console.log("orderId", orderId, url);
    //Check payment Verification
    if (
      webViewState.url.includes(
        "https://payments.ipayafrica.com/payment-api-v4/checkout/undefined?status=aei7p7yrx4ae34"
      )
    ) {
      navigation.navigate(NAVIGATION.thankYou, {
        statusCount: statusNo,
        isFreshCount: isFreshNo,
        paymentMode: paymentMode,
        txncd: urlArr[4],
        deliveryDate:deliveryDate,
        deliveryStartTime:deliveryStartTime,
        deliveryEndTime:deliveryEndTime
        
      });
    } else if (webViewState.url.includes(
      "https://payments.ipayafrica.com/payment-api-v4/checkout/undefined??status=fe2707etr5s4wq"
    )) {
      Alert.alert("Order failed")
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* render webview for iPay  */}
      <CustomHeader
        isBackBtn={true}
        handlePress={() => navigation.pop()}
        handleSearch={() => navigation.navigate(NAVIGATION.search)}
      />
      {iPayUrl ? (
        <WebView
          source={{ uri: iPayUrl }}
          onNavigationStateChange={(data) => handleResponse(data)}
          style={styles.webView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={false}
          //onLoadStart={onWebviewLoadStart}
          onLoadEnd={() => setLoading(false)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
