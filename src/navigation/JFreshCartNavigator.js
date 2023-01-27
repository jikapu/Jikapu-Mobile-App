import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {AddAddress,JFreshCart,ProductDetails,PaymentMethod,CheckOut,PaymentOption,ReviewOrder,ThankYou,PaymentView } from '@/screens';
import { COLORS, NAVIGATION } from '@/constants';


const Stack = createStackNavigator();

export function JFreshCartNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.jFreshCart}
        component={JFreshCart}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen component={ProductDetails} name={NAVIGATION.productDetails} options={{ headerShown: false }} />
      <Stack.Screen component={CheckOut} name={NAVIGATION.checkOut} options={{ headerShown: false }} />
      <Stack.Screen
        component={AddAddress}
        name={NAVIGATION.addNewAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={PaymentMethod} name={NAVIGATION.paymentMethod} options={{ headerShown: false }} />
      <Stack.Screen component={ReviewOrder} name={NAVIGATION.reviewOrder} options={{ headerShown: false }} />
      <Stack.Screen component={PaymentView} name={NAVIGATION.paymentView} options={{ headerShown: false }} />
      <Stack.Screen component={ThankYou} name={NAVIGATION.thankYou} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
