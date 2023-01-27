//import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '@/constants';
import { searchIcon1 } from '@/assets';
import { Input } from 'react-native-elements';

export const SearchButton = (props) => {
  let { placeholderText,value, style, errorMessage,editable, setCode, handlePress, textStyle } = props;
  return (
    <>
      <Input
        value={value}
        editable={editable}
        containerStyle={styles.container}
        errorStyle={{ color: 'red' }}
        underlineColorAndroid={"transparent"}
        errorMessage={errorMessage}
        inputContainerStyle={{ borderColor: 'transparent', alignItems:"center",marginTop:-5 }}
        placeholder="Search"
        rightIcon={
          <TouchableOpacity onPress={handlePress} style={styles.button}>
            <Image source={searchIcon1} style={styles.search} />
          </TouchableOpacity>
        }
        rightIconContainerStyle={{
          paddingTop: hp(0),
        //  backgroundColor:"green"
        }}
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
    borderColor: COLORS.BORDER,
    borderRadius: spacing.xs,
  },
});
