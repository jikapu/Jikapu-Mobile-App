import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  Keyboard,
} from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Button,
  ErrorView,
  Loader,
  InputField,
  CustomHeader,
} from "@/components";
import { strings } from "@/localization";
import { shadow, spacing, typography } from "@/theme";
import { COLORS } from "@/constants";
import { NAVIGATION } from "@/constants";
import { edit,signErr, securityLock } from "@/assets";
import { validateIsEmpty, validatePassword } from "@/utils/Validations";
import { logOut } from "@/actions/auth/UserActions";
import { heightToDP as hp, widthToDP as wp } from "@/utils";

export const SecureAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.common.isLoading);

  const signOutEverything = () => {
    Alert.alert(
      strings.APP_NAME,
      strings.CONFIRM_TO_LOGOUT,
      [
        {
          text: "Ok",
          onPress: () => {
            dispatch(logOut(navigation));
          },
        },
        {
          text: "Cancel",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView style={{ flex: 1,backgroundColor:COLORS.WHITE }}>
      <CustomHeader
        title={"Secure your account"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
      />
      {<Loader isLoading={isLoading} />}
      <View
        style={{ flex: 1, marginTop: spacing.s, marginHorizontal: wp(3.5) }}
      >
        <Image
          source={securityLock}
          style={{
            width: 45,
            height: 63,
            alignSelf: "center",
          }}
        />
        <Text
          style={[
            typography.label,
            { color: COLORS.BLACK, paddingHorizontal: wp(3.7) },
          ]}
        >
          To protect your Jikapu account, we recommend taking the following
          steps immediately.
        </Text>
        <View style={styles.boxStyle}>
          <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
            Step 1:{" "}
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              Update your email settings{" "}
            </Text>
          </Text>
          <View style={styles.hrLine} />
          <Text style={[typography.label, { color: COLORS.BLACK }]}>
            Use a strong, unique password for your account not used anywhere
            else. Check for "email forwarding" rules, and remove any found.
          </Text>

          <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
            Tip:{" "}
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              If your email account password was hacked. your Jikapu account
              might be at risk. If your email was forwarded to another address,
              your account might be at risk.
            </Text>
          </Text>
        </View>
        <View style={styles.boxStyle}>
          <View style={{ flexDirection: "row" }}>
            <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
              Step 2:{" "}
            </Text>
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              Set mobile PIN/Passcode
            </Text>
          </View>
          <View style={styles.hrLine} />
          <Text style={[typography.label, { color: COLORS.BLACK }]}>
            Contact your mobile phone provider and add a PIN/Passcode to protect
            your mobile phone account.
          </Text>

          <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
            Tip:{" "}
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              If your account or SMS is hacked, your Jikapu account might be at
              risk.
            </Text>
          </Text>
        </View>
        <View style={styles.boxStyle}>
         
            <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
              Step 3:{" "}<Text style={[typography.label, { color: COLORS.BLACK }]}>
              Sign out all apps, devices, and web browsers
            </Text>
            </Text>
          
         
          <View style={styles.hrLine} />
          <View style={{ flexDirection: "row" }}>
            <Image source={signErr}  style={{width:18,height:16}}/>
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              {"  "}67 apps(s) signed in to your Jikapu account
            </Text>
          </View>

          <Text style={[typography.labelBold, { color: COLORS.BLACK }]}>
            Tip:{" "}
            <Text style={[typography.label, { color: COLORS.BLACK }]}>
              for maximum security, sign out of everything.
            </Text>
          </Text>
          <Button
            title={"Sign-out everything "}
            textStyle={{
              color: COLORS.GREEN_BTN,
            }}
            style={{
              backgroundColor: COLORS.WHITE,
              borderColor: COLORS.GREEN_BTN,
              borderWidth: 1,
              alignSelf:"center",
              width: wp(87),height:hp(5),marginVertical:hp(1.5)
            }}
            handlePress={() => signOutEverything()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  boxStyle: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: 5,
    borderColor: COLORS.BORDER,
    marginTop:hp(1)
  },
  hrLine: {
    height: 1,
    backgroundColor: COLORS.BORDER,
    width: wp(88),
    marginVertical: hp(0.7),
  },
});
