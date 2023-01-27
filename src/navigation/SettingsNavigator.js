import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION, COLORS } from '@/constants';
import { CheckOut,Search, Category, Settings, AddAddress, PaymentMethod, ChangePassword, ProductCatalog, Login, JikapuStore, SubCategories, ChildCategories, SubChildProducts, ProductDetails, JikapuFresh,JikapuCategory, ReviewOrder, PaymentView, ThankYou } from '@/screens';

const Stack = createStackNavigator();

export function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Settings} name={NAVIGATION.settings} options={{ headerShown: false }} />
      <Stack.Screen
        component={Search}
        name={NAVIGATION.search}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={SubCategories} name={NAVIGATION.subCategories} options={{ headerShown: false }} />
      <Stack.Screen component={ChildCategories} name={NAVIGATION.childCategories} options={{ headerShown: false }} />
      <Stack.Screen component={SubChildProducts} name={NAVIGATION.subChildProducts} options={{ headerShown: false }} />
      <Stack.Screen
        component={Category}
        name={NAVIGATION.category}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        component={ProductCatalog}
        name={NAVIGATION.productCatalog}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={ProductDetails} name={NAVIGATION.productDetails} options={{ headerShown: false }} />
      <Stack.Screen
        component={CheckOut}
        name={NAVIGATION.checkOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={AddAddress}
        name={NAVIGATION.addNewAddress}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={PaymentMethod}
        name={NAVIGATION.paymentMethod}
        options={{ headerShown: false }} />
      <Stack.Screen component={JikapuStore} name={NAVIGATION.jikapuStore} options={{ headerShown: false }} />
      <Stack.Screen component={JikapuFresh} name={NAVIGATION.jikapuFresh} options={{ headerShown: false }} />
      <Stack.Screen component={JikapuCategory} name={NAVIGATION.jikapuCategory} options={{ headerShown: false }} />
      <Stack.Screen component={ReviewOrder} name={NAVIGATION.reviewOrder} options={{ headerShown: false }} />
      <Stack.Screen component={PaymentView} name={NAVIGATION.paymentView} options={{ headerShown: false }} />
      <Stack.Screen component={ThankYou} name={NAVIGATION.thankYou} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}