import React from 'react';
import{View,StyleSheet, Dimensions} from 'react-native'
import {COLORS} from '../../constants/colors';
import { ActivityIndicator } from 'react-native-paper';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export const Loader = ({isLoading}) => {
  if(isLoading){
    return (
      <>
       <View style={Styles.mainContainer}>
          <View style={Styles.innerView}>
            <ActivityIndicator
              size="large"
              color= {COLORS.PRIMARY}
            />
          </View>
        </View>
      </>
    );
  }else {
    return null;
  }
};

const Styles = StyleSheet.create({
    mainContainer: {
      right: 0,
      top: 0,
      bottom: 0,
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
    },
    innerView: {flex: 1, justifyContent: "center", alignItems: "center"},
  });





