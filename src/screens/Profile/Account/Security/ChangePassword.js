import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, ErrorView, Loader, InputField, CustomHeader } from '@/components';
import { strings } from '@/localization';
import { shadow, spacing, typography } from '@/theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NAVIGATION } from '@/constants';
import {
  validateIsEmpty,
  validatePassword,
} from '@/utils/Validations';
import { changePassword } from '@/actions';
import { heightToDP as hp, widthToDP as wp } from '@/utils';

export const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cNewPassword, setCNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [cNewPasswordError, setCNewPasswordError] = useState('');
  const isLoading = useSelector((state) => state.common.isLoading);


  const handleSubmit = () => {
    Keyboard.dismiss()
    if (validateIsEmpty(password.trim())) {
      setPasswordError(strings.error.req_field);
    } else if (validateIsEmpty(newPassword.trim())) {
      setNewPasswordError(strings.error.req_field);
    } else if (!validatePassword(newPassword)) {
      setNewPasswordError(strings.error.invalid_pass);
    } else if (password === newPassword) {
      setNewPasswordError(strings.error.pwd_err);
    } else if (validateIsEmpty(cNewPassword.trim())) {
      setCNewPasswordError(strings.error.req_field);
    } else if (cNewPassword != newPassword) {
      setCNewPasswordError(strings.error.pass_same);
    } else {
      let params = {
        password: password,
        newPassword: newPassword,
        confirmPassword: cNewPassword
      }
      dispatch(changePassword(navigation, params))
    }
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} enableOnAndroid={true} keyboardShouldPersistTaps="always">
      <CustomHeader
        title={"Change Password"}
        isBackBtn={true}
        handlePress={() => navigation.pop()}
      />
      {<Loader isLoading={isLoading} />}
      <View style={{ marginTop: spacing.s, marginHorizontal: wp(5) }}>
        <InputField

          setCode={(text) => setPassword(text)}
          value={password}
          error={passwordError}
          placeholder="Current Password"

        ></InputField>
        <InputField

          setCode={(text) => setNewPassword(text)}
          value={newPassword}
          error={newPasswordError}
          placeholder="New Password"

        ></InputField>
        <InputField
          type="password"
          setCode={(text) => setCNewPassword(text)}
          value={cNewPassword}
          error={cNewPasswordError}
          placeholder="Confirm New Password"

        ></InputField>
        <Button title={strings.settings.submit} handlePress={() => handleSubmit()} />
      </View>
    </KeyboardAwareScrollView>
  );
};
