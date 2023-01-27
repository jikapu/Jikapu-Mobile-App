import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NAVIGATION, COLORS } from "@/constants";
import {
  Profile,
  Wishlist,
  Account,
  GeneralInfo,
  Cards,
  ProductDetails,
  Registry,
  Orders,
  OrderDetails,
  TrackOrders,
  Address,
  EditAddress,
  EditCard,
  Coins,
  MyCoupons,
  Subscriptions,
  LoginSecurity,
  ChangePassword,
  AddRegistryAddress,
  Support,
  CheckOut,
  PaymentMethod,
  ReviewOrder,
  PaymentView,
  ThankYou,
  SecureAccount,
  Login
} from "@/screens";


const Stack = createStackNavigator();

export function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={NAVIGATION.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.account}
        component={Account}
        options={{ headerShown: false }}
      /> 
        <Stack.Screen
        name={NAVIGATION.support}
        component={Support}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.orders}
        component={Orders}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.orderDetails}
        component={OrderDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.wishList}
        component={Wishlist}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.registry}
        component={Registry}
        options={{ headerShown: false }}
      />
     
       <Stack.Screen
        name={NAVIGATION.addRegistryAddress}
        component={AddRegistryAddress}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.subscriptions}
        component={Subscriptions}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.coins}
        component={Coins}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.myCoupons}
        component={MyCoupons}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.trackOrders}
        component={TrackOrders}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen 
        name={NAVIGATION.productDetails}
        component={ProductDetails}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        component={CheckOut}
        name={NAVIGATION.checkOut}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        component={PaymentMethod}
        name={NAVIGATION.paymentMethod}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name={NAVIGATION.generalInfo}
        component={GeneralInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.cardsDetails}
        component={Cards}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAVIGATION.editCard}
        component={EditCard}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name={NAVIGATION.address}
        component={Address}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.editAddress}
        component={EditAddress}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name={NAVIGATION.loginSec}
        component={LoginSecurity}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name={NAVIGATION.changePassword}
        component={ChangePassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name={NAVIGATION.secureAccount}
        component={SecureAccount}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
  );
}
