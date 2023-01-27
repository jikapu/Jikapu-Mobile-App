import React from 'react';
import { createStackNavigator,createSwitchNavigator } from '@react-navigation/stack';
import { NAVIGATION } from '@/constants';
import { Login,Register,ForgotPassword,Home, SubCategory } from '@/screens';
import { AppNavigator } from '@/navigation/AppNavigator';

const Stack = createStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name={NAVIGATION.login} options={{ headerShown: false }} />
      <Stack.Screen component={ForgotPassword} name={NAVIGATION.forgot} options={{ headerShown: false }} />
      <Stack.Screen component={Register} name={NAVIGATION.register} options={{ headerShown: false }} />
      <Stack.Screen component={AppNavigator} name={NAVIGATION.home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
