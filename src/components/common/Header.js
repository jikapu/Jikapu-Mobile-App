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
import { npBack, npMove, searchIcon } from '@/assets';

export const CustomHeader = (props) => {
  let { title, isCover, coverImage, handlePress,isBackBtn,isSearchBtn, handleSearch } = props;
  const headerHeight = Platform.OS === 'ios' ? hp(12.5) : hp(13);
  return (
    <View
      style={{
        backgroundColor: COLORS.PRIMARY,
        height: headerHeight,
        paddingTop: hp(4),
        paddingHorizontal: wp(6),
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        {isBackBtn ? <View
          style={{
            flex: 0.2,
            alignItems: 'flex-start',
          }}
        >
          <TouchableOpacity onPress={handlePress}>
            <Image source={npBack} style={{ width: 22, height: 17 }} />
          </TouchableOpacity>
        </View>:<View style={{ flex: 0.2,
            alignItems: 'flex-start',}}/>}
        
        <View
          style={{
            flex: 0.6,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: wp(3.9),fontFamily:"ProductSans-Bold", fontWeight: 'bold', color: COLORS.WHITE }}>
            {title}
          </Text>
        </View>
        {isSearchBtn ? <View
          style={{
            flex: 0.2,
            alignItems: 'flex-end',
          }}
        >
         <TouchableOpacity onPress={handleSearch}>
            <Image source={searchIcon} style={{ width: 17, height: 17 }} />
          </TouchableOpacity>
        </View>:<View style={{ flex: 0.2,
            alignItems: 'flex-start',}}/>}
 
        
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
