import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Keyboard } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { login, TYPES } from "@/actions/auth/UserActions";
import { Button, ErrorView, Loader, InputField } from "@/components";
import { strings } from "@/localization";
import { styles } from "@/screens/ForgotPassword/ForgotPassword.styles";
import { errorsSelector } from "@/selectors/ErrorSelectors";
import { isLoadingSelector } from "@/selectors/StatusSelectors";
import { shadow, spacing, typography } from "@/theme";
import { logo, back } from "@/assets";
import { NAVIGATION } from "@/constants";
import { validateIsEmpty, validateEmail } from "@/utils/Validations";
import { forgotPassword } from "@/actions/auth/UserActions";

export const ForgotPassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const isLoading = useSelector((state) => state.common.isLoading);
  // const errors = useSelector((state) => errorsSelector([TYPES.LOGIN], state), shallowEqual);

  const handleSubmit = () => {
    let params = {
      email: email,
      device: Platform.OS,
    };
    Keyboard.dismiss();
    if (validateIsEmpty(email.trim())) {
      setEmailError(strings.error.req_field);
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError(strings.error.invalid_email);
      return;
    }
    dispatch(forgotPassword(params));
  };

  return (
    <View style={styles.container}>
      {<Loader isLoading={isLoading} />}
      <TouchableOpacity onPress={() => navigation.pop()} style={styles.back}>
        <Image source={back} />
      </TouchableOpacity>
      <Image source={logo} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>{strings.login.FORGOT_PASS}</Text>
        <Text style={styles.textStyle}>
          {strings.login.ENTER_EMAIL_FORGOT_PWD}
        </Text>
        <View style={{ marginTop: spacing.xl }}>
          <InputField
            setCode={(text) => setEmail(text)}
            value={email}
            error={emailError}
            placeholder="Email Id"
            label={strings.login.EMAIL}
          />
          <Button handlePress={handleSubmit} title={strings.login.reset} />
        </View>
      </View>
    </View>
  );
};
