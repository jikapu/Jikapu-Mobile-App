import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import { COLORS }from '../constants/colors';

const isSnackBarVisible = false;

export function validateEmail(email) {
  var re = /^(([^<>()\[\]\\,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
export function checkEmail(email) {
  var re = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
  return re.test(email);
}

export function validateNewPassword(password) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;
  return re.test(password);
}
export function validatePassword(password) {
  var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_+£₹<>]).{8,}$/;
  return re.test(password);
}
export function validateIsEmpty(text) {
  var result = false;
  if (text === '' || text === undefined) {
    result = true;
  }
  return result;
}
export function validateName(text) {
  var re = /^[a-zA-Z ]*$/;
  return re.test(text);
}
export function validateAboutMe(text) {
  var re = /^[a-zA-Z _ '.,-]{0,500}$/;
  return re.test(text);
}

export function validateNumber(text) {
  var re = /^[0-9]*$/;
  return re.test(text);
}
export function validatePhoneNumber(text) {
  var re = /^[0-9]*$/;
  console.log('re.test(text) && re.length>0 && re.length<11 :>> ',re.test(text),text.length);
  return re.test(text) && text.length>0 && text.length==10;
}
export function validateContact(text) {
  var re = /^\+?\d+$/;
  console.log('re.test(text) && re.length>0 && re.length<13 :>> ',re.test(text),text.length);
  return re.test(text) && text.length>0 && text.length<=13;
}

export function validateMaxAndMinLength(text) {
  var re = /^[a-zA-Z0-9]{4,10}$/;
  return re.test(text);
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function commafy(num) {
  var str = num.toString().split('.');
  if (str[0].length >= 5) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  }
  if (str[1] && str[1].length >= 5) {
    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
  }
  return str.join('.');
}

export function showErrorSnackBar(text) {
  return (
    <View style={styles.container}>
      <Snackbar
        style={{backgroundColor: COLORS.PRIMARY}}
        duration={3000}
        visible={true}>
        {text}
      </Snackbar>
    </View>
  );
}

export function validateKenyaNo(text) {
  var re = /^(\+254|0)[1-9]\d{8}$/
  return re.test(text) && text.length>0 && text.length==13
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
