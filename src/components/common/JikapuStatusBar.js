
import React, { useEffect, useState } from "react";
import { Text, View, Platform, StatusBar,StyleSheet,Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
import { spacing } from '@/theme';
import { heightToDP as hp, widthToDP as wp } from '@/utils';
import { COLORS } from '@/constants';

export const JikapuStatusBar = () => {
  const STATUS_BAR_HEIGHT =
    Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
  const HEADER_HEIGHT = Platform.OS === "ios" ? 44 : 56;
  return (
   
      <View style={{ height: STATUS_BAR_HEIGHT, backgroundColor: "#5E8D48" }}>
        <StatusBar
          translucent
          backgroundColor={COLORS.PRIMARY}
          barStyle="light-content"
        />
      </View>

  );
};
