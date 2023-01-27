//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '@/constants';
import { searchIcon } from '@/assets';
import { Input } from 'react-native-elements';

export const GlobalSearch = (props) => {
  let { placeholderText,value,rightIconStyle, inputStyle,containerStyle, errorMessage,editable, setCode, handlePress, textStyle } = props;

  return (
    <>
      <Input
        value={value}
        autoFocus={true}
        returnKeyType={'search'}
        onSubmitEditing={handlePress}
        editable={editable}
        autoCapitalize="none"
        inputStyle={[styles.inputStyle,inputStyle]}
        containerStyle={[styles.container,containerStyle]}
        errorStyle={{ color: 'red' }}
        underlineColorAndroid={"transparent"}
        errorMessage={errorMessage}
        inputContainerStyle={{ borderColor: 'transparent', alignItems:"center",marginTop:-5 }}
        placeholder="Search"
        placeholderTextColor={"white"}
        rightIcon={
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Image source={searchIcon} style={styles.search} />
          </TouchableOpacity>
        }
        rightIconContainerStyle={[styles.rightIcon,rightIconStyle]}
        onChangeText={(text) => setCode(text)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent:"center",
    width: 25,
    height: 25,
  },
  search: {
    width: 20,
    height: 20,
  },
  container: {
    height: hp(5),
    borderWidth: 1,
    borderColor: COLORS.WHITE,
    borderRadius: spacing.xs,
  },
  inputStyle:{
    color:COLORS.WHITE
  },
  rightIcon:{
    paddingTop: hp(0),
   alignItems:"center",
   justifyContent:"center"
  }
});
