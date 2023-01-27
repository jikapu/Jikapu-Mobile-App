import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NAVIGATION } from "@/constants";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  Login,
  Home,
  ProductCatalog,
  ProductDetails,
  SubCategory,
  Category,
  Search,
  CheckOut,
  AddAddress,
  PaymentOption,
  ReviewOrder,
  PaymentMethod,
  PaymentView,
  ThankYou,
  SubCategories,
  ChildCategories,
  SubChildProducts,
  JikapuStore,
  JikapuFresh
} from "@/screens";

import { AuthNavigator } from '@/navigation/AuthNavigator';

const Stack = createStackNavigator();

const getRouteName = route => {
  const routeName = getFocusedRouteNameFromRoute(route)
  console.log(routeName)
  if (routeName?.includes(NAVIGATION.checkOut) || routeName?.includes(NAVIGATION.reviewOrder) || routeName?.includes(NAVIGATION.paymentView) || routeName?.includes(NAVIGATION.thankYou)) {
    return 'none';
  }
  return 'flex';
}

export function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.home}
        component={Home}
        options={({ route }) => ({ tabBarStyle: { display: getRouteName(route) } }, { headerShown: false })}
      />
      <Stack.Screen
        component={Search}
        name={NAVIGATION.search}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={Category}
        name={NAVIGATION.category}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SubCategory}
        name={NAVIGATION.subCategory}
        options={{ headerShown: false }}
      />
       <Stack.Screen component={JikapuStore} name={NAVIGATION.jikapuStore} options={{ headerShown: false }} />
       <Stack.Screen component={JikapuFresh} name={NAVIGATION.jikapuFresh} options={{ headerShown: false }} />
      <Stack.Screen
        component={ProductCatalog}
        name={NAVIGATION.productCatalog}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SubCategories}
        name={NAVIGATION.subCategories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ChildCategories}
        name={NAVIGATION.childCategories}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={SubChildProducts}
        name={NAVIGATION.subChildProducts}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ProductDetails}
        name={NAVIGATION.productDetails}
        options={{ headerShown: false, tabBarVisible: false }}

      />
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

      <Stack.Screen
        component={ReviewOrder}
        name={NAVIGATION.reviewOrder}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PaymentView}
        name={NAVIGATION.paymentView}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={ThankYou}
        name={NAVIGATION.thankYou}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
