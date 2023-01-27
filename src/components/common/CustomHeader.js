import React from 'react';
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { heightToDP as hp, widthToDP as wp } from '../../utils/Responsive';
import { COLORS } from '../../constants/colors';

export const Header = (props) => {
  let {
    textStyle,
    leftComponent,
    middleComponent,
    rightComponent,
    height,
    isCover,
    coverImage,
    onPress,
  } = props;
  const headerHeight = Platform.OS === 'ios' ? hp(12.5) : hp(13);
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: COLORS.PRIMARY,
        height: headerHeight,
        alignItems: 'center',
        justifyContent: 'space-between',
       
      }}
    >
      <View
        style={{
          flex: 0.2,
          justifyContent: 'flex-start',
          alignContent: 'flex-start',
          alignSelf: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {leftComponent}
      </View>

      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          alignItems: 'center',
        }}
      >
        {middleComponent}
      </View>

      <View
        style={{
          flex: 0.2,
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: height == '' || height == null ? 'center' : 'flex-start',
          alignItems: 'flex-end',
        }}
      >
        {rightComponent}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#2980b9',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
