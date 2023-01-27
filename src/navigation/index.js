import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { AppNavigator } from '@/navigation/AppNavigator';
import { AuthNavigator } from '@/navigation/AuthNavigator';
import SplashScreen from 'react-native-splash-screen'
import { theme } from '@/theme';
import { getItem } from '@/utils/AsyncUtils';
import {
  StyleSheet,
  ActivityIndicator,

} from "react-native";


export function RootNavigator() {
  const [isLoggedIn,setLogged] = useState(null)
  const scheme = useColorScheme();
  const linking = {
    prefixes: ['jikapu://', 'https://jikapu.com:3507/'],
    ...AuthNavigator,
  };
  useEffect(async() => {
    SplashScreen.hide();
    const token = await getItem("token") 
     console.log("get token ",token)
     token  ? setLogged(true) : setLogged(false)
  },[])
  
  return (
    <NavigationContainer theme={theme[scheme]}  linking={linking}
    fallback={<ActivityIndicator color="blue" size="large" />}>
      { isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}


