import React, { useState } from "react";
import {
  View,
  Alert,
} from "react-native";
import { heightToDP as hp, widthToDP as wp } from "@/utils";
import {
  Loader,
  Button2,
  CustomHeader,
} from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Profile/Subscriptions/Subscriptions.styles.js";
import { COLORS, NAVIGATION } from "@/constants";
import { useSelector, useDispatch } from "react-redux";

const data = [
  {
    id: 1,
    name: "Password",
    text: "*******",
  },
  {
    id: 2,
    name: "Two-Step Verification (2SV) Settings:",
    text: "For extra security, require a one-time passwrod at sign-in",
  },
  {
    id: 3,
    name: "SecureYour Account",
    text: "If you think your Jikapu account has been compormised, follow these steps to make your account more secure.",
  },
];

export const LoginSecurity = ({ navigation }) => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const handleItem = (index, item) => {
    switch (item.id) {
      case 1:
        navigation.push(NAVIGATION.changePassword);
        break;
      case 2:
        console.log("ashjbsadhg");
        break;
      case 3:
        navigation.push(NAVIGATION.secureAccount);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={strings.profile.loginSec}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
      />
      {<Loader isLoading={isLoading} />}
      <View style={{ marginTop: hp(3), paddingHorizontal: wp(4) }}>
        <View style={styles.listView}>
          <Button2
            title={"Password"}
            para={"*******"}
            handlePress={() => navigation.push(NAVIGATION.changePassword)}
          />
          <Button2
            title={"Two-Step Verification (2SV) Settings:"}
            para={"For extra security, require a one-time passwrod at sign-in"}
            handlePress={() =>  Alert.alert("Coming Soon")}
          />
          <Button2
            title={"SecureYour Account"}
            para={"If you think your Jikapu account has been compormised, follow these steps to make your account more secure."}
            handlePress={() =>  navigation.push(NAVIGATION.secureAccount)}
          />
        </View>
      </View>
    </View>
  );
};
