import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/actions/auth/UserActions";
import { Button, Loader, InputField } from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/Register/Register.styles";
import { spacing } from "@/theme";
import { logo, back, show, hide } from "@/assets";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NAVIGATION } from "@/constants";
import {
  validateIsEmpty,
  validateEmail,
  validatePassword,
  validateName,
  validateContact,
} from "@/utils/Validations";

export const Register = ({ navigation }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cPasswordError, setCPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);
  const isLoading = useSelector((state) => state.common.isLoading);
  const signup = () => {
    Keyboard.dismiss();
    if (
      validateIsEmpty(firstName.trim()) ||
      validateIsEmpty(lastName.trim()) ||
      validateIsEmpty(email.trim()) ||
      validateIsEmpty(phone.trim()) ||
      validateIsEmpty(password.trim()) ||
      validateIsEmpty(cPassword.trim())
    ) {
      if (validateIsEmpty(firstName.trim())) {
        setFirstNameError(strings.error.req_field);
      }
      if (!validateName(firstName)) {
        setFirstNameError(strings.error.alphabets_only);
      }
      if (validateIsEmpty(lastName.trim())) {
        setLastNameError(strings.error.req_field);
      }
      if (!validateName(lastName.trim())) {
        setLastNameError(strings.error.alphabets_only);
      }
      if (validateIsEmpty(email.trim())) {
        setEmailError(strings.error.req_field);
      }
      if (!validateEmail(email.trim())) {
        setEmailError(strings.error.invalid_email);
      }
      if (validateIsEmpty(phone.trim())) {
        setPhoneError(strings.error.req_field);
      }
      if (!validateContact(phone.trim())) {
        setPhoneError(strings.error.invalid_no);
      }
      if (validateIsEmpty(password.trim())) {
        setPasswordError(strings.error.req_field);
      }
      if (!validatePassword(password.trim())) {
        setPasswordError(strings.error.invalid_pass);
      }
      if (validateIsEmpty(cPassword.trim())) {
        setCPasswordError(strings.error.req_field);
      }
      if (!validatePassword(cPassword)) {
        setCPasswordError(strings.error.invalid_pass);
      }
      if (cPassword.trim() !== password.trim()) {
        setCPasswordError(strings.error.pass_same);
      }
    } else {
      let params = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        device: Platform.OS,
      };
      dispatch(
        register(params, () => {
          navigation.navigate(NAVIGATION.login);
        })
      );
    }
  };

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}

      <TouchableOpacity onPress={() => navigation.pop()} style={styles.back}>
        <Image source={back} />
      </TouchableOpacity>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="always"
      >
        <Image source={logo} style={styles.logo} />
        <View style={styles.formContainer}>
          <Text style={styles.signIn}>{strings.signUp.SIGNUP}</Text>
          <View style={{ marginTop: spacing.s }}>
            <InputField
              setCode={(text) => setFirstName(text)}
              value={firstName}
              error={firstNameError}
              placeholder="First Name"
              label={strings.signUp.FIRST_NAME}
            ></InputField>
            <InputField
              setCode={(text) => setLastName(text)}
              value={lastName}
              error={lastNameError}
              placeholder="Last Name"
              label={strings.signUp.LAST_NAME}
            ></InputField>
            <InputField
              setCode={(text) => setEmail(text)}
              value={email}
              error={emailError}
              placeholder="Email"
              label={strings.login.EMAIL}
            ></InputField>
            <InputField
              setCode={(text) => setPhone(text)}
              value={phone}
              error={phoneError}
              placeholder="Phone"
              maxLength={14}
              label={strings.signUp.PHONE}
            ></InputField>
            <InputField
              secureTextEntry={showPassword}
              setCode={(text) => setPassword(text)}
              value={password}
              error={passwordError}
              placeholder="Password"
              label={strings.signUp.PASS}
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
            ></InputField>
            <InputField
              secureTextEntry={showCPassword}
              setCode={(text) => setCPassword(text)}
              value={cPassword}
              error={cPasswordError}
              placeholder="Confirm Password"
              label={strings.signUp.CONFIRM_PASS}
              rightIcon={
                <TouchableOpacity
                  onPress={() => setShowCPassword(!showCPassword)}
                >
                  {showCPassword == true ? (
                    <Image source={hide} style={{ width: 18, height: 18 }} />
                  ) : (
                    <Image source={show} style={{ width: 18, height: 18 }} />
                  )}
                </TouchableOpacity>
              }
            ></InputField>
          </View>

          <Button
            title={strings.login.CREATE_ACCOUNT}
            handlePress={() => signup()}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: spacing.l,
            }}
          >
            <View style={styles.hrLine} />
            <Text style={styles.lineText}>
              {strings.signUp.ALREADY_HAVE_AN_ACCOUNT}
            </Text>
            <View style={styles.hrLine} />
          </View>
          <Button
            handlePress={() => navigation.navigate(NAVIGATION.login)}
            style={[styles.submitButton, { marginTop: 0 }]}
            title={strings.login.LOGIN}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};
