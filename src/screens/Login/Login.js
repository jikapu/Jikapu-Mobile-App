import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  guestLogin,
  checkSocialLogin,
  onPressFacebook,
  onPressGoogle,
  onPressApple,
} from "@/actions";
import { Button, ErrorView, Loader, InputField } from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Login/Login.styles";
import { shadow, spacing, typography } from "@/theme";
import {heightToDP as hp, widthToDP as wp} from '@/utils';
import {
  logo,
  google,
  rightArrow,
  apple,
  facebook,
  show,
  hide,
} from "@/assets";
import { NAVIGATION, COLORS } from "@/constants";
import { validateIsEmpty, validateEmail } from "@/utils/Validations";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const isLoading = useSelector((state) => state.common.isLoading);

  const handleSubmit = () => {
    Keyboard.dismiss();
    let params = {
      email: email,
      password: password,
    };
    if (validateIsEmpty(email.trim()) || validateIsEmpty(password.trim())) {
      if (validateIsEmpty(email.trim())) {
        setEmailError(strings.error.req_field);
      }
      if (validateIsEmpty(password.trim())) {
        setPasswordError(strings.error.req_field);
      }
    } else {
      dispatch(
        login(params, () => {
          navigation.navigate(NAVIGATION.home);
        })
      );
    }
  };
  /*
  const handleGuestLogin = () => {
    let params = {
      email: "Win32_Gecko_20030107_6a74646e",
      isGuest: true,
      firstName: "Gecko",
      lastName: "2003010",
    };
    dispatch(
      guestLogin(params, () => {
        navigation.navigate(NAVIGATION.home);
      })
    );
  };
  */

  const googleSignIn = async () => {
    const logindata = await onPressGoogle();
    console.log("google login data", logindata);
    const userId = await AsyncStorage.getItem("suid");
    const email = await AsyncStorage.getItem("semail");
    const fullName = await AsyncStorage.getItem("sfullName");
    const [first, last] = fullName.split(" ");
    if (logindata) {
      let params = {
        isSocialLogin: true,
        email: email,
        firstName: first,
        lastName: last,
        socialLoginId: userId,
      };
      dispatch(
        checkSocialLogin(params, () => {
          navigation.navigate(NAVIGATION.home);
        })
      );
    }
  };

  const facebookLogin = async () => {
    const logindata = await onPressFacebook();
    console.log("logindata", logindata);
    const userId = await AsyncStorage.getItem("suid");
    const email = await AsyncStorage.getItem("semail");
    const fullName = await AsyncStorage.getItem("sfullName");
    const [first, last] = fullName.split(" ");
    if (logindata) {
      let params = {
        isSocialLogin: true,
        email: email,
        firstName: first,
        lastName: last,
        socialLoginId: userId,
      };
      dispatch(
        checkSocialLogin(params, () => {
          navigation.navigate(NAVIGATION.home);
        })
      );
    }
  };

  const appleSignIn = async () => {
    const logindata = await onPressApple();
    console.log("apple login data", logindata);
    const userId = await AsyncStorage.getItem("suid");
    const email = await AsyncStorage.getItem("semail");
   // const fullName = await AsyncStorage.getItem("sfullName");
  //  const [first, last] = fullName.split(" ");
    if (logindata) {
      let params = {
        isSocialLogin: true,
        email: email,
        firstName: '',
        lastName: '',
        socialLoginId: userId,
      };
      dispatch(
        checkSocialLogin(params, () => {
          navigation.navigate(NAVIGATION.home);
        })
      );
    }
  };
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      keyboardShouldPersistTaps="always"
    >
      {<Loader isLoading={isLoading} />}
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.signIn}>{strings.login.signin}</Text>
          <View style={{ marginTop: spacing.s }}>
            <InputField
              setCode={(text) => setEmail(text)}
              value={email}
              error={emailError}
              placeholder="Email or Phone "
              label={strings.login.EMAIL_OR_MOBILE}
            />

            <InputField
              secureTextEntry={showPassword}
              setCode={(text) => setPassword(text)}
              value={password}
              error={passwordError}
              placeholder="Password"
              label={strings.login.PASSWORD}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword == true ? (
                    <Image source={hide} style={{ width: 18, height: 18 }} />
                  ) : (
                    <Image source={show} style={{ width: 18, height: 18 }} />
                  )}
                </TouchableOpacity>
              }
            />
            <View
              style={{
                alignSelf: "flex-end",
                marginBottom: spacing.m,
                marginTop: -10,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => navigation.push(NAVIGATION.forgot)}
              >
                <Text style={[{ color: COLORS.PRIMARY }, typography.label]}>
                  {strings.login.FORGOT_PASS}
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <Button handlePress={handleSubmit} title={strings.login.LOGIN} />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: spacing.l,
            }}
          >
            <View style={styles.hrLine} />
            <Text style={styles.lineText}>{strings.login.OR_LOGIN}</Text>
            <View style={styles.hrLine} />
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={styles.sociallogin}
              onPress={() =>
                facebookLogin().then(() =>
                  console.log("Signed in with Facebook!")
                )
              }
            >
              <Image source={facebook} />
              <Text style={typography.label}>{strings.login.FACEBOOK}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sociallogin}
              onPress={() => {
                googleSignIn();
              }}
            >
              <Image source={google} />
              <Text style={typography.label}>{strings.login.GOOGLE}</Text>
            </TouchableOpacity>
           
          </View>
          {Platform.OS === 'ios' && (
              <TouchableOpacity
              style={[styles.sociallogin,{ width: wp(88),marginTop:hp(2),justifyContent:"center",}]}
              onPress={() => {
                appleSignIn();
              }}
              >
                <View style={{ padding: 10 }}>
                  <Image
                    style={{ height: 20, width: 20 }}
                    source={apple}
                    resizeMode="cover"
                  />
                </View>
                <Text style={typography.label}>{strings.login.APPLE} </Text>
              </TouchableOpacity>
            )}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: spacing.l,
            }}
          >
            <View style={styles.hrLine} />
            <Text style={styles.lineText}>{strings.login.NEW_TO}</Text>
            <View style={styles.hrLine} />
          </View>
          <Button
            handlePress={() => navigation.navigate(NAVIGATION.register)}
            style={[styles.submitButton, { marginTop: 0 }]}
            title={strings.login.CREATE_ACCOUNT}
          />
          {/* 
           <TouchableOpacity
            style={styles.guestBtn}
            onPress={() => handleGuestLogin()}
          >
            <Text>CONTINUE AS A GUEST</Text>
            <Image
              source={rightArrow}
              style={{ width: 12, height: 12, marginLeft: spacing.xs }}
            />
          </TouchableOpacity>
          */}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
